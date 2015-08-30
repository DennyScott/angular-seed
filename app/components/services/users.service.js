'use strict';

angular
  .module('yourAppName.services')
  .factory('users', users);

function users(Restangular, $auth, _) {

  var _user;

  var service = {
    getCurrentUser: getCurrentUser,
    setUser: setUser,
  };

  return service;

  function getCurrentUser() {
    if(!_.isUndefined(_user)) {
      return _user.get()
        .then(function(response) {
          return response.data;
      });
    }
    return {};
  }

  function setUser(id) {
    if(!_.isUndefined(id)){
      _user = Restangular.one('users', id);
    }
  }
}
