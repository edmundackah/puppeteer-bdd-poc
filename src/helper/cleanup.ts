import { remove } from "fs-extra";

try {
    console.log("\nRunning clean-up script\n");

    remove("test-results/");

} catch (error) {
    console.log(`Failed to delete directory!  ${error}`);
}