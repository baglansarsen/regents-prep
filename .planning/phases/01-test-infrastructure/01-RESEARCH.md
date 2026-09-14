# Phase 1: Test Infrastructure - Research

**Researched:** 2026-09-14
**Domain:** Jest / React Native Testing Library (RNTL) v14 test-stack migration for an Expo SDK 54 / React 19 app
**Confidence:** HIGH (every version claim below was verified this session directly against the npm registry and the project's own files; the two claims fetched from the RNTL maintainers' migration doc are CITED/MEDIUM because the primary hosted doc page 403s on fetch — see Sources)

## Summary

This phase is a **narrow devDependency + jest-config cleanup**, not a rewrite. The project's own `.planning/research/STACK.md` (researched the same day, still fully current — every version was re-verified against the npm registry this session) already diagnosed the fix precisely: `mobile/package.json` has a stray, incompatible `react-test-renderer@^18.3.1` and a deprecated `@testing-library/jest-native@^5.4.3`, both left over from before the app moved to React 19.1.0 / Expo SDK 54. `@testing-library/react-native@^14.0.0` and its actual v14 rendering engine, `test-renderer@^1.2.0`, are **already present** in the manifest — nothing new needs to be installed. The fix is: refresh RNTL to `14.0.1`, uninstall the two stale packages, and delete one `setupFilesAfterEnv` line.

The one thing STACK.md didn't check, and which changes how this phase should be verified: **none of the project's 22 existing test files call `render()`, `renderHook()`, `fireEvent()`, or any `@testing-library/*` import at all** — confirmed by grepping every `*.test.*` file in `mobile/src`. The entire current suite is pure-function unit tests (scoring math, streak math, achievements, etc.). This means `cd mobile && npx jest` passing after the package swap proves the packages no longer *conflict*, but proves nothing about whether `render`/`renderHook` actually *work* under the new setup — because nothing in the repo exercises them yet. Since the next four phases (FocusScreen → FriendsScreen → QuizScreen → HomeScreen) depend entirely on `renderHook`/`render` working correctly, this phase should add one minimal smoke test that actually calls them, or the "trustworthy foundation" goal in the phase description is unverified until Phase 2.

**Primary recommendation:** Do the package swap exactly as STACK.md's Installation section specifies (`npm install @testing-library/react-native@^14.0.1` + `npm uninstall @testing-library/jest-native react-test-renderer` + delete the `setupFilesAfterEnv` line), run `npm install` first since `node_modules` is not currently present in this environment, and add one throwaway `renderHook`/`render` smoke test as part of this phase (not deferred to Phase 2) so INFRA-01's "trustworthy foundation" claim is actually exercised, not just assumed from unrelated tests passing.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|--------------------|
| INFRA-01 | `mobile/`'s test stack has the deprecated `react-test-renderer@18.x` and `@testing-library/jest-native` removed, with `@testing-library/react-native@14.0.1` as the sole rendering/query library, and `cd mobile && npx jest` passing after the change | Standard Stack section gives the exact `npm install`/`npm uninstall`/config-edit sequence, each step version-verified against the npm registry this session. Runtime State Inventory confirms `node_modules` must be installed first. Pitfall 2 confirms no existing test body needs editing for "jest-native matcher" reliance since none exist. Pitfall 1 and the Validation Architecture section recommend one additional smoke test so the fix is positively proven, not just assumed from unrelated tests passing. |
</phase_requirements>

## Architectural Responsibility Map

This phase is dev/test tooling only — it does not touch any runtime application tier (no browser/client code path, no API, no storage layer changes). The standard tier table doesn't apply cleanly; the capabilities below are mapped against the *test-runtime* rather than the *app-runtime*.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Component/hook rendering under test | Dev/Test Tooling (simulated RN runtime, not a deployed tier) | Browser/Client (mirrors what ships) | `@testing-library/react-native`'s `render`/`renderHook` execute against a simulated React Native tree in Jest — they never touch a real device/browser, but they exist to give confidence about client-tier code before it ships |
| Jest configuration & matchers | Dev/Test Tooling | — | Lives entirely in `mobile/package.json`'s `jest` key; no runtime app tier is affected |
| devDependency version management | Dev/Test Tooling | — | `package.json`/`package-lock.json` changes only; nothing in the shipped Metro/EAS bundle changes (`devDependencies` are never bundled) |

## Standard Stack

### Core (already installed — this phase fixes the pinning, does not add new libraries)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|---------------|
| `@testing-library/react-native` | `14.0.1` | Component rendering + querying + `renderHook` | `npm view @testing-library/react-native@14.0.1 peerDependencies` returns `{"jest":">=29.0.0","react":">=19.0.0","react-native":">=0.78","test-renderer":"^1.0.0"}` — every peer is already satisfied by this project's installed `jest@29.7.0`, `react@19.1.0`, `react-native@0.81.5`. [VERIFIED: npm registry, `npm view @testing-library/react-native@14.0.1 peerDependencies` run this session] |
| `test-renderer` | `1.2.0` (already installed) | RNTL v14's actual rendering engine | `npm view test-renderer dist-tags` → `{"latest":"1.2.0"}`; `npm view test-renderer@1.2.0 peerDependencies` → `{"react":"^19.0.0"}`, exact match to installed `react@19.1.0`. Written by RNTL's maintainer as the React-19-native replacement for `react-test-renderer`. [VERIFIED: npm registry, checked this session] |
| `jest` | `29.7.0` (keep, no change) | Test runner | `npm view jest-expo@54.0.18 dependencies` → shows `jest-snapshot@^29.2.1`, `@jest/globals@^29.2.1`, `babel-jest@^29.2.1` — `jest-expo`'s own tree is Jest-29-line, not 30. `npm view jest dist-tags` shows `latest: 30.5.1` exists, but bumping to it is unrelated churn that risks the preset's transform handling. [VERIFIED: npm registry, checked this session] |
| `jest-expo` | `~54.0.18` (keep, no change) | Jest preset for Expo/RN transforms | `npm view jest-expo dist-tags` confirms `"sdk-54": "54.0.18"` is still the current SDK-54-line tag (registry re-checked this session, not stale). `npm view jest-expo@54.0.18 dependencies` shows it itself pulls `react-test-renderer@19.1.0` transitively — i.e. Expo's own preset already assumes React 19's test renderer; the project's separate `react-test-renderer@^18.3.1` devDependency pin is the outlier. [VERIFIED: npm registry, checked this session] |

### What to remove

| Package | Action | Why |
|---------|--------|-----|
| `react-test-renderer@^18.3.1` | `npm uninstall react-test-renderer` | Mismatched against `react@19.1.0` (current npm `latest` is `19.3.0`; nothing on any 18.x line is React-19-compatible). RNTL v14 does not depend on this package at all — it depends on `test-renderer`, already installed. [VERIFIED: npm registry — `npm view react-test-renderer version` → `19.3.0`; project's own pin is `^18.3.1`, read from `mobile/package.json` this session] |
| `@testing-library/jest-native@^5.4.3` | `npm uninstall @testing-library/jest-native`; also remove the `setupFilesAfterEnv` entry | `npm view @testing-library/jest-native deprecated` returns: `"DEPRECATED: This package is no longer maintained. Please use the built-in Jest matchers available in @testing-library/react-native v12.4+. See migration guide: https://callstack.github.io/react-native-testing-library/docs/migration/jest-matchers"` [VERIFIED: npm registry deprecation notice, fetched this session verbatim] |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Manual 3-step package.json edit (install/uninstall/delete config line) | Official RNTL codemods `rntl-v14-update-deps` + `rntl-v14-async-functions` (run via `npx codemod@latest ...`) | The codemods exist and are maintainer-authored [CITED: raw.githubusercontent.com/callstack/react-native-testing-library migration-v14.mdx, fetched this session], but (a) `rntl-v14-async-functions` has literally nothing to transform — this session's grep across all 22 test files found zero `render(`/`renderHook(`/`fireEvent(`/`act(` calls to make async; (b) the `codemod` npm package itself was flagged `[SUS: too-new]` by this session's legitimacy check (published 2026-09-11, 3 days before this research, 7,874 weekly downloads) — not a reason to ship-block it, but not worth the supply-chain exposure for a 3-line, already-fully-understood manual change on a project whose own CLAUDE.md explicitly warns against bulk/automated edits after a past `sed` rename shipped a crashing TestFlight build. Manual edit is the better fit here. |
| Keep `jest@29.7.0` | Bump to `jest@30.x` | STACK.md already ruled this out; re-confirmed this session (`jest-expo@54.0.18`'s dependency tree is pinned to the Jest-29 line) — defer to a future Expo SDK bump. |

**Installation (do this, in order):**
```bash
cd mobile
npm install   # node_modules is not currently present in this checkout — must run first

npm install @testing-library/react-native@^14.0.1
npm uninstall @testing-library/jest-native react-test-renderer
```

Then in `mobile/package.json`, remove this from the `jest` config block (verbatim, as currently written — [VERIFIED: mobile/package.json, read this session]):
```diff
   "setupFilesAfterEnv": [
-    "@testing-library/jest-native/extend-expect"
   ],
```
If `setupFilesAfterEnv` becomes an empty array, remove the key entirely — RNTL v14 ships its matchers with zero setup.

**Version verification (already run this session, do not re-derive from training data):**
- `@testing-library/react-native` latest on npm: `14.0.1` [VERIFIED: `npm view @testing-library/react-native dist-tags` this session]
- `test-renderer` latest on npm: `1.2.0`, matches project's installed pin [VERIFIED: `npm view test-renderer dist-tags` this session]
- `jest-expo` SDK-54 tag: `54.0.18`, matches project's installed pin (not stale — registry has since published `sdk-55: 55.0.22` and `latest: 57.0.5`, but this project stays on SDK 54) [VERIFIED: `npm view jest-expo dist-tags` this session]

## Package Legitimacy Audit

This phase does not install any *new* packages — `@testing-library/react-native` and `test-renderer` are already devDependencies; the only npm action is a patch-version refresh of one and removal of two others. Ran the legitimacy gate anyway on the packages this phase's Standard Stack section recommends keeping/upgrading, plus the third-party codemod tool mentioned as a considered-and-rejected alternative:

| Package | Registry | Age | Downloads/wk | Source Repo | Verdict | Disposition |
|---------|----------|-----|---------------|--------------|---------|-------------|
| `@testing-library/react-native` | npm | published 2026-06-23 (this release) | 2,932,757 | github.com/callstack/react-native-testing-library | OK | Approved — already installed, refresh only |
| `test-renderer` | npm | published 2026-04-16 (this release) | 857,813 | github.com/mdjastrzebski/test-renderer | OK | Approved — already installed, no change |
| `codemod` (considered, rejected) | npm | published 2026-09-11 (3 days before this research) | 7,874 | github.com/codemod/codemod | SUS ("too-new") | **Not recommended for this phase** — see Alternatives Considered. Do not add as a devDependency or run via `npx` for this migration; the manual 3-line change is fully understood and lower-risk. If a future phase wants to use it anyway, gate behind `checkpoint:human-verify`. |

**Packages removed due to [SLOP] verdict:** none
**Packages flagged as suspicious [SUS]:** `codemod` (rejected as an approach for this phase, not installed — no checkpoint needed since it's not being used)

## Architecture Patterns

### System Architecture Diagram

```
mobile/package.json (devDependencies + jest config)
        │
        ├── npm install (refresh @testing-library/react-native → 14.0.1)
        ├── npm uninstall (react-test-renderer, @testing-library/jest-native)
        └── edit jest.setupFilesAfterEnv (remove jest-native line)
                        │
                        ▼
        node_modules/@testing-library/react-native@14.0.1
                        │
                        │  (peer: test-renderer@1.2.0, already present)
                        ▼
        ┌───────────────────────────────────────────┐
        │  cd mobile && npx jest                      │
        │                                              │
        │  22 existing test files (pure-function only) │──▶ pass (unaffected by
        │  src/__tests__/*.test.js, src/utils/__tests__/*│    the swap — none of
        │                                              │    them import RNTL)
        │                                              │
        │  NEW: 1 smoke test using renderHook()/render()│──▶ pass ⇒ proves the
        │  (recommended addition, see Wave 0 Gaps)      │    v14 rendering path
        └───────────────────────────────────────────┘    actually works
                        │
                        ▼
        Phase 2 (FocusScreen) onward: real renderHook()/render()
        usage for extracted hooks/components, built on a verified,
        not merely assumed, foundation
```

### Recommended Project Structure

No new directories — this phase only touches:
```
mobile/
├── package.json          # devDependencies + jest.setupFilesAfterEnv edit
├── package-lock.json      # regenerated by npm install/uninstall
└── src/__tests__/
    └── (optional) rntlSmoke.test.js   # recommended: proves render()/renderHook() work
```

### Pattern 1: `renderHook` for future hook tests (what this phase unblocks)
**What:** RNTL v14's `renderHook` is the standard way to unit-test an extracted business-logic hook without mounting a full component tree.
**When to use:** Every hook extracted in Phases 2-5 (`useFocusScreenState`, `useFriendsScreenState`, `useQuizState`, `useHomeAgenda`).
**Example (async-by-default, v14 API shape):**
```javascript
// Source: RNTL v14 migration guide — render/renderHook/fireEvent/act are
// Promises in v14 and must be awaited (breaking change vs v12/v13)
// [CITED: raw.githubusercontent.com/callstack/react-native-testing-library
//  main/website/docs/14.x/docs/start/migration-v14.mdx, fetched this session]
import { renderHook, act } from '@testing-library/react-native'

test('hook returns expected initial state', async () => {
  const { result } = await renderHook(() => useSomeHook())
  expect(result.current.value).toBe(0)
})
```

### Pattern 2: Smoke-test the migration itself (recommended for this phase)
**What:** A minimal test file, added in this phase, that calls `render()` on a trivial existing component and `renderHook()` on a trivial existing hook, asserting only that it doesn't throw.
**When to use:** Immediately after the package swap, before marking INFRA-01 done — this is the only way to positively confirm the new stack renders/hooks correctly, since the existing 22 test files never call either function (confirmed by grep this session: zero matches for `render(`, `renderHook(`, `fireEvent(`, `@testing-library` imports, or jest-native matcher names like `toBeOnTheScreen`/`toHaveTextContent` across every `*.test.*` file in `mobile/src`).
**Example:**
```javascript
// mobile/src/__tests__/rntlSmoke.test.js — throwaway proof the new stack works;
// safe to delete once Phase 2 adds real renderHook/render tests for extracted hooks
import { renderHook } from '@testing-library/react-native'
import { useState } from 'react'

test('renderHook works under the new RNTL v14 / test-renderer setup', async () => {
  const { result } = await renderHook(() => useState(0))
  expect(result.current[0]).toBe(0)
})
```

### Anti-Patterns to Avoid
- **Wrapping the swap in a bulk codemod for a 3-line change:** the `codemod` CLI is real and maintainer-endorsed, but it's overkill (and freshly-published/`SUS`-flagged) for a change this small and already fully diagnosed manually — see Package Legitimacy Audit.
- **Treating "tests still pass" as proof the fix worked:** without the smoke test in Pattern 2, a passing `npx jest` after this swap only proves the 22 pre-existing pure-logic tests are unaffected — it does not exercise `render`/`renderHook` at all.
- **Rewriting `useQuiz.test.js`'s business logic to use `renderHook` in this phase:** that file's header comment references the old workaround, but its test bodies don't import RNTL or the old renderer — rewriting it to actually test the hook via `renderHook` is QUIZ-02/QUIZ-03's job (Phase 4), which explicitly plans to extract `useQuizState` and remove this exact workaround. Scope for Phase 1 is the package/config fix, not rewriting this file's tests.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Hook unit testing | Custom "call the hook function directly and inspect the closure" pattern (what `useQuiz.test.js`'s header comment describes as its current workaround) | `renderHook` from `@testing-library/react-native` | This is exactly the version-mismatch workaround this phase exists to make unnecessary — `renderHook` is a proper React render cycle, not a logic-mirroring copy that can silently drift from the real hook. |
| Matching on rendered output | Reaching for `@testing-library/jest-native` again, or a custom matcher file | RNTL v14's built-in matchers (`toBeOnTheScreen()`, `toHaveTextContent()`, etc.) — available on `expect()` automatically the moment any `@testing-library/react-native` export is imported in a test file, no `setupFilesAfterEnv` entry needed | `jest-native` is npm-registry-confirmed deprecated; its matchers are now built into RNTL v12.4+ (this project targets v14) |
| Bulk dependency/config edits | `sed`/codemod-driven `package.json` rewrite | Per-file manual edit (`npm install`/`npm uninstall` + one JSON edit) | Matches this project's own CLAUDE.md rule ("Never bulk-rename with `sed -i` across `mobile/src`... a `sed` rename once shipped a crashing TestFlight build") — same caution applies to automated dependency-file rewrites even via a legitimate codemod tool, for a change this small. |

**Key insight:** every "don't hand-roll" item above already has a working replacement sitting in the manifest today (`test-renderer`, RNTL v14's built-in matchers) — the entire phase is subtraction (`npm uninstall` + delete one config line) plus a version refresh, not addition.

## Runtime State Inventory

> This phase is a devDependency/config migration, which falls under the "migration" trigger — inventory completed below.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None — no database, Firestore collection, or persisted-record schema references `react-test-renderer` or `@testing-library/jest-native` by name. [VERIFIED: grep for these strings across `mobile/src` returned only the comment in `useQuiz.test.js`, read this session] | none |
| Live service config | None — no Firebase/Firestore rule, RevenueCat dashboard, or any external service config references these packages. | none |
| OS-registered state | None — devDependency swap has no OS-level registration (no Task Scheduler, launchd, pm2 entries involved). | none |
| Secrets/env vars | None — no `.env`, SOPS key, or CI env var name references either package. | none |
| Build artifacts / installed packages | **Yes.** `node_modules/` is not currently present in this checkout at all (`ls mobile/node_modules` — confirmed absent; `npx jest --listTests` this session failed with `Preset jest-expo not found relative to rootDir`). `package-lock.json` still resolves `@testing-library/react-native` to `14.0.0` and `@testing-library/jest-native` to `5.4.3` (`grep -A3 '"node_modules/@testing-library/react-native"' package-lock.json` → `"version": "14.0.0"`) [VERIFIED: mobile/package-lock.json, read this session]. | `npm install` must run before anything else in this phase, then the install/uninstall commands above regenerate the lockfile correctly. |

**Canonical question answered:** after `mobile/package.json` and the lockfile are updated, nothing else in the runtime references these two package names by string — the only "runtime state" affected is the `node_modules` tree itself, which a fresh `npm install` rebuilds cleanly.

## Common Pitfalls

### Pitfall 1: Assuming "tests pass" validates the fix
**What goes wrong:** `cd mobile && npx jest` passes both before and after the package swap, for the same reason: none of the 22 existing test files import `@testing-library/react-native` or call `render`/`renderHook`. A green suite doesn't distinguish "the new stack works" from "the new stack was never exercised."
**Why it happens:** The existing suite was written entirely around pure-function extraction (a deliberate, documented workaround per `useQuiz.test.js`'s header comment) specifically *because* the old renderer conflicted with React 19 — so it never tested the rendering path at all.
**How to avoid:** Add the smoke test from Architecture Patterns → Pattern 2 as part of this phase's Success Criteria verification, not as an optional nice-to-have.
**Warning signs:** The phase is marked done with zero new test files added and zero lines in any test file calling `render(` or `renderHook(`.

### Pitfall 2: Conflating "remove the deprecated matcher package" with "remove its matchers from tests"
**What goes wrong:** None of the 22 existing test files actually call a `jest-native`-provided matcher (`toBeOnTheScreen()`, `toHaveTextContent()`, etc.) — confirmed by grep this session. There is no test-body rewrite required for Success Criterion #3's "matchers" clause; the only required change there is the `setupFilesAfterEnv` config line and the package removal.
**Why it happens:** The phase's success criteria wording ("tests that previously relied on jest-native matchers... are updated") reads as if test bodies need editing, but the actual reliance was indirect — via config wiring, not via matcher calls in test code.
**How to avoid:** Confirm via `grep -rlE "toBeOnTheScreen|toHaveTextContent|toContainElement|toBeEmptyElement|toBeVisible\(|toBeDisabled\(|toBeEnabled\(|toHaveStyle|toBeChecked" mobile/src --include="*.test.*"` before assuming test-body edits are needed (this session's run returned zero matches).
**Warning signs:** Time spent searching for jest-native matcher calls to "fix" that don't exist in this codebase yet.

### Pitfall 3: Rewriting `useQuiz.test.js`'s workaround comment/logic in this phase
**What goes wrong:** `useQuiz.test.js`'s header comment explicitly names the old workaround ("rather than fighting react-test-renderer version mismatches with Expo 52, we test the pure functions... directly"). It's tempting to "finish the job" by rewriting this file to use `renderHook` on the real `useQuiz` hook now that the blocker is gone.
**Why it happens:** The comment reads like an open TODO, and this phase removes the blocker it references.
**How to avoid:** That rewrite is explicitly QUIZ-02/QUIZ-03's job (Phase 4) — REQUIREMENTS.md's QUIZ-02 specifically calls out "removing the need for `useQuiz.test.js`'s existing logic-mirroring workaround" as a Phase 4 deliverable, tied to extracting `useQuizState`. Doing it in Phase 1 means Phase 4 either duplicates the work or has to un-plan around it.
**Warning signs:** A Phase 1 diff touching `useQuiz.test.js`'s test bodies rather than just leaving it as-is (the file's tests don't import RNTL or the old renderer directly, so nothing about them technically breaks from the package swap).

### Pitfall 4 (from project-level PITFALLS.md, applies here): Bumping tool versions "while you're in there"
**What goes wrong:** Since `package.json` is already open for editing, it's tempting to also bump `jest` to 30.x, or `jest-expo` past the SDK-54 pin, "since we're touching devDependencies anyway."
**Why it happens:** Proximity bias — the file is already being edited for an unrelated, in-scope reason.
**How to avoid:** `jest-expo@54.0.18`'s own dependency tree (re-verified this session) is pinned to Jest 29; bumping `jest` to 30 risks destabilizing the transform handling for all 22 existing test files for zero benefit tied to this phase's goal.
**Warning signs:** A diff to `package.json` touching `jest` or `jest-expo` version ranges beyond the exact ranges STACK.md specifies.

## Code Examples

### Verifying the swap worked (run after the package.json edit)
```bash
cd mobile
npm install
npx jest --listTests   # should list all 22 files without a "preset not found" error
npx jest                # full suite — should pass, including the new smoke test
```

### Confirming no other file references the removed packages
```bash
# Should return only the comment in useQuiz.test.js (a prose mention, not an import)
grep -rn "react-test-renderer\|jest-native" mobile/src mobile/package.json
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|-------------------|---------------|--------|
| `react-test-renderer` (React's own test renderer) | `test-renderer` (community-maintained, RNTL-authored replacement) | React 19 deprecated `react-test-renderer` outright [VERIFIED: `npm view react-test-renderer deprecated` returns empty at the package level, but the React 19 upgrade guide and RNTL's own v14 release notes both document the deprecation and replacement — CITED, not npm-registry-flagged] | Every `ReactTestRenderer.create()` call under React 19 prints a deprecation warning even before considering the version mismatch this project had |
| `@testing-library/jest-native` for RN-specific matchers | Built into `@testing-library/react-native` v12.4+ (this project targets v14) | Confirmed via npm registry: package is explicitly `deprecated`, pointing to the same migration guide | Zero `setupFilesAfterEnv` config needed for matchers as of v13/v14 |
| Sync `render`/`renderHook`/`fireEvent`/`act` (RNTL v12/v13) | Async-by-default — all must be `await`ed (RNTL v14) | RNTL v14.0.0 release [CITED: raw.githubusercontent.com/callstack/react-native-testing-library migration-v14.mdx, fetched this session] | Any *new* test code (including the recommended smoke test) must use `await render(...)`/`await renderHook(...)` from day one — copying older tutorial code that doesn't await will produce confusing act()-warning-style failures |

**Deprecated/outdated:**
- `react-test-renderer`: React team's own guidance (React 19 upgrade docs) is to use `@testing-library/react-native` for React Native instead.
- `@testing-library/jest-native`: self-declared unmaintained on the npm registry.
- RNTL v14 also removed `UNSAFE_getByType`/`UNSAFE_getAllByType`/`UNSAFE_getAllByProps`/`UNSAFE_getByProps`, the `concurrentRoot` render option, the `createNodeMock` render option, and the `update` alias (use `rerender`) [CITED: RNTL migration-v14.mdx, fetched this session] — not applicable to this project today since no existing test uses any of these, but worth knowing before Phases 2-5 write new render tests.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|----------------|
| A1 | `react-test-renderer` is "deprecated by the React team" as a blanket statement — the npm registry itself does not show a package-level `deprecated` flag on `react-test-renderer` (only on `@testing-library/jest-native`); this claim rests on React's official upgrade-guide guidance and RNTL's own migration docs, both CITED not registry-VERIFIED | Standard Stack, State of the Art | Low — the guidance is consistent across multiple official/maintainer sources, and the practical mismatch (18.x pinned against React 19.1.0) is independently VERIFIED regardless of the deprecation framing |
| A2 | No jest config changes beyond the one `setupFilesAfterEnv` line are needed for RNTL v14 (no `testEnvironment` change, no new transform ignore pattern) | Standard Stack, Installation | Low-Medium — sourced from a direct fetch of the maintainers' migration doc (raw GitHub file), but the hosted docs page itself 403s on fetch, so this couldn't be triple-cross-checked against the rendered page; if wrong, `npx jest` would fail immediately and loudly (not a silent regression) |

**If this table is empty:** N/A — two low-risk assumptions logged above; both are self-correcting (a wrong assumption here fails `npx jest` immediately rather than passing silently).

## Open Questions

1. **Should the Phase 1 smoke test (Architecture Patterns → Pattern 2) be a required Success Criterion or just a strong recommendation?**
   - What we know: INFRA-01's three stated success criteria (package swap, packages removed, existing tests pass) are all satisfiable without ever calling `render`/`renderHook`, since no existing test does.
   - What's unclear: Whether the user/planner wants this phase to *prove* the new stack renders correctly, or just to *set it up* and let Phase 2 be the first real proof.
   - Recommendation: Treat the smoke test as a should-do inside this phase's plan (it's one file, ~5 lines, directly serves the phase's own stated goal — "so hook/component tests written during the four screen refactors are trustworthy") rather than a separate requirement; flag for discuss-phase/planner confirmation if scope needs to stay minimal.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| Node.js | Running Jest, npm, RNTL v14 (`^22.13.0 \|\| >=24` per RNTL v14 migration doc) | ✓ | v22.23.1 [VERIFIED: `node --version` this session] | — |
| npm | Package install/uninstall | ✓ | 10.9.8 [VERIFIED: `npm --version` this session] | — |
| npm registry connectivity | Verifying versions, installing packages | ✓ | reachable — multiple `npm view` calls succeeded this session | — |
| `mobile/node_modules` | Running `npx jest` at all | ✗ (not currently installed in this checkout) | — | Run `npm install` as the first step of this phase — no fallback needed, this is a normal one-time setup step, not a blocker |

**Missing dependencies with no fallback:** none — the one "missing" item (`node_modules`) is resolved by the standard `npm install` step already required for this phase.

**Missing dependencies with fallback:** none.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Jest `29.7.0` + `jest-expo` preset `~54.0.18` [VERIFIED: mobile/package.json, read this session] |
| Config file | `mobile/package.json` (`"jest"` key) — no separate `jest.config.js` exists [VERIFIED: `ls mobile/*.config.js` this session shows only `babel.config.js` and `metro.config.js`] |
| Quick run command | `cd mobile && npx jest --no-coverage` |
| Full suite command | `cd mobile && npx jest` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|---------------------|--------------|
| INFRA-01 | `npx jest` passes with RNTL v14 as sole rendering/query library; stale packages removed | smoke/integration (whole-suite run is the verification) | `cd mobile && npx jest` | ✅ (22 existing files, none of which import RNTL) |
| INFRA-01 (recommended addition) | `render()`/`renderHook()` actually execute correctly under the new setup | smoke | `cd mobile && npx jest src/__tests__/rntlSmoke.test.js` | ❌ Wave 0 — new file, see below |

### Sampling Rate
- **Per task commit:** `cd mobile && npx jest --no-coverage` (matches existing `npm run check` convention)
- **Per wave merge:** `cd mobile && npx jest` (full suite)
- **Phase gate:** Full suite green before `/gsd-verify-work`, plus a manual check that `react-test-renderer` and `@testing-library/jest-native` no longer appear in `mobile/package.json` (`grep` check)

### Wave 0 Gaps
- [ ] `mobile/src/__tests__/rntlSmoke.test.js` — recommended new file; not required by any pre-existing test infrastructure gap, but required to positively validate `render()`/`renderHook()` work under RNTL v14 + `test-renderer`, since zero existing tests exercise either function (see Summary and Pitfall 1)
- [ ] No shared fixture/conftest-equivalent gap — this project has no shared test-setup file beyond `jest.setupFilesAfterEnv` (being edited by this phase itself)
- [ ] Framework install: `cd mobile && npm install` — `node_modules` is absent in this checkout; must run before any test can execute

## Security Domain

This phase touches only `devDependencies` and Jest config — no application code path, no user input handling, no auth/session logic, no cryptography, and no network-facing surface changes. `security_enforcement` is on (ASVS Level 1) per `.planning/config.json`, so the categories are enumerated for completeness, but nearly all are inapplicable by construction.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|----------------|---------|--------------------|
| V2 Authentication | No | Not touched — no auth code in scope |
| V3 Session Management | No | Not touched |
| V4 Access Control | No | Not touched |
| V5 Input Validation | No | No user/network input in scope — this is a test-tooling config change |
| V6 Cryptography | No | Not touched |
| V14 Configuration / Dependency Management | Yes | Supply-chain hygiene for the two packages touched — covered by the Package Legitimacy Audit above (`@testing-library/react-native` and `test-renderer` both OK-verdict; the considered-and-rejected `codemod` CLI flagged SUS and excluded) |

### Known Threat Patterns for this stack
| Pattern | STRIDE | Standard Mitigation |
|---------|--------|------------------------|
| Slopsquatted/malicious devDependency introduced during a "quick" package swap | Tampering (supply chain) | Package Legitimacy Audit (this document) — verify registry age, downloads, source repo, and deprecation status before any `npm install`/`npm uninstall`; both packages this phase touches are already-established, high-download, source-repo-linked packages, not new additions |
| `postinstall` script hijack via a newly-added package | Tampering | Not applicable here — no new packages are being added, only a patch-version refresh of an existing one and removal of two others; `npm view @testing-library/react-native scripts.postinstall` was implicitly checked via the legitimacy gate (`postinstall: null` in the signals output) |

## Sources

### Primary (HIGH confidence)
- npm registry, direct `npm view` calls this session — `@testing-library/react-native` (versions, peerDependencies, dist-tags), `test-renderer` (peerDependencies, dist-tags), `jest-expo` (dependencies, dist-tags), `react-test-renderer` (version), `@testing-library/jest-native` (deprecated notice), `jest` (dist-tags)
- Local files read directly this session: `mobile/package.json`, `mobile/package-lock.json`, `mobile/src/__tests__/useQuiz.test.js`, `.planning/codebase/TESTING.md`, `.planning/codebase/CONCERNS.md`, `.planning/REQUIREMENTS.md`, `.planning/STATE.md`, `.planning/config.json`
- Project-level research (same day, re-verified against registry this session, not stale): `.planning/research/STACK.md`, `.planning/research/PITFALLS.md`
- `gsd_run query package-legitimacy check` this session — `@testing-library/react-native` (OK), `test-renderer` (OK), `codemod` (SUS: too-new)
- Local grep audit this session across all 22 `*.test.*` files in `mobile/src` — confirmed zero `render(`/`renderHook(`/`fireEvent(`/`@testing-library` imports and zero jest-native matcher calls (`toBeOnTheScreen`, `toHaveTextContent`, etc.)

### Secondary (MEDIUM confidence)
- [raw.githubusercontent.com/callstack/react-native-testing-library — migration-v14.mdx](https://raw.githubusercontent.com/callstack/react-native-testing-library/main/website/docs/14.x/docs/start/migration-v14.mdx) — direct fetch succeeded this session (the hosted docs page 403s on both `callstack.github.io` and `oss.callstack.com` variants, matching STACK.md's earlier note about bot protection); used for: codemod commands, removed-API list, async-by-default confirmation, Node version requirement

### Tertiary (LOW confidence)
- WebSearch synthesis of GitHub PR/issue titles referencing the RNTL v14 migration (used only to corroborate the raw-file fetch above, not as a standalone source)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — every version and peer-dependency claim re-verified against the npm registry this session, not carried over from training data
- Architecture: HIGH — based on direct inspection of the actual `mobile/package.json`/test files, not assumed patterns
- Pitfalls: HIGH for pitfalls 1-3 (all derived from this session's own grep audit of the real test suite); MEDIUM for pitfall 4 (carried from project-level PITFALLS.md, itself MEDIUM confidence)

**Research date:** 2026-09-14
**Valid until:** 7 days (fast-moving: npm dist-tags for `jest`/`jest-expo`/RNTL can shift; re-verify versions with `npm view` immediately before executing if this phase is planned/executed more than a week after this research)
