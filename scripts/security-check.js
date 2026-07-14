const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const allowedScriptSrc = new Set(['src/js/lucide.min.js', 'src/js/shinobi.js']);
const skippedFiles = new Set([
  path.join('src', 'js', 'lucide.min.js'),
  path.join('scripts', 'security-check.js'),
]);

const textExtensions = new Set(['.html', '.js', '.css', '.json', '.webmanifest', '.svg', '.txt', '']);
const failures = [];

function rel(file) {
  return path.relative(root, file).replace(/\\/g, '/');
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git') continue;
    if (entry.name === 'shinobi') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    const ext = path.extname(entry.name);
    if (textExtensions.has(ext) || entry.name.startsWith('_')) scanFile(full);
  }
}

function fail(file, line, message) {
  failures.push(`${rel(file)}:${line}: ${message}`);
}

function lineNumber(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

function scanFile(file) {
  const relative = rel(file);
  const content = fs.readFileSync(file, 'utf8');
  const ext = path.extname(file);
  const isSkipped = skippedFiles.has(path.normalize(relative));

  if (!isSkipped && ['.js', '.html'].includes(ext)) {
    const dangerousPatterns = [
      [/\binnerHTML\b/g, 'innerHTML is not allowed; build DOM with textContent/createElement/replaceChildren'],
      [/\bouterHTML\b/g, 'outerHTML is not allowed'],
      [/\binsertAdjacentHTML\b/g, 'insertAdjacentHTML is not allowed'],
      [/\bdocument\.write(?:ln)?\b/g, 'document.write/document.writeln is not allowed'],
      [/\beval\s*\(/g, 'eval() is not allowed'],
      [/\bnew\s+Function\b/g, 'Function constructor is not allowed'],
      [/\bsrcdoc\b/g, 'iframe srcdoc is not allowed'],
      [/\bset(?:Timeout|Interval)\s*\(\s*["'`]/g, 'string-based timer callback is not allowed'],
    ];
    for (const [pattern, message] of dangerousPatterns) {
      for (const match of content.matchAll(pattern)) fail(file, lineNumber(content, match.index), message);
    }
  }

  if (ext === '.html' || ext === '.svg') {
    for (const match of content.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      const attrs = match[1];
      const body = match[2].trim();
      const src = attrs.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1];
      if (!src && body) fail(file, lineNumber(content, match.index), 'inline script block is not allowed');
      if (src && !allowedScriptSrc.has(src.replace(/^\//, ''))) {
        fail(file, lineNumber(content, match.index), `unapproved script source: ${src}`);
      }
      if (src && allowedScriptSrc.has(src.replace(/^\//, '')) && !/\bdata-cfasync\s*=\s*["']false["']/i.test(attrs)) {
        fail(file, lineNumber(content, match.index), 'first-party script must opt out of Cloudflare Rocket Loader with data-cfasync="false"');
      }
    }

    for (const match of content.matchAll(/<style\b[^>]*>[\s\S]*?<\/style>/gi)) {
      fail(file, lineNumber(content, match.index), 'inline style block is not allowed');
    }

    for (const match of content.matchAll(/<[^>]+\son[a-z]+\s*=/gi)) {
      fail(file, lineNumber(content, match.index), 'inline event handler attribute is not allowed');
    }

    for (const match of content.matchAll(/<[^>]+\sstyle\s*=/gi)) {
      fail(file, lineNumber(content, match.index), 'inline style attribute is not allowed');
    }

    for (const match of content.matchAll(/\b(?:href|src|action)\s*=\s*["']\s*javascript:/gi)) {
      fail(file, lineNumber(content, match.index), 'javascript: URL is not allowed');
    }
  }

  if (ext === '.html') {
    for (const match of content.matchAll(/<a\b[^>]*target\s*=\s*["']_blank["'][^>]*>/gi)) {
      const tag = match[0];
      if (!/\brel\s*=\s*["'][^"']*\bnoopener\b[^"']*\bnoreferrer\b[^"']*["']/i.test(tag)) {
        fail(file, lineNumber(content, match.index), 'target="_blank" link must include rel="noopener noreferrer"');
      }
    }
  }
}

function scanHeaders() {
  const file = path.join(root, '_headers');
  const content = fs.readFileSync(file, 'utf8');
  const csp = content.match(/Content-Security-Policy:\s*(.+)/)?.[1] || '';
  const required = [
    "default-src 'self'",
    "script-src 'self'",
    "script-src-attr 'none'",
    "style-src 'self'",
    "style-src-attr 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
  ];
  for (const directive of required) {
    if (!csp.includes(directive)) fail(file, 1, `CSP must include ${directive}`);
  }
  if (/\bscript-src\b[^;]*'unsafe-inline'/.test(csp)) fail(file, 1, "CSP script-src must not allow 'unsafe-inline'");
  if (/\bscript-src\b[^;]*'unsafe-eval'/.test(csp)) fail(file, 1, "CSP script-src must not allow 'unsafe-eval'");
  if (!/^\/\*\s*[\s\S]*?^\s*Cache-Control:\s*[^\n]*\bno-transform\b/im.test(content)) {
    fail(file, 1, 'global headers must include Cache-Control: no-transform to prevent CDN HTML rewrites');
  }
}

walk(root);
scanHeaders();

if (failures.length) {
  console.error('Security check failed:');
  failures.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}

console.log('Security check passed.');
