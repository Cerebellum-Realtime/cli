import ora from "ora";
import { exec } from "child_process";
import { promisify } from "util";

// Promisify exec for async/await usage
const execPromise = promisify(exec);

const spinner = ora();

const cdkBootstrap = async () => {
  spinner.start("Creating bootstrap resources for CDK...");

  try {
    await execPromise("cd cdk && cdk bootstrap");

    // spinner.succeed("CDK bootstrap creation success!");
    spinner.stop();
    console.log("🧠 CDK bootstrap creation success!");
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default cdkBootstrap;
