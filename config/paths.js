'use strict';

var root = require('fs').realpathSync(__dirname + '/../..') + '/',
  client = root + 'angular-seed/',
  config = client + 'config/',
  app = client + 'app/',
  generated = app + 'components/generated';

module.exports = {
  root: root,
  client: client,
  tmp: client + 'tmp/',
  dist: client + 'www/',
  app: app,
  generated: generated,
  config: config,
  i18n: app + 'i18n/',
  test: client + 'test/',
  e2e: client + 'test/e2e/',
  api: client + 'api/'
};
