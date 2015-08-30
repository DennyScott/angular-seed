'use strict';

angular
  .module('yourAppName.login')
  .controller('LoginController', LoginController);

function LoginController($auth, authentication) {
  var vm = this;
  angular.extend(vm, {

    // TODO: Remove Dispaly "is valid". Instead, just tell them after trying if
    // login was successful.
    authenticate: $auth.authenticate,
    login: authentication.login,
  });

  authentication.disableOnLoggedIn();
}
