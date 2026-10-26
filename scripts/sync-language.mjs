import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,join} from 'node:path';
const dir='docs/language';
const snapshot=JSON.parse(await readFile(join(dir,'snapshot.json'),'utf8'));
const hash=s=>createHash('sha256').update(s).digest('hex');
if(process.argv[2] && process.argv[2] !== '--check') {
 const commit=process.argv[3];if(!/^[a-f0-9]{40}$/.test(commit??''))throw new Error('Provide the full canonical commit.');
 const source=resolve(process.argv[2]);await mkdir(dir,{recursive:true});
 for(const [name,file] of Object.entries(snapshot.files)) {const content=await readFile(join(source,file.sourcePath),'utf8');await writeFile(join(dir,name),content);file.sha256=hash(content);}
 snapshot.commit=commit;await writeFile(join(dir,'snapshot.json'),JSON.stringify(snapshot,null,2)+'\n');
}
if(!/^[a-f0-9]{40}$/.test(snapshot.commit))throw new Error('Language snapshot must pin a complete canonical commit.');
for(const [name,file] of Object.entries(snapshot.files))if(hash(await readFile(join(dir,name),'utf8'))!==file.sha256)throw new Error('Language snapshot drift: '+name);
const headingView=content=>content.replace(/^(#{1,5}) /gm,'$1# ').split(/\n\n+/).map(block=>block.startsWith('|') ? '<div class="reference-table" role="region" tabindex="0" aria-label="Source role decisions">\n\n'+block+'\n\n</div>' : block).join('\n\n');
for(const name of ['grammar','decisions','coverage','forms','query-results','native-html','form-styling']) {
 const view='site/src/data/language-'+name+'.md', expected=headingView(await readFile(join(dir,name+'.md'),'utf8'));
 if(process.argv[2] !== '--check') await writeFile(view,expected);
 if(await readFile(view,'utf8')!==expected)throw new Error('Language heading view drift: '+name);
}
console.log('Verified canonical language snapshot '+snapshot.repository+'@'+snapshot.commit);
