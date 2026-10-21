# Layout release gate

This branch validates `krigsvold` core 2.1.0 and Astro 1.1.0 using local release-candidate archives in `vendor/`. These archives are review fixtures. Keep this PR in draft until the package PRs pass, merge, and publish.

After publication:

1. Replace the two file dependencies with exact registry versions 2.1.0 and 1.1.0.
2. Regenerate the lockfile with `npm install --prefer-online`.
3. Remove the candidate archives.
4. Run `npm ci`, `npm test`, `npm run build`, and `npm run test:browser`; merge only when all pass.

The gallery and three standalone examples read the actual candidate packages. Existing routes and consent behavior remain part of browser verification. The originating production site stays on its published dependencies until this gate has passed.

## Candidate changes

- Core: https://github.com/krigsvoldtheme/npm/pull/2
- Astro: https://github.com/krigsvoldtheme/astro/pull/2

After package review and merge, run from each clean release checkout in this order:

```sh
# Core repository
npm ci --ignore-scripts
npm run build
npm test
npm publish --access public

# Astro repository, after core 2.1.0 is available
npm ci --ignore-scripts --legacy-peer-deps
npm test
npm publish --access public
```

Publishing requires an authorized npm session. CI's packed installs validate the unpublished candidates without requiring registry publication. Never publish the fixture archives as a substitute for the reviewed package checkouts.
