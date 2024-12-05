const path = require('node:path');
const fs = require('node:fs/promises');

const foo = async () => {

    await fs.mkdir(path.join(process.cwd(), 'baseFolder'), {recursive:true});
    const dirs = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5']
    const files = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt']
        for (const folderName of dirs) {
            const newFolder = await fs.mkdir(path.join('baseFolder', folderName), {recursive:true});

            for (const fileName of files) {
                await fs.writeFile(path.join(newFolder, fileName), "");
            }

        }
// await fs.rm(path.join(process.cwd(), 'baseFolder'), {recursive:true, force:true})
};

const readBaseFolder = async (folderPath) => {
        const items = await fs.readdir(folderPath);

        for (const item of items) {
            const itemPath = path.join(folderPath, item);
                if ((await fs.stat(itemPath)).isDirectory()) {
                    console.log(`${itemPath} — folder`);
                    await readBaseFolder(itemPath);
                } else if ((await fs.stat(itemPath)).isFile()) {
                    console.log(`${itemPath} — file`);
                }
        }
};

(async () => {
    await foo();
    console.log('Content baseFolder:');
    await readBaseFolder(path.join(process.cwd(), 'baseFolder'));
})();