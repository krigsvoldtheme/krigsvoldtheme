import { version as coreVersion, foundation, design, capabilities, themes, heritage, layout } from '@krigsvold/theme';
import { version as astroVersion, peerDependencies } from '@krigsvold/astro/package.json';
export function GET() {
  return new Response(JSON.stringify({
    schemaVersion: 1,
    family: 'krigsvold',
    packages: { core: {name: '@krigsvold/theme', version: coreVersion}, astro: {name: '@krigsvold/astro', version: astroVersion, peerDependencies} },
    foundation, design, capabilities, themes, heritage, layout,
  }, null, 2) + '\n', {headers: {'Content-Type': 'application/json; charset=utf-8'}});
}
