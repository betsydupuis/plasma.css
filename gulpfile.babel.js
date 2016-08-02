'use strict';

// Dependencies
var gulp = require('gulp');
var glob = require('glob');
var path = require('path');
var config = require('./gulp/options/config.js');
var paths = require('./gulp/options/paths.config.js');
var tasksPath = './gulp/tasks/';

// Plugins
var plugins = require('gulp-load-plugins')();
plugins.runSequence = require('run-sequence');
plugins.del = require('del');
plugins.bundleLogger = require('./gulp/util/bundleLogger');
plugins.handleErrors = require('./gulp/util/handleErrors');


// Variables
var taskList = glob.sync(tasksPath + '**/*.js', {
    'ignore': [
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