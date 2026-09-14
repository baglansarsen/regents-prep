---
phase: 01-test-infrastructure
reviewed: 2026-09-14T00:00:00Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - .gitignore
  - mobile/package.json
  - mobile/src/__tests__/rntlSmoke.test.js
findings:
  critical: 0
  warning: 1
  info: 1
  total: 2
status: issues_found
---

# Phase 01: Code Review Report

**Reviewed:** 2026-09-14T00:00:00Z
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found

## Summary

This phase swaps the mobile Jest testing stack from `@testing-library/jest-native` + a mismatched `react-test-renderer@^18.3.1` (pinned to React 18 while the app runs React 19.1.0) to `@testing-library/react-native@^14.0.1` with its new required peer, `test-renderer@^1.2.0`, and removes the now-unnecessary `setupFilesAfterEnv` wiring. A new smoke test (`rntlSmoke.test.js`) is added to prove both RNTL entry points (`renderHook`, `render`) and the built-in matcher (`toBeOnTheScreen`) work with the new setup, and `.gitignore` gains two GSD-internal path exclusions.

I verified the change empirically, not just by reading it:
- `npx jest src/__tests__/rntlSmoke.test.js --no-coverage` → 5/5 pass.
- `npx jest --no-coverage` (full suite) → 344/345 pass; the one failure (`src/utils/__tests__/question.test.js`) is unrelated to these three files (not in scope, pre-existing, no `firebase`/RNTL/jest-config dependency), and this diff neither introduces nor touches it.
- `npm ls @testing-library/react-native test-renderer react-test-renderer` confirms `test-renderer@1.2.0` resolves at the top level and satisfies both the app's `test-renderer` devDependency and RNTL's peer requirement; `react-test-renderer@19.1.0` is only present nested under `jest-expo/node_modules/react-test-renderer` — there is no top-level `node_modules/react-test-renderer` anymore.
- Grepped all `src/` imports of `../firebase` / `../../firebase` against the (unchanged) `moduleNameMapper` in `mobile/package.json` — every current import matches one of the two depth patterns, so that mapper (not part of this diff) is not currently broken.
- Grepped `src/__tests__` and `src/**/__tests__` for jest-native-only matchers (`toBeVisible`, `toHaveTextContent`, `toHaveProp`, etc.) — none found, so removing `setupFilesAfterEnv`/`jest-native` doesn't silently break any other test.

No correctness bugs, security issues, or dead code found in these three files. One maintainability concern (explicit dependency vs. relying on a nested transitive resolution) and one minor documentation-drift risk are noted below.

## Warnings

### WR-01: `react-test-renderer` is no longer an explicit (or even top-level-resolvable) dependency

**File:** `mobile/package.json:61-71`
**Issue:** The diff removes `"react-test-renderer": "^18.3.1"` outright rather than re-pinning it to a React-19-compatible version. Today that's safe because `@testing-library/react-native` doesn't need it directly (it now depends on `test-renderer`) and `jest-expo` carries its own nested copy (`jest-expo/node_modules/react-test-renderer@19.1.0`) for its own use. But confirmed via `ls node_modules/react-test-renderer` → **no such file** — there is no top-level resolution of `react-test-renderer` in this project anymore, and it is not declared anywhere in `package.json`.

This is exactly the pattern the new smoke test's own doc comment anticipates future phases (2-5) copying: hook/component tests for `useFocusScreenState`, `useFriendsScreenState`, `useQuizState`, `useHomeAgenda`, etc. React Native's own docs and a large fraction of existing StackOverflow/blog guidance for testing RN hooks still show `import TestRenderer from 'react-test-renderer'` directly (not via RNTL). If a future contributor on this project reaches for that classic pattern instead of RNTL's `renderHook`, the import will fail to resolve (`Cannot find module 'react-test-renderer'`), and the failure mode will look like a broken test environment rather than "you used the wrong API," costing debugging time that this same phase's smoke test was designed to prevent.

**Fix:** Either:
1. Add `react-test-renderer` back as an explicit `devDependency` pinned to the version `jest-expo` already resolves (`"react-test-renderer": "19.1.0"`), so it hoists to top level and stays version-locked to what jest-expo expects, or
2. If the intent is to force all new tests through RNTL's `renderHook`/`render` (which the smoke test's doc comment implies), add a one-line note in `mobile/package.json`'s test docs or `CLAUDE.md` stating `react-test-renderer` is intentionally not a direct dependency — use `@testing-library/react-native` instead.

## Info

### IN-01: Smoke test's "zero setup" framing rests on an assumption not directly checked in this file

**File:** `mobile/src/__tests__/rntlSmoke.test.js:6-10`
**Issue:** The header comment's central claim — "a built-in matcher passing here is the executable proof that deletion was correct" — is true for *this test run*, but is only trustworthy if this file's test always executes in the same Jest process/config as the rest of the suite. Nothing in the file itself pins or asserts that; it depends entirely on `mobile/package.json`'s `jest.preset`/`transformIgnorePatterns` staying as-is. That's a reasonable design (a smoke test can't sensibly assert its own harness config), but the strong claim in prose ("has no `setupFilesAfterEnv` key at all") will silently go stale if a future edit reintroduces `setupFilesAfterEnv` for an unrelated reason (e.g., a new global mock) — the test would keep passing (RNTL v14 self-registers its matchers regardless of `setupFilesAfterEnv` contents) while the comment's claim becomes false, misleading whoever reads it next.
**Fix:** Low priority / optional — either soften the comment to "at the time of writing" framing, or add a cheap guard such as `expect(require('../../package.json').jest.setupFilesAfterEnv).toBeUndefined()` if the absence of that key is meant to be a hard invariant rather than incidental documentation.

---

_Reviewed: 2026-09-14T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
