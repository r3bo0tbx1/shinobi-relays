# Security Policy

## Scope

This repository is a static website for the Shinobi Relays dashboard. It has no backend, no authentication, no cookies, and no browser storage, but it still treats browser-controlled and API-controlled data as untrusted.

In scope:

- `index.html`
- `404.html`
- `src/css/*.css`
- `src/js/shinobi.js`
- `_headers`
- `_redirects`
- `src/*.svg`
- `src/site.webmanifest`
- `.well-known/tor-relay/*`

Vendored third-party code is limited to `src/js/lucide.min.js`.

## Reporting

Please report security issues privately by email:

- `r3bo0tbx1@brokenbotnet.com`
- Abuse contact: `abuse@brokenbotnet.com`

Include:

- Affected URL or file
- Browser and version
- Payload or proof of concept
- Expected impact
- Whether the issue requires a specific deployment configuration

Please do not publish bridge connection lines, private relay keys, provider credentials, or host access details.

## Current Hardening

The site is designed to avoid DOM-based XSS rather than sanitize after the fact.

Implemented controls:

- Dynamic relay cards are built with DOM APIs such as `createElement`, `textContent`, `dataset`, and `replaceChildren`.
- Onionoo JSON data is treated as untrusted before it reaches the DOM.
- Relay flag names, timestamps, bandwidth, fingerprints, and data attributes are coerced or escaped before use.
- Dynamic URLs are validated through an allowlist before assignment.
- `target="_blank"` links require `rel="noopener noreferrer"`.
- First-party CSS and JavaScript are loaded from local files:
  - `src/css/shinobi.css`
  - `src/css/404.css`
  - `src/js/shinobi.js`
- Lucide is vendored locally as `src/js/lucide.min.js`.
- The SVG favicon is static and does not contain script, event handlers, or embedded style blocks.
- `_headers` sends `Cache-Control: no-transform` to opt out of CDN HTML rewriting.
- First-party script tags include `data-cfasync="false"` so Cloudflare Rocket Loader does not defer or rewrite them.
- Static email links are wrapped with Cloudflare `email_off` comments so Email Address Obfuscation does not inject its decode script.

## Content Security Policy

Cloudflare Pages reads `_headers`, which currently sets a restrictive CSP:

- `default-src 'self'`
- `script-src 'self'`
- `script-src-attr 'none'`
- `style-src 'self'`
- `style-src-attr 'none'`
- `connect-src 'self' https://onionoo.torproject.org`
- `object-src 'none'`
- `base-uri 'self'`
- `form-action 'self'`
- `frame-ancestors 'none'`
- `trusted-types default`
- `require-trusted-types-for 'script'`

Do not add `unsafe-eval`. Do not add `unsafe-inline` unless a security review documents why there is no safer option.

Cloudflare Rocket Loader and Email Address Obfuscation are not compatible with this Trusted Types policy when they inject or rewrite page scripts in Chromium browsers. Keep those features disabled in Cloudflare, or keep the local opt-outs in place.

## X-XSS-Protection

`X-XSS-Protection` is intentionally set to `0`.

That header controls the legacy browser XSS Auditor. Modern browsers ignore it, and older implementations have caused page breakage and security bypasses. The site relies on CSP, Trusted Types where supported, and removal of unsafe DOM sinks instead.

## Security Checks

Run:

```bash
npm run check:js
npm run test:security
```

`scripts/security-check.js` fails if first-party code introduces:

- `innerHTML` or `outerHTML`
- `insertAdjacentHTML`
- `document.write` or `document.writeln`
- `eval` or the `Function` constructor
- string-based timers
- `srcdoc`
- inline event-handler attributes
- inline style attributes
- inline `<script>` or `<style>` blocks
- `javascript:` URLs
- unapproved script sources
- first-party scripts without `data-cfasync="false"`
- `target="_blank"` links without `noopener noreferrer`
- CSP weakening such as `script-src 'unsafe-inline'` or `unsafe-eval`
- removal of the global `Cache-Control: no-transform` header

The check intentionally excludes `src/js/lucide.min.js` because it is vendored third-party code. Review that file separately before updating it.

## Deployment Notes

Cloudflare Pages should run `npm run build` and publish `shinobi`.

The build allowlist copies only:

- `index.html`
- `404.html`
- `_headers`
- `_redirects`
- `src/`
- `.well-known/`

Repository support files such as `README.md`, `SECURITY.md`, `package.json`, and `scripts/` are not copied into `shinobi` and should not be publicly served by the production site.

Cloudflare Pages applies `_headers` automatically when it is present in the published output. Other hosts must recreate the same headers in their web server or CDN configuration.

The page connects to Onionoo for live relay status. If Onionoo is unavailable, the static relay inventory remains visible and live status fields degrade to unavailable or pending states.
