'use strict';

describe('Controller Dashboard: ', function() {
  var logController, authentication;

  beforeEach(module('yourAppName'));

  function authenticationMock() {
    authentication = jasmine.createSpyObj('authentication', ['logout']);
    return authentication;
  }

  beforeEach(inject(function($controller) {
    logController = $controller('LogController', {
      authentication: authenticationMock(),
    });
  }));

  describe('when clicking log out', function() {
    it('called the logout authentication service', function() {
      logController.logout();
      expect(authentication.logout).toHaveBeenCalled();
    });
  });

});
