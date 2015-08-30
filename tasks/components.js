'use strict';

var gulp = require('gulp'),
  wrap = require('gulp-wrap-js'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  ngAnnotate = require('gulp-ng-annotate'),
  paths = require('../config/paths.js'),
  sourcemaps = require('gulp-sourcemaps');

gulp.task('component-js-clean', ['clean', 'env'], distComponentJs);
gulp.task('component-js', ['env'], distComponentJs);
function distComponentJs() {
  return gulp.src([
    '**/*.module.js',
    '!generated/**/!(env.js)',
    '**/*.js',
  ], { cwd: paths.app + 'components/' })
  .pipe(sourcemaps.init())
  .pipe(ngAnnotate({ single_quotes: true }))
  .pipe(wrap('(function(){%= body %})();'))
  .pipe(uglify())
  .pipe(concat('all.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.dist + '/components'));
}
