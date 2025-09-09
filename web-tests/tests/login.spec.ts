import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CREDS } from "./helpers/creds";

test.describe("Success", () => {
    test("user can log in to saucedemo", async ({ page }) => {
        await test.step("login", async () => {
            const loginpage = new LoginPage(page);
            const productspage = new ProductsPage(page);

            await loginpage.goto();
            await loginpage.login(CREDS.user, CREDS.pass);
            await productspage.expectOnPage();
        });
    });
});

test("user cannot log in with invalid password", async ({ page }) => {
    const loginpage = new LoginPage(page);

    await loginpage.goto();
    await loginpage.login("standard_user", "wrong_password");
    await loginpage.expectErrorContains("Username and password do not match any user in this service");
});


