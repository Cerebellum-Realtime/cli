import ora from "ora";
import { exec } from "child_process";
import { promisify } from "util";
// Promisify exec for async/await usage
const execPromise = promisify(exec);
const spinner = ora();
const cloneCDKCreate = async () => {
    spinner.start("Cloning CDK repo from Github...");
    try {
        await execPromise("git clone https://github.com/Capstone2408-Team-2/cdk.git cerebellumCDK");
        spinner.succeed("CDK successfully cloned!");
    }
    catch (error) {
        spinner.fail("An error occurred");
        console.error(error);
    }
};
export default cloneCDKCreate;
