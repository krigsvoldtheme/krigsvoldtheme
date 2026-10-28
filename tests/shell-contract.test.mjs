import {execFileSync} from 'node:child_process';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
async function files(dir){return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?files(dir+'/'+e.name):dir+'/'+e.name))).flat()}
test('reusable Astro styles have one external entry point',async()=>{
 for(const path of await files('site/src'))if(path.endsWith('.astro'))assert.ok(!(await readFile(path,'utf8')).includes('<style'),path+' must not embed a stylesheet');
 const layout=await readFile('site/src/layouts/BaseLayout.astro','utf8');assert.ok(layout.includes("../styles/shell.css"));
});
test('exported shell digest matches its CSS',async()=>{
 execFileSync(process.execPath,['scripts/generate-shell.mjs']);
 const manifest=JSON.parse(await readFile('site/public/shell/manifest.json','utf8'));
 const css=await readFile('site/public/shell/'+manifest.stylesheet);
 assert.equal(createHash('sha256').update(css).digest('hex'),manifest.sha256);
});
