import {createRequire} from 'node:module';
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const axePath=createRequire(import.meta.url).resolve('axe-core/axe.min.js');
const family=process.env.SHELL_FAMILY||'krigsvold';
const baseline=JSON.parse(await readFile('docs/source-shell/baseline.json','utf8'));
const root=resolve('dist');
const server=createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');const p=resolve(root,'.'+url.pathname+(url.pathname.endsWith('/')?'index.html':''));if(!p.startsWith(root+sep))throw Error();const body=await readFile(p);res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.woff2':'font/woff2'})[extname(p)]||'application/octet-stream');res.end(body);}catch{res.writeHead(404).end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH||undefined,args:['--no-sandbox']});
await mkdir('artifacts/qa',{recursive:true});const errors=[];const results=[];
try{
 const context=await browser.newContext();await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/agents/');await page.setViewportSize({width:1440,height:1000});
 await page.getByRole('button',{name:'Dark mode',exact:true}).click();
 assert.equal(await page.locator('html').getAttribute('data-appearance'),'dark');
 await page.goto(base+'/design-language/');
 assert.equal(await page.getByRole('button',{name:'Light mode',exact:true}).getAttribute('aria-pressed'),'true');
 await page.getByRole('button',{name:'Light mode',exact:true}).click();
 assert.equal(await page.locator('html').getAttribute('data-appearance'),'light');
 const masthead=family==='martlet'?'.page-intro':'.page-masthead';
 for(const path of ['/','/design-language/','/design-system/','/agents/','/privacy-and-cookie-notice/']) {
  for(const mode of ['light','dark']) {
   await page.goto(base+path);await page.evaluate(mode=>{document.documentElement.dataset.appearance=mode;localStorage.setItem('design-appearance',mode)},mode);await page.reload();
   if(await page.locator('#cookie-banner').isVisible())await page.locator('[data-cookie-reject]').first().click();
   for(const width of [1440,1280,768,320]) {
    await page.setViewportSize({width,height:1000});await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.locator(masthead+' h1').count(),1,path+' masthead title');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`${path} ${mode} ${width} overflow`);
    const box=await page.locator(masthead).boundingBox();assert.ok(box.width>=width-1,'Masthead spans the viewport');
    if(path==='/design-language/' && mode==='light' && baseline.viewports[width]) {
     const expected=baseline.viewports[width];
     const actual=await page.evaluate(selectors=>Object.fromEntries(selectors.map(selector=>{
      const e=document.querySelector(selector),s=getComputedStyle(e),r=e.getBoundingClientRect();
      return [selector,{width:r.width,font:s.fontFamily,size:s.fontSize,lineHeight:s.lineHeight,paddingTop:s.paddingTop,paddingBottom:s.paddingBottom,display:s.display,columns:s.gridTemplateColumns}];
     })),Object.keys(expected));
     assert.deepEqual(actual,expected,`${family} source geometry at ${width}px`);
    }
    if(path==='/design-language/'&&family==='martlet'){
     const toc=await page.locator('.page-index').boundingBox(),body=await page.locator('.document-reading').boundingBox();
     if(width>=1280)assert.ok(toc.x+toc.width<=body.x,'Source index remains left');else assert.ok(toc.y+toc.height<=body.y,'Source index reflows before reading');
    }
    if(path==='/' && [1440,320].includes(width))await page.locator('footer').screenshot({path:`artifacts/qa/${family}-footer-${mode}-${width}.png`});
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    if(path==='/design-language/'||path==='/')await page.screenshot({path:`artifacts/qa/${family}-${path==='/'?'home':'language'}-${mode}-${width}.png`,fullPage:false});
   }
   await page.addScriptTag({path:axePath});
   const violations=await page.evaluate(async selector=>(await window.axe.run({include:[selector,'.mast','.site-footer']})).violations,masthead);
   assert.deepEqual(violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),[],path+' '+mode+' shell accessibility');
   await page.evaluate(()=>document.documentElement.style.fontSize='200%');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,path+' enlarged text overflow');
   await page.evaluate(()=>document.documentElement.style.fontSize='');
   results.push({path,mode,passed:true});
  }
 }
 // Homepage tools are themed islands: test every visible panel, not only chrome.
 await page.goto(base+'/');
 for(const appearance of ['light','dark']) {
  await page.evaluate(mode=>document.documentElement.dataset.appearance=mode,appearance);
  for(const palette of ['light','dark']) {
   if(family==='krigsvold') await page.locator(`[data-mode="${palette}"]`).click();
   else await page.locator(`[data-palette-mode="${palette}"]`).click();
   for(const panel of (family==='krigsvold'?['preview','palette','downloads']:['all'])) {
    if(panel!=='all') await page.locator(`[data-workspace-link="${panel}"]`).click();
    for(const width of [1440,320]) {
     await page.setViewportSize({width,height:1000});
     for(const example of (panel==='preview'||panel==='all'?['interface','code','terminal']:['interface'])) {
      if(panel==='preview'||panel==='all') await page.locator(`[data-example="${example}"]`).click();
      await page.evaluate(()=>document.querySelectorAll('main details').forEach(e=>e.open=true));
      await page.addScriptTag({path:axePath});
      const violations=await page.evaluate(async()=>(await axe.run('main',{runOnly:['color-contrast']})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));
      assert.deepEqual(violations,[],`${appearance}/${palette}/${panel}/${example}/${width} homepage contrast`);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,'Expanded homepage overflow');
     }
     await page.evaluate(()=>document.documentElement.style.fontSize='200%');
     assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,'Expanded homepage enlarged text overflow');
     await page.evaluate(()=>{document.documentElement.style.fontSize='';document.querySelectorAll('main details').forEach(e=>e.open=false)});
    }
   }
  }
 }
 await page.goto(base+'/design-language/');await page.setViewportSize({width:320,height:900});
 const menu=page.getByRole('button',{name:'Menu',exact:true});await menu.click();await page.keyboard.press('Escape');
 await page.waitForTimeout(400);assert.equal(await menu.getAttribute('aria-expanded'),'false');assert.equal(await menu.evaluate(e=>e===document.activeElement),true);
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:900}});const np=await nojs.newPage();await np.goto(base+'/');
 assert.equal(await np.getByRole('link',{name:'The Language',exact:true}).first().isVisible(),true,'Navigation without JavaScript');
 await nojs.close();assert.deepEqual(errors,[]);await writeFile('artifacts/qa/source-shell-results.json',JSON.stringify(results,null,2));console.log(`${family}: all source-shell page, appearance, reflow and navigation checks passed`);
}finally{await browser.close();server.close();}
