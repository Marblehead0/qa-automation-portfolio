import {page, locator, expect} from '@playwright/test';

export class CartPage{

    private page: page;
    private cartLink: locator;
    private cartItems: locator;
    private cartbadge: locator;
    private checkoutButton: locator;

    constructor(page: page){
        this.page = page;
        this.cartLink = page.locator(".shopping_cart_link");
    
        this.cartItems = page.locator(".cart_item");
        this.cartbadge = page.locator(".shopping_cart_badge");
        this.checkoutButton = page.locator('[data-test^="checkout"]');
    }


    async gotoCart(){
        await this.cartLink.click();
    }

    async expectProductIncart(productName:string){
        const item = this.cartItems.filter({hasText: productName});
        await expect(item).toHaveCount(1);
    }

    async removeItemByName(productName:string){
        const item = this.cartItems.filter({hasText: productName});
        const removeBtn = item.locator('[data-test^="remove-"], button:has-text("Remove")');
        await removeBtn.click();
    }   

    async expectCartEmpty(){
        await expect(this.cartItems).toHaveCount(0);
        await expect(this.cartbadge).toBeHidden();
    }

    async startCheckout(){
        await this.checkoutButton.click();  
    }
}