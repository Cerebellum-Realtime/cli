import ora from "ora";
import { spawn } from "child_process";
import readline from "readline";

const spinner = ora();

const cdkDeploy = async (directory?: string): Promise<void> => {
  spinner.start("Deploying infrastructure to AWS...");

  try {
    const command = "cdk";
    const args = ["deploy", "--require-approval", "never"];
    const options = directory ? { cwd: directory } : {};
    let stdoutData = "";
    const child = spawn(command, args, options);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    child.stdout.on("data", (data) => {
      stdoutData += data.toString();
      process.stdout.write(data);
    });

    child.stderr.on("data", (data) => {
      process.stderr.write(data);
    });

    rl.on("line", (input) => {
      child.stdin.write(`${input}\n`);
    });

    const exitCode = await new Promise<number>((resolve, reject) => {
      child.on("error", (error) => {
        spinner.fail(`Deployment failed: ${error.message}`);
        rl.close();
        reject(error);
      });

      child.on("close", (code: number) => {
        rl.close();
        resolve(code);
      });
    });

    spinner.stop();

    if (exitCode === 0) {
      console.log("🧠 Infrastructure successfully deployed!");
    } else {
      throw new Error(`Deployment process exited with code ${exitCode}`);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default cdkDeploy;
