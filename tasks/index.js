module.exports = function(gulp, plugins, paths) {
    'use strict';
    var del = require('del');

    //Build Source files from ./src
    gulp.task('build:src', function(callback) {
        plugins.runSequence([
                'build:css',
                // 'build:fonts',
                'build:html',
                // 'build:images',
                // 'build:models',
                // 'build:scripts',
            ],
            callback);
    });

    gulp.task('build:watch', function() {

        //watch .scss files
        gulp.watch('src/**/*.scss', ['build:css']);
        gulp.watch('src/**/*.html', ['build:html']);
        gulp.watch('src/**/*.json', ['build:models']);

        //watch .js files
        // gulp.watch('src/js/**/*.js', ['build:scripts'])
    });

    gulp.task('build:dev', function() {

        global.isProd = false;

        plugins.runSequence(['build:src', 'build:watch']);

    });
    gulp.task('build:gradle', ['build:src']);
    gulp.task('build', ['build:gradle']);
};