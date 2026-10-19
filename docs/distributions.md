# Distribution maintenance

The canonical colors remain in `src/palettes.mjs`. `src/app-ports.mjs` maps semantic roles into native Vim, Emacs, Chrome, Firefox, and manual ChatGPT settings. `scripts/distributions.mjs` and the templates under `scripts/templates/` assemble standalone distribution repositories and website archives.

## Build

Run `npm run build`. Full standalone trees appear under `artifacts/repositories/{npm,vim,emacs,chrome,firefox}`. Each contains a source.json snapshot, scripts/build.mjs, verification, LICENSE, README, and a GitHub Actions workflow. These snapshots make public distributions independently reproducible without access to this source repository.

After changing a palette or mapper, build and test here, then sync each generated directory into the corresponding public `krigsvoldtheme` distribution repository. Exclude ignored files: npm tarballs in the npm repo, and dist/ in the editor/browser repos. Commit the generated native files as well as source.json and the scripts. Their CI rebuilds, tests, and checks for generated-file drift. There is no automatic cross-repository write credential or publishing workflow.

All initial package versions are 1.0.0. Future published releases need intentional version bumps; use the same upstream release version across distributions generated together. The npm scope is not reserved by the GitHub organization and must be set up separately before registry publishing.

## Outputs and scope

- npm: `@krigsvoldtheme/theme`, with scoped CSS, complete and per-mode JSON, ESM, CommonJS, declarations, and highlight.js CSS. No runtime dependencies, install scripts, or bundled fonts. Archives are locally installable before registry publication.
- Vim/Neovim: root colors/ layout with explicit Light/Dark files and a background-aware dispatcher. Exact GUI/truecolor colors, xterm-256 approximations, standard editor and syntax groups, and Neovim Treesitter/LSP links. Test both editors, both appearances, and truecolor/fallback.
- Emacs: native -theme.el files, plus a package entry registering custom-theme-load-path. Standard font-lock, Org, UI, diff, completion, and ANSI faces. Emacs 27.1+. Not submitted to MELPA.
- Chrome: two Manifest V3 theme-only packages, one per appearance. No JavaScript, permissions, remote assets, or new-tab replacement. These are upload/source ZIPs, not signed store installations.
- Firefox: one Manifest V2 static theme with theme and dark_theme, stable add-on ID `krigsvold-theme@krigsvoldtheme.dev`, and no-data-collection declaration. Firefox 142+ covers that declaration on desktop and Android. Build and lint with Mozilla web-ext; permanent installation awaits Mozilla signing.
- ChatGPT/Codex desktop: manual presets map background, foreground, and accent exactly to canonical roles, with documented Light/Dark contrast defaults. They are explicitly labeled appearance-settings, not native imports. Exact native serialization awaits the user's app export; preset-only clients may not expose full custom colors.

The website builds expose all archives under /downloads/. Source ZIPs contain license notices. Native editor packages have no network behavior. Browser themes affect browser UI; websites retain their own styles. Native import into ChatGPT and marketplace/store publication are separate acceptance steps.

## Validation

Main tests check role mapping and contrast; public port CI runs the native Vim/Neovim and Emacs smoke tests, npm export checks, or browser manifest checks. Firefox CI also runs web-ext lint with warnings treated as errors. Website browser regression includes download URLs and expanded installation details at phone widths.
