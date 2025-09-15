import { test, expect } from "@fixtures/pom_fixtures";
import { CREDS } from "@helpers/creds";
import { blockAnalytics } from "@utils/network";
import {blockImages} from "@utils/network";


test.describe("Checkout flow", () => {
const PRODUCT = "Sauce Labs Backpack";
    test("@smoke happy path: login, add to cart, checkout, complete", async ({ login, product, cart, checkout,consoleErrors,page }) => {
        await blockAnalytics(page);
        await blockImages(page);

        await test.step("login", async () => {
            await login.goto();
            await login.loginAndExpectSuccess(CREDS.user, CREDS.pass);
        });

        await test.step("add to cart", async () => {
            await product.addItemTocartByName(PRODUCT);
            await product.expectCartCount(1);
        });

        await test.step("start checkout", async () => {
            await cart.gotoCart();
            await cart.expectProductInCart(PRODUCT);
            await cart.startCheckout();
            await checkout.expectOnStepOne();
        });

        await test.step("fill checkout info", async () => {
            await checkout.fillCheckoutInfo("John", "Doe", "12345");
            await checkout.expectOnStepTwo();
            await checkout.finish();
            await checkout.expectOrderComplete();
        });

        expect(consoleErrors, "No console errors should appear").toEqual([]);
    });

    test("@regression checkout blocks when ZIP is missing", async ({ login, product, cart, checkout }) => {


        await login.goto();
        await login.loginAndExpectSuccess(CREDS.user, CREDS.pass);

        await product.addItemTocartByName(PRODUCT);
        await product.expectCartBadgeCount(1);

        await cart.gotoCart();
        await cart.expectProductInCart(PRODUCT);

        await cart.startCheckout();

        await checkout.expectOnStepOne();
        await checkout.fillCheckoutInfo("John", "Doe", "");
        await checkout.expectOnStepOne();
        await checkout.expectErrorContains("Postal Code is required");

    });

    test("@regression blocks when first name is missing", async ({ login, product, cart, checkout }) => {
        await login.goto();
        await login.loginAndExpectSuccess(CREDS.user, CREDS.pass);

        await product.addItemTocartByName(PRODUCT);
        await product.expectCartBadgeCount(1);

        await cart.gotoCart();
        await cart.expectProductInCart(PRODUCT);
        await cart.startCheckout();

        await checkout.expectOnStepOne();
        await checkout.fillCheckoutInfo("", "Doe", "12345");
        await checkout.expectOnStepOne();
        await checkout.expectErrorContains("First Name is required");
    });

    test("@regression blocks when last name is missing", async ({ login, product, cart, checkout }) => {
        await login.goto();
        await login.loginAndExpectSuccess(CREDS.user, CREDS.pass);

        await product.addItemTocartByName(PRODUCT);
        await product.expectCartBadgeCount(1);

        await cart.gotoCart();
        await cart.expectProductInCart(PRODUCT);
        await cart.startCheckout();

        await checkout.expectOnStepOne();
        await checkout.fillCheckoutInfo("John", "", "12345");
        await checkout.expectOnStepOne();
        await checkout.expectErrorContains("Last Name is required");
    });

    test("@smoke User can checkout and complete order", async ({ login, product, cart, checkout }) => {


        await login.goto();
        await login.loginAndExpectSuccess(CREDS.user, CREDS.pass);

        await product.addItemTocartByName(PRODUCT);
        await product.expectCartBadgeCount(1);
        await cart.gotoCart();
        await cart.expectProductInCart(PRODUCT);
        await cart.startCheckout();

        await checkout.expectOnStepOne();
        await checkout.fillCheckoutInfo("John", "Doe", "12345");
        await checkout.expectOnStepTwo();

        await checkout.finish();
        await checkout.expectOrderComplete();


    });

});
