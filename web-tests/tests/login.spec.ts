import { test, expect } from "fixtures/pom_fixtures";
import { CREDS } from "helpers/creds";

test.describe("Login flow", () => {
    test("user can log in to saucedemo", async ({ login, product }) => {
        await test.step("login", async () => {

            await login.goto();
            await login.login(CREDS.user, CREDS.pass);
            await product.expectOnPage();
        });
    });

    test("user can log out from the products page", async ({ login, product }) => {

        await login.goto();
        await login.login(CREDS.user, CREDS.pass);
        await product.expectOnPage();

        await product.logout();

        await login.expectOnPage();
    });

    test("@regression shows error for invalid credentials", async ({ login }) => {
        await login.goto();
        await login.login(CREDS.user, "wrong");
        await login.expectErrorContains("Username and password do not match");
    });

});



