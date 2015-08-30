'use strict';

describe('When using the contains upper case directive', function() {
  var $scope, form;

  beforeEach(module('yourAppName'));
  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope;
    var element = angular.element(
      '<form name="form">' +
      '<input ng-model="model.somevalue"' +
      ' name="somevalue" contains-upper-case/>' +
      '</form>'
    );
    $scope.model = { somevalue: null };
    $compile(element)($scope);
    form = $scope.form;
  }));

  describe('when passing a value through the input field', function() {
    it('should pass with atleast one uppercase letter', function() {
      form.somevalue.$setViewValue('Hello');
      $scope.$digest();
      expect($scope.model.somevalue).toEqual('Hello');
      expect(form.somevalue.$valid).toBe(true);
    });

    it('should fail with no uppercase letters', function() {
      form.somevalue.$setViewValue('hello');
      $scope.$digest();
      expect($scope.model.somevalue).toEqual(undefined);
      expect(form.somevalue.$valid).toBe(false);
    });
  });
});
