import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CREDS } from "./helpers/creds";


test("@smoke login, add item, see in cart", async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);

  await page.goto("/");

  await login.login(CREDS.user, CREDS.pass);
  await products.expectOnPage();

  await products.addItemTocartByName("Sauce Labs Backpack");
  await products.expectCartCount(1);

  await cart.gotoCart();
  await cart.expectProductIncart("Sauce Labs Backpack");

});
