import { cli } from "cli-ux";

const isValidCertificateARN = (ARN: string): boolean => {
  const arnRegex =
    /^arn:aws:acm:[a-z0-9-]+:[0-9]{12}:certificate\/[a-zA-Z0-9-]+$/;
  return arnRegex.test(ARN);
};

const getCertificate = async (): Promise<string> => {
  while (true) {
    try {
      const certificateARN = await cli.prompt(
        "Please enter verified certificate ARN"
      );

      if (isValidCertificateARN(certificateARN)) {
        console.log("🧠 Certificate ARN received!");
        return certificateARN;
      } else {
        console.log("Invalid Certificate ARN. Please try again.");
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
};

export default getCertificate;
