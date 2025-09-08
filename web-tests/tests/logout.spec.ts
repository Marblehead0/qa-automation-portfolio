import {test} from "@playwright/test";
import {Loginpage} from "../pages/Loginpage";
import {ProductsPage} from "../pages/ProductsPage";
import {expect} from '@playwright/test';


test("user can log out from the products page", async ({page})=>{
    const loginpage = new Loginpage(page);
    const productsPage = new ProductsPage(page);

    await loginpage.goto();
    await loginpage.login("standard_user", "secret_sauce");
    await productsPage.expectOnPage();
    
    await productsPage.logout();
    
    const {pathname} = new URL(page.url());

    expect(pathname).toBe("/");

    await expect(page.locator("#login-button")).toBeVisible();
}); 


