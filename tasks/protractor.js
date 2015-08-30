'use strict';

var gulp = require('gulp'),
  protractor = require('gulp-protractor').protractor,
  paths = require('../config/paths.js');

gulp.task('e2e', ['default'], function() {
  gulp.src(['!protractor.config.js', '**/*.js'], { cwd: paths.e2e })
    .pipe(protractor({
         configFile: paths.e2e + 'protractor.config.js',
         args: ['--baseUrl', 'http://127.0.0.1:8000']
  })
    .on('error', function(e) { throw e; })
  );
});
