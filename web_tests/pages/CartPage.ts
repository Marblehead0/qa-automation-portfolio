import {page, locator, expect} from '@playwright/test';

export class CartPage{

    private page: page;
    private cartLink: locator;
    private cartItems: locator;
    private cartbadge: locator;
    private checkoutButton: locator;

    constructor(page: page){
        this.page = page;
        this.cartLink  = page.getByRole("link", { name: "Shopping Cart" }).or(page.locator(".shopping_cart_link"));
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
        const removeBtn = item.getByRole("button", {name: /remove/i});
        await removeBtn.click();
    }   

    async expectCartEmpty(){
        await expect(this.cartItems).toHaveCount(0);
        await expect(this.cartbadge).toBeHidden();
    }

    async startCheckout(){
        await this.checkoutButton.click();  
    }

    async expectCartCount(expected: number){
    
        const visible = await this.cartbadge.isVisible();
        const count = visible ? parseInt(await this.cartbadge.textContent() || "0",10) : 0;
        expect(count).toBe(expected);
    }

    
}