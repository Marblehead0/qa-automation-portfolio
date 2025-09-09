import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";


type POMFixtures = {
  login: LoginPage;
  product: ProductsPage;
  cart: CartPage;
  checkout: CheckoutPage;
};

export const test = base.extend<POMFixtures>({
    login: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    product: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
    cart: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkout: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
});

export { expect };