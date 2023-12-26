import { ensureDir, emptyDir } from "fs-extra";

try {
    ensureDir("test-results/screenshots");
    emptyDir("test-results/screenshots");

} catch (error) {
    console.log(`Folder not created!  ${error}`);
}