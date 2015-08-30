'use strict';

describe('Controller Dashboard: ', function() {
  var dashboardController;

  beforeEach(module('yourAppName'));

  beforeEach(inject(function($controller) {
    dashboardController = $controller('DashboardController', {
    });
  }));

  describe('testing clicks', function() {
    it('does the click iterate our total clicks', function() {
      expect(dashboardController.clicks).toBe(0);
      dashboardController.onClick();
      expect(dashboardController.clicks).toBe(1);
    });
  });

});
