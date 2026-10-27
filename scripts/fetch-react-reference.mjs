import {readFile,writeFile,mkdtemp,rm,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
const reference=JSON.parse(await readFile('site/react-reference.json','utf8'));
if(!/^[a-f0-9]{64}$/.test(reference.sha256))throw new Error('React reference must pin a SHA-256.');
if(!['https://github.com/k3jph/design-workbench/releases/download/','https://github.com/howardjp/design-workbench/releases/download/'].some(prefix=>reference.archiveUrl.startsWith(prefix)))throw new Error('Unexpected React reference publisher.');
const dir=await mkdtemp(join(tmpdir(),'react-reference-'));
try {
 const bytes=process.env.DESIGN_REACT_ARCHIVE?await readFile(process.env.DESIGN_REACT_ARCHIVE):Buffer.from(await (async()=>{const r=await fetch(reference.archiveUrl,{signal:AbortSignal.timeout(60000)});if(!r.ok)throw new Error('React reference download failed: '+r.status);return r.arrayBuffer();})());
 if(createHash('sha256').update(bytes).digest('hex')!==reference.sha256)throw new Error('React reference archive digest mismatch.');
 const archive=join(dir,'reference.tar.gz');await writeFile(archive,bytes);
 const paths=execFileSync('tar',['-tzf',archive],{encoding:'utf8'}).trim().split('\n');
 if(paths.some(path=>!path.startsWith('react/')||path.includes('\\')||path.split('/').includes('..')))throw new Error('React reference archive path escapes its subtree.');
 const listing=execFileSync('tar',['-tvzf',archive],{encoding:'utf8'}).trim().split('\n');
 if(listing.some(line=>!['-','d'].includes(line[0])))throw new Error('React reference archive may contain only files and directories.');
 await rm('site/public/react',{recursive:true,force:true});await mkdir('site/public',{recursive:true});
 execFileSync('tar',['-xzf',archive,'--directory',resolve('site/public'),'--no-same-owner','--no-same-permissions']);
 const metadata=JSON.parse(await readFile('site/public/react/preview.json','utf8'));
 if(metadata.sourceCommit!==reference.sourceCommit||metadata.family!==reference.family||metadata.base!=='/react/')throw new Error('React reference provenance mismatch.');
 console.log(reference.family+': verified public React '+metadata.preview.version+' from '+reference.sourceCommit);
}finally{await rm(dir,{recursive:true,force:true});}
