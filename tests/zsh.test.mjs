import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,readFileSync,existsSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {themes} from '../src/palettes.mjs';
import {zshTheme} from '../src/zsh-theme.mjs';

const family=themes.dark.id.replace(/-dark$/,'');
const hook='_'+family+'_precmd';
const root=mkdtempSync(join(tmpdir(),family+'-zsh-'));
const files=Object.fromEntries(Object.values(themes).map(t=>{
  const file=join(root,t.id+'.zsh-theme');
  writeFileSync(file,zshTheme(t));return [t.mode,file];
}));
process.on('exit',()=>rmSync(root,{recursive:true,force:true}));
function run(command,args,options={}) {
  const r=spawnSync(command,args,{encoding:'utf8',...options});
  assert.equal(r.error,undefined,`${command} must be installed for prompt verification`);
  assert.equal(r.status,0,r.stderr+'\n'+r.stdout);return r.stdout;
}
const zsh=run('zsh',['-dfc','print -r -- "$commands[zsh]"']).trim();
function shell(body='',{cwd=root,mode='dark',env={}}={}) {
  return run(zsh,['-dfc',`source "$THEME_FILE"\n${body}`],{cwd,env:{...process.env,THEME_FILE:files[mode],LIGHT_FILE:files.light,TERM:'xterm-256color',COLORTERM:'truecolor',...env}});
}
const plain=s=>s.replace(/\x1b\[[0-9;]*m/g,'');
const prompt=`${hook}; print -P -- "$PROMPT"`;
function repo(name) {
 const dir=join(root,name);run('git',['init','-q','-b','main',dir]);
 run('git',['config','user.email','prompt-test@example.invalid'],{cwd:dir});
 run('git',['config','user.name','Prompt Test'],{cwd:dir});
 writeFileSync(join(dir,'tracked'),'original\n');
 run('git',['add','tracked'],{cwd:dir});run('git',['commit','-qm','Initial'],{cwd:dir});return dir;
}

for(const t of Object.values(themes)) test(`${t.name} generates valid standalone Zsh with canonical colors`,()=>{
 run('zsh',['-n',files[t.mode]]);
 const output=shell(prompt,{mode:t.mode});
 assert.ok(output.includes('\x1b['));
 assert.match(plain(output),/[>#] /);
 assert.ok(readFileSync(files[t.mode],'utf8').includes(t.tokens.accent));
 assert.equal(readFileSync(files[t.mode],'utf8').includes('__FAMILY__'),false);
});
test('non-repositories, command failures, and missing Git remain usable',()=>{
 assert.doesNotMatch(plain(shell(prompt)),/\[/);
 assert.match(plain(shell(`false; ${hook}; print -P -- "$PROMPT"`)),/exit 1/);
 assert.doesNotMatch(plain(shell(`true; ${hook}; print -P -- "$PROMPT"`)),/exit 0/);
 assert.doesNotMatch(shell(prompt,{env:{PATH:'/no-external-commands'}}),/command not found/);
});
test('Git branch, staged, unstaged, and untracked entries appear and opt-out works',()=>{
 const dir=repo('git-states');
 assert.match(plain(shell(prompt,{cwd:dir})),/\[main\]/);
 writeFileSync(join(dir,'new'),'new\n');run('git',['add','new'],{cwd:dir});
 writeFileSync(join(dir,'tracked'),'modified\n');writeFileSync(join(dir,'loose'),'untracked\n');
 const output=plain(shell(prompt,{cwd:dir}));
 for(const marker of ['main','+1','~1','?1']) assert.ok(output.includes(marker),output);
 assert.doesNotMatch(plain(shell(prompt,{cwd:dir,env:{[family.toUpperCase()+'_GIT']:'0'}})),/\[main/);
});
test('unborn and detached repositories have sensible labels',()=>{
 const unborn=join(root,'unborn');run('git',['init','-q','-b','begin',unborn]);
 assert.match(plain(shell(prompt,{cwd:unborn})),/\[begin\]/);
 const dir=repo('detached');run('git',['checkout','--detach','-q'],{cwd:dir});
 assert.match(plain(shell(prompt,{cwd:dir})),/\[detached\]/);
});
test('merge conflicts are distinct from ordinary edits',()=>{
 const dir=repo('conflict');run('git',['checkout','-qb','other'],{cwd:dir});
 writeFileSync(join(dir,'tracked'),'other\n');run('git',['commit','-qam','Other'],{cwd:dir});
 run('git',['checkout','-q','main'],{cwd:dir});writeFileSync(join(dir,'tracked'),'main\n');run('git',['commit','-qam','Main'],{cwd:dir});
 const merge=spawnSync('git',['merge','other'],{cwd:dir,encoding:'utf8'});assert.equal(merge.status,1);
 assert.match(plain(shell(prompt,{cwd:dir})),/x1/);
});
test('branch prompt escapes and shell-looking labels remain literal data',()=>{
 const dir=repo('literal-branch');
 const branch='$(touch${IFS}oops)-%F{red}';run('git',['branch','-m',branch],{cwd:dir});
 const output=plain(shell(prompt,{cwd:dir}));
 assert.ok(output.includes(branch),output);assert.equal(existsSync(join(dir,'oops')),false);
 const other='`touch${IFS}oops`-%n';run('git',['branch','-m',other],{cwd:dir});
 assert.ok(plain(shell(prompt,{cwd:dir})).includes(other));assert.equal(existsSync(join(dir,'oops')),false);
});
test('re-sourcing and switching variants retain unrelated hooks without duplication',()=>{
 const other=family==='martlet'?'_krigsvold_precmd':'_martlet_precmd';
 const output=shell(`other_hook() { return 0; }; ${other}() { return 0; }; add-zsh-hook precmd other_hook; add-zsh-hook precmd ${other}; source "$THEME_FILE"; source "$LIGHT_FILE"; print -l -- "\${precmd_functions[@]}"`);
 const hooks=output.trim().split('\n');assert.equal(hooks.filter(x=>x===hook).length,1);assert.ok(hooks.includes('other_hook'));assert.ok(!hooks.includes(other));
});
test('layouts are distinct and Krigsvold adds remote identity only on SSH',()=>{
 const output=plain(shell(prompt));
 assert.equal(output.trimEnd().split('\n').length,family==='martlet'?2:1);
 if(family==='krigsvold') {
  assert.doesNotMatch(output,/@/);
  const remote=shell(prompt,{env:{SSH_CONNECTION:'test-connection'}});
  assert.match(plain(remote),/@/);assert.doesNotMatch(remote,/\$\{_krigsvold_color/);
 }
});

test('non-truecolor terminals use ANSI palette slots instead of RGB sequences',()=>{
 const ansi=shell(prompt,{env:{COLORTERM:''}});
 assert.ok(ansi.includes('\x1b['));assert.doesNotMatch(ansi,/\x1b\[38;2;/);
 assert.match(shell(prompt),/\x1b\[38;2;/);
});
