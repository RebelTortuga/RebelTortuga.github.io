# CRO and Schema.org optimization

**Status:** Published and verified

**Started:** 2026-11-01
**Final acceptance:** NOT READY TO PUBLISH (publication authorization has not been given)

## Objective and scope

Improve how visitors select a free tool, reach its GitHub release or source, and begin a local workflow. Normalize the homepage and project-guide JSON-LD without fabricating commercial, rating, review, or rich-result data.

Scope: homepage review plus the nine project guides. The homepage was reviewed but not changed because its filters, guide links, source links, and accessible controls already supported the intended path.

## Verified findings and decisions

- The homepage has nine projects, with working filters for four Windows/gaming tools and five ComfyUI/AI projects. The filter result uses a polite live region and retains keyboard focus.
- All guides provide GitHub release, source, README, and issue links. The two Wan Video guides lacked the concise, documentation-backed local-start pattern used by the other refreshed guides.
- `SoftwareSourceCode` supports `codeRepository`; `SoftwareApplication` does not list that property. The application entities therefore do not use it.
- No ratings, reviews, download counts, paid offers, unsupported hardware claims, or rich-result claims were added.
- Intentional hero-eyebrow labels remain unchanged. The prior cramped-padding concern remains settled by rendered evidence of 22px padding and was not reopened.

## Implemented changes

- Added structured, three-step local setup guidance to the Wan Video Quality and Wan Video High Resolution guides, based on their repository READMEs: install documented ComfyUI components, import `workflow.json`, then load a reference image and inspect the prepared reference before generating.
- Added stable per-guide `@id` values, canonical `mainEntityOfPage` URLs, and the shared `https://rebeltortuga.github.io/#organization` author identifier across all nine guide entities.
- Added the missing SDXL Inpainting license URL.
- Removed `codeRepository` from the five `SoftwareApplication` entities while retaining it on the four `SoftwareSourceCode` workflow entities.
- Reused the existing scoped `project-guide-refresh.css` for the two Wan guides; no design-system or homepage rewrite was introduced.

## Affected files

- `projects/brave-diagnostic-and-repair-toolkit.html`
- `projects/comfyui-clean-slate.html`
- `projects/comfyui-free-local-qwen-image-edit.html`
- `projects/comfyui-free-local-sdxl-inpainting.html`
- `projects/comfyui-free-local-wan-video-high-resolution.html`
- `projects/comfyui-free-local-wan-video-quality.html`
- `projects/firefox-diagnostic-and-repair-toolkit.html`
- `projects/shell-diagnostic-and-repair-toolkit.html`
- `projects/wow-diagnostic-and-repair-toolkit.html`

The pre-existing untracked `assets/project-guide-refresh.css` supplies the scoped presentation used by the guide refresh. It was preserved, not changed in this initiative record. `.impeccable/` was preserved and not modified.

## Validation

- JSON-LD parse and identity/property checks passed for 12 entities across the homepage and nine guides.
- `git diff --check` passed.
- `scripts/accessibility-regression.cjs` passed locally using Playwright 1.58.2 and Edge at 320px, 390px, and 1440px. It verified navigation touch targets, keyboard filters and announcements, all guide requirements and original-image links, a representative workflow layout, return navigation, and no local JavaScript or HTTP errors.

## Limitations and publication state

- The existing `scripts/site-audit.cjs` targets the published website, not this worktree. Its local execution was blocked because Playwright could not resolve the required headless-shell executable after temporary browser installation attempts.
- Screen-reader and physical-device testing are unverified.
- No commit, pull request, push, merge, deployment, or live verification has occurred for these local changes.
- Before publication: review the final diff, obtain explicit authorization, include this review with the approved source changes, then verify deployment and update this file, the tracker, and the index.

## Consolidated acceptance — 2026-11-01

This implementation was accepted together with the approved ComfyUI chooser and README-backed troubleshooting additions recorded in [the marketing and website quality discovery](2026-11-01-marketing-website-quality-discovery.md). The chooser and guidance do not alter the existing JSON-LD entities or claims.

- JSON-LD parsed successfully for the homepage and nine guides during the combined local validation.
- The existing local Playwright regression passed at 320px, 390px, and 1440px after the chooser assertions were added.
- `git diff --check` passed; relative homepage/project links and assets resolve locally.

**READY TO PUBLISH.** This is a local acceptance verdict only. Commit, merge, deployment, and live verification still require explicit authorization and subsequent evidence.

## Publication verification — 2026-11-01

The CRO/Schema.org changes were published through [PR #4](https://github.com/RebelTortuga/RebelTortuga.github.io/pull/4), implementation commit `1c7c3d4112c689b7870f9539007275731d54e004`, and squash merge commit `800a890db1825284cecb1a66f50b37ac9a0e5f90`.

- Pages deployment, link checks, the published-site Playwright audit, and CodeQL all passed after the merge.
- Live Pages returned parseable homepage and guide JSON-LD together with the published chooser and guide guidance.

**PUBLISHED AND VERIFIED.** Screen-reader and physical-device testing remain unverified.
