const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

const directories = ['BCA', 'BBA', 'Mca', 'Mba', 'MTech'];

function cleanFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Regex to identify key hardcoded review parts like "class=\"review\"" and remove the block
    // Strategy: Look for the Study Reviews Heading and strip everything until the end of that section or script tag
    // This is risky with regex.

    // Safe approach: Replace specific known chunks if they are uniform, OR:
    // Replace the entire "Student Reviews" section with our standard block.

    // Pattern: <h2 class="section-title">Student Reviews</h2> ... (hardcoded divs) ... </div>

    // Let's look for the standard structure:
    // <h2 class="section-title">Student Reviews</h2>
    // [ content to remove ]
    // </div>

    // We will replace it with:
    // <h2 class="section-title">Student Reviews</h2>
    // <div id="college-reviews"></div>
    // </div>
    // <script src="../../review-loader.js"></script>
    // <script> ... init code ... </script>

    // BUT checking one file like Mba_1.html is needed to see uniformity.

    if (content.includes('class="review"')) {
        console.log(`Processing ${filePath}...`);

        // 1. Remove existing Review divs
        // We will do a replacement of the entire section if possible.
        // Or find where "Student Reviews" starts and truncate/rewrite until the script tag.

        const reviewHeaderIndex = content.indexOf('Student Reviews</h2>');
        if (reviewHeaderIndex === -1) return;

        const nextScriptIndex = content.indexOf('<script>', reviewHeaderIndex);

        let newContent = content.substring(0, reviewHeaderIndex + 20); // Keep header
        newContent += '\n    <div id="college-reviews"></div>\n  </div>\n'; // Close container

        // Add Loader
        newContent += `
  <script src="../../review-loader.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
        const collegeName = document.querySelector('h1').innerText.split('(')[0].trim();
        if(typeof fetchAndDisplayReviews === 'function') {
            fetchAndDisplayReviews('college-reviews', null, collegeName);
        }
    });
  </script>
</body>
</html>`;

        fs.writeFileSync(filePath, newContent);
    }
}

// Recursive or specific dir walk
directories.forEach(dir => {
    const dirPath = path.join(rootDir, dir);
    if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
            if (file.endsWith('.html')) {
                cleanFile(path.join(dirPath, file));
            }
        });
    }
});
