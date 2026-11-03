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
const releaseEvidence = {
  '/projects/wow-diagnostic-and-repair-toolkit.html': {
    version: 'v1.0.1', asset: 'WoW-Diagnostic-and-Repair-Toolkit-v1.0.1-GitHub.zip',
    sha256: '6e04a103637915ee6b0cbfbc31f63f8eb4a4dc358de6f479c005cd408d87d711', preview: 'release'
  },
  '/projects/firefox-diagnostic-and-repair-toolkit.html': {
    version: 'v1.0.1', asset: 'Firefox-Diagnostic-and-Repair-Toolkit-v1.0.1-GitHub.zip',
    sha256: 'b98070ef5fa56087e29a05275914bb9e1b27b76f671791c89a95ae340bd94508', preview: 'release'
  },
  '/projects/brave-diagnostic-and-repair-toolkit.html': {
    version: 'v1.0.1', asset: 'Brave-Diagnostic-and-Repair-Toolkit-v1.0.1-GitHub.zip',
    sha256: 'f4146d4062c520f225f1a18d28740a2c94d186050b97a734243fb3871f428db8', preview: 'release'
  },
  '/projects/shell-diagnostic-and-repair-toolkit.html': {
    version: 'v1.0.1', asset: 'Shell-Diagnostic-and-Repair-Toolkit-v1.0.1-GitHub.zip',
    sha256: '69ff3f2e6aea6e0e043438bd0b2180ad81854055ff1fb4bd019d7c5362449724', preview: 'release'
  },
  '/projects/comfyui-clean-slate.html': {
    version: 'v0.2.1', asset: 'comfyui-clean-slate-v0.2.1.zip',
    sha256: '701b0961e6d1eb4b23f55c671df183be5b133c24ed2d609689a3f9e2defc5873', preview: 'release', tested: true
  },
  '/projects/comfyui-free-local-qwen-image-edit.html': {
    version: 'v1.1.1', asset: 'comfyui-free-local-qwen-image-edit-v1.1.1.zip',
    sha256: '32dfec574b04b06b03bdf111988c0466a438c489ba4f3a1ef26b776a5287d1d9', preview: 'release', tested: true
  },
  '/projects/comfyui-free-local-sdxl-inpainting.html': {
    version: 'v1.0.1', asset: 'comfyui-free-local-sdxl-inpainting-v1.0.1.zip',
    sha256: '4e898eccb6131e3f36c7e99828d0b4c06e32912c52f1dba57526216f7d14d505', preview: 'release', tested: true
  },
  '/projects/comfyui-free-local-wan-video-quality.html': {
    version: 'v1.0.1', asset: 'comfyui-free-local-wan-video-quality-v1.0.1.zip',
    sha256: '1dd90cf2d7a46256fa1d77b3df5f972118d979f116292f565fcf87d3123b1064', preview: 'release', tested: true
  },
  '/projects/comfyui-free-local-wan-video-high-resolution.html': {
    version: 'v1.0.1', asset: 'comfyui-free-local-wan-video-high-resolution-v1.0.1.zip',
    sha256: '3c9cdd46cbb09671de205d78bbbeb25c3ba64dc9df7481acd3163627e8c18a8d', preview: 'release', tested: true
  }
};
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.mp4': 'video/mp4' };
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
    `Unexpected horizontal overflow at ${page.url()}`);
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
    const featuredVideo = page.locator('.intro-video video');
    await assert.doesNotReject(featuredVideo.evaluate(async video => {
      if (!video.poster.endsWith('/assets/RebelTortuga-9-Free-Tools-2026-splash.png'))
        throw new Error('Featured video does not use the approved splash image');
      await video.play();
      await new Promise(resolve => setTimeout(resolve, 400));
      if (video.currentTime <= 0) throw new Error('Featured video did not advance during playback');
      video.pause();
    }));
    assert.equal((await page.request.get(base + '/assets/RebelTortuga-9-Free-Tools-2026-splash.png')).ok(), true);
    assert.equal((await page.request.get(base + '/assets/RebelTortuga-9-Free-Tools-FINAL-v3.mp4')).ok(), true);
    console.log('PASS featured video poster and local playback');
    const projectCount = await page.locator('.project').count();
    assert.ok(projectCount > 0, 'The homepage must contain project cards');
    assert.match(await page.locator('[data-filter="all"]').textContent(), new RegExp(`All projects · ${projectCount}`));
    const projectPaths = await page.locator('.project-actions a:first-child')
      .evaluateAll(links => links.map(a => new URL(a.href).pathname).filter(path => path !== '/projects/repo-update-manager.html'));
    assert.equal(projectPaths.length, Object.keys(releaseEvidence).length);
    const labels = await page.locator('.project-actions a').evaluateAll(links => links.map(a => a.ariaLabel));
    assert.equal(new Set(labels).size, projectCount * 2, 'Every project link needs a distinct accessible name');
    for (const label of labels) assert.match(label, /^(Project guide|Product page|Source): .+/);
    assert.ok(await page.locator('.category').first().evaluate(e => parseFloat(getComputedStyle(e).fontSize) >= 12));
    const status = page.locator('#project-filter-results');
    assert.equal(await status.getAttribute('role'), 'status');
    assert.equal(await status.getAttribute('aria-live'), 'polite');
    assert.equal(await status.getAttribute('aria-atomic'), 'true');
    const chooserLinks = page.locator('.workflow-option a');
    assert.equal(await chooserLinks.count(), 5, 'The ComfyUI chooser must offer all five workflows');
    const chooserPaths = await chooserLinks.evaluateAll(links => links.map(link => new URL(link.href).pathname));
    assert.deepEqual(chooserPaths, [
      '/projects/comfyui-clean-slate.html',
      '/projects/comfyui-free-local-qwen-image-edit.html',
      '/projects/comfyui-free-local-sdxl-inpainting.html',
      '/projects/comfyui-free-local-wan-video-quality.html',
      '/projects/comfyui-free-local-wan-video-high-resolution.html'
    ]);

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
      await targets(page, '.site-nav a, .workflow-option a, .project-actions a, nav[aria-label="RebelTortuga social and community links"] a');
      await page.evaluate(() => scrollTo(0, 0));
      await screenshot(page, `home-${width}`);
      console.log(`PASS homepage layout and touch targets at ${width}px`);
    }
    for (const filter of ['tool', 'ai', 'all']) {
      const button = page.locator(`[data-filter="${filter}"]`);
      await button.focus();
      await page.keyboard.press('Enter');
      const count = await page.locator(`.project${filter === 'all' ? '' : `[data-category="${filter}"]`}`).count();
      assert.equal(await page.locator('.project:visible').count(), count);
      assert.equal(await status.textContent(), `${count} ${count === 1 ? 'project' : 'projects'} shown`);
      assert.equal(await button.getAttribute('aria-pressed'), 'true');
      assert.ok(await button.evaluate(e => e === document.activeElement));
    }
    console.log('PASS keyboard filters, result announcements, pressed state, and focus retention');

    // Check all edited guide templates without repeating a full multi-viewport site audit.
    for (const projectPath of projectPaths) {
      const expectedRelease = releaseEvidence[projectPath];
      assert.ok(expectedRelease, `Missing release evidence fixture for ${projectPath}`);
      const response = await page.request.get(base + projectPath);
      assert.equal(response.status(), 200);
      const data = await page.evaluate(html => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return {
          stylesheet: !!doc.querySelector('link[href="../assets/project-accessibility.css"]'),
          requirements: !![...doc.querySelectorAll('h3')].find(e => e.textContent === 'Requirements'),
          releaseHeading: doc.querySelector('.release-proof h2')?.textContent,
          releaseVersion: doc.querySelector('.release-facts a[href*="/releases/tag/"]')?.textContent,
          digest: doc.querySelector('.release-facts .digest code')?.textContent,
          command: doc.querySelector('.verification-command code')?.textContent,
          maintenance: [...doc.querySelectorAll('.release-facts dd')]
            .map(e => e.textContent).find(text => text.includes('No update cadence')),
          testEvidence: doc.querySelector('.test-evidence')?.textContent,
          previewProvenance: doc.querySelector('.preview-provenance')?.textContent,
          previews: [...doc.querySelectorAll('main img')].map(img => ({
            src: img.getAttribute('src'), href: img.closest('a')?.getAttribute('href'),
            label: img.closest('a')?.getAttribute('aria-label'), target: img.closest('a')?.target
          }))
        };
      }, await response.text());
      assert.ok(data.stylesheet && data.requirements, projectPath);
      assert.equal(data.releaseHeading, 'Verify the official release');
      assert.equal(data.releaseVersion, expectedRelease.version);
      assert.equal(data.digest, expectedRelease.sha256);
      assert.ok(data.command.includes(expectedRelease.asset));
      assert.ok(data.command.includes(expectedRelease.sha256));
      assert.ok(data.command.includes('Get-FileHash'));
      assert.ok(data.maintenance);
      assert.ok(data.previewProvenance?.toLowerCase().includes(`${expectedRelease.preview}-branch`) ||
        data.previewProvenance?.toLowerCase().includes(`${expectedRelease.preview}-specific`));
      assert.equal(!!data.testEvidence, !!expectedRelease.tested);
      assert.ok(data.previews.length);
      for (const preview of data.previews) {
        assert.equal(preview.href, preview.src, projectPath + ' must link the original image');
        assert.equal(preview.target, '_blank');
        assert.ok(preview.label);
      }
      await page.setViewportSize({ width: 320, height: 900 });
      await page.goto(base + projectPath);
      await layout(page);
      assert.ok(await page.locator('.verification-command pre').evaluate(element =>
        element.scrollWidth >= element.clientWidth && getComputedStyle(element).overflowX === 'auto'));
    }
    console.log(`PASS release evidence, verification commands, provenance, narrow layout, and original-image links on all ${projectPaths.length} guides`);

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
    await popup.waitForURL(expected, { waitUntil: 'domcontentloaded' });
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
