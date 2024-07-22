import ora from "ora";
import { exec } from "child_process";
import { promisify } from "util";
import { cli } from "cli-ux";
// Promisify exec for async/await usage
const execPromise = promisify(exec);
const spinner = ora();
const confirmAwsCdkInstall = async () => {
    spinner.start("Checking if aws-cli is installed...");
    const alreadyInstalled = await execPromise("cdk --version").catch(() => false);
    if (alreadyInstalled) {
        spinner.succeed("aws-cdk is installed!");
        return;
    }
    spinner.stop();
    try {
        const response = await cli.prompt("You will need aws-cdk to be globally installed to deploy the infrastructure.\n Would you like it to be installed? (y/n)");
        if (response.toLowerCase() === "n") {
            throw new Error("Permission denied by user. Please globally install aws-cdk independently or run script again.");
        }
        spinner.start("Globally installing aws-cdk!");
        await execPromise("npm install -g aws-cdk");
        spinner.succeed("aws-cdk globally installed!");
    }
    catch (error) {
        spinner.fail("An error occurred installing aws-cdk globally");
        console.error(error);
    }
};
export default confirmAwsCdkInstall;
