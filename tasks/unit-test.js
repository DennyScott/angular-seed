'use strict';

var gulp = require('gulp'),
  karma = require('karma').server,
  paths = require('../config/paths.js');

gulp.task('unit-test', ['env-test'], function() {
  karma.start({
    configFile: paths.test + 'karma.config.js',
    autoWatch: true
  });
});
