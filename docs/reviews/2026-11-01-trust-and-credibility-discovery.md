# Trust and credibility discovery

**Status:** Releases published — website publication in progress

**Started:** 2026-11-01

## Objective and scope

Review the published RebelTortuga website from the perspective of a first-time visitor deciding whether to download and run its Windows tools or ComfyUI workflows. Verify trust claims against the live site, official GitHub repositories, READMEs, releases, and current maintenance evidence; identify the five highest-value genuine gaps without changing website implementation files.

This initiative covers download authenticity, release and source transparency, dependencies, compatibility, maintenance signals, privacy, licensing, screenshot accuracy, and support paths. It does not repeat completed SEO, CRO, accessibility, or Impeccable investigations.

## Baseline and preservation constraints

- The reviewed website baseline is `main` at `a25bc8dc8d1fd6c618d77438468ba796ac6c8d00`, matching `origin/main` after a 2026-11-01 fetch.
- The published records already establish release, source, README, issue, privacy, safety, and license paths across the guides. This discovery will assess their accuracy and usefulness rather than propose duplicate buttons or decorative trust badges.
- The prior chooser, README-backed setup guidance, Schema.org normalization, homepage flow, and synchronized toolkit screenshots are published and verified. They will not be reopened without material contrary evidence.
- Pre-existing untracked `.impeccable/` and `complete-draft.html` items must remain untouched.
- Discovery only: no website implementation, package installation, `.impeccable/` change, commit, push, merge, or deployment is authorized.

## Verified evidence

### Published website and official paths

- Read-only HTTP checks returned 200 for the live homepage, privacy/safety page, license page, and all nine project guides. Every live guide exposes the official GitHub release, source, README, issue, privacy/safety, and license paths.
- The primary action correctly opens GitHub Releases rather than an unlabelled direct file download. The source action stays in the same owner repository, and the ordinary support action opens that repository's Issues page.
- The homepage's public GitHub integration already supplies release version and repository-update dates when the API is available, with a static fallback when it is not. Adding decorative trust badges or duplicate download/source buttons would not improve the evidence.

### Releases, source, and maintenance

- All nine official repositories are public, issue-enabled, use `main`, report the MIT license, and have a non-draft latest GitHub release with one uploaded ZIP asset.
- Latest releases verified on 2026-11-01: WoW, Firefox, Brave, Shell, SDXL Inpainting, and both Wan workflows are `v1.0.0`; Clean Slate is `v0.2.0`; Semi-AI Image Editing is `v1.1.0`.
- GitHub supplies a SHA-256 digest for every latest-release ZIP. The exact nine asset digests were independently matched against the available local release archives or temporary read-only downloads.
- Each repository had a recent `main` commit between 2026-10-29 and 2026-11-02 UTC. This is a real activity signal, not a support-duration promise.
- Every `main` branch is ahead of its latest release tag by 1–13 commits. The compared changes are documentation, safety/security policy, screenshots/previews, and CodeQL configuration; the comparison did not show post-tag application/workflow code changes. The website nevertheless links current `main` documentation and images while directing visitors to older tagged ZIP contents.

### Packaged documentation and authenticity

- All nine exact release ZIPs contain a README and MIT license.
- Clean Slate `v0.2.0` and Semi-AI Image Editing `v1.1.0` also contain `SAFETY.md` and `SECURITY.md`.
- The other seven exact release ZIPs do not contain `SAFETY.md` or `SECURITY.md`, although those files now exist on each repository's `main` branch. The three older ComfyUI workflow packages do contain `DEPENDENCIES.md` and `SOURCE.json`; the four Windows-tool packages contain their operational documentation and license.
- The website's file-verification guidance is accurate but generic: it tells visitors to compare a SHA-256 value “when a release provides” one, while the guide and release notes do not surface the exact digest or a copyable Windows verification command.

### Dependencies and compatibility

- The five ComfyUI pages correctly state that models and third-party nodes are separate downloads, local inference does not require a paid API, and no verified hardware minimum is claimed.
- Qwen, SDXL, and both Wan repositories publish `DEPENDENCIES.md`; the files identify upstream projects and required node types. Clean Slate documents that the extension itself has no extra Python dependency and that its example uses PromptHistory.
- The documentation also accurately records the limit: exact installed dependency revisions were not supplied for SDXL/Wan, clean-machine compatibility is not certified, exported core-node metadata is not a certified ComfyUI minimum, and hardware minimums remain unverified. Visitors therefore have a useful list but not a reproducible known-good environment.

### Privacy, licensing, screenshots, and support

- The privacy/safety page accurately discloses GitHub hosting/data, Google Fonts, the YouTube embed, external services, local-workflow dependency risk, sensitive report contents, and safe public/private reporting behavior. The homepage actually contacts Google Fonts, GitHub/raw GitHub, the public GitHub API, YouTube's privacy-enhanced embed, and jsDelivr-hosted social icons; jsDelivr is not named, but the current disclosure is not materially misleading.
- Every repository has an MIT `LICENSE`, and the exact license is present in every release ZIP. The website correctly warns that models, custom nodes, and third-party applications keep separate terms.
- The published toolkit screenshot work remains verified as synchronized with current `main`; the ComfyUI pages label their images as previews. However, the website loads preview assets from mutable `main`. Firefox, Brave, and Shell screenshots changed after `v1.0.0`, while Clean Slate and Qwen preview assets were added after their current release tags. Those five pages therefore do not bind the displayed preview to the downloadable release.
- All nine repositories have `SECURITY.md` with a private-reporting-first flow and a safe fallback. All guides link ordinary Issues support. Four workflow repositories have bug/feature issue templates; the other five do not, but the support path itself is present and useful.

## Five highest-value genuine gaps

| Priority | Recommendation | Visitor benefit and evidence | Effort | Regression risk | State |
| --- | --- | --- | --- | --- | --- |
| 1 | Publish explicit release checksums and verification steps | Put each ZIP's exact SHA-256 in its release notes or a signed/checksummed manifest, and give visitors a copyable `Get-FileHash` comparison on the guide/safety path. All nine assets already have verified GitHub digests, but the values and procedure are not presented where a cautious Windows visitor can use them. | Medium across nine releases; low for the reusable website explanation | Low | Completed in nine release notes and locally updated guides |
| 2 | Synchronize trusted documentation with downloadable release packages | Issue new patch releases so packaged README, `SAFETY.md`, `SECURITY.md`, license, screenshots, and release notes match the current reviewed repository state. Seven exact latest ZIPs omit the safety/security files now present on `main`, and every repository is ahead of its release tag. Preserve immutable history; do not move or replace existing tags silently. | Medium to high because nine releases require packaging and verification | Medium; release mistakes affect downloads | Completed with nine immutable patch releases |
| 3 | Publish a reproducible tested-environment record for each ComfyUI project | Record the actually tested ComfyUI revision/version, custom-node commits/tags, model filenames/sources/licenses, validation date, and known GPU/VRAM configuration without presenting it as a minimum. Current dependency lists identify node types and upstreams but intentionally do not establish clean-machine or exact-version compatibility. | Medium to high; requires real environment capture and validation | Low for documentation; medium if dependency advice is wrong | Evidence-bounded website disclosure implemented; new environment testing remains unperformed |
| 4 | Add a static release and maintenance identity block to each guide | Show current release tag and date, last documentation/compatibility verification date, supported or explicitly unverified scope, changelog, and security-policy link. Only Clean Slate and Qwen currently show a static version on their guides; homepage API badges are helpful but do not replace deep-link context or a maintenance policy. | Low to medium with a shared content pattern | Low | Implemented locally |
| 5 | Bind each screenshot or workflow preview to a release or label its provenance | Use tag-pinned image URLs or state clearly that an image represents current `main`, then retain a release-specific screenshot for the downloadable version. Five preview assets changed or were added after the latest tag, so current visual accuracy cannot be inferred for the release ZIP from the URL alone. | Medium; requires per-project provenance review | Low | Implemented locally |

## Already completed and not recommended again

- Official release, source, README, issue, privacy/safety, license, and concern-reporting paths are present and live on all guides.
- Public source, real versioned GitHub releases, MIT licenses, packaged license files, SHA-256 release digests, recent repository activity, current-main screenshots, and SECURITY policies are genuine existing trust signals.
- The site already avoids direct-download ambiguity by opening the release page, distinguishes independent projects from referenced companies, avoids unsupported hardware claims, and labels donations as optional.
- Do not add fabricated testimonials, certifications, popularity claims, security-audit claims, generic trust badges, or duplicate calls to action.
- Issue templates for the remaining five repositories and a more exhaustive third-party host inventory could improve triage/disclosure, but they rank below the five visitor-facing release, compatibility, and preview gaps above.

## Validation performed

- Fetched `origin` and confirmed local `main` and `origin/main` both equal `a25bc8dc8d1fd6c618d77438468ba796ac6c8d00`.
- Read the tracker and all four prior review records to preserve completed SEO, CRO, accessibility, Schema.org, flow, and screenshot decisions.
- Read-only live HTTP checks: homepage, privacy/safety, licenses, and nine guides all returned 200 and the guide trust links were present.
- GitHub API/connector checks: repository metadata, latest releases/assets/digests, latest commits, release-tag-to-`main` comparisons, README, dependency, security, license, and issue-template paths for all nine repositories.
- Release-archive inspection: matched all nine ZIP SHA-256 values to GitHub's asset digests and inspected their manifests without executing project code. Two missing local archives were downloaded to a dedicated temporary directory and removed after inspection.
- No package installation, application execution, malware scan, signature verification, clean-machine ComfyUI test, screen-reader test, physical-device test, commit, push, merge, or deployment was performed.

## Uncertainties and limits

- Matching a release digest proves identity with the published GitHub asset, not that the software is safe or independently audited.
- Current-main screenshots and documented prior PSD/image validation establish provenance and synchronization, not independent runtime fidelity for every downloadable release.
- Private vulnerability reporting availability was not independently confirmed for each repository; the policies correctly provide a safe fallback when it is unavailable.
- No support response-time, maintenance duration, older-version support, clean-machine compatibility, or hardware minimum should be inferred from recent commits.

## Discovery verdict

**DISCOVERY COMPLETE.** The current site already had substantial genuine trust evidence. The five recommendations above identified specific release-authenticity, package-sync, reproducibility, maintenance-context, and screenshot-provenance gaps without proposing decorative or unsupported trust claims.

## Approved implementation follow-up

Implementation began only after approval on 2026-11-01. The local website now:

- shows the exact verified SHA-256 digest, release tag, UTC publication date, asset name, and a copyable PowerShell 7 `Get-FileHash` comparison for every project;
- links maintenance evidence to the current repository commit while explicitly promising no update cadence or response time;
- identifies each preview as release-specific or current-branch and explains when a current-branch image postdates the published release;
- reports ComfyUI validation only at the level supported by repository records, separating author-confirmed runtime observations from structural checks and unverified minimums; and
- retains the existing release, source, README, issue, privacy/safety, license, and concern-reporting paths rather than adding duplicate buttons or badges.

The nine repositories were fetched and compared with their latest tags. Each current `main` matches `origin/main`; all are ahead of the latest release only in documentation, policy, CI, or preview files. Documentation-only patch releases are therefore justified, but none were built or published. The exact proposed versions, filenames, package manifests, version-string files, release-note substance, and approval gates are recorded in the [patch-release preparation](../release-preparation/2026-11-01-trust-credibility-patch-release-plan.md).

### Implementation state

**RELEASES PUBLISHED — WEBSITE PUBLICATION IN PROGRESS.** The nine approved patch releases are public and their historical predecessors remain unchanged. The local website now references the new release tags, publication date, exact asset names, verified digests, merged maintenance commits, and tag-pinned previews.

### Implementation validation

- `git diff --check` passed, and the updated accessibility script passed `node --check`.
- Local project-guide link resolution passed for 69 file references across all nine guides. Read-only HTTP checks passed for all 28 changed GitHub tag, commit, and preview evidence URLs.
- The local Edge/Playwright regression passed homepage behavior at 320, 390, and 1440 pixels; release evidence and verification commands on all nine guides at 320 pixels; representative workflow layout and targets at 320, 390, and 1440 pixels; original-image navigation; and the JavaScript/local-HTTP error check. The first run exposed a long-filename overflow at 320 pixels; the facts and command columns were given intrinsic-size bounds and the complete rerun passed.
- Visual inspection of the representative trust panel at 320 and 1440 pixels found the existing design, hierarchy, wrapping, and responsive stacking intact.
- All nine published ZIP assets were hashed again from their actual bytes. The seven retained local archives and two fresh temporary GitHub downloads exactly matched the digests shown on the guides; the temporary downloads were removed afterward.
- PowerShell parsing passed for all nine scripts in the four Windows-tool repositories. Clean Slate passed Python compilation, JavaScript syntax, workflow JSON, and `pyproject.toml` parsing. Qwen, SDXL, and both Wan validators passed; the latter three correctly reported structural validation only and no GPU execution.
- The initial `py` launcher attempt could not find an installed interpreter through its launcher configuration. Validation was rerun successfully with the installed Python 3.13 executable. Its generated `__pycache__` and the temporary visual-review screenshots were removed.
- All nine project repositories remain clean. The pre-existing website `.impeccable/` and `complete-draft.html` items remain untouched.

## Release publication

The approved documentation-only patch releases were published on 2026-11-02 UTC:

| Project | Release | Verified SHA-256 |
| --- | --- | --- |
| Brave Toolkit | [v1.0.1](https://github.com/RebelTortuga/brave-diagnostic-and-repair-toolkit/releases/tag/v1.0.1) | `f4146d4062c520f225f1a18d28740a2c94d186050b97a734243fb3871f428db8` |
| Firefox Toolkit | [v1.0.1](https://github.com/RebelTortuga/firefox-diagnostic-and-repair-toolkit/releases/tag/v1.0.1) | `b98070ef5fa56087e29a05275914bb9e1b27b76f671791c89a95ae340bd94508` |
| Shell Toolkit | [v1.0.1](https://github.com/RebelTortuga/shell-diagnostic-and-repair-toolkit/releases/tag/v1.0.1) | `69ff3f2e6aea6e0e043438bd0b2180ad81854055ff1fb4bd019d7c5362449724` |
| WoW Toolkit | [v1.0.1](https://github.com/RebelTortuga/wow-diagnostic-and-repair-toolkit/releases/tag/v1.0.1) | `6e04a103637915ee6b0cbfbc31f63f8eb4a4dc358de6f479c005cd408d87d711` |
| Clean Slate | [v0.2.1](https://github.com/RebelTortuga/comfyui-clean-slate/releases/tag/v0.2.1) | `701b0961e6d1eb4b23f55c671df183be5b133c24ed2d609689a3f9e2defc5873` |
| Semi-AI Image Editing | [v1.1.1](https://github.com/RebelTortuga/comfyui-free-local-qwen-image-edit/releases/tag/v1.1.1) | `32dfec574b04b06b03bdf111988c0466a438c489ba4f3a1ef26b776a5287d1d9` |
| SDXL Inpainting | [v1.0.1](https://github.com/RebelTortuga/comfyui-free-local-sdxl-inpainting/releases/tag/v1.0.1) | `4e898eccb6131e3f36c7e99828d0b4c06e32912c52f1dba57526216f7d14d505` |
| Wan Video Quality | [v1.0.1](https://github.com/RebelTortuga/comfyui-free-local-wan-video-quality/releases/tag/v1.0.1) | `1dd90cf2d7a46256fa1d77b3df5f972118d979f116292f565fcf87d3123b1064` |
| Wan Video High Resolution | [v1.0.1](https://github.com/RebelTortuga/comfyui-free-local-wan-video-high-resolution/releases/tag/v1.0.1) | `3c9cdd46cbb09671de205d78bbbeb25c3ba64dc9df7481acd3163627e8c18a8d` |

Each asset was downloaded after publication and matched both GitHub's recorded digest and the checksum in its release body. Archive manifests, clean extraction, applicable PowerShell/Python/JavaScript/workflow validation, and Microsoft Defender scanning passed. Clean Slate and Semi-AI Image Editing were published by their existing release workflows; their validated ZIPs include the required project files plus current repository metadata. No historical release or asset was replaced or deleted.
