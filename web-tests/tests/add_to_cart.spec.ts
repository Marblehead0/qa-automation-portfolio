import {test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {ProductsPage} from "../pages/ProductsPage";
import { CREDS } from "./helpers/creds";

test("user can add first product to cart", async ({page})=>{
    const loginpage = new LoginPage(page);
    const productspage = new ProductsPage(page);

    await loginpage.goto();
    await loginpage.login(CREDS.user, CREDS.pass);
    await productspage.expectOnPage();

    await productspage.addFirstProductToCart();
    await productspage.expectCartBadgeCount(1); 
});