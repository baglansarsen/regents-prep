# Regentify Mobile Refactor

## What This Is

Regentify is a shipping NY Regents Exam prep platform (mobile RN/Expo app, chromebook web app, shared content, Firebase backend). This GSD project is scoped narrowly to one initiative within it: refactoring the four largest, most tangled screen components in `mobile/src/screens/` — `HomeScreen.jsx` (1681 lines), `QuizScreen.jsx` (1221 lines), `FriendsScreen.jsx` (987 lines), and `FocusScreen.jsx` (908 lines) — into smaller, testable components and hooks, without changing behavior.

## Core Value

The codebase's established pattern is "screens are thin — they call hooks and render based on returned state" (per `.planning/codebase/ARCHITECTURE.md`). These four screens are the exceptions: business logic and UI are mixed together in single files, which is why they're the hardest to touch safely and the least tested. Restoring that pattern in these four files is the one thing that must happen — everything else (test coverage, naming, sub-component boundaries) is in service of that.

## Requirements

### Validated

- ✓ Mobile app (React Native + Expo, iOS/Android/PWA) is the primary shipping product — existing
- ✓ Hook-driven architecture (screens call hooks, hooks own business logic + Firestore access) is the established pattern elsewhere in the codebase — existing
- ✓ Jest test suite exists for utils/hooks (`cd mobile && npx jest`), just not for screens — existing

### Active

- [ ] **REFACTOR-01**: `HomeScreen.jsx` is decomposed into sub-components (`components/HomeScreen/...`) and business-logic hooks, with behavior/UI unchanged
- [ ] **REFACTOR-02**: `QuizScreen.jsx` is decomposed into sub-components and hooks, with behavior/UI unchanged
- [ ] **REFACTOR-03**: `FriendsScreen.jsx` is decomposed into sub-components and hooks, with behavior/UI unchanged
- [ ] **REFACTOR-04**: `FocusScreen.jsx` is decomposed into sub-components and hooks, with behavior/UI unchanged
- [ ] **TEST-01**: Each business-logic hook extracted during the refactor has unit tests covering its state transitions
- [ ] **TEST-02**: Extracted sub-components have at minimum a render/snapshot test

### Out of Scope

- New features or UI changes to any of the four screens — this is a pure structural refactor; feature work is a separate initiative
- Refactoring other large files not flagged in `.planning/codebase/CONCERNS.md` (this pass is scoped to these 4 screens)
- Chromebook or root web app changes — mobile-only per this repo's `CLAUDE.md` focus rule
- Fixing unrelated bugs/TODOs noticed along the way (e.g. Pet Shop app-icon TODO) — noted but deferred to keep this pass low-risk

## Context

- Full architecture, stack, and structure detail already captured in `.planning/codebase/` (mapped 2026-09-14, commit `874b2634`)
- `.planning/codebase/CONCERNS.md` is the primary source for this initiative — it documents all four screens by name, why they're risky, and a suggested fix approach per screen
- Screens have ~zero unit tests today (23 test files total, almost none for screens) — CONCERNS.md flags this as High priority alongside the size issue, which is why testing is folded into this refactor rather than deferred again
- Repo-wide rule (`CLAUDE.md`): never bulk-rename with `sed -i` across `mobile/src` — per-file edits only, then `npm run check` before committing. This matters more than usual here since a past `sed` rename once shipped a crashing TestFlight build, and this refactor touches exactly the kind of large, high-traffic files that rule exists to protect
- Repo-wide rule (`CLAUDE.md`): default to working in `mobile/` only; one app per commit; ask before pushing to `master` (triggers a real Xcode Cloud iOS build)

## Constraints

- **Behavior**: No functional or visual changes — this is structure-only. Any behavior change discovered as "needed" during extraction is a signal to stop and flag it, not to slip it in.
- **Tech stack**: React Native + Expo (SDK 54), React 19, Jest for testing — must fit existing patterns in `mobile/src/hooks/`, `mobile/src/components/`, `mobile/src/context/`
- **Git workflow**: mobile-only commits, `npm run check` before each commit, ask before pushing to `master`

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Scope to all 4 flagged screens (not just HomeScreen) | User chose full sweep over incremental single-screen start | — Pending |
| Pure structural refactor, no opportunistic fixes | Keeps risk low on a mature shipping app; behavior changes get their own initiative | — Pending |
| Add tests as code is extracted, not after | Screens have had ~zero coverage for a long time; extraction is the only reliable moment to capture it | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-09-14 after initialization*
