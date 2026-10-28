import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
import {resolve,dirname} from 'node:path';
import {createHash} from 'node:crypto';
import {themes} from '../src/palettes.mjs';
const family="krigsvold";
async function flatten(path) {
 const css=await readFile(path,'utf8');let out='';let at=0;
 for(const match of css.matchAll(/@import ['"]([^'"]+)['"];?/g)) {
  out+=css.slice(at,match.index)+await flatten(match[1].startsWith('.')?resolve(dirname(path),match[1]):require.resolve(match[1]));at=match.index+match[0].length;
 }
 return out+css.slice(at);
}
await mkdir('site/public/shell',{recursive:true});
const palette=family==='martlet'?`html[data-appearance="dark"] .specimen-book {${Object.entries(themes.dark.tokens).map(([k,v])=>`--martlet-${k}:${v}`).join(';')}}` : '';
await writeFile('site/src/styles/appearance-palette.css',palette+'\n');
const css=await flatten(resolve('site/src/styles/shell.css'));
await writeFile(`site/public/shell/${family}-shell.css`,css);
await writeFile('site/public/shell/manifest.json',JSON.stringify({family,format:1,sha256:createHash('sha256').update(css).digest('hex'),stylesheet:`${family}-shell.css`,contract:'docs/source-shell/CONTRACT.md'},null,2)+'\n');
