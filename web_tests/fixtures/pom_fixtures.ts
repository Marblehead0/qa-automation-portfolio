import { test as base, expect } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
import { ProductsPage } from "@pages/ProductsPage";
import { CartPage } from "@pages/CartPage";
import { CheckoutPage } from "@pages/CheckoutPage";

const IGNORE_CONSOLE_ERROR = [
  /Failed to load resource: the server responded with a status of (401|403|404)/i,
  /failed to load resource: net::ERR_FAILED/i,
  /google-analytics/i,
  /googletagmanager/i,
  /facebook\.net/i,
  /segment\.com/i,
  /service-worker/i,
];


type POMFixtures = {
  login: LoginPage;
  product: ProductsPage;
  cart: CartPage;
  checkout: CheckoutPage;
  consoleErrors: string[];
};

export const test = base.extend<POMFixtures>({
  login: async ({ page }, use) => { await use(new LoginPage(page)); },
  product: async ({ page }, use) => { await use(new ProductsPage(page)); },
  cart: async ({ page }, use) => { await use(new CartPage(page)); },
  checkout: async ({ page }, use) => { await use(new CheckoutPage(page)); },

consoleErrors: async ({ page }, use) => {
    const errors: string[] = [];
    const handler = (msg: any) => {
      if (msg.type() !== "error") return;
      const text = msg.text() || "";
      const url = (msg.location?.().url ?? ""); // optional chaining guard
      // ignore benign noise
      if (IGNORE_CONSOLE_ERROR.some((re) => re.test(text) || re.test(url))) return;
      errors.push(text);
    };
    page.on("console", handler);
    await use(errors);
    page.off("console", handler);
  },
});

export { expect };
