'use strict';

angular
  .module('yourAppName.login')
  .controller('ForgotPasswordController', ForgotPasswordController);

function ForgotPasswordController(authentication) {
  var vm = this;

  /**
  * Possible email states.
  * 0. This is the state we begin on. Nothing has happened.
  * 1. Invalid state, user has given wrong syntax
  * 2. Valid Email. Not on the server, but syntax, attempt to email.
  */
  var emailStates = {
    emptyState: 0,
    invalidEmailState: 1,
    validEmailState: 2,
  };

  angular.extend(vm, {
    resetPassword: resetPassword,
    emailState: emailStates.emptyState,
    emailStates: emailStates,
  });

  /**
  * Call resetPassword from the authentication service. If the email
  * is not of correct syntax, don't call the service, instead, inform the
  * user they are using an invalid syntax by changing email state to invalid.
  *
  * If the service is used, we will inform the user of this by changing the
  * email state to a valid state.
  *
  * @param {string} email Email to send reset-password to.
  */
  function resetPassword(email) {
    if (authentication.verifyEmail(email)) {
      authentication.resetPassword(email);
      vm.emailState = vm.emailStates.validEmailState;
    } else {
      vm.emailState = vm.emailStates.invalidEmailState;
    }
  }
}
