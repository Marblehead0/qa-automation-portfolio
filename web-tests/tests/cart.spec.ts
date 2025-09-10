import { test, expect } from "fixtures/pom_fixtures";
import { CREDS } from "helpers/creds";

test.describe("Cart flow", () => {
    test("user can see product and see it in the cart", async ({ login, product, cart, }) => {


        await login.goto();
        await login.login(CREDS.user, CREDS.pass);
        await product.expectOnPage();

        await product.addItemTocartByName("Sauce Labs Backpack");
        await product.expectCartBadgeCount(1);

        await cart.gotoCart();
        await cart.expectProductIncart("Sauce Labs Backpack");
    });

    test("user can add first product to cart", async ({ login, product }) => {

        await login.goto();
        await login.login(CREDS.user, CREDS.pass);
        await product.expectOnPage();

        await product.addFirstProductToCart();
        await product.expectCartBadgeCount(1);
    });

    test("user can add product to cart by name", async ({ login, product }) => {

        await login.goto();
        await login.login(CREDS.user, CREDS.pass);
        await product.expectOnPage();

        await product.addItemTocartByName("Sauce Labs Bolt T-Shirt");
        await product.expectCartBadgeCount(1);
    });

    test("user can remove a product from the cart", async ({ login, product, cart }) => {

        await login.goto();
        await login.login(CREDS.user, CREDS.pass);
        await product.expectOnPage();

        const name = "Sauce Labs Backpack";
        await product.addItemTocartByName(name);
        await product.expectCartBadgeCount(1);

        await cart.gotoCart();
        await cart.expectProductIncart(name);

        await cart.removeItemByName(name);
        await cart.expectCartEmpty();

    });

    test("@smoke login, add item, see in cart", async ({ login, product, cart }) => {

        await login.goto();

        await login.login(CREDS.user, CREDS.pass);
        await product.expectOnPage();

        await product.addItemTocartByName("Sauce Labs Backpack");
        await product.expectCartCount(1);

        await cart.gotoCart();
        await cart.expectProductIncart("Sauce Labs Backpack");

    });



});
