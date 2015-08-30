'use strict';

var gulp = require('gulp'),
  paths = require('../config/paths.js'),
  inject = require('gulp-inject'),
  js_sources = gulp.src([
    'lib/all.js',
    'components/all.js',
    'components/views.js'
  ], {
    cwd: paths.dist,
    read: false
  }),
  css_sources = gulp.src(['**/*'], {
    cwd: paths.dist + '/css',
    read: false
  });

gulp.task('index.html', ['dist-js', 'dist-assets'], function() {
  return gulp.src('index.html', { cwd: paths.dist })
    .pipe(inject(css_sources, { relative: true }))
    .pipe(inject(js_sources, { relative: true }))
    .pipe(gulp.dest(paths.dist));
});
