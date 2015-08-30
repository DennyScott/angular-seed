'use strict';

angular
  .module('yourAppName.login')
  .config(loginRoute);

function loginRoute($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'components/login/login.html',
      controller: 'LoginController as vm',
    })

    .state('forgot-password', {
      url: '/forgot-password',
      templateUrl: 'components/login/forgotPassword/forgotPassword.html',
      controller: 'ForgotPasswordController as vm',
    });
}
