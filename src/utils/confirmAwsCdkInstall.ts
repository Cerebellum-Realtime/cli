import ora from "ora";
import { exec } from "child_process";
import { promisify } from "util";
import { cli } from "cli-ux";

// Promisify exec for async/await usage
const execPromise = promisify(exec);

const spinner = ora();

const confirmAwsCdkInstall = async () => {
  spinner.start("Checking if AWS CDK is installed...");
  const alreadyInstalled = await execPromise("cdk --version").catch(
    () => false
  );

  if (alreadyInstalled) {
    // spinner.succeed("aws-cdk is installed!");
    spinner.stop();
    console.log("🧠 AWS CDK is installed!");
    return;
  }

  spinner.stop();
  try {
    const response = await cli.prompt(
      "You will need AWS CDK to be globally installed to deploy the infrastructure.\n=> Would you like it to be installed? (y/n)"
    );

    if (response.toLowerCase() !== "y") {
      throw new Error(
        "Permission denied by user. Please globally install AWS CDK independently or run script again."
      );
    }

    spinner.start("Globally installing AWS CDK!");
    await execPromise("npm install -g aws-cdk");

    // spinner.succeed("aws-cdk globally installed!");
    spinner.stop();
    console.log("🧠 AWS CDK globally installed!");
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default confirmAwsCdkInstall;
