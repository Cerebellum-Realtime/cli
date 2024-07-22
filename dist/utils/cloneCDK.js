import ora from "ora";
import { exec } from "child_process";
import { promisify } from "util";
// Promisify exec for async/await usage
const execPromise = promisify(exec);
const spinner = ora();
const cloneCDK = async (init, directory) => {
    spinner.start("Cloning CDK repo from Github...");
    try {
        if (init === true) {
            await execPromise("git clone https://github.com/Capstone2408-Team-2/cdk.git .");
        }
        else {
            await execPromise(`git clone https://github.com/Capstone2408-Team-2/cdk.git ${directory}`);
        }
        spinner.succeed("CDK successfully cloned!");
    }
    catch (error) {
        spinner.fail("An error occurred cloning github repo");
        console.error(error);
    }
};
export default cloneCDK;
