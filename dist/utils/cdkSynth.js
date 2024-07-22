import ora from 'ora';
import { exec } from 'child_process';
import { promisify } from 'util';
// Promisify exec for async/await usage
const execPromise = promisify(exec);
const spinner = ora();
const cdkSynth = async () => {
    spinner.start('Running cdk synth...');
    try {
        await execPromise('cd cdk && cdk synth');
        spinner.succeed('CDK successfully synthesized!');
    }
    catch (error) {
        spinner.fail('An error occurred');
        console.error(error);
    }
};
export default cdkSynth;
