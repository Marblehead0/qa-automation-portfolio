import {test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {ProductsPage} from "../pages/ProductsPage";
import {expect} from '@playwright/test';
import { CREDS } from "./helpers/creds";


test("user can log out from the products page", async ({page})=>{
    const loginpage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginpage.goto();
    await loginpage.login(CREDS.user, CREDS.pass);
    await productsPage.expectOnPage();
    
    await productsPage.logout();
    
    const {pathname} = new URL(page.url());

    expect(pathname).toBe("/");

    await expect(page.locator("#login-button")).toBeVisible();
}); 


