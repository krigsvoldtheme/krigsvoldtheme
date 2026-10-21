The canonical design now lives in krigsvoldtheme/npm; src/palettes.mjs re-exports the installed @krigsvold/theme. The website repacks that installed core for downloads. It never generates a second npm package. @krigsvold/astro supplies the shared document shell and component specimens.

# Distribution maintenance

The canonical design definitions live in `krigsvoldtheme/npm`; `src/palettes.mjs` re-exports the installed core. `src/app-ports.mjs` maps semantic roles into native Vim, Emacs, Chrome, Firefox, and ChatGPT desktop imports/settings. `scripts/distributions.mjs` and the templates under `scripts/templates/` assemble standalone distribution repositories and website archives.

## Build

Run `npm run build`. Full standalone trees appear under `artifacts/repositories/{vim,emacs,chrome,firefox}`. Each contains a source.json snapshot, scripts/build.mjs, verification, LICENSE, README, and a GitHub Actions workflow. These snapshots make public distributions independently reproducible without access to this source repository.

Publish design changes in the core first and deliberately update the installed version here. After changing a mapper, build and test here, then sync each generated directory into the corresponding public `krigsvoldtheme` distribution repository. Exclude ignored dist/ output in the editor/browser repositories. Commit the generated native files as well as source.json and the scripts. Their CI rebuilds, tests, and checks for generated-file drift. There is no automatic cross-repository write credential or publishing workflow.

The npm packages use independent semantic versions: @krigsvold/theme 2.0.0 and @krigsvold/astro 1.0.0. Editor/browser ports remain at 1.0.0 and use the site release version when generated together. npm scope krigsvold and GitHub organization krigsvoldtheme are independent.

## Outputs and scope

- npm: `@krigsvold/theme`, with scoped CSS, complete and per-mode JSON, ESM, CommonJS, declarations, and highlight.js CSS. Optional font styles resolve local Roboto, Roboto Slab, and Roboto Mono through pinned Fontsource dependencies, with their licenses. The core also supplies typography, spacing, shape, depth, motion, and host capabilities.
- Vim/Neovim: root colors/ layout with explicit Light/Dark files and a background-aware dispatcher. Exact GUI/truecolor colors, xterm-256 approximations, standard editor and syntax groups, and Neovim Treesitter/LSP links. Test both editors, both appearances, and truecolor/fallback.
- Emacs: native -theme.el files, plus a package entry registering custom-theme-load-path. Standard font-lock, Org, UI, diff, completion, and ANSI faces. Emacs 27.1+. Not submitted to MELPA.
- Chrome: two Manifest V3 theme-only packages, one per appearance. No JavaScript, permissions, remote assets, or new-tab replacement. These are upload/source ZIPs, not signed store installations.
- Firefox: one Manifest V2 static theme with theme and dark_theme, stable add-on ID `krigsvold-theme@krigsvoldtheme.dev`, and no-data-collection declaration. Firefox 142+ covers that declaration on desktop and Android. Build and lint with Mozilla web-ext; permanent installation awaits Mozilla signing.
- ChatGPT/Codex desktop: `.txt` files contain `codex-theme-v1:` followed by compact JSON matching a user-provided app export. Preserve `codeThemeId: codex` and `accentSource: chatgpt`; map surface/ink/accent to bg/text/accent, diffAdded/diffRemoved to success/danger, and skill to syntax-decorator. Contrast defaults are 45 for Light and 60 for Dark, fonts are null, and windows are opaque. Native payloads contain only export fields, with no project metadata. Manual appearance-settings JSON remains available. The website has copy buttons and text downloads. Format/round-trip checks pass; actual app import remains a manual acceptance check. Preset-only clients may not expose custom colors.

The website builds expose all archives under /downloads/. Source ZIPs contain license notices. Native editor packages have no network behavior. Browser themes affect browser UI; websites retain their own styles. Native import into ChatGPT and marketplace/store publication are separate acceptance steps.

## Validation

Main tests check role mapping and contrast; public port CI runs the native Vim/Neovim and Emacs smoke tests, npm export checks, or browser manifest checks. Firefox CI also runs web-ext lint with warnings treated as errors. Website browser regression includes download URLs and expanded installation details at phone widths.
