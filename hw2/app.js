const path = require('node:path');
const fs = require('node:fs/promises');

const foo = async () => {

    await fs.mkdir(path.join(process.cwd(), 'baseFolder'))
    const dirs = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5']
    const files = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt']
    for (const folderName of dirs) {
        const newFolder = await fs.mkdir(path.join('baseFolder', folderName), {recursive:true});
        for (const fileName of files) {
            const newFile = await fs.writeFile(path.join(newFolder, fileName), '');
            console.log(path.join(__dirname, 'baseFolder', folderName, fileName));
            console.log((await fs.stat(path.join(__dirname, 'baseFolder', folderName, fileName))).isFile());
        }

        console.log((await fs.stat(path.join(__dirname, 'baseFolder', folderName))).isDirectory());
    }

// await fs.rm(path.join(process.cwd(), 'baseFolder'), {recursive:true, force:true})
}

void foo();