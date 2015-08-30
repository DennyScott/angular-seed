'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  thirdPartyJs = require('../config/third-party.js'),
  paths = require('../config/paths.js'),
  sourcemaps = require('gulp-sourcemaps');

gulp.task('lib-js', distLibJs);
gulp.task('lib-js-clean', ['clean'], distLibJs);
function distLibJs() {
  return gulp.src(thirdPartyJs, { cwd: paths.app + 'lib' })
  .pipe(sourcemaps.init())
  .pipe(concat('all.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.dist + '/lib'));
}
