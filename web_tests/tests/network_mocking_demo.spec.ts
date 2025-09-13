import { test, expect } from "@playwright/test";

test.describe("Mock test", () => {
  test("returns mocked JSON data", async ({ page }) => {
    // Intercept any request ending with /api/demo
    await page.route("**/api/demo", async route => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Hello from mock" }),
      });
    });

    await page.goto("/");

    const response = await page.evaluate(async () => {
      const res = await fetch("/api/demo");
      return res.json();
    });

    expect(response.message).toBe("Hello from mock");
  });

  test("handles mocked 500 error", async ({ page }) => {
    await page.route("**/api/demo", async route => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      });
    });

    await page.goto("/");

    const response = await page.evaluate(async () => {
      const res = await fetch("/api/demo");
      return { status: res.status, text: await res.text() };
    });

    expect(response.status).toBe(500);
    expect(response.text).toContain("Internal Server Error");
  });
});
