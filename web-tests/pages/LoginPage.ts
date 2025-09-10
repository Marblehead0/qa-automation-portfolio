import {page, locator, expect} from '@playwright/test';

export class LoginPage{

    private page: page;
    private usernameInput: locator;
    private passwordInput: locator;
    private loginButton: locator;
    private errorMessage: locator;

    constructor(page: page){
        this.page = page;
        this.usernameInput = page.getByPlaceholder("username");
        this.passwordInput = page.getByPlaceholder("password");
        this.loginButton = page.getByRole("button", {name: "Login"});
        this.errorMessage = page.locator("[data-test='error']");
    }

    async goto(){
        await this.page.goto("/");
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
    
    async expectOnPage(){
        await expect(this.loginButton).toBeVisible();
    }
}
        