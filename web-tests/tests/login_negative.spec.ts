import {test,expect} from "../fixtures/pom_fixtures";
import { CREDS } from "./helpers/creds";

test("@regression shows error for invalid credentials"  , async ({login})=>{
    await login.goto();
    await login.login(CREDS.user,"wrong");
    await login.expectErrorContains("Username and password do not match");
});
