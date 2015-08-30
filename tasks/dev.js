'use strict';

var gulp = require('gulp'),
browserSync = require('browser-sync').create(),
paths = require('../config/paths.js'),
sass = require('gulp-sass'),
rename = require('gulp-rename'),
autoprefixer = require('gulp-autoprefixer');

gulp.task('serve:dev', [
  'install',
  'sass',
  'env',
  'browser-sync:dev',
]);

gulp.task('browser-sync:dev', ['inject', 'dev-sass', 'pre-push'], function() {
  browserSync.init({
    server: {
      baseDir: './app/'
    }
  });

  gulp.watch(paths.client + 'scss/**/*.scss', ['dev-sass']);
  gulp.watch(paths.app + 'components/**/*', ['pre-push', browserSync.reload]);
});

gulp.task('dev-sass', ['lint-scss'], function() {
  return gulp.src(paths.client + '/scss/style.app.scss')
  .pipe(sass({ errLogToConsole: true}))
  .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
  .pipe(rename('style.app.css'))
  .pipe(gulp.dest(paths.app + '/css'))
  .pipe(browserSync.stream());
});
