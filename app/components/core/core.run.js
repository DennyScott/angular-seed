'use strict';

angular
  .module('yourAppName.core')
  .run(checkForToken);

function checkForToken($auth, users) {
    if($auth.isAuthenticated()) {
      users.setUser($auth.getPayload().id);
    }
}
