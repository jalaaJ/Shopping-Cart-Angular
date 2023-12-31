import { test, expect } from '@playwright/test';

test('Successful register', async ({ page }) => {

  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/login');
  await page.getByRole('link', { name: 'Register here!' }).click();
  await page.getByPlaceholder('Enter your email').click();
  await page.getByPlaceholder('Enter your email').fill('hi@gmail.com');
  await page.getByPlaceholder('Enter your email').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('H12345');
  await page.getByPlaceholder('Enter your password').press('Tab');
  await page.getByPlaceholder('Confirm your password').fill('H12345');
  await page.getByRole('button', { name: 'Sign up' }).click(); 
  await expect(page).toHaveURL('http://localhost:4200/login');

  await page.waitForTimeout(5000);   
});

test('Expecting an error message for the password', async ({ page }) => {

    await page.goto('http://localhost:4200/');
    await page.goto('http://localhost:4200/login');
    await page.getByRole('link', { name: 'Register here!' }).click();
    await page.getByPlaceholder('Enter your email').click();
    await page.getByPlaceholder('Enter your email').fill('hi@gmail.com');
    await page.getByPlaceholder('Enter your email').press('Tab');
    await page.getByPlaceholder('Enter your password').fill('H1234');

    const xpath = "(//small[contains(@class,'block p-error')])[2]";
    const element = await page.waitForSelector(`xpath=${xpath}`);
    const textContent = await element.textContent();
    expect(textContent).toContain('Password should be at least 6 characters long, and contains at least 1 capital letter!');

    await page.waitForTimeout(5000);
  });

  test('Expecting an error message for the email', async ({ page }) => {

    await page.goto('http://localhost:4200/');
    await page.goto('http://localhost:4200/login');
    await page.getByRole('link', { name: 'Register here!' }).click();
    await page.getByPlaceholder('Enter your email').click();
    await page.getByPlaceholder('Enter your email').fill('hi@');
    const xpath = "//div[@class='ng-star-inserted']";
    const element = await page.waitForSelector(`xpath=${xpath}`);
    const textContent = await element.textContent();
    expect(textContent).toContain('Invalid email!');

    await page.waitForTimeout(3000);
  });

  test('Expecting a password mismatch in the confirm password', async ({ page }) => {

  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/login');
  await page.getByRole('link', { name: 'Register here!' }).click();
  await page.getByPlaceholder('Enter your email').click();
  await page.getByPlaceholder('Enter your email').fill('hi@gmail.com');
  await page.getByPlaceholder('Enter your email').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('H12345');
  await page.getByPlaceholder('Enter your password').press('Tab');
  await page.getByPlaceholder('Confirm your password').fill('h12345');
  const xpath = "//small[contains(@class,'block p-error')]";
  const element = await page.waitForSelector(`xpath=${xpath}`);
  const textContent = await element.textContent();
  expect(textContent).toContain('Password should match!');

  await page.waitForTimeout(5000);
  });

  test('Expecting a password mismatch in the password', async ({ page }) => {

    await page.goto('http://localhost:4200/');
    await page.goto('http://localhost:4200/login');
    await page.getByRole('link', { name: 'Register here!' }).click();
    await page.getByPlaceholder('Enter your email').click();
    await page.getByPlaceholder('Enter your email').fill('hi@gmail.com');
    await page.getByPlaceholder('Enter your email').press('Tab');
    await page.getByPlaceholder('Enter your password').press('Tab');
    const xpath = "//div[@class='ng-star-inserted']";
    const element = await page.waitForSelector(`xpath=${xpath}`);
    const textContent = await element.textContent();
    expect(textContent).toContain('Password is required!');
  
    await page.waitForTimeout(5000);
    });