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
  while (true) {
    try {
      const response = await cli.prompt(
        "You will need AWS CDK to be globally installed to deploy the infrastructure.\n=> Would you like it to be installed? (y/n)"
      );

      if (response.toLowerCase() === "y") {
        spinner.start("Globally installing AWS CDK!");
        await execPromise("npm install -g aws-cdk");

        spinner.stop();
        console.log("🧠 AWS CDK globally installed!");
      } else if (response.toLowerCase() === "n") {
        throw new Error(
          "Permission denied by user. Please globally install AWS CDK independently or run script again."
        );
      } else {
        console.log(
          "Invalid input. Please try again and respond with either y or n."
        );
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
};

export default confirmAwsCdkInstall;
