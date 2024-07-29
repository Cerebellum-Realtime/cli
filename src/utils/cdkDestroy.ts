import ora from "ora";
import { spawn } from "child_process";
import { existsSync } from "fs";
import { join } from "path";
import { cli } from "cli-ux";

const spinner = ora();

const cdkDestroy = async () => {
  try {
    while (true) {
      const response = await cli.prompt(
        "Are you sure you wish to destroy your infrastructure (y/n)"
      );
      if (response.toLowerCase() === "y") {
        break;
      } else if (response.toLowerCase() === "n") {
        throw new Error("Infrastructure will not be destroyed.");
      } else {
        console.log(
          "Invalid input. Please try again and respond with either y or n."
        );
      }
    }

    spinner.start("Destroying CDK stack...");

    const cerebellumPath = join(process.cwd(), "cerebellumCDK");
    const command = "cdk";
    const args = ["destroy", "--force"];
    const options = existsSync(cerebellumPath) ? { cwd: cerebellumPath } : {};
    const child = spawn(command, args, options);

    child.stdout.on("data", (data) => {
      process.stdout.write(data);
    });

    child.stderr.on("data", (data) => {
      process.stderr.write(data);
    });

    const exitCode = await new Promise<number>((resolve, reject) => {
      child.on("error", (error) => {
        spinner.fail(`Destroy failed: ${error.message}`);
        reject(error);
      });

      child.on("close", (code: number) => {
        resolve(code);
      });
    });

    spinner.stop();

    if (exitCode === 0) {
      console.log("🧠 CDK stack successfully destroyed!");
    } else {
      throw new Error(`Destroy process exited with code ${exitCode}`);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default cdkDestroy;
