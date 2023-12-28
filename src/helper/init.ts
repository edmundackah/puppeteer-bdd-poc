import { ensureDirSync, emptyDirSync } from "fs-extra";

try {
    ensureDirSync("test-results/screenshots");
    emptyDirSync("test-results/screenshots");

    ensureDirSync("test-results/logs");
    emptyDirSync("test-results/logs");

} catch (error) {
    console.log(`Folder not created!  ${error}`);
}