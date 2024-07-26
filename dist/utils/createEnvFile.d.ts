declare const createEnvFile: (init: boolean, certificateARN: string, image: string, scalingMin: number, scalingMax: number, directory?: string) => Promise<void>;
export default createEnvFile;
