---
phase: "1"
slug: "test-infrastructure"
status: draft
nyquist_compliant: false
wave_0_complete: false
created: "2026-09-14"
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest `29.7.0` + `jest-expo` preset `~54.0.18` |
| **Config file** | `mobile/package.json` (`"jest"` key) — no separate `jest.config.js` |
| **Quick run command** | `cd mobile && npx jest --no-coverage` |
| **Full suite command** | `cd mobile && npx jest` |
| **Estimated runtime** | ~30 seconds (22 existing test files) |

---

## Sampling Rate

- **After every task commit:** Run `cd mobile && npx jest --no-coverage`
- **After every plan wave:** Run `cd mobile && npx jest` (full suite)
- **Before `/gsd-verify-work`:** Full suite must be green, plus a manual `grep` confirming `react-test-renderer` and `@testing-library/jest-native` no longer appear in `mobile/package.json`
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| TBD (planner) | 01 | 0 | INFRA-01 | — | N/A | smoke/integration | `cd mobile && npx jest` | ✅ (22 existing files) | ⬜ pending |
| TBD (planner) | 01 | 0 | INFRA-01 | — | N/A | smoke | `cd mobile && npx jest src/__tests__/rntlSmoke.test.js` | ❌ Wave 0 — new file | ⬜ pending |

*Task IDs populated once the planner creates PLAN.md; requirement-level test plan above holds in the interim.*

---

## Wave 0 Requirements

- [ ] `mobile/src/__tests__/rntlSmoke.test.js` — new file; positively validates `render()`/`renderHook()` work under RNTL v14 + `test-renderer`, since zero of the 22 existing test files exercise either function today
- [ ] `cd mobile && npm install` — `node_modules` is absent in this checkout; must run before any test can execute
- [ ] No shared fixture/conftest-equivalent gap — no shared test-setup file beyond `jest.setupFilesAfterEnv`, which this phase itself edits

---

## Manual-Only Verifications

*All phase behaviors have automated verification (jest suite + grep check on `package.json`).*

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
