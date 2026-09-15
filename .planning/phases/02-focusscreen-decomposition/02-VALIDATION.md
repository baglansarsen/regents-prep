---
phase: "2"
slug: "focusscreen-decomposition"
status: draft
nyquist_compliant: false
wave_0_complete: false
created: "2026-09-14"
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest `^29.7.0` with `jest-expo ~54.0.18` preset |
| **Config file** | `mobile/package.json`'s `"jest"` key — no separate `jest.config.js` |
| **Quick run command** | `cd mobile && npx jest src/__tests__/useFocusScreenState.test.js` (or the relevant sub-component test file) |
| **Full suite command** | `cd mobile && npx jest` (or `npm run check` for jest + parse-check) |
| **Estimated runtime** | ~30-60 seconds (full suite) |

---

## Sampling Rate

- **After every task commit:** Run `cd mobile && npx jest <touched-test-file>`
- **After every plan wave:** Run `cd mobile && npx jest`
- **Before `/gsd-verify-work`:** Full suite must be green, plus the FOCUS-06 manual UAT pass
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 0 | FOCUS-01 | — | N/A | docs | N/A | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | FOCUS-02, FOCUS-04 | — | N/A | unit | `cd mobile && npx jest src/__tests__/useFocusScreenState.test.js` | ❌ W0 | ⬜ pending |
| 02-01-03 | 01 | 1-2 | FOCUS-03, FOCUS-05 | — | N/A | render/snapshot | `cd mobile && npx jest src/components/FocusScreen` | ❌ W0 | ⬜ pending |
| 02-01-04 | 01 | final | FOCUS-06 | — | N/A | manual | N/A — manual QA vs. 02-CHARACTERIZATION.md + 02-UI-SPEC.md | manual-only | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `.planning/phases/02-focusscreen-decomposition/02-CHARACTERIZATION.md` — pre-extraction characterization notes for REQ FOCUS-01; must exist and be committed *before* any extraction code moves
- [ ] `mobile/src/__tests__/useFocusScreenState.test.js` — stubs for FOCUS-02/FOCUS-04
- [ ] `mobile/src/components/FocusScreen/__tests__/*.test.jsx` — one per sub-component, stubs for FOCUS-03/FOCUS-05
- [ ] Per-test-file `jest.mock()` fixtures for `AuthContext`/`PetContext`/`ThemeContext` — both context hooks throw when called outside their providers; `useTheme()` returns `null` and will crash on destructuring unless mocked

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| FocusScreen behavior/UI parity after decomposition | FOCUS-06 | Characterization-based refactor testing exists precisely because an automated snapshot only proves new code matches itself, not that it matches pre-extraction behavior | Manually exercise FocusScreen (chip selection, todo add/toggle, session start/end, goal celebration) against `02-CHARACTERIZATION.md` and confirm UI matches `02-UI-SPEC.md` |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
