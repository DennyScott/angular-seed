'use strict';

describe('When using the contains lower case directive', function() {
  var $scope, form;

  beforeEach(module('yourAppName'));
  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope;
    var element = angular.element(
      '<form name="form">' +
      '<input ng-model="model.somevalue"' +
      ' name="somevalue" contains-lower-case/>' +
      '</form>'
    );
    $scope.model = { somevalue: null };
    $compile(element)($scope);
    form = $scope.form;
  }));

  describe('when passing a value in the input field', function() {
    it('should pass with atleast one lower letter', function() {
      form.somevalue.$setViewValue('HELLo');
      $scope.$digest();
      expect($scope.model.somevalue).toEqual('HELLo');
      expect(form.somevalue.$valid).toBe(true);
    });

    it('should fail with no uppercase letters', function() {
      form.somevalue.$setViewValue('HELLO');
      $scope.$digest();
      expect($scope.model.somevalue).toEqual(undefined);
      expect(form.somevalue.$valid).toBe(false);
    });
  });
});
