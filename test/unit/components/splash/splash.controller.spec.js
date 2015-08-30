'use strict';

describe('When navigating to the splash screen', function() {
  var splashController, $auth;
  beforeEach(module('yourAppName'));

  function authMock() {
    $auth = jasmine.createSpyObj('$auth', ['isAuthenticated']);
    return $auth;
  }

  beforeEach(inject(function($controller) {
    splashController = $controller('SplashController', {
      $auth: authMock(),
    });
  }));

  describe('The login/dashboard button will display after ', function() {
    it('checking with the auth.isAuthenticated service', function() {
      $auth.isAuthenticated.and.returnValue(true);
      expect($auth.isAuthenticated).toHaveBeenCalled();
    });
  });
});
