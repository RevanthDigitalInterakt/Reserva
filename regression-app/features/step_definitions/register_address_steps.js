const address_page = require('../pages/address_page');
const homePage = require('../pages/home_page');
const loginPage = require('../pages/login_page');

const { I } = inject();

Given('the user is logged out and clicks on profile', async () => {
  await homePage.toAllow();
  await homePage.closeBanner();
  await homePage.doLogin();
});

When('logging in and being directed to home', async () => {
  await loginPage.loginSuccces();
});

Then('you should click on Profile and My addresses will see the message "You still dont have registered addresses, click on New Address and register"', async () => {
  await homePage.doLogin();
  await address_page.clickMyAddresses();
});
