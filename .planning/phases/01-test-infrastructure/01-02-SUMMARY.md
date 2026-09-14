---
phase: 01-test-infrastructure
plan: 02
subsystem: mobile test infrastructure
tags: [jest, react-native-testing-library, testing, dependency-migration]
status: complete
dependency-graph:
  requires:
    - "01-01 (renderHook proven under RNTL v14 + jest-expo/React 19; setupFilesAfterEnv key deleted)"
  provides:
    - "render() and screen queries proven to work under RNTL v14 + jest-expo/React 19"
    - "Built-in RNTL v14 matcher (toBeOnTheScreen) proven to self-attach with zero jest setup wiring"
    - "rerender() documented as the v14 replacement for the removed update alias"
  affects:
    - "Phases 2-5 (FocusScreen, FriendsScreen, QuizScreen, HomeScreen sub-component render/snapshot tests all copy this file's shape)"
tech-stack:
  added: []
  patterns:
    - "render/screen queries are always awaited (RNTL v14 async-by-default contract), matching the renderHook/act convention 01-01 established"
    - "Built-in RNTL v14 matchers (toBeOnTheScreen) require no setupFilesAfterEnv wiring — they self-attach on first import of any @testing-library/react-native export"
key-files:
  created: []
  modified:
    - mobile/src/__tests__/rntlSmoke.test.js
decisions:
  - "Split the render() coverage into two focused test() cases (query + rerender shape; built-in matcher) rather than one combined case, to keep each assertion's failure message unambiguous about which claim broke"
metrics:
  duration: "~12 min"
  completed: 2026-09-14
actuals:
  tokens: 408
  tasks: 1
  commits: 1
plan_head_before: 8b40d31f7b892088f80ca3f68dafa5979955d65e
---

# Phase 1 Plan 2: Prove render() and RNTL v14's built-in matchers work with zero setup wiring Summary

Expanded `mobile/src/__tests__/rntlSmoke.test.js` (created by plan 01-01) with `render()`/`screen` query coverage, the built-in `toBeOnTheScreen()` matcher, and a `rerender` shape check — proving RNTL v14's second entry point and its matcher replacement work under this repo's jest-expo/React 19 setup with the `setupFilesAfterEnv` key still absent from `mobile/package.json`.

## What Was Built

**Task 1 — render() and built-in matcher coverage:**
- `npm --prefix mobile install` re-run first (worktree-local `node_modules` doesn't travel across worktrees; required by the plan's `<precondition>`). Confirmed `@testing-library/react-native@14.0.1` present afterward.
- Confirmed baseline: ran the existing 3-case smoke test against the file as plan 01-01 left it — all 3 passed unchanged before any edit.
- Confirmed `mobile/package.json`'s `jest` block has no `setupFilesAfterEnv` key, and `mobile/src/__tests__/useQuiz.test.js` hashes to the expected `cbc93c3a9e596bdc77e68fda319430a51c286127` (Phase-4-owned file, untouched).
- Appended two new `test()` cases to `rntlSmoke.test.js`, alongside (never replacing) the three existing `renderHook`/`act` cases:
  - `await render(<View><Text>rntl v14 smoke</Text></View>)`, then `screen.getByText('rntl v14 smoke')` returns a real queried node (asserted with `toBeTruthy()` on the node itself, not on the render handle), and `typeof view.rerender` is `'function'` — documenting the v14 replacement for the removed `update` alias.
  - A second case asserting `expect(screen.getByText('rntl v14 smoke')).toBeOnTheScreen()` — the built-in RNTL v14 matcher, imported from nowhere but `@testing-library/react-native` itself, with no matcher setup file registering it.
- Extended the import line to add `render`, `screen` (from `@testing-library/react-native`) and `View`, `Text` (from `react-native`). Kept the flat `test()` style with no `describe` wrapper, matching `useQuiz.test.js`'s convention.
- Built both element trees entirely inline in the test file (`View` wrapping `Text` with the literal `rntl v14 smoke`) — no import from `mobile/src/screens`, `hooks`, `components`, or `context`, and no touch of the Firebase mock, so a failure here can only be attributed to the rendering engine.
- Updated the file's header block comment: now states the file covers both RNTL v14 entry points (`renderHook` and `render`) plus the built-in matcher replacement, notes Phases 2-5 should copy the awaited shape, and references both `01-01-PLAN.md` and `01-02-PLAN.md`.
- Ran `npm --prefix mobile run check` — full suite (24 suites / 345 tests, up from 343 in 01-01's summary — the 2 new cases) plus `parse-check.mjs`, both clean.

## Verification Results

| Check | Result |
|---|---|
| `npm --prefix mobile test -- src/__tests__/rntlSmoke.test.js` | ✅ 5 passed, 0 failed, 0 skipped |
| `grep -c -e 'await render(' -e 'toBeOnTheScreen' -e 'rerender'` (require ≥3) | ✅ prints `7` |
| `grep -c -e 'await renderHook(' -e 'await act('` (require ≥2) | ✅ prints `3` |
| No app-module imports (screens/hooks/components/context) | ✅ prints `0` |
| No removed v14 APIs (`UNSAFE_get*`, `concurrentRoot`, `createNodeMock`, `.update(`) | ✅ prints `0` |
| `grep -c "from 'react-native'"` (require ≥1) | ✅ prints `1` |
| `setupFilesAfterEnv` key absent from `mobile/package.json` | ✅ `no matcher setup wiring` |
| `useQuiz.test.js` content-hash gate | ✅ `cbc93c3a9e596bdc77e68fda319430a51c286127` unchanged |
| Manifest-pins gate (`jest`/`jest-expo`/RNTL pins unchanged) | ✅ `manifest pins intact` |
| Tracked-file-count gate (`mobile/src`: 482 files, 24 `.test.*`) | ✅ both counts unchanged from 01-01 |
| `npm --prefix mobile run check` exits 0 | ✅ 24 suites / 345 tests passed, `parse-check: 1 file(s) OK` |
| Scope check (`git status --porcelain` before staging) | ✅ named only `mobile/src/__tests__/rntlSmoke.test.js` |

**Evidence retiring plan 01-01's untested config deletion** — `npm --prefix mobile test -- src/__tests__/rntlSmoke.test.js` output:

```
PASS src/__tests__/rntlSmoke.test.js
  ✓ renderHook yields a concrete initial value read back from result.current (6 ms)
  ✓ act drives a state transition through to result.current (1 ms)
  ✓ an un-awaited renderHook call returns a thenable that settles once awaited (1 ms)
  ✓ render() mounts an inline element tree and screen.getByText finds a real node (403 ms)
  ✓ the built-in toBeOnTheScreen matcher passes with no setupFilesAfterEnv wiring

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
```

The fifth case is the direct proof: `toBeOnTheScreen()` passed while `mobile/package.json`'s `jest` block carries no `setupFilesAfterEnv` key (confirmed separately via the node gate above), so 01-01's claim that RNTL v14 self-attaches its built-in matchers on first import is no longer a documented assumption — it is measured.

## Deviations from Plan

None — plan executed exactly as written. `npm --prefix mobile install` was re-run per the task's explicit `<precondition>` (worktree-local `node_modules` doesn't persist across worktree forks), which the plan itself anticipated rather than treating as a deviation.

### Auto-fixed Issues

None.

### Out-of-Scope Discovery

None newly found. The pre-existing flaky `buildUnitSampledSet` test flagged in 01-01-SUMMARY.md was not encountered in this session's `npm run check` run (345/345 clean); no new out-of-scope issues surfaced.

## Threat Flags

None — no new network endpoints, auth paths, file-access patterns, or schema changes were introduced. Scope matched the plan's `<threat_model>` exactly (single test-file edit, no dependency change, no config key added).

## Known Stubs

None. Both new assertions query real rendered nodes and a real built-in matcher; nothing renders empty or placeholder data.

## Self-Check: PASSED

- `mobile/src/__tests__/rntlSmoke.test.js` — FOUND
- Commit `25a9af4c` (Task 1) — FOUND in `git log --oneline`
