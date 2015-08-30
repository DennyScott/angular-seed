'use strict';

describe('Integration - When a user attempts to reset password', function() {
  var forgotPasswordController,
    authentication,
    $state,
    $rootScope,
    Restangular,
    $httpBackend,
    email = 'app@appnovation.com',
    request;

  beforeEach(module('yourAppName'));

  beforeEach(inject(
    function($controller, _authentication_, _Restangular_,
      _$auth_, _$state_, _$rootScope_, env, _$httpBackend_) {
      forgotPasswordController = $controller('ForgotPasswordController', {
        authentcation: _authentication_,
    }
  );

    authentication = _authentication_;
    $state = _$state_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    spyOn($state, 'go').and.callThrough();
    Restangular = _Restangular_;
    spyOn(Restangular, 'one').and.callThrough();

    request = env.HOST + '/users/app%40app' +
    'novation.com/reset-password';


    $httpBackend
      .when('GET', request)
      .respond({});
  }));

  describe('with correct password syntax', function() {
    it('they send an email verification', function() {
      $httpBackend.expectGET(request);
      forgotPasswordController.resetPassword(email);
      $httpBackend.flush();
      expect(Restangular.one).toHaveBeenCalled();
    });

    it('the emailState is in validEmail state', function() {
      forgotPasswordController.resetPassword(email);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(forgotPasswordController.emailState)
        .toBe(forgotPasswordController.emailStates.validEmailState);
    });
  });

  describe('with incorrect password syntax', function() {
    it('they do not send an email verficiation', function() {
      forgotPasswordController.resetPassword('t.com');
      expect(Restangular.one).not.toHaveBeenCalled();
    });

    it('the emailState is an invalidEmail state', function() {
      forgotPasswordController.resetPassword('t.com');
      expect(forgotPasswordController.emailState)
        .toBe(forgotPasswordController.emailStates.invalidEmailState);
    });
  });
});
