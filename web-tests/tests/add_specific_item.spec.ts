import {test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {ProductsPage} from "../pages/ProductsPage";
import { CREDS } from "./helpers/creds";

test("user can add product to cart by name", async ({page})=>{
    const loginpage = new LoginPage(page);
    const productspage = new ProductsPage(page);

    await loginpage.goto();
    await loginpage.login(CREDS.user, CREDS.pass);
    await productspage.expectOnPage();

    await productspage.addItemTocartByName("Sauce Labs Bolt T-Shirt");
    await productspage.expectCartBadgeCount(1); 
});