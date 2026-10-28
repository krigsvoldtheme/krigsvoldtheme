import {readFile,writeFile} from 'node:fs/promises';
const html=await readFile('dist/index.html','utf8');
const header=html.match(/<header class="site-header[\s\S]*?<\/header>/)?.[0] || html.match(/<div class="nav-shell">[\s\S]*?<\/nav>\s*<\/div>\s*<\/div>/)?.[0];
const footer=html.match(/<footer class="site-footer[\s\S]*?<\/footer>/)?.[0];
if(!header||!footer)throw Error('Shared shell chrome missing');
const data=JSON.stringify({header,footer},null,2)+'\n';
await writeFile('site/public/shell/chrome.json',data);await writeFile('dist/shell/chrome.json',data);
