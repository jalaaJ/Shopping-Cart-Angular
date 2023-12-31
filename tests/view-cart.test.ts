import { test, expect } from '@playwright/test';

test('Expecting to see the Shop now inside of the cart', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/login');
  await page.getByPlaceholder('Enter your email').click();
  await page.getByPlaceholder('Enter your email').fill('abusalehjalaa@gmail.com');
  await page.getByPlaceholder('Enter your email').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('A12345');
  await page.getByPlaceholder('Enter your password').press('Enter');
  await page.locator('.card > p-button > .p-ripple').first().click();
  await page.getByRole('link', { name: 'Cart' }).click();
  const xpath = "(//span[@class='p-button-label ng-star-inserted'])[2]";
  const element = await page.waitForSelector(`xpath=${xpath}`);
  expect(element).toBeTruthy();
});