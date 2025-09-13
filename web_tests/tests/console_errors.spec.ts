import { test, expect } from "@fixtures/pom_fixtures";

test("@regression no console errors on login page", async ({ page }) => {
    const errors: string[] = [];

    page.on("console", msg => {
        if (msg.type() === "error") {
            errors.push(msg.text());
        }
    });

    await page.goto("/");

    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();

    expect(
        errors,
        `Unexpected console errors:\n${errors.join("\n")}`
    ).toHaveLength(0);
});