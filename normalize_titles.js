const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const directories = ['BCA', 'BBA', 'Mca', 'Mba', 'MTech'];

function cleanTitle(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // We want to remove ", Bangalore" and others to be safe.
    // Regex to find H1 content
    const h1Regex = /<h1>(.*?)<\/h1>/;
    const match = content.match(h1Regex);

    if (match) {
        let originalTitle = match[1];
        let newTitle = originalTitle
            .replace(', Bangalore', '')
            .replace(' (Deemed to be University)', '')
            .replace(' (Deemed-to-be University)', '')
            .replace(' (Bangalore)', '')
            .replace(' (Autonomous)', '')
            // Add more common suffixes found in files if needed
            .trim();

        if (originalTitle !== newTitle) {
            console.log(`Fixing Title in ${filePath}: "${originalTitle}" -> "${newTitle}"`);
            const newContent = content.replace(match[0], `<h1>${newTitle}</h1>`);
            fs.writeFileSync(filePath, newContent);
        }
    }
}

directories.forEach(dir => {
    const dirPath = path.join(rootDir, dir);
    if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
            if (file.endsWith('.html')) {
                cleanTitle(path.join(dirPath, file));
            }
        });
    }
});
