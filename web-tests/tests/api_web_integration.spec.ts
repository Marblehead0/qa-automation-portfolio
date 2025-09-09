import {test, expect} from "@playwright/test";
import fetch from "node-fetch";
import LoginPage = require("../pages/LoginPage");
import { CREDS } from "./helpers/creds";

test("Pokemon name matches between API and UI demo", async ({page})=>{
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/1");
    const data = await response.json();
    const apiName = data.name;
    console.log(`API name: ${apiName}`);

    const loginpage = new LoginPage.LoginPage(page);
    await loginpage.goto();
    await loginpage.login(CREDS.user, CREDS.pass);

    expect(apiName).toBe("bulbasaur");
});