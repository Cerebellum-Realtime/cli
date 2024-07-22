import { Command } from "@oclif/core";
import configureAWS from "../utils/configureAWS.js";
import cloneCDK from "../utils/cloneCDK.js";
import npmInstallCDK from "../utils/npmInstallCDK.js";
import npmInstallLambda from "../utils/npmInstallLambda.js";
import cdkSynth from "../utils/cdkSynth.js";
import cdkBootstrap from "../utils/cdkBootstrap.js";
import confirmAwsCdkInstall from "../utils/confirmAwsCdkInstall.js";
import confirmAwsCliInstall from "../utils/confirmAwsCliInstall.js";
export default class Create extends Command {
    static description = "Create a new directory and initialize the CDK project";
    async run() {
        console.log("Welcome to the Cerebellum CLI!");
        const init = false;
        const directoryName = "cerebellumCDK";
        await confirmAwsCliInstall();
        await configureAWS();
        await cloneCDK(init, directoryName);
        await npmInstallCDK(init, directoryName);
        await npmInstallLambda(init, directoryName);
        await confirmAwsCdkInstall();
        await cdkSynth(init, directoryName);
        await cdkBootstrap(init, directoryName);
        console.log("Success! You are now ready to deploy your infrastructure!");
        console.log("When ready, enter `cd cdk && cdk deploy` and follow the prompts.");
        console.log("Deployment can take 10-20 minutes, depending on complexity.");
    }
}
