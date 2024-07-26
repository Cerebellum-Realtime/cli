import { Command } from "@oclif/core";
import cdkDestroy from "../utils/cdkDestroy.js";
export default class Init extends Command {
    static description = "Destroy the infrastructure (delete stack from AWS).";
    async run() {
        await cdkDestroy();
        console.log("🎉 Success! Your infrastructure has been successfully destroyed and removed! 🎉");
    }
}
