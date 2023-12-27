import { ensureDirSync, emptyDirSync } from "fs-extra";

try {
    ensureDirSync("test-results/screenshots");
    emptyDirSync("test-results/screenshots");

} catch (error) {
    console.log(`Folder not created!  ${error}`);
}