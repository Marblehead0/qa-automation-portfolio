import { Page, Route } from "@playwright/test";

export async function blockAnalytics(page: Page) {
  const patterns = [
    /www\.google-analytics\.com\/.*/i,
    /www\.googletagmanager\.com\/.*/i,
    /connect\.facebook\.net\/.*/i,
    /cdn\.segment\.com\/.*/i,
  ];
  await Promise.all(patterns.map(p => page.route(p, (route: Route) => route.abort())));
}

export async function blockImages(page: Page) {
  await page.route(/\.(png|jpg|jpeg|gif|svg|webp)(\?.*)?$/i, (route) => route.abort());
}

export async function mockJson(page: Page, urlPattern: RegExp, json: any, status = 200) {
  await page.route(urlPattern, (route) => {
    route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify(json),
    });
  });
}
