const fs = require('fs');
const path = require('path');

function printTree(dir, prefix = '', ignoreList = ['node_modules', '.next', '.git', '.DS_Store']) {
    const files = fs.readdirSync(dir)
        .filter(file => !ignoreList.includes(file))
        .sort((a, b) => {
            // Сначала папки, потом файлы
            const aIsDir = fs.statSync(path.join(dir, a)).isDirectory();
            const bIsDir = fs.statSync(path.join(dir, b)).isDirectory();
            if (aIsDir && !bIsDir) return -1;
            if (!aIsDir && bIsDir) return 1;
            return a.localeCompare(b);
        });

    files.forEach((file, index) => {
        const fullPath = path.join(dir, file);
        const isLast = index === files.length - 1;
        const stats = fs.statSync(fullPath);

        console.log(prefix + (isLast ? '└── ' : '├── ') + file);

        if (stats.isDirectory()) {
            printTree(fullPath, prefix + (isLast ? '    ' : '│   '), ignoreList);
        }
    });
}

console.log('📁 Структура проекта:');
printTree('.');