import {chromium, test, expect} from '@playwright/test';

test("Successful login", async ({ page }) => {

    await page.goto('http://localhost:4200/');
    await page.fill("//input[@formcontrolname='email']", "abusalehjalaa@gmail.com");
    await page.fill("//input[@formcontrolname='password']", "A12345");
    await page.click("p-button");
    await expect(page).toHaveURL('http://localhost:4200/products');
    await page.waitForTimeout(5000);
    
});

test('Failed login', async () => {
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://localhost:4200/');
    await page.goto('http://localhost:4200/login');
    await page.getByPlaceholder('Enter your email').click();
    await page.getByPlaceholder('Enter your email').fill('jalaa@');
    await page.getByPlaceholder('Enter your password').click();
    await page.getByPlaceholder('Enter your password').fill('helloA1');
    
    await page.waitForTimeout(5000);
  });

test('Expecting an error message for email', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.goto('http://localhost:4200/login');
    await page.getByPlaceholder('Enter your email').click();
    await page.getByPlaceholder('Enter your email').press('Tab');
    const xpath = "(//div[@class='ng-star-inserted'])[1]";
    const element = await page.waitForSelector(`xpath=${xpath}`);
    const textContent = await element.textContent();
    expect(textContent).toContain('Email is required!');

    await page.waitForTimeout(5000);
  });

test('Expecting an error pop-up message to appear', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/login');
  await page.getByPlaceholder('Enter your email').click();
  await page.getByPlaceholder('Enter your email').fill('jalaa@gmail.com');
  await page.getByPlaceholder('Enter your email').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('A12345');
  await page.getByRole('button', { name: 'Log in' }).click();
  const toastSelector = '.p-toast-message';
  const toastElement = await page.waitForSelector(toastSelector, { state: 'visible' });

  // Assert that the toast element exists and is visible
  expect(toastElement).toBeTruthy();

});