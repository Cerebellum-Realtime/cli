import ora from 'ora';
import { exec } from 'child_process';
import { promisify } from 'util';
import { cli } from 'cli-ux';
// Promisify exec for async/await usage
const execPromise = promisify(exec);
const spinner = ora();
const confirmAwsCliInstall = async () => {
    spinner.start('Checking if aws-cli is installed...');
    const alreadyInstalled = await execPromise('aws --version').catch(() => false);
    if (alreadyInstalled) {
        spinner.succeed('aws-cli is installed!');
        return;
    }
    spinner.stop();
    try {
        const response = await cli.prompt('You will need aws-cli to be globally installed to deploy the infrastructure.\n Would you like it to be installed? (y/n)');
        if (response.toLowerCase() === 'n') {
            throw new Error('Permission denied by user. Please globally install aws-cli independently or run script again.');
        }
        spinner.start('Globally installing aws-cli!');
        await execPromise('npm install -g aws-cli');
        spinner.succeed('aws-cli globally installed!');
    }
    catch (error) {
        spinner.fail('An error occurred');
        console.error(error);
    }
};
export default confirmAwsCliInstall;
