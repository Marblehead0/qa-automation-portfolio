import {test} from "@playwright/test";
import {Loginpage} from "../pages/Loginpage";
import {ProductsPage} from "../pages/ProductsPage";

test("user can add first product to cart", async ({page})=>{
    const loginpage = new Loginpage(page);
    const productspage = new ProductsPage(page);

    await loginpage.goto();
    await loginpage.login("standard_user","secret_sauce");
    await productspage.expectOnPage();

    await productspage.addFirstProductToCart();
    await productspage.expectCartBadgeCount(1); 
});