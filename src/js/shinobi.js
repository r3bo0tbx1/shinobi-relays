        const relays = [
            { kind: 'bridge', type: 'bridge', name: 'Kage', emoji: '👤', tooltip: '影 (Kage) - Shadow: Moves unseen, concealing your path into the network', fingerprint: 'FD986C182E6F2797E2B87A31401866FAC8DD5B0F', distribution: '⚙️ Settings' },
            { kind: 'bridge', type: 'bridge', name: 'Boshin', emoji: '🐲', tooltip: '暴神 (Boshin) - Fierce God: Storm deity, unstoppable force breaking through censorship', fingerprint: '52BA0AFE63B44BEEB855E714212624409A539FE3', distribution: '💬 Telegram' },
            { kind: 'bridge', type: 'bridge', name: 'Kasumi', emoji: '🌫️', tooltip: '霞 (Kasumi) - Mist: Obscures vision, cloaking traffic in haze', fingerprint: '61EB69AC435D0C33EF5FB33FDBB47E8692F139DF', distribution: '🔒 HTTPS' },
            { kind: 'bridge', type: 'bridge', name: 'Yami', emoji: '🌘', tooltip: '闇 (Yami) - Darkness: Embraces the void, invisible to censors', fingerprint: 'C523B28E0E6BE86E472A957A2F7FCD5864ACA18F', distribution: '📧 Email' },
            { kind: 'bridge', type: 'bridge', name: 'Kitsune', emoji: '🦊', tooltip: '狐 (Kitsune) - Fox: Nine-tailed shapeshifter, disguising every packet that passes through', fingerprint: '8357F444438EDC6662525114AA6EF8FA869BFA40', distribution: '📧 Email' },
            { kind: 'bridge', type: 'bridge', name: 'Tsuki', emoji: '🌙', tooltip: "月 (Tsuki) - Moon: Visible in the dark, revealing nothing of where you're headed", fingerprint: '4D743DF0D22DFB60EE732DF48C7773443FF19297', distribution: '📧 Email' },
            { kind: 'bridge', type: 'bridge', name: 'Hikari', emoji: '⚡', tooltip: '光 (Hikari) - Light: A way through the blackout, seen only by those who need it', fingerprint: '448B752F66A55644A7414F34B7644BCCB74DA4FF', distribution: '📧 Email' },
            { kind: 'bridge', type: 'bridge', name: 'Jiro', emoji: '⚓', tooltip: "次郎 (Jiro) - The Standby: Doesn't chase the spotlight, just keeps the line open", fingerprint: '1CE312AC255EE3AEA778ABCE94552F3C42C21A69', distribution: '📧 Email' },
            { kind: 'public', type: 'middle', region: 'asia-oceania', name: 'Mamori', emoji: '🛡️', tooltip: '守り (Mamori) - Guardian: Protects your entry into the network', host: 'jp-relay.brokenbotnet.com', fingerprint: '7F28C3E41DA9FD4A2B8143CB6038304634EDC396', ipv4: '158.51.109.143', ipv6: '2602:fd6f:100:1f::1337:c0de', mobileIpv6: '...:1337:c0de', location: 'Tokyo, Japan 🇯🇵', country: 'Japan', os: '🐧 Linux', asn: 'AS18526' },
            { kind: 'public', type: 'exit', region: 'asia-oceania', name: 'Kenshin', emoji: '⚔️', tooltip: '剣心 (Kenshin) - Sword Heart: Cuts through to your destination', host: 'tor-exit.brokenbotnet.com', fingerprint: '64CE119D87F0A28F31D74280FB9675D880CA4BFA', ipv4: '172.234.92.148', ipv6: '2400:8905:e001:10f::1337:c0de', mobileIpv6: '...:1337:c0de', location: 'Osaka, Japan 🇯🇵', country: 'Japan', os: '🐧 Linux', asn: 'AS63949' },
            { kind: 'public', type: 'middle', region: 'asia-oceania', name: 'Tora', emoji: '🐯', tooltip: "虎 (Tora) - Tiger: Korea's national animal, prowling unseen through the network", host: 'kr-relay.brokenbotnet.com', fingerprint: 'A6A2A807338167A5E58F4DD2D4CD0817AF3DD562', ipv4: '158.247.199.231', ipv6: '2401:c080:1c01:68e::1337:c0de', mobileIpv6: '...:1337:c0de', location: 'Seoul, South Korea 🇰🇷', country: 'South Korea', os: '🐡 OpenBSD', asn: 'AS20473' },
            { kind: 'public', type: 'middle', region: 'asia-oceania', name: 'Kaimon', emoji: '⛩️', tooltip: '開門 (Kaimon) - Opening Gate: Unlocking paths through the network to Asia', host: 'sg-relay.brokenbotnet.com', fingerprint: '0EEE0B1EED5E35E1E3F2575CD0AFF160925FA63F', ipv4: '149.28.132.118', ipv6: '2401:c080:1400:10fa::1337:c0de', mobileIpv6: '...:1337:c0de', location: 'Singapore, Singapore 🇸🇬', country: 'Singapore', os: '😈 FreeBSD', asn: 'AS20473' },
            { kind: 'public', type: 'middle', region: 'asia-oceania', name: 'Busouge', emoji: '🌺', tooltip: "扶桑花 (Busouge) - Hibiscus: Malaysia's national flower, blooming across encrypted paths", host: 'my-relay.brokenbotnet.com', fingerprint: 'CA7E23C44E6D6F1D8A52A4E1F6CAA11F18108A02', ipv4: '124.217.248.240', ipv6: '2001:470:36:597::1337:c0de', mobileIpv6: '...:1337:c0de', location: 'Kuala Lumpur, Malaysia 🇲🇾', country: 'Malaysia', os: '🐧 Linux', asn: 'AS45839' },
            { kind: 'public', type: 'middle', region: 'asia-oceania', name: 'Houou', emoji: '🐦‍🔥', tooltip: "鳳凰 (Houou / Hōō) - Phoenix: Rising with each restart, carrying traffic through the archipelago's digital skies", host: 'id-relay.brokenbotnet.com', fingerprint: '7E87EC2F20A371E32E6672A6D04B55471BC5D369', ipv4: '157.10.253.140', ipv6: '2001:470:36:6d8::1337:c0de', mobileIpv6: '...:1337:c0de', location: 'Jakarta, Indonesia 🇮🇩', country: 'Indonesia', os: '🐧 Linux', asn: 'AS136052' },
            { kind: 'public', type: 'middle', region: 'asia-oceania', name: 'Hasu', emoji: '🪷', tooltip: "蓮 (Hasu) - Lotus: Vietnam's symbol of purity, rising clean through onion layers", host: 'vn-relay.brokenbotnet.com', fingerprint: '586AD06CB8BCE3625D6CC88772CDE4FE56477EE2', ipv4: '103.70.115.20', ipv6: '2001:470:19:2b9::1337:c0de', mobileIpv6: '...:1337:c0de', location: 'Hanoi, Vietnam 🇻🇳', country: 'Vietnam', os: '🐧 Linux', asn: 'AS151873' },
            { kind: 'public', type: 'middle', region: 'asia-oceania', name: 'Kyuuryuu', emoji: '🐉', tooltip: "九龍 (Kyuuryuu) - Nine Dragons: Kowloon's power guarding your circuit paths", host: 'hk-relay.brokenbotnet.com', fingerprint: 'D184F8140F3357F84E64BCF51094EA13B18FDD25', ipv4: '216.250.97.105', ipv6: '2406:ef80:1:14a7::1337:c0de', mobileIpv6: '...:1337:c0de', location: 'Hong Kong, China 🇭🇰', country: 'China', os: '🐧 Linux', asn: 'AS63473' },
            { kind: 'public', type: 'middle', region: 'asia-oceania', name: 'Hishoken', emoji: '🪃', tooltip: '飛翔剣 (Hishoken) - Flying Blade: Like a boomerang, your packets always find their way back', host: 'au-relay.brokenbotnet.com', fingerprint: '5F926760730D0229C2F2D16D0DE0E8A3C2682ED1', ipv4: '103.73.65.146', ipv6: '2406:ef80:3:9bc6::1337:c0de', mobileIpv6: '...:1337:c0de', location: 'Sydney, Australia 🇦🇺', country: 'Australia', os: '🚩 NetBSD', asn: 'AS63473' },
            { kind: 'public', type: 'middle', region: 'asia-oceania', name: 'Kuma', emoji: '🐻', tooltip: '熊 (Kuma) - Bear: Mighty and enduring, guarding circuits across the Russian wilds', host: 'ru-relay.brokenbotnet.com', fingerprint: '576E77EE584906041FF504592E5C51EE471707A2', ipv4: '195.133.23.252', ipv6: '2001:470:1f15:16b::1337:c0de', mobileIpv6: '...:1337:c0de', location: 'St.-Petersburg, Russia 🇷🇺', country: 'Russia', os: '🐧 Linux', asn: 'AS51659' },
            { kind: 'public', type: 'middle', region: 'asia-oceania', name: 'Okami', emoji: '🐺', tooltip: '狼 (Okami) - Wolf: The grey wolf (Bozkurt), guiding your traffic through Turkish relay paths', host: 'tr-relay.brokenbotnet.com', fingerprint: '38FF19F5014E110F196D4AEB81189B375EDA4530', ipv4: '45.141.148.185', ipv6: '2001:470:1f0b:c3::1337:c0de', mobileIpv6: '...:1337:c0de', location: 'Istanbul, Türkiye 🇹🇷', country: 'Türkiye', os: '🐉 DragonFlyBSD', asn: 'AS44382', layout: 'centred-relay' },
            { kind: 'public', type: 'middle', region: 'africa', name: 'Shishi', emoji: '🦁', tooltip: '獅子 (Shishi) - Lion: South African pride, roaring through the relay network', host: 'za-relay.brokenbotnet.com', fingerprint: 'A24D263E817AA29F4E1F210AC519EF590DB443CD', ipv4: '139.84.241.19', ipv6: '2a05:f480:3000:2fa6::1337:c0de', mobileIpv6: '...:1337:c0de', location: 'Johannesburg, South Africa 🇿🇦', country: 'South Africa', os: '☀️ SunOS', asn: 'AS20473', layout: 'centred-relay' },
            { kind: 'public', type: 'middle', region: 'north-america', name: 'Kaede', emoji: '🍁', tooltip: "楓 (Kaede) - Maple: Canada's emblem, steady through changing seasons", host: 'ca-relay.brokenbotnet.com', fingerprint: 'B05A4E4AEB2E5AD92CF882D57162F9EDAAA51815', ipv4: '38.49.219.113', ipv6: '2602:ffd5:767:3::1337:c0de', mobileIpv6: '...:1337:c0de', location: 'Montréal, Canada 🇨🇦', country: 'Canada', os: '🐧 Linux', asn: 'AS26832' },
            { kind: 'public', type: 'middle', region: 'north-america', name: 'Washi', emoji: '🦅', tooltip: '鷲 (Washi) - Eagle: Resolute flight across American relay paths', host: 'us-relay.brokenbotnet.com', fingerprint: '9F085BE2414BEAD86BF590800528A55A857F21C8', ipv4: '173.224.219.133', ipv6: '2604:6600:8:3::2df', mobileIpv6: '...:8:3::2df', location: 'Los Angeles, United States 🇺🇸', country: 'United States', os: '🐧 Linux', asn: 'AS40676' },
            { kind: 'public', type: 'middle', region: 'north-america', name: 'Saboten', emoji: '🌵', tooltip: "仙人掌 (Saboten) - Cactus: Standing firm through the network's desert paths", host: 'mx-relay.brokenbotnet.com', fingerprint: 'BE4BC9C6B08AA3124D1ABFA2B1DBE08755D8719B', ipv4: '64.177.80.2', ipv6: '2001:19f0:b400:118e::1337:c0de', mobileIpv6: '...:1337:c0de', location: 'Mexico City, Mexico 🇲🇽', country: 'Mexico', os: '😈 FreeBSD', asn: 'AS20473' },
            { kind: 'public', type: 'middle', region: 'north-america', name: 'Midori', emoji: '🌳', tooltip: "緑 (Midori) - Green: The dense Amazonian jungle, obscuring your digital footprint in endless foliage", host: 'br-relay.brokenbotnet.com', fingerprint: '01DBD999270E5F730AF584BAA89E8328E0F3947F', ipv4: '216.238.126.113', ipv6: '2001:19f0:b800:15bf::1337:c0de', mobileIpv6: '...:1337:c0de', location: 'São Paulo, Brazil 🇧🇷', country: 'Brazil', os: '🐉 DragonFlyBSD', asn: 'AS20473' }
        ];

        const relayRegions = [
            { id: 'asia-oceania', title: '🌏 Asia-Oceania' },
            { id: 'africa', title: '🌍 Africa' },
            { id: 'north-america', title: '🌎 North America' }
        ];

        const relayTypeBadges = {
            bridge: { iconName: 'git-branch', label: 'Hidden Bridge' },
            guard: { iconName: 'shield', label: 'Guard' },
            middle: { iconName: 'shuffle', label: 'Middle' },
            exit: { iconName: 'door-open', label: 'Exit' }
        };

        function refreshIcons() {
            if (window.lucide) {
                window.lucide.createIcons({
                    attrs: {
                        'aria-hidden': 'true'
                    }
                });
            }
        }

        function appendChildren(parent, children) {
            children.flat(Infinity).forEach(child => {
                if (child === null || child === undefined || child === false) return;
                parent.append(child instanceof Node ? child : document.createTextNode(String(child)));
            });
            return parent;
        }

        function createEl(tagName, options = {}, ...children) {
            const el = document.createElement(tagName);
            if (options.className) el.className = options.className;
            if (options.text !== undefined) el.textContent = String(options.text);
            if (options.title !== undefined) el.title = String(options.title);
            if (options.type) el.type = options.type;
            if (options.href) el.href = safeURL(options.href);
            if (options.target) el.target = options.target;
            if (options.rel) el.rel = options.rel;
            if (options.ariaLabel) el.setAttribute('aria-label', String(options.ariaLabel));
            if (options.dataTooltip) el.setAttribute('data-tooltip', String(options.dataTooltip));
            if (options.attrs) {
                Object.entries(options.attrs).forEach(([name, value]) => {
                    if (value !== null && value !== undefined) el.setAttribute(name, String(value));
                });
            }
            if (options.dataset) {
                Object.entries(options.dataset).forEach(([name, value]) => {
                    if (value !== null && value !== undefined) el.dataset[name] = String(value);
                });
            }
            return appendChildren(el, children);
        }

        function fragment(...children) {
            return appendChildren(document.createDocumentFragment(), children);
        }

        function safeClassToken(value = '') {
            return String(value).toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-|-$/g, '');
        }

        function safeIconName(value = '') {
            const iconName = String(value).toLowerCase().replace(/[^a-z0-9-]+/g, '');
            return iconName || 'circle';
        }

        function safeURL(value = '') {
            try {
                const url = new URL(String(value), window.location.href);
                if (url.protocol === 'https:' || url.protocol === 'mailto:' || url.origin === window.location.origin) {
                    return url.href;
                }
            } catch (err) {
                console.warn('Blocked unsafe URL', value, err);
            }
            return '#';
        }

        function safeSelectorValue(value = '') {
            return window.CSS?.escape ? CSS.escape(String(value)) : String(value).replace(/["\\]/g, '\\$&');
        }

        function iconNode(name, className = 'row-icon') {
            return createEl('span', { className },
                createEl('i', { attrs: { 'data-lucide': safeIconName(name) } })
            );
        }

        function setStatusPill(id, iconName, text) {
            const el = document.getElementById(id);
            if (!el) return;
            el.replaceChildren(iconNode(iconName, 'chip-icon'), document.createTextNode(String(text)));
            refreshIcons();
        }

        function escapeHTML(value = '') {
            return String(value)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        function copyButton(value, label) {
            return createEl('button', {
                className: 'copy-btn',
                type: 'button',
                title: `Copy ${label}`,
                ariaLabel: `Copy ${label}`,
                dataset: { copy: value }
            }, iconNode('copy', 'button-icon'));
        }

        function copyValue(value, label, display = value) {
            return createEl('span', { className: 'copy-value' },
                createEl('span', { className: 'copy-text', text: display }),
                copyButton(value, label)
            );
        }

        function stripLeadingEmoji(value = '') {
            return String(value).replace(/^[^\p{L}\p{N}]+/u, '').trim();
        }

        function platformName(os = '') {
            return stripLeadingEmoji(os) || 'Unknown';
        }

        function platformSlug(os = '') {
            return platformName(os).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'unknown';
        }

        function platformIcon(os = '') {
            const map = {
                Linux: 'terminal',
                FreeBSD: 'flame',
                OpenBSD: 'fish',
                NetBSD: 'flag',
                DragonFlyBSD: 'bug',
                SunOS: 'sun'
            };
            return map[platformName(os)] || 'server-cog';
        }

        function platformChip(os = '') {
            const name = platformName(os);
            return createEl('span', { className: `platform-chip platform-${safeClassToken(platformSlug(os))}` },
                iconNode(platformIcon(os), 'chip-icon'),
                createEl('span', { text: name })
            );
        }

        function asnChip(asn = '') {
            return createEl('span', { className: 'asn-chip' }, createEl('span', { text: asn || 'N/A' }));
        }

        function relayCopyLine(relay) {
            if (relay.kind === 'bridge') {
                return [`Shinobi${relay.name}`, relay.fingerprint, 'bridge', 'obfs4', stripLeadingEmoji(relay.distribution)].filter(Boolean).join(' ');
            }
            return [`Shinobi${relay.name}`, relay.fingerprint, relay.ipv4 || 'N/A', relay.ipv6 || 'N/A', relay.host || ''].filter(Boolean).join(' ');
        }

        function updateBridgeDistributionSummary(bridges) {
            const summary = document.getElementById('bridgeDistributionSummary');
            if (!summary) return;
            const counts = new Map();
            const distributionMeta = {
                Email: { icon: 'mail', className: 'email' },
                HTTPS: { icon: 'lock', className: 'https' },
                Telegram: { icon: 'send', className: 'telegram' },
                Settings: { icon: 'settings', className: 'settings' }
            };
            bridges.forEach(bridge => {
                const method = stripLeadingEmoji(bridge.distribution);
                if (!method) return;
                counts.set(method, (counts.get(method) || 0) + 1);
            });

            const preferredOrder = ['Email', 'HTTPS', 'Telegram', 'Settings'];
            const orderedMethods = [
                ...preferredOrder.filter(method => counts.has(method)),
                ...Array.from(counts.keys()).filter(method => !preferredOrder.includes(method)).sort()
            ];
            const chips = orderedMethods.map(method => {
                const meta = distributionMeta[method] || { icon: 'circle', className: 'other' };
                return createEl('span', { className: `distribution-chip ${safeClassToken(meta.className)}`, title: `${method} distribution` },
                    iconNode(meta.icon, 'chip-icon'),
                    createEl('span', { text: method }),
                    createEl('span', { className: 'distribution-count', text: counts.get(method) })
                );
            });
            summary.replaceChildren(...chips);
            refreshIcons();
        }

        function parseOnionooTime(value) {
            if (!value) return null;
            const normalized = String(value).trim().replace(' ', 'T');
            const withTimezone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(normalized) ? normalized : `${normalized}Z`;
            const date = new Date(withTimezone);
            return Number.isNaN(date.getTime()) ? null : date;
        }

        function relativeTimeFrom(value) {
            const date = parseOnionooTime(value);
            if (!date) return null;
            const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
            const units = [
                ['year', 31536000],
                ['month', 2592000],
                ['day', 86400],
                ['hour', 3600],
                ['minute', 60]
            ];
            for (const [unit, size] of units) {
                const amount = Math.floor(seconds / size);
                if (amount >= 1) return `${amount} ${unit}${amount === 1 ? '' : 's'} ago`;
            }
            return 'just now';
        }

        function lastSeenTitle(relay) {
            const relative = relativeTimeFrom(relay?.last_seen);
            return relative ? `Last seen: ${relative}` : 'Last seen unavailable from Onionoo.';
        }

        function exactOnionooDate(value) {
            const date = parseOnionooTime(value);
            if (!date) return null;
            return date.toLocaleString([], {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).replace(/\s?(am|pm)$/i, match => match.toUpperCase());
        }

        function firstSeenStatusChip(label, title, className = 'age-pending', iconName = 'hourglass') {
            return createEl('span', { className: `stat-chip age-chip ${safeClassToken(className)}`, title },
                iconNode(iconName, 'chip-icon'),
                document.createTextNode(label)
            );
        }

        function firstSeenChip(relay) {
            const relative = relativeTimeFrom(relay?.first_seen);
            if (!relative) return firstSeenStatusChip('Awaiting first_seen', 'Onionoo returned this relay, but first_seen is not available yet.', 'age-pending', 'hourglass');
            const exact = exactOnionooDate(relay.first_seen);
            const title = exact ? `First seen by Onionoo: ${exact}` : 'First seen by Onionoo.';
            return createEl('span', { className: 'stat-chip age-chip', title },
                iconNode('calendar-clock', 'chip-icon'),
                document.createTextNode(`First seen ${relative}`)
            );
        }

        function setAgeState(card, chip) {
            const ageContainer = card?.querySelector('[data-age]');
            if (ageContainer) ageContainer.replaceChildren(...(chip ? [chip] : []));
        }

        function metricsUrl(relay) {
            if (relay.kind === 'bridge') return `https://metrics.torproject.org/rs.html#details/${relay.fingerprint}`;
            return `https://metrics.1aeo.com/relay/${relay.fingerprint}/`;
        }

        function relayNameHTML(relay) {
            return fragment(
                'Shinobi',
                createEl('span', { dataTooltip: relay.tooltip },
                    createEl('span', { className: 'tooltip-underline', text: relay.name }),
                    ` ${relay.emoji}`
                )
            );
        }

        function relayDetailTile({ iconName, label, value, className = 'neutral', href = '' }) {
            const content = [
                iconNode(iconName, 'detail-icon'),
                createEl('span', { className: 'detail-copy' },
                    createEl('span', { className: 'detail-label', text: label }),
                    createEl('span', { className: 'detail-value' }, value)
                )
            ];
            if (href) {
                return createEl('a', { className: `relay-detail-tile ${safeClassToken(className)}`, href, target: '_blank', rel: 'noopener noreferrer' }, content);
            }
            return createEl('div', { className: `relay-detail-tile ${safeClassToken(className)}` }, content);
        }

        function relayDetailGrid(relay) {
            return createEl('div', { className: 'relay-detail-grid' },
                relayDetailTile({ iconName: 'radio-tower', label: 'IPv4', value: copyValue(relay.ipv4 || 'N/A', 'IPv4 address'), className: 'ipv4' }),
                relayDetailTile({
                    iconName: 'satellite',
                    label: 'IPv6',
                    value: fragment(
                        createEl('span', { className: 'desktop-ip' }, copyValue(relay.ipv6 || 'N/A', 'IPv6 address')),
                        createEl('span', { className: 'mobile-ip' }, copyValue(relay.ipv6 || 'N/A', 'IPv6 address', relay.mobileIpv6 || relay.ipv6 || 'N/A'))
                    ),
                    className: 'ipv6'
                }),
                relayDetailTile({ iconName: 'map-pin', label: 'Location', value: relay.location, className: 'location' }),
                relayDetailTile({ iconName: 'server-cog', label: 'Platform', value: platformChip(relay.os), className: 'platform' }),
                relayDetailTile({ iconName: 'network', label: 'ASN', value: asnChip(relay.asn), className: 'asn' }),
                relayDetailTile({ iconName: 'bar-chart-3', label: 'Metrics', value: 'View →', className: 'metrics', href: metricsUrl(relay) })
            );
        }

        function bridgeCapabilityTile({ iconName, label, value, className = 'identity', href = '' }) {
            const content = [
                iconNode(iconName, 'capability-icon'),
                createEl('span', { className: 'capability-copy' },
                    createEl('span', { className: 'capability-label', text: label }),
                    createEl('span', { className: 'capability-value', text: value })
                )
            ];
            if (href) {
                return createEl('a', { className: `bridge-capability-tile ${safeClassToken(className)}`, href, target: '_blank', rel: 'noopener noreferrer' }, content);
            }
            return createEl('div', { className: `bridge-capability-tile ${safeClassToken(className)}` }, content);
        }

        function bridgeCapabilityGrid(relay) {
            return createEl('div', { className: 'bridge-capability-grid' },
                bridgeCapabilityTile({ iconName: 'fingerprint', label: 'Fingerprint', value: 'Hashed', className: 'identity' }),
                bridgeCapabilityTile({ iconName: 'target', label: 'Purpose', value: 'Stealth Entry', className: 'purpose' }),
                bridgeCapabilityTile({ iconName: 'satellite', label: 'IPv6', value: 'Enabled', className: 'enabled' }),
                bridgeCapabilityTile({ iconName: 'send', label: 'Distribution', value: stripLeadingEmoji(relay.distribution), className: 'distribution' }),
                bridgeCapabilityTile({ iconName: 'shield', label: 'Transport', value: 'Obfs4', className: 'transport' }),
                bridgeCapabilityTile({ iconName: 'activity', label: 'Status', value: 'Check →', className: 'status', href: metricsUrl(relay) })
            );
        }

        function regionSummary(regionRelays) {
            const countries = new Set(regionRelays.map(relay => relay.country).filter(Boolean)).size;
            const platforms = new Set(regionRelays.map(relay => platformName(relay.os)).filter(Boolean)).size;
            const asns = new Set(regionRelays.map(relay => relay.asn).filter(Boolean)).size;
            return [
                { iconName: 'map', label: `${countries} countr${countries === 1 ? 'y' : 'ies'}` },
                { iconName: 'cpu', label: `${platforms} platform${platforms === 1 ? '' : 's'}` },
                { iconName: 'network', label: `${asns} ASN${asns === 1 ? '' : 's'}` }
            ].map(item => createEl('span', { className: 'region-summary-chip' }, iconNode(item.iconName, 'chip-icon'), item.label));
        }

        function renderRelayCard(relay) {
            const cardClasses = ['relay-card', relay.type, relay.layout].filter(Boolean).map(safeClassToken).join(' ');
            const relayIndex = relays.indexOf(relay);
            const card = createEl('div', {
                className: cardClasses,
                title: undefined,
                dataset: {
                    fp: relay.fingerprint,
                    relayName: relay.name,
                    country: relay.country || '',
                    location: relay.location || '',
                    asn: relay.asn || '',
                    relayType: relay.type || '',
                    region: relay.region || '',
                    relayIndex
                }
            });
            if (relay.comingSoon) card.dataset.comingSoon = 'true';

            const titleSection = createEl('div', { className: 'relay-title-section' },
                createEl('div', { className: 'relay-name' }, relayNameHTML(relay))
            );
            if (relay.host) {
                titleSection.appendChild(createEl('div', { className: 'relay-sub' },
                    createEl('span', { className: 'host-pill' },
                        iconNode('badge-info', 'host-icon'),
                        createEl('span', { className: 'host-text', text: relay.host })
                    )
                ));
            }

            const badgeMeta = relayTypeBadges[relay.type] || relayTypeBadges.middle;
            const actions = createEl('div', { className: 'relay-actions' },
                createEl('div', { className: 'relay-badges' },
                    createEl('span', { className: `relay-badge ${safeClassToken(relay.type)}` }, iconNode(badgeMeta.iconName, 'chip-icon'), badgeMeta.label)
                ),
                createEl('button', {
                    className: 'relay-copy-line',
                    type: 'button',
                    title: 'Copy relay line',
                    ariaLabel: 'Copy relay line',
                    dataset: { copy: relayCopyLine(relay) }
                }, iconNode('copy', 'button-icon'))
            );

            const detail = relay.kind === 'bridge'
                ? bridgeCapabilityGrid(relay)
                : relayDetailGrid(relay);
            card.replaceChildren(
                createEl('div', { className: 'relay-header' }, titleSection, actions),
                createEl('div', { className: 'relay-flags', attrs: { 'data-flags': '' } }),
                createEl('div', { className: 'fingerprint', title: relay.fingerprint },
                    createEl('span', { className: 'fingerprint-value', text: relay.fingerprint }),
                    copyButton(relay.fingerprint, 'fingerprint')
                ),
                createEl('div', { className: 'relay-age-slot', attrs: { 'data-age': '' } }),
                detail
            );
            return card;
        }

        function renderRelayCards() {
            const bridgeGrid = document.getElementById('bridgeGrid');
            if (bridgeGrid) {
                bridgeGrid.replaceChildren(...relays.filter(relay => relay.kind === 'bridge').map(renderRelayCard));
            }

            const regionContainer = document.getElementById('relayRegionContainer');
            if (regionContainer) {
                const sections = relayRegions.map(region => {
                    const regionRelays = relays.filter(relay => relay.kind === 'public' && relay.region === region.id);
                    const section = createEl('div', { className: `region-section region-${safeClassToken(region.id)}` });
                    section.replaceChildren(
                        createEl('div', { className: 'region-header' },
                            createEl('div', { className: 'region-heading' },
                                createEl('span', { className: 'region-title', text: region.title }),
                                createEl('span', { className: 'region-count', text: regionRelays.length })
                            ),
                            createEl('div', { className: 'region-summary' },
                                createEl('span', { className: 'region-health', dataset: { regionHealth: region.id } }),
                                regionSummary(regionRelays)
                            )
                        ),
                        createEl('div', { className: 'relay-grid' }, regionRelays.map(renderRelayCard))
                    );
                    return section;
                });
                regionContainer.replaceChildren(...sections);
            }
        }

        function syncDerivedCounts() {
            const activeRelays = relays.filter(relay => !relay.comingSoon);
            const bridges = activeRelays.filter(relay => relay.kind === 'bridge');
            const publicRelays = activeRelays.filter(relay => relay.kind === 'public');
            const ipv6Count = activeRelays.filter(relay => relay.kind === 'bridge' || relay.ipv6).length;
            const countryCount = new Set(publicRelays.map(relay => relay.country).filter(Boolean)).size;
            const platformCount = new Set(publicRelays.map(relay => stripLeadingEmoji(relay.os)).filter(Boolean)).size;
            const asnCount = new Set(publicRelays.map(relay => relay.asn).filter(Boolean)).size;
            const typeCount = new Set(activeRelays.map(relay => relay.kind === 'bridge' ? 'bridge' : relay.type)).size;
            const exitCount = publicRelays.filter(relay => relay.type === 'exit').length;

            const setCount = (id, value, text = value) => {
                const el = document.getElementById(id);
                if (!el) return;
                el.dataset.count = value;
                if (!el.classList.contains('counted')) el.textContent = text;
            };

            setCount('totalRelayStat', String(activeRelays.length), '0');
            setCount('countryStat', String(countryCount), '0');
            setCount('relayTypeStat', String(typeCount), '0');
            setCount('ipv6Stat', `${ipv6Count}/${activeRelays.length}`, `0/${activeRelays.length}`);
            setCount('platformStat', String(platformCount), '0');
            setCount('asnStat', String(asnCount), '0');
            updateBridgeDistributionSummary(bridges);

            const bridgeSectionCount = document.getElementById('bridgeSectionCount');
            if (bridgeSectionCount) bridgeSectionCount.textContent = bridges.length;
            const publicRelaySectionCount = document.getElementById('publicRelaySectionCount');
            if (publicRelaySectionCount) publicRelaySectionCount.textContent = publicRelays.length;
            const bridgeEl = document.getElementById('bridgeCount');
            if (bridgeEl) setStatusPill('bridgeCount', 'git-branch', `${bridges.length} Bridges`);
            const exitEl = document.getElementById('exitCount');
            if (exitEl) setStatusPill('exitCount', 'door-open', `${exitCount} Exit${exitCount !== 1 ? 's' : ''}`);

            updateTopologyCounts({
                bridges: bridges.length,
                guards: 0,
                middles: publicRelays.length - exitCount,
                exits: exitCount
            });
        }

        function updateTopologyCounts({ bridges, guards, middles, exits }) {
            const bridgeLabel = document.getElementById('topologyBridgeLabel');
            const guardLabel = document.getElementById('topologyGuardLabel');
            const middleLabel = document.getElementById('topologyMiddleLabel');
            const exitLabel = document.getElementById('topologyExitLabel');

            if (bridgeLabel) bridgeLabel.textContent = `Bridge Entry · ${bridges}`;
            if (guardLabel) guardLabel.textContent = guards > 0 ? `Guard Entry · ${guards}` : 'Guard Entry';
            if (middleLabel) middleLabel.textContent = `Middle Layer · ${middles}`;
            if (exitLabel) exitLabel.textContent = `Exit · ${exits}`;
        }
        function scrollToSection(id) {
            const element = id === 'header' ? document.querySelector('header') : document.getElementById(id);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }

        function updateActiveNav() {
            const sections = ['header', 'network-flow', 'bridges', 'relays', 'contact', 'glossary', 'faq', 'aio-stack'];
            const navItems = document.querySelectorAll('.scroll-nav-item');
            let currentSection = 0;
            const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 100);

            if (isAtBottom) {
                currentSection = sections.length - 1;
            } else {
                const scrollPosition = window.scrollY + 250;
                sections.forEach((id, index) => {
                    const element = id === 'header' ? document.querySelector('header') : document.getElementById(id);
                    if (element && element.offsetTop <= scrollPosition) {
                        currentSection = index;
                    }
                });
            }

            navItems.forEach((item, index) => {
                item.classList.toggle('active', index === currentSection);
            });
        }

        function flagIcon(flag) {
            const map = {
                Guard: 'shield',
                Exit: 'door-open',
                Fast: 'zap',
                Stable: 'target',
                Running: 'circle-check',
                Valid: 'badge-check',
                HSDir: 'folder',
                V2Dir: 'clipboard-list',
                StaleDesc: 'clock-alert'
            };
            return iconNode(map[flag] || 'flag', 'chip-icon');
        }

        function flagClass(flag) {
            return `flag-${String(flag).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        }

        function applyRelayBadges(card, flags) {
            if (!card || card.classList.contains('bridge')) return;
            const header = card.querySelector('.relay-header');
            if (!header) return;

            let badgeWrap = header.querySelector('.relay-badges');
            if (!badgeWrap) {
                badgeWrap = document.createElement('div');
                badgeWrap.className = 'relay-badges';
                header.appendChild(badgeWrap);
            }

            const hasExit = flags.includes('Exit');
            const hasGuard = flags.includes('Guard');
            const badges = [];
            if (hasExit) badges.push({
                iconName: 'door-open',
                label: 'Exit',
                className: 'exit'
            });
            if (hasGuard) badges.push({
                iconName: 'shield',
                label: 'Guard',
                className: 'guard'
            });
            if (badges.length === 0) badges.push({
                iconName: 'shuffle',
                label: 'Middle',
                className: 'middle'
            });

            badgeWrap.replaceChildren(...badges.map(({ iconName, label, className }) =>
                createEl('span', { className: `relay-badge ${safeClassToken(className)}` }, iconNode(iconName, 'chip-icon'), label)
            ));

            card.classList.remove('guard', 'exit', 'middle', 'offline', 'live-guard', 'live-exit', 'live-middle', 'is-muted');
            if (hasExit) card.classList.add('exit', 'live-exit');
            if (hasGuard) card.classList.add('guard', 'live-guard');
            if (!hasExit && !hasGuard) card.classList.add('middle', 'live-middle');
        }

        function flagChip(flag) {
            return createEl('span', { className: `stat-chip flag-chip ${flagClass(flag)}` },
                flagIcon(flag),
                document.createTextNode(` ${String(flag)}`)
            );
        }

        function statusChip(text, className = '', title = '') {
            return createEl('span', { className: `stat-chip flag-chip ${safeClassToken(className)}`.trim(), title }, text);
        }

        function setFlagStatus(container, text, className = '', title = '') {
            if (container) container.replaceChildren(statusChip(text, className, title));
        }

        function loadingSkeleton(sizeClass = 'md') {
            return createEl('span', { className: `loading-skeleton skeleton-${safeClassToken(sizeClass)}` });
        }

        function renderRelayFlags(relay, updatedSet) {
            const fp = relay.fingerprint || relay.hashed_fingerprint;
            if (!fp) return;
            const card = document.querySelector(`[data-fp="${safeSelectorValue(fp)}"]`);
            if (!card) return;
            const container = card.querySelector('[data-flags]');
            if (!container) return;
            updatedSet.add(fp);
            card.classList.remove('lookup-pending', 'offline', 'running', 'is-muted');
            const flags = Array.isArray(relay.flags) ? relay.flags.map(flag => String(flag)) : [];
            const isRunning = relay.running === true;
            const lastSeen = lastSeenTitle(relay);
            setAgeState(card, firstSeenChip(relay));
            if (isRunning) card.classList.add('running');
            if (flags.length === 0 && !isRunning) {
                container.replaceChildren(statusChip('🔴 Temporarily offline', 'offline-chip', lastSeen));
                applyRelayBadges(card, flags);
                card.classList.add('offline', 'is-muted');
                refreshIcons();
                return;
            }
            const displayFlags = flags.filter(flag => isRunning || flag !== 'Running');
            if (isRunning && !displayFlags.includes('Running')) displayFlags.unshift('Running');
            const chips = [];
            if (!isRunning) chips.push(statusChip('🔴 Temporarily offline', 'offline-chip', lastSeen));
            chips.push(...displayFlags.map(flagChip));
            container.replaceChildren(...chips);
            applyRelayBadges(card, flags);
            if (!isRunning) {
                card.classList.add('offline', 'is-muted');
            }
            refreshIcons();
        }

        function formatBandwidth(bytes) {
            if (bytes >= 1e9) return (bytes / 1e9).toFixed(2) + ' GB/s';
            if (bytes >= 1e6) return (bytes / 1e6).toFixed(2) + ' MB/s';
            if (bytes >= 1e3) return (bytes / 1e3).toFixed(2) + ' KB/s';
            return bytes + ' B/s';
        }

        function updateNetworkHealth(onlineCount, totalCount, pendingCount = 0) {
            const healthEl = document.getElementById('networkHealth');
            if (!healthEl) return;
            const checkedCount = Math.max(totalCount - pendingCount, 0);
            const ratio = checkedCount > 0 ? onlineCount / checkedCount : 0;
            let status, dotClass;
            if (ratio >= 0.9) {
                status = 'Healthy';
                dotClass = 'healthy';
            } else if (ratio >= 0.7) {
                status = 'Degraded';
                dotClass = 'degraded';
            } else {
                status = 'Critical';
                dotClass = 'critical';
            }
            const pendingLabel = pendingCount > 0 ? `, ${pendingCount} pending` : '';
            healthEl.replaceChildren(
                createEl('span', { className: `health-dot ${safeClassToken(dotClass)}` }),
                document.createTextNode(` ${status} (${onlineCount}/${checkedCount}${pendingLabel})`)
            );
            const offlineCount = Math.max(checkedCount - onlineCount, 0);
            healthEl.title = `Running ${onlineCount} · Offline ${offlineCount} · Pending ${pendingCount}. Checked relays are relays returned by Onionoo in this lookup.`;
            healthEl.classList.add('fade-in');
            setTimeout(() => healthEl.classList.remove('fade-in'), 600);
        }

        function regionHealthChip(className, text) {
            return createEl('span', { className: `region-health-chip ${safeClassToken(className)}`, text });
        }

        function updateRegionHealth(state = 'live') {
            document.querySelectorAll('[data-region-health]').forEach(node => {
                const regionId = node.dataset.regionHealth;
                const cards = Array.from(document.querySelectorAll(`#relays .relay-card[data-region="${safeSelectorValue(regionId)}"]:not([data-coming-soon="true"])`));
                if (cards.length === 0) {
                    node.replaceChildren();
                    return;
                }
                if (state === 'loading') {
                    node.replaceChildren(regionHealthChip('loading', 'Checking live'));
                    return;
                }
                if (state === 'unavailable') {
                    node.replaceChildren(regionHealthChip('pending', 'Live unavailable'));
                    return;
                }

                const running = cards.filter(card => card.classList.contains('running')).length;
                const pending = cards.filter(card => card.classList.contains('lookup-pending')).length;
                const offline = cards.filter(card => card.classList.contains('offline')).length;
                if (running + pending + offline === 0) {
                    node.replaceChildren(regionHealthChip('loading', 'Checking live'));
                    return;
                }

                const chips = [regionHealthChip('running', `Running ${running}`)];
                if (offline > 0) chips.push(regionHealthChip('offline', `Offline ${offline}`));
                if (pending > 0) chips.push(regionHealthChip('pending', `Pending ${pending}`));
                node.replaceChildren(...chips);
            });
        }

        async function fetchRelayFlags() {
            const relayCards = Array.from(document.querySelectorAll('[data-fp]'));
            const activeRelayCards = relayCards.filter(card => card.dataset.comingSoon !== 'true');
            const fingerprints = activeRelayCards.map(el => el.getAttribute('data-fp')?.trim()).filter(Boolean);
            const totalRelayCount = activeRelayCards.length;
            if (fingerprints.length === 0) return;

            const refreshBtn = document.getElementById('refreshBtn');
            if (refreshBtn) {
                refreshBtn.disabled = true;
                refreshBtn.classList.add('spinning');
            }

            const healthEl = document.getElementById('networkHealth');
            const bwEl = document.getElementById('totalBandwidth');
            const timeEl = document.getElementById('lastUpdated');
            const guardEl = document.getElementById('guardCount');
            const middleEl = document.getElementById('middleCount');
            const bridgeEl = document.getElementById('bridgeCount');
            const exitEl = document.getElementById('exitCount');

            if (healthEl) healthEl.replaceChildren(loadingSkeleton('lg'));
            if (bwEl) bwEl.replaceChildren(loadingSkeleton('md'));
            if (timeEl) timeEl.replaceChildren(loadingSkeleton('sm'));
            if (bridgeEl) bridgeEl.replaceChildren(loadingSkeleton('chip'));
            if (guardEl) guardEl.replaceChildren(loadingSkeleton('chip'));
            if (middleEl) middleEl.replaceChildren(loadingSkeleton('chip'));
            if (exitEl) exitEl.replaceChildren(loadingSkeleton('chip'));

            document.querySelectorAll('[data-flags]').forEach(node => {
                setAgeState(node.closest('.relay-card'), firstSeenStatusChip('First seen loading', 'Fetching first_seen from Onionoo.', 'age-loading', 'loader'));
                if (node.closest('[data-coming-soon="true"]')) {
                    setAgeState(node.closest('.relay-card'), '');
                    setFlagStatus(node, 'Coming soon');
                    return;
                }
                node.closest('.relay-card')?.classList.remove('lookup-pending');
                node.closest('.relay-card')?.classList.remove('offline', 'running', 'is-muted');
                setFlagStatus(node, 'Loading flags...');
            });
            updateRegionHealth('loading');
            const url = `https://onionoo.torproject.org/details?lookup=${fingerprints.map(fingerprint => encodeURIComponent(fingerprint)).join(',')}`;
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error('Onionoo request failed');
                const data = await res.json();
                const updated = new Set();
                let totalBandwidth = 0;
                let onlineCount = 0;
                let guardCount = 0;
                let middleCount = 0;
                let liveExitCount = 0;
                let pendingLookupCount = 0;
                const allRelays = [...(data.relays || []), ...(data.bridges || [])];
                allRelays.forEach(relay => {
                    renderRelayFlags(relay, updated);
                    const advertisedBandwidth = Number(relay.advertised_bandwidth);
                    if (Number.isFinite(advertisedBandwidth) && advertisedBandwidth > 0) {
                        totalBandwidth += advertisedBandwidth;
                    }
                    if (relay.running) onlineCount++;
                });
                document.querySelectorAll('[data-fp]').forEach(card => {
                    if (card.dataset.comingSoon === 'true') {
                        const container = card.querySelector('[data-flags]');
                        setFlagStatus(container, 'Coming soon');
                        setAgeState(card, '');
                        card.classList.remove('lookup-pending', 'offline', 'running');
                        card.classList.add('is-muted');
                        return;
                    }
                    const fp = card.getAttribute('data-fp')?.trim();
                    if (!fp) {
                        const container = card.querySelector('[data-flags]');
                        setFlagStatus(container, 'Pending fingerprint', 'pending-chip');
                        setAgeState(card, firstSeenStatusChip('Awaiting Onionoo', 'This card is missing a fingerprint, so first_seen cannot be queried yet.', 'age-pending', 'hourglass'));
                        card.classList.remove('offline', 'running');
                        card.classList.add('lookup-pending');
                        card.classList.add('is-muted');
                        return;
                    }
                    if (updated.has(fp)) return;
                    const container = card.querySelector('[data-flags]');
                    if (!container) return;
                    setFlagStatus(container, 'Lookup pending', 'pending-chip', 'Configured here but not returned by Onionoo yet. Last seen unavailable from Onionoo.');
                    setAgeState(card, firstSeenStatusChip('Awaiting Onionoo', 'Onionoo has not returned this relay yet, so first_seen is pending.', 'age-pending', 'hourglass'));
                    card.classList.remove('offline', 'running');
                    card.classList.add('lookup-pending');
                    card.classList.add('is-muted');
                    pendingLookupCount++;
                });
                updateRegionHealth();
                const publicRelayCards = Array.from(document.querySelectorAll('#relays .relay-card')).filter(card => card.dataset.comingSoon !== 'true');
                guardCount = publicRelayCards.filter(card => card.classList.contains('guard')).length;
                middleCount = publicRelayCards.filter(card => card.classList.contains('middle')).length;
                liveExitCount = publicRelayCards.filter(card => card.classList.contains('exit')).length;
                const liveBridgeCount = document.querySelectorAll('#bridges .relay-card:not([data-coming-soon="true"])').length;
                updateTopologyCounts({
                    bridges: liveBridgeCount,
                    guards: guardCount,
                    middles: middleCount,
                    exits: liveExitCount
                });
                const bwEl = document.getElementById('totalBandwidth');
                if (bwEl) {
                    bwEl.textContent = formatBandwidth(totalBandwidth);
                    bwEl.classList.add('fade-in');
                    setTimeout(() => bwEl.classList.remove('fade-in'), 600);
                }
                const timeEl = document.getElementById('lastUpdated');
                if (timeEl) {
                    const now = new Date();
                    const localTime = now.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    }).replace(/\s?(am|pm)$/i, match => match.toUpperCase());
                    timeEl.textContent = `Live data updated ${localTime}`;
                    const localStamp = now.toLocaleString([], {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true
                    }).replace(/\s?(am|pm)$/i, match => match.toUpperCase());
                    timeEl.title = `Latest successful Onionoo lookup by this page: ${localStamp}.`;
                    timeEl.classList.add('fade-in');
                    setTimeout(() => timeEl.classList.remove('fade-in'), 600);
                }
                updateNetworkHealth(onlineCount, totalRelayCount, pendingLookupCount);
                const guardEl = document.getElementById('guardCount');
                const middleEl = document.getElementById('middleCount');
                if (guardEl) {
                    setStatusPill('guardCount', 'shield', `${guardCount} Guard${guardCount !== 1 ? 's' : ''}`);
                    guardEl.classList.add('fade-in');
                    setTimeout(() => guardEl.classList.remove('fade-in'), 600);
                }
                if (middleEl) {
                    setStatusPill('middleCount', 'shuffle', `${middleCount} Middle${middleCount !== 1 ? 's' : ''}`);
                    middleEl.classList.add('fade-in');
                    setTimeout(() => middleEl.classList.remove('fade-in'), 600);
                }
                const bridgeEl = document.getElementById('bridgeCount');
                const exitEl = document.getElementById('exitCount');
                if (bridgeEl) {
                    setStatusPill('bridgeCount', 'git-branch', '8 Bridges');
                    bridgeEl.classList.add('fade-in');
                    setTimeout(() => bridgeEl.classList.remove('fade-in'), 600);
                }
                if (exitEl) {
                    setStatusPill('exitCount', 'door-open', `${liveExitCount} Exit${liveExitCount !== 1 ? 's' : ''}`);
                    exitEl.classList.add('fade-in');
                    setTimeout(() => exitEl.classList.remove('fade-in'), 600);
                }
                window.applyRelayFilters?.();
                if (refreshBtn) {
                    refreshBtn.disabled = false;
                    refreshBtn.classList.remove('spinning');
                }
            } catch (err) {
                console.warn('Failed to fetch Onionoo flags', err);
                document.querySelectorAll('[data-flags]').forEach(node => {
                    setAgeState(node.closest('.relay-card'), firstSeenStatusChip('First seen unavailable', 'Onionoo lookup failed, so first_seen could not be refreshed.', 'age-unavailable', 'circle-alert'));
                    if (node.closest('[data-coming-soon="true"]')) {
                        setAgeState(node.closest('.relay-card'), '');
                        setFlagStatus(node, 'Coming soon');
                        return;
                    }
                    setFlagStatus(node, 'Flag lookup unavailable');
                });
                updateRegionHealth('unavailable');
                const bwEl = document.getElementById('totalBandwidth');
                if (bwEl) bwEl.textContent = 'Unavailable';
                const timeEl = document.getElementById('lastUpdated');
                if (timeEl) timeEl.textContent = 'Failed';
                const guardEl = document.getElementById('guardCount');
                const middleEl = document.getElementById('middleCount');
                const bridgeEl = document.getElementById('bridgeCount');
                const exitEl = document.getElementById('exitCount');
                if (guardEl) setStatusPill('guardCount', 'shield', '-- Guards');
                if (middleEl) setStatusPill('middleCount', 'shuffle', '-- Middles');
                if (bridgeEl) setStatusPill('bridgeCount', 'git-branch', '8 Bridges');
                if (exitEl) setStatusPill('exitCount', 'door-open', '1 Exit');
                if (refreshBtn) {
                    refreshBtn.disabled = false;
                    refreshBtn.classList.remove('spinning');
                }
            }
        }
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateActiveNav, 50);
            const scrollBtn = document.getElementById('scrollToTop');
            const scrollPosition = window.scrollY + window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;
            const bottomThreshold = pageHeight - 500;
            if (scrollPosition >= bottomThreshold) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        document.getElementById('scrollToTop').addEventListener('click', () => {
            const scrollBtn = document.getElementById('scrollToTop');
            scrollBtn.classList.add('rocket-launch');
            setTimeout(() => {
                scrollBtn.classList.remove('rocket-launch');
            }, 800);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        document.addEventListener('DOMContentLoaded', () => {
            renderRelayCards();
            syncDerivedCounts();
            updateRegionHealth('loading');
            refreshIcons();
            updateActiveNav();
            fetchRelayFlags();

            document.querySelectorAll('a[target="_blank"]').forEach(link => {
                link.setAttribute('rel', 'noopener noreferrer');
            });

            document.querySelectorAll('.scroll-nav-item[data-section]').forEach(item => {
                item.addEventListener('click', () => {
                    scrollToSection(item.dataset.section || 'header');
                });
            });

            document.querySelectorAll('.faq-question').forEach(button => {
                button.addEventListener('click', () => {
                    const currentItem = button.closest('.faq-item');
                    document.querySelectorAll('.faq-item.active').forEach(item => {
                        if (item !== currentItem) item.classList.remove('active');
                    });
                    currentItem?.classList.toggle('active');
                });
            });

            document.addEventListener('click', async (event) => {
                const button = event.target.closest('[data-copy]');
                if (!button) return;
                const value = button.dataset.copy || '';
                if (!value) return;

                try {
                    await navigator.clipboard.writeText(value);
                    button.classList.add('copied');
                    button.replaceChildren(iconNode('check', 'button-icon'));
                    refreshIcons();
                    setTimeout(() => {
                        button.classList.remove('copied');
                        button.replaceChildren(iconNode('copy', 'button-icon'));
                        refreshIcons();
                    }, 1200);
                } catch (err) {
                    console.warn('Clipboard copy failed', err);
                }
            });

            if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 768) {
                document.querySelectorAll('[data-tooltip]').forEach(el => {
                    el.addEventListener('click', (e) => {
                        const wasActive = el.classList.contains('tooltip-active');

                        document.querySelectorAll('[data-tooltip].tooltip-active').forEach(t => {
                            if (t !== el) {
                                t.classList.remove('tooltip-active');
                            }
                        });

                        if (!wasActive) {
                            e.preventDefault();
                            e.stopPropagation();
                            el.classList.add('tooltip-active');

                            el.classList.toggle('p-tooltip', Boolean(el.closest('p') || el.classList.contains('title-tooltip')));
                        } else {
                            el.classList.remove('tooltip-active');
                            el.classList.remove('p-tooltip');
                            el.classList.remove('tooltip-above');
                        }
                    }, {
                        passive: false
                    });
                });

                document.addEventListener('click', (e) => {
                    if (!e.target.closest('[data-tooltip]')) {
                        document.querySelectorAll('[data-tooltip].tooltip-active').forEach(t => {
                            t.classList.remove('tooltip-active');
                        });
                    }
                });

                document.addEventListener('touchstart', (e) => {
                    const activeTooltip = document.querySelector('[data-tooltip].tooltip-active');
                    if (activeTooltip && !e.target.closest('[data-tooltip]')) {
                        document.querySelectorAll('[data-tooltip].tooltip-active').forEach(t => {
                            t.classList.remove('tooltip-active');
                        });
                    }
                });
            }

            const refreshBtn = document.getElementById('refreshBtn');
            if (refreshBtn) {
                refreshBtn.addEventListener('click', async () => {
                    await fetchRelayFlags();
                    document.querySelectorAll('.stat-value[data-count]').forEach(stat => {
                        stat.classList.remove('counted');
                        animateCounter(stat);
                    });
                });
            }

            const searchInput = document.getElementById('relaySearch');
            const searchWrapper = document.getElementById('searchWrapper');
            const searchClear = document.getElementById('searchClear');
            const filterChips = document.querySelectorAll('[data-filter]');
            const sortChips = document.querySelectorAll('[data-sort]');
            let activeFilter = 'all';
            let activeSort = 'region';

            function updateSearchWrapper() {
                if (searchWrapper) {
                    if (searchInput && searchInput.value.length > 0) {
                        searchWrapper.classList.add('has-value');
                    } else {
                        searchWrapper.classList.remove('has-value');
                    }
                }
            }

            function filterRelays() {
                updateSearchWrapper();
                const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
                const relayCards = document.querySelectorAll('#relays .relay-card');
                const regionContainer = document.getElementById('relayRegionContainer');
                const searchFeedback = document.getElementById('searchFeedback');
                let visibleCount = 0;
                const visibleCards = [];

                relayCards.forEach(card => {
                    const name = card.dataset.relayName?.toLowerCase() || '';
                    const country = card.dataset.country?.toLowerCase() || '';
                    const location = card.dataset.location?.toLowerCase() || '';
                    const asn = card.dataset.asn?.toLowerCase() || '';
                    const subName = card.querySelector('.relay-sub')?.textContent.toLowerCase() || '';
                    const cardBody = card.textContent.toLowerCase();
                    const fingerprint = card.getAttribute('data-fp')?.toLowerCase() || '';
                    const cardText = `${name} ${country} ${location} ${asn} ${subName} ${cardBody} ${fingerprint}`;

                    const matchesSearch = !searchTerm || cardText.includes(searchTerm);
                    const cardType = card.classList.contains('guard') ? 'guard' :
                        card.classList.contains('exit') ? 'exit' :
                        card.classList.contains('middle') ? 'middle' : 'middle';
                    const matchesFilter = activeFilter === 'all' || cardType === activeFilter;

                    if (matchesSearch && matchesFilter) {
                        card.classList.remove('hidden');
                        visibleCount++;
                        visibleCards.push(card);
                    } else {
                        card.classList.add('hidden');
                    }
                });

                document.querySelectorAll('#relays .region-section').forEach(section => {
                    const visibleInSection = section.querySelectorAll('.relay-card:not(.hidden)').length;
                    section.classList.toggle('hidden', visibleInSection === 0);
                });

                let noResults = regionContainer?.querySelector('.no-results');
                if (visibleCount === 0 && regionContainer) {
                    if (!noResults) {
                        noResults = document.createElement('div');
                        noResults.className = 'no-results';
                        noResults.textContent = '🔍 No relays found matching your search.';
                        regionContainer.appendChild(noResults);
                    }
                } else if (noResults) {
                    noResults.remove();
                }

                if (searchFeedback) {
                    const filtering = Boolean(searchTerm) || activeFilter !== 'all';
                    searchFeedback.replaceChildren();
                    if (filtering) {
                        const count = document.createElement('span');
                        count.textContent = `${visibleCount} matching relay${visibleCount === 1 ? '' : 's'}`;
                        searchFeedback.appendChild(count);
                        visibleCards.slice(0, 3).forEach(card => {
                            const chip = document.createElement('button');
                            chip.type = 'button';
                            chip.className = 'match-chip';
                            chip.textContent = `Shinobi${card.dataset.relayName || ''}`;
                            chip.addEventListener('click', () => {
                                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                card.classList.add('pulse');
                                setTimeout(() => card.classList.remove('pulse'), 900);
                            });
                            searchFeedback.appendChild(chip);
                        });
                    }
                }
            }

            function relayStatusRank(card) {
                if (card.classList.contains('running')) return 0;
                if (card.classList.contains('lookup-pending')) return 2;
                if (card.classList.contains('offline')) return 3;
                return 1;
            }

            function relayTypeRank(card) {
                if (card.classList.contains('guard')) return 0;
                if (card.classList.contains('middle')) return 1;
                if (card.classList.contains('exit')) return 2;
                return 3;
            }

            function compareRelayCards(a, b) {
                const nameA = a.dataset.relayName || '';
                const nameB = b.dataset.relayName || '';
                if (activeSort === 'country') {
                    return (a.dataset.country || '').localeCompare(b.dataset.country || '') || nameA.localeCompare(nameB);
                }
                if (activeSort === 'type') {
                    return relayTypeRank(a) - relayTypeRank(b) || nameA.localeCompare(nameB);
                }
                if (activeSort === 'status') {
                    return relayStatusRank(a) - relayStatusRank(b) || nameA.localeCompare(nameB);
                }
                return Number(a.dataset.relayIndex || 0) - Number(b.dataset.relayIndex || 0);
            }

            function sortRelayCards() {
                document.querySelectorAll('#relays .relay-grid').forEach(grid => {
                    const cards = Array.from(grid.querySelectorAll(':scope > .relay-card'));
                    cards.sort(compareRelayCards).forEach(card => grid.appendChild(card));
                });
            }

            window.applyRelayFilters = () => {
                sortRelayCards();
                filterRelays();
            };

            if (searchInput) {
                searchInput.addEventListener('input', filterRelays);
            }

            if (searchClear) {
                searchClear.addEventListener('click', () => {
                    if (searchInput) {
                        searchInput.value = '';
                        filterRelays();
                        searchInput.focus();
                    }
                });
            }

            filterChips.forEach(chip => {
                chip.addEventListener('click', () => {
                    filterChips.forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                    activeFilter = chip.getAttribute('data-filter');
                    window.applyRelayFilters();
                });
            });

            sortChips.forEach(chip => {
                chip.addEventListener('click', () => {
                    sortChips.forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                    activeSort = chip.getAttribute('data-sort') || 'region';
                    window.applyRelayFilters();
                });
            });

            window.applyRelayFilters();
        });
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.faq-item')) {
                document.querySelectorAll('.faq-item.active').forEach(item => item.classList.remove('active'));
            }
        });

        function animateCounter(element) {
            const target = element.getAttribute('data-count');
            const isRatio = target.includes('/');

            if (isRatio) {
                const [numerator, denominator] = target.split('/');
                let current = 0;
                const end = parseInt(numerator);
                const duration = 1500;
                const increment = end / (duration / 16);

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= end) {
                        element.textContent = target;
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.floor(current) + '/' + denominator;
                    }
                }, 16);
            } else {
                const end = parseInt(target);
                let current = 0;
                const duration = 1500;
                const increment = end / (duration / 16);

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= end) {
                        element.textContent = end;
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.floor(current);
                    }
                }, 16);
            }
        }
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        document.querySelectorAll('.stat-value[data-count]').forEach(stat => {
            statsObserver.observe(stat);
        });
