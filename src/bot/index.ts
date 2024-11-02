import * as TelegramBot from "node-telegram-bot-api";

class BotClient {
  private bot: TelegramBot;

  init() {
    this.bot = new TelegramBot(`${process.env.TOKEN}`, { polling: true });
    console.info("Connection with Telegram Bot established");

    this.bot.setMyCommands([
      {
        command: "check_projects",
        description: "Узнать состояние проектов",
      },
    ]);

    this.bot.on("text", async (message) => {
      if (message.text === "/check_projects") {
        const portfolio = await fetch("https://pyromatic.ru", { method: "HEAD" });
        const spotify = await fetch("https://spotify.pyromatic.ru", { method: "HEAD" });
        const spotifyApi = await fetch("https://api.spotify.pyromatic.ru/", {
          method: "HEAD",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const responseMessage = `portfolio: ${portfolio.status}\nspotify: ${spotify.status}\nspotify-api: ${spotifyApi.status}`;

        await this.bot.sendMessage(message.chat.id, responseMessage);
      }
    });
  }

  sendMessage(
    chatId: number | string,
    message: string,
    options?: TelegramBot.SendMessageOptions
  ): Promise<TelegramBot.Message> {
    return this.bot.sendMessage(chatId, message, options);
  }
}

export const Bot = new BotClient();
