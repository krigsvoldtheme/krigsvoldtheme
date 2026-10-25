import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../worker/index.mjs';
import {readFile} from 'node:fs/promises';
const source=JSON.parse(await readFile(new URL('../worker/source.json',import.meta.url),'utf8'));
const family='krigsvold';
async function rpc(method,params={}) {
 const r=await worker.fetch(new Request('https://krigsvoldtheme.dev/mcp',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json, text/event-stream'},body:JSON.stringify({jsonrpc:'2.0',id:1,method,params})}));
 assert.equal(r.status,200);const text=await r.text();
 const data=r.headers.get('content-type')?.includes('text/event-stream')?JSON.parse(text.split('\n').find(l=>l.startsWith('data: ')).slice(6)):JSON.parse(text);
 assert.ok(!data.error,JSON.stringify(data.error));return data.result;
}
test('independent compiled MCP serves family guidance and leaves static site routing intact',async()=>{
 const health=await (await worker.fetch(new Request('https://krigsvoldtheme.dev/health'))).json();assert.equal(health.family,family);assert.equal(health.sourceCommit,source.commit);assert.equal(health.readOnly,true);
 const tools=(await rpc('tools/list')).tools;assert.equal(tools.length,3);assert.ok(tools.every(t=>t.annotations.readOnlyHint));
 const result=await rpc('tools/call',{name:'get_manifest',arguments:{}}),manifest=JSON.parse(result.content[0].text);assert.equal(manifest.family,family);assert.equal(manifest.references.length,58);assert.match(manifest.sourceCommit,/^[a-f0-9]{40}$/);
 assert.ok(manifest.references.some(r=>r.id==='builder-skill'));
 const absent=await rpc('tools/call',{name:'get_reference',arguments:{id:'../registry.sqlite'}});assert.equal(absent.isError,true);
 assert.equal(await (await worker.fetch(new Request('https://krigsvoldtheme.dev/'),{ASSETS:{fetch:()=>new Response('existing reference')}})).text(),'existing reference');
});
