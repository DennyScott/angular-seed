'use strict';

var gulp = require('gulp'),
  del = require('del'),
  paths = require('../config/paths.js'),
  mkdirp = require('mkdirp');

gulp.task('clean-tmp', function(cb) {
  return del([
    paths.tmp + '**/*',
    '!' + paths.tmp,
  ], cb);
});

gulp.task('clean-www', function(cb) {
  return del([
    paths.dist + '**/*.*',
    '!' + paths.dist,
    '!' + paths.dist + 'index.html'
  ], cb);
});

gulp.task('clean', ['clean-www', 'clean-tmp'], function(cb) {
  mkdirp.sync(paths.dist);
  mkdirp.sync(paths.dist + '/css');
  mkdirp.sync(paths.dist + '/components');
  mkdirp.sync(paths.tmp);
  cb();
});
