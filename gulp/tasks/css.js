module.exports = function(gulp, plugins, paths) {
    'use strict';

    // Dependencies
    var path = require('path');
    var config = require('../options/config.js');
    // plugins.gulpIf = require('gulp-if');

    // Post Processors
    var autoprefixer = require('autoprefixer');
    var discardComments = require('postcss-discard-comments');
    var cssnano = require('cssnano');
    var postProcessors = [
        discardComments(),
        cssnano(),
    ];

    // Paths
    var paths = require('../options/paths.config.js');
    var targets = paths.scss;

    // Initialize Build Tasks with SCSS Targets
    buildTasks(targets);



    function buildTasks(targets) {
        var cssTasks = [];
        var cssCleanTasks = [];

        for (var i = 0; i < targets.length; i++) {
            // Create task name and push to cssTasks
            var taskName = 'compass:' + targets[i].name;
            var cleanTaskName = 'compass-clean:' + targets[i].name;

            // Push task names to array
            cssTasks.push(taskName);
            cssCleanTasks.push(cleanTaskName);

            //Initialize Scripts
            //Initialize Scripts
            var src = targets[i].src;
            var dist = targets[i].dist;
            var glob = targets[i].glob;

            initializeTasks(src, dist, glob);

            function initializeTasks(src, dist, glob) {
                function cleanTaskScript() {
                    cleanScript(dist, glob);
                };

                function taskScript() {
                    buildScript(src, dist, glob);
                };

                gulp.task(cleanTaskName, cleanTaskScript);
                gulp.task(taskName, taskScript);
            };
        };

        gulp.task('clean:css', cssCleanTasks);
        gulp.task('build:css', function() {
            plugins.runSequence('clean:css', cssTasks);
        });

    };

    function cleanScript(destination, glob) {
        plugins.del([
            destination + (glob !== "undefined" ? glob : "")
        ]);
    }

    function buildScript(source, destination, glob) {
        var shouldMinify = global.isProd;
        var shouldCreateSourcemap = !global.isProd || config.browserify.prodSourcemap;
        var dependencies = ['sass-globbing'];

        gulp.src(source + glob)
            .pipe(
                plugins.compass({
                    sass: source,
                    css: destination,
                    require: dependencies,
                    sourcemap: shouldCreateSourcemap
                })
            )
            .pipe(plugins.if(shouldMinify, plugins.postcss(postProcessors)))
            .pipe(gulp.dest(destination));
    };
};