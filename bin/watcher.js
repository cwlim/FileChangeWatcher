const watch = require('node-watch');
const fs = require('fs');
const chalk = require('chalk');

console.log(chalk.red('Watching src folder for any file changes ...'));

function copyFile(from, to) {
    fs.copyFile(from, to, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(chalk.green(`Copied ${from} to ${to}`));
        }
    });    
}

function updateFile(fileToCopy) {
    let destinationDir = './dist/';
    // Create new directory if needed
    const directory = fileToCopy.replace('src/', '');
    const folderIndex = directory.lastIndexOf('/');
    const destination = destinationDir + fileToCopy.replace('src/', '');    
    if (folderIndex > -1) {        
        fs.mkdir(destinationDir + directory.substring(0, folderIndex), { recursive: true}, (err) => {
            if (err) console.error(err);
            copyFile(fileToCopy, destination);
        });
    } else {
        copyFile(fileToCopy, destination);
    }
}

function deleteFile(fileToDelete) {
    console.log(chalk.gray('TODO: Implement remove file'));
}

watch('./src', { recursive: true }, (evt, fileToCopy) => {
    // console.log(evt);    
    if (evt === 'remove') {
        deleteFile(fileToCopy);
    } else {
        updateFile(fileToCopy);
    }
        
});