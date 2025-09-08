import {page, locator, expect} from '@playwright/test';

export class CheckoutPage{

    private page: page;
    private firstName : locator;
    private lastName : locator;
    private postalCode : locator
    private continueBtn : locator;

    private finishBtn : locator;
    private completeHeader : locator;   

    private errorBanner : locator;

    constructor(page: page){
        this.page = page;
        this.firstName = page.locator('[data-test^="firstName"]');
        this.lastName = page.locator('[data-test^="lastName"]');
        this.postalCode = page.locator('[data-test^="postalCode"]');
        this.continueBtn = page.locator('[data-test^="continue"]');

        this.finishBtn = page.locator('[data-test^="finish"]');
        this.completeHeader = page.locator(".complete-header");

        this.errorBanner = page.locator("[data-test='error']");


    }

    async clickContinue(){
        await this.continueBtn.click();
    }

    async expectErrorContains(text: string){
        await expect(this.errorBanner).toContainText(text);
    }

    async expectOnStepOne(){
        const {pathname} = new URL(this.page.url());
        expect(pathname).toBe("/checkout-step-one.html");
    }

    async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string){
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
        await this.continueBtn.click();
    }

    async expectOnStepTwo(){
        const {pathname} = new URL(this.page.url());
        expect(pathname).toBe("/checkout-step-two.html");
    }   

    async finish(){
        await this.finishBtn.click();
    }

    async expectOrderComplete(){
        const {pathname} = new URL(this.page.url());
        expect(pathname).toBe("/checkout-complete.html");
        await expect(this.completeHeader).toContainText("Thank you");
    }

}

