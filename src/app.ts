// import { Telegraf } from "telegraf";
// import { IConfigService } from "./config/config.interface";
// import { ConfigService } from "./config/config.service";
// import { IBotContext } from "./context/context.interface";
// import { Command } from "../commands/command.class";
// import { StartCommand } from "../commands/start.command";
// import LocalSession from "telegraf-session-local";
// import { OpenAIApi, Configuration } from 'openai';

import { Telegraf } from 'telegraf';
import { Configuration, OpenAIApi } from 'openai';

// Replace 'your-telegram-bot-token' and 'your-openai-api-key' with your actual tokens
const bot = new Telegraf('6287109942:AAGqv_8Y9am_vOd7QAq49mdyCLfn6U2HWM0');
//const configuration = new Configuration({ apiKey: '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' });
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

bot.start((ctx) => ctx.reply('Please type a message'));

bot.on('text', async (ctx) => {
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: ctx.message.text }],
    });

    if (chatCompletion.data.choices[0]?.message?.content) {
        const reply = chatCompletion.data.choices[0].message.content;
        ctx.reply(reply);
    } else {
        ctx.reply("Sorry, I couldn't generate a response.");
    }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// class Bot {
//     private bot: Telegraf<IBotContext>;
//     private commands: Command[] = [];
//     private openai: OpenAIApi;

//     constructor(private readonly configService: IConfigService) {
//         this.bot = new Telegraf<IBotContext>(this.configService.get('TELEGRAM_BOT_TOKEN'));
//         this.bot.use(new LocalSession({ database: "sessions.json" }).middleware());

//         const configuration = new Configuration({
//             apiKey: this.configService.get('OPENAI_API_KEY'),
//         });
//         this.openai = new OpenAIApi(configuration);
//     }

//     async init() {
//         const configuration = new Configuration({
//             apiKey: this.configService.get('OPENAI_API_KEY'),
//         });
//         const openai = new OpenAIApi(configuration);

//         this.commands = [new StartCommand(this.bot)];
//         for (const command of this.commands) {
//             await command.handle(openai);
//         }
//         this.bot.launch();
//     }
// }

// const bot = new Bot(new ConfigService());
// bot.init();

