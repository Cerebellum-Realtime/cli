import ora from "ora";
import { exec } from "child_process";
import { promisify } from "util";
const execPromise = promisify(exec);
const spinner = ora();
const npmInstallLambda = async (init, directory) => {
    spinner.start("Installing dependencies for lambda functions...");
    try {
        if (init === true) {
            await execPromise("cd lambda && npm install");
        }
        else {
            await execPromise(`cd ${directory}/lambda && npm install`);
        }
        spinner.succeed("Dependencies within the lambda successfully installed!");
    }
    catch (error) {
        spinner.fail("An error occurred installing dependencies for lambda");
        console.error(error);
    }
};
export default npmInstallLambda;
