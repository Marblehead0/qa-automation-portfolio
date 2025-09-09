import { test } from "../fixtures/pom_fixtures";
import { CREDS } from "./helpers/creds";


test.describe("@regression checkout validation", () => {
    test("checkout blocks when ZIP is missing", async ({ login,product,cart,checkout }) => {


        await login.goto();
        await login.login(CREDS.user, CREDS.pass);

        await product.expectOnPage();
        const name = "Sauce Labs Backpack";
        await product.addItemTocartByName(name);
        await product.expectCartBadgeCount(1);

        await cart.gotoCart();
        await cart.expectProductIncart(name);

        await cart.startCheckout();

        await checkout.expectOnStepOne();
        await checkout.fillCheckoutInfo("John", "Doe", "");
        await checkout.expectOnStepOne();
        await checkout.expectErrorContains("Postal Code is required");

    });

    test("blocks when first name is missing", async ({ login,product,cart,checkout }) => {
        await login.goto();
        await login.login(CREDS.user, CREDS.pass);
        await product.expectOnPage();

        const name = "Sauce Labs Backpack";
        await product.addItemTocartByName(name);
        await product.expectCartBadgeCount(1);

        await cart.gotoCart();
        await cart.expectProductIncart(name);
        await cart.startCheckout();

        await checkout.expectOnStepOne();
        await checkout.fillCheckoutInfo("", "Doe", "12345");
        await checkout.expectOnStepOne();
        await checkout.expectErrorContains("First Name is required");
    });

    test("blocks when last name is missing", async ({ login,product,cart,checkout }) => {
        await login.goto();
        await login.login(CREDS.user, CREDS.pass);

        await product.expectOnPage();
        const name = "Sauce Labs Backpack";
        await product.addItemTocartByName(name);
        await product.expectCartBadgeCount(1);

        await cart.gotoCart();
        await cart.expectProductIncart(name);
        await cart.startCheckout();
        
        await checkout.expectOnStepOne();
        await checkout.fillCheckoutInfo("John", "", "12345");
        await checkout.expectOnStepOne();
        await checkout.expectErrorContains("Last Name is required");
    });

});
