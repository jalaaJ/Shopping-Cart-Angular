import { test, expect } from '@playwright/test';

test('Expecting to see the Logout button', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/login');
  await page.getByPlaceholder('Enter your email').click();
  await page.getByPlaceholder('Enter your email').fill('abusalehjalaa@gmail.com');
  await page.getByPlaceholder('Enter your email').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('A12345');
  await page.getByPlaceholder('Enter your password').press('Enter');
  await page.getByLabel('Close').click();
  const xpath = "(//span[@class='p-button-label ng-star-inserted'])[1]";
  const element = await page.waitForSelector(`xpath=${xpath}`);
  const textContent = await element.textContent();
  expect(textContent).toContain('Logout');

  await page.waitForTimeout(3000);
});

test('Expecting to be redirected to login when clicking the Logout', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.goto('http://localhost:4200/login');
    await page.getByPlaceholder('Enter your email').click();
    await page.getByPlaceholder('Enter your email').fill('abusalehjalaa@gmail.com');
    await page.getByPlaceholder('Enter your email').press('Tab');
    await page.getByPlaceholder('Enter your password').fill('A12345');
    await page.getByPlaceholder('Enter your password').press('Enter');
    await page.getByLabel('Close').click();
    const xpath = "(//span[@class='p-button-label ng-star-inserted'])[1]";
    const element = await page.waitForSelector(`xpath=${xpath}`);
    await element.click();
    expect(page).toHaveURL("http://localhost:4200/login")

    await page.waitForTimeout(3000);
  });