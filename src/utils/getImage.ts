import { cli } from "cli-ux";

const isValidECRImageURI = (uri: string): boolean => {
  const ecrRegex =
    /^([a-zA-Z0-9\-_]+(?:\.[a-zA-Z0-9\-_]+)*\/)?([a-zA-Z0-9\-_]+\/[a-zA-Z0-9\-_]+):([a-zA-Z0-9\-_\.]+)$/;
  return ecrRegex.test(uri);
};

const getImageURI = async (): Promise<string> => {
  const defaultImageURI = "public.ecr.aws/q8e0a8z0/avery-ws-server:latest";
  while (true) {
    try {
      const response = await cli.prompt(
        "Would you like to use Cerebellum's provided server (y/n)"
      );

      if (response.toLowerCase() === "y") {
        console.log("🧠 ECR image URI received!");
        return defaultImageURI;
      } else if (response.toLowerCase() === "n") {
        const imageURI = await cli.prompt(
          "Please enter ECR image URI *including the tag*"
        );

        if (isValidECRImageURI(imageURI)) {
          console.log("🧠 ECR image URI received!");
          return imageURI;
        } else {
          console.log(
            "Invalid ECR image URI. Please try again. Make sure you remember to include the tag."
          );
        }
      } else {
        console.log(
          "Invalid input. Please try again and respond with either y or n."
        );
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
};

export default getImageURI;
