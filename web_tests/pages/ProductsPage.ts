// web_tests/pages/ProductsPage.ts
import { Page, Locator, expect } from "@playwright/test";

export class ProductsPage {
  private page: Page;
  private title: Locator;
  private addToCartButton: Locator;
  private cartBadge: Locator;
  private burgerMenu: Locator;
  private logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator(".title");
    this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.burgerMenu = page.locator("#react-burger-menu-btn");
    this.logoutLink = page.locator("#logout_sidebar_link");
  }

  async expectOnPage() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.title).toHaveText("Products");
  }

  async addFirstProductToCart() {
    await this.addToCartButton.first().click();
  }

  async expectCartBadgeCount(expected: number) {
    await expect(this.cartBadge).toHaveText(String(expected));
  }

  // Kept your name but fixed casing; also provide a backward-compatible alias below.
  async addItemToCartByName(name: string) {
    const row = this.page.locator(".inventory_item").filter({ hasText: name });
    await row.getByRole("button", { name: "Add to cart" }).click();
  }

  // Backward-compatible alias (does nothing but forward the call)
  async addItemTocartByName(name: string) {
    await this.addItemToCartByName(name);
  }

  async getCartCount(): Promise<number> {
    const visible = await this.cartBadge.isVisible();
    if (!visible) return 0;
    const txt = (await this.cartBadge.textContent())?.trim() ?? "0";
    const n = Number(txt);
    return Number.isFinite(n) ? n : 0;
    }

  async expectCartCount(n: number) {
    if (n === 0) {
      await expect(this.cartBadge).toBeHidden();
    } else {
      await expect(this.cartBadge).toHaveText(String(n));
    }
  }

  async logout() {
    await this.burgerMenu.click();
    // Wait a tick for the side menu to render to avoid occasional flake
    await expect(this.logoutLink).toBeVisible();
    await this.logoutLink.click();
  }
}
