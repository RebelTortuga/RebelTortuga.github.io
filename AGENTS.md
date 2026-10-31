# AGENTS.md — RebelTortuga website

## Mission
Maintain and improve the public RebelTortuga GitHub Pages website: https://rebeltortuga.github.io/. Deliver polished, accessible, fast, reliable pages that accurately represent the linked open-source projects. Favor measurable improvements over cosmetic churn. Preserve established branding, content, navigation, URLs, and working behavior unless the task requires a change.

## How to work
1. **Understand the request and inspect the smallest relevant scope.** Read affected files, nearby patterns, and existing scripts before editing. Check repository status and avoid overwriting unrelated or uncommitted work.
2. **Execute end to end.** For clear requests, investigate, make focused changes, test, fix failures, and summarize results without unnecessary approval stops. Ask only when a decision is consequential or ambiguous, or when an irreversible/external action lacks authorization.
3. **Prefer targeted patches.** Reuse existing conventions and assets. Avoid broad rewrites, duplicate CSS, speculative refactors, unnecessary dependencies, and unrelated redesigns. Keep diffs reviewable.
4. **Be accurate.** Verify claims against source files, project repositories, and actual test results. Never invent features, screenshots, releases, URLs, performance numbers, or successful deployments.
5. **Keep it free and safe.** Do not add paid services, tracking, secrets, credentials, opaque remote scripts, or unnecessary external dependencies. Never commit credentials or sensitive data.

## Design and user experience
- Treat the current visual identity as the baseline. Aim for a professional, cohesive result: clear hierarchy, readable typography, restrained color and motion, consistent spacing, meaningful imagery, and obvious actions.
- Apply UX principles pragmatically: reduce choices and friction; follow familiar web conventions; group related content; emphasize the primary task; favor simplicity; make controls comfortably sized and predictable; preserve state and give clear feedback where relevant.
- Design mobile-first and verify narrow screens, breakpoint boundaries, tablets, and desktop. Avoid clipped content, overlapping elements, horizontal scrolling, tiny tap targets, and layout shifts.
- Preserve semantic HTML, logical heading order, accessible names, keyboard operation, visible focus, sufficient contrast, descriptive link text, and useful image alt text. Respect reduced-motion preferences. Do not rely on color alone.
- Check loading, empty, error, and success states when the affected feature has them. Favor progressive enhancement and graceful degradation.
- Never sacrifice usability, accessibility, or performance merely to make a screenshot look better.

## Content, project synchronization, and SEO
- Keep project names, capabilities, requirements, screenshots, download/source links, release references, and documentation consistent with their actual repositories. A project release or documentation update may require a corresponding website update; check the relevant pages and assets rather than assuming synchronization.
- Preserve canonical public URLs and redirects. Do not remove project details, rename routes, or break inbound links silently.
- For affected pages, review titles, descriptions, headings, internal links, social previews, canonical tags, structured data, and sitemap entries as applicable. Keep metadata factual and nonduplicative.
- Check image dimensions, compression, responsive behavior, alt text, and broken asset references. Maintain a coherent favicon setup; avoid unnecessary duplicate favicon requests or references.
- Do not make SEO claims based solely on a successful build or browser audit. Search indexing and ranking require separate evidence.

## Verification strategy
**Test the changed version, not merely the live site.** Start with the narrowest useful checks, expand for shared styles/scripts/navigation, and rerun checks affected by fixes.

- Inspect the diff and run applicable syntax, link, or repository checks. Validate HTML/CSS/JavaScript behavior using the project's available tooling.
- When feasible, serve a local preview and test changed pages at narrow mobile (including 320px), typical mobile, tablet, desktop, and relevant breakpoint edges. Check keyboard navigation, focus, interactions, console errors, image loading, anchors, and overflow.
- For shared templates, styles, navigation, or scripts, spot-check representative pages across page types and run broader regression checks.
- Check accessibility with available automated tools and manual keyboard inspection; automated passes do not establish full WCAG compliance. Visual review, screen readers, and physical-device testing must be reported as unverified unless actually performed.
- Check internal links and relevant external project/download links. Distinguish site-owned failures from transient third-party failures.

### Existing Playwright audit
The repository includes `scripts/site-audit.cjs` and `.github/workflows/playwright-site-audit.yml`. **As currently documented, the script audits the published website**, not uncommitted local changes. Inspect its current configuration before running it; do not infer local-change coverage from a passing result.

For a compatible Node environment, if the dependencies are not already available:

```sh
npm install --no-save playwright@1.58.2
npx playwright install chromium
node scripts/site-audit.cjs
```

On Linux CI, browser system dependencies may require `npx playwright install --with-deps chromium`. Avoid unnecessary reinstalls and do not assume this pinned version remains appropriate without checking the repository.

The documented audit checks sitemap pages at desktop/tablet/mobile widths, image loading, horizontal overflow, same-page anchors, JavaScript exceptions, and internal HTTP links. **It does not establish** complete accessibility, external-link health, visual regression, SEO, or correctness of unpublished changes. Extend or configure local checks only when warranted and without weakening existing coverage.

## Git, CI, and publishing
- Inspect `git status` and the intended diff before modifying or committing. Do not discard unrelated work or force-push. Keep commits scoped and messages descriptive.
- Exclude `node_modules`, browser caches, generated audit reports, temporary screenshots, logs, and local environment files unless specifically requested and appropriate.
- Do not bypass failing checks, suppress errors, or edit tests merely to manufacture a pass. Diagnose the cause, fix within scope, and rerun the relevant checks.
- When authorized to publish, confirm the commit/push, GitHub Actions results, deployment, and live behavior separately. A local pass is not a deployment; a green published-site audit is not proof of uncommitted changes.
- If repository access, permissions, credentials, network, or deployment are unavailable, complete the verifiable local work and provide precise remaining commands or steps. On Windows, prefer PowerShell 7 commands.

## Completion report
Conclude with a concise, factual handoff covering **what changed**, **files or pages affected**, **checks actually run and results**, **commit/deployment status if applicable**, and **remaining issues or unverified checks**. State blockers explicitly. Do not claim a test, accessibility review, push, or deployment occurred unless verified.
