import {test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {ProductsPage} from "../pages/ProductsPage";
import {CartPage} from "../pages/CartPage";
import {CheckoutPage} from "../pages/CheckoutPage";
import { CREDS } from "./helpers/creds";


test("User can checkout and complete order", async ({page})=>{
    
    const login = new LoginPage(page);
    const product = new ProductsPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

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
    await checkout.fillCheckoutInfo("John", "Doe", "12345");
    await checkout.expectOnStepTwo();

    await checkout.finish();
    await checkout.expectOrderComplete();


});

