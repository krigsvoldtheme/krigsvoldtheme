# Krigsvold page shell

Krigsvold is an opinionated design language. Its reference website starts with the actual working shell of krigsvold.org, not a reconstruction from selected visual details. The imported source revision is `a3cf072c516c59ed35814e0fa153028cc91ceecd` from `basuhoward/krigsvold.org`.

## Complete page composition

The masthead establishes the page title, introductory information and relevant metadata before the content begins. A solid background is a complete default; a photograph is optional. Titles wrap naturally. Dates, versions, authors and tags belong in named metadata or tag regions when the page has those values; empty regions add no placeholder content.

Light appearance uses the source dark masthead. Dark appearance reverses it to a light masthead with dark text. This inversion is an explicit owner-directed extension, not a claim that the original source implemented full-page dark mode. The appearance control is independent from the palette specimens.

Related-page navigation and same-page contents are different objects. The page composition and its available content width determine whether same-page contents use a left index or an inline list. A narrow blog can use inline contents on the same screen where a wider document uses a left index. Viewport reflow then preserves those relationships at smaller sizes.

## Defaults and departures

The shell provides coherent defaults for the masthead, navigation, title and metadata hierarchy, reading measure, content regions and footer. An adopter can replace any part. The adopter is responsible for making the resulting composition coherent, accessible and responsive; the default does not become noncommittal to accommodate arbitrary overrides.

## Source and extension boundary

Verbatim source files and SHA-256 hashes live in `docs/source-shell/upstream` and `manifest.json`. Active source styles live in `site/src/styles/origin`. Host identity, destinations and documentation replace personal or institutional content. Consent remains the existing host-specific implementation. No source analytics identifiers, seasonal scripts, personal content or photographic assets were copied into the active shell.

Host extensions are isolated in `shell-adapter.css`: appearance inversion, accessible unscripted navigation, documentation overflow handling and the design-language identity. The source components retain their markup and behavior except for these recorded changes. Existing token explorers, downloads, documentation and agent endpoints remain available.

React references and published package APIs have not changed in this shell rebuild. They will be reconciled against this working reference separately. Older pinned grammar snapshots remain historical evidence; this page records the current reference-host composition without rewriting their provenance.

## Verification

`baseline.json` records the source page's measured container widths, masthead padding, heading type and line height, and reading/index layout at 1440px and 768px. The browser suite compares the rebuilt language page against these values. Content, wordmarks and optional backgrounds intentionally differ; this is not a pixel-equality claim. Source styles are also checked byte-for-byte against their recorded hashes.

The new browser suite replaces the previous Astro/React chrome-equality assertions because React reconciliation is explicitly deferred. Existing React availability, archive and content checks remain.
