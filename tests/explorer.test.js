const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { publicLocations, locationCSS, renderAtlas, renderFamilies } = require('../scripts/explorer-build.js');
const relays = [
    { kind: 'bridge', name: 'SecretBridge', location: 'Private location', coordinates: [10, 20], fingerprint: 'PRIVATE_HASH' },
    { kind: 'public', name: 'Kondoru', location: 'Santiago, Chile', coordinates: [-33.45, -70.67], comingSoon: true },
    { kind: 'public', name: 'NoCoordinates', location: 'Public city' },
];

test('atlas includes public locations and never maps bridge metadata', () => {
    assert.deepEqual(publicLocations(relays).map(relay => relay.name), ['Kondoru']);
    for (const mode of [true, false]) {
        const html = renderAtlas(relays, mode);
        assert.ok(html.includes('ShinobiKondoru'));
        assert.ok(html.includes('Coming soon'));
        assert.ok(html.includes('NoCoordinates'));
        assert.ok(!/SecretBridge|Private location|PRIVATE_HASH/.test(html));
        assert.equal(html.includes('<svg'), mode);
    }
});

test('invalid coordinates and locations outside the map extent do not produce pins', () => {
    const malformed = [[Infinity, 0], ['0', 0], [-80, 0], [0, 181], [90, 0], [0]];
    assert.deepEqual(publicLocations(malformed.map(coordinates => ({ kind: 'public', coordinates }))), []);
});

test('map coordinates are generated as CSS without inline styles', () => {
    assert.match(locationCSS(relays), /^\.place-kondoru\{left:30\.369%;top:81\.690%\}/);
    assert.ok(!renderAtlas(relays, false).includes('style='));
});

test('inventory text is escaped in static map links', () => {
    const html = renderAtlas([{ kind: 'public', name: 'Test', location: '<img src=x onerror=alert(1)>' }], false);
    assert.ok(html.includes('&lt;img'));
    assert.ok(!html.includes('<img src=x'));
});

test('family panels use the existing published IDs and only interactive mode has copy buttons', () => {
    const root = path.resolve(__dirname, '..');
    const live = renderFamilies(root, true);
    const staticPage = renderFamilies(root, false);
    assert.equal((live.match(/data-copy=/g) || []).length, 2);
    assert.ok(!staticPage.includes('<button'));
    assert.ok(staticPage.includes('Public relay family'));
    assert.ok(staticPage.includes('Bridge family'));
});

test('family identities are embedded once in the contact section of both templates', () => {
    const fs = require('node:fs');
    for (const file of ['index.html', 'templates/nojs.html']) {
        const html = fs.readFileSync(path.resolve(__dirname, '..', file), 'utf8');
        assert.ok(!html.includes('family-panel'));
        assert.equal((html.match(/<!-- RELAY_FAMILIES -->/g) || []).length, 1);
        const contact = html.slice(html.indexOf('id="contact"'));
        assert.ok(contact.indexOf('id="relay-family"') > 0);
        assert.ok(contact.indexOf('id="relay-family"') < contact.indexOf('</section>'));
        assert.ok(!contact.includes('href=".well-known/tor-relay/ed25519-family-id.txt"'));
    }
});
