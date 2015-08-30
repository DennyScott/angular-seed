'use strict';

var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  paths = require('../config/paths.js');

gulp.task('browser-sync:server', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: './www/'
    }
  });
});


gulp.task('browser-sync', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: './app/'
    }
  });
});

gulp.task('watch', ['dist'], function() {
  gulp.watch(paths.client + 'scss/**/*.scss', ['scss-watch']);
  gulp.watch(paths.app + 'components/**/*.js', ['js-watch']);
  gulp.watch(paths.app + 'components/**/*.html', ['views-watch']);
  gulp.watch(paths.app + 'image/**/*', ['image-watch']);
});

gulp.task('scss-watch', ['sass'], function() {
  browserSync.reload();
});

gulp.task('js-watch', ['component-js'], function() {
  browserSync.reload();
});

gulp.task('views-watch', ['views-js'],function() {
  browserSync.reload();
});

gulp.task('image-watch', ['min-images'], function() {
  browserSync.reload();
});
