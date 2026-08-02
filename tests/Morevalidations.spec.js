const { test, expect } = require('@playwright/test');

test('Pop Up Validations', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
  //await page.pause();
  page.on('dialog', dialog => dialog.accept());
  await page.locator("#confirmbtn").click();
  await page.locator("#mousehover").hover();
  const framespage = page.frameLocator("#courses-iframe");
  await framespage.locator("li a[href*='lifetime-access']:visible").click();
  const textcheck = await framespage.locator(".text h2").textContent();
  console.log(textcheck.split(" ")[1]);


});

test('Screenshot Validations and Visual Comparison', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator('#displayed-text').screenshot({ path: 'partialScreenshot.png' });
  await page.locator("#hide-textbox").click();
  await page.screenshot({ path: 'fullPageScreenshot.png' });
  await expect(page.locator("#displayed-text")).toBeHidden();


});

test('Visual Comparison', async ({ page }) => {

await page.goto("https://google.com/");
expect(await page.screenshot()).toMatchSnapshot('google.png');

  });