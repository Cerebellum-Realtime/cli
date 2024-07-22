declare const createEnvFile: (init: boolean, certificateARN: string, imageURI: string, numberOfConcurrentTasks: number, scalingMin: number, scalingMax: number, directory?: string) => Promise<void>;
export default createEnvFile;
