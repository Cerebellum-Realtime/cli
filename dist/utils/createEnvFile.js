import ora from "ora";
import { exec } from "child_process";
import { promisify } from "util";
// Promisify exec for async/await usage
const execPromise = promisify(exec);
const spinner = ora();
const createEnvFile = async (init, certificateARN, image, scalingMin, scalingMax, directory) => {
    spinner.start("Creating .env file with your configurations.");
    try {
        if (init === true) {
            await execPromise("touch .env");
            await execPromise(`echo "CERTIFICATE_ARN=${certificateARN}" > .env`);
            await execPromise(`echo "IMAGE_URI=${image}" >> .env`);
            await execPromise(`echo "SCALING_MIN=${scalingMin}" >> .env`);
            await execPromise(`echo "SCALING_MAX=${scalingMax}" >> .env`);
        }
        else {
            await execPromise(`cd ${directory} && touch .env`);
            await execPromise(`cd ${directory} && echo "CERTIFICATE_ARN=${certificateARN}" > .env`);
            await execPromise(`cd ${directory} && echo "IMAGE_URI=${image}" >> .env`);
            await execPromise(`cd ${directory} && echo "SCALING_MIN=${scalingMin}" >> .env`);
            await execPromise(`cd ${directory} && echo "SCALING_MAX=${scalingMax}" >> .env`);
        }
        spinner.stop();
        console.log(`🧠 .env file successfully created with the provided environment variables!`);
    }
    catch (error) {
        throw new Error(`${error}`);
    }
};
export default createEnvFile;
