import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {themes,heritage,design} from '../src/palettes.mjs';
import {terminal,vscode} from '../src/ports.mjs';
import {terminalApp} from '../src/terminal-app.mjs';
import {zshTheme} from '../src/zsh-theme.mjs';
const {version}=JSON.parse(await readFile(new URL('../package.json',import.meta.url),'utf8'));
const outputs=['artifacts','site/public/downloads'];
const banner=`/* Krigsvold Theme ${version}. Generated from src/palettes.mjs. Do not edit directly. */\n`;
const rule=t=>'[data-krigsvold="'+t.mode+'"] {\n  color-scheme: '+t.mode+';\n'+Object.entries(t.tokens).map(([k,v])=>'  --krigsvold-'+k+': '+v.toLowerCase()+';').join('\n')+'\n}\n';
const modes=Object.values(themes);
for(const dir of outputs){
 await mkdir(dir,{recursive:true});
 const save=(name,s)=>writeFile(join(dir,name),s,'utf8');
 await Promise.all([
  save('krigsvold.css',banner+modes.map(rule).join('\n')),
  save('krigsvold.json',JSON.stringify({name:'Krigsvold',version,heritage,design,themes},null,2)+'\n'),
  ...modes.flatMap(t=>[
    save(t.id+'.css',banner+rule(t)),
    save(t.id+'.json',JSON.stringify({version,...t},null,2)+'\n'),
    save(t.id+'-terminal.json',JSON.stringify({version,...terminal(t)},null,2)+'\n'),
    save(t.id+'.terminal',terminalApp(t)),
    save(t.id+'.zsh-theme',zshTheme(t,version)),
    save(t.id+'-vscode.json',JSON.stringify(vscode(t),null,2)+'\n')])
 ]);
}
await mkdir('ports/terminal-app',{recursive:true});
for(const t of modes) await writeFile(join('ports/terminal-app',t.id+'.terminal'),terminalApp(t),'utf8');
await mkdir('ports/zsh',{recursive:true});
for(const t of modes) await writeFile(join('ports/zsh',t.id+'.zsh-theme'),zshTheme(t,version),'utf8');
console.log('Generated CSS, JSON, native Terminal.app profiles, Zsh prompts, and VS Code theme files.');

await import('./distributions.mjs');
