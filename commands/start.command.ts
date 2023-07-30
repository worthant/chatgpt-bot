import { Telegraf } from 'telegraf';
import { OpenAIApi } from 'openai';
import { IBotContext } from '../src/context/context.interface';
import { Command } from './command.class';

export class StartCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }
    
    async handle(openai: OpenAIApi): Promise<void> {
        this.bot.start((ctx) => {
            ctx.reply('Please type a message');
        });

        this.bot.on('text', async (ctx) => {
            const message = ctx.message.text;
            const chatCompletion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: message}],
            });

            if (chatCompletion.data.choices[0]?.message?.content) {
                const reply = chatCompletion.data.choices[0].message.content;
                ctx.reply(reply);
            } else {
                ctx.reply("Sorry, I couldn't generate a response.");
            }
        });
    }
}

