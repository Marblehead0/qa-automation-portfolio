import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  private page: Page;
  private cartLink: Locator;
  private cartItems: Locator;
  private cartBadge: Locator;
  private checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.getByRole("link", { name: "Shopping Cart" }).or(page.locator(".shopping_cart_link"));
    this.cartItems = page.locator(".cart_item");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.checkoutButton = page.locator('[data-test^="checkout"]');
  }

  async gotoCart() {
    await this.cartLink.click();
  }

  async expectProductInCart(productName: string) {
    const item = this.cartItems.filter({ hasText: productName });
    await expect(item).toHaveCount(1);
  }

  async removeItemByName(productName: string) {
    const item = this.cartItems.filter({ hasText: productName });
    const removeBtn = item.getByRole("button", { name: /remove/i });
    await removeBtn.click();
  }

  async expectCartEmpty() {
    await expect(this.cartItems).toHaveCount(0);
    await expect(this.cartBadge).toBeHidden();
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }

  async expectCartCount(expected: number) {
    const visible = await this.cartBadge.isVisible();
    const count = visible ? parseInt((await this.cartBadge.textContent()) || "0", 10) : 0;
    expect(count).toBe(expected);
  }
}
