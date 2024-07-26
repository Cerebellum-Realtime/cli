import ora from "ora";
import { exec } from "child_process";
import { promisify } from "util";
// Promisify exec for async/await usage
const execPromise = promisify(exec);
const spinner = ora();
const getSecret = async (secretARN) => {
    spinner.start("Getting API secret key...");
    try {
        const secret = await execPromise(`aws secretsmanager get-secret-value --secret-id ${secretARN}`);
        spinner.stop();
        console.log(`🧠 Secret key acquired! Kindly copy for your records: ${secret}`);
    }
    catch (error) {
        throw new Error(`${error}`);
    }
};
export default getSecret;
