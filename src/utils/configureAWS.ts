import ora from "ora";
import { spawn } from "child_process";
import readline from "readline";

const spinner = ora();

const configureAWS = async () => {
  try {
    console.log("Loading AWS Configure...");

    await new Promise((resolve, reject) => {
      const child = spawn("aws", ["configure"], {
        stdio: "inherit", // This allows for interactive input/output
      });

      child.on("close", (code) => {
        if (code === 0) {
          resolve(null);
        } else {
          reject(new Error(`Command failed with exit code ${code}`));
        }
      });
    });

    // Restart the spinner after the command completes

    // spinner.succeed("AWS successfully configured!");
    spinner.stop();
    console.log("🧠 AWS successfully configured!");
  } catch (error) {
    spinner.fail("An error occurred");
    console.error(error);
  }
};

export default configureAWS;
