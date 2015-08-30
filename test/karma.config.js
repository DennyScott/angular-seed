'use strict';

// Karma configuration
// Generated on Tue Sep 30 2014 12:10:28 GMT-0500 (CDT)

var fs = require('fs');

var wwwRoot = fs.realpathSync(__dirname + '/../app') + '/';

var testsAreBeingExecutedInVM = process.env.HEADLESS,
  browsers = [ testsAreBeingExecutedInVM ? 'PhantomJS' : 'Chrome' ];
browsers = ['PhantomJS'];

var _ = require('lodash');

var sources = _.map(require(__dirname + '/../config/third-party.js'),
  function(url) {
    return '../app/lib/' + url;
  }
)
.concat([
  '../app/lib/angular-mocks/angular-mocks.js',
  '../app/components/**/*.module.js',
  '../app/components/**/*.js',
  '../app/components/**/*.html',
  'unit/helpers/*',
  'unit/**/*.json',
  '../app/js/generated/environment.unit-test.js',
  'unit/**/*.js',
  'integration/**/*.js',
]);

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: sources,

    ngHtml2JsPreprocessor: {
      moduleName: 'yourAppName',
      stripPrefix: wwwRoot.replace(/\\/g, '/')
    },

    // list of files to exclude
    exclude: [
      '../app/lib/js/generated/environment.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '../app/components/**/*.js': ['coverage'],
      'unit/**/*.json': ['json_fixtures'],
      '../app/components/**/*.html': ['ng-html2js']
    },

    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
      subdir: '.'
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'junit'],

    plugins: [
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-coverage',
      'karma-story-reporter',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-json-fixtures-preprocessor',
      'karma-ng-html2js-preprocessor'
    ],

    jsonFixturesPreprocessor: {
      stripPrefix: 'unit'
    },

    browserNoActivityTimeout: 60000,

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE
    // || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: browsers,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: testsAreBeingExecutedInVM ? true : false,

    junitReporter: {
      outputFile: 'results/unit-test.xml'
    }
  });
};
