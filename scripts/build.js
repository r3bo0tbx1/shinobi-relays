const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const outputDirName = 'shinobi';
const outputDir = path.join(root, outputDirName);

const publicEntries = [
  'index.html',
  '404.html',
  '_headers',
  '_redirects',
  'src',
  '.well-known',
];

function assertInsideRoot(target) {
  const resolved = path.resolve(target);
  if (resolved !== root && !resolved.startsWith(root + path.sep)) {
    throw new Error(`Refusing to touch path outside repository: ${resolved}`);
  }
  return resolved;
}

function copyEntry(relativePath) {
  const source = assertInsideRoot(path.join(root, relativePath));
  const target = assertInsideRoot(path.join(outputDir, relativePath));

  if (!fs.existsSync(source)) {
    throw new Error(`Missing build input: ${relativePath}`);
  }

  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.cpSync(source, target, { recursive: true });
    return;
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function contentVersion(relativePath) {
  const source = assertInsideRoot(path.join(root, relativePath));
  return crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex').slice(0, 12);
}

function versionAssets() {
  const indexPath = assertInsideRoot(path.join(outputDir, 'index.html'));
  const versions = {
    __SHINOBI_CSS_VERSION__: contentVersion(path.join('src', 'css', 'shinobi.css')),
    __SHINOBI_JS_VERSION__: contentVersion(path.join('src', 'js', 'shinobi.js')),
  };
  let html = fs.readFileSync(indexPath, 'utf8');

  for (const [placeholder, version] of Object.entries(versions)) {
    if (!html.includes(placeholder)) {
      throw new Error(`Missing asset version placeholder: ${placeholder}`);
    }
    html = html.replaceAll(placeholder, version);
  }

  fs.writeFileSync(indexPath, html);
}

assertInsideRoot(outputDir);
fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });
publicEntries.forEach(copyEntry);
versionAssets();

console.log(`Built ${path.relative(root, outputDir)} with ${publicEntries.join(', ')}`);
