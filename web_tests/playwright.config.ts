import  {defineConfig, devices} from '@playwright/test';

export default defineConfig({

 globalSetup: require.resolve("./global-setup"),


  retries: 1,
  expect: { timeout: 5000 }, 
  reporter: [['html', {open: 'never'}]],
  use: {
    baseURL: process.env.BASE_URL ?? "https://www.saucedemo.com/",
    headless : true,
    actionTimeout: 10_000,            
    navigationTimeout: 15_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry', 

  },
  projects: [
    { name: 'chromium', use : {...devices['Desktop Chrome']} },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
  ],
});