import ora from "ora";
import { exec } from "child_process";
import { promisify } from "util";
const execPromise = promisify(exec);
const spinner = ora();
const cdkDeploy = async () => {
    spinner.start("Deploying CDK... (this may take 10-20 minutes, depending on the complexity)");
    try {
        await execPromise("cd cdk && cdk deploy --require-approval never");
        // spinner.succeed("CDK successfuly deployed!");
        spinner.stop();
        console.log("🧠 CDK successfuly deployed!");
    }
    catch (error) {
        throw new Error(`${error}`);
    }
};
export default cdkDeploy;
