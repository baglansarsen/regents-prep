---
phase: 01-test-infrastructure
plan: 01
subsystem: mobile test infrastructure
tags: [jest, react-native-testing-library, testing, dependency-migration]
status: complete
dependency-graph:
  requires: []
  provides:
    - "renderHook proven to work under RNTL v14 + jest-expo/React 19"
    - "mobile/package.json carries @testing-library/react-native@^14.0.1 as the sole rendering/query library"
  affects:
    - "01-02 (expands rntlSmoke.test.js to the render() entry point and built-in matchers)"
    - "Phases 2-5 (FocusScreen, FriendsScreen, QuizScreen, HomeScreen hook/component tests all build on renderHook)"
tech-stack:
  added: []
  patterns:
    - "renderHook/act calls are always awaited (RNTL v14 async-by-default contract)"
    - "npm install/uninstall mutates the manifest; package.json/package-lock.json are never hand-edited for dependency changes"
key-files:
  created:
    - mobile/src/__tests__/rntlSmoke.test.js
  modified:
    - mobile/package.json
    - mobile/package-lock.json
decisions:
  - "Recorded the fail-first smoke-test run against the un-swapped manifest as evidence rather than skipping it, per the plan's explicit fail-first instruction — result: it already passed, so the conflict was latent (test-renderer@1.2.0 and RNTL 14.0.0 already coexisted), not active"
metrics:
  duration: "~15 min"
  completed: 2026-09-14
actuals:
  tokens: 729
  tasks: 2
  commits: 2
plan_head_before: e03d2a81ee1bfe25ef729fa4e755e2db02fffc1d
---

# Phase 1 Plan 1: Restore a runnable test stack and prove RNTL v14's renderHook works Summary

Swapped `mobile`'s test stack to `@testing-library/react-native@14.0.1` as the sole rendering/query library, removed the deprecated `react-test-renderer@^18.3.1` and `@testing-library/jest-native@^5.4.3`, deleted the now-unnecessary `setupFilesAfterEnv` jest config key, and proved the swap works with a new `renderHook`/`act` smoke test — validated against both the pre-swap and post-swap manifest.

## What Was Built

**Task 1 — Fail-first renderHook smoke test:**
- Ran `npm --prefix mobile install` (required first step — `node_modules` was absent in this checkout; `npx jest` would otherwise die with `Preset jest-expo not found`).
- Created `mobile/src/__tests__/rntlSmoke.test.js`: three `test()` cases (flat style, no `describe` wrapper, matching `useQuiz.test.js`'s convention) that `await renderHook(...)`, drive a state transition through `await act(...)`, and assert the un-awaited call returns a thenable. Every assertion reads a concrete value back from `result.current` — none merely check "no exception thrown."
- Measured the file against the CURRENT, un-swapped manifest (fail-first evidence, recorded verbatim below).

**Task 2 — Manifest swap:**
- `npm --prefix mobile install @testing-library/react-native@^14.0.1` (was resolving to `14.0.0`).
- `npm --prefix mobile uninstall @testing-library/jest-native react-test-renderer` — one invocation, both packages, because `jest-native@5.4.3` peer-depends on `react-test-renderer >=16.0.0` and removing the renderer alone would leave that peer unmet. No `ERESOLVE`/unmet-peer output from either npm command.
- Hand-edited `mobile/package.json`'s `jest` block to delete the `setupFilesAfterEnv` key entirely (not emptied to `[]`) — RNTL v14 auto-attaches its matchers on import.
- Left `jest`/`jest-expo` version ranges, `mobile/src/__tests__/useQuiz.test.js`, and the transitively-retained `react-test-renderer@19.1.0` (owned by `jest-expo`) untouched, per the plan's explicit prohibitions.

## Fail-First Evidence (Task 1's Behavior requirement)

**Pre-swap run** — `npm --prefix mobile test -- src/__tests__/rntlSmoke.test.js`, against the manifest as it stood before any package change (`@testing-library/react-native@14.0.0`, `react-test-renderer@^18.3.1` and `@testing-library/jest-native@^5.4.3` still present, `setupFilesAfterEnv` still wired):

```
PASS src/__tests__/rntlSmoke.test.js
  ✓ renderHook yields a concrete initial value read back from result.current (6 ms)
  ✓ act drives a state transition through to result.current (1 ms)
  ✓ an un-awaited renderHook call returns a thenable that settles once awaited (1 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.683 s
```

**Verdict:** the smoke test PASSED before the swap too. Per the plan's explicit guidance, this is valid and reported honestly rather than forced: `@testing-library/react-native@14.0.0` and `test-renderer@1.2.0` were already coexisting in the install tree, so the deprecated-package conflict was **latent** (the stale pins sat unused alongside a working v14 rendering path) rather than **active** (blocking rendering outright). The swap in Task 2 is still correct and necessary — it removes the unused, React-19-incompatible, and deprecated pins from the manifest — but it wasn't "fixing a broken renderHook path"; it was closing a gap between what the manifest claimed and what was actually being exercised.

**Post-swap run** — `npm --prefix mobile run check` (full suite + parse-check), against the swapped manifest:

```
Test Suites: 24 passed, 24 total
Tests:       343 passed, 343 total
Snapshots:   0 total
Time:        3.13 s
Ran all test suites.
parse-check: no changed src files
```

All 23 pre-existing test files plus the new smoke test pass (24 suites, 343 tests — the pre-existing suite has more individual test cases than files, hence 343 vs. the 24-file count).

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written for both tasks.

### Out-of-Scope Discovery (logged, not fixed)

**Pre-existing flaky test found during the fail-first baseline run:** `mobile/src/utils/__tests__/question.test.js` › `buildUnitSampledSet › guarantees at least 1 question per unit when target allows` fails intermittently (~1 in 5 runs) with `Expected: 6, Received: 5`. Confirmed flaky by running the file 5x against the **un-swapped** manifest (before any package.json change): 4 passes, 1 failure, identical assertion each time. `buildUnitSampledSet`'s sampling logic uses an unseeded `shuffle()` and this is unrelated to and predates the RNTL package swap. Per the scope boundary rule, this was **not fixed** — logged to `.planning/phases/01-test-infrastructure/deferred-items.md` instead. The `npm run check` run used for this plan's own verification passed cleanly (343/343), but a future run could hit this flake; it is not caused by this plan's changes.

## Verification Results

| Check | Result |
|---|---|
| `npm --prefix mobile run check` exits 0 | ✅ 24 suites / 343 tests passed |
| Manifest gate (`manifest clean`) | ✅ neither banned package nor `setupFilesAfterEnv` present |
| Lockfile gate (`lock rntl 14.0.1`) | ✅ |
| `npm --prefix mobile --silent test -- --listTests \| wc -l` | ✅ prints `24` |
| `jest`/`jest-expo` version-churn gate | ✅ `runner pins intact` |
| `useQuiz.test.js` content-hash gate | ✅ `cbc93c3a9e596bdc77e68fda319430a51c286127` unchanged |
| Tracked-file-count gate (`mobile/src`: 482 files, 24 `.test.*`) | ✅ |
| `npm --prefix mobile ls @testing-library/react-native` | ✅ `@testing-library/react-native@14.0.1` |
| `git diff --name-only` vs. plan start lists exactly the 3 `files_modified` | ✅ `mobile/package.json`, `mobile/package-lock.json`, `mobile/src/__tests__/rntlSmoke.test.js` |

## Threat Flags

None — no new network endpoints, auth paths, file-access patterns, or schema changes were introduced. Scope matched the plan's `<threat_model>` exactly (devDependency + jest-config only).

## Known Stubs

None. The smoke test asserts concrete values throughout; nothing renders empty/placeholder data.

## Self-Check: PASSED

- `mobile/src/__tests__/rntlSmoke.test.js` — FOUND
- `mobile/package.json` (edited) — FOUND, diff confirmed matches plan spec
- `mobile/package-lock.json` (regenerated) — FOUND
- Commit `067f8f43` (Task 1) — FOUND in `git log --oneline`
- Commit `6a850720` (Task 2) — FOUND in `git log --oneline`
