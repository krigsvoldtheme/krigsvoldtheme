# Layout integration

This branch consumes published registry packages `@krigsvold/theme@2.1.0` and `@krigsvold/astro@1.1.0`. The temporary candidate archives have been removed. The gallery, standalone article/landing/documentation pages, and design-system reference use the actual installed packages.

Package releases:

- https://github.com/krigsvoldtheme/npm/releases/tag/v2.1.0
- https://github.com/krigsvoldtheme/astro/releases/tag/v1.1.0

Before merging, require a clean `npm ci`, all package and browser checks, and successful deployment validation. The originating production site remains on its existing published dependencies until demonstration-site validation is complete.

Future stable GitHub releases publish through npm trusted publishing after verification. The package repositories document the publisher settings and release order in `docs/releasing.md`.
