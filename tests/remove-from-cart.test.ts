import { test, expect } from '@playwright/test';

test('Expecting to see an empty cart after deleting a product', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/login');
  await page.getByPlaceholder('Enter your email').click();
  await page.getByPlaceholder('Enter your email').fill('abusalehjalaa@gmail.com');
  await page.getByPlaceholder('Enter your email').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('A12345');
  await page.getByPlaceholder('Enter your password').press('Enter');
  await page.locator('.card > p-button > .p-ripple').first().click();
  await page.locator('div:nth-child(2) > p-button > .p-ripple').click();
  await page.getByRole('link', { name: 'Cart' }).click();
  await page.getByRole('row', { name: '1 Fjallraven - Foldsack No. 1' }).getByRole('button').click();
  const xpath = "//span[contains(@class,'pi pi-trash')]";
  const delete_icon = await page.waitForSelector(`xpath=${xpath}`);
  await delete_icon.click();
  const xpath2 = "//strong[text()='Your cart is empty!']";
  const empty_cart_text = await page.waitForSelector(`xpath=${xpath2}`);
  expect(empty_cart_text).toBeTruthy();
});
