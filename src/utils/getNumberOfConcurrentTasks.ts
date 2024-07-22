import { cli } from "cli-ux";

const getNumberOfConcurrentTasks = async () => {
  try {
    let numOfConcurrentTasks;

    while (true) {
      const input = await cli.prompt(
        "How many tasks (app servers) would you like concurrently running"
      );
      numOfConcurrentTasks = Number(input);

      if (!isNaN(numOfConcurrentTasks) && numOfConcurrentTasks > 0) {
        break;
      } else {
        console.log("Please enter a valid number greater than 0.");
      }
    }

    console.log(
      `🧠 Confirming ${numOfConcurrentTasks} tasks will be concurrently running!`
    );
    return numOfConcurrentTasks;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default getNumberOfConcurrentTasks;
