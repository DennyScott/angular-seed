'use strict';

angular
  .module('yourAppName.splash')
  .config(splashRoutes);

function splashRoutes($stateProvider) {
  $stateProvider
    .state('splash', {
      url: '/',
      templateUrl: 'components/splash/splash.html',
      controller: 'SplashController as vm',
    });
}
