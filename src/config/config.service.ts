import { DotenvParseOutput, config } from "dotenv";
import { IConfigService } from "./config.interface";

export class ConfigService implements IConfigService {
    private config: DotenvParseOutput;
    constructor() {
        const { error, parsed } = config();
        if (error) {
            throw new Error('Cant find .env file');
        }
        if (!parsed) {
            throw new Error('.env file is empty');

        }
        this.config = parsed;
    }

    get(key: string): string {
        const res = this.config[key];
        if (!res) {
            throw new Error('this token doesnt exist');
        }
        return res;
    }
}