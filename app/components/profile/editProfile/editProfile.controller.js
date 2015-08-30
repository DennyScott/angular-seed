'use strict';

angular
    .module('yourAppName.profile')
    .controller('EditProfileController', EditProfileController);

function EditProfileController(users) {
    var vm = this;

    angular.extend(vm, {
      user: {},
    });

    activate();

    function activate() {
      getCurrentUser();
    }

    function getCurrentUser() {
      users.getCurrentUser().then(function(res) {
        vm.user = res;
      });
    }
}
