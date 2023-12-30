import { removeSync } from "fs-extra";

try {
    console.log("\nRunning clean-up script\n");

    removeSync("test-results/lighthouse");
    removeSync("test-results/screenshots");
    removeSync("test-results/videos");
    removeSync("test-results/");
    removeSync("cucumber/");

} catch (error) {
    console.log(`Failed to delete directory!  ${error}`);
}