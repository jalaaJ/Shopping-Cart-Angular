import { test, expect } from '@playwright/test';

test('Expecting to see the checkout!', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/login');
  await page.getByPlaceholder('Enter your email').click();
  await page.getByPlaceholder('Enter your email').fill('abusalehjalaa@gmail.com');
  await page.getByPlaceholder('Enter your email').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('A12345');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(3000);
  await page.locator('.card > p-button > .p-ripple').first().click();
  await page.locator('div:nth-child(2) > p-button > .p-ripple').click();
  await page.getByRole('link', { name: 'Cart' }).click();
  const xpath = "//span[text()='Checkout!']";
  const element = await page.waitForSelector(`xpath=${xpath}`);
  
  // Assert that the element exists
  expect(element).toBeTruthy();

});