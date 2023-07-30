import { Telegraf } from 'telegraf';
import { IBotContext } from '../src/context/context.interface';
import { Command } from './command.class';
import axios from 'axios';

export class StartCommand extends Command {
    private readonly rapidAPIKey: string;

    constructor(bot: Telegraf<IBotContext>, rapidAPIKey: string) {
        super(bot);
        this.rapidAPIKey = rapidAPIKey;
    }

    handle(): void {
        this.bot.start((ctx) => {
            ctx.reply('Please type a message');
        });

        this.bot.on('text', async (ctx) => {
            const message = ctx.message.text;

            const options = {
                method: 'POST',
                url: 'https://open-ai21.p.rapidapi.com/conversationllama',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': this.rapidAPIKey,
                    'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
                },
                data: {
                    messages: [
                        {
                            role: 'user',
                            content: message
                        }
                    ],
                    web_access: false
                }
            };

            try {
                const response = await axios.request(options);

                if (response.data && Array.isArray(response.data.messages) && response.data.messages.length > 0) {
                    const reply = response.data.messages.pop()?.content;
                    if (reply) {
                        ctx.reply(reply);
                    } else {
                        ctx.reply("Sorry, the AI's response was empty.");
                    }
                } else {
                    ctx.reply("Sorry, I couldn't generate a response.");
                }
            } catch (error) {
                console.error(error);
                ctx.reply("Sorry, an error occurred while generating a response.");
            }
        });
    }
}

