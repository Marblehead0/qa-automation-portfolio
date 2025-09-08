import { test } from "@playwright/test";
import { Loginpage } from "../pages/Loginpage";
import { ProductsPage } from "../pages/ProductsPage";

test.describe("Success", () => {
    test("user can log in to saucedemo", async ({ page }) => {
        await test.step("login", async () => {
            const loginpage = new Loginpage(page);
            const productspage = new ProductsPage(page);

            await loginpage.goto();
            await loginpage.login("standard_user", "secret_sauce");
            await productspage.expectOnPage();
        });
    });
});

test("user cannot log in with invalid password", async ({ page }) => {
    const loginpage = new Loginpage(page);

    await loginpage.goto();
    await loginpage.login("standard_user", "wrong_password");
    await loginpage.expectErrorContains("Username and password do not match any user in this service");
});


