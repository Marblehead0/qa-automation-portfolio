import {test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {ProductsPage} from "../pages/ProductsPage";
import {CartPage} from "../pages/CartPage";
import { CREDS } from "./helpers/creds";

test("user can see product and see it in the cart", async ({page})=>{
    const login = new LoginPage(page);
    const product = new ProductsPage(page);
    const cart = new CartPage(page);

    await login.goto();
    await login.login(CREDS.user, CREDS.pass);
    await product.expectOnPage();

    await product.addItemTocartByName("Sauce Labs Backpack");
    await product.expectCartBadgeCount(1);

    await cart.gotoCart();
    await cart.expectProductIncart("Sauce Labs Backpack");
});


