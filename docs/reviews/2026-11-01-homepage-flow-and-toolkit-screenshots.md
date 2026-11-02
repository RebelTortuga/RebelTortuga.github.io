# Homepage flow and toolkit screenshot synchronization

**Status:** Implemented

**Started:** 2026-11-01

## Objective and scope

Improve the homepage content order and synchronize the Firefox, Brave, and Shell toolkit screenshots from the supplied PSD composites. The initiative covers the website homepage, the three corresponding website project guides, and documentation screenshot assets and references in the three toolkit repositories.

Application code, release archives, the video project, the preserved PSD source files, and unrelated repository content are out of scope. No commit, push, pull request, merge, or deployment is authorized.

## Baseline and verified evidence

- The website is on `main` and initially has two unrelated untracked items: `.impeccable/` and `complete-draft.html`. They must remain untouched.
- The supplied source directory contains `Firefox screenshot.psd`, `Brave screenshot.psd`, and `Shell screenshot.psd`.
- The current clean toolkit working copies are under `D:\Lifeguard\Privacy\RebelTortuga\Repositories`; after a remote fetch, each matches `origin/main`.
- Older clean copies under `My Repo's on Github` are 9–10 commits behind `origin/main` and are not implementation targets.
- Existing public screenshot URLs point to each toolkit repository's `assets/screenshot.png`; those paths must remain unchanged.

## Requested changes

- Move the three-step “Pick a project. Make it yours.” guidance above “The project collection.”
- Place project filters directly above the project cards and below the ComfyUI workflow chooser.
- Move GitHub statistics and status text below the project cards and above the personal/Ko-fi section.
- Keep the two specified long headings on one line when desktop width permits while preserving readable mobile wrapping.
- Export each PSD composite losslessly to the corresponding `assets/screenshot.png`, synchronize website previews and descriptions, and preserve the PSD originals.

## Validation plan

- Compare exported PNG dimensions and rendered content with the PSD composites.
- Run the website's local regression checks and inspect desktop and mobile layouts, filters, images, links, keyboard behavior, and horizontal overflow.
- Inspect documentation references and exact Git diffs in all four repositories.

## Acceptance

### Implemented changes

- Moved the three-step project guidance above the project collection while preserving its established content and responsive layout.
- Moved the filters below the ComfyUI chooser and directly above the project cards.
- Moved the dynamically generated GitHub status and portfolio statistics below the cards and above the personal/Ko-fi section. Per-card GitHub metadata remains attached to each card.
- Removed the forced desktop line break from “Free tools and local workflows, explained clearly.” and applied desktop-only no-wrap behavior to it and “Browse free tools and local AI workflows.” Mobile headings retain normal wrapping.
- Updated the homepage and three project guides with specific screenshot descriptions while preserving their public raw GitHub URLs.
- Replaced each current toolkit repository's `assets/screenshot.png` with a lossless flattened PSD export and updated its README screenshot description. No toolkit application code or release archive changed.

### Affected files

Website repository:

- `index.html`
- `assets/github-live.js`
- `projects/firefox-diagnostic-and-repair-toolkit.html`
- `projects/brave-diagnostic-and-repair-toolkit.html`
- `projects/shell-diagnostic-and-repair-toolkit.html`
- `docs/reviews/2026-11-01-homepage-flow-and-toolkit-screenshots.md`
- `docs/reviews/README.md`
- `docs/website-improvement-tracker.md`

Each Firefox, Brave, and Shell toolkit repository:

- `README.md`
- `assets/screenshot.png`

### Validation results

- Existing local Playwright accessibility regression passed in Microsoft Edge at 320px, 390px, and 1440px. It also passed keyboard filter/focus/announcement checks, touch-target checks, all nine guide checks, preview popup navigation, and local JavaScript/HTTP error checks.
- Focused local rendered validation confirmed the requested DOM and visual order, five AI cards after keyboard activation of the filter, no horizontal overflow at 390px or 1440px, one-line target headings at 1440px, and normal mobile wrapping at 390px (three lines and two lines respectively).
- Focused local image routing confirmed the new PNGs decode on the homepage and corresponding guides at Firefox 1032 × 886, Brave 1026 × 884, and Shell 1032 × 884.
- RGB24 frame hashes match between every PSD composite and exported PNG: Firefox `a28f0c85d7548d4902302c633a7e2a26`, Brave `b853feb7ecdb1232f11099c629377703`, and Shell `be0b9f5cf9e2f9bcb01ea9fb15306831`.
- Visual inspection of the PSD exports and rendered homepage at 390px and 1440px found no clipping, overlap, broken hierarchy, or unreadable wrapping.
- `git diff --check` passed in the website and all three toolkit repositories. The final Impeccable layout detector returned no deterministic findings.

### Limitations and publication state

- Screen-reader and physical-device testing remain unverified.
- The raw GitHub image URLs still serve the published screenshots until the three toolkit repository changes are committed and published; local routing was used to verify the new files in the website layouts.
- No commit, push, pull request, merge, deployment, or live-site verification occurred.

**READY TO PUBLISH.** Publication requires explicit authorization and coordinated changes across four repositories.
