'use strict';

describe('When user is editing their profile, ', function() {
  var users, editProfileController, userJson, $rootScope, $q;

  userJson = angular.copy(window.__fixtures__['/json/user']);

  function mockUsers() {
    users = jasmine.createSpyObj('users', ['getCurrentUser']);

    users.getCurrentUser.and.returnValue($q.when(userJson));
    return users;
  }

  beforeEach(module('yourAppName'));

  beforeEach(inject(function($controller, _$rootScope_, _$q_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    editProfileController = $controller('EditProfileController', {
      users: mockUsers()
    });
  }));

  describe('when the page starts, ', function() {
    it('the users data is loaded through the users factory', function() {
      $rootScope.$digest();
      expect(users.getCurrentUser).toHaveBeenCalled();
    });
  });
});
