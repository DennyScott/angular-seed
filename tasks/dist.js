'use strict';

var gulp = require('gulp');

gulp.task('dist-js', ['views-js-clean', 'lib-js-clean', 'component-js-clean']);
gulp.task('dist-assets', ['sass-clean', 'min-images', 'assets-copy']);
gulp.task('dist', ['clean', 'dist-js', 'dist-assets', 'index.html']);
