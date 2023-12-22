import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const appPassword = process.env.APP_PASSWORD;
export const appToken: string = generateToken();

// Check if token is correct
export const auth = (token: string) => token === appToken;

// Generate a random token when server starts, and sent it to allowed client
function generateToken(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < chars.length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }

  return result;
}
