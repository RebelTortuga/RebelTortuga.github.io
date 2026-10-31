/* Focused local regression checks. Uses the same Playwright dependency as site-audit.cjs.
   Run: node scripts/accessibility-regression.cjs
   Optional: PW_BROWSER_CHANNEL=msedge, AUDIT_SCREENSHOT_DIR=<outside-repo directory> */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const screenshots = process.env.AUDIT_SCREENSHOT_DIR;
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
  if (!file.startsWith(root + path.sep) || pathname.split('/').some(part => part.startsWith('.')) ||
      !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404).end();
    return;
  }
  res.setHeader('Content-Type', (mime[path.extname(file)] || 'application/octet-stream') + '; charset=utf-8');
  fs.createReadStream(file).pipe(res);
});

async function targets(page, selector) {
  const small = await page.locator(selector).evaluateAll(elements => elements
    .filter(e => e.getBoundingClientRect().width > 0)
    .filter(e => { const r = e.getBoundingClientRect(); return r.height < 44 || r.width < 44; })
    .map(e => e.textContent.trim()));
  assert.deepEqual(small, [], 'Standalone targets must be at least 44×44 CSS pixels');
}

async function layout(page) {
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false,
    'Unexpected horizontal overflow');
}

async function screenshot(page, name) {
  if (!screenshots) return;
  fs.mkdirSync(screenshots, { recursive: true });
  await page.screenshot({ path: path.join(screenshots, name + '.png') });
}

(async () => {
  let browser;
  try {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const base = `http://127.0.0.1:${server.address().port}`;
    browser = await chromium.launch({ headless: true,
      ...(process.env.PW_BROWSER_CHANNEL ? { channel: process.env.PW_BROWSER_CHANNEL } : {}) });
    const context = await browser.newContext();
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => {
      if (response.url().startsWith(base) && response.status() >= 400)
        errors.push(`${response.status()} ${response.url()}`);
    });
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    const projectPaths = await page.locator('.project-actions a:first-child')
      .evaluateAll(links => links.map(a => new URL(a.href).pathname));
    assert.equal(projectPaths.length, 9);
    const labels = await page.locator('.project-actions a').evaluateAll(links => links.map(a => a.ariaLabel));
    assert.equal(new Set(labels).size, 18, 'Every project link needs a distinct accessible name');
    for (const label of labels) assert.match(label, /^(Project guide|Source): .+/);
    assert.ok(await page.locator('.category').first().evaluate(e => parseFloat(getComputedStyle(e).fontSize) >= 12));
    const status = page.locator('#project-filter-results');
    assert.equal(await status.getAttribute('role'), 'status');
    assert.equal(await status.getAttribute('aria-live'), 'polite');
    assert.equal(await status.getAttribute('aria-atomic'), 'true');

    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await layout(page);
      const overlap = await page.locator('.site-nav a').evaluateAll(links => {
        const rects = links.map(e => e.getBoundingClientRect()).filter(r => r.width > 0);
        return rects.some((r, i) => rects.slice(i + 1).some(s =>
          Math.min(r.right, s.right) > Math.max(r.left, s.left) &&
          Math.min(r.bottom, s.bottom) > Math.max(r.top, s.top)));
      });
      assert.equal(overlap, false, `${width}px header links overlap`);
      await targets(page, '.site-nav a, .project-actions a, nav[aria-label="RebelTortuga social and community links"] a');
      await page.evaluate(() => scrollTo(0, 0));
      await screenshot(page, `home-${width}`);
      console.log(`PASS homepage layout and touch targets at ${width}px`);
    }
    for (const [filter, count] of [['tool', 4], ['ai', 5], ['all', 9]]) {
      const button = page.locator(`[data-filter="${filter}"]`);
      await button.focus();
      await page.keyboard.press('Enter');
      assert.equal(await page.locator('.project:visible').count(), count);
      assert.equal(await status.textContent(), `${count} projects shown`);
      assert.equal(await button.getAttribute('aria-pressed'), 'true');
      assert.ok(await button.evaluate(e => e === document.activeElement));
    }
    console.log('PASS keyboard filters, result announcements, pressed state, and focus retention');

    // Check all edited guide templates without repeating a full multi-viewport site audit.
    for (const projectPath of projectPaths) {
      const response = await page.request.get(base + projectPath);
      assert.equal(response.status(), 200);
      const data = await page.evaluate(html => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return {
          stylesheet: !!doc.querySelector('link[href="../assets/project-accessibility.css"]'),
          requirements: !![...doc.querySelectorAll('h3')].find(e => e.textContent === 'Requirements'),
          previews: [...doc.querySelectorAll('main img')].map(img => ({
            src: img.getAttribute('src'), href: img.closest('a')?.getAttribute('href'),
            label: img.closest('a')?.getAttribute('aria-label'), target: img.closest('a')?.target
          }))
        };
      }, await response.text());
      assert.ok(data.stylesheet && data.requirements, projectPath);
      assert.ok(data.previews.length);
      for (const preview of data.previews) {
        assert.equal(preview.href, preview.src, projectPath + ' must link the original image');
        assert.equal(preview.target, '_blank');
        assert.ok(preview.label);
      }
    }
    console.log('PASS requirements, shared stylesheet, and original-image links on all nine guides');

    await page.goto(base + '/projects/comfyui-free-local-wan-video-high-resolution.html');
    await page.locator('.preview img').evaluate(async image => {
      image.loading = 'eager';
      await image.decode();
    });
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await layout(page);
      await targets(page, 'header a, nav a, .button');
      await page.evaluate(() => scrollTo(0, 0));
      await screenshot(page, `workflow-${width}`);
      console.log(`PASS representative workflow layout and targets at ${width}px`);
    }
    const preview = page.locator('.preview > a');
    const expected = await preview.getAttribute('href');
    const [popup] = await Promise.all([page.waitForEvent('popup'), preview.click()]);
    await popup.waitForLoadState('domcontentloaded');
    assert.equal(popup.url(), expected);
    const originalWidth = await popup.locator('img').evaluate(async image => {
      await image.decode();
      return image.naturalWidth;
    });
    assert.ok(originalWidth > 1440, 'Preview must load the original image, not a thumbnail');
    await popup.close();
    await page.getByRole('link', { name: '← All projects' }).click();
    assert.equal(new URL(page.url()).hash, '#projects');
    assert.equal(new URL(page.url()).origin, base);
    console.log('PASS original-resolution preview opens in a new tab and return navigation stays local');
    assert.deepEqual(errors, [], 'JavaScript exceptions or local HTTP errors');
    console.log('PASS no JavaScript exceptions or local HTTP errors');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
