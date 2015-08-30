'use strict';

angular
  .module('yourAppName.dashboard')
  .controller('DashboardController', DashboardController);

function DashboardController() {
  var vm = this;

  angular.extend(vm, {
    onClick: _onClick,
    clicks: 0,
  });

  /**
   * Onclick function for testing purposes. You can delete me whenever :).
   */
  function _onClick() {
    vm.clicks++;
  }

}
