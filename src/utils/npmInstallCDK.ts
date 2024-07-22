import ora from "ora";
import { exec } from "child_process";
import { promisify } from "util";

// Promisify exec for async/await usage
const execPromise = promisify(exec);

const spinner = ora();

const npmInstallCDK = async () => {
  spinner.start("Installing dependencies in the CDK...");

  try {
    await execPromise("cd cdk && npm install");

    // spinner.succeed("CDK dependencies successfully installed!");
    spinner.stop();
    console.log("🧠 CDK dependencies successfully installed!");
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default npmInstallCDK;
