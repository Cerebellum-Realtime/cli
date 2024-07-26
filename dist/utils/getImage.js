import { cli } from "cli-ux";
const isValidDockerImage = (image) => {
    const dockerImageRegex = new RegExp("^" +
        "([a-z0-9]+(([-._]|__)[a-z0-9]+)*)" + // Image name
        "(:[0-9a-zA-Z-_.]+)?" + // Optional tag
        "(@[A-Fa-f0-9]+(:[A-Fa-f0-9]+)*)?$" // Optional digest
    );
    return dockerImageRegex.test(image);
};
const getImage = async () => {
    const defaultImageURI = "willconrad/cerebellum:server";
    while (true) {
        try {
            const response = await cli.prompt("Would you like to use Cerebellum's provided server (y/n)");
            if (response.toLowerCase() === "y") {
                console.log("🧠 Confirmed using Cerebellum's provided server!");
                return defaultImageURI;
            }
            else if (response.toLowerCase() === "n") {
                const imageURI = await cli.prompt("Please enter your public image");
                if (isValidDockerImage(imageURI)) {
                    console.log("🧠 Image received!");
                    return imageURI;
                }
                else {
                    console.log("Invalid or inaccessible image. Please try again.");
                }
            }
            else {
                console.log("Invalid input. Please try again and respond with either y or n.");
            }
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
};
export default getImage;
