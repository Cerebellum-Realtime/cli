import { Command } from "@oclif/core";
import ora from "ora";
import { exec } from "child_process";
import { promisify } from "util";
import configureAWS from "../utils/configureAWS.js";
// Promisify exec for async/await usage
const execPromise = promisify(exec);
const spinner = ora();
export default class Init extends Command {
    static description = "Initialize the CDK project";
    // TODOS
    // - What happens if the stack fails? -> give cdk deploy responsibilities to user
    // - How to retrieve information from user (# of caches, names in DB, etc), and how to enter those values into CDK
    async run() {
        console.log("Welcome to the Cerebellum CLI!");
        // await confirmAwsCliInstall();
        await configureAWS();
        // await cloneCDK();
        // await npmInstallCDK();
        // await npmInstallLambda();
        // await confirmAwsCdkInstall();
        // await cdkSynth();
        // await cdkBootstrap();
        // await cdkDeploy() // better to let them deploy so they can see progress and address any errors that arise
        console.log("Success! You are now ready to deploy your infrastructure!");
        console.log("When ready, enter `cd cdk && cdk deploy` and follow the prompts.");
        console.log("Deployment can take 10-20 minutes, depending on complexity.");
    }
}
