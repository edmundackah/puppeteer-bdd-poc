import { ensureDir, emptyDir } from "fs-extra";

try {
    ensureDir("test-results");
    emptyDir("test-results");

    ensureDir("screenshots");
    emptyDir("screenshots");

} catch (error) {
    console.log(`Folder not created!  ${error}`);
}