import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
test('source shell remains a verifiable snapshot',async()=>{
 const manifest=JSON.parse(await readFile('docs/source-shell/manifest.json','utf8'));
 assert.match(manifest.commit,/^[a-f0-9]{40}$/);
 for(const [path,expected] of Object.entries(manifest.files)) {
  assert.equal(createHash('sha256').update(await readFile('docs/source-shell/upstream/'+path)).digest('hex'),expected,path);
  if(path.startsWith('src/styles/')) assert.deepEqual(await readFile('site/src/styles/origin/'+path.split('/').at(-1)),await readFile('docs/source-shell/upstream/'+path));
 }
});
