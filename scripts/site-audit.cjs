const { chromium } = require('playwright');
const fs = require('node:fs');
const BASE = 'https://rebeltortuga.github.io';
const viewports = [{name:'desktop',width:1440,height:900},{name:'tablet',width:768,height:1024},{name:'mobile',width:390,height:844}];
(async () => {
 const browser = await chromium.launch({headless:true});
 const issues = [], results = [];
 try {
  const context = await browser.newContext();
  const response = await context.request.get(BASE+'/sitemap.xml');
  if (!response.ok()) throw new Error('Sitemap HTTP '+response.status());
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(x=>x[1].trim()).filter(u=>u.startsWith(BASE));
  if (!urls.length) throw new Error('No site URLs in sitemap');
  const checkedLinks = new Map();
  for (const url of urls) for (const viewport of viewports) {
   const page = await context.newPage({viewport});
   const errors = [];
   page.on('pageerror', e=>errors.push(e.message));
   try {
    const res = await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
    if (!res || !res.ok()) issues.push(url+' '+viewport.name+': page HTTP '+(res?.status()??'none'));
    await page.locator('img').evaluateAll(els=>els.forEach(el=>{el.loading='eager'}));
    await page.waitForTimeout(1200);
    const data = await page.evaluate(()=>({
     overflow: document.documentElement.scrollWidth > window.innerWidth + 2,
     images: [...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.currentSrc||i.src),
     links: [...document.querySelectorAll('a[href]')].map(a=>a.href).filter(Boolean),
     anchors: [...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href')).filter(x=>x&&x!=='#'&&!document.getElementById(x.slice(1)))
    }));
    if(data.overflow) issues.push(url+' '+viewport.name+': horizontal overflow');
    for(const src of data.images) issues.push(url+' '+viewport.name+': image not loaded '+src);
    for(const hash of data.anchors) issues.push(url+' '+viewport.name+': missing anchor '+hash);
    for(const error of errors) issues.push(url+' '+viewport.name+': JavaScript '+error);
    if(viewport.name==='desktop') for(const link of data.links) {
     const u = new URL(link);
     if(u.origin!==BASE || checkedLinks.has(u.pathname)) continue;
     checkedLinks.set(u.pathname,true);
     const r=await context.request.get(u.origin+u.pathname,{timeout:15000}).catch(()=>null);
     if(!r || !r.ok()) issues.push(url+': internal link failed '+u.pathname+' ('+(r?.status()??'timeout')+')');
    }
    results.push({url,viewport:viewport.name,images:data.images.length,overflow:data.overflow,errors:errors.length});
   } catch(e){issues.push(url+' '+viewport.name+': '+e.message)}
   finally {await page.close()}
  }
 } finally {await browser.close()}
 const report='# RebelTortuga Playwright Audit\n\nChecked: '+results.length+' page/viewport combinations.\n\n## Findings ('+issues.length+')\n\n'+(issues.length?issues.map(x=>'- '+x).join('\n'):'No issues detected.')+'\n';
 fs.writeFileSync('playwright-audit.md',report);
 console.log(report);
 if(issues.length) process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});