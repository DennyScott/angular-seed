'use strict';

describe('When I use the forgetPassword form', function() {
  var forgotPasswordController, authentication;

  var email = 'test@test.com';

  function authenticationMock() {
    authentication = jasmine.createSpyObj('authentication', [
      'resetPassword',
      'verifyEmail',
    ]);
    return authentication;
  }

  beforeEach(module('yourAppName'));

  beforeEach(inject(function($controller) {
    forgotPasswordController = $controller('ForgotPasswordController', {
      authentication: authenticationMock(),
    });
    authentication.verifyEmail.and.returnValue(true);
  }));

  it('when user forgets password, call the forgotPassword service', function() {
    forgotPasswordController.resetPassword(email);
    expect(authentication.resetPassword).toHaveBeenCalled();
  });

  it('when reseting email, verify email is correct syntactically', function() {
    forgotPasswordController.resetPassword(email);
    expect(authentication.verifyEmail).toHaveBeenCalled();
  });

  it('when the user sends email with valid email, infom them', function() {
    authentication.verifyEmail.and.returnValue(true);
    forgotPasswordController.resetPassword('t.com');
    expect(forgotPasswordController.emailState)
      .toBe(forgotPasswordController.emailStates.validEmailState);
  });

  it('users sends with invalid email, dont pass to service', function() {
    authentication.verifyEmail.and.returnValue(false);
    forgotPasswordController.resetPassword('t.com');
    expect(authentication.resetPassword).not.toHaveBeenCalled();
  });

  it('user uses an invalid email syntactically, inform them', function() {
    authentication.verifyEmail.and.returnValue(false);
    forgotPasswordController.resetPassword('t.com');
    expect(forgotPasswordController.emailState)
      .toBe(forgotPasswordController.emailStates.invalidEmailState);
  });
});
