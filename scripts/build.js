const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { summarizeRelayInventory } = require('../src/js/relay-stats.js');
const { locationCSS, renderAtlas, renderFamilies } = require('./explorer-build.js');

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
  'onion-mirror.txt',
  'canary.txt',
  '0xB3BD6196E1CFBFB4.asc',
];

const relayRegions = [
  { id: 'asia-oceania', title: 'Asia-Oceania', icon: '🌏' },
  { id: 'africa', title: 'Africa', icon: '🌍' },
  { id: 'north-america', title: 'North America', icon: '🌎' },
  { id: 'south-america', title: 'South America', icon: '🌎' },
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
  const role = relay.comingSoon ? 'Coming soon' : isBridge ? 'Hidden bridge' : `Configured ${relay.type || 'middle'}`;
  const className = isBridge ? 'bridge' : relay.type === 'exit' ? 'exit' : 'middle';
  const title = `Shinobi${relay.name || 'Unknown'} ${relay.emoji || ''}`.trim();
  const kindLabel = isBridge ? 'Bridge' : relay.type === 'exit' ? 'Exit' : 'Middle/Guard';
  const relaySlug = String(relay.name || 'unknown').toLowerCase().replaceAll(/[^a-z0-9]+/g, '-');
  const detailsId = `relay-details-${relaySlug}`;
  const detailsTitleId = `${detailsId}-title`;
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
        ['Fingerprint', relay.fingerprint || 'Awaiting fingerprint', true],
        ['Distribution', stripLeadingEmoji(relay.distribution)],
        ['Transport', 'Obfs4'],
        ['IPv6', 'Enabled'],
      ]
    : [
        ['Hostname', relay.host, true],
        ['Fingerprint', relay.fingerprint || 'Awaiting fingerprint', true],
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
    `<article class="relay-card ${className}" id="relay-${relaySlug}">`,
    '<header>',
    '<div class="relay-heading">',
    `<h4>${escapeHTML(title)}</h4>`,
    `<span class="role${relay.comingSoon ? ' is-planned' : ''}">${escapeHTML(role)}</span>`,
    '</div>',
    `<span class="relay-kind">${kindLabel}</span>`,
    '</header>',
    `<p class="relay-description">${escapeHTML(relay.tooltip || 'Tor relay operated by the Shinobi fleet.')}</p>`,
    '<div class="quick-facts">',
    ...quickFacts.map(fact => `<span>${escapeHTML(fact)}</span>`),
    '</div>',
    `<button class="relay-details-trigger" type="button" popovertarget="${detailsId}" aria-label="Show technical details for ${escapeHTML(title)}">Technical details</button>`,
    `<div class="relay-details-popover" id="${detailsId}" popover="auto" role="dialog" aria-labelledby="${detailsTitleId}">`,
    '<div class="relay-details-heading">',
    `<h5 id="${detailsTitleId}">${escapeHTML(title)}</h5>`,
    `<button class="relay-details-close" type="button" popovertarget="${detailsId}" popovertargetaction="hide" aria-label="Close technical details for ${escapeHTML(title)}"><span aria-hidden="true">×</span></button>`,
    '</div>',
    `<dl>${renderDetails(rows)}</dl>`,
    metrics,
    '</div>',
    '</article>',
  ].join('');
}

function generateNoJsPage(relays) {
  const file = path.join('nojs', 'index.html');
  const pagePath = assertInsideRoot(path.join(outputDir, file));
  const counts = summarizeRelayInventory(relays);
  const bridges = relays.filter(relay => relay.kind === 'bridge');
  const bridgeCards = bridges.map(renderRelayCard).join('');
  const publicRegions = relayRegions.map(region => {
    const regionRelays = relays.filter(relay => relay.kind === 'public' && relay.region === region.id);
    const upcomingCount = regionRelays.filter(relay => relay.comingSoon).length;
    return [
      `<section class="region region-${region.id}" id="${region.id}" aria-labelledby="${region.id}-title">`,
      '<div class="region-heading">',
      `<h3 id="${region.id}-title"><span class="region-icon" aria-hidden="true">${region.icon}</span><span>${escapeHTML(region.title)}</span></h3>`,
      `<span>${regionRelays.length} relay${regionRelays.length === 1 ? '' : 's'}${upcomingCount ? ` · ${upcomingCount} coming soon` : ''}</span>`,
      '</div>',
      `<div class="relay-grid">${regionRelays.map(renderRelayCard).join('')}</div>`,
      '</section>',
    ].join('');
  }).join('');

  let html = fs.readFileSync(pagePath, 'utf8');
  const replacements = {
    ...inventoryPlaceholders(counts),
    '<!-- BRIDGE_CARDS -->': bridgeCards,
    '<!-- PUBLIC_REGIONS -->': publicRegions,
  };

  for (const [placeholder, value] of Object.entries(replacements)) {
    if (html.includes(placeholder)) html = replaceRequired(html, placeholder, value, file);
  }

  fs.writeFileSync(pagePath, html);
}

function inventoryPlaceholders(counts) {
  return {
    __BRIDGE_COUNT__: counts.bridges,
    __PUBLIC_COUNT__: counts.public,
    __MIDDLE_COUNT__: counts.middles,
    __EXIT_COUNT__: counts.exits,
    __COUNTRY_COUNT__: counts.countries,
    __PLATFORM_COUNT__: counts.platforms,
    __ASN_COUNT__: counts.asns,
    __TYPE_COUNT__: counts.types,
    __IPV6_COUNT__: counts.ipv6,
    __TOTAL_COUNT__: counts.total,
    __UPCOMING_COUNT__: counts.upcoming,
    __UPCOMING_LABEL__: `${counts.upcoming} upcoming relay${counts.upcoming === 1 ? '' : 's'}`,
  };
}

function generateMainCounts(relays) {
  const file = path.join(outputDir, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  for (const [placeholder, value] of Object.entries(inventoryPlaceholders(summarizeRelayInventory(relays)))) {
    if (html.includes(placeholder)) html = replaceRequired(html, placeholder, value, 'index.html');
  }
  fs.writeFileSync(file, html);
}

function versionAssets() {
  const pages = [
    {
      file: 'index.html',
      versions: {
        __SHINOBI_CSS_VERSION__: contentVersion(path.join('src', 'css', 'shinobi.css')),
        __LUCIDE_JS_VERSION__: contentVersion(path.join('src', 'js', 'lucide.min.js')),
        __SHINOBI_JS_VERSION__: contentVersion(path.join('src', 'js', 'shinobi.js')),
        __RELAY_STATS_JS_VERSION__: contentVersion(path.join('src', 'js', 'relay-stats.js')),
        __RELAY_EXPLORER_JS_VERSION__: contentVersion(path.join('src', 'js', 'relay-explorer.js')),
        __MAP_LAND_VERSION__: contentVersion(path.join('src', 'maps', 'world-land.png')),
        __EXPLORER_CSS_VERSION__: contentVersion(path.join('src', 'css', 'relay-explorer.css')),
        __MAP_POSITIONS_VERSION__: contentVersion(path.join(outputDirName, 'src', 'css', 'relay-positions.css')),
        __RELAY_DATA_VERSION__: contentVersion(path.join('src', 'data', 'relays.json')),
        'content="0; url=/shinobi/nojs/"': 'content="0; url=/nojs/"',
      },
    },
    {
      file: path.join('nojs', 'index.html'),
      versions: {
        __NOJS_CSS_VERSION__: contentVersion(path.join('src', 'css', 'nojs.css')),
        __MAP_LAND_VERSION__: contentVersion(path.join('src', 'maps', 'world-land.png')),
        __EXPLORER_CSS_VERSION__: contentVersion(path.join('src', 'css', 'relay-explorer.css')),
        __MAP_POSITIONS_VERSION__: contentVersion(path.join(outputDirName, 'src', 'css', 'relay-positions.css')),
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

function validateNoJsPage() {
  const file = path.join('nojs', 'index.html');
  const pagePath = assertInsideRoot(path.join(outputDir, file));
  const html = fs.readFileSync(pagePath, 'utf8');
  const checks = [
    [/<script\b/i, 'script elements'],
    [/\bdata-lucide\b/i, 'Lucide placeholders'],
    [/<svg\b/i, 'inline SVG'],
    [/\son[a-z]+\s*=/i, 'inline event handlers'],
    [new RegExp(`\\b${'java'}${'script'}\\s*:`, 'i'), 'script-scheme URLs'],
  ];

  for (const [pattern, label] of checks) {
    if (pattern.test(html)) {
      throw new Error(`Generated ${file} must not contain ${label}`);
    }
  }

  if (
    !html.includes('aria-label="No JavaScript"')
    || !html.includes('class="nojs-mark__js">JS</span>')
    || !html.includes('class="nojs-mark__times">×</span>')
  ) {
    throw new Error(`Generated ${file} is missing the accessible JS× identity mark`);
  }
}

function generateExplorer(relays) {
  const built = new Date().toISOString();
  fs.writeFileSync(path.join(outputDir, 'src/css/relay-positions.css'), locationCSS(relays));
  for (const [relative, interactive] of [['index.html', true], ['nojs/index.html', false]]) {
    const file = path.join(outputDir, relative);
    let html = fs.readFileSync(file, 'utf8');
    html = replaceRequired(html, '<!-- RELAY_ATLAS -->', renderAtlas(relays, interactive), relative);
    html = replaceRequired(html, '<!-- RELAY_FAMILIES -->', renderFamilies(root, interactive), relative);
    html = html.replaceAll('__BUILD_TIMESTAMP__', built).replaceAll('__BUILD_DATE__', built.slice(0, 10) + ' UTC');
    fs.writeFileSync(file, html);
  }
}

assertInsideRoot(outputDir);
fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });
publicEntries.forEach(copyEntry);
copyNoJsTemplate();
const relays = readRelayData();
generateExplorer(relays);
generateMainCounts(relays);
generateNoJsPage(relays);
versionAssets();
validateNoJsPage();

console.log(`Built ${path.relative(root, outputDir)} with ${publicEntries.join(', ')} and generated nojs`);
