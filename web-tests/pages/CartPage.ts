import {page, locator, expect} from '@playwright/test';

export class CartPage{

    private page: page;
    private cartLink: locator;
    private cartItems: locator;

    constructor(page: page){
        this.page = page;
        this.cartLink = page.locator(".shopping_cart_link");
        this.cartItems = page.locator(".cart_item");
    }

    async gotoCart(){
        await this.cartLink.click();
    }

    async expectProductIncart(productName:string){
        const item = this.cartItems.filter({hasText: productName});
        await expect(item).toHaveCount(1);
    }

}