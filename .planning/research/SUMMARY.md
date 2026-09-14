# Project Research Summary

**Project:** Regentify mobile — large-screen decomposition + test-coverage initiative
**Domain:** React Native (Expo) refactor of an existing, shipping app — screen decomposition into hooks/sub-components with test coverage added at extraction time
**Researched:** 2026-09-14
**Confidence:** HIGH

## Executive Summary

This is not a greenfield build — it's a structural refactor of four already-shipping screens (`HomeScreen.jsx` 1681 lines, `QuizScreen.jsx` 1221 lines, `FriendsScreen.jsx` 987 lines, `FocusScreen.jsx` 908 lines) in a mature React Native/Expo app, with a hard constraint of zero functional or visual change. The codebase already has the target architecture in production — a hook-driven, Context-for-global-state pattern, including a precedented "orchestration hook" pattern (`usePowerUps`, `usePredictedScore`) that composes several domain hooks into one flat, screen-ready object. The recommended approach is not to invent new architecture but to apply this existing pattern consistently: extract pure functions first, then one orchestration hook per screen (mechanical, zero-JSX, "move don't rewrite"), then presentational sub-components last, with hook unit tests and component render/snapshot tests landing in the same commit as each extraction — never deferred. The stack needs a small, mechanical fix (not new tooling): drop the deprecated `react-test-renderer@18.x` and `@testing-library/jest-native`, keep `@testing-library/react-native@14.0.1` (already installed, already correctly paired with `test-renderer@^1.2.0` and React 19.1.0) as the one library for both hook and component testing.

The core risk is not "will the extraction work" — the target pattern is proven and low-novelty — it's that behavior-preserving refactors of stateful, effect-heavy code are deceptively easy to get subtly wrong in ways that pass code review and even manual QA. Research converged on five recurring failure classes that apply to every one of the four screens: stale closures once inline logic moves into a hook with a different re-render boundary; effect-timing changes when a `useEffect` crosses a new component-mount boundary (duplicate Firestore listeners, subscriptions that stop cleaning up); referential-equality breaks when a hook's returned object/callback isn't memoized and becomes a new dependency-array input for callers; state-reset regressions when extracting stateful JSX changes React's reconciliation identity (filters, toggles, search inputs silently "forgetting" their value); and accidental duplication or bypass of two existing module-level singletons (`useRP`, `useProgress`) that have hard-won cross-account-bleed protection. None of these are exotic — they're the standard "hooks extraction" pitfall set — but they matter more here than usual because three of the four screens (`HomeScreen`, `QuizScreen`, `FocusScreen`) have no Error Boundary, so a small extraction mistake crashes the whole screen (a hard stop, mid-quiz) rather than degrading gracefully.

The recommended mitigation is procedural, not architectural: sequence screens by blast radius (smallest/simplest first to validate the pattern before applying it to `HomeScreen`), split "move" and "improve" into separate commits/diffs so a regression's cause is unambiguous, write the extracted-hook test that also asserts referential stability and mount/unmount parity (not just functional correctness), and treat pure-function extraction as the load-bearing first step in every screen since it's what lets hook/component tests import real logic instead of re-implementing it (a smell the codebase already exhibits in `useQuiz.test.js` and that this initiative should not repeat four more times).

## Key Findings

### Recommended Stack

The stack decision here is corrective, not additive: this project's `package.json` already has almost everything it needs, but a stale/incompatible pairing (`react-test-renderer@^18.3.1` alongside `react@19.1.0`) is actively blocking real hook testing today — it's the documented root cause of a "mirrored copy" workaround already visible in `useQuiz.test.js`. Fixing this pairing, not introducing new frameworks, unblocks TEST-01/TEST-02.

**Core technologies:**
- `@testing-library/react-native@^14.0.1`: the single library for both hook (`renderHook`) and component (`render`/`userEvent`) testing — its peer requirements (`react >=19`, `react-native >=0.78`, `jest >=29`, `test-renderer ^1.0.0`) are already satisfied by this project except for the stray old test-renderer pin.
- `test-renderer@^1.2.0` (already installed): the React-19-native rendering engine RNTL v14 actually uses — already correctly added, nothing to change.
- `jest@^29.7.0` / `jest-expo@~54.0.18` (keep as-is): both are pinned to the installed Expo SDK 54 and Jest 29 line; do not bump to Jest 30 mid-refactor — that's unrelated tooling churn.

**Remove (not add):** `react-test-renderer@^18.3.1` (incompatible with React 19, deprecated by React itself) and `@testing-library/jest-native@^5.4.3` (deprecated, superseded by RNTL v14's built-in matchers — no setup file needed at all).

**Notable pattern shift:** RNTL v14 is async-by-default — `render`, `renderHook`, `rerender`, `fireEvent`, `act` all return Promises now and must be awaited; older tutorials/pre-v14 sync examples will silently mislead.

### Expected Features

This isn't a product feature set — it's "what a complete refactor pass includes" for four specific screens, so must-have/should-have/defer maps onto refactor completeness criteria rather than user-facing features.

**Must have (per screen, gates "done"):**
- Pre-extraction characterization/behavior notes for that screen's key state transitions — without this, "no behavior change" is an assertion, not a verified fact
- Business logic extracted into named orchestration hook(s); screen reduced to calling the hook + rendering
- UI decomposed into named sub-components under `components/<ScreenName>/`
- Hook unit tests (TEST-01) and component render/snapshot tests (TEST-02) landing at extraction time, not after
- `npm run check` passing, per-file edits only (no bulk `sed`/codemod renames — this exact mistake already shipped a crashing TestFlight build once)
- Manual behavior/UI parity check against pre-extraction notes, per screen

**Should have (opportunistic, if it doesn't risk the no-behavior-change constraint):**
- Error Boundaries around each of the four screens (CONCERNS.md already flags this as missing — see Pitfall/risk section)
- `useMemo`/`useCallback` audit on expensive derivations exposed by extraction

**Defer (explicitly out of scope for this initiative):**
- Full integration/interaction test suites per screen (struggle mode, energy gate, friend-request flows) — a dedicated follow-up initiative
- Any feature/UX improvement noticed while reading these screens — log and defer, never slip in
- State-management library swap or TypeScript migration — separate initiatives entirely

### Architecture Approach

The target architecture already exists in this codebase and is precedented in production, not novel: screens should be thin JSX shells that call exactly one new **orchestration hook** per screen (composing the screen's existing domain hooks/contexts plus screen-local UI state and glue effects into one flat return object — the same shape as the already-shipping `usePowerUps`/`usePredictedScore` hooks), and render **presentational sub-components** that receive all data as props and report interactions via callbacks, with `useTheme()` as the sole exception allowed to call context directly. Domain hooks (`useProgress`, `useRP`, `useQuiz`, `useFriends`, `useFocusSession`) and Contexts (Auth, Theme, Lives, Pet, Subscription, Goal, etc.) are untouched — only the *caller* of these moves, from the screen body into the new orchestration hook.

**Major components:**
1. **Orchestration hook** (new, per screen: `useHomeAgenda`, `useQuizState`, `useFriendsScreenState`, `useFocusScreenState`) — composes domain hooks/contexts + owns screen-local `useState`/`useEffect`/`useMemo`; returns one flat, view-ready object
2. **Domain hooks** (existing, untouched) — single Firestore/AsyncStorage-backed concern, reusable across screens
3. **Sub-components** (new, under `components/<ScreenName>/`) — presentational, props-in/callbacks-out, no domain-context subscriptions
4. **Utils** (new, pure functions extracted first) — zero-React, zero-I/O calculation logic that both the orchestration hook and its tests import directly

**Recommended build order (per screen, and across screens):** pure functions → orchestration hook (mechanical cut-and-paste, zero JSX touched) → sub-components (least-coupled leaves first) → tests land at each step. Sequence the four screens smallest/lowest-hook-count first: `FocusScreen` (908 lines) → `FriendsScreen` (987) → `QuizScreen` (1221) → `HomeScreen` last (1681 lines, highest hook count, highest blast radius, the app's landing screen).

### Critical Pitfalls

1. **Stale closures in extracted hooks** — a value a moved `useEffect`/callback closes over stops updating once the hook's re-render boundary differs from the screen's. Avoid by running `exhaustive-deps` on every new hook file and never combining "extract" with "fix deps" in the same diff.
2. **Effect boundary shift changes timing without changing code** — moving an effect behind a conditionally-mounted sub-component can duplicate Firestore listeners or break cleanup, even with identical effect code. Avoid by checking whether the target sub-component is always mounted with the screen before moving an effect there; test mount/unmount explicitly.
3. **Referential-equality breaks from new object/function identities** — a hook's returned object/callback becomes a "new" value every render unless wrapped in `useMemo`/`useCallback`, silently causing extra re-renders/re-fetches. Avoid by wrapping every hook return value used elsewhere as a dependency, and asserting referential stability (`toBe()`) in hook tests.
4. **Behavior silently changes when component boundaries cross state/remount lines** — extracting stateful JSX (filters, toggles) can reset local state if conditional-rendering shape changes during extraction. Avoid by preserving the exact conditional-rendering shape at the call site and adding a toggle-then-return characterization test for `FriendsScreen`'s segment toggle and `FocusScreen`'s filter/search state specifically.
5. **Module-level singleton duplication/bypass** (`useRP`, `useProgress`) — these have hard-won `AuthContext` reset-on-swap guards against cross-account data bleed; treat them as untouchable black boxes during extraction, especially on `HomeScreen`, and re-run the guest→real-account swap manual test after decomposing it.

A sixth, structural risk sits above all of these: three of the four screens (`HomeScreen`, `QuizScreen`, `FocusScreen`) have no Error Boundary, so any of the above mistakes crashes the whole screen instead of degrading gracefully. Adding boundaries is explicitly out of scope for this refactor (would itself be a behavior change to weigh carefully) but is flagged as a strong candidate for an immediate fast-follow milestone.

## Implications for Roadmap

Based on research, suggested phase structure — one phase per screen, ordered by ascending blast radius, each internally sequenced pure-functions → hook → components → tests, each closed independently:

### Phase 1: FocusScreen Decomposition (calibration pass)
**Rationale:** Smallest screen (908 lines), fewest hooks, one dominant domain hook (`useFocusSession`) — lowest blast radius, ideal to prove the orchestration-hook + sub-component + test pattern before applying it to higher-stakes screens.
**Delivers:** `useFocusScreenState` orchestration hook, `components/FocusScreen/` sub-components (e.g. `BackgroundPicker`, `TodoInput`), hook unit tests + component render tests, a documented extraction template for screens 2-4.
**Addresses:** REFACTOR-0X (FocusScreen), TEST-01, TEST-02 from FEATURES.md's must-have table.
**Avoids:** Pitfall 5 (reconciliation/state-reset) — FocusScreen's filter/search state is explicitly named as a high-risk target; write the toggle-then-return characterization test before touching its JSX.

### Phase 2: FriendsScreen Decomposition
**Rationale:** Moderate hook count, clear tab boundaries (Leaderboard/Challenges/Feed) — a natural next step in the blast-radius ordering, and a second data point validating the pattern from Phase 1.
**Delivers:** `useFriendsScreenState` orchestration hook (podium animation + tab state), `components/FriendsScreen/` (LeaderboardTab, ChallengesTab, FriendsFeedTab), matching TEST-01/TEST-02 coverage.
**Uses:** Composition-hook pattern from STACK.md/ARCHITECTURE.md (`usePowerUps`-style); RNTL v14 `renderHook`/`render`.
**Implements:** Orchestration hook + presentational sub-component architecture pattern.

### Phase 3: QuizScreen Decomposition
**Rationale:** Most animation/effect glue (7+ `useEffect` blocks, multiple `Animated.Value` refs) — higher complexity than Phases 1-2 but the pattern is now proven twice over.
**Delivers:** `useQuizState` orchestration hook (explicitly separable from the existing domain hook `useQuiz` — naming collision risk flagged, needs a disambiguating JSDoc header), extracted overlays/gates (`RepeatIntroOverlay`, `EndOfLessonGate`) as sub-components, pure-function extraction of scoring/streak math into `utils/quizScoring.js` to eliminate the existing "mirrored copy" test smell.
**Fixes as a byproduct:** Anti-Pattern 3 (test-file logic duplication in `useQuiz.test.js`-adjacent territory), not as a separate cleanup effort.

### Phase 4: HomeScreen Decomposition
**Rationale:** Largest (1681 lines), highest hook count (15-20), highest blast radius — the app's landing screen every session touches first. Sequenced last deliberately, once the pattern is validated on three lower-stakes screens.
**Delivers:** `useHomeAgenda` orchestration hook, `components/HomeScreen/` sub-components (StreakCalendarSection, LeagueWidget, DailyTrapCard, etc.), full TEST-01/TEST-02 coverage.
**Avoids:** Pitfall 7 (module-level singleton duplication) — `HomeScreen` is the heaviest consumer of `useRP`/`useProgress`; re-run the guest→real-account swap manual test after this phase specifically, since CONCERNS.md notes this bug class previously caused real cross-account data bleed.

### Phase Ordering Rationale

- **Blast-radius ascending order is the primary driver:** each screen is largely independent (4 separate REFACTOR-0X items, not one monolithic deliverable), so smallest/simplest-first lets the team validate and refine the extraction template cheaply before the highest-stakes screen.
- **Within each phase, hooks-before-components is mandatory, not just a suggestion:** ARCHITECTURE.md's Anti-Pattern 4 (building components before the hook shape is final) causes rework if violated — every phase's plan should enforce "finish the orchestration hook, zero JSX touched, before starting sub-component extraction."
- **Tests are not a separate phase or a phase-ending checklist item — they're inline with each extraction step,** per PROJECT.md's own Key Decision and FEATURES.md's anti-feature warning against "batch all extraction first, test after."
- **This ordering directly avoids the highest-severity pitfalls:** singleton risk (Pitfall 7) is concentrated on `HomeScreen`, so pushing it last means the team has three phases of practice with the "call existing hooks as black boxes" discipline before touching the riskiest code.

### Research Flags

Needs research during phase planning (`/gsd-plan-phase --research-phase <N>`):
- **HomeScreen phase (Phase 4):** highest hook density, direct consumer of the singleton-guarded `useRP`/`useProgress` — worth a focused pre-flight check of `AuthContext`'s reset-on-swap wiring before extraction begins.
- **QuizScreen phase (Phase 3):** animation/effect glue is the densest of the four screens; the `useQuizState`/`useQuiz` naming collision and the existing "mirrored copy" test-file smell both need explicit handling in the plan, not just awareness.

Phases with standard, well-documented patterns (skip research-phase, plan directly from ARCHITECTURE.md/PITFALLS.md):
- **FocusScreen phase (Phase 1):** single dominant domain hook, smallest surface area — the orchestration-hook pattern from `usePowerUps` applies directly with no unresolved questions.
- **FriendsScreen phase (Phase 2):** clear tab boundaries, moderate hook count — same pattern as Phase 1, just a second validated data point.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Verified directly against npm registry peerDependencies/dependencies for `@testing-library/react-native@14.0.1`, `test-renderer@1.2.0`, `jest-expo@54.0.18`; cross-checked against this project's own `package.json` and an existing test file's documented workaround |
| Features | MEDIUM | Project-specific application (what "done" means per screen) is HIGH confidence, direct read of `.planning/PROJECT.md`/`CONCERNS.md`/`TESTING.md`; the general refactor/testing-practice framing (characterization testing, MVP-style prioritization) is well-established but not project-unique |
| Architecture | HIGH | Grounded directly in this codebase's own source (`usePowerUps`, `usePredictedScore`, `NextActionCard.jsx`) — the recommended pattern is an observed, already-shipping precedent, not an external best-practice import |
| Pitfalls | MEDIUM | Cross-checked against official React docs and multiple independent community sources for the general hook-extraction pitfall set; no project-specific incident history exists for these exact four screens beyond what CONCERNS.md already documents (singleton bleed history, the `sed`-rename TestFlight crash) |

**Overall confidence:** HIGH

### Gaps to Address

- **`.web.jsx` platform-variant drift (Pitfall 6):** none of the four screens have their own `.web.jsx` variant today, but shared sub-components/hooks they depend on (navigation, `LottieAnimation`) might. Each phase's plan should include a pre-flight grep (`find mobile/src -name "*.web.*"`) rather than assuming this is a non-issue — not independently verified against the current file tree during this research pass.
- **Error Boundary sequencing decision:** research flags this as a strong candidate for a fast-follow milestone immediately after this refactor (raises the stakes of every other pitfall from "degrade" to "crash"), but whether to pull it into this initiative or treat it as fully separate is a product/priority call, not a research conclusion — flag explicitly during roadmap review.
- **`useQuizState` vs `useQuiz` naming collision:** identified as a real risk (easy to conflate a new orchestration hook with the existing domain-hook engine) but the disambiguation approach (JSDoc header convention) is a suggestion, not something verified against a style-guide requirement — confirm during Phase 3 planning.

## Sources

### Primary (HIGH confidence)
- `mobile/package.json`, `mobile/src/__tests__/useQuiz.test.js` — direct repo read, current dependency/version state and existing test workaround
- `mobile/src/screens/HomeScreen.jsx`, `QuizScreen.jsx`, `FriendsScreen.jsx`, `FocusScreen.jsx` — direct read, hook/state call sites and line counts
- `mobile/src/hooks/usePowerUps.js`, `usePredictedScore.js`, `useGoalNotificationScheduler.js` — direct read, composition-hook precedent
- `mobile/src/components/NextActionCard.jsx` — direct read, presentational sub-component convention
- `.planning/PROJECT.md`, `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/CONCERNS.md`, `.planning/codebase/TESTING.md`, `.planning/codebase/CONVENTIONS.md` — project scope, constraints, and codebase analysis
- npmjs.com registry metadata — `@testing-library/react-native`, `jest-expo`, `test-renderer`, `react-test-renderer` — peer dependency and deprecation verification
- [React 19 Upgrade Guide – react.dev](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [useEffect – React official docs](https://react.dev/reference/react/useEffect)
- [exhaustive-deps – React official ESLint plugin docs](https://react.dev/reference/react-eslint-plugin-react-hooks/lints/exhaustive-deps)

### Secondary (MEDIUM confidence)
- [callstack/react-native-testing-library — SKILL.md](https://github.com/callstack/react-native-testing-library/blob/main/skills/react-native-testing/SKILL.md) — current testing patterns, direct fetch
- Michael Feathers' characterization/golden-master testing concept (cross-checked: Wikipedia, Fabrizio Duroni, Cloudamite)
- [tkdodo.eu — Hooks, Dependencies and Stale Closures](https://tkdodo.eu/blog/hooks-dependencies-and-stale-closures)
- [Why Is useEffect Running Twice? React 19 Strict Mode (Pockit Blog)](https://pockit.tools/blog/react-19-useeffect-strict-mode-guide/)
- General React anti-patterns and custom-hook composition guidance (multiple independent community sources, cross-checked against this repo's own CONCERNS.md findings)

### Tertiary (LOW confidence)
- None flagged — all research converged on multiple corroborating sources or direct primary-source verification

---
*Research completed: 2026-09-14*
*Ready for roadmap: yes*
