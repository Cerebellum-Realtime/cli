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
import getImage from "../utils/getImage.js";
import getScalingLimitations from "../utils/getScalingLimitations.js";
import createEnvFile from "../utils/createEnvFile.js";
import cdkDeploy from "../utils/cdkDeploy.js";

export default class Create extends Command {
  static description =
    "Create a new directory, initialize the CDK project, and deploy infrastructure to AWS.";

  async run(): Promise<void> {
    console.log("Welcome to the Cerebellum CLI!");

    const init = false;
    const directoryName = "cerebellumCDK";

    await confirmAwsCliInstall();
    await configureAWS();
    const image = await getImage();
    const certificateARN = await getCertificate();
    const { scalingMin, scalingMax } = await getScalingLimitations();
    // const cronJobFrequency = await getCronJobFrequency();
    await cloneCDK(init, directoryName);
    await createEnvFile(
      init,
      certificateARN,
      image,
      scalingMin,
      scalingMax,
      directoryName
    );
    await npmInstallCDK(init, directoryName);
    await npmInstallLambda(init, directoryName);
    await confirmAwsCdkInstall();
    await cdkSynth(init, directoryName);
    await cdkBootstrap(init, directoryName);
    await cdkDeploy(directoryName);

    console.log(
      "🎉 Success! Your infrastructure has been successfully deployed! 🎉"
    );
  }
}
