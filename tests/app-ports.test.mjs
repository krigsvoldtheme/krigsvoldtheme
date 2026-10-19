import test from 'node:test';
import assert from 'node:assert/strict';
import {themes} from '../src/palettes.mjs';
import {contrastRatio} from '../src/contrast.mjs';
import {vimTheme,emacsTheme,chromeTheme,firefoxTheme,chatgptPreset,chatgptImport,xterm256} from '../src/app-ports.mjs';
for(const theme of Object.values(themes)){
 test(theme.name+' maps editor and browser surfaces to the canonical palette',()=>{
  assert.match(vimTheme(theme,'1.0.0'),new RegExp('Normal guifg='+theme.tokens.text+' guibg='+theme.tokens.bg));
  assert.ok(emacsTheme(theme,'1.0.0').includes(`'(default ((t (:foreground "${theme.tokens.text}" :background "${theme.tokens.bg}"`));
  assert.deepEqual(chromeTheme(theme,'1.0.0').theme.colors.toolbar,[1,3,5].map(i=>parseInt(theme.tokens.bg.slice(i,i+2),16)));
  const p=chatgptPreset(theme,'1.0.0');assert.equal(p.background,theme.tokens.bg);assert.equal(p.accent,theme.tokens.accent);assert.equal(p.format,'appearance-settings');
 });
 test(theme.name+' uses valid terminal approximations and readable editor pairs',()=>{
  for(const hex of Object.values(theme.tokens).filter(x=>/^#[\da-f]{6}$/i.test(x))){const n=xterm256(hex);assert.ok(n>=16&&n<=255);}
  for(const fg of ['text','syntax-keyword','syntax-string','syntax-function','syntax-comment'])assert.ok(contrastRatio(theme.tokens[fg],theme.tokens.bg)>=4.5,fg);
 });
}
test('Firefox bundles both modes with stable extension ID and no executable capabilities',()=>{
 const family=themes.light.id.replace(/-light$/,'');const m=firefoxTheme(themes,family,'1.0.0');
 assert.equal(m.theme.colors.toolbar,themes.light.tokens.bg);assert.equal(m.dark_theme.colors.toolbar,themes.dark.tokens.bg);
 assert.equal(m.browser_specific_settings.gecko.id,`${family}-theme@${family}theme.dev`);
 for(const key of ['permissions','host_permissions','content_scripts','background'])assert.equal(m[key],undefined);
});

for(const t of Object.values(themes)) test(t.name+' serializes the desktop export contract',()=>{
 const value=chatgptImport(t);
 assert.ok(value.startsWith('codex-theme-v1:'));
 const p=JSON.parse(value.slice('codex-theme-v1:'.length));
 assert.deepEqual(Object.keys(p).sort(),['codeThemeId','theme','variant']);
 assert.equal(p.codeThemeId,'codex');assert.equal(p.variant,t.mode);
 assert.deepEqual(Object.keys(p.theme).sort(),['accent','accentSource','contrast','fonts','ink','opaqueWindows','semanticColors','surface']);
 assert.equal(p.theme.surface,t.tokens.bg);assert.equal(p.theme.ink,t.tokens.text);assert.equal(p.theme.accent,t.tokens.accent);
 assert.equal(p.theme.accentSource,'chatgpt');assert.equal(p.theme.opaqueWindows,true);
 assert.deepEqual(p.theme.fonts,{code:null,ui:null});
 assert.deepEqual(p.theme.semanticColors,{diffAdded:t.tokens.success,diffRemoved:t.tokens.danger,skill:t.tokens['syntax-decorator']});
 assert.equal(p.theme.contrast,t.mode==='light'?45:60);
 assert.equal('codex-theme-v1:'+JSON.stringify(p),value);
});
