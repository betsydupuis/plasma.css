module.exports = function(gulp, plugins, paths) {
    'use strict';

    var targets = paths.fonts;
    buildTasks(targets);

    function buildTasks(targets) {
        var fontsTasks = [];
        var fontsCleanTasks = [];
        var dist, src;

        for (var i = 0; i < targets.length; i++) {
            // Create task name and push to fontsTasks
            var taskName = 'build:fonts:' + targets[i].name;
            var cleanTaskName = 'clean:fonts:' + targets[i].name;

            // Push task names to array
            fontsTasks.push(taskName);
            fontsCleanTasks.push(cleanTaskName);

            //Initialize Scripts
            var src = targets[i].src;
            var dist = targets[i].dist;
            var glob = targets[i].glob;

            initializeTasks(src, dist);

            function initializeTasks(src, dist) {
                function cleanTaskScript() {
                    cleanScript(dist, glob);
                };

                function taskScript() {
                    buildScript(src, dist);
                };

                gulp.task(cleanTaskName, cleanTaskScript);
                gulp.task(taskName, taskScript);
            };
        };

        gulp.task('clean:fonts', fontsCleanTasks);
        gulp.task('build:fonts', function() {
            plugins.runSequence('clean:fonts', fontsTasks);

        });

    };

    function cleanScript(destination, glob) {
        plugins.del([
            destination + glob,
        ]);
    };

    function buildScript(source, destination) {
        return gulp.src(source)
            .pipe(gulp.dest(destination));
    };
}