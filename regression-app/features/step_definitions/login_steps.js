const homePage = require('../pages/home_page');
const loginPage = require('../pages/login_page');

Given('that the user accesses the login screen', async () => {
  await homePage.toAllow();
  await homePage.closeBanner();
});

When('all login information is present correctly', async () => {
  await homePage.doLogin();
  await loginPage.loginSuccces();
});

Then('the user should be directed to the logged in area', async () => {
  await loginPage.checkLoginSucces();
});

When('login information is applied incorrectly', async () => {
  await loginPage.loginFail();
});

Then('the user will see the error message "Check the fields above and enter a valid email or password"', async () => {
  await loginPage.checkLoginFail();
});

Given('that the user clicked on Forgot my password', async () => {
  await homePage.toAllow();
  await homePage.closeBanner();
  await homePage.doLogin();
  await loginPage.clickForgotPassword();
});

When('enter email and click send e-mail', async () => {
  await loginPage.inputEmail();
  await loginPage.clickSendEmail();
});

Then('the email must be sent', async () => {
  await loginPage.checkUpdatePassword();
});
