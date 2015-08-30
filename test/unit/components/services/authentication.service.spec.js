'use strict';

describe('When using the authentication service ', function() {

  var $state, $auth, _, authentication, authEvents,
    token, $q, $rootScope, Restangular, api;

  var email = 'test@test.com';
  var password = '1234abcD!';

  beforeEach(module('yourAppName'));


  beforeEach(function() {
    module(function($provide) {
      token = angular.copy(window.__fixtures__['/json/auth']);

      $auth = jasmine.createSpyObj('$auth', [
        'login',
        'logout',
        'isAuthenticated',
      ]);
      $provide.value('$auth', $auth);

      authEvents = jasmine.createSpyObj('authEvents', ['LOGIN']);
      authEvents.LOGIN.and.returnValue('event_login');
      $provide.value('authEvents', authEvents);

      $state = jasmine.createSpyObj('$state', ['go']);
      $provide.value('$state', $state);

      Restangular = jasmine.createSpyObj('Restangular', ['one']);
      $provide.value('Restangular', Restangular);

      api = jasmine.createSpyObj('api', ['customGET']);
      Restangular.one.and.returnValue(api);
    });
  });

  beforeEach(inject(function(___, _authentication_, _$q_, _$rootScope_) {
    authentication = _authentication_;
    _ = ___;
    $q = _$q_;
    $rootScope = _$rootScope_;
  }));

  describe('when checking disableOnLoggedIn', function() {
    it('check if they are already logged in, if so forward them', function() {
      $auth.isAuthenticated.and.returnValue(true);
      authentication.disableOnLoggedIn();
      expect($state.go).toHaveBeenCalled();
    });

    it('authentication is checked on check', function() {
      authentication.disableOnLoggedIn();
      expect($auth.isAuthenticated).toHaveBeenCalled();
    });

    it('check if they are logged in, if not dont forward', function() {
      $auth.isAuthenticated.and.returnValue(false);
      authentication.disableOnLoggedIn();
      expect($state.go).not.toHaveBeenCalled();
    });
  });

  describe('using just an email and password', function() {

    beforeEach(function() {
      $auth.login.and.returnValue($q.when(token));
    });

    it('should not call the auth.login service if email @ is not included',
      function() {
      authentication.login('t.com', password);
      expect($auth.login).not.toHaveBeenCalled();
    });

    it('should not call auth.login if email undefined', function() {
      authentication.login(undefined, password);
      expect($auth.login).not.toHaveBeenCalled();
    });

    it('should not call auth.login if password undefined', function() {
      authentication.login(email, undefined);
      expect($auth.login).not.toHaveBeenCalled();
    });

    it('should not call auth.login if there is no upper case', function() {
      authentication.login(email, 'hello1');
      expect($auth.login).not.toHaveBeenCalled();
    });

    it('should not call auth.login if there is no lower case', function() {
      authentication.login(email, 'HELLO1');
      expect($auth.login).not.toHaveBeenCalled();
    });

    it('should not call auth.login if there is no number', function() {
      authentication.login(email, 'hello');
      expect($auth.login).not.toHaveBeenCalled();
    });

    it('should not call auth.login if less then 4 chars', function() {
      authentication.login(email, 'hI1');
      expect($auth.login).not.toHaveBeenCalled();
    });

    it('they will call the auth login service', function() {
        authentication.login(email, password);
        expect($auth.login).toHaveBeenCalled();
    });

    it('a successful login with 200 will call state.go', function() {
      authentication.login(email, password);
      $rootScope.$digest();
      expect($state.go).toHaveBeenCalled();
    });

    it('should not change state if a 200 is not responded', function() {
      token.status = 401;
      $auth.login.and.returnValue($q.when(token));
      authentication.login(email, password);
      $rootScope.$digest();
      expect($state.go).not.toHaveBeenCalled();
    });

    it('should call a successful login event', function() {
      authentication.login(email, password);
      spyOn($rootScope, '$broadcast');
      $rootScope.$digest();
      expect($rootScope.$broadcast).toHaveBeenCalledWith('event_login');
    });
  });

  describe('If I forgot my password', function() {

    it('I will call Restangular one, customGet', function() {
      authentication.resetPassword(email);
      expect(Restangular.one).toHaveBeenCalled();
      expect(api.customGET).toHaveBeenCalled();
    });

    it('If an email does not contain @, should not call server', function() {
      authentication.resetPassword('t.com');
      expect(Restangular.one).not.toHaveBeenCalled();
    });

    it('If an email does not contain ., should not call server', function() {
      authentication.resetPassword('t@t');
      expect(Restangular.one).not.toHaveBeenCalled();
    });
  });

  describe('If i am logging out', function() {
    it('I call the auth log out service', function() {
      authentication.logout();
      expect($auth.logout).toHaveBeenCalled();
    });

    it('I will redirect my state', function() {
      authentication.logout();
      expect($state.go).toHaveBeenCalled();
    });
  });
});
