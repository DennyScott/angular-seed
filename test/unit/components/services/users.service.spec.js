'use strict';

describe('When accessing the user', function() {

  var users, $q, $rootScope, user, userJson, Restangular, _, _user;

  beforeEach(module('yourAppName'));

  beforeEach(function() {
    module(function($provide) {
      userJson = angular.copy(window.__fixtures__['/json/user']);
      Restangular = jasmine.createSpyObj('Restangular', ['one']);
      _user = jasmine.createSpyObj('_user', ['get']);
      Restangular.one.and.returnValue(_user);

      $provide.value('Restangular', Restangular);
    });
  });

  beforeEach(inject(function(_users_, _$q_, _$rootScope_, ___) {
    users = _users_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    _ = ___;
  }));

  describe('with no current user', function() {
    it('we cannot query the users data', function() {
      users.getCurrentUser();
      expect(_user.get).not.toHaveBeenCalled();
    });
  });

  describe('and setting the current User', function() {
    it('if the id is undefined, we will not query', function() {
      users.setUser(undefined);
      expect(Restangular.one).not.toHaveBeenCalled();
    });

    it('if the id has a value, we will query the user', function() {
      users.setUser(1);
      expect(Restangular.one).toHaveBeenCalled();
    });
  });

  describe('and searching for the current user', function() {

    beforeEach(function() {

      _user.get.and.returnValue($q.when(userJson));
      users.setUser(1);
    });

    it('should query the users data', function() {
      users.getCurrentUser();
      expect(_user.get).toHaveBeenCalled();
    });
  });
});
