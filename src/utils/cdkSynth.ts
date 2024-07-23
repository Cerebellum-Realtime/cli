import ora from "ora";
import { exec } from "child_process";
import { promisify } from "util";

// Promisify exec for async/await usage
const execPromise = promisify(exec);

const spinner = ora();

const cdkSynth = async (init: Boolean, directory?: String) => {
  spinner.start("Running cdk synth...");

  try {
    if (init === true) {
      await execPromise("cdk synth");
    } else {
      await execPromise(`cd ${directory} && cdk synth`);
    }

    spinner.stop();
    console.log("🧠 CDK successfully synthesized!");
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default cdkSynth;
