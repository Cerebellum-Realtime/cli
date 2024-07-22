import ora from "ora";
import { exec } from "child_process";
import { promisify } from "util";

// Promisify exec for async/await usage
const execPromise = promisify(exec);

const spinner = ora();

const cdkSynth = async () => {
  spinner.start("Running cdk synth...");

  try {
    await execPromise("cd cdk && cdk synth");

    // spinner.succeed("CDK successfully synthesized!");
    spinner.stop();
    console.log("🧠 CDK successfully synthesized!");
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default cdkSynth;
