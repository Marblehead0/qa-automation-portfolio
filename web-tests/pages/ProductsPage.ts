import {page, locator, expect} from '@playwright/test';

export class ProductsPage{

    private page: page;
    private title: locator;
    private addToCartButton: locator;
    private cartBadge: locator;

    constructor(page: page){
        this.page = page;
        this.title = page.locator(".title");
        this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
        this.cartBadge = page.locator(".shopping_cart_badge");
    }

    async expectOnPage(){
        const {pathname} = new URL(this.page.url());
        expect(pathname).toBe("/inventory.html");
        await expect(this.title).toHaveText("Products");
    }

    async addFirstProductToCart(){
        await this.addToCartButton.first().click();
    }

    async expectCartBadgeCount(expected: number){
        await expect(this.cartBadge).toHaveText(String(expected));
    }

    async addItemTocartByName(name: string){
        const item = this.page.locator(".inventory_item").filter({hasText: name});
        await item.locator('[data-test^="add-to-cart"]').click();
    }
}

