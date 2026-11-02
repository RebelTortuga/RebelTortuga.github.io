# Featured homepage video publication

**Status:** Ready to publish

**Started:** 2026-11-01

## Objective and scope

Make the supplied FINAL-v3 video the primary homepage feature with the supplied approved PNG as its unmodified splash screen. Preserve the pre-existing YouTube introduction as a low-profile accessible archive. The nine already-published releases and trust-and-credibility work are out of scope.

## Baseline and decision

- The homepage previously embedded the original introduction from `https://www.youtube-nocookie.com/embed/tsU-OI5KEvU`.
- No confirmed YouTube destination was supplied for FINAL-v3, so the primary feature uses the repository's GitHub Pages hosting rather than inventing a URL or uploading a video.
- User-supplied FINAL-v3 and splash PNG are copied byte-for-byte into `assets/`; source files remain unchanged.

## Implemented changes

- Replaced the primary iframe with an HTML video player using FINAL-v3 and the supplied poster PNG.
- Retained a native controls fallback download link and added descriptive player context.
- Preserved the earlier video behind an accessible collapsed archive disclosure to avoid homepage clutter.

## Validation and acceptance

- FINAL-v3 and the supplied PNG copies are byte-identical to their supplied source files by SHA-256.
- `git diff --check` passes.
- The local Microsoft Edge regression passes, including the targeted check that FINAL-v3 loads, advances during playback, and uses the approved poster. The existing homepage checks also pass at 320px, 390px, and 1440px without local JavaScript or HTTP errors.
- Screen-reader and physical-device checks are not performed.

**READY TO PUBLISH.**
