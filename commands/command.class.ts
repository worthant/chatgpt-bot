import { Telegraf } from "telegraf";
import { IBotContext } from "../src/context/context.interface";

export abstract class Command {
    constructor(public bot: Telegraf<IBotContext>) { }

    abstract handle(openai?: unknown): void;
}
