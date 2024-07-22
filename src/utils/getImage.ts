import { cli } from "cli-ux";

const isValidECRImageURI = (uri: string): boolean => {
  const ecrRegex =
    /^([a-zA-Z0-9\-_]+(?:\.[a-zA-Z0-9\-_]+)*\/)?([a-zA-Z0-9\-_]+\/[a-zA-Z0-9\-_]+):([a-zA-Z0-9\-_\.]+)$/;
  return ecrRegex.test(uri);
};

const getImageURI = async (): Promise<string> => {
  while (true) {
    try {
      const imageURI = await cli.prompt(
        "Please enter ECR image URI **including the tag**"
      );

      if (isValidECRImageURI(imageURI)) {
        console.log("🧠 ECR image URI received!");
        return imageURI;
      } else {
        console.log(
          "Invalid ECR image URI. Please try again. Make sure you remember to include the tag."
        );
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
};

export default getImageURI;
