'use strict';

angular
    .module('yourAppName.profile')
    .controller('SshKeysController', SshKeysController);

function SshKeysController() {
    var vm = this;

    angular.extend(vm, {
      userKeys: getKeys(),
      test: 'something',
    });

    function getKeys() {
      console.log('called');
      return [
        {
          name: 'Franks MBP',
          key: 'aa:aa:aa:aa:aa:aa:aa:aa:aa:aa:aa:aa:aa:aa:aa',
          dateAdded: 'November 15, 2014',
          isEnabled: true
        },

        {
          name: 'Franks MBP',
          key: 'aa:aa:aa:aa:aa:aa:aa:aa:aa:aa:aa:aa:aa:aa:aa',
          dateAdded: 'November 15, 2014',
          isEnabled: true
        },

        {
          name: 'Franks MBP',
          key: 'aa:aa:aa:aa:aa:aa:aa:aa:aa:aa:aa:aa:aa:aa:aa',
          dateAdded: 'November 15, 2014',
          isEnabled: true
        },
      ];
    }
}
