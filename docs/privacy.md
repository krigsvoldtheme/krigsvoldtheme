# Website privacy controls

The footer follows the compact solo-author JHCU pattern: the James Howard badge, site domain, “A website of James Howard,” and permanent Privacy Notice, Cookie Settings, Terms of Use, and Copyright links.

The consent controller is adapted from `k3jph/defenseor.com`, with Krigsvold-specific copy, cookie name, styling, and the owner's expressly requested shared GA4 ID. Its source is `site/src/scripts/consent.js`; the configuration is `site/src/data/site-settings.mjs`.

- Analytics defaults to `G-FSDET4HG4L`, also used by CMNA and jameshoward.us. Set `PUBLIC_GA_ID` to an empty string to disable it for a build. A changed ID invalidates previous choices.
- No Google tag, Analytics request, or cookieless consent ping is sent before acceptance. Fonts and identity images are local.
- The host-only `krigsvold-consent` cookie records a decision, configuration version, and absolute expiration for up to 365 days. It is Secure on HTTPS and SameSite=Lax.
- Rejection leaves all theme functionality available. Withdrawal disables collection, removes accessible Analytics cookies, and reloads without the tag.
- Global Privacy Control overrides saved acceptance. JavaScript-disabled visits never load Analytics.
- Ads-related consent remains denied; Google Signals and advertising personalization signals are disabled. Page-location data omits queries/fragments; referrer data is limited to its origin. Analytics cookie lifetime is configured at one year.

`scripts/check-consent.mjs` exercises the built site with Playwright and a synthetic, intercepted Google tag. It checks new visits, rejection, acceptance, withdrawal, saved/expired/malformed decisions, configuration changes, GPC, JavaScript-disabled browsing, responsive layouts, icon loading, specimen switching, token filtering, palette selection, contrast calculation, and clipboard success/fallback. The GitHub Actions workflow installs Chromium and runs these checks after the production build. `PLAYWRIGHT_EXECUTABLE_PATH` can select an existing Chromium binary.

The notice describes the site's implementation; it does not claim a blanket legal certification. Hosting-specific disclosures should be reviewed when a production host is selected. The source package license remains separate from rights in the James Howard identity badge.
