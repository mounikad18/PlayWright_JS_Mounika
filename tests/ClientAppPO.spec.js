const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');
// JSON to String and then JS Object
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeOrderTestData.json")));

test.only ('@pageobjects Client APP Login', async ({browser,page}) => {
  
  // usig page object model, get methods from LoginPage.js
    
    const products = page.locator(".card-body");
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo(); 
    await loginPage.validlogin(dataSet.username, dataSet.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(dataSet.productName);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(dataSet.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();



 });