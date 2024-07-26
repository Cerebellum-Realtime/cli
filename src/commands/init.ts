import { Command } from "@oclif/core";
import configureAWS from "../utils/configureAWS.js";
import cloneCDK from "../utils/cloneCDK.js";
import npmInstallCDK from "../utils/npmInstallCDK.js";
import npmInstallLambda from "../utils/npmInstallLambda.js";
import cdkSynth from "../utils/cdkSynth.js";
import cdkBootstrap from "../utils/cdkBootstrap.js";
import confirmAwsCdkInstall from "../utils/confirmAwsCdkInstall.js";
import confirmAwsCliInstall from "../utils/confirmAwsCliInstall.js";
import getCertificate from "../utils/getCertificate.js";
import getImageURI from "../utils/getImage.js";
import createEnvFile from "../utils/createEnvFile.js";
import getScalingLimitations from "../utils/getScalingLimitations.js";
import cdkDeploy from "../utils/cdkDeploy.js";

export default class Init extends Command {
  static description = "Initialize the CDK project in current directory";

  async run(): Promise<void> {
    console.log("Welcome to the Cerebellum CLI!");

    const init = true;

    await confirmAwsCliInstall();
    await confirmAwsCdkInstall();
    await configureAWS();
    const imageURI = await getImageURI();
    const certificateARN = await getCertificate();
    const { scalingMin, scalingMax } = await getScalingLimitations();
    // const cronJobFrequency = await getCronJobFrequency();
    await cloneCDK(init);
    await createEnvFile(init, certificateARN, imageURI, scalingMin, scalingMax);
    await npmInstallCDK(init);
    await npmInstallLambda(init);
    await confirmAwsCdkInstall();
    await cdkSynth(init);
    await cdkBootstrap(init);
    await cdkDeploy();

    console.log(
      "🎉 Success! Your infrastructure has been successfully deployed! 🎉"
    );
  }
}
