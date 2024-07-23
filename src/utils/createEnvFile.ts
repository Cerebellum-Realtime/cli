import { writeFileSync, appendFileSync } from "fs";
import ora from "ora";
import { exec } from "child_process";
import { promisify } from "util";

// Promisify exec for async/await usage
const execPromise = promisify(exec);

const spinner = ora();

const printToEnv = async (envVariables: string[], directory?: string) => {
  await execPromise("touch .env");
  envVariables.forEach(async (envVariable) => {
    await execPromise(`echo "${envVariable}" >> .env`);
  });
};

const createEnvFile = async (
  init: boolean,
  certificateARN: string,
  imageURI: string,
  scalingMin: number,
  scalingMax: number,
  directory?: string
) => {
  spinner.start("Creating .env file with your configurations.");

  try {
    if (init === true) {
      await execPromise("touch .env");
      await execPromise(`echo "CERTIFICATE_ARN=${certificateARN}" > .env`);
      await execPromise(`echo "IMAGE_URI=${imageURI}" >> .env`);
      await execPromise(`echo "SCALING_MIN=${scalingMin}" >> .env`);
      await execPromise(`echo "SCALING_MAX=${scalingMax}" >> .env`);
    } else {
      await execPromise(`cd ${directory} && touch .env`);
      await execPromise(
        `cd ${directory} && echo "CERTIFICATE_ARN=${certificateARN}" > .env`
      );
      await execPromise(
        `cd ${directory} && echo "IMAGE_URI=${imageURI}" >> .env`
      );
      await execPromise(
        `cd ${directory} && echo "SCALING_MIN=${scalingMin}" >> .env`
      );
      await execPromise(
        `cd ${directory} && echo "SCALING_MAX=${scalingMax}" >> .env`
      );
    }

    spinner.stop();
    console.log(
      `🧠 .env file successfully created with the provided environment variables!`
    );
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default createEnvFile;
