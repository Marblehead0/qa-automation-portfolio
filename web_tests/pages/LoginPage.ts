// web_tests/pages/LoginPage.ts
import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // SauceDemo uses capitalized placeholders
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.errorMessage = page.locator("[data-test='error']");
  }

  async goto() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await expect(this.loginButton).toBeVisible();
    await this.loginButton.click();
  }

  async expectErrorContains(text: string) {
    await expect(this.errorMessage).toContainText(text);
  }

  async expectOnPage() {
    await expect(this.loginButton).toBeVisible();
  }

  async loginAndExpectSuccess(username: string, password: string) {
  await this.login(username, password);
  await expect(this.page).toHaveURL(/inventory\.html/);
}
}
