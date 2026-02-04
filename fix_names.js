const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const directories = ['BCA', 'BBA', 'Mca', 'Mba', 'MTech'];

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Pattern to look for: .split('(')[0].trim()
    // Validation: Only replace if it follows the collegeName queryselector logic we added earlier.

    const target = ".split('(')[0].trim()";
    const replacement = ".trim()";

    if (content.includes(target)) {
        console.log(`Fixing ${filePath}...`);
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
                fixFile(path.join(dirPath, file));
            }
        });
    }
});
