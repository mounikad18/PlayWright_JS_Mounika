const {test, expect} = require('@playwright/test');

test.only ('Client APP Login', async ({browser,page}) => {
  //await expect(page.locator("[style*='block']")).toContainText("Incorrect"); kaushik document
    const userName = page.locator("#userEmail");
    const signIn = page.locator("[value='Login']");
    const products = page.locator(".card-body");
    const productName = 'ADIDAS ORIGINAL';
   await page.goto("https://rahulshettyacademy.com/client");
await userName.fill("ans@gmail.com");
await page.locator("#userPassword").fill("Iamking@000");
await signIn.click();
console.log(await page.title());
await page.waitForLoadState('networkidle');
await page.locator(".card-body b").first().waitFor();
const titles = await page.locator(".card-body b").allTextContents();
console.log(titles);
const count = await products.count();
for (let i=0; i<count; ++i) {
    if (await products.nth(i).locator("b").textContent() === productName) 
      {
        await products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
   console.log(bool);
   await page.locator("text=Checkout").click();
   await page.locator("[placeholder*='Country']").type("ind",{delay:100});
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i=0; i<optionsCount; ++i) 
   {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") 
      {
        await dropdown.locator("button").nth(i).click();
        break;
        //await expect(page.locator("[style*='block']")).toContainText("Incorrect"); file
     }
   }
   
});
