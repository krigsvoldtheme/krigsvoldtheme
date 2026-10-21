import {readFile,writeFile,mkdir,cp,readdir} from 'node:fs/promises';
import {join,dirname} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {themes,heritage,design} from '../src/palettes.mjs';
import {chatgptPreset,chatgptImport} from '../src/app-ports.mjs';
const {version}=JSON.parse(await readFile('package.json','utf8'));
const family=themes.light.id.replace(/-light$/,''),org=family+'theme',label=themes.light.name.replace(/ Light$/,'');
const kinds=['vim','emacs','chrome','firefox'];
const source={family,label,version,themes,heritage,design};
const license=await readFile('LICENSE','utf8');
const build=await readFile(new URL('./templates/build-port.mjs',import.meta.url),'utf8');
const verify=await readFile(new URL('./templates/verify-port.mjs',import.meta.url),'utf8');
const ports=await readFile('src/app-ports.mjs','utf8');
const json=x=>JSON.stringify(x,null,2)+'\n';
const common=`These are generated distributions of [${label} Theme](https://${org}.dev/), version ${version}. Canonical theme definitions live in [${org}/npm](https://github.com/${org}/npm); application generators live in [${org}/${org}](https://github.com/${org}/${org}). The source repository may require maintainer access. This repository includes a complete color snapshot in source.json and can build without access to that repository.\n\nMIT license. Copyright 2026 James P. Howard, II.\n\n## Maintenance\n\nEdit the canonical palette and generator upstream, then run npm run build there. The complete distribution directories are emitted under artifacts/repositories/. Sync the relevant directory into this repository. To reproduce a snapshot here, run npm run build, then npm test. Node.js 22 or newer is used in CI. No registry publication runs automatically.\n`;
for(const kind of kinds){
 const root=join('artifacts/repositories',kind);await mkdir(join(root,'scripts'),{recursive:true});
 const save=async(p,s)=>{await mkdir(dirname(join(root,p)),{recursive:true});await writeFile(join(root,p),s);};
 await save('source.json',json({...source,kind}));await save('LICENSE',license);await save('scripts/build.mjs',build);await save('scripts/app-ports.mjs',ports);await save('scripts/verify.test.mjs',verify);
 await save('.gitignore',kind==='npm'?'node_modules/\n*.tgz\n':'node_modules/\ndist/\n*.elc\n');
 let pkg={name:`${family}-${kind}-source`,version,private:true,type:'module',license:'MIT',scripts:{build:'node scripts/build.mjs',test:'node --test scripts/verify.test.mjs'}};
 let readme=`# ${label} for ${kind==='npm'?'web projects':kind==='vim'?'Vim and Neovim':kind==='emacs'?'Emacs':kind==='chrome'?'Chrome':'Firefox'}\n\n`;
 if(kind==='vim') readme+=`## Install\n\nFor Vim's native package loader:\n\n\`\`\`sh\ngit clone https://github.com/${org}/vim.git ~/.vim/pack/themes/start/${family}\n\`\`\`\n\nFor Neovim's native package loader:\n\n\`\`\`sh\ngit clone https://github.com/${org}/vim.git ~/.local/share/nvim/site/pack/themes/start/${family}\n\`\`\`\n\nOr add \`${org}/vim\` to your plugin manager. The root \`colors/\` layout supports both editors.\n\n\`\`\`vim\nset termguicolors\nset background=dark\ncolorscheme ${family}\n\`\`\`\n\nChoose Light with \`set background=light\` before \`colorscheme ${family}\`. Explicit names \`${family}-light\` and \`${family}-dark\` also work. Neovim Lua: \`vim.cmd.colorscheme('${family}-dark')\`. GUI/truecolor uses the exact canonical hex colors; 256-color terminals use nearest xterm approximations. Standard syntax, editor chrome, diffs, diagnostics, and Neovim Treesitter/LSP capture links are included. Requires Vim 8+ or Neovim 0.9+; exact capture coverage depends on parser/plugin versions.\n\nFor a manual installation, copy all three files from \`colors/\` into your editor's colors directory. Run tests with full Vim and Neovim installed.\n\n`;
 if(kind==='emacs') readme+=`## Install\n\nCopy both \`-theme.el\` files into \`~/.emacs.d/themes/\`, then add to your init file:\n\n\`\`\`elisp\n(add-to-list 'custom-theme-load-path\n             (expand-file-name "themes/" user-emacs-directory))\n(load-theme '${family}-dark t)\n\`\`\`\n\nUse \`${family}-light\` for Light. Disable the current theme with \`M-x disable-theme\` before switching, to avoid layering theme faces. The \`t\` bypasses the confirmation prompt; use it after reviewing the theme source.\n\nAlternatively clone this repository and add its directory to \`custom-theme-load-path\`. \`${family}-themes.el\` registers its own directory when loaded. Emacs 27.1+ is required. Includes standard font-lock, editor UI, Org, diff, completion, and ANSI faces. GUI and truecolor terminals provide the closest match; limited-color terminals approximate colors. Not yet submitted to MELPA.\n\n`;
 if(kind==='chrome') readme+=`## Test locally\n\nRun \`npm run build\`. Open \`chrome://extensions\`, enable Developer mode, choose **Load unpacked**, and select \`themes/light\` or \`themes/dark\`. Only one Chrome theme is active at a time. These themes color browser chrome and new-tab surfaces; they do not recolor websites.\n\n## Packages\n\nBuild produces \`dist/${family}-light-chrome.zip\` and \`dist/${family}-dark-chrome.zip\`, each with manifest.json at its root. These are Chrome Web Store upload archives, not one-click signed installers. They contain no scripts, permissions, tracking, fonts, or remote assets. Manifest V3. Store registration, listing screenshots, review, and publication remain to do. Chrome may retain system colors on browser-controlled surfaces.\n\n`;
 if(kind==='firefox') readme+=`## Test locally\n\nRun \`npm run build\`. Open \`about:debugging#/runtime/this-firefox\`, choose **Load Temporary Add-on**, and select \`theme/manifest.json\`. The temporary theme is removed when Firefox restarts. Use Firefox 142+ and test both appearance modes.\n\n## Package\n\nBuild produces \`dist/${family}-firefox.zip\` for Mozilla Add-ons submission. Light and Dark are bundled together using \`theme\` and \`dark_theme\`; Firefox selects the appropriate variant. No JavaScript, permissions, tracking, fonts, or remote assets. This is an unsigned source archive; permanent installation requires Mozilla signing, which is not done yet. Store listing, screenshots, signing, and publication remain to do. The manifest declares no data collection. These colors apply to browser UI, not arbitrary website content.\n\n`;
 await save('README.md',readme+common);await save('package.json',json(pkg));
 let apt=kind==='vim'?'      - run: sudo apt-get update && sudo apt-get install -y vim neovim\n':kind==='emacs'?'      - run: sudo apt-get update && sudo apt-get install -y emacs-nox\n':'';
 const lint=kind==='firefox'?'      - run: npx --yes web-ext@10 lint --source-dir theme --warnings-as-errors\n':'';
 await save('.github/workflows/verify.yml',`name: Verify ${label} ${kind}\non: [push, pull_request]\npermissions:\n  contents: read\njobs:\n  verify:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: '22'\n${apt}      - run: npm run build\n      - run: npm test\n${kind==='npm'?'      - run: npm pack --dry-run\n':''}${lint}      - run: git diff --exit-code\n      - uses: actions/upload-artifact@v4\n        with:\n          name: ${family}-${kind}\n          path: dist/\n`);
 execFileSync(process.execPath,['scripts/build.mjs'],{cwd:root,stdio:'pipe'});
 {
  for(const file of await readdir(join(root,'dist')))for(const dir of ['artifacts','site/public/downloads']) await cp(join(root,'dist',file),join(dir,file));
  // Commit native port outputs to the canonical source repository as well.
  for(const path of kind==='vim'?[`colors/${family}.vim`,...Object.values(themes).map(t=>`colors/${t.id}.vim`)]:kind==='emacs'?[`${family}-themes.el`,...Object.values(themes).map(t=>`${t.id}-theme.el`)]:kind==='chrome'?['themes/light/manifest.json','themes/dark/manifest.json']:['theme/manifest.json']){
   await mkdir(dirname(join('ports',kind,path)),{recursive:true});await cp(join(root,path),join('ports',kind,path));
   if(kind==='vim'&&path.includes('-')) await cp(join(root,path),join('site/public/downloads',path.split('/').at(-1)));
   if(kind==='emacs'&&path.endsWith('-theme.el'))await cp(join(root,path),join('site/public/downloads',path));
  }
 }
}
await mkdir('ports/chatgpt',{recursive:true});
for(const t of Object.values(themes)){
 const body=json(chatgptPreset(t,version));
 for(const dir of ['ports/chatgpt','artifacts','site/public/downloads']){
  await writeFile(join(dir,t.id+'-chatgpt.json'),body);
  await writeFile(join(dir,t.id+'-chatgpt.txt'),chatgptImport(t)+'\n');
 }
}
console.log(`Generated ${label} Vim, Emacs, Chrome, Firefox, and ChatGPT presets.`);


// Download the exact installed core, never synthesize an alternative npm package.
const require=createRequire(import.meta.url);
const coreRoot=dirname(require.resolve('@krigsvold/theme/package.json'));
const packed=JSON.parse(execFileSync('npm',['pack','--ignore-scripts','--json','--pack-destination',process.cwd()],{cwd:coreRoot,encoding:'utf8',stdio:['ignore','pipe','pipe']}))[0].filename;
for(const dir of ['artifacts','site/public/downloads'])await cp(packed,join(dir,packed));
await import('node:fs/promises').then(fs=>fs.rm(packed));
