'use strict';

describe('When a user enters the splash screen', function() {

  var baseUrl = 'http://localhost:3000/#/';
  var login = baseUrl + 'login';
  var dashboard = baseUrl + 'l/dashboard';

  it('and clicks on the login, they should be redirected', function() {
    browser.get(baseUrl);
    expect($('#dashboard').isDisplayed()).toBeFalsy();
    expect($('#login').isDisplayed()).toBeTruthy();
    $('#login').click();
    expect(browser.getCurrentUrl()).toBe(login);
  });

  it('when they enter the incorrect credentials, nothing happens', function() {
    $('#email').sendKeys('t.com');
    $('#password').sendKeys('1234abcD!');
    $('#submit').click();
    expect(browser.getCurrentUrl()).toBe(login);
  });

  it('when entering a correct credential, go to dashboard', function() {
    $('#email').sendKeys('app@appnovation.com');
    $('#password').sendKeys('1234abcD!');
    $('#submit').click();
    expect(browser.getCurrentUrl()).toBe(dashboard);
  });

  it('after loggin in, going to splash shows dashboard button', function() {
    browser.get(baseUrl);
    expect($('#dashboard').isDisplayed()).toBeTruthy();
    expect($('#login').isDisplayed()).toBeFalsy();
    $('#dashboard').click();
    expect(browser.getCurrentUrl()).toBe(dashboard);
  });

  it('if logged in, login page redirects to dashboard', function() {
    browser.get(login);
    expect(browser.getCurrentUrl()).toBe(dashboard);
  });

  it('clicking log out returns user to the login page', function() {
    $('#logout').click();
    expect(browser.getCurrentUrl()).toBe(login);
  });

  it('while logged out, going to dashboard returns to login', function() {
    browser.get(dashboard);
    expect(browser.getCurrentUrl()).toBe(login);
  });
});
