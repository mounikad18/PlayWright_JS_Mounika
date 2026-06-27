const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');

test('Page Playwright Test', async ({browser,page}) => {
  
      const userName = page.locator("#username");
      const signIn = page.locator("#signInBtn");
      const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     console.log(await page.title());
     await expect(page.title());
     await userName.fill("rahulshetty");
     await page.locator("#password").fill("Learning@830$3mK2");
     await signIn.click();
     console.log(await page.locator("[style*='block']").textContent());
  
     await userName.fill("");
     await userName.fill("rahulshettyacademy");
     await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    
});

 test('UI Controls Test', async ({browser,page}) => {   
   
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const documentLink = page.locator("a[href*='documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshettyacademy");
    await page.locator("#password").fill("Learning@830$3mK2");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    console.log(await page.locator("#terms").isChecked());
    await expect(documentLink).toHaveAttribute("class","blinkingText");


});

  test('Child Window Handling', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");  
    const documentLink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      documentLink.click(),
    ])
   const text = await newPage.locator(".red").textContent();
   const arrayText = text.split("@");
   const domain = arrayText[1].split(" ")[0];  
   //console.log(domain);
   await page.locator("#username").fill(domain);
   console.log(await page.locator("#username").inputValue());
        
}); 

