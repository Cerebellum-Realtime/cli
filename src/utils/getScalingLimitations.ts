import { cli } from "cli-ux";

const getScalingLimitations = async () => {
  try {
    let scalingMin;

    while (true) {
      scalingMin = await cli
        .prompt("Please enter a minimum number of containers for scaling")
        .then((str) => parseInt(str, 10));

      if (!isNaN(scalingMin) && scalingMin >= 1) {
        break;
      } else {
        console.log(
          "Invalid input. Please enter a number greater than or equal to 1."
        );
      }
    }

    let scalingMax;

    while (true) {
      scalingMax = await cli
        .prompt("Please enter a maximum number of containers for scaling")
        .then((str) => parseInt(str, 10));

      if (!isNaN(scalingMax) && scalingMax >= scalingMin) {
        break;
      } else {
        console.log(
          `Invalid input. Please enter a number greater than or equal to ${scalingMin}.`
        );
      }
    }

    console.log(
      `🧠 Scaling limitations set to minimum of ${scalingMin} and maximum of ${scalingMax}`
    );
    return { scalingMin, scalingMax };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default getScalingLimitations;
