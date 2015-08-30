'use strict';

describe('When a user attempts to login in the login controller, ', function() {

  var loginController, $auth, $controller,
    $q, authentication, $state, $rootScope, token;

  var email = 'test@test.com';
  var password = '1234abcD!';
  var provider = 'github';

  function auth(isAuth) {
    $auth = jasmine.createSpyObj('$auth', ['authenticate', 'isAuthenticated']);
    $auth.isAuthenticated.and.returnValue(isAuth);
    return $auth;
  }

  function authenticationMock() {
    authentication = jasmine.createSpyObj('authentication', [
      'login',
      'disableOnLoggedIn',
    ]);
    return authentication;
  }

  function stateMock() {
    $state = jasmine.createSpyObj('$state', ['go']);
    return $state;
  }

  function createController(isAuth) {
    loginController = $controller('LoginController', {
      $auth: auth(isAuth),
      authentication: authenticationMock(),
      $state: stateMock(),
    });
  }

  beforeEach(module('yourAppName'));

  beforeEach(inject(function(_$controller_, _$q_, _$rootScope_) {
    $controller = _$controller_;
    $q = _$q_;
    createController(false);

    $rootScope = _$rootScope_;
    token = angular.copy(window.__fixtures__['/json/auth']);
  }));

  it('authentication is checked on controller startup', function() {
    expect(authentication.disableOnLoggedIn).toHaveBeenCalled();
  });

  describe('when attempting to login in through our service ', function() {
    it('calling login will call the authentication service', function() {
      loginController.login(email, password);
      expect(authentication.login).toHaveBeenCalled();
    });
  });

  describe('using an oAuth service ', function() {
    it('should call the auth.authenticate service', function() {
      loginController.authenticate(provider);
      expect($auth.authenticate).toHaveBeenCalled();
    });
  });
});
