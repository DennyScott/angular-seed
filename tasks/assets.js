'use strict';

var gulp = require('gulp'),
  paths = require('../config/paths.js'),
  imagemin = require('gulp-imagemin');

gulp.task('min-images', ['clean'], function() {
  return gulp.src(paths.app + 'img/*')
  .pipe(imagemin())
  .pipe(gulp.dest(paths.dist + 'img/'));
});

gulp.task('assets-copy', ['clean'], function() {
  return gulp.src([
    '!index.html',
    '!css/**/*',
    '!components/**/*',
    '!lib/**/*',
    '!img/**/*',
    '**/*'
  ], { cwd: paths.app })
  .pipe(gulp.dest(paths.dist));
});
