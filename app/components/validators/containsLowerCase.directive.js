'use strict';

angular
  .module('yourAppName.validators')
  .directive('containsLowerCase', containsLowerCase);

function containsLowerCase(_) {
  var directive = {
    restrict: 'A',
    require: 'ngModel',
    link: linkFunc,
  };

  return directive;

  /**
   * Link function of Directive. In this we will look if there is atleast
   * one lower case in the passed input. If there is one, the invalidLowerCase
   * is not valid. Else it is invalid.
   */
  function linkFunc(scope, el, attr, ctrl) {
    // add a parser that will process each time the value is
    // parsed into the model when the user updates it.
    ctrl.$parsers.unshift(function(value) {
      var valid = false;
      if (value) {
        // test and set the validity after update.
        valid = _.any(value, function(val) {
          //Check if any of the values are lower case,
          //if one is, return valid
          return val === val.toLowerCase();
        });

        ctrl.$setValidity('invalidLowerCase', valid);
      }

      // if it's valid, return the value to the model,
      // otherwise return undefined.
      return valid ? value : undefined;
    });
  }
}
