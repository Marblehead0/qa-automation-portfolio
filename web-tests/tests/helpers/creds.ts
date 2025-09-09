import * as dotenv from "dotenv";
dotenv.config();

export const CREDS = {
    user: process.env.USERNAME ?? "standard_user",
    pass: process.env.PASWORD ?? "secret_sauce"
};