import ora from "ora";
import { exec } from "child_process";
import { promisify } from "util";
// Promisify exec for async/await usage
const execPromise = promisify(exec);
const spinner = ora();
const printToEnv = async (envVariables, directory) => {
    await execPromise("touch .env");
    envVariables.forEach(async (envVariable) => {
        await execPromise(`echo "${envVariable}" >> .env`);
    });
};
const createEnvFile = async (init, certificateARN, imageURI, numberOfConcurrentTasks, scalingMin, scalingMax, directory) => {
    const envCommands = [
        `echo "CERTIFICATE_ARN=${certificateARN}" > .env`,
        `echo "IMAGE_URI=${imageURI}" >> .env`,
        `echo "NUMBER_OF_CONCURRENT_TASKS=${numberOfConcurrentTasks}" >> .env`,
        `echo "SCALING_MIN=${scalingMin}" >> .env`,
        `echo "SCALING_MAX=${scalingMax}" >> .env`,
    ];
    spinner.start("Creating .env file with your configurations.");
    try {
        if (init === true) {
            await execPromise("touch .env");
            await execPromise(`echo "CERTIFICATE_ARN=${certificateARN}" > .env`);
            await execPromise(`echo "IMAGE_URI=${imageURI}" >> .env`);
            await execPromise(`echo "NUMBER_OF_CONCURRENT_TASKS=${numberOfConcurrentTasks}" >> .env`);
            await execPromise(`echo "SCALING_MIN=${scalingMin}" >> .env`);
            await execPromise(`echo "SCALING_MAX=${scalingMax}" >> .env`);
        }
        else {
            await execPromise(`cd ${directory} && touch .env`);
            await execPromise(`cd ${directory} && echo "CERTIFICATE_ARN=${certificateARN}" > .env`);
            await execPromise(`cd ${directory} && echo "IMAGE_URI=${imageURI}" >> .env`);
            await execPromise(`cd ${directory} && echo "NUMBER_OF_CONCURRENT_TASKS=${numberOfConcurrentTasks}" >> .env`);
            await execPromise(`cd ${directory} && echo "SCALING_MIN=${scalingMin}" >> .env`);
            await execPromise(`cd ${directory} && echo "SCALING_MAX=${scalingMax}" >> .env`);
        }
        spinner.stop();
        console.log(`🧠 .env file created successfully with the provided environment variables.`);
    }
    catch (error) {
        throw new Error(`${error}`);
    }
};
export default createEnvFile;
