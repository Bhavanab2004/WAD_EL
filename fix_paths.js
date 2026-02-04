const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const directories = ['BCA', 'BBA', 'Mca', 'Mba', 'MTech'];

function fixPath(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Check for erroneous double up-level path
    const target = '<script src="../../review-loader.js"></script>';
    const replacement = '<script src="../review-loader.js"></script>';

    if (content.includes(target)) {
        console.log(`Fixing Path in ${filePath}...`);
        const newContent = content.replace(target, replacement);
        fs.writeFileSync(filePath, newContent);
    }
}

directories.forEach(dir => {
    const dirPath = path.join(rootDir, dir);
    if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
            if (file.endsWith('.html')) {
                fixPath(path.join(dirPath, file));
            }
        });
    }
});
