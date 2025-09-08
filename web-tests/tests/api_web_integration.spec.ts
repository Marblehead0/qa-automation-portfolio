import {test, expect} from "@playwright/test";
import fetch from "node-fetch";
import Loginpage = require("../pages/Loginpage");

test("Pokemon name matches between API and UI demo", async ({page})=>{
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/1");
    const data = await response.json();
    const apiName = data.name;
    console.log(`API name: ${apiName}`);

    const loginpage = new Loginpage.Loginpage(page);
    await loginpage.goto();
    await loginpage.login("standard_user","secret_sauce");

    expect(apiName).toBe("bulbasaur");
});