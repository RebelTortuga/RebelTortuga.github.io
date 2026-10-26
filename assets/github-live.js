/* RebelTortuga public GitHub data. No tokens or private API keys. */
(() => {
  'use strict';

  const OWNER = 'RebelTortuga';
  const BASE = 'https://api.github.com';
  const CACHE_KEY = 'rebeltortuga-github-public-v1';
  const MAX_AGE = 30 * 60 * 1000;
  const cards = Array.from(document.querySelectorAll('.project'));
  if (!cards.length) return;

  const slugs = cards.map((card) => {
    const link = card.querySelector('.project-actions a[href*="github.com/RebelTortuga/"]');
    const url = link ? new URL(link.href) : null;
    return url ? url.pathname.split('/')[2] : null;
  });

  // A compact status stays out of the way of the existing design.
  const status = document.createElement('p');
  status.className = 'github-live-status';
  status.setAttribute('role', 'status');
  status.textContent = 'Checking public GitHub project details…';
  const grid = document.getElementById('project-grid');
  if (grid) grid.parentNode.insertBefore(status, grid);

  const style = document.createElement('style');
  style.textContent = `
    .github-live-status{font-size:.8rem;color:#8faebd;margin:-5px 0 20px}
    .github-live-meta{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 15px}
    .github-live-meta span{display:inline-flex;align-items:center;min-height:26px;
      border:1px solid #365565;border-radius:6px;background:#0a202d;
      color:#c9e2e8;padding:3px 8px;font-size:.73rem;font-weight:650}
    .github-live-meta span:first-child{color:#94f0e0}
  `;
  document.head.appendChild(style);

  function loadCache() {
    try {
      const item = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      return item && Date.now() - item.saved < MAX_AGE ? item : null;
    } catch { return null; }
  }

  function saveCache(data) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ saved: Date.now(), data })); }
    catch { /* Private browsing may disable storage. */ }
  }

  async function getJson(url) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9000);
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: 'application/vnd.github+json' }
      });
      if (!response.ok) throw new Error(`GitHub API HTTP ${response.status}`);
      return await response.json();
    } finally { clearTimeout(timeout); }
  }

  function shortDate(value) {
    if (!value) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  }

  function render(data, fromCache) {
    let shown = 0;
    cards.forEach((card, index) => {
      const slug = slugs[index];
      const item = data[slug];
      if (!slug || !item) return;
      const title = card.querySelector('h3');
      const previous = card.querySelector('.github-live-meta');
      if (previous) previous.remove();
      if (!title) return;

      const meta = document.createElement('div');
      meta.className = 'github-live-meta';
      const tags = [
        `★ ${Number(item.stars) || 0} stars`,
        item.version ? `Release ${item.version}` : null,
        item.updated ? `Updated ${shortDate(item.updated)}` : null
      ].filter(Boolean);
      tags.forEach((label) => {
        const badge = document.createElement('span');
        badge.textContent = label;
        meta.appendChild(badge);
      });
      title.insertAdjacentElement('afterend', meta);

      const download = card.querySelector('.project-actions a:first-child');
      // Change only the download link, and only to GitHub's matching release asset.
      if (download && item.asset &&
          item.asset.startsWith(`https://github.com/${OWNER}/${slug}/releases/download/`)) {
        download.href = item.asset;
        download.textContent = 'Download ZIP ↗';
      }
      shown++;
    });
    status.textContent = shown
      ? `GitHub data ${fromCache ? 'cached' : 'updated'} · Public repository information · Refreshes approximately every 30 minutes`
      : 'Project downloads remain available on GitHub.';
  }

  async function update() {
    const cached = loadCache();
    if (cached) {
      render(cached.data, true);
      return;
    }

    try {
      const repos = await getJson(`${BASE}/users/${OWNER}/repos?per_page=100&type=owner`);
      if (!Array.isArray(repos)) throw new Error('Invalid repository response');
      const byName = new Map(repos.map((repo) => [repo.name, repo]));
      const data = {};

      // Public latest-release endpoints. Requests are independent so one
      // unavailable release never breaks the others or the existing website.
      await Promise.all(slugs.filter(Boolean).map(async (slug) => {
        const repo = byName.get(slug);
        if (!repo) return;
        const item = {
          stars: repo.stargazers_count,
          updated: repo.pushed_at,
          version: null,
          asset: null
        };
        data[slug] = item;
        try {
          const release = await getJson(`${BASE}/repos/${OWNER}/${slug}/releases/latest`);
          item.version = release.tag_name || null;
          const zip = Array.isArray(release.assets)
            ? release.assets.find((asset) => /\.zip$/i.test(asset.name || '') &&
                asset.state === 'uploaded')
            : null;
          if (zip && typeof zip.browser_download_url === 'string') {
            item.asset = zip.browser_download_url;
          }
        } catch { /* Static release link remains usable. */ }
      }));

      if (Object.keys(data).length) {
        saveCache(data);
        render(data, false);
      } else {
        status.textContent = 'Live GitHub details unavailable; project links still work.';
      }
    } catch {
      status.textContent = 'Live GitHub details temporarily unavailable; project links still work.';
    }
  }

  update();
})();
