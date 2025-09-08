import  {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  retries: 1,
  reporter: [['html', {open: 'never'}]],

  use: {
    baseURL: "https://www.saucedemo.com/",
    headless : true,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry', 

  },
  projects: [
    { name: 'chromium', use : {...devices['Desktop Chrome']} },
  ],
});