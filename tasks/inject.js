'use strict';

var gulp = require('gulp'),
	inject = require('gulp-inject'),
	gulpMerge = require('gulp-merge'),
	paths = require('../config/paths.js'),
	thirdPartyJs = require('../config/third-party.js');



gulp.task('inject', ['dev-sass'], function() {

	var js_sources = gulp.src([
		'!generated/*test.js',
		'**/*.module.js',
		'**/*.js'
	], {
		cwd: paths.app + '/components',
		read: false
	});

	var dep_sources = gulp.src(thirdPartyJs, {
		cwd: paths.app + '/lib',
		read: false
	});

	var css_sources = gulp.src(['style.app.css'], {
		cwd: paths.app + '/css',
		read: false
	});

	return gulp.src('index.html', { cwd: paths.app })
		.pipe(inject(css_sources, { relative: true }))
		.pipe(inject(gulpMerge(dep_sources, js_sources), { relative: true }))
		.pipe(gulp.dest(paths.app));
});
