# Krigsvold architecture

## Color sources and roles

`references/krigsvold-source.css` preserves the supplied website stylesheet unchanged. Its twelve source color values are exported as `heritage` in `src/palettes.mjs`. The property name reflects the shared token schema; it does not assert a historical heraldic provenance for those colors.

Each Light/Dark theme has 88 semantic roles. The Light background preserves warm paper; Dark preserves navy 950. Blue 600 drives Light interactions, while ice 400 drives Dark interactions. Bronze is secondary. The source bronze is preserved as a reference; darker relatives support readable Light text.

## Generated formats

- `scripts/generate.mjs` creates CSS, JSON, starter editor/ANSI outputs, and native Terminal.app profiles.
- `src/ports.mjs` translates role choices into editor and terminal colors.
- `src/terminal-app.mjs` produces native XML profiles containing binary keyed NSColor archives.
- `ports/terminal-app/` contains repository copies of the generated native profiles.
- The package version is the single source for site and exported release labels.

CSS uses `data-krigsvold="light|dark"` and `--krigsvold-*`, keeping it independent of a particular application's DOM. Roles must exist in both modes. Generated outputs are not hand-edited.

## Website

The Astro website opens with a geometric ice landscape drawn from the source palette and a twelve-color copyable ribbon. A single workbench has Preview, Color lab, and Downloads views, addressed by URL hashes and native anchor links. JavaScript reveals one view at a time; without JavaScript all three remain readable. Browser Back/Forward and direct links restore the selected view. One appearance control updates the workbench, specimen, reference values, and contrast inspector together. The Color lab leads with foreground/background pairing, then the searchable reference. Local Roboto Slab/Roboto fonts and an original ice-crystal mark complete the identity.

## Verification scope

Tests cover a defined set of text/background pairs at 4.5:1, Light ANSI text against its background, and all archived colors in each Terminal.app profile. Browser checks exercise privacy controls, the specimen desk, copying, filtering, contrast calculations, icons, and responsive widths. These are scoped checks, not a guarantee for arbitrary color combinations or every application. Terminal.app import and rendering on macOS remain unverified here.

The code began with Martlet's reusable tooling. The Krigsvold palette and layout are maintained independently. Planned domain: `krigsvoldtheme.dev`; DNS and hosting are separate release operations.
