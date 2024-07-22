declare const getScalingLimitations: () => Promise<{
    scalingMin: number;
    scalingMax: number;
}>;
export default getScalingLimitations;
