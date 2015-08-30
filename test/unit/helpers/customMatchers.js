'use strict';

beforeEach(function() {
  jasmine.addMatchers({
    toBeAPromise: function(util, customEqualityTesters) {
      return {
        compare: function(actual, expected) {
          var result = {};
          result.pass = util.equals(typeof actual.then, 'function');
          result.message = 'Expected ' +
            actual +
            (result.pass ? ' not' : '') +
            ' to be a promise';
          return result;
        }
      };
    }
  });
});
