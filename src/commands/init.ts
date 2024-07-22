import { Command } from "@oclif/core";
import configureAWS from "../utils/configureAWS.js";
import cloneCDK from "../utils/cloneCDK.js";
import npmInstallCDK from "../utils/npmInstallCDK.js";
import npmInstallLambda from "../utils/npmInstallLambda.js";
import cdkSynth from "../utils/cdkSynth.js";
import cdkBootstrap from "../utils/cdkBootstrap.js";
import confirmAwsCdkInstall from "../utils/confirmAwsCdkInstall.js";
import confirmAwsCliInstall from "../utils/confirmAwsCliInstall.js";

export default class Init extends Command {
  static description = "Initialize the CDK project in current directory";

  async run(): Promise<void> {
    console.log("Welcome to the Cerebellum CLI!");

    const init = true;

    await confirmAwsCliInstall();
    await confirmAwsCdkInstall();
    await configureAWS();
    await cloneCDK(init);
    await npmInstallCDK(init);
    await npmInstallLambda(init);
    await confirmAwsCdkInstall();
    await cdkSynth(init);
    await cdkBootstrap(init);

    console.log("Success! You are now ready to deploy your infrastructure!");
    console.log(
      "When ready, run `cd cdk && cdk deploy` and follow the prompts."
    );
    console.log("Deployment can take 10-20 minutes, depending on complexity.");
  }
}
