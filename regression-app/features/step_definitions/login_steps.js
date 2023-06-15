const homePage = require('../pages/home_page');
const login_page = require('../pages/login_page.js');

Given('that the user accesses the login screen', async () => {
  await homePage.toAllow();
  await homePage.doLogin();
});

When('all login information is present correctly', async () => {
  await login_page.loginSuccces();
});

Then('the user should be directed to the logged in area', async () => {
  await login_page.checkLoginSucces();
});

When('login information is applied incorrectly', async () => {
  await login_page.loginFail();
});

Then('the user will see the error message "Check the fields above and enter a valid email or password"', async () => {
  await login_page.checkLoginFail();
});

Given('that the user clicked on Forgot my password', async () => {
  await homePage.toAllow();
  await homePage.doLogin();
  await login_page.clickForgotPassword();
});

When('enter email and click send e-mail', async () => {
  await login_page.inputEmail();
  await login_page.clickSendEmail();
});

Then('the email must be sent', async () => {
  await login_page.checkUpdatePassword();
});
