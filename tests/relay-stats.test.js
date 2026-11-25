const { test } = require('node:test');
const assert = require('node:assert/strict');
const { summarizeRelayInventory } = require('../src/js/relay-stats.js');

const inventory = [
    { kind: 'bridge', type: 'bridge' },
    { kind: 'public', type: 'middle', name: 'Existing', country: 'Japan', os: '🐧 Linux', asn: 'AS20473', ipv6: '2001:db8::1' },
    { kind: 'public', type: 'middle', name: 'Kondoru', country: 'Chile', os: '🍃 Haiku', asn: 'AS20473', ipv6: '2001:db8::2', fingerprint: '', comingSoon: true },
];

const expected = {
    total: 3, bridges: 1, public: 2, middles: 2, exits: 0,
    countries: 2, platforms: 2, asns: 1, types: 2, ipv6: 3, upcoming: 1,
};

test('Kondoru contributes to every inventory count while awaiting its fingerprint', () => {
    assert.deepEqual(summarizeRelayInventory(inventory), expected);
});

test('making a pending relay ready does not change inventory totals', () => {
    const ready = inventory.map(relay => relay.name === 'Kondoru'
        ? { ...relay, comingSoon: false, fingerprint: 'A'.repeat(40) } : relay);
    assert.deepEqual(summarizeRelayInventory(ready), { ...expected, upcoming: 0 });
});

test('a future relay updates unique dimensions and IPv6 coverage without page edits', () => {
    const future = [...inventory, {
        kind: 'public', type: 'exit', country: 'Test country', os: '🚀 Plan 9',
        asn: 'AS64501', fingerprint: '', comingSoon: true,
    }];
    assert.deepEqual(summarizeRelayInventory(future), {
        ...expected, total: 4, public: 3, exits: 1, countries: 3,
        platforms: 3, asns: 2, types: 3, upcoming: 2,
    });
});

test('a future bridge updates bridge totals and coverage without changing public dimensions', () => {
    assert.deepEqual(summarizeRelayInventory([...inventory, { kind: 'bridge', comingSoon: true }]), {
        ...expected, total: 4, bridges: 2, ipv6: 4, upcoming: 2,
    });
});

test('empty inventory produces zero counts', () => {
    assert.deepEqual(summarizeRelayInventory([]), Object.fromEntries(Object.keys(expected).map(key => [key, 0])));
});
