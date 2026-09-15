---
phase: "2"
slug: "focusscreen-decomposition"
status: validated
nyquist_compliant: true
wave_0_complete: true
created: "2026-09-14"
validated: "2026-09-15"
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
| 02-01-01 | 01 | 0 | FOCUS-01 | — | N/A | docs | N/A | ✅ | ✅ green |
| 02-01-02 | 01 | 1 | FOCUS-02, FOCUS-04 | — | N/A | unit | `cd mobile && npx jest src/__tests__/useFocusScreenState.test.js` | ✅ | ✅ green |
| 02-01-03 | 01 | 1-2 | FOCUS-03, FOCUS-05 | — | N/A | render/snapshot | `cd mobile && npx jest src/components/FocusScreen` | ✅ (18 suites, 117 tests) | ✅ green |
| 02-01-04 | 01 | final | FOCUS-06 | — | N/A | manual | N/A — manual QA vs. 02-CHARACTERIZATION.md + 02-UI-SPEC.md | manual-only | ⬜ pending (see Manual-Only) |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

**Audit note (2026-09-15):** All 8 execution plans (02-01 through 02-08) completed and merged. `npm run check` (mobile) exits 0 with 43 suites / 475 tests passing, including all FOCUS-02/03/04/05-covered files above. FOCUS-01 (behavior baseline doc) and FOCUS-06's automation-eligible scaffolding are both satisfied; FOCUS-06 itself is inherently a manual UI-parity pass (see Manual-Only Verifications below) and was correctly not force-automated. No coverage gaps found — `nyquist_compliant: true`.

---

## Wave 0 Requirements

- [x] `.planning/phases/02-focusscreen-decomposition/02-CHARACTERIZATION.md` — pre-extraction characterization notes for REQ FOCUS-01; must exist and be committed *before* any extraction code moves
- [x] `mobile/src/__tests__/useFocusScreenState.test.js` — stubs for FOCUS-02/FOCUS-04
- [x] `mobile/src/components/FocusScreen/__tests__/*.test.jsx` — one per sub-component, stubs for FOCUS-03/FOCUS-05 (18 files)
- [x] Per-test-file `jest.mock()` fixtures for `AuthContext`/`PetContext`/`ThemeContext` — both context hooks throw when called outside their providers; `useTheme()` returns `null` and will crash on destructuring unless mocked

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| FocusScreen behavior/UI parity after decomposition | FOCUS-06 | Characterization-based refactor testing exists precisely because an automated snapshot only proves new code matches itself, not that it matches pre-extraction behavior | Manually exercise FocusScreen (chip selection, todo add/toggle, session start/end, goal celebration) against `02-CHARACTERIZATION.md` and confirm UI matches `02-UI-SPEC.md` |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 60s (full suite runs in ~1.5-2s)
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** automated coverage validated 2026-09-15. FOCUS-06 manual UI parity pass remains open — tracked in Manual-Only Verifications, not a Nyquist gap.
