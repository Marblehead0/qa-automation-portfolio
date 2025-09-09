import { test, expect } from "../fixtures/pom_fixtures";
import { CREDS } from "./helpers/creds";

test.describe("Smoke", () => {

    test("happy path: login, add to cart, checkout, complete", async ({ login, product, cart, checkout }) => {
        await test.step("login", async () => {
            await login.goto();
            await login.login(CREDS.user, CREDS.pass);
            await product.expectOnPage();
        });

        await test.step("add to cart", async () => {
            const name = "Sauce Labs Backpack";
            await product.addItemTocartByName(name);
            await product.expectCartCount(1);
        });

        await test.step("start checkout", async () => {
            await cart.gotoCart();
            await cart.expectProductIncart("Sauce Labs Backpack");
            await cart.startCheckout();
            await checkout.expectOnStepOne();
        });

        await test.step("fill checkout info", async () => {
            await checkout.fillCheckoutInfo("John", "Doe", "12345");
            await checkout.expectOnStepTwo();
            await checkout.finish();
            await checkout.expectOrderComplete();
        });
    });
});
