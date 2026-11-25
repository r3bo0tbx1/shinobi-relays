(() => {
    let inventory = [];
    let live = { state: 'loading' };
    let selected = [];
    let view = 'cards';
    let tableSort = { key: 'region', direction: 1 };
    let tableComparator;
    const camera = { zoom: 1, x: 600, y: 242 };
    let mapFrame;
    let drag;
    const namespace = 'http://www.w3.org/2000/svg';
    const slug = name => String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const cardFor = relay => document.getElementById(`relay-${slug(relay.name)}`);
    const node = (tag, text, className) => {
        const element = document.createElement(tag);
        if (text !== undefined) element.textContent = text;
        if (className) element.className = className;
        return element;
    };
    const svgNode = (tag, attributes) => {
        const element = document.createElementNS(namespace, tag);
        for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, String(value));
        return element;
    };

    function stateFor(relay) {
        if (relay.comingSoon) return { text: 'Coming soon', className: 'planned' };
        if (live.state === 'failed') return { text: 'Live unavailable', className: 'unknown' };
        if (live.state !== 'ready') return { text: 'Checking', className: 'unknown' };
        const card = cardFor(relay);
        if (card?.classList.contains('running')) return { text: 'Running', className: 'running' };
        if (card?.classList.contains('offline')) return { text: 'Offline', className: 'offline' };
        return { text: 'Lookup pending', className: 'unknown' };
    }

    function switchView(next, persist = false) {
        view = next;
        if (persist) {
            try { localStorage.setItem('shinobi.relay-view', next); } catch (_) {}
        }
        const cards = document.getElementById('relayRegionContainer');
        const table = document.getElementById('relayTableRegion');
        if (!cards || !table) return;
        cards.hidden = view !== 'cards';
        table.hidden = view !== 'table';
        for (const [id, value] of [['relayCardsView', 'cards'], ['relayTableView', 'table']]) {
            const button = document.getElementById(id);
            button?.classList.toggle('active', view === value);
            button?.setAttribute('aria-pressed', String(view === value));
        }
    }

    function openRelay(relay) {
        const search = document.getElementById('relaySearch');
        if (search) {
            search.value = '';
            search.dispatchEvent(new Event('input', { bubbles: true }));
        }
        document.querySelector('[data-filter="all"]')?.click();
        switchView('cards');
        const card = cardFor(relay);
        if (!card) return;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        card.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
        card.tabIndex = -1;
        card.focus({ preventScroll: true });
        if (!reduced) {
            card.classList.add('pulse');
            setTimeout(() => card.classList.remove('pulse'), 900);
        }
    }

    function renderTable() {
        const body = document.getElementById('relayTableBody');
        if (!body) return;
        const byName = new Map(inventory.map(relay => [relay.name, relay]));
        const cards = Array.from(document.querySelectorAll('#relays .relay-card:not(.hidden)'));
        if (tableComparator) cards.sort(tableComparator);
        const rows = cards.map(card => {
            const relay = byName.get(card.dataset.relayName);
            if (!relay) return null;
            const row = node('tr');
            row.dataset.relayName = relay.name;
            const identity = node('th');
            identity.scope = 'row';
            identity.append(node('strong', `Shinobi${relay.name}`), node('small', relay.host || ''));
            row.append(identity, node('td', relay.location || 'Unknown'), node('td', String(relay.os || '').replace(/^[^\p{L}\p{N}]+/u, '').trim()), node('td', relay.asn || 'Pending'));
            const status = stateFor(relay);
            const statusCell = node('td');
            statusCell.append(node('span', status.text, `explorer-status ${status.className}`));
            const fingerprint = node('td');
            const fingerprintContent = node('div', undefined, 'table-fingerprint');
            const fingerprintValue = node('code');
            if (relay.fingerprint) {
                for (const half of relay.fingerprint.match(/.{1,20}/g)) {
                    fingerprintValue.append(node('span', half.match(/.{1,4}/g).join(' ')));
                }
            } else {
                fingerprintValue.textContent = 'Awaiting fingerprint';
            }
            fingerprintContent.append(fingerprintValue);
            if (relay.fingerprint) {
                const copy = node('button', 'Copy', 'table-copy');
                copy.type = 'button';
                copy.dataset.copy = relay.fingerprint;
                copy.setAttribute('aria-label', `Copy Shinobi${relay.name} fingerprint`);
                fingerprintContent.append(copy);
            }
            fingerprint.append(fingerprintContent);
            const details = node('td');
            const button = node('button', 'View card ↗', 'explorer-link');
            button.type = 'button';
            button.setAttribute('aria-label', `View Shinobi${relay.name} card`);
            button.addEventListener('click', () => openRelay(relay));
            details.append(button);
            row.append(statusCell, fingerprint, details);
            return row;
        }).filter(Boolean);
        body.replaceChildren(...rows);
        const empty = document.getElementById('relayTableEmpty');
        if (empty) empty.hidden = rows.length !== 0;
    }

    function renderSelection(names) {
        const panel = document.getElementById('relayAtlasSelection');
        if (!panel) return;
        selected = names;
        panel.classList.toggle('is-overview', names.length === 0);
        if (names.length === 0) {
            renderMapOverview(panel);
            markSelected();
            return;
        }
        const relays = names.map(name => inventory.find(relay => relay.name === name)).filter(Boolean);
        const title = relays.length === 1 ? relays[0].location : `${relays.length} nearby public relays`;
        panel.replaceChildren(node('span', 'SELECTED LOCATION', 'explorer-eyebrow'), node('h3', title));
        const back = node('button', '← All locations', 'explorer-link atlas-back');
        back.type = 'button';
        back.addEventListener('click', () => renderSelection([]));
        panel.append(back);
        for (const relay of relays) {
            const block = node('div', undefined, 'atlas-selected-relay');
            const state = stateFor(relay);
            const button = node('button', 'View relay card ↗', 'explorer-link');
            button.type = 'button';
            button.addEventListener('click', () => openRelay(relay));
            block.append(node('strong', `Shinobi${relay.name} ${relay.emoji || ''}`), node('span', relay.location), node('span', `${String(relay.os || '').replace(/^[^\p{L}\p{N}]+/u, '').trim()} · ${relay.asn || 'ASN pending'}`, 'atlas-selected-meta'), node('span', state.text, `explorer-status ${state.className}`), button);
            panel.append(block);
        }
        markSelected();
    }

    function renderMapOverview(panel) {
        const publicRelays = inventory.filter(relay => relay.kind === 'public');
        const counts = summarizeRelayInventory(inventory);
        panel.replaceChildren(node('span', 'PUBLIC RELAY FOOTPRINT', 'explorer-eyebrow'), node('h3', `${publicRelays.length} relays. ${counts.countries} countries.`), node('p', 'Different locations, platforms and networks. Select a marker to explore a relay.'));
        const regions = new Map();
        for (const relay of publicRelays) regions.set(relay.region, (regions.get(relay.region) || 0) + 1);
        const labels = { 'asia-oceania': 'Asia-Oceania', africa: 'Africa', 'north-america': 'North America', 'south-america': 'South America' };
        const breakdown = node('div', undefined, 'atlas-region-breakdown');
        for (const [region, count] of regions) {
            const row = node('div', undefined, 'atlas-region-row');
            const meter = node('meter');
            meter.min = 0;
            meter.max = publicRelays.length;
            meter.value = count;
            meter.setAttribute('aria-label', `${labels[region] || region}: ${count} public relays`);
            row.append(node('span', labels[region] || region), node('strong', String(count)), meter);
            breakdown.append(row);
        }
        panel.append(breakdown);
        const upcoming = publicRelays.find(relay => relay.comingSoon);
        if (upcoming) {
            const next = node('div', undefined, 'atlas-next-relay');
            const button = node('button', `Shinobi${upcoming.name} ↗`, 'explorer-link');
            button.type = 'button';
            button.addEventListener('click', () => { renderSelection([upcoming.name]); });
            next.append(node('span', 'NEXT TO JOIN', 'explorer-eyebrow'), button, node('small', upcoming.location));
            panel.append(next);
        }
    }

    function markSelected() {
        document.querySelectorAll('.atlas-marker').forEach(marker => {
            const active = marker.dataset.names.split('|').some(name => selected.includes(name));
            marker.classList.toggle('is-selected', active);
            marker.setAttribute('aria-pressed', String(active));
        });
    }

    function cameraBounds() {
        const width = 1200 / camera.zoom, height = 484 / camera.zoom;
        camera.x = Math.max(width / 2, Math.min(1200 - width / 2, camera.x));
        camera.y = Math.max(height / 2, Math.min(484 - height / 2, camera.y));
        return { x: camera.x - width / 2, y: camera.y - height / 2, width, height };
    }

    function scheduleMap() {
        cancelAnimationFrame(mapFrame);
        mapFrame = requestAnimationFrame(renderMap);
    }

    function changeZoom(multiplier) {
        if (selected.length && multiplier > 1) {
            const locations = inventory.filter(relay => selected.includes(relay.name) && relay.coordinates);
            if (locations.length) {
                camera.x = locations.reduce((sum, relay) => sum + (relay.coordinates[1] + 180) / 360 * 1200, 0) / locations.length;
                camera.y = locations.reduce((sum, relay) => sum + (85 - relay.coordinates[0]) / 145 * 484, 0) / locations.length;
            }
        }
        camera.zoom = Math.max(1, Math.min(4, camera.zoom * multiplier));
        renderMap();
    }

    function resetMap() {
        camera.zoom = 1;
        camera.x = 600;
        camera.y = 242;
        renderMap();
    }

    function renderMap() {
        const canvas = document.getElementById('relayAtlasCanvas');
        const layer = document.getElementById('relayAtlasMarkers');
        const points = document.getElementById('relayAtlasPoints');
        if (!canvas || !layer || !points || inventory.length === 0) return;
        const focusedMarker = document.activeElement?.closest('.atlas-marker');
        canvas.classList.add('is-enhanced');
        canvas.classList.toggle('is-zoomed', camera.zoom > 1);
        const bounds = cameraBounds();
        layer.setAttribute('viewBox', `${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`);
        const scale = bounds.width / Math.max(canvas.clientWidth, 260);
        const zoomLabel = document.getElementById('atlasZoomLevel');
        const zoomText = `${Math.round(camera.zoom * 100)}%`;
        if (zoomLabel && zoomLabel.textContent !== zoomText) zoomLabel.textContent = zoomText;
        document.getElementById('atlasZoomOut').disabled = camera.zoom <= 1;
        document.getElementById('atlasZoomIn').disabled = camera.zoom >= 4;
        const threshold = 46 * scale;
        const groups = inventory.filter(relay => relay.kind === 'public' && Array.isArray(relay.coordinates) && relay.coordinates.length === 2 && relay.coordinates.every(Number.isFinite) && relay.coordinates[0] >= -60 && relay.coordinates[0] <= 85 && Math.abs(relay.coordinates[1]) <= 180).map(relay => ({
            relays: [relay], x: (relay.coordinates[1] + 180) / 360 * 1200, y: (85 - relay.coordinates[0]) / 145 * 484,
        }));
        let merged = true;
        while (merged) {
            merged = false;
            outer: for (let i = 0; i < groups.length; i++) {
                for (let j = i + 1; j < groups.length; j++) {
                    const a = groups[i], b = groups[j];
                    if (Math.hypot(a.x - b.x, a.y - b.y) < threshold) {
                        const count = a.relays.length + b.relays.length;
                        a.x = (a.x * a.relays.length + b.x * b.relays.length) / count;
                        a.y = (a.y * a.relays.length + b.y * b.relays.length) / count;
                        a.relays.push(...b.relays);
                        groups.splice(j, 1);
                        merged = true;
                        break outer;
                    }
                }
            }
        }
        points.replaceChildren(...groups.map(group => {
            const planned = group.relays.every(relay => relay.comingSoon);
            const running = group.relays.every(relay => stateFor(relay).className === 'running');
            const offline = group.relays.every(relay => stateFor(relay).className === 'offline');
            const visible = group.x >= bounds.x && group.x <= bounds.x + bounds.width && group.y >= bounds.y && group.y <= bounds.y + bounds.height;
            const label = group.relays.length === 1 ? `Shinobi${group.relays[0].name}, ${group.relays[0].location}` : `${group.relays.length} public relays: ${group.relays.map(relay => relay.name).join(', ')}`;
            const marker = svgNode('g', { transform: `translate(${group.x.toFixed(2)} ${group.y.toFixed(2)})`, tabindex: visible ? 0 : -1, role: 'button', class: `atlas-marker${planned ? ' is-planned' : ''}${running ? ' is-running' : ''}${offline ? ' is-offline' : ''}`, 'aria-label': label, 'aria-hidden': String(!visible), 'data-relay-count': group.relays.length, 'data-names': group.relays.map(relay => relay.name).join('|') });
            const hit = svgNode('circle', { r: (22 * scale).toFixed(2), class: 'atlas-marker-hit' });
            const ring = svgNode('circle', { r: ((group.relays.length > 1 ? 13 : 8) * scale).toFixed(2), class: 'atlas-marker-ring' });
            const dot = svgNode('circle', { r: ((group.relays.length > 1 ? 9 : 4) * scale).toFixed(2), class: 'atlas-marker-dot' });
            marker.append(hit, ring, dot);
            if (group.relays.length > 1) {
                const text = svgNode('text', { 'text-anchor': 'middle', dy: '.35em', 'font-size': (10 * scale).toFixed(2) });
                text.textContent = group.relays.length;
                marker.append(text);
            }
            const activate = () => renderSelection(group.relays.map(relay => relay.name));
            marker.addEventListener('click', activate);
            marker.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activate(); }
            });
            return marker;
        }));
        markSelected();
        if (focusedMarker) layer.focus({ preventScroll: true });
    }

    function publicationAge(raw) {
        const published = Date.parse(String(raw).replace(' ', 'T') + 'Z');
        if (!Number.isFinite(published)) return 'time unavailable';
        const minutes = Math.floor(Math.max(0, Date.now() - published) / 60000);
        if (minutes < 1) return 'just published';
        if (minutes < 60) return `${minutes} min old`;
        if (minutes < 1440) return `${Math.floor(minutes / 60)} hr old`;
        const days = Math.floor(minutes / 1440);
        return `${days} day${days === 1 ? '' : 's'} old`;
    }

    function renderFleet() {
        const count = document.getElementById('fleetRunningCount');
        const detail = document.getElementById('fleetRunningDetail');
        const freshness = document.getElementById('fleetDataFreshness');
        if (!count || !detail || !freshness) return;
        const ready = inventory.filter(relay => !relay.comingSoon && relay.fingerprint);
        const checked = ready.filter(relay => ['running', 'offline'].some(value => cardFor(relay)?.classList.contains(value)));
        const running = checked.filter(relay => cardFor(relay)?.classList.contains('running')).length;
        count.textContent = live.state === 'ready' ? String(running) : live.state === 'failed' ? 'Unavailable' : 'Checking';
        detail.textContent = live.state === 'ready' ? `${checked.length} checked · ${ready.length - checked.length} lookup pending` : live.state === 'failed' ? 'Inventory remains available' : 'Awaiting Onionoo';
        freshness.replaceChildren();
        if (live.state === 'ready') {
            freshness.append(document.createTextNode('Network data '));
            const raw = String(live.published || '');
            if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(raw)) {
                const time = node('time', publicationAge(raw));
                time.dateTime = raw.replace(' ', 'T') + 'Z';
                time.dataset.published = raw;
                time.title = `Onionoo publication: ${raw} UTC`;
                const details = node('details', undefined, 'freshness-details');
                details.append(node('summary', 'Exact times'));
                const exact = node('span', `Published ${raw} UTC · Lookup ${new Date(live.checked).toISOString()}`);
                details.append(exact);
                freshness.append(time, details);
            } else freshness.append(document.createTextNode('time unavailable'));
            const checkedAt = new Date(live.checked);
            freshness.append(document.createTextNode(` · Checked ${checkedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · Upcoming excluded`));
        } else freshness.textContent = live.state === 'failed' ? 'The live lookup failed. Configured and upcoming relay totals are still available.' : 'Checking live status with Onionoo. Upcoming relays are excluded from live checks.';
    }

    document.getElementById('relayCardsView')?.addEventListener('click', () => switchView('cards', true));
    document.getElementById('relayTableView')?.addEventListener('click', () => { renderTable(); switchView('table', true); });
    document.querySelectorAll('[data-table-sort]').forEach(button => {
        button.addEventListener('click', () => {
            const key = button.dataset.tableSort;
            document.dispatchEvent(new CustomEvent('shinobi:sort', { detail: { key, direction: tableSort.key === key ? -tableSort.direction : 1 } }));
        });
    });
    document.querySelectorAll('#relay-atlas .atlas-location-list a').forEach(link => {
        link.addEventListener('click', event => {
            const relay = inventory.find(item => `#relay-${slug(item.name)}` === link.hash);
            if (relay) { event.preventDefault(); openRelay(relay); }
        });
    });
    document.addEventListener('shinobi:inventory', event => {
        inventory = event.detail;
        renderTable(); renderMap(); renderFleet(); renderSelection(selected);
        try {
            const stored = localStorage.getItem('shinobi.relay-view');
            if (stored === 'cards' || stored === 'table') switchView(stored);
        } catch (_) {}
    });
    document.addEventListener('shinobi:status', event => {
        live = event.detail;
        renderTable(); renderMap(); renderFleet(); renderSelection(selected);
    });
    document.addEventListener('shinobi:filter', renderTable);
    document.addEventListener('shinobi:sort-state', event => {
        tableSort = { key: event.detail.key, direction: event.detail.direction };
        tableComparator = event.detail.compare;
        document.querySelectorAll('[data-table-sort]').forEach(button => {
            button.closest('th').setAttribute('aria-sort', button.dataset.tableSort === tableSort.key ? (tableSort.direction === 1 ? 'ascending' : 'descending') : 'none');
        });
        renderTable();
    });
    document.addEventListener('shinobi:open-relay', event => {
        const relay = inventory.find(item => item.name === event.detail);
        if (relay) openRelay(relay);
    });
    const canvas = document.getElementById('relayAtlasCanvas');
    if (canvas && typeof ResizeObserver !== 'undefined') new ResizeObserver(scheduleMap).observe(canvas);
    document.getElementById('atlasZoomIn')?.addEventListener('click', () => changeZoom(1.5));
    document.getElementById('atlasZoomOut')?.addEventListener('click', () => changeZoom(1 / 1.5));
    document.getElementById('atlasReset')?.addEventListener('click', resetMap);
    const layer = document.getElementById('relayAtlasMarkers');
    layer?.addEventListener('keydown', event => {
        if (event.key === '+' || event.key === '=') { event.preventDefault(); changeZoom(1.5); }
        else if (event.key === '-') { event.preventDefault(); changeZoom(1 / 1.5); }
        else if (event.key === 'Home') { event.preventDefault(); resetMap(); }
        else if (camera.zoom > 1 && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
            event.preventDefault();
            const bounds = cameraBounds();
            camera.x += (event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0) * bounds.width * 0.12;
            camera.y += (event.key === 'ArrowUp' ? -1 : event.key === 'ArrowDown' ? 1 : 0) * bounds.height * 0.12;
            renderMap();
        }
    });
    layer?.addEventListener('pointerdown', event => {
        if (camera.zoom <= 1 || event.button !== 0 || event.target.closest('.atlas-marker')) return;
        drag = { id: event.pointerId, x: event.clientX, y: event.clientY, centerX: camera.x, centerY: camera.y };
        layer.setPointerCapture(event.pointerId);
    });
    layer?.addEventListener('pointermove', event => {
        if (!drag || drag.id !== event.pointerId) return;
        const bounds = cameraBounds();
        camera.x = drag.centerX - (event.clientX - drag.x) * bounds.width / canvas.clientWidth;
        camera.y = drag.centerY - (event.clientY - drag.y) * bounds.height / canvas.clientHeight;
        scheduleMap();
    });
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) layer?.addEventListener(type, () => { drag = undefined; });
    const dialog = document.getElementById('atlasDialog');
    const atlas = document.getElementById('relay-atlas');
    const layout = atlas?.querySelector('.atlas-layout');
    const expand = document.getElementById('atlasExpand');
    expand?.addEventListener('click', () => {
        if (!dialog || !layout) return;
        dialog.append(layout);
        dialog.showModal();
        expand.setAttribute('aria-expanded', 'true');
        document.documentElement.classList.add('atlas-modal-open');
        scheduleMap();
    });
    document.getElementById('atlasDialogClose')?.addEventListener('click', () => dialog.close());
    dialog?.addEventListener('close', () => {
        atlas.insertBefore(layout, dialog);
        expand.setAttribute('aria-expanded', 'false');
        document.documentElement.classList.remove('atlas-modal-open');
        expand.focus({ preventScroll: true });
        scheduleMap();
    });
    setInterval(() => {
        const time = document.querySelector('#fleetDataFreshness time[data-published]');
        if (time) time.textContent = publicationAge(time.dataset.published);
    }, 60000);
})();
