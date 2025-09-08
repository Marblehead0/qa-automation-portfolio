import { test, expect } from "@playwright/test";

test("example with custom attachments", async ({ page }, testInfo) => {
  await page.goto("/");
  // Attach a quick screenshot at a key step
  const shot = await page.screenshot();
  await testInfo.attach("after-home", { body: shot, contentType: "image/png" });

  // Attach a text note (e.g., debug payload)
  await testInfo.attach("context-info", {
    body: "Reached home page and captured state",
    contentType: "text/plain",
  });

  await expect(page.locator("#login-button")).toBeVisible();
});
