'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  minifyCSS = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  paths = require('../config/paths.js'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', sassTask);
gulp.task('sass-clean', ['clean'], sassTask);
function sassTask() {
  return gulp.src(paths.client + '/scss/style.app.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({errLogToConsole: true}))
  .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
  .pipe(minifyCSS())
  .pipe(sourcemaps.write())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest(paths.dist + '/css'));
}

gulp.task('watch-sass', function() {
  gulp.watch([paths.client + 'scss/**/*.scss'], ['sass']);
});
