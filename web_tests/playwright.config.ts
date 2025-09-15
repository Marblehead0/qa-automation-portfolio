import  {defineConfig, devices} from '@playwright/test';
import * as dotenv from "dotenv";

dotenv.config();

const env = process.env.ENV ?? "local";

const urls: Record<string, string> = {
  local: "https://www.saucedemo.com",
  staging: "https://staging.saucedemo.com",
  prod: "https://saucedemo.com",
};


function resolveBaseURL() {
  const raw = process.env.BASE_URL?.trim();
  return raw && raw.length > 0 ? raw : "https://www.saucedemo.com/";
}

export default defineConfig({

 globalSetup: require.resolve("./global-setup"),


  retries: 1,
  workers: process.env.CI ? 2 : 4,
  expect: { timeout: 5000 }, 
  reporter: [['html', {open: 'never'}]],
  use: {
    baseURL: resolveBaseURL(),
    headless : true,
    actionTimeout: 10000,            
    navigationTimeout: 15000,
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