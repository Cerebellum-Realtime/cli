import ora from "ora";
import { exec } from "child_process";
import { promisify } from "util";
// Promisify exec for async/await usage
const execPromise = promisify(exec);
const spinner = ora();
const cdkDeploy1 = async (init, directory) => {
    spinner.start("Deploying infrastructure to AWS...");
    try {
        if (init === true) {
            await execPromise("cdk deploy");
        }
        else {
            await execPromise(`cd ${directory} && cdk deploy`);
        }
        spinner.stop();
        console.log("🧠 Infrastructure successfully deployed!");
    }
    catch (error) {
        throw new Error(`${error}`);
    }
};
export default cdkDeploy1;
