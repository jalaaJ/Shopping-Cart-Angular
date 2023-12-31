import { defineConfig } from '@playwright/test';

export default defineConfig({

  testMatch: [
    "tests/login.test.ts",
    "tests/register.test.ts",
    "tests/add-to-cart.test.ts",
    "tests/view-cart.test.ts",
    "tests/remove-from-cart.test.ts",
    "tests/logout.test.ts"
  
            ],

  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env['CI'],

  /* Retry on CI only */
  retries: process.env['CI'] ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env['CI'] ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [ ['html', {open: 'never'}], ['json', {
    outputFile: "jsonReports/jsonReport.json"
  }] ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    headless: false,
  
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4200/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

});
