import {test,expect} from "../fixtures/pom_fixtures";

test("[Mock] mocks inventory API response", async ({page})=>{
    await page.route("**/api/inventory", async route=>{
        const mockResponse = {
            items: [
                {id: 1, name: "Mocked Product 1", price: 9.99},
                {id: 2, name: "Mocked Product 2", price: 19.99},
            ]
        };

        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(mockResponse)
        });
    });

    await page.goto("/");

    await expect(page.getByText("Mocked Product 1")).toBeVisible();
    await expect(page.getByText("Mocked Product 2")).toBeVisible();
});