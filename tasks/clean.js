var path = require('path');
var paths = require('./options/paths.config.js');

module.exports = function(gulp, plugins, paths) {
    'use strict';
    gulp.task('clean', function() {
        return plugins.del([
            paths.environment.dist,
        ]);
    });
};