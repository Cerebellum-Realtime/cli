declare const createEnvFile: (init: boolean, certificateARN: string, imageURI: string, scalingMin: number, scalingMax: number, directory?: string) => Promise<void>;
export default createEnvFile;
