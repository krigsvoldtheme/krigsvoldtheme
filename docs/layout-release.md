# Layout release gate

This draft validates core 2.1.0 and Astro 1.1.0 through candidate archives in `vendor/`. The gallery and three standalone examples consume those actual packages. Existing routes and consent behavior remain part of verification.

## Package release order

- Core PR: https://github.com/krigsvoldtheme/npm/pull/2
- Astro PR: https://github.com/krigsvoldtheme/astro/pull/2

Each package PR includes `publish.yml`, which publishes stable GitHub releases through npm trusted publishing after verification. The package repositories' `docs/releasing.md` give exact one-time npm settings. These settings must be configured by an npm maintainer before the first automated release.

1. Merge the reviewed package changes. Configure each npm package's trusted publisher with its repository, workflow filename `publish.yml`, and direct `npm publish` permission.
2. Publish the core repository's stable GitHub release `v2.1.0`; wait for successful npm publication.
3. Publish the Astro repository's stable GitHub release `v1.1.0`; wait for successful npm publication.
4. Replace this site's file dependencies with exact registry versions 2.1.0 and 1.1.0. Run `npm install --prefer-online` to regenerate the lockfile.
5. Remove the candidate archives. Run `npm ci`, `npm test`, `npm run build`, and `npm run test:browser`. Merge the demonstration site only when these pass against registry packages.

Candidate archives are review fixtures, not a production package source. Keep this PR in draft until the registry gate passes. The originating production site remains on its existing published dependencies until demonstration-site validation is complete.
