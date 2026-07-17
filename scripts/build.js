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

const relayRegions = [
  { id: 'asia-oceania', title: 'Asia-Oceania', icon: '🌏' },
  { id: 'africa', title: 'Africa', icon: '🌍' },
  { id: 'north-america', title: 'North America', icon: '🌎' },
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

function copyNoJsTemplate() {
  const source = assertInsideRoot(path.join(root, 'templates', 'nojs.html'));
  const target = assertInsideRoot(path.join(outputDir, 'nojs', 'index.html'));

  if (!fs.existsSync(source)) {
    throw new Error('Missing build input: templates/nojs.html');
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function contentVersion(relativePath) {
  const source = assertInsideRoot(path.join(root, relativePath));
  return crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex').slice(0, 12);
}

function replaceRequired(content, placeholder, value, file) {
  if (!content.includes(placeholder)) {
    throw new Error(`Missing placeholder ${placeholder} in ${file}`);
  }
  return content.replaceAll(placeholder, String(value));
}

function escapeHTML(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function stripLeadingEmoji(value = '') {
  return String(value).replace(/^[^\p{L}\p{N}]+/u, '').trim();
}

function readRelayData() {
  const dataPath = assertInsideRoot(path.join(root, 'src', 'data', 'relays.json'));
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  if (!Array.isArray(data) || data.some(relay => !relay || typeof relay !== 'object')) {
    throw new TypeError('src/data/relays.json must contain an array of relay objects');
  }
  return data;
}

function renderDetails(rows) {
  return rows.map(([label, value, code = false]) => {
    const renderedValue = code ? `<code>${escapeHTML(value || 'N/A')}</code>` : escapeHTML(value || 'N/A');
    const className = String(label).toLowerCase().replaceAll(/[^a-z0-9]+/g, '-');
    return `<div class="detail-row detail-${className}"><dt>${escapeHTML(label)}</dt><dd>${renderedValue}</dd></div>`;
  }).join('');
}

function renderRelayCard(relay) {
  const isBridge = relay.kind === 'bridge';
  const role = isBridge ? 'Hidden bridge' : `Configured ${relay.type || 'middle'}`;
  const className = isBridge ? 'bridge' : relay.type === 'exit' ? 'exit' : 'middle';
  const title = `Shinobi${relay.name || 'Unknown'} ${relay.emoji || ''}`.trim();
  const quickFacts = isBridge
    ? [
        stripLeadingEmoji(relay.distribution) || 'Unknown distribution',
        'Obfs4 transport',
      ]
    : [
        relay.location || 'Unknown location',
        stripLeadingEmoji(relay.os) || 'Unknown platform',
      ];
  const rows = isBridge
    ? [
        ['Fingerprint', relay.fingerprint, true],
        ['Distribution', stripLeadingEmoji(relay.distribution)],
        ['Transport', 'Obfs4'],
        ['IPv6', 'Enabled'],
      ]
    : [
        ['Hostname', relay.host, true],
        ['Fingerprint', relay.fingerprint, true],
        ['IPv4', relay.ipv4, true],
        ['IPv6', relay.ipv6, true],
        ['Location', relay.location],
        ['Platform', stripLeadingEmoji(relay.os)],
        ['ASN', relay.asn, true],
      ];
  const metrics = relay.fingerprint
    ? isBridge
      ? `<a class="metrics-link official-link" href="https://metrics.torproject.org/rs.html#details/${encodeURIComponent(relay.fingerprint)}" target="_blank" rel="noopener noreferrer">Check on Tor Relay Search</a>`
      : `<a class="metrics-link" href="https://metrics.1aeo.com/relay/${encodeURIComponent(relay.fingerprint)}/" target="_blank" rel="noopener noreferrer">View on 1AEO Metrics</a>`
    : '';

  return [
    `<article class="relay-card ${className}">`,
    '<header>',
    '<div class="relay-heading">',
    `<h4>${escapeHTML(title)}</h4>`,
    `<span class="role">${escapeHTML(role)}</span>`,
    '</div>',
    `<span class="relay-kind" aria-hidden="true">${isBridge ? 'BR' : relay.type === 'exit' ? 'EX' : 'MR'}</span>`,
    '</header>',
    `<p class="relay-description">${escapeHTML(relay.tooltip || 'Tor relay operated by the Shinobi fleet.')}</p>`,
    '<div class="quick-facts">',
    ...quickFacts.map(fact => `<span>${escapeHTML(fact)}</span>`),
    '</div>',
    '<details class="relay-details">',
    '<summary>Technical details</summary>',
    `<dl>${renderDetails(rows)}</dl>`,
    metrics,
    '</details>',
    '</article>',
  ].join('');
}

function generateNoJsPage(relays) {
  const file = path.join('nojs', 'index.html');
  const pagePath = assertInsideRoot(path.join(outputDir, file));
  const activeRelays = relays.filter(relay => !relay.comingSoon);
  const bridges = activeRelays.filter(relay => relay.kind === 'bridge');
  const publicRelays = activeRelays.filter(relay => relay.kind === 'public');
  const exitCount = publicRelays.filter(relay => relay.type === 'exit').length;
  const middleCount = publicRelays.filter(relay => relay.type === 'middle').length;
  const countryCount = new Set(publicRelays.map(relay => relay.country).filter(Boolean)).size;
  const platformCount = new Set(publicRelays.map(relay => stripLeadingEmoji(relay.os)).filter(Boolean)).size;
  const asnCount = new Set(publicRelays.map(relay => relay.asn).filter(Boolean)).size;
  const ipv6Count = activeRelays.filter(relay => relay.kind === 'bridge' || relay.ipv6).length;
  const bridgeCards = bridges.map(renderRelayCard).join('');
  const publicRegions = relayRegions.map(region => {
    const regionRelays = publicRelays.filter(relay => relay.region === region.id);
    return [
      `<section class="region region-${region.id}" id="${region.id}" aria-labelledby="${region.id}-title">`,
      '<div class="region-heading">',
      `<h3 id="${region.id}-title">${region.icon} ${region.title}</h3>`,
      `<span>${regionRelays.length} relay${regionRelays.length === 1 ? '' : 's'}</span>`,
      '</div>',
      `<div class="relay-grid">${regionRelays.map(renderRelayCard).join('')}</div>`,
      '</section>',
    ].join('');
  }).join('');

  let html = fs.readFileSync(pagePath, 'utf8');
  const replacements = {
    __BRIDGE_COUNT__: bridges.length,
    __PUBLIC_COUNT__: publicRelays.length,
    __MIDDLE_COUNT__: middleCount,
    __EXIT_COUNT__: exitCount,
    __COUNTRY_COUNT__: countryCount,
    __PLATFORM_COUNT__: platformCount,
    __ASN_COUNT__: asnCount,
    __IPV6_COUNT__: ipv6Count,
    __TOTAL_COUNT__: activeRelays.length,
    '<!-- BRIDGE_CARDS -->': bridgeCards,
    '<!-- PUBLIC_REGIONS -->': publicRegions,
  };

  for (const [placeholder, value] of Object.entries(replacements)) {
    html = replaceRequired(html, placeholder, value, file);
  }

  fs.writeFileSync(pagePath, html);
}

function versionAssets() {
  const pages = [
    {
      file: 'index.html',
      versions: {
        __SHINOBI_CSS_VERSION__: contentVersion(path.join('src', 'css', 'shinobi.css')),
        __SHINOBI_JS_VERSION__: contentVersion(path.join('src', 'js', 'shinobi.js')),
        __RELAY_DATA_VERSION__: contentVersion(path.join('src', 'data', 'relays.json')),
        'content="0; url=/shinobi/nojs/"': 'content="0; url=/nojs/"',
      },
    },
    {
      file: path.join('nojs', 'index.html'),
      versions: {
        __NOJS_CSS_VERSION__: contentVersion(path.join('src', 'css', 'nojs.css')),
      },
    },
  ];

  for (const page of pages) {
    const pagePath = assertInsideRoot(path.join(outputDir, page.file));
    let html = fs.readFileSync(pagePath, 'utf8');
    for (const [placeholder, version] of Object.entries(page.versions)) {
      html = replaceRequired(html, placeholder, version, page.file);
    }
    fs.writeFileSync(pagePath, html);
  }
}

assertInsideRoot(outputDir);
fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });
publicEntries.forEach(copyEntry);
copyNoJsTemplate();
generateNoJsPage(readRelayData());
versionAssets();

console.log(`Built ${path.relative(root, outputDir)} with ${publicEntries.join(', ')} and generated nojs`);
