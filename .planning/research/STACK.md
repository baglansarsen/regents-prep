# Stack Research

**Domain:** React Native (Expo) screen decomposition + hook/component unit testing
**Researched:** 2026-09-14
**Confidence:** HIGH (versions verified directly against npm registry package metadata and official RNTL docs/GitHub; a few pairings are MEDIUM where only inferred from dependency trees)

## Context: what's already in `mobile/package.json`

This is a **refactor of an existing app**, not a greenfield choice. The stack below is deliberately close to what's already installed — the goal is to fix two specific mismatches that are currently *blocking* real hook/component testing, not to introduce new frameworks.

Current state (`mobile/package.json`, verified 2026-09-14):

| Package | Installed | Status |
|---|---|---|
| `react` / `react-dom` | `19.1.0` | current |
| `react-native` | `0.81.5` | current |
| `jest` | `^29.7.0` | correct — keep |
| `jest-expo` | `~54.0.18` | correct — keep |
| `@testing-library/react-native` | `^14.0.0` | correct major, needs `npm install` refresh to pick up `14.0.1` |
| `test-renderer` | `^1.2.0` | **already correctly added** — this is the new peer RNTL v14 needs |
| `react-test-renderer` | `^18.3.1` | **stale/wrong** — mismatched against React 19.1.0, and no longer needed by RNTL v14 at all |
| `@testing-library/jest-native` | `^5.4.3` | **deprecated** — unmaintained, superseded by RNTL's built-in matchers |

Direct evidence of the pain this causes: `mobile/src/__tests__/useQuiz.test.js` has a header comment stating tests avoid `renderHook`/hook testing entirely and instead re-implement (mirror/copy) the hook's internal pure logic into the test file "rather than fighting react-test-renderer version mismatches with Expo 52." That workaround is exactly the version conflict below — it predates the SDK 54 / React 19 upgrade and is now fixable outright. TEST-01 (hook unit tests) should not repeat this workaround.

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| `jest` | `^29.7.0` (keep) | Test runner | Already installed; RNTL v14's peer range is `jest >= 29.0.0`, and `jest-expo@54.0.18`'s own dependency tree (`@jest/globals`, `jest-snapshot`, `babel-jest`, all pinned `^29.2.1`) is built against Jest 29, not 30. Bumping to Jest 30 mid-refactor would be an unrelated tooling upgrade, not a refactor need — defer it to a future Expo SDK bump. |
| `jest-expo` | `~54.0.18` (keep) | Jest preset for Expo/RN transforms, mocks, environment | Already pinned to the installed Expo SDK (`^54.0.37`). Verified via npm registry: `jest-expo@54.0.18` itself depends on `react-test-renderer@19.1.0` — i.e. Expo's own preset already expects React 19's test renderer, confirming the project's separately pinned `react-test-renderer@^18.3.1` devDependency is the outlier, not `jest-expo`. |
| `@testing-library/react-native` | `^14.0.1` | Component rendering + querying + `renderHook` for hooks | The standard RN component/hook-testing library for 2025-2026. v14's peer requirements (verified via npm registry JSON) are `react >=19.0.0`, `react-native >=0.78`, `jest >=29.0.0`, `test-renderer ^1.0.0` — every one of those is already satisfied by this project except the stray `react-test-renderer` pin. This is the library the React core team itself now points to as the React Native replacement for the deprecated `react-test-renderer` (see react.dev's React 19 upgrade guide / react-test-renderer's own deprecation notice). |
| `test-renderer` | `^1.2.0` (keep, already installed) | Lightweight React 19-native test renderer, RNTL v14's actual rendering engine | Written by the RNTL maintainer (mdjastrzebski) as "a modern replacement for the deprecated React Test Renderer." RNTL v14 depends on `test-renderer ^1.0.0`, **not** `react-test-renderer`. Its own peer dep is `react ^19.0.0` — an exact match to this project's `react@19.1.0`. The project has already added this correctly; nothing to change here. |

### What to remove (not add)

| Package | Action | Why |
|---|---|---|
| `react-test-renderer@^18.3.1` | **Remove from devDependencies** | React 19 emits a deprecation warning on every `ReactTestRenderer.create()` call, and this specific pin (18.x) is flatly incompatible with React 19.1.0 — it is the root cause of the version-mismatch workaround already visible in `useQuiz.test.js`. RNTL v14 no longer uses this package at all (see `test-renderer` above), so there's no reason to keep or fix the pin — just delete it. |
| `@testing-library/jest-native@^5.4.3` | **Remove from devDependencies**, drop `"@testing-library/jest-native/extend-expect"` from `package.json`'s `jest.setupFilesAfterEnv` | Package is explicitly marked deprecated by its own maintainers ("no longer actively maintained... migrate to React Native Testing Library v12.4+"). RNTL v12.4+ (this project is on v14) ships the same matchers (`toBeOnTheScreen()`, `toHaveTextContent()`, `toContainElement()`, `toBeEmptyElement()`, etc.) built in, with **zero setup** required as of v13/v14 — matchers are available automatically on `expect()` the moment you `import` anything from `@testing-library/react-native` in a test file. No `setupFilesAfterEnv` entry needed for matchers at all. |

### Supporting Libraries / Utilities (no new installs needed)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@testing-library/react-native`'s `renderHook` | (bundled in RNTL v14) | Unit-test extracted business-logic hooks (TEST-01) | Use for every hook extracted from the four screens (e.g. a hypothetical `useHomeAgenda`, `useQuizState`). Replaces the "copy the pure logic into the test file" workaround — test the real hook. |
| `@testing-library/react-native`'s `render` + `.toJSON()` | (bundled in RNTL v14) | Render/snapshot-test extracted sub-components (TEST-02) | Minimum bar per PROJECT.md's TEST-02: `render(<Component {...props} />).toJSON()` snapshot, or `toBeOnTheScreen()`/`toHaveTextContent()` assertions for behavior. |
| `@testing-library/react-native`'s `userEvent` | (bundled in RNTL v14) | Simulating presses/typing on extracted interactive sub-components | Prefer over `fireEvent` for anything a real user would do (press, type, scroll) — `userEvent` is always async and fires the fuller, more realistic event sequence (e.g. `press` fires pointer-down/up, not just `onPress`). Reserve `fireEvent` for events `userEvent` doesn't cover. |
| Existing manual mock pattern (`src/__mocks__/firebase.js`, `moduleNameMapper`) | n/a | Mocking Firestore reads/writes inside extracted hooks | Don't introduce a new Firebase-mocking library (e.g. `firebase-mock`, `firestore-jest-mock`) or a network-mocking library (MSW, `nock`) for this refactor — the codebase already has a working, minimal manual mock convention (`jest.fn()` returning resolved promises) documented in `.planning/codebase/TESTING.md`. Extracted hooks that touch Firestore should follow that same convention for consistency, not add a new dependency. |

## Installation

```bash
cd mobile

# Refresh RNTL to latest 14.x patch (already in range, this just syncs lockfile)
npm install @testing-library/react-native@^14.0.1

# Remove the deprecated matcher package and the mismatched test renderer
npm uninstall @testing-library/jest-native react-test-renderer
```

Then in `mobile/package.json`, remove this line from the `jest` config block:

```diff
   "setupFilesAfterEnv": [
-    "@testing-library/jest-native/extend-expect"
   ],
```

(If `setupFilesAfterEnv` becomes empty, the key can be removed entirely — RNTL v14 needs no test setup file for matchers.)

No other `jest` config changes are required — `transformIgnorePatterns` and `moduleNameMapper` (Firebase mock, `@content` alias) are unaffected by this change.

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|--------------------------|
| `@testing-library/react-native` v14 | Stay on RNTL v13.x | Only if you cannot move off React 18 — not applicable here, project is already on React 19.1.0. No reason to stay behind. |
| `@testing-library/react-native`'s `renderHook` | `@testing-library/react-hooks` (standalone package) | Never for new work — that package was archived/merged into Testing Library's main packages years ago and is unmaintained; it also never supported React Native's renderer. RNTL's own `renderHook` is the only current option. |
| Manual Jest mocks for Firestore | MSW (Mock Service Worker) / `nock` | Only if the refactor starts touching real network-layer HTTP calls (e.g. Cloud Functions `fetch` calls) rather than the Firestore SDK — not the case for these four screens per CONCERNS.md, which describes Firestore-backed hooks. |
| Jest + jest-expo (keep) | Vitest + `vitest-native` | Not for this project. `vitest-native` is a very new (2026), not-yet-proven community project; swapping test runners mid-refactor would mean re-validating the entire existing 23-file test suite, the `jest-expo` preset's RN/Expo transform handling, and the Firebase mock wiring — all for a runner-speed benefit that doesn't matter at this test-suite size. This is exactly the kind of unrelated tooling churn PROJECT.md's "no opportunistic fixes" constraint rules out. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|--------------|
| `react-test-renderer` (any version, including bumping it to 19.x) | Deprecated by the React team as of React 19 — "creates a contrived environment," encourages introspecting React internals that change without notice; React 19 prints a console warning on every use. The React team's own guidance for React Native is to use `@testing-library/react-native` instead. This project already has the correct replacement (`test-renderer@^1.2.0`) installed — just remove the old package rather than upgrading its pin. | `test-renderer@^1.2.0` (already installed) via `@testing-library/react-native` |
| `@testing-library/jest-native` | Explicitly deprecated/unmaintained by its own repo; duplicates matchers RNTL now ships built-in | RNTL v14's built-in matchers (no import needed) |
| `@testing-library/react-hooks` | Unmaintained standalone package, predates RNTL's own `renderHook`, no RN renderer support | `renderHook` from `@testing-library/react-native` |
| Detox / Maestro / Appium (E2E frameworks) | Out of scope per PROJECT.md — this initiative is unit tests for extracted hooks/components only; TESTING.md confirms no E2E exists today and manual QA covers that layer | Keep manual dev-build QA for end-to-end flows; unit test only the extracted logic |
| Enzyme | Dead for React 19 (relies on removed/changed internals); unmaintained since ~2020 | `@testing-library/react-native` |
| Automated "extract hook" codemods (jscodeshift/ts-morph scripts) | No safe, mechanical codemod exists for pulling stateful `useState`/`useEffect`/Firestore-reading logic out of a JSX-heavy screen into a hook — this is a semantic, behavior-preserving move that requires understanding what state a sub-component actually needs, which automated codemods cannot verify. PROJECT.md's core constraint is "no functional or visual changes," which needs human/AI judgment per extraction, not a mechanical rename/move tool. | Manual (or AI-assisted, file-by-file) extraction per `CLAUDE.md`'s existing rule against bulk mechanical edits across `mobile/src` |
| Bumping `jest` to v30 or `jest-expo` past the SDK-54-pinned range as part of this work | Unrelated to the refactor goal; risks destabilizing the other 23 existing test files and the `jest-expo` preset's RN 0.81 transform handling for no refactor benefit | Keep `jest@^29.7.0` / `jest-expo@~54.0.18`; revisit only alongside a future Expo SDK bump (already flagged as its own tracked risk in `.planning/codebase/CONCERNS.md`) |

## Testing Patterns to Follow (from RNTL's own current guidance)

These come directly from Callstack's (RNTL's maintainers) official testing-patterns guidance, current as of 2026:

- **Query priority order:** `getByRole` (with `{ name: '...' }`) first → label/placeholder/display-value text → visible text → `testID` as last resort. Prefer accessibility-based queries; they double as an accessibility check.
- **`getBy*` vs `queryBy*` vs `findBy*`:** `getBy*` for elements that must exist (throws if missing); `queryBy*` only for asserting *non-existence* (`expect(queryByText(...)).not.toBeOnTheScreen()`); `findBy*` (async) for elements that appear after an action — preferred over `waitFor(() => getBy...)`.
- **RNTL v14 is async-by-default:** `render`, `renderHook`, `rerender`, `unmount`, `fireEvent`, and `act` all return Promises now and must be `await`ed. This is new relative to the RNTL v12/v13 patterns that may show up in older tutorials — write new tests with `await render(...)` / `await renderHook(...)` from the start, don't copy pre-v14 sync examples.
- **Context-dependent hooks:** for hooks/components extracted from these screens that read Auth/Theme/Streak/Lives/Pet/Subscription context (per `.planning/codebase/ARCHITECTURE.md`, "most global state lives here"), use the `wrapper` option on `render`/`renderHook` to inject the relevant `Context.Provider` — don't restructure the hook to accept context values as parameters just to make it "more testable"; that would be a behavior/API change PROJECT.md rules out.
- **Never wrap interactions in a manual `act()`** — RNTL's `render`/`fireEvent`/`userEvent` handle this internally; wrapping again is redundant and a common source of stale/duplicate-warning noise.

## Stack Patterns by Variant

**For extracted business-logic hooks (TEST-01):**
- Use `renderHook(() => useTheHook(args), { wrapper })` from `@testing-library/react-native`.
- Assert on `result.current` state/callbacks; wrap state-changing calls (e.g. `result.current.someAction()`) in `act()` only if RNTL's async render/act doesn't already cover it — for hook-only tests (no component tree), `act()` from `react` is still typically needed around direct state-updating calls.
- Mock Firestore/native-module dependencies the hook touches using the existing `src/__mocks__/firebase.js` + `moduleNameMapper` convention — do not reach for a new mocking library.

**For extracted sub-components (TEST-02):**
- Minimum bar: `const { toJSON } = await render(<Component {...props} />); expect(toJSON()).toMatchSnapshot()`.
- Where a sub-component has meaningful interactive behavior (buttons, toggles), add a `userEvent` interaction test in the same file rather than only a snapshot — snapshot alone doesn't catch "button doesn't fire".

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|------------------|-------|
| `@testing-library/react-native@14.0.1` | `react@19.1.0`, `react-native@0.81.5`, `jest@29.7.0`, `test-renderer@1.2.0` | All verified directly against npm registry peerDependencies for `@testing-library/react-native@14.0.1` (`jest: >=29.0.0`, `react: >=19.0.0`, `react-native: >=0.78`, `test-renderer: ^1.0.0`). Every peer is already satisfied by this project's installed versions. |
| `jest-expo@54.0.18` | `jest@^29.7.0` | Verified via npm registry `dependencies` field: `jest-expo@54.0.18` itself pulls `react-test-renderer@19.1.0`, `jest-snapshot@^29.2.1`, `@jest/globals@^29.2.1` — all Jest-29-line packages. Do not pair with Jest 30 until a `jest-expo` version built for a later Expo SDK is adopted. |
| `test-renderer@1.2.0` | `react@^19.0.0` | Verified via npm registry peerDependencies — exact match to installed `react@19.1.0`. |
| `react-test-renderer` (any 18.x) | **Incompatible** with `react@19.1.0` | This is the mismatch causing the current test-writing workaround; remove rather than upgrade the pin, since RNTL v14 doesn't need this package at all. |

## Sources

- [npmjs.com: @testing-library/react-native](https://www.npmjs.com/package/@testing-library/react-native) — HIGH confidence (direct npm registry metadata fetch for v14.0.1: peerDependencies, dist-tags)
- [npmjs.com: jest-expo](https://www.npmjs.com/package/jest-expo) — HIGH confidence (direct npm registry metadata fetch for v54.0.18: dependencies)
- [npmjs.com: test-renderer](https://www.npmjs.com/package/test-renderer) — HIGH confidence (direct npm registry metadata fetch: description, peerDependencies)
- [npmjs.com: react-test-renderer (DEPRECATED)](https://www.npmjs.com/package/react-test-renderer) — HIGH confidence (package is self-labeled deprecated on its own npm listing)
- [React 19 Upgrade Guide – react.dev](https://react.dev/blog/2024/04/25/react-19-upgrade-guide) — HIGH confidence (official React docs; confirms react-test-renderer deprecation + RN alternative guidance)
- [callstack/react-native-testing-library — Migration to 14.x](https://oss.callstack.com/react-native-testing-library/docs/start/migration-v14) — MEDIUM confidence (content synthesized from search-engine snippets after direct fetch was blocked by the site's bot protection; corroborated by GitHub release notes and multiple independent summaries, so treated as reliable but not primary-source-verified in full)
- [callstack/react-native-testing-library — SKILL.md](https://github.com/callstack/react-native-testing-library/blob/main/skills/react-native-testing/SKILL.md) — HIGH confidence (direct fetch of maintainer-authored current testing-patterns guidance)
- [GitHub: callstack/react-native-testing-library Issue #1769, #1593](https://github.com/callstack/react-native-testing-library/issues/1769) — MEDIUM confidence (community issue discussion on React 19 support timeline, corroborating the v14 requirement)
- [testing-library/jest-native — GitHub](https://github.com/testing-library/jest-native) — HIGH confidence (repo's own README states deprecation and migration path)
- Local verification: `mobile/package.json`, `mobile/src/__tests__/useQuiz.test.js`, `.planning/codebase/TESTING.md`, `.planning/codebase/CONCERNS.md` — HIGH confidence (read directly from the project's own current source)

---
*Stack research for: React Native (Expo) screen decomposition + hook/component unit testing*
*Researched: 2026-09-14*
