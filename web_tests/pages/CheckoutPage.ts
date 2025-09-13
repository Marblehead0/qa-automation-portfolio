// web_tests/pages/CheckoutPage.ts
import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage {
  private page: Page;
  private firstName: Locator;
  private lastName: Locator;
  private postalCode: Locator;
  private continueBtn: Locator;

  private finishBtn: Locator;
  private completeHeader: Locator;

  private errorBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('[data-test^="firstName"]');
    this.lastName = page.locator('[data-test^="lastName"]');
    this.postalCode = page.locator('[data-test^="postalCode"]');
    this.continueBtn = page.getByRole("button", { name: "Continue" });
    this.finishBtn = page.getByRole("button", { name: "Finish" });
    this.completeHeader = page.locator(".complete-header");
    this.errorBanner = page.locator("[data-test='error']");
  }

  async expectOnStepOne() {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    await expect(this.firstName).toBeVisible();
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueBtn.click();
  }

  async clickContinue() {
    await this.continueBtn.click();
  }

  async expectErrorContains(text: string) {
    await expect(this.errorBanner).toContainText(text);
  }

  async expectOnStepTwo() {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
  }

  async finish() {
    await this.finishBtn.click();
  }

  async expectOrderComplete() {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.completeHeader).toContainText(/thank you/i);
  }
}
