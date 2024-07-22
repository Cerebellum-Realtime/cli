import { Command } from "@oclif/core";
export default class Init extends Command {
    static description: string;
    run(): Promise<void>;
}
