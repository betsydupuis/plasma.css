'use strict';

// Depenedencies
import babelify from 'babelify';
import browserify from 'browserify';
import browserSync from 'browser-sync';
import buffer from 'vinyl-buffer';
import bundleLogger from './util/bundleLogger';
import handleErrors from './util/handleErrors';
import concat from 'concat-stream';
import factor from 'factor-bundle';
import fs from 'fs';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import mkdirp from 'mkdirp';
import ngAnnotate from 'browserify-ngannotate';
import path from 'path';
import rename from 'gulp-rename';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import streamify from 'gulp-streamify';
import uglify from 'gulp-uglify';
import watchify from 'watchify';

// Custom Options
import config from './options/env.config.js';
module.exports = function(gulp, plugins, paths) {
    // let destination = paths.environment.dist + paths.output.assets.js;

    if (paths.scripts) {
        buildTasks(paths.scripts);
    }

    function buildTasks(targets) {
        var scriptsTasks = [];
        var scriptsCleanTasks = [];
        var dist, src;

        for (var i = 0; i < targets.length; i++) {
            // Create task name and push to scriptsTasks
            var taskName = 'build:scripts:' + targets[i].name;
            var cleanTaskName = 'clean:scripts:' + targets[i].name;

            // Push task names to array
            scriptsTasks.push(taskName);
            scriptsCleanTasks.push(cleanTaskName);

            //Initialize Scripts
            var src = targets[i].src;
            var dist = targets[i].dist;

            initializeTasks(src, dist);

            function initializeTasks(src, dist) {
                function cleanTaskScript() {
                    cleanScript(dist);
                };

                function taskScript() {
                    buildScript(src, dist);
                };

                gulp.task(cleanTaskName, cleanTaskScript);
                gulp.task(taskName, taskScript);
            };
        };

        gulp.task('clean:scripts', scriptsCleanTasks);
        gulp.task('build:scripts', function() {
            plugins.runSequence('clean:scripts', scriptsTasks);

        });

    };

    function cleanScript(destination) {
        plugins.del([
            '.reports/assets/**/*.js',
        ]);
    };

    /**@function buildSript
    @param {string | array} full path to fileSource(s).
    @param {string} full path to destination.
    */

    function buildScript(fileSource, destination) {
        let entries = fileSource;
        const shouldCreateSourcemap = !global.isProd || config.browserify.prodSourcemap;


        let options = {
            entries: entries,
            debug: shouldCreateSourcemap,
            cache: {},
            packageCache: {},
            fullPaths: !global.isProd
        };

        let bundler = browserify(options);

        if (!global.isProd) {
            bundler = watchify(bundler);

            bundler.on('update', rebundle);
        };

        enableTransforms();
        // enablePlugins()
        //.on('error', handleErrors);
        return rebundle();

        function enablePlugins() {
            let outputPaths = splitDestinations(entries);

            if (outputPaths) {
                if (fs.stat(config.browserify.bundleName)) {
                    return bundler.plugin(factor, {
                        // File output order must match entry order
                        o: outputPaths,
                    });
                } else {
                    createPlaceholderFiles();
                    return bundler.plugin(factor, {
                        // File output order must match entry order
                        o: outputPaths,
                    });
                };
            };

            /**@function writeStreams
            @param {array}
            */
            function writeStreams(streams) {
                for (var i = streams.length - 1; i >= 0; i--) {
                    streams[i]
                };
            };

            function write(name) {
                return concat(function(body) {
                    console.log('// ----- ' + name + ' -----');
                    console.log(body.toString('utf8'));
                });
            };

            function createPlaceholderFiles() {
                let dependencyPath = path.join(global.gulpDir, 'reports', paths.output.assets.js);
                let dependencyFiles = path.join(dependencyPath, config.browserify.bundleName);

                mkdirp(dependencyPath, function(err) {
                    if (err) console.error(err)
                    fs.openSync(dependencyFiles, 'w');
                });
            };

            function splitDestinations(entries) {
                let newDestinations = [];
                for (var i = 0; i < entries.length; i++) {
                    var filePath = destination + '/' + path.basename(entries[i]);
                    console.log(filePath);
                    newDestinations.push(filePath);
                };

                return newDestinations;
            };
        };


        function enableTransforms() {
            const transforms = [
                { 'name': babelify, 'options': {} },
                { 'name': ngAnnotate, 'options': {} },
                { 'name': 'brfs', 'options': {} },
                { 'name': 'bulkify', 'options': {} }
            ];

            return transforms.forEach(
                function(transform) {
                    bundler.transform(transform.name, transform.options);
                }
            );
        };

        function rebundle() {
            let fileName = path.basename(destination);
            let dirName = path.dirname(destination);

            let shouldMinify = global.isProd;
            bundleLogger.start();

            const stream = bundler.bundle();
            const sourceMapLocation = global.isProd ? './' : '';

            return stream
                .on('error', handleErrors)
                .on('end', bundleLogger.end)
                .pipe(source(fileName))
                .pipe(gulpif(shouldCreateSourcemap, buffer()))
                .pipe(gulpif(shouldCreateSourcemap, sourcemaps.init({ loadMaps: true })))
                .pipe(gulpif(shouldMinify, streamify(uglify({
                    compress: { drop_console: true } // eslint-disable-line camelcase
                }))))
                .pipe(gulpif(shouldCreateSourcemap, sourcemaps.write(sourceMapLocation)))
                .pipe(gulp.dest(dirName))
                .pipe(gulpif(shouldMinify, rename({
                    extname: ".min.js"
                })))
                .pipe(gulp.dest(dirName))
                .pipe(browserSync.stream());
        };
    };
}