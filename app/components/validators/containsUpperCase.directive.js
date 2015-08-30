'use strict';

angular
  .module('yourAppName.validators')
  .directive('containsUpperCase', containsUpperCase);

function containsUpperCase(_) {
  var directive = {
    restrict: 'A',
    require: 'ngModel',
    link: linkFunc,
  };

  return directive;

  /**
   * Link function of Directive. In this we will look if there is atleast
   * one upper case in the passed input. If there is one, the invalidUpperCase
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
          //Check if any of the values are upper case,
          //if one is, return valid
          return val === val.toUpperCase();
        });

        ctrl.$setValidity('invalidUpperCase', valid);
      }

      // if it's valid, return the value to the model,
      // otherwise return undefined.
      return valid ? value : undefined;
    });
  }
}
