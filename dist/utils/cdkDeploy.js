import ora from "ora";
import { spawn } from "child_process";
import readline from "readline";
const spinner = ora();
const cdkDeploy = (directory) => {
    return new Promise((resolve, reject) => {
        spinner.start("Deploying infrastructure to AWS...");
        // Build the command and arguments
        const command = "cdk";
        const args = ["deploy", "--require-approval", "never"];
        const options = { cwd: directory };
        // Spawn a child process to run the command
        const child = spawn(command, args, options);
        // Create a readline interface for user input
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        // Handle stdout and stderr streams
        child.stdout.on("data", (data) => {
            process.stdout.write(data); // Pipe the output to stdout
        });
        child.stderr.on("data", (data) => {
            process.stderr.write(data); // Pipe errors to stderr
        });
        child.on("error", (error) => {
            spinner.fail(`Deployment failed: ${error.message}`);
            reject(error);
        });
        child.on("close", (code) => {
            spinner.stop();
            if (code === 0) {
                console.log("🧠 Infrastructure successfully deployed!");
                resolve("");
            }
            else {
                console.log(`Deployment process exited with code ${code}`);
                reject(new Error(`Deployment failed with exit code ${code}`));
            }
        });
        // Handle user input for interactive prompts
        rl.on("line", (input) => {
            child.stdin.write(`${input}\n`);
        });
        // Close readline interface when the process ends
        child.on("close", () => {
            rl.close();
        });
    });
};
export default cdkDeploy;
