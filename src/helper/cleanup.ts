import { removeSync } from "fs-extra";

try {
    console.log("\nRunning clean-up script\n");

    removeSync("test-results/");

} catch (error) {
    console.log(`Failed to delete directory!  ${error}`);
}