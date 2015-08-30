'use strict';

angular
    .module('yourAppName.profile')
    .directive('sshKeys', sshKeys);

function sshKeys() {
    var directive = {
        restrict: 'E',
        templateUrl: 'components/profile/sshKeys/sshKeys.html',
        controller: 'SshKeysController',
        scope: {},
        controllerAs: 'vm',
    };

    return directive;
}
