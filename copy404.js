const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, 'dist', 'index.html');
const targetFile = path.join(__dirname, 'dist', '404.html');

fs.copyFileSync(sourceFile, targetFile);
console.log('404.html has been successfully copied from index.html');
