'use strict';

angular
.module('yourAppName.log')
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('log', {
    url: '/l',
    abstract: true,
    controller: 'LogController as vm',
    templateUrl: 'components/log/log.html',
    resolve: {
      loginRequired: loginRequired,
    },
  });

  function loginRequired($q, $location, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.resolve();
    } else {
      $location.path('/login');
    }

    return deferred.promise;
  }

  $urlRouterProvider.otherwise('/l/dashboard');
});
