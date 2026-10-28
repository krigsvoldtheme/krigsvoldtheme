import { themes } from '../../../src/palettes.mjs';
import { contrastRatio } from '../../../src/contrast.mjs';

const exampleButtons=[...document.querySelectorAll('[data-example]')];
for(const button of exampleButtons) button.addEventListener('click',()=>{
  exampleButtons.forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
  document.querySelectorAll('[data-example-panel]').forEach(panel=>{panel.hidden=panel.dataset.examplePanel!==button.dataset.example;});
});
document.querySelectorAll('[data-show-note]').forEach(button=>button.addEventListener('click',()=>{
  const open=button.getAttribute('aria-expanded')!=='true';
  button.setAttribute('aria-expanded',String(open));
  document.getElementById(button.getAttribute('aria-controls')).hidden=!open;
}));

let mode='light';
const modeButtons=[...document.querySelectorAll('[data-mode]')];
const search=document.getElementById('token-search');
const category=document.getElementById('token-category');
const rows=[...document.querySelectorAll('[data-token]')];
const foreground=document.getElementById('contrast-foreground');
const background=document.getElementById('contrast-background');

function filterTokens() {
  const query=search.value.trim().toLowerCase().replace(/^--krigsvold-/,'');
  let visible=0;
  for(const row of rows) {
    row.hidden=!row.dataset.token.includes(query)||(category.value!=='all'&&row.dataset.category!==category.value);
    if(!row.hidden) visible++;
  }
  document.getElementById('token-count').textContent=`${visible} ${visible===1?'token':'tokens'} · ${mode==='light'?'Light':'Dark'} palette`;
  document.getElementById('no-tokens').hidden=visible!==0;
}
function updateContrast() {
  const tokens=themes[mode].tokens, fg=tokens[foreground.value],bg=tokens[background.value];
  const sample=document.getElementById('contrast-sample');
  sample.style.color=fg;sample.style.backgroundColor=bg;
  const ratio=contrastRatio(fg,bg);
  document.getElementById('contrast-ratio').textContent=ratio.toFixed(2)+':1';
  document.getElementById('contrast-verdict').textContent=ratio>=7?'AA and AAA for normal text':ratio>=4.5?'AA for normal text':ratio>=3?'AA for large text only':'Below AA for text';
}
for(const button of modeButtons) button.addEventListener('click',()=>{
  mode=button.dataset.mode;
  document.getElementById('workbench').dataset.krigsvold=mode;
  document.querySelectorAll('.theme-specimen').forEach(panel=>{panel.hidden=panel.dataset.krigsvold!==mode;});
  document.querySelector('[data-mode-label]').textContent=`${mode==='light'?'Light':'Dark'} · 88 roles`;
  modeButtons.forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
  for(const row of rows) {
    const value=row.dataset[mode];
    row.querySelector('.token-value code').textContent=value;
    const chip=row.querySelector('.token-color');
    if(row.dataset.token==='shadow') chip.style.boxShadow=value;
    else chip.style.background=value;
    const copy=row.querySelector('[data-copy]');copy.dataset.copy=value;
    copy.setAttribute('aria-label',`Copy ${row.dataset.token} ${value}`);
  }
  filterTokens();updateContrast();
});
search.addEventListener('input',filterTokens);category.addEventListener('change',filterTokens);
foreground.addEventListener('change',updateContrast);background.addEventListener('change',updateContrast);

const feedback=document.getElementById('copy-status');
const copyDialog=document.getElementById('copy-dialog');
const copyValue=document.getElementById('copy-value');
let copyOpener=null,feedbackTimeout;
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
  const value=button.dataset.copy;
  try {
    if(!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(value);
    clearTimeout(feedbackTimeout);feedback.textContent=`Copied ${button.dataset.copyLabel || value}`;
    feedbackTimeout=setTimeout(()=>{feedback.textContent='';},3500);
  } catch {
    copyOpener=button;copyValue.value=value;copyDialog.showModal();copyValue.focus();copyValue.select();
  }
}));
document.querySelector('[data-copy-close]').addEventListener('click',()=>copyDialog.close());
copyDialog.addEventListener('close',()=>copyOpener?.focus());

const workspacePanels=[...document.querySelectorAll('[data-workspace-panel]')];
const workspaceLinks=[...document.querySelectorAll('[data-workspace-link]')];
function showWorkspace(id) {
  for(const panel of workspacePanels) panel.hidden=panel.id!==id;
  for(const link of workspaceLinks) {
    if(link.dataset.workspaceLink===id) link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  }
}
function readWorkspaceLocation() {
  const id=location.hash.slice(1);
  if(workspacePanels.some(panel=>panel.id===id)) showWorkspace(id);
  else if(id==='story') document.getElementById('story').open=true;
  else showWorkspace('preview');
}
for(const link of workspaceLinks) link.addEventListener('click',()=>showWorkspace(link.dataset.workspaceLink));
// Reveal a hidden section before native anchor scrolling takes place.

window.addEventListener('hashchange',readWorkspaceLocation);
showWorkspace('preview');
readWorkspaceLocation();
