import {test} from "@playwright/test";
import {Loginpage} from "../pages/Loginpage";
import {ProductsPage} from "../pages/ProductsPage";

test("user can add product to cart by name", async ({page})=>{
    const loginpage = new Loginpage(page);
    const productspage = new ProductsPage(page);

    await loginpage.goto();
    await loginpage.login("standard_user","secret_sauce");
    await productspage.expectOnPage();

    await productspage.addItemTocartByName("Sauce Labs Bolt T-Shirt");
    await productspage.expectCartBadgeCount(1); 
});