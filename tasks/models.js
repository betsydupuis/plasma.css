var path = require('path');

module.exports = function(gulp, plugins, paths) {
    'use strict';
    var targets = [];

    if (paths.models) {
        targets = paths.models;
        buildTasks(targets);
    };


    function buildTasks(targets) {
        var modelsTasks = [];
        var modelsCleanTasks = [];
        var dist, src;

        for (var i = 0; i < targets.length; i++) {
            // Create task name and push to modelsTasks
            var taskName = 'build:models:' + targets[i].name;
            var cleanTaskName = 'clean:models:' + targets[i].name;

            // Push task names to array
            modelsTasks.push(taskName);
            modelsCleanTasks.push(cleanTaskName);

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

        gulp.task('clean:models', modelsCleanTasks);
        gulp.task('build:models', function() {
            plugins.runSequence('clean:models', modelsTasks);
        });

    };

    function cleanScript(destination) {
        plugins.del([
            './reports/models/*.*.json',
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


}