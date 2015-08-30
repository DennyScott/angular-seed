'use strict';

var gulp = require('gulp'),
  env = process.env.NODE_ENV || 'dev',
  gulpConfig = require('gulp-ng-config'),
  rename = require('gulp-rename'),
  paths = require('../config/paths.js');

function writeConfig(env, extension) {
  extension = extension ? '.' + extension + '.js' : '.js';
  return gulp.src(paths.config + 'env.json')
    .pipe(gulpConfig('yourAppName.common', {
      environment: env,
      constants: {
        I18N: {
          en: require(paths.i18n + 'en.json'),
          fr: require(paths.i18n + 'fr.json'),
        },
      },
      createModule: false,
    }))
    .pipe(rename({ extname: '' }))
    .pipe(rename({ extname: extension }))
    .pipe(gulp.dest(paths.generated));
}

gulp.task('env', function() {
  return writeConfig(env);
});

gulp.task('env-test', function() {
  return writeConfig('test', 'unit-test');
});

gulp.task('env-e2e-test', function() {
  return writeConfig('e2e-test');
});
