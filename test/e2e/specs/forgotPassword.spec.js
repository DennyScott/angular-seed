'use strict';

describe('When a user forgets there password', function() {
  var baseUrl = 'http://localhost:3000/#/';
  var login = baseUrl + 'login';
  var forgotPassword = baseUrl + 'forgot-password';

  it('they can click the button in login to be redirected', function() {
    browser.get(login);
    $('#forgot-password').click();
    expect(browser.getCurrentUrl()).toBe(forgotPassword);
  });

  it('placing in an incorrect email will notify the user', function() {
    $('#email').sendKeys('t.com');
    $('#reset-password').click();
    expect($('#invalid').isDisplayed()).toBeTruthy();
    expect($('#valid').isDisplayed()).toBeFalsy();
  });

  it('placing a correct email will notify the user', function() {
    $('#email').sendKeys('app@appnovation.com');
    $('#reset-password').click();
    expect($('#valid').isDisplayed()).toBeTruthy();
    expect($('#invalid').isDisplayed()).toBeFalsy();
  });
});
