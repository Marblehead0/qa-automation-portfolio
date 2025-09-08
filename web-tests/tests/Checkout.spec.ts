import {test} from "@playwright/test";
import {Loginpage} from "../pages/Loginpage";
import {ProductsPage} from "../pages/ProductsPage";
import {CartPage} from "../pages/CartPage";
import {CheckoutPage} from "../pages/CheckoutPage";


test("User can checkout and complete order", async ({page})=>{
    
    const login = new Loginpage(page);
    const product = new ProductsPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto();
    await login.login("standard_user", "secret_sauce");

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

