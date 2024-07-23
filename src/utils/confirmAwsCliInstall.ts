import ora from "ora";
import { exec } from "child_process";
import { promisify } from "util";
import { cli } from "cli-ux";

// Promisify exec for async/await usage
const execPromise = promisify(exec);

const spinner = ora();

const confirmAwsCliInstall = async () => {
  try {
    spinner.start("Checking if AWS CLI is installed...");
    await execPromise("aws --version");

    spinner.stop();
    console.log("🧠 AWS CLI is installed!");
  } catch (error) {
    throw new Error(
      "AWS CLI is not globally installed. Please follow README guide to install AWS CLI and try again."
    );
  }
};

export default confirmAwsCliInstall;
