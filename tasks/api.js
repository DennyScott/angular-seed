'use strict';

var gulp = require('gulp'),
	stubby = require('gulp-stubby-server'),
	paths = require('../config/paths.js'),
	stubbyInstance;

gulp.task('api', function(cb) {
	var options = {
		relativeFilesPath: true,
		mute: false,
		files: [paths.api + '/*.yaml'],
		callback: function(_stubbyInstance_) {
			stubbyInstance = _stubbyInstance_;
		}
	};
	stubby(options, cb);
});
