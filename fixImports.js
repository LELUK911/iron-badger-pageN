// fixImports.js
import fs from 'fs';
import path from 'path';

// 👉 Configura la tua cartella di lavoro
const SRC_DIR = './src';

function getAllFiles(dir, files = []) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllFiles(fullPath, files);
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            files.push(fullPath);
        }
    });
    return files;
}

function fixImportPaths(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanged = false;

    const importRegex = /import\s+[^'"]+\s+from\s+['"](.+)['"]/g;

    content = content.replace(importRegex, (match, importPath) => {
        if (!importPath.startsWith('.')) {
            return match; // Ignora import di librerie tipo 'react', 'react-dom', ecc.
        }

        const baseDir = path.dirname(filePath);
        let fullImportPath = path.resolve(baseDir, importPath);

        // Proviamo a correggere
        if (!fs.existsSync(fullImportPath) && fs.existsSync(fullImportPath + '.jsx')) {
            console.log(`Fixing import in ${filePath}: ${importPath} → ${importPath}.jsx`);
            hasChanged = true;
            return match.replace(importPath, importPath + '.jsx');
        }
        if (!fs.existsSync(fullImportPath) && fs.existsSync(fullImportPath + '.js')) {
            console.log(`Fixing import in ${filePath}: ${importPath} → ${importPath}.js`);
            hasChanged = true;
            return match.replace(importPath, importPath + '.js');
        }

        return match; // se va già bene
    });

    if (hasChanged) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
}

function main() {
    const files = getAllFiles(SRC_DIR);
    console.log(`Found ${files.length} files to process.`);

    files.forEach(fixImportPaths);

    console.log('✅ Import fixing completed.');
}

main();
