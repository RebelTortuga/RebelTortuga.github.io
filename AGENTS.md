# Codex instructions — RebelTortuga website

## Purpose and scope
This repository publishes the RebelTortuga GitHub Pages website at https://rebeltortuga.github.io/. Make focused, maintainable changes that preserve the site's existing look, content, navigation, and working links. Do not redesign unrelated pages or rewrite files unnecessarily.

## Working conventions
- Inspect the relevant files and existing patterns before editing.
- Prefer small, targeted changes. Preserve responsive layouts, accessibility, metadata, and the site's project listings and external links.
- Do not introduce paid services, secrets, credentials, or unnecessary dependencies.
- When a project page or asset changes, check related links, metadata, and sitemap entries as applicable.
- Do not silently change public URLs or remove project information.

## Website validation
The repository has a Playwright audit in `scripts/site-audit.cjs`, also executed by `.github/workflows/playwright-site-audit.yml`. It currently checks the **published** website at https://rebeltortuga.github.io/, not an uncommitted local preview.

For a compatible Node environment, run:
```sh
npm install --no-save playwright@1.58.2
npx playwright install chromium
node scripts/site-audit.cjs
```
On Linux CI, browser system dependencies may also be required; the workflow uses `npx playwright install --with-deps chromium`.

- Run relevant local checks on edited files before proposing or committing changes. When possible, use a local preview and browser checks to verify *unpublished* edits.
- Run the existing Playwright audit when relevant, but **do not treat a passing audit against the published site as proof that uncommitted edits work**. After deployment, verify the published site and the GitHub Actions result.
- Investigate failures, correct changes within scope, and rerun failed checks. Do not hide errors or weaken checks just to get a green result.
- The current audit covers sitemap pages at desktop, tablet, and mobile widths; image loading, horizontal overflow, same-page anchors, JavaScript exceptions, and internal HTTP links. It is not a full accessibility, external-link, visual-regression, or SEO audit.
- Report exactly which tests ran, their results, and any checks that could not run.

## GitHub and publishing
- Avoid committing generated audit reports, temporary screenshots, browser caches, or `node_modules` unless explicitly requested.
- Keep the website and its linked project information consistent when making relevant changes.
- Do not claim deployment or a successful GitHub Actions run without verifying it.
