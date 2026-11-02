# Trust and credibility patch-release preparation

**Status:** Completed — nine patch releases published and verified

**Prepared:** 2026-11-01

## Release decision

A documentation-only patch release is justified for each project. Every current `main` branch contains reviewed documentation, safety/security policy, or preview improvements that are not present in its latest immutable release tag. The tag-to-`main` comparisons show no post-tag tool or workflow logic changes.

The proposed releases must be created from a reviewed commit after approval. Existing tags and uploaded ZIPs must remain unchanged. Each new ZIP must receive a newly calculated SHA-256 digest after packaging; the website must not replace its current-release version, date, asset name, or digest until that new release is published and independently verified.

| Repository | Current | Proposed | Release-specific reason | Proposed asset |
| --- | --- | --- | --- | --- |
| `brave-diagnostic-and-repair-toolkit` | `v1.0.0` | `v1.0.1` | Package revised operational docs, `SAFETY.md`, `SECURITY.md`, and the synchronized screenshot. | `Brave-Diagnostic-and-Repair-Toolkit-v1.0.1-GitHub.zip` |
| `firefox-diagnostic-and-repair-toolkit` | `v1.0.0` | `v1.0.1` | Package revised operational docs, `SAFETY.md`, `SECURITY.md`, and the synchronized screenshot. | `Firefox-Diagnostic-and-Repair-Toolkit-v1.0.1-GitHub.zip` |
| `shell-diagnostic-and-repair-toolkit` | `v1.0.0` | `v1.0.1` | Package revised operational docs, `SAFETY.md`, `SECURITY.md`, and the synchronized screenshot. | `Shell-Diagnostic-and-Repair-Toolkit-v1.0.1-GitHub.zip` |
| `wow-diagnostic-and-repair-toolkit` | `v1.0.0` | `v1.0.1` | Package revised operational docs plus `SAFETY.md` and `SECURITY.md`. | `WoW-Diagnostic-and-Repair-Toolkit-v1.0.1-GitHub.zip` |
| `comfyui-clean-slate` | `v0.2.0` | `v0.2.1` | Package the current README and the two current-branch screenshots; no node or browser-extension logic changed after the tag. | `comfyui-clean-slate-v0.2.1.zip` |
| `comfyui-free-local-qwen-image-edit` | `v1.1.0` | `v1.1.1` | Package the current README and current-branch workflow preview; no workflow JSON or validator changed after the tag. | `comfyui-free-local-qwen-image-edit-v1.1.1.zip` |
| `comfyui-free-local-sdxl-inpainting` | `v1.0.0` | `v1.0.1` | Package the current README, `SAFETY.md`, and `SECURITY.md`; CodeQL configuration remains repository-only. | `comfyui-free-local-sdxl-inpainting-v1.0.1.zip` |
| `comfyui-free-local-wan-video-quality` | `v1.0.0` | `v1.0.1` | Package the current README, `SAFETY.md`, and `SECURITY.md`; CodeQL configuration remains repository-only. | `comfyui-free-local-wan-video-quality-v1.0.1.zip` |
| `comfyui-free-local-wan-video-high-resolution` | `v1.0.0` | `v1.0.1` | Package the current README, `SAFETY.md`, and `SECURITY.md`; CodeQL configuration remains repository-only. | `comfyui-free-local-wan-video-high-resolution-v1.0.1.zip` |

## Exact package manifests

The four Windows-tool ZIPs should contain the same runtime and documentation files as their current release archives, with `SAFETY.md` and `SECURITY.md` added. Include the current tracked files below; do not include Git history or GitHub workflow files.

- Brave: `Brave Diagnostic and Repair Toolkit.bat`, `BraveBackup.ps1`, `BraveToolkit-Sidebar.ps1`, `CHANGELOG.md`, `LICENSE`, `Launch-Toolkit.vbs`, `OPTIONS-README.md`, `README.md`, `RUN-README.md`, `SAFETY.md`, `SECURITY.md`, `assets/RebelTortuga.png`, and `assets/screenshot.png`.
- Firefox: `Firefox Diagnostic and Repair Toolkit.bat`, `FirefoxBackup.ps1`, `FirefoxToolkit-Sidebar.ps1`, `CHANGELOG.md`, `LICENSE`, `Launch-Toolkit.vbs`, `OPTIONS-README.md`, `README.md`, `RUN-README.md`, `SAFETY.md`, `SECURITY.md`, `assets/RebelTortuga.png`, and `assets/screenshot.png`.
- Shell: `Shell Diagnostic and Repair Toolkit.bat`, `ShellBackup.ps1`, `ShellToolkit-Sidebar.ps1`, `Start.cmd`, `CHANGELOG.md`, `LICENSE`, `Launch-Toolkit.vbs`, `OPTIONS-README.md`, `README.md`, `RUN-README.md`, `SAFETY.md`, `SECURITY.md`, `assets/RebelTortuga.png`, and `assets/screenshot.png`.
- WoW: `WoW Diagnostic and Repair Toolkit.bat`, `WoW Diagnostic and Repair Toolkit.ps1`, `WoWToolkit-Sidebar.ps1`, `RebelTortuga-WoW-Diagnostics.ps1`, `CHANGELOG.md`, `LICENSE`, `Launch-Toolkit.vbs`, `OPTIONS-README.md`, `README.md`, `RUN-README.md`, `SAFETY.md`, `SECURITY.md`, `assets/RebelTortuga.png`, and `assets/screenshot.png`.

The five ComfyUI ZIPs should contain these current tracked project files; `.github/` remains repository-only.

- Clean Slate: `CHANGELOG.md`, `LICENSE`, `README.md`, `RELEASE_NOTES.md`, `SAFETY.md`, `SECURITY.md`, `__init__.py`, `pyproject.toml`, `release.json`, `web/README.md`, `web/clean_slate.js`, `examples/ComfyUI-Clean-Slate.json`, and all seven tracked files under `assets/`.
- Semi-AI Image Editing: `CHANGELOG.md`, `DEPENDENCIES.md`, `LICENSE`, `OPTIONS-README.md`, `README.md`, `RELEASE_NOTES.md`, `SAFETY.md`, `SECURITY.md`, `SOURCE.json`, `VERSION`, `release.json`, `scripts/validate_workflow.py`, `workflow.json`, and all four tracked files under `assets/`.
- SDXL Inpainting and both Wan variants: `CHANGELOG.md`, `DEPENDENCIES.md`, `LICENSE`, `OPTIONS-README.md`, `README.md`, `SAFETY.md`, `SECURITY.md`, `SOURCE.json`, `scripts/validate_workflow.py`, `workflow.json`, `assets/RebelTortuga.png`, and `assets/workflow-preview.png`.

## Files to update before tagging

The release commit should update only release identity and release-note records beyond the already reviewed `main` content.

- Brave: `BraveToolkit-Sidebar.ps1`, `README.md`, `RUN-README.md`, and `CHANGELOG.md` (`1.0.0` to `1.0.1` only where it identifies this toolkit; do not change the Firefox reference or `brave://version`).
- Firefox: `FirefoxToolkit-Sidebar.ps1`, `README.md`, `RUN-README.md`, `OPTIONS-README.md`, and `CHANGELOG.md` (`1.0.0` to `1.0.1` only where it identifies this toolkit).
- Shell: `ShellBackup.ps1`, `ShellToolkit-Sidebar.ps1`, `README.md`, `RUN-README.md`, `OPTIONS-README.md`, and `CHANGELOG.md` (`1.0.0` to `1.0.1` only where it identifies this toolkit).
- WoW: `WoWToolkit-Sidebar.ps1` and `CHANGELOG.md`. The Firefox `v1.0.0` design reference and game-version variables are unrelated and must not change.
- Clean Slate: `pyproject.toml`, `release.json`, `RELEASE_NOTES.md`, and `CHANGELOG.md` (`0.2.0` to `0.2.1`).
- Semi-AI Image Editing: `VERSION`, `release.json`, `SOURCE.json`, `RELEASE_NOTES.md`, and `CHANGELOG.md` (`1.1.0` to `1.1.1`). The Clean Slate `v0.2.0 or newer` dependency remains valid and must not be changed merely to match this release.
- SDXL Inpainting and both Wan variants: add the patch entry to `CHANGELOG.md`. Their existing repositories do not use a `VERSION`, `release.json`, or `RELEASE_NOTES.md` convention; introducing one is optional and should be a separate consistency decision rather than a release requirement.

## Draft release-note substance

Each release should state that it is a documentation and packaging refresh with no post-tag tool or workflow logic change. List the exact added safety/security documents and any updated preview. State the validation actually performed for that repository. Do not describe source inspection or structural workflow validation as runtime, GPU, clean-machine, malware, or security-audit testing.

For each release, publish the new ZIP filename and its newly calculated SHA-256 digest in the release body. Retain the disclaimer that a matching digest establishes identity with the published asset, not that the software is harmless, signed, or independently audited.

## Approval and publication gates

1. Approve the proposed versions and filenames.
2. Apply and review the listed version/release-note changes in each repository.
3. Run the repository-specific syntax and structural checks again after those edits.
4. Build each ZIP from the reviewed tag candidate using the exact manifest above.
5. Inspect every ZIP entry, extract to a clean temporary directory, rerun the non-destructive checks, and calculate SHA-256 twice from the final bytes.
6. Obtain separate approval before any commit, push, tag, GitHub release, or asset upload.
7. After publication, verify the GitHub asset digest and download, then update the website release block and screenshot provenance in a separate reviewed change.

## Publication outcome

All nine approved versions were committed through scoped pull requests, merged, packaged, published, downloaded, and hash-verified. The four Windows tools and three older workflow repositories use the explicit root-level manifests above. Existing publish workflows created the Clean Slate and Semi-AI Image Editing ZIPs with a containing project folder and current repository metadata in addition to every required project file; those immutable automated assets were preserved and independently validated rather than replaced.

No historical tag, release, or asset was overwritten or deleted. The website publication was completed and verified; the linked trust and credibility review records the exact merge, Actions, and live-site evidence.
