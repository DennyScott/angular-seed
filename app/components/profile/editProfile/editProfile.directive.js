'use strict';

angular
    .module('yourAppName.profile')
    .directive('editProfile', editProfile);

function editProfile() {
    var directive = {
        restrict: 'E',
        templateUrl: 'components/profile/editProfile/editProfile.html',
        controller: 'EditProfileController',
        controllerAs: 'vm',
        scope: {},
    };

    return directive;
}
