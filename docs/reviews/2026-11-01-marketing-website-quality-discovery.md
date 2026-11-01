# Marketing and website quality discovery

**Status:** Completed — recommendations pending approval

**Started:** 2026-11-01

## Objective and scope

Identify the five highest-value remaining opportunities to improve RebelTortuga discoverability, usefulness, credibility, performance, and first-time visitor experience. This is discovery only: no website implementation, package installation, detector triage, publication, or `.impeccable/` change is authorized.

## Baseline and initial evidence

- The repository has a homepage, nine project guides, canonical URLs, project JSON-LD, a sitemap, and GitHub Actions checks.
- Existing local accessibility regression coverage exercises 320px, 390px, and 1440px layouts, touch targets, filters, guide links, image previews, local HTTP errors, and JavaScript exceptions.
- The current worktree contains uncommitted project-guide/CRO/schema changes, an untracked shared guide stylesheet, and `.impeccable/`. They are outside this discovery initiative and must be preserved.
- Existing records identify settled decisions: hero-eyebrow labels are intentional, prior cramped-padding findings were resolved by rendered evidence, and detector findings must not be reopened without material new evidence.

## Capability inventory

- Marketing skills reviewed: CRO, SEO audit, AI SEO, copy editing, and content strategy.
- Site foundations: a crawlable `robots.txt`, a 12-URL sitemap, self-referencing canonical URLs, unique title/description/H1 coverage on all 12 HTML pages, and JSON-LD on the homepage and nine guides.
- Existing checks: local Playwright accessibility regression at 320px, 390px, and 1440px; GitHub Actions link checking for HTML and Markdown; and a separate published-site Playwright audit.
- The local accessibility regression covers navigation targets, keyboard filters, guide links, preview behavior, local HTTP errors, and JavaScript exceptions. It is not a Core Web Vitals or screen-reader test.
- Search Console is connected. GA4 is not connected to the current GSC Wizard account.

## Measured search and indexing evidence

Search Console, latest 28 settled days through 2026-10-30:

- 1 click, 13 impressions, 7.69% CTR, and average position 5.69.
- Only one visible query row: `brave repair`, with one impression, zero clicks, and position 11. Query rows cover 7.69% of impressions, so this is not enough data for keyword or CTR conclusions.
- Five visible pages account for all page-level totals: homepage (one click, five impressions), Privacy & Software Safety (two impressions), and the Brave, Clean Slate, and WoW guides (two impressions each).
- Search Console lists `https://rebeltortuga.github.io/sitemap.xml` with zero warnings and errors, but its state is still pending.

## First-time visitor and repository evidence

- Homepage project filters already separate four Windows/gaming tools from five ComfyUI/AI projects, and local regression verifies their keyboard behavior and announcements.
- Every guide exposes release, source, README, and issue links, plus requirements and safety/legal links. Generic CTA additions are not recommended.
- The official ComfyUI READMEs show distinct paths: instruction-plus-mask image editing, text-selected SDXL inpainting, 480 × 768 quality video, 576 × 896 higher-resolution video, and the Clean Slate custom node. Existing guides contain pairwise related-project links but no single selection or compatibility aid.
- The official READMEs contain workflow-specific troubleshooting and limitations. The guides provide concise requirements and point to the README, but do not summarize the most likely start-up failure for each workflow.
- The homepage's LCP banner is a local 503KB WebP. Guide previews use remote repository images and generally do not declare intrinsic dimensions. Existing checks verify loading but not layout shift or Core Web Vitals.

## Ranked opportunities

| Priority | Opportunity | Evidence | Visitor benefit and proposed improvement | Effort | Regression risk | State |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Resolve sitemap-pending status and establish a light Search Console review cadence | The sitemap has zero errors/warnings but is pending; only 13 recent impressions are measured. | Confirm Google has processed the sitemap, then review settled impressions, clicks, indexed-page signals, and emerging queries monthly. This creates an evidence base before adding SEO content. | Low | Low | New |
| 2 | Add a ComfyUI project chooser and compatibility summary | Five workflows have materially different purposes, models, and expected output; links only compare pairs. | Add one factual selector or compact comparison that helps visitors choose Clean Slate, Qwen editing, SDXL inpainting, Wan Quality, or Wan Higher Resolution before opening a guide. Link to the existing guides and upstream requirements. | Medium | Low | New |
| 3 | Surface one verified troubleshooting or limitation summary per project guide | Each official README has troubleshooting/limitations; guides mostly delegate this to the README. | Add a small, source-linked section for the most likely initial blocker (for example, missing nodes/models, profile selection, or backup scope) without duplicating full documentation. | Medium | Medium | New |
| 4 | Define privacy-conscious action measurement before adding tracking | GA4 is not connected; Search Console measures discovery, not release clicks, README use, or successful setup. | Decide whether existing GSC plus GitHub repository/release signals are sufficient. If not, design a minimal consent-free measurement approach before adding any script or service. | Medium | Medium | New |
| 5 | Establish performance and layout-stability measurements before asset changes | Local regression verifies responsive behavior but not Core Web Vitals; the hero is 503KB and guide previews lack intrinsic dimensions. PageSpeed Insights API could not run because its public quota was exhausted. | Obtain a mobile/desktop baseline when available, then prioritize responsive image sizing, reserved preview space, or asset delivery changes only if metrics identify a material problem. Consider Lighthouse CI only after the baseline demonstrates an ongoing measurement gap. | Low to measure; Medium to remediate | Low to measure; Medium to remediate | New |

## Work not to repeat

- Do not redo settled hero-eyebrow or cramped-padding detector discussions.
- Do not add generic “download,” “source,” or social-proof CTAs: release, source, README, issue, safety, and license paths already exist and this project is not optimizing for a sales funnel.
- Do not add speculative schema, `llms.txt`, AI-only pages, ratings, reviews, download counts, or unsupported compatibility claims.
- Do not reopen the active CRO/Schema.org implementation audit. Its local changes and validation are documented separately in [the CRO and Schema.org review](2026-11-01-cro-schema-optimization.md).

## Deferred and unverified items

- GA4 data is unavailable because no Analytics property is connected to the current GSC Wizard account.
- PageSpeed Insights returned HTTP 429 due to public API quota exhaustion; no performance or accessibility score was recorded.
- No screen-reader, physical-device, live deployment, or AI-answer citation testing was performed.
- No Lighthouse CI installation is recommended yet: current evidence establishes a measurement gap, not a confirmed performance failure.

## Recommended first implementation task

Start with **Priority 1: resolve and monitor the pending sitemap in Search Console**. It is the lowest-risk action, protects discoverability before content expansion, and produces the evidence needed to judge the other search-focused opportunities.

## Final verdict

NOT READY TO PUBLISH. This is a completed discovery record with no implementation changes. Wait for approval before starting any ranked initiative.

## Approved implementation and consolidated acceptance — 2026-11-01

Priorities 2 and 3 were approved and implemented as part of the outstanding unpublished website work. The original discovery evidence remains unchanged.

### Implemented improvements

- Added a homepage ComfyUI workflow chooser above the existing project cards. It distinguishes Clean Slate, Semi-AI Image Editing, SDXL Inpainting, Wan Video Quality (480 × 768), and Wan Video Higher Resolution (576 × 896), links to each established guide, and states only README-backed prerequisites and limits.
- Added concise troubleshooting/compatibility guidance where the ComfyUI guides previously delegated it entirely to upstream documentation: Clean Slate installation/renderer checks; Qwen nodes, models, and mask-mode checks; SDXL mask-preview guidance; and Wan dependency/reference-image/hardware-minimum guidance.
- Reviewed the four Windows/gaming guides against their READMEs. Their existing quick starts, requirements, safety notes, and authoritative README links already cover the practical setup questions; no repeated filler was added.
- Extended the existing local accessibility regression to assert all five chooser links and their 44px touch targets at 320px, 390px, and 1440px.

### Consolidated scope and changed files

- `index.html`
- `assets/project-guide-refresh.css` (pre-existing untracked shared guide presentation)
- `scripts/accessibility-regression.cjs`
- All nine `projects/*.html` guide pages: existing guide refresh and Schema.org work; the five ComfyUI guides also contain the new targeted guidance.
- `docs/website-improvement-tracker.md`, `docs/reviews/README.md`, and the three current review records.

### Validation

- The existing local Playwright accessibility regression passed with Edge at 320px, 390px, and 1440px. It verified homepage layout and touch targets, chooser guide paths, keyboard filters/focus/announcements, all guide requirements and original-image links, representative workflow layout, preview pop-up navigation, return navigation, and no local HTTP or JavaScript errors.
- Parsed 10 JSON-LD blocks across the homepage and nine guides successfully.
- All relative homepage/project `href` and `src` targets resolve.
- All 19 existing GitHub release and preview endpoints returned successfully to read-only HTTP HEAD checks.
- `git diff --check` passed.

### Remaining limitations and acceptance

- Release and screenshot-preview endpoint availability was checked at the time of review; third-party availability can still change after publication.
- Screen-reader and physical-device testing remain unverified. The published-site audit targets the deployed site and therefore cannot validate this uncommitted worktree.
- No commit, pull request, push, merge, deployment, or live verification has occurred.

**READY TO PUBLISH.** The combined local implementation is ready for the user's explicit publication approval; it is not deployed.
