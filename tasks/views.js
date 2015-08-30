'use strict';

var gulp = require('gulp'),
  ngHtml2Js = require('gulp-ng-html2js'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  paths = require('../config/paths.js'),
  htmlmin = require('gulp-htmlmin');

gulp.task('views-html', viewsHtml);
gulp.task('views-html-clean', ['clean'], viewsHtml);
function viewsHtml() {
  return gulp.src(['!index.html', 'components/**/*.html'], { cwd: paths.app })
  .pipe(htmlmin({collapseWhiteSpace: true}))
  .pipe(ngHtml2Js({
    moduleName: 'yourAppName',
    stripPrefix: paths.app.replace(/\\/g, '/'),
    prefix: 'components/'
  }))
  .pipe(rename({extname: '.html.js'}))
  .pipe(uglify())
  .pipe(gulp.dest(paths.tmp));
}

gulp.task('views-js', ['views-html'], viewsJs);
gulp.task('views-js-clean', ['views-html-clean'], viewsJs);
function viewsJs() {
  return gulp.src([
    '**/*.js'
  ], { cwd: paths.tmp })
  .pipe(concat('views.js'))
  .pipe(gulp.dest(paths.dist + '/components'));
}
