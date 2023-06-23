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
  await bagPage.checkEmptyBag();
});

Given('that the user is in the empty bag', async () => {
  await homePage.toAllow();
  await homePage.closeBanner();
  await homePage.clickBag();
  await bagPage.checkEmptyBag();
});

When('clicking "Go Shopping"', async () => {
  await bagPage.clickGoShopping();
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

When('click on Add to bag', async () => {
  await catalogPage.clickProduct();
  await catalogPage.scrollScreen();
  await catalogPage.clickAddToBag();
  await I.wait(3);
});

Then('the user can click on the bag symbol and view the product', async () => {
  await catalogPage.clickBag();
  await I.wait(5);
});
