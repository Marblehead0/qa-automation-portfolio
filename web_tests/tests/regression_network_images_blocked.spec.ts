import { test, expect } from "@fixtures/pom_fixtures";
import { CREDS } from "@helpers/creds";
import { blockAnalytics, blockImages } from "@utils/network";

test("@regression app still works when images are blocked", async ({ login, product, cart, checkout, page, consoleErrors }) => {
  // Block noisy third-party and all images
  await blockAnalytics(page);
  await blockImages(page);

  // Login
  await login.goto();
  await login.login(CREDS.user, CREDS.pass);
  await product.expectOnPage();

  // Inventory should still render text even if images are blocked
  const name = "Sauce Labs Backpack";
  await product.addItemTocartByName(name);
  await product.expectCartCount(1);

  // Checkout flow
  await cart.gotoCart();
  await cart.expectProductInCart(name);
  await cart.startCheckout();

  await checkout.expectOnStepOne();
  await checkout.fillCheckoutInfo("John", "Doe", "12345");
  await checkout.expectOnStepTwo();
  await checkout.finish();
  await checkout.expectOrderComplete();

  // Ensure no console errors leaked
  await expect(consoleErrors, "No console errors should appear").toEqual([]);
});
