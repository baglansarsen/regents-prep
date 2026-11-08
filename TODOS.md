# TODOS

## Content

### One owner for question content (mobile/src/content vs shared/content)

**What:** Decide one owner for each subject's question content, or add a check that fails when `mobile/src/content` and `shared/content` disagree.

**Why:** The two folders have drifted. The Learn Mode pilot (shipped 2026-09-23) targeted Geometry ids 3001-3006, which exist only in `shared/content`, so it never ran for six weeks and nothing reported it.

**Context:** Mobile screens import `../content/<subject>/index` (e.g. `mobile/src/screens/HomeScreen.jsx:33`); the chromebook app imports `@content` → `shared/content` (`chromebook/src/App.jsx:21`). Commit `0082fbb` (2026-06-07) replaced mobile's Geometry practice questions with the Regents exam bank. CLAUDE.md is being corrected to describe this (Learn Mode CEO review D4), but the copies can keep drifting. Start by listing, per subject, which tree each app reads and where they differ. Found in the eng review of `docs/designs/learn-mode-pilot-probe.md` (R2), 2026-11-07.

**Effort:** M (human) / S (CC + gstack)
**Priority:** P2
**Depends on:** None

## Completed
