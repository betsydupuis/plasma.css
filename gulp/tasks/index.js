module.exports = function(gulp, plugins) {
    'use strict';
    var del = require('del');

    //Build Source files from ./src
    gulp.task('build:src', function(callback) {
        plugins.runSequence([
            'build:css',
            'build:html'
        ], callback);
    });
    gulp.task('build:dev', ['build:src']);

    gulp.task('build', function() {

        global.isProd = true;

        plugins.runSequence(['build:src']);

    });
};