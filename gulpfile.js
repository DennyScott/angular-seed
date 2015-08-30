'use strict';

var gulp = require('gulp'),
  requireDir = require('require-dir');

requireDir('./tasks');

gulp.task('default', [
  'serve'
]);

gulp.task('pre-push', [
  'lint',
  'lint-scss',
  'style-check',
  'unit-test'
]);

gulp.task('wiredep',function(){});
