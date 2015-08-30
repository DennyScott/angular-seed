'use strict';

angular
    .module('yourAppName.services')
    .factory('authentication', authentication);

/**
 * Used for all Authentication Factory Services, that isn't covered by the
 * satellizer module. This includes email and password verifications, reset
 * email, etc.
 *
 */
function authentication($auth, $state, _, Restangular, $rootScope, authEvents) {

  var auth = {
    resetPassword: resetPassword,
    login: login,
    verifyEmail: verifyEmail,
    verifyPassword: verifyPassword,
    logout: logout,
    disableOnLoggedIn: disableOnLoggedIn,
  };

  return auth;

  /**
   * Call to reset your password. The email listed will have a new email sent
   * to it.
   *
   * @param  {string} email Email to send new password to.
   */
  function resetPassword(email) {
    if (verifyEmail(email)) {
      Restangular.one('users', email).customGET('reset-password');
    }
  }

  /**
   * Log the user into the yourAppName server using an email and password.
   * If the login is successful, forward the user to the log.dashboard page.
   *
   * @param  {string} email  Email of the current user
   * @param  {string} password Password of the current user
   */
  function login(email, password) {
    if (verifyEmail(email) && verifyPassword(password)) {
      $auth.login({
        email: email,
        password: password,
      }).then(function(res) {
        if (res.status === 200) {
          $rootScope.$broadcast(authEvents.LOGIN);
          $state.go('log.dashboard');
        }
      });
    }
  }

  /**
   * Check if the user is currently logged in. If they are, forward them to
   * the dashboard. If they are not logged in, they can remain on the page.
   *
   * To use this, place this in the controller of the desired page.
   */
  function disableOnLoggedIn() {
    if ($auth.isAuthenticated()) {
      $state.go('log.dashboard');
    }
  }

  /**
   * Log out of the app, using the satellizer logout auth service, and redirect
   * the user to the login page.
   */
  function logout() {
    $auth.logout();
    $state.go('login');
  }

  /**
   * Check that the email passed through in login has both an @ sign and
   * a .
   *
   * @param  {string} email Email passed through at login
   * @return {bool}       Was the email a valid email.
   */
  function verifyEmail(email) {
    if (_.isUndefined(email)) {
      return false;
    }

    var atSign = _.any(email, function(letter) {
      return letter === '@';
    });

    var dot = _.any(email, function(letter) {
      return letter === '.';
    });

    return atSign && dot;
  }

  /**
   * Verify that the password follows the listed criteria:
   * 1. Has atleast one upper case letter
   * 2. Has atleast one lower case letter
   * 3. Has atleast one number character
   * 4. Is atleast 4 characters long
   * 5. Is max 22 characters long
   *
   * @param  {string} pass Password to compare against
   * @return {bool}      Is the password use the correct standards.
   */
  function verifyPassword(pass) {
    if (_.isUndefined(pass)) {
      return false;
    }

    var upperCase = _.any(pass, function(char) {
      return _.isNaN(parseInt(char)) ? char === char.toUpperCase() : false;
    });

    var lowerCase = _.any(pass, function(char) {
      return _.isNaN(parseInt(char)) ? char === char.toLowerCase() : false;
    });

    var numberCase = _.any(pass, function(char) {
      return _.isNumber(parseInt(char));
    });

    var length = pass.length >= 4 && pass.length <= 22;

    return upperCase && lowerCase && numberCase && length;
  }
}
