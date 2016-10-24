'use strict';

// Dependencies
var gulp = require('gulp');
var glob = require('glob');
var path = require('path');
var config = require('./tasks/options/env.config.js');
var paths = require('./tasks/options/paths.config.js');
var tasksPath = './tasks/**/*.js';

// Plugins
var plugins = require('gulp-load-plugins')();
plugins.runSequence = require('run-sequence');
plugins.del = require('del');
plugins.bundleLogger = require('./tasks/util/bundleLogger.js');
plugins.handleErrors = require('./tasks/util/handleErrors.js');


// Variables
var taskList = glob.sync(tasksPath, {
    'ignore': [
        // './**/(options|util)/*',
        './**/options/*',
        './**/util/*'
    ]
});
global.gulpDir = __dirname;
global.isProd = config.isProd;

registerGulpTasks(taskList);

function registerGulpTasks(taskList) {
    console.log('Registering gulp tasks...', '\n');

    taskList.forEach(function(taskPathFile) {
        registerTask(taskPathFile)
    });

    function registerTask(task) {

        console.log(task, '\n');

        var task = require(task);

        if (typeof(task) == 'function') {
            task(gulp, plugins, paths);
        } else {
            console.log(task + ' is not a function');
        };
    };
};