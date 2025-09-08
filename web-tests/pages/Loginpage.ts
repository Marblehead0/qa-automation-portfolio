import {page, locator, expect} from '@playwright/test';

export class Loginpage{

    private page: page;
    private usernameInput: locator;
    private passwordInput: locator;
    private loginButton: locator;
    private errorMessage: locator;

    constructor(page: page){
        this.page = page;
        this.usernameInput = page.locator("#user-name");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator("[data-test='error']");
    }

    async goto(){
        await this.page.goto("https://www.saucedemo.com/");
    }

    async login(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);

        await expect(this.loginButton).toBeVisible();
        await this.loginButton.click();
    }

    async expectErrorContains(text: string){
        await expect(this.errorMessage).toContainText(text);
    }   
}
        