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
import getNumberOfConcurrentTasks from "../utils/getNumberOfConcurrentTasks.js";
import getScalingLimitations from "../utils/getScalingLimitations.js";
import createEnvFile from "../utils/createEnvFile.js";

export default class Create extends Command {
  static description = "Create a new directory and initialize the CDK project";

  async run(): Promise<void> {
    console.log("Welcome to the Cerebellum CLI!");

    const init = false;
    const directoryName = "cerebellumCDK";

    await confirmAwsCliInstall();
    await configureAWS();
    const certificateARN = await getCertificate();
    const imageURI = await getImageURI();
    const numberOfConcurrentTasks = await getNumberOfConcurrentTasks(); // Ave
    const { scalingMin, scalingMax } = await getScalingLimitations(); // Austin
    // const cronJobFrequency = await getCronJobFrequency(); // Austin
    await cloneCDK(init, directoryName);
    await createEnvFile(
      init,
      certificateARN,
      imageURI,
      numberOfConcurrentTasks,
      scalingMin,
      scalingMax,
      directoryName
    );
    await npmInstallCDK(init, directoryName);
    await npmInstallLambda(init, directoryName);
    await confirmAwsCdkInstall();
    await cdkSynth(init, directoryName);
    await cdkBootstrap(init, directoryName);

    console.log("Success! You are now ready to deploy your infrastructure!");
    console.log(
      `When ready, enter \`cd ${directoryName} && cdk deploy\` and follow the prompts.`
    );
    console.log("Deployment can take 10-20 minutes, depending on complexity.");
  }
}
