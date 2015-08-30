'use strict';

var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  lintspaces = require('gulp-lintspaces'),
  jscs = require('gulp-jscs'),
  jscsCustom = require('gulp-jscs-custom'),
  paths = require('../config/paths.js'),
  scsslint = require('gulp-scss-lint'),
  shell = require('gulp-shell'),
  gutil = require('gulp-util'),
  lintedJs = ['components/**/*.js', '!components/generated/*.js'];

gulp.task('lint', function() {
  return gulp.src(lintedJs, { cwd: paths.app })
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('lint-spaces', function() {
  return gulp.src(lintedJs, { cwd: paths.app })
    .pipe(lintspaces({
      editorconfig: paths.root + '.editorconfig',
      ignores: ['js-comments']
    }))
    .pipe(lintspaces.reporter());
});

gulp.task('lint-scss', function() {
  gulp.src('scss/**/*.scss')
    .pipe(scsslint({
      'config': paths.client + '.scss-lint.yml',
    }));
});

gulp.task('style-check', function() {
  return gulp.src(lintedJs, { cwd: paths.app })
    .pipe(jscs())
    .on('error', function(err) {
      gutil.log(err.message);
      this.emit('end');
    });
});

gulp.task('lint-tofile', function() {
  var jshintXMLReporter = require('gulp-jshint-xml-file-reporter');
  return gulp.src(lintedJs, { cwd: paths.app })
    .pipe(jshint())
    .pipe(jshint.reporter(jshintXMLReporter))
    .on('end', jshintXMLReporter.writeFile({
      format: 'junit',
      filePath: paths.test + 'results/lint.xml',
      alwaysReport: true,
    }));
});

gulp.task('style-check-tofile', function() {
  return gulp.src(lintedJs, { cwd: paths.app })
  .pipe(jscsCustom({
    configPath: paths.client + '.jscsrc',
    reporter: 'junit',
    filePath: paths.test + 'results/jscs.xml',
  }));
});

gulp.task('js-lint', ['lint', 'lint-spaces', 'style-check']);
