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

  // Use an origin so /api/inventory resolves
  await page.goto("https://example.com/");

  // Trigger the API request manually from the browser
  const data = await page.evaluate(async () => {
    const res = await fetch("/api/inventory");
    return res.json();
  });


  expect(data.items[0].name).toBe("Mocked Product 1");
  expect(data.items[1].name).toBe("Mocked Product 2");
});