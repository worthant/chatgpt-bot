import { Context } from "telegraf";

export interface SessionData {
    correct: boolean;
}

export interface IBotContext extends Context {
    session: SessionData;
}