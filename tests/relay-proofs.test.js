const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const inventory = require('../src/data/relays.json');

function identities(file) {
    const records = new Map();
    let name;
    for (const line of fs.readFileSync(path.join(__dirname, '../.well-known/tor-relay', file), 'utf8').split(/\r?\n/)) {
        const heading = line.match(/^# (Shinobi[A-Za-z0-9]+)(?:\s|$)/);
        if (heading) { name = heading[1]; continue; }
        if (!line.trim() || line.startsWith('#')) continue;
        assert.ok(name, `identity without a relay name in ${file}`);
        assert.ok(!records.has(name), `duplicate ${name} in ${file}`);
        records.set(name, line.trim());
        name = undefined;
    }
    return records;
}

test('ready public relay inventory agrees exactly with RSA ownership proofs', () => {
    const expected = inventory.filter(relay => relay.kind === 'public' && !relay.comingSoon);
    const published = identities('rsa-fingerprint.txt');
    assert.equal(published.size, expected.length);
    assert.equal(new Set(published.values()).size, expected.length);
    for (const relay of expected) {
        assert.match(relay.fingerprint, /^[A-F0-9]{40}$/);
        assert.equal(published.get(`Shinobi${relay.name}`), relay.fingerprint);
    }
});

test('Ed25519 proofs cover the same public relays with valid distinct public keys', () => {
    const rsa = identities('rsa-fingerprint.txt');
    const ed25519 = identities('ed25519-master-pubkey.txt');
    assert.deepEqual([...ed25519.keys()].sort(), [...rsa.keys()].sort());
    assert.equal(new Set(ed25519.values()).size, ed25519.size);
    for (const key of ed25519.values()) {
        assert.match(key, /^[A-Za-z0-9+/]{43}$/);
        assert.equal(Buffer.from(key, 'base64').length, 32);
    }
});
