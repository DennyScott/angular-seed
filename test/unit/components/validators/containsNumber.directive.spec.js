'use strict';

describe('When using the contains number directive', function() {
  var $scope, form;

  beforeEach(module('yourAppName'));
  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope;
    var element = angular.element(
      '<form name="form">' +
      '<input ng-model="model.somevalue"' +
      ' name="somevalue" contains-number/>' +
      '</form>'
    );
    $scope.model = { somevalue: null };
    $compile(element)($scope);
    form = $scope.form;
  }));

  describe('when passing a value in the input field', function() {
    it('should pass with atleast one number', function() {
      form.somevalue.$setViewValue('hello1');
      $scope.$digest();
      expect($scope.model.somevalue).toEqual('hello1');
      expect(form.somevalue.$valid).toBe(true);
    });

    it('should fail with no number', function() {
      form.somevalue.$setViewValue('hello');
      $scope.$digest();
      expect($scope.model.somevalue).toEqual(undefined);
      expect(form.somevalue.$valid).toBe(false);
    });
  });
});
