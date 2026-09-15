---
phase: "3"
slug: "friendsscreen-decomposition"
status: draft
nyquist_compliant: false
wave_0_complete: false
created: "2026-09-15"
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest `29.7.0` via `jest-expo` `54.0.18` preset |
| **Config file** | `mobile/package.json`'s `"jest"` key — no separate `jest.config.js` |
| **Quick run command** | `cd mobile && npx jest <path-to-file>` |
| **Full suite command** | `cd mobile && npx jest` (or `npm run check` for jest + parse-check) |
| **Estimated runtime** | ~2 seconds (full suite, per Phase 2's measured baseline) |

---

## Sampling Rate

- **After every task commit:** Run `cd mobile && npx jest <touched-test-file(s)>`
- **After every plan wave:** Run `cd mobile && npx jest` (full suite)
- **Before `/gsd-verify-work`:** Full suite must be green, plus the FRIENDS-06 manual UAT pass
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 0 | FRIENDS-01 | — | N/A | docs | N/A — manual doc review against `03-CHARACTERIZATION.md` | ❌ W0 | ⬜ pending |
| 03-01-02 | 01 | 1 | FRIENDS-02, FRIENDS-04 | — | N/A | unit | `cd mobile && npx jest src/__tests__/useFriendsScreenState.test.js` | ❌ W0 | ⬜ pending |
| 03-01-03 | 01 | 1-N | FRIENDS-03, FRIENDS-05 | — | N/A | render/snapshot + interaction (D-01 tier split) | `cd mobile && npx jest src/components/FriendsScreen/__tests__/` | ❌ W0 | ⬜ pending |
| 03-01-04 | final | final | FRIENDS-06 | — | N/A | manual | N/A — manual QA vs. `03-CHARACTERIZATION.md` + UI-SPEC (if any) | manual-only | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `.planning/phases/03-friendsscreen-decomposition/03-CHARACTERIZATION.md` — pre-extraction characterization notes for FRIENDS-01; must exist and be committed *before* any extraction code moves. Must explicitly cover: leaderboard-segment-toggle (friends/school/league), friend-request accept/**decline** (not "block" — REQUIREMENTS.md's wording is stale per research Pitfall 4; verified zero "block" functionality in `useFriends.js`/`FriendsScreen.jsx`), the separate remove-friend flow, incoming battle-challenge accept, and the 4-tab structure.
- [ ] `mobile/src/__tests__/useFriendsScreenState.test.js` — stubs for FRIENDS-02/FRIENDS-04. Mock each of the 5 domain hook modules directly (`jest.mock('../hooks/useFriends')` etc.) rather than mocking `firebase/firestore` wholesale — smaller surface, matches this phase's actual scope (the new hook, not the 5 pre-existing wrapped hooks). Mock `useFocusEffect` per-file (judgment call — see research Assumption A1) since `renderHook()` mounts with no navigator ancestor.
- [ ] `mobile/src/components/FriendsScreen/__tests__/*.test.jsx` — one per sub-component, stubs for FRIENDS-03/FRIENDS-05. `Podium`/`RankRow`'s `Animated` internals need NO special mocking — Phase 2's `BigPetDisplay.test.jsx` precedent exercises real `Animated.loop`/`sequence`/`timing` with zero mocking and passes cleanly; render/interact against static output only, never assert on `Animated.Value` internals.
- [ ] Per-test-file `jest.mock()` fixtures for `AuthContext`/`ThemeContext` (same pattern as Phase 2) plus the 5 domain hook mocks above.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| FriendsScreen behavior/UI parity after decomposition | FRIENDS-06 | Characterization-based refactor testing exists precisely because an automated snapshot only proves new code matches itself, not that it matches pre-extraction behavior | Manually exercise FriendsScreen (all 4 tabs, leaderboard segment toggle, friend request accept/decline, remove friend, battle challenge accept, podium animation) against `03-CHARACTERIZATION.md` |

*Known risk:* this carries the same risk Phase 2's FOCUS-06 hit — may end up "honest unrun" if no simulator/human-interaction tooling is available to the executing agent (see `02-08-SUMMARY.md` for that precedent). Plan accordingly; do not fabricate a pass.

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
