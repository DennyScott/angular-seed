'use strict';

angular
  .module('yourAppName.core')

  /**
  * Build from desired Language. This will default to english.
  */
  .config(function($translateProvider, I18N) {
    $translateProvider.translations('en', I18N.en);
    $translateProvider.translations('fr', I18N.fr);

    $translateProvider.registerAvailableLanguageKeys(['en', 'fr'], {
      'en*': 'en',
      'fr*': 'fr',
      '*': 'en',
    })
    .determinePreferredLanguage('en');
  })

  /**
  * Initalize the Local Storage Provider, with the yourAppName module.
  */
  .config(function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('yourAppName');
  })

  /**
   * Initalize the Auth Provider for Satellizer. This will connect the providers
   * with their client Id's and state the baseUrl.
   *
   * @param  {Object} AuthProvider by Satellizer
   */
  .config(function($authProvider, env) {
    //TODO: Get our actual client Id's
    $authProvider.baseUrl = env.HOST;
    $authProvider.loginUrl = 'api-token-auth/';
    $authProvider.google({
      clientId: '631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.'
      + 'apps.googleusercontent.com',
    });

    $authProvider.github({
      clientId: '0ba2600b1dbdb756688b',
    });
  })

  /**
   * Initalize the Restangular Provider with the needed base url.
   */
  .config(function(RestangularProvider, env) {
    RestangularProvider.setBaseUrl(env.HOST);
  });

  // .config(function($locationProvider) {
  //   $locationProvider.html5Mode(true);
  // });
