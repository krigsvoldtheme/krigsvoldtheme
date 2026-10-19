import test from 'node:test';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {themes,heritage} from '../src/palettes.mjs';
import {contrastRatio} from '../src/contrast.mjs';
import {terminal,vscode} from '../src/ports.mjs';
const roles=['bg','panel','panel2','text','muted','accent','accent2','on-accent','accent-hover','line','control-line','focus','selection','selection-text','green','danger','warning','error-bg','error-text','shadow'];
for(const [mode,theme] of Object.entries(themes)){
 test(mode+' has identical role names across modes',()=>assert.deepEqual(Object.keys(theme.tokens),Object.keys(themes[mode==='light'?'dark':'light'].tokens)));
 test(mode+' has all core UI roles',()=>roles.forEach(k=>assert.ok(theme.tokens[k],k)));
 test(mode+' has valid token values',()=>Object.entries(theme.tokens).forEach(([k,v])=>assert.ok(/^#[0-9A-F]{6}(?:[0-9A-F]{2})?$/i.test(v)||/^0 10px 40px #[0-9A-F]{8}$/i.test(v),k+' '+v)));
 test(mode+' tested pairs meet 4.5:1 AA contrast',()=>{
  const t=theme.tokens;
  for(const [a,b] of [['text','bg'],['text','panel'],['text','panel2'],['muted','bg'],['muted','panel'],['muted','panel2'],['accent','bg'],['on-accent','accent'],['link','bg'],['link-visited','bg'],['input-text','input-bg'],['code-text','code-bg'],['button-secondary-text','button-secondary-bg'],['success-text','success-bg'],['warning-text','warning-bg'],['danger-text','danger-bg'],['info-text','info-bg']]) assert.ok(contrastRatio(t[a],t[b])>=4.5,a+'/'+b+' ratio '+contrastRatio(t[a],t[b]).toFixed(2));
 });
 test(mode+' has starter ports',()=>{assert.equal(Object.keys(terminal(theme).ansi).length,16);assert.equal(vscode(theme).type,mode);assert.equal(vscode(theme).colors['editor.background'],theme.tokens.bg);});
}
test('all twelve supplied source colors remain intact',()=>{
 const source=readFileSync(new URL('../references/krigsvold-source.css',import.meta.url),'utf8').split('}')[0];
 const values=[...source.matchAll(/--[a-z0-9-]+:\s*(#[a-f0-9]{6})/ig)].map(m=>m[1].toUpperCase());
 assert.equal(values.length,12);assert.deepEqual(Object.values(heritage),values);
});
