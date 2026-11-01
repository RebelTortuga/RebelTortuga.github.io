# Website improvement tracker

This is the concise record of RebelTortuga website initiatives. Detailed evidence belongs in the linked review file.

| Initiative | Status | Review | Verified references | Notes |
| --- | --- | --- | --- | --- |
| Historical Marketing Skills effort and website improvements | Completed — historical baseline reconciled | [Historical backfill](reviews/2026-11-01-historical-marketing-skills-backfill.md) | Reachable Git history plus retained validation/publication records | Covers the original Marketing Skills selection, earlier website work, and recovered evidence boundaries; the backfill was created 2026-11-01 and is not the original discovery date. |
| Marketing and website quality discovery | Implemented — ready to publish locally | [Review](reviews/2026-11-01-marketing-website-quality-discovery.md) | README-backed chooser/guidance, local Playwright, JSON-LD, links, and diff checks passed | Priorities 2 and 3 are implemented; no deployment occurred. |
| CRO and Schema.org optimization | Implemented — ready to publish locally | [Review](reviews/2026-11-01-cro-schema-optimization.md) | Local JSON-LD checks, `git diff --check`, and local accessibility regression passed | Accepted with the same unpublished guide changes; no deployment occurred. |

## Persistent decisions

- Preserve the established branding, including intentional hero-eyebrow labels.
- The earlier cramped-padding concern was resolved by rendered evidence showing 22px padding; do not reopen it without material new evidence.
- Do not modify `.impeccable/` or add detector suppressions for website work.
- The local `scripts/accessibility-regression.cjs` exercises the checkout. `scripts/site-audit.cjs` audits the published website and does not validate uncommitted changes.
- Historical backfill evidence does not turn a commit into deployment proof; update publication state only with recorded merge, workflow, and live-verification evidence.

## Status vocabulary

- **Published:** merged and deployment verified with evidence.
- **Implemented:** local or branch changes exist; publication is not verified.
- **Pending:** needs work or approval.
- **Deferred:** deliberately postponed.
- **Rejected:** intentionally not implemented, with rationale in its review.
- **Unverified:** evidence is insufficient to establish the claimed state.
