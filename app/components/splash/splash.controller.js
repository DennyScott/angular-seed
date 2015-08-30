'use strict';

angular
    .module('yourAppName.splash')
    .controller('SplashController', SplashController);

function SplashController($auth) {
  var vm = this;

  angular.extend(vm, {
    isLoggedIn: $auth.isAuthenticated(),
  });
}
