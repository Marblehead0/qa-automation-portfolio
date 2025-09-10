import { test, expect } from "../fixtures/pom_fixtures";
import fetch from "node-fetch";
import { CREDS } from "./helpers/creds";

test.describe("Api tests", () => {

    test("Pokemon name matches between API and UI demo", async ({ login }) => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/1");
        const data = await response.json();
        const apiName = data.name;
        console.log(`API name: ${apiName}`);

        await login.goto();
        await login.login(CREDS.user, CREDS.pass);

        expect(apiName).toBe("bulbasaur");
    });

});