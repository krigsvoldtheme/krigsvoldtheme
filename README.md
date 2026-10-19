# Krigsvold Theme

**Paper, sea, and ice.**

Krigsvold is an independent Light and Dark color family derived from the owner-supplied Krigsvold website stylesheet. Warm paper, deep navy, glacier blue, and muted bronze form its identity. Its twelve source colors are preserved as reference values; 88 semantic roles per mode adapt them for interfaces, syntax, charts, and terminals.

**Version:** 1.0.0.  
**Website:** [krigsvoldtheme.dev](https://krigsvoldtheme.dev/).

## Included

- Light and Dark palettes with namespaced `--krigsvold-*` CSS variables and structured JSON.
- Native macOS Terminal.app profiles, generic 16-color terminal descriptors, and starter VS Code color definitions.
- An Astro color-workbench website with a switchable specimen desk, interface/code/terminal examples, searchable tokens, copyable colors, and a contrast inspector.
- An original faceted ice-crystal mark, SVG/ICO favicons, and Apple/Android icons.
- Local Roboto and Roboto Slab fonts, the shared JHCU footer, a privacy notice, and consent-gated Analytics.
- Automated contrast, native-profile, and browser checks.

## Zsh prompt

Light and Dark `.zsh-theme` downloads are available on the website and in `ports/zsh/`. They work with plain Zsh or Oh My Zsh; see [installation and behavior](docs/ports.md#zsh-prompt-themes).

## Develop

Development requires Node.js 20.19+, npm, and Zsh 5.9+ for the prompt tests.

```sh
npm install
npm test
npm run build
npm run dev
```

The generator uses `src/palettes.mjs` and `src/ports.mjs` to create `artifacts/`, `site/public/downloads/`, and `ports/terminal-app/`. Edit the sources, then run `npm run tokens`; do not edit generated outputs by hand.

For browser checks, install Chromium with `npx playwright install chromium`, then run `npm run build && npm run test:browser`. The tests intercept the Google tag and do not submit real Analytics data.

## Use the colors

```html
<link rel="stylesheet" href="krigsvold.css">
<main data-krigsvold="dark">...</main>
```

Use `var(--krigsvold-bg)`, `var(--krigsvold-text)`, and the other semantic roles within the themed element. Light and Dark can coexist in separate scopes.

Terminal.app import instructions are in [docs/ports.md](docs/ports.md). The profile files and their archived colors are validated automatically; import/rendering on a Mac remains to be checked. The VS Code files are color sources rather than a packaged extension.

## Provenance

The exact owner-supplied stylesheet is retained in [references/krigsvold-source.css](references/krigsvold-source.css). Its twelve color variables and Roboto/Roboto Slab typography are the design inputs. Application colors, supporting hues, and the ice-crystal mark are developed for this theme.

The implementation begins with tooling from [Martlet Theme](https://github.com/martlettheme/martlettheme), including generation, color measurement, application exports, interactive references, and privacy controls. Krigsvold has its own palette, branding, CSS namespace, website composition, and consent cookie.

The original code, theme definitions, and new ice-crystal mark are MIT licensed. The James Howard identity badge retains its separate rights. Local fonts include their license notices: SIL Open Font License 1.1 for Roboto, and Apache License 2.0 for Roboto Slab.

Analytics uses the owner's shared `G-FSDET4HG4L` ID only after acceptance. `PUBLIC_GA_ID` overrides it, and an explicitly blank value disables it. See [docs/privacy.md](docs/privacy.md) and the website notice.

## Application packages

The public distribution repositories are [krigsvoldtheme/npm](https://github.com/krigsvoldtheme/npm), [krigsvoldtheme/vim](https://github.com/krigsvoldtheme/vim), [krigsvoldtheme/emacs](https://github.com/krigsvoldtheme/emacs), [krigsvoldtheme/chrome](https://github.com/krigsvoldtheme/chrome), and [krigsvoldtheme/firefox](https://github.com/krigsvoldtheme/firefox). Each includes a canonical color snapshot, a dependency-free build, verification, and installation instructions. Both Light and Dark are included. The website Downloads section serves the archives.

The npm package is named `@krigsvoldtheme/theme`; it is prepared but not yet published to the registry. Chrome Web Store and Mozilla Add-ons publication are also pending, and Firefox archives are unsigned. ChatGPT/Codex desktop presets under `ports/chatgpt/` provide manual Appearance settings; native import serialization awaits an exported app theme.

Run `npm run build` to generate all formats, including standalone distribution directories under `artifacts/repositories/`. See [distribution maintenance](docs/distributions.md).
