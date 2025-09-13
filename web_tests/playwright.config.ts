import 'tsconfig-paths/register';
import  {defineConfig, devices} from '@playwright/test';

export default defineConfig({

 globalSetup: require.resolve("./global-setup"),


  retries: 1,
  reporter: [['html', {open: 'never'}]],

  use: {
    baseURL: process.env.BASE_URL ?? "https://www.saucedemo.com/",
    headless : true,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry', 

  },
  projects: [
    { name: 'chromium', use : {...devices['Desktop Chrome']} },
  ],
});