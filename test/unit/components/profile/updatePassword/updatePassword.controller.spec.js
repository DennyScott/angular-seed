'use strict';

describe('When a user wants to update their password, ', function() {
  var users, updatePasswordController, usersJson;

  usersJson = angular.copy(window.__fixtures__['/json/users']);

  function usersMock() {
    users = jasmine.createSpyObj('users', ['updatePassword']);
    users.updatePassword.and.returnValue(usersJson);
    return users;
  }

  beforeEach(module('yourAppName'));

  beforeEach(inject(function($controller) {
    updatePasswordController = $controller('UpdatePasswordController', {
      users: usersMock()
    });
  }));

  describe('and they call updatePassword, ', function() {
    it('Expect the user service to have been called', function() {
      // expect(users.updatePassword).toHaveBeenCalled();
    });
  });
});
