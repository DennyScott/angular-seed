'use strict';

var gulp = require('gulp'),
	_ = require('lodash'),
	fs = require('fs'),
	i18n = require('../config/paths.js').i18n;

function sortObject(obj) {
	var keys = Object.keys(obj);
	var len = keys.length;
	var i;
	var copy = {};
	keys.sort();

	for (i = 0; i < len; i++) {
		copy[keys[i]] = obj[keys[i]];
	}

	return copy;
}

gulp.task('sync-langs', function(cb) {
	var en = require(i18n + 'en.json');
	var fr = require(i18n + 'fr.json');

	_.difference(Object.keys(en), Object.keys(fr)).forEach(function(key) {
		fr[key] = '';
	});

	_.difference(Object.keys(fr), Object.keys(en)).forEach(function(key) {
		delete fr[key];
	});

	en = sortObject(en);
	fr = sortObject(fr);

	fs.writeFileSync(i18n + 'en.json', JSON.stringify(en, null, '\t'));
	fs.writeFileSync(i18n + 'fr.json', JSON.stringify(fr, null, '\t'));
});
