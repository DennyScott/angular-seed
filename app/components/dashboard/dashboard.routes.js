'use strict';

angular
  .module('yourAppName.dashboard')
  .config(function($stateProvider) {

    $stateProvider

    .state('log.dashboard', {
      url: '/dashboard',
      views: {
        log: {
          templateUrl: 'components/dashboard/dashboard.html',
          controller: 'DashboardController as vm',
        },
      },
    });

  });
