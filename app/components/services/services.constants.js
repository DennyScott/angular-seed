'use strict';

angular
  .module('yourAppName.services')
  .constant('appUrls', {
    API_VERSION: 'v1',
    ROUTES: {
      AUTHENTICATE: 'auth',
    },
  })
  .constant('authEvents', {
    LOGIN: 'event_login',
    LOGOUT: 'event_loggout',
  });
