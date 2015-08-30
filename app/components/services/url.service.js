'use strict';

/**
 * url
 *
 * @namespace Factories
 */
angular
  .module('yourAppName.services')
  .factory('url', url);

/**
 * @namespace url
 * @desc creates absolute pathes for urls to the app server
 * @memberof Factories
 */
function url(_, appUrls, env) {
  return _.mapValues(appUrls.ROUTES, generateUrl);

  /**
   * generateUrl
   *
   * @param {String} route The relative route
   * @return {String} The absolute route
   */
  function generateUrl(route) {
    return [env.HOST, appUrls.API_VERSION, route].join('/');
  }
}
