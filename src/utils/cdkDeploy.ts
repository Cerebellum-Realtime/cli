import ora from "ora";
import { spawn } from "child_process";
import readline from "readline";

const spinner = ora();

const cdkDeploy = async (directory?: string): Promise<string> => {
  spinner.start("Deploying infrastructure to AWS...");

  try {
    // Build the command and arguments
    const command = "cdk";
    const args = ["deploy", "--require-approval", "never"];
    const options = directory ? { cwd: directory } : {};

    // Variables to capture stdout data
    let stdoutData = "";

    // Spawn a child process to run the command
    const child = spawn(command, args, options);

    // Create a readline interface for user input
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Handle stdout and stderr streams
    child.stdout.on("data", (data) => {
      stdoutData += data.toString(); // Capture stdout data
      process.stdout.write(data); // Pipe the output to stdout
    });

    child.stderr.on("data", (data) => {
      process.stderr.write(data); // Pipe errors to stderr
    });

    // Handle user input for interactive prompts
    rl.on("line", (input) => {
      child.stdin.write(`${input}\n`);
    });

    // Handle process events
    const exitCode = await new Promise<number>((resolve, reject) => {
      child.on("error", (error) => {
        spinner.fail(`Deployment failed: ${error.message}`);
        rl.close(); // Close the readline interface on error
        reject(error);
      });

      child.on("close", (code: number) => {
        rl.close(); // Ensure readline interface is closed on completion
        resolve(code);
      });
    });

    spinner.stop();

    if (exitCode === 0) {
      // Extract the secret key from stdoutData
      const secretKeyPattern =
        /WebSocketServerStack\.ALBApiKeySecretArnOutput[^\s]+ = ([^\s]+)/;
      const match = secretKeyPattern.exec(stdoutData);

      if (match && match[1]) {
        const secretKey = match[1];
        console.log("🧠 Infrastructure successfully deployed!");
        console.log(`🔑 Extracted Secret Key: ${secretKey}`);
        return secretKey;
      } else {
        throw new Error("Secret key not found in the deployment output.");
      }
    } else {
      throw new Error(`Deployment process exited with code ${exitCode}`);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default cdkDeploy;
