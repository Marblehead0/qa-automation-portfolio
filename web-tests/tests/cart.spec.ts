import {test} from "@playwright/test";
import {Loginpage} from "../pages/Loginpage";
import {ProductsPage} from "../pages/ProductsPage";
import {CartPage} from "../pages/CartPage";

test("user can see product and see it in the cart", async ({page})=>{
    const login = new Loginpage(page);
    const product = new ProductsPage(page);
    const cart = new CartPage(page);

    await login.goto();
    await login.login("standard_user","secret_sauce");
    await product.expectOnPage();

    await product.addItemTocartByName("Sauce Labs Backpack");
    await product.expectCartBadgeCount(1);

    await cart.gotoCart();
    await cart.expectProductIncart("Sauce Labs Backpack");
});


