var path = require('path');
var paths = require('../options/paths.config.js');

module.exports = function(gulp, plugins, paths) {
    'use strict';

    // Initialize build with targets
    var targets = paths.html;
    buildTasks(targets);

    function buildTasks(targets) {
        var htmlTasks = [];
        var htmlCleanTasks = [];
        var dist, src;

        for (var i = 0; i < targets.length; i++) {
            // Create task name and push to htmlTasks
            var taskName = 'build:html:' + targets[i].name;
            var cleanTaskName = 'clean:html:' + targets[i].name;

            // Push task names to array
            htmlTasks.push(taskName);
            htmlCleanTasks.push(cleanTaskName);

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

        gulp.task('clean:html', htmlCleanTasks);
        gulp.task('build:html', function() {
            plugins.runSequence('clean:html', htmlTasks);

        });

    };

    function cleanScript(destination) {
        plugins.del([
            '.dist/**/*.html',
        ]);
    };

    function buildScript(source, destination) {
        return gulp.src(source)
            // .pipe(plugins.watch(source))
            .pipe(gulp.dest(function(file) {
                file.path = file.base + path.basename(file.path);
                return destination;
            }));
    };

};