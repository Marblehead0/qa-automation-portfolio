import { test, expect } from "@fixtures/pom_fixtures";
import { CREDS } from "helpers/creds";

test.describe("Login flow", () => {
    test("@smoke user can log in to saucedemo", async ({ login, product }) => {
        await test.step("login", async () => {

            await login.goto();
            await login.login(CREDS.user, CREDS.pass);
            await product.expectOnPage();
        });
    });

    test("@smoke user can log out from the products page", async ({ login, product }) => {

        await login.goto();
        await login.login(CREDS.user, CREDS.pass);
        await product.expectOnPage();

        await product.logout();

        await login.expectOnPage();
    });

    test("@regression shows error for invalid credentials", async ({ login,consoleErrors }) => {
        await login.goto();
        await login.login(CREDS.user, "wrong");
        await login.expectErrorContains("Username and password do not match");

        expect(consoleErrors, "No console errors during failed login").toEqual([]);
    });

});



