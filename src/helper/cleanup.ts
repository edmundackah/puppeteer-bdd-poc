import { removeSync } from "fs-extra";

try {
    console.log("\nRunning clean-up script\n");

    removeSync("test-results/");

    removeSync("@rerun.txt");

    removeSync("user-agent.txt");

} catch (error) {
    console.log(`Failed to delete directory!  ${error}`);
}