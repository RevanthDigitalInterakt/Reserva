const bagPage = require('../pages/bag_page');
const homePage = require('../pages/home_page');
const loginPage = require('../pages/login_page');
const catalogPage = require('../pages/catalog_page');

const { I } = inject();

Given('that the user is on the home page', async () => {
  await homePage.toAllow();
  await homePage.closeBanner();
});

When('you click on the bag symbol and it is empty', async () => {
  await homePage.clickBag();
});

Then('he sees the message "Your bag is empty. Browse our app and discover products that are just like you!"', async () => {
  await bagPage.checkSacolaVazia();
});

Given('that the user is in the empty bag', async () => {
  await homePage.toAllow();
  await homePage.closeBanner();
  await homePage.clickBag();
  await bagPage.checkSacolaVazia();
});

When('clicking "Go Shopping"', async () => {
  await bagPage.clickIrAsCompras();
  await I.wait(5);
});

Then('you are directed to the Promotions Page', async () => {
  await catalogPage.checkPromocoes();
});

Given('that the user is in PDP', async () => {
  await homePage.toAllow();
  await homePage.closeBanner();
  await homePage.clickPromocoes();
  await I.wait(5);
});
