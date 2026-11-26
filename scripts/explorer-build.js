const fs = require('fs');
const path = require('path');

function escapeHTML(value = '') {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

function relaySlug(name) {
  return String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function publicLocations(relays) {
  return relays.filter(relay => relay.kind === 'public' && Array.isArray(relay.coordinates)
    && relay.coordinates.length === 2 && relay.coordinates.every(Number.isFinite)
    && relay.coordinates[0] >= -60 && relay.coordinates[0] <= 85 && Math.abs(relay.coordinates[1]) <= 180);
}

function locationCSS(relays) {
  return publicLocations(relays).map(relay => {
    const [latitude, longitude] = relay.coordinates;
    return `.place-${relaySlug(relay.name)}{left:${((longitude + 180) / 360 * 100).toFixed(3)}%;top:${((85 - latitude) / 145 * 100).toFixed(3)}%}`;
  }).join('\n') + '\n';
}

function renderAtlas(relays, interactive) {
  const locations = publicLocations(relays);
  const pins = locations.map(relay => `<span class="atlas-static-pin place-${relaySlug(relay.name)}${relay.comingSoon ? ' is-planned' : ''}" aria-hidden="true"></span>`).join('');
  const links = relays.filter(relay => relay.kind === 'public').map(relay => `<a href="#relay-${relaySlug(relay.name)}"><span>Shinobi${escapeHTML(relay.name)}</span><span>${escapeHTML(relay.location)}${relay.comingSoon ? ' · Coming soon' : ''}</span></a>`).join('');
  return `<div class="atlas-layout${interactive ? '' : ' atlas-static'}">
    <div class="atlas-main">
      <div class="atlas-canvas"${interactive ? ' id="relayAtlasCanvas"' : ''}>
        <img class="atlas-land" src="/src/maps/world-land.png?v=__MAP_LAND_VERSION__" width="1200" height="484" alt="World map showing approximate public relay locations" loading="lazy">
        <div class="atlas-static-pins">${pins}</div>
        ${interactive ? '<svg id="relayAtlasMarkers" viewBox="0 0 1200 484" role="group" tabindex="0" aria-label="Explore public relay locations" aria-describedby="atlasInteractionHelp"><image class="atlas-svg-land" href="/src/maps/world-land.png?v=__MAP_LAND_VERSION__" width="1200" height="484" aria-hidden="true"/><g id="relayAtlasPoints"></g></svg>' : ''}
      </div>
      ${interactive ? '<div class="atlas-controls" role="group" aria-label="Map controls"><div><button type="button" id="atlasZoomOut" aria-label="Zoom out">−</button><output id="atlasZoomLevel" aria-label="Map zoom">100%</output><button type="button" id="atlasZoomIn" aria-label="Zoom in">+</button><button type="button" id="atlasReset" aria-label="Reset map to world view">World</button></div><button type="button" id="atlasExpand" aria-haspopup="dialog" aria-expanded="false">Expand map ↗</button></div><p id="atlasInteractionHelp" class="atlas-interaction-help">Select a marker. Zoom in for nearby locations; drag or use arrow keys to pan.</p>' : ''}
      <div class="atlas-legend">${interactive ? '<span><span class="legend-dot running"></span>Running</span><span><span class="legend-dot offline"></span>Offline</span>' : '<span><span class="legend-dot"></span>Configured</span>'}<span><span class="legend-dot planned"></span>Coming soon</span></div>
      <details class="atlas-location-list"><summary>Browse all ${relays.filter(relay => relay.kind === 'public').length} public relay locations</summary><div>${links}</div></details>
    </div>
    ${interactive ? '<aside class="atlas-selection" id="relayAtlasSelection" aria-live="polite"><span class="explorer-eyebrow">PUBLIC RELAY FOOTPRINT</span><h3>Explore the locations</h3><p>The map summary will load with the relay inventory.</p></aside>' : ''}
  </div>${interactive ? '<dialog id="atlasDialog" class="atlas-dialog" aria-labelledby="atlasDialogTitle"><div class="atlas-dialog-heading"><h2 id="atlasDialogTitle">Shinobi relay atlas</h2><button type="button" id="atlasDialogClose" autofocus>Close map ×</button></div></dialog>' : ''}`;
}

function renderFamilies(root, interactive = true) {
  const values = fs.readFileSync(path.join(root, '.well-known/tor-relay/ed25519-family-id.txt'), 'utf8')
    .split(/\r?\n/).map(line => line.trim()).filter(line => line && !line.startsWith('#'));
  if (values.length !== 2 || values.some(value => !/^[A-Za-z0-9+/]{43}$/.test(value))) throw new Error('Expected the public relay and bridge family IDs');
  return `<div class="family-heading"><h3>Family IDs</h3><span class="family-algorithm">Ed25519</span><a class="explorer-link" href="/.well-known/tor-relay/ed25519-family-id.txt">Proof file ↗</a></div><div class="family-list">${values.map((value, index) => `<div class="family-identity"><span class="family-label">${index === 0 ? 'Public relay family' : 'Bridge family'}</span><code>${escapeHTML(value)}</code>${interactive ? `<button class="copy-btn family-copy" type="button" data-copy="${escapeHTML(value)}" aria-label="Copy ${index === 0 ? 'public relay' : 'bridge'} family ID">Copy</button>` : ''}</div>`).join('')}</div>`;
}

module.exports = { relaySlug, publicLocations, locationCSS, renderAtlas, renderFamilies };
