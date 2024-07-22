import ora from "ora";
import { exec } from "child_process";
import { promisify } from "util";
const execPromise = promisify(exec);
const spinner = ora();
const npmInstallLambda = async () => {
    spinner.start("Installing dependencies for lambda functions...");
    try {
        await execPromise("cd cdk/lambda && npm install");
        // spinner.succeed("Lambda dependencies installed successfully!");
        spinner.stop();
        console.log("🧠 Lambda dependencies installed successfully!");
    }
    catch (error) {
        spinner.fail("An error occurred");
        console.error(error);
    }
};
export default npmInstallLambda;
