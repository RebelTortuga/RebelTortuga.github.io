# Historical Marketing Skills review backfill

**Status:** Completed — documentation reconciliation; no website implementation in this initiative

**Backfill created:** 2026-11-01

**Historical coverage:** 2026-10-25 through 2026-11-01, using reachable Git history and retained validation records. The backfill date is not the date of the original discovery.

## Purpose and evidence limits

This single record restores the verified history that predates the two current initiative reviews. It is a reconstruction, not a new marketing, SEO, accessibility, or design audit. Commit history establishes that a change was committed and which branch contains it; it does not by itself establish a deployment. Retained rollout records establish only the validation and publication evidence stated below. No missing test result, review, or deployment has been inferred.

## Chronology

| Date or period | Verified activity and decision | Evidence and state |
| --- | --- | --- |
| 2026-10-25 to 2026-10-27 | The public site, Search Console verification, sitemap repair, project guides, live repository/release presentation, privacy/software-safety content, link checks, and homepage/project-showcase content were committed. Direct ZIP download links were temporarily paused during a security review. | Reachable commits `bd47a84`, `c5fd20d`, `902e558`, `f06df6c`, `30e2afe`, `ad6409a`, `81d2c79`, `4c34871`, `32911eb`, `bb65f61`, `436577b`. Committed; deployment evidence was not recovered for these individual commits. |
| 2026-10-27 to 2026-10-28 | Initial technical SEO and first-time-visitor refinements added Organization/homepage structured data, nine project structured-data records, a project-guides overview, clearer introduction copy, canonical official links, and consistent project-guide/footer navigation. | Reachable commits `5abaec5`, `6985dfb` and per-project structured-data follow-ups through `9393398`, plus `d5c97e5`, `a3cb7f1`, and navigation/link commits. Committed; individual deployment and test evidence is unverified. |
| 2026-10-28 to 2026-10-30 | Content, credibility, and visual refinements included official social-link presentation, approved homepage banner iterations, a security-reporting policy, ComfyUI preview galleries, and refreshed project-card imagery. The banner was intentionally corrected rather than left cropped. | Reachable commits including `991c1b9`, `f6660b3`, `31fee41`, `f363acd`, `99b0ef9`, and `f3d0146`. Committed; publication evidence is unverified except where later evidence below applies. |
| 2026-10-31 (date/timezone of original setup record) | Selected Marketing Skills were installed globally and verified: product marketing, copywriting, copy editing, CRO, SEO audit, content strategy, social, launch, and offers. The subsequent marketing review recognized working category filters, guide release/source/README paths, requirements, safety guidance, and download flow; an additional chooser recommendation was withdrawn after the filters were confirmed to work. | Retained setup/review record. This changed no website files. The historical setup date is supported by the record but not by a repository commit. |
| 2026-10-31 | Responsive navigation and project-guide accessibility were improved: accessible filter behavior and announcements, responsive/touch treatment, guide link names, and a local multi-viewport regression suite. | Commit `c4e1a20`; retained record says automated validation passed at 320px, 390px, and 1440px. Historical record further states it reached `main` and relevant Pages, Playwright, link-check, and CodeQL jobs passed; physical-device and screen-reader checks remain unverified. |
| 2026-10-31 | Local accessibility regressions were added to CI. | Commit `6f258445` is reachable from `main`; retained record says Ubuntu Chromium CI, link checks, CodeQL, and Pages passed. This is historical publication evidence for that commit, not evidence for later branch work. |
| 2026-10-31 to 2026-11-01 | The marketing reassessment found a factual homepage naming mismatch: `Qwen Image Edit` differed from the guide/repository name `Semi-AI Image Editing`. It rejected redundant navigation/CTA work because filters and guide paths were already working. | Commit `79f52ff` on the feature branch; retained record says PR #1 was squash-merged as `8f834b9`, required and post-merge checks/Pages passed, and the live homepage returned HTTP 200 with the corrected name. This is the only recovered direct live-page verification in this backfill. |
| 2026-11-01 | SEO metadata and internal links were refined across the privacy/licensing pages and relevant guides; homepage/workflow wording was clarified on the feature branch. | `aa03a6b` and `6b8302f` are reachable from `origin/test/freellmapi-codex`, not `main`. Committed on the branch; merge, deployment, and live verification are unverified. |
| 2026-11-01 | Project-guide refresh, CRO/Schema.org implementation, and the latest marketing/quality discovery were recorded as separate current initiatives. | See [CRO and Schema.org optimization](2026-11-01-cro-schema-optimization.md) and [Marketing and website quality discovery](2026-11-01-marketing-website-quality-discovery.md). Both remain unpublished or recommendation-only as stated in those records. |

## Recovered findings and decisions

- The homepage slogan and established branding were preserved through the historical work. Hero-eyebrow labels are intentional.
- A rendered review found 22px padding in the previously flagged areas. The related cramped-padding detector finding was treated as a false positive; it is settled and must not be reopened without material new evidence.
- Responsive and accessibility work was intentionally verified at 320px, 390px, and 1440px. The verified behavior includes category filters (four tools, five AI workflows, and all nine projects), polite announcements, focus retention, sufficiently sized targets, guide links, image previews, local HTTP checks, and JavaScript-error checks.
- Impeccable review decisions were narrow: the intentional eyebrow/established typography were retained, and card border/shadow advisories outside scope were left standing. The local `.impeccable/` configuration was not committed and is not part of this backfill.
- The original marketing review found no need for generic conversion CTAs or a replacement chooser because category filters, source/release links, requirements, safety information, and guide paths already served the intended visitor journey.
- Screenshot/gallery work is represented by committed responsive ComfyUI previews and refreshed cards; the final project-guide refresh is local, separately documented, and not published.

## Publication reconciliation

| Scope | Discovery/proposal | Implemented or committed | Validated | Merged, deployed, and verified |
| --- | --- | --- | --- | --- |
| Early site, technical SEO, content, links, and gallery work | Historical marketing/site improvements | Yes; commits listed in chronology | Per-change evidence mostly unrecovered | Unverified for individual changes |
| Responsive accessibility improvements | Yes | Yes; `c4e1a20` | Historical multi-viewport local validation recorded | Historical record says main/CI/Pages passed; no fresh live recheck in this backfill |
| Accessibility CI | Yes | Yes; `6f258445` | Historical CI validation recorded | Historical record says main/Pages checks passed; no fresh live recheck in this backfill |
| Semi-AI Image Editing naming correction | Yes | Yes; `79f52ff` | Local regression recorded | Yes; PR #1 merged as `8f834b9`, workflow/Pages checks and live HTTP/content verification recorded |
| SEO metadata and internal links | Yes | Yes; `aa03a6b` and `6b8302f` on feature branch | No recovered standalone result beyond commit history | Not merged or deployed as evidenced here |
| Project-guide refresh and CRO/Schema.org | Yes | Local uncommitted changes | JSON-LD, diff, and local accessibility checks recorded in current review | Not committed, merged, deployed, or live-verified |
| Marketing and quality discovery | Yes | Documentation only | Evidence recorded in current review | No implementation proposed for publication yet |

## Remaining evidence gaps and follow-up boundaries

- No recoverable deployment proof exists for most October commits, even when they are reachable from `main` today. Do not convert those rows to Published without deployment evidence.
- Historical physical-device, screen-reader, external-hosted-image, and complete Core Web Vitals evidence was not recovered.
- The unresolved feature-branch commits and the current uncommitted guide/CRO/schema work need explicit approval, final review, commit/merge authorization, and post-deployment verification before being marked Published.
- The latest discovery's five ranked opportunities remain pending approval. This backfill neither reopens settled design findings nor initiates any new audit.

## Final acceptance

**NOT READY TO PUBLISH.** This documentation-only reconciliation restores the historical baseline. It makes no claim that unrecovered historical work was deployed and does not authorize implementation or publication.
