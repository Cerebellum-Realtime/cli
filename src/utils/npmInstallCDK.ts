import ora from "ora";
import { exec } from "child_process";
import { promisify } from "util";

// Promisify exec for async/await usage
const execPromise = promisify(exec);

const spinner = ora();

const npmInstallCDK = async (init: Boolean, directory?: String) => {
  spinner.start("Installing dependencies in the CDK...");

  try {
    if (init === true) {
      await execPromise("npm install");
    } else {
      await execPromise(`cd ${directory} && npm install`);
    }

    spinner.stop();
    console.log("🧠 CDK dependencies successfully installed!");
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default npmInstallCDK;
