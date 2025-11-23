const fs = require('fs');
const path = require('path');

/**
 * Membuat folder jika belum ada
 * @param {string} folderPath - Path folder yang ingin dibuat
 * @returns {boolean} - true jika folder sudah ada, false jika baru dibuat
 */
function ensureFolderExists(folderPath) {
    const absolutePath = path.resolve(__dirname, '..', folderPath);
    
    if (!fs.existsSync(absolutePath)) {
        fs.mkdirSync(absolutePath, { recursive: true });
        console.log(`[FileUtils] Folder created: ${absolutePath}`);
        return false;
    }
    
    return true;
}

module.exports = { ensureFolderExists };