import {page, locator, expect} from '@playwright/test';

export class ProductsPage{

    private page: page;
    private title: locator;
    private addToCartButton: locator;
    private cartBadge: locator;
    private burgerMenu : locator;
    private logoutLink : locator;   

    constructor(page: page){
        this.page = page;
        this.title = page.locator(".title");
        this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
        this.cartBadge = page.locator(".shopping_cart_badge");
        this.burgerMenu = page.locator("#react-burger-menu-btn");
        this.logoutLink = page.locator("#logout_sidebar_link");
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
        const row = this.page.locator(".inventory_item").filter({hasText: name});
        await row.getByRole("button",{name: "Add to cart"}).click();
    }


    async getCartCount(): Promise<number>{
        const visible = await this.cartBadge.isVisible();
        if(!visible) return 0;
        const txt = (await this.cartBadge.textContent())?.trim() ?? "0"; 
        return Number(txt);
    }

    async expectCartCount(n: number){
        if(n === 0 ){
            await expect(this.cartBadge).toBeHidden();
        }
        else
        {
            await expect(this.cartBadge).toHaveText(String(n));
        }
    }

    
  async logout() {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }
    

}

