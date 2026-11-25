function summarizeRelayInventory(relays) {
    const bridges = relays.filter(relay => relay.kind === 'bridge');
    const publicRelays = relays.filter(relay => relay.kind === 'public');
    const unique = values => new Set(values.filter(Boolean)).size;
    return {
        total: relays.length,
        bridges: bridges.length,
        public: publicRelays.length,
        middles: publicRelays.filter(relay => relay.type === 'middle').length,
        exits: publicRelays.filter(relay => relay.type === 'exit').length,
        countries: unique(publicRelays.map(relay => relay.country)),
        platforms: unique(publicRelays.map(relay => String(relay.os || '').replace(/^[^\p{L}\p{N}]+/u, '').trim())),
        asns: unique(publicRelays.map(relay => relay.asn)),
        types: unique(relays.map(relay => relay.kind === 'bridge' ? 'bridge' : relay.type)),
        ipv6: relays.filter(relay => relay.kind === 'bridge' || relay.ipv6).length,
        upcoming: relays.filter(relay => relay.comingSoon).length,
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { summarizeRelayInventory };
}
