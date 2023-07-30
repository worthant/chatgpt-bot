import { Telegraf } from "telegraf";
import { IConfigService } from "./config/config.interface";
import { ConfigService } from "./config/config.service";
import { IBotContext } from "./context/context.interface";
import { Command } from "../commands/command.class";
import { StartCommand } from "../commands/start.command";
import LocalSession from "telegraf-session-local";

class Bot {
    private bot: Telegraf<IBotContext>;
    private commands: Command[] = [];

    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<IBotContext>(this.configService.get('TELEGRAM_BOT_TOKEN'));
        this.bot.use(new LocalSession({ database: "sessions.json" }).middleware());
    }

    init() {
        const rapidAPIKey = this.configService.get('RAPIDAPI_KEY');
        this.commands = [new StartCommand(this.bot, rapidAPIKey)];
        for (const command of this.commands) {
            command.handle();
        }
        this.bot.launch();
    }
}

const bot = new Bot(new ConfigService());
bot.init();
