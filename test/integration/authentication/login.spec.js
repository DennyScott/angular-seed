'use strict';

describe('Integration - When a user attempts to log in', function() {
  var loginController,
    authentication,
    $state,
    $auth,
    $rootScope,
    $httpBackend,
    email = 'app@appnovation.com',
    password = '1234abcD!';

  beforeEach(module('yourAppName'));

  beforeEach(inject(
    function($controller, _authentication_, env,
      _$auth_, _$state_, _$rootScope_, _$httpBackend_) {
      loginController = $controller('LoginController', {
        authentcation: _authentication_,
        $auth: _$auth_,
    }
  );

    authentication = _authentication_;
    $auth = _$auth_;
    $state = _$state_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    spyOn($rootScope, '$broadcast').and.callThrough();
    spyOn($state, 'go').and.callThrough();

    var token = angular.copy(window.__fixtures__['/json/token']);

    $httpBackend
      .when('POST', env.HOST + '/api-token-auth/')
      .respond(token);
  }));

  describe('with correct credentials', function() {
    it('theyre pushed to a new state', function() {
      loginController.login(email, password);
      $httpBackend.flush();
      $rootScope.$digest();
      expect($state.go).toHaveBeenCalledWith('log.dashboard');
    });

    it('a successful login event is fired', function() {
      loginController.login(email, password);
      $httpBackend.flush();
      $rootScope.$digest();
      expect($rootScope.$broadcast).toHaveBeenCalledWith('event_login');
    });
  });

  describe('with incorrect credentials', function() {
    it('of a bad email, they do not successfully login', function() {
      loginController.login('t.com', password);
      $rootScope.$digest();
      expect($rootScope.$broadcast).not.toHaveBeenCalledWith('event_login');
    });

    it('of a bad password, they do not successfully login', function() {
      loginController.login(email, '1');
      $rootScope.$digest();
      expect($rootScope.$broadcast).not.toHaveBeenCalledWith('event_login');
    });
  });
});
