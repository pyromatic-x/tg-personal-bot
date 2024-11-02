import { Database } from "./db";
import { configDotenv } from "dotenv";
import { Bot } from "./bot";

configDotenv();

async function main() {
  await Database.connect();
  Bot.init();
}

main();
