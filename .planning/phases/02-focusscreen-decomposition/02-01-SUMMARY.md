---
phase: 02-focusscreen-decomposition
plan: 01
subsystem: mobile-focus-screen
tags: [react-native, react-hooks, tdd, refactor, jest, rntl, focus-screen]
requires:
  - phase: 01-test-infrastructure
    provides: jest-expo 54 / RNTL v14 awaited renderHook/render/act shape, proven in rntlSmoke.test.js
provides:
  - "02-CHARACTERIZATION.md: independent pre-extraction behavior baseline for FocusScreen, scored against by FOCUS-06"
  - "useFocusScreenState(navigation): the orchestration hook contract plans 02-02 through 02-07 consume"
  - "FocusDoneScreen.jsx: first named container under mobile/src/components/FocusScreen/, the shape plans 02-02/02-04/02-05/02-06/02-07 copy"
  - "Precedent: orchestration-hook-wraps-one-domain-hook is now the sanctioned exception to the repo's 'no hook-to-hook calls' rule"
affects: [02-02-focusscreen-decomposition, 02-03-focusscreen-decomposition, 02-04-focusscreen-decomposition, 02-05-focusscreen-decomposition, 02-06-focusscreen-decomposition, 02-07-focusscreen-decomposition, 02-08-focusscreen-decomposition, 03-friendsscreen-decomposition, 04-quizscreen-decomposition, 05-homescreen-decomposition]
actuals:
  tokens: 17447
  tasks: 3
  commits: 4
tech-stack:
  added: []
  patterns:
    - "Orchestration hook wraps (does not absorb) an existing domain hook: useFocusScreenState calls useFocusSession(uid, earnRP, handlePomodoroComplete) internally and spreads its return"
    - "Container components under components/FocusScreen/ are pure presentation: no navigation prop, all mutation via callback props from the orchestration hook"
    - "Shared confirmation-dialog helper (confirmEndSession) parameterized by a single post-stop callback, used at two call sites that share dialog copy but differ in outcome"
key-files:
  created:
    - .planning/phases/02-focusscreen-decomposition/02-CHARACTERIZATION.md
    - mobile/src/hooks/useFocusScreenState.js
    - mobile/src/__tests__/useFocusScreenState.test.js
    - mobile/src/components/FocusScreen/FocusDoneScreen.jsx
    - mobile/src/components/FocusScreen/__tests__/FocusDoneScreen.test.jsx
  modified:
    - mobile/src/screens/FocusScreen.jsx
key-decisions:
  - "useFocusScreenState(navigation) takes only navigation, not (uid, navigation) — uid is read internally via useAuthContext(), which is what lets FocusScreen.jsx stop importing AuthContext entirely (deviation from 02-PATTERNS.md's illustrative signature, documented in 02-01-PLAN.md)"
  - "The two end-session confirmation paths (back-gesture guard, header close button) share one confirmEndSession(onStopped) helper for the dialog, but each passes a different onStopped callback (navigation.dispatch(e.data.action) vs navigation.goBack()) — they are NOT deduped into one identical callback, since re-reading the source this session showed the post-stop behavior differs"
  - "Mocked '../utils/activityLogger' in useFocusScreenState.test.js — useFocusSession's stop() calls logActivity(), which imports the real ESM 'firebase/firestore' package; no prior test in the repo exercised this import chain, and jest cannot parse it as-is (Rule 3: blocking issue, scoped to the one new test file rather than changing jest's transform config for everyone)"
patterns-established:
  - "Orchestration-hook-wraps-domain-hook: template for useFriendsScreenState/useQuizState/useHomeAgenda in later phases"
  - "Container components (Focus*Screen.jsx) receive the full orchestration-hook return spread as props and render named sub-components, driven entirely by callback props — no navigation prop passed down"
requirements-completed: [FOCUS-01, FOCUS-02, FOCUS-03, FOCUS-04, FOCUS-05]
coverage:
  - id: D1
    description: "Independent pre-extraction characterization baseline correcting FOCUS-01's stale filter/search/category wording"
    requirement: FOCUS-01
    verification:
      - kind: manual
        ref: ".planning/phases/02-focusscreen-decomposition/02-CHARACTERIZATION.md (8 required sections, grep-verified)"
        status: pass
    human_judgment: true
    rationale: "Requirement-text correction and behavior documentation are inherently a reading/writing exercise, not something an automated test asserts; verified via the plan's own grep-based section-presence check plus a full-file re-read this session."
  - id: D2
    description: "useFocusScreenState orchestration hook wraps useFocusSession; FocusScreen.jsx calls it exactly once and reads no context/RP directly"
    requirement: FOCUS-02
    verification:
      - kind: unit
        ref: "mobile/src/__tests__/useFocusScreenState.test.js (13 tests, all state-transition behaviors in plan <behavior>)"
        status: pass
      - kind: static
        ref: "grep checks: single useFocusScreenState(navigation) call site, zero useAuthContext/usePetContext/useRP( in FocusScreen.jsx, useFocusSession.js diff empty"
        status: pass
    human_judgment: false
  - id: D3
    description: "FocusDoneScreen.jsx: first named container under components/FocusScreen/, pure presentation with no navigation prop"
    requirement: FOCUS-03
    verification:
      - kind: unit
        ref: "mobile/src/components/FocusScreen/__tests__/FocusDoneScreen.test.jsx (8 tests: render + interaction per D-01/D-02)"
        status: pass
      - kind: static
        ref: "grep checks: zero 'navigation' references, zero duoBtn/cardShadow/elevatedCard/pillTab imports, copywriting-contract strings present"
        status: pass
    human_judgment: false
  - id: D4
    description: "Hook state-transition coverage: fresh-mount defaults, todos-ordering edge, zero side and equality side of the goal-celebration adjacency boundary"
    requirement: FOCUS-04
    verification:
      - kind: unit
        ref: "mobile/src/__tests__/useFocusScreenState.test.js — 'sessionGoal 0 never opens goalCelebModal...' and 'reaching sessionGoal exactly opens goalCelebModal...' tests, both passing deterministically under jest.useFakeTimers()"
        status: pass
    human_judgment: false
  - id: D5
    description: "FocusDoneScreen has callback props, so it has an interaction test (D-01) exercising each callback exactly once"
    requirement: FOCUS-05
    verification:
      - kind: unit
        ref: "mobile/src/components/FocusScreen/__tests__/FocusDoneScreen.test.jsx — three fireEvent.press tests asserting exclusive callback firing"
        status: pass
    human_judgment: false
duration: 55min
completed: 2026-09-14
status: complete
---

# Phase 02 Plan 01: FocusScreen Extraction Skeleton Summary

**Stood up the full screen→orchestration-hook→domain-hook→named-component→tests slice for FocusScreen: `useFocusScreenState` now wraps the untouched `useFocusSession`, `FocusScreen.jsx` calls it exactly once, and the done phase renders from the first component under `components/FocusScreen/` — with 21 passing hook/component tests including a deterministically-driven goal-celebration equality boundary.**

## Performance
- **Duration:** 55min
- **Started:** 2026-09-14T (session start, see STATE.md `last_updated`)
- **Completed:** 2026-09-14
- **Tasks:** 3
- **Files modified:** 6 (5 created, 1 modified)

## Accomplishments
- Wrote an independent, pre-extraction characterization baseline (`02-CHARACTERIZATION.md`) that corrects FOCUS-01's stale "filter/search/empty-category" wording — traced to a carried-over line in `.planning/codebase/CONCERNS.md` — and documents the screen's five real selection state machines, session lifecycle/pet-message timings, and the two distinct end-session confirmation paths
- Created `useFocusScreenState(navigation)`, the orchestration hook that wraps `useFocusSession` (wrap, don't absorb) and now owns everything that used to be local state/effects/handlers directly in `FocusScreen.jsx`
- Reduced `FocusScreen.jsx` to a single `useFocusScreenState(navigation)` call; it no longer imports `AuthContext`, `PetContext`, or `useRP` directly
- Extracted `FocusDoneScreen.jsx`, the first named container under `mobile/src/components/FocusScreen/`, with its own scoped style factory and zero shared-button/card-factory imports
- 21 new tests passing (13 hook state-transition tests, 8 component render/interaction tests), including the goal-celebration **equality** boundary driven deterministically with fake timers — the plan's own `<behavior>` block flagged this as possibly-undriveable and told me to leave it in place marked with the reason rather than weaken it if it couldn't be made deterministic. It could: no marking/gap needed.
- Full suite: `npm run check` exits 0, 366 tests passing, `useFocusSession.js` byte-identical (`git diff` empty)

## Task Commits
1. **Task 1: Record the pre-extraction behavior baseline (FOCUS-01)** - `a5cbc942` (docs)
2. **Task 2 (RED): Add failing state-transition tests for useFocusScreenState** - `a4635fe4` (test)
2. **Task 2 (GREEN): Create useFocusScreenState, reduce the screen to one hook call** - `0d5065a6` (feat)
3. **Task 3: Extract FocusDoneScreen as the first named sub-component** - `838808cf` (feat)

**Plan metadata:** commit pending — SUMMARY.md + STATE.md/ROADMAP.md commit is created by the orchestrator in worktree mode (only SUMMARY.md is committed here per this dispatch's worktree instructions).

## Files Created/Modified
- `.planning/phases/02-focusscreen-decomposition/02-CHARACTERIZATION.md` - pre-extraction behavior baseline (8 required sections), the FOCUS-06 parity reference
- `mobile/src/hooks/useFocusScreenState.js` - orchestration hook; wraps `useFocusSession`, owns pet-reaction/goal-celebration/back-gesture effects and subject/todo handlers, exports `BACKGROUNDS`
- `mobile/src/__tests__/useFocusScreenState.test.js` - 13 hook state-transition tests (RNTL v14 awaited `renderHook`/`act`)
- `mobile/src/components/FocusScreen/FocusDoneScreen.jsx` - done-phase container, pure presentation, own local style factory
- `mobile/src/components/FocusScreen/__tests__/FocusDoneScreen.test.jsx` - 8 render/interaction tests (D-01/D-02)
- `mobile/src/screens/FocusScreen.jsx` - reduced to one hook call; done branch now a single `<FocusDoneScreen ... />` render; removed now-unused `AuthContext`/`PetContext`/`useRP`/`Alert`/`Modal`/`StudyBuddyCompanion` imports and done-only style keys

## Decisions Made

**1. `useFocusScreenState(navigation)` signature, not `(uid, navigation)`.**
02-PATTERNS.md's illustrative sample takes `uid` as a parameter while also calling `useAuthContext()` internally — redundant. Taking only `navigation` is what lets `FocusScreen.jsx` stop importing `AuthContext` entirely, which is the actual FOCUS-02 bar. This was already flagged as a deliberate planner deviation in 02-01-PLAN.md's frontmatter; implementation followed it as specified.

**2. The two end-session confirmation paths share a dialog-showing helper but stay behaviorally distinct.**
`confirmEndSession(onStopped)` shows the identical `Alert.alert` dialog for both the back-gesture guard and `confirmStopAndGoBack`. Each passes a different `onStopped`: the back-gesture guard dispatches the intercepted navigation action, `confirmStopAndGoBack` does a plain `goBack()`. Deduping further (into one identical callback) would have been a behavior change per `02-CHARACTERIZATION.md`'s "Leaving an active session" section — re-reading the source this session confirmed the two are not byte-identical.

**3. Mocked `activityLogger` in the hook test, not the app code.**
`useFocusSession`'s `stop()` calls `logActivity(uid, ...)`, which imports the real `firebase/firestore` ESM package. No prior test in this repo exercised this import chain, and jest cannot parse the ESM `export` syntax as shipped. Rather than touching the shared jest `transformIgnorePatterns` config (out of scope, affects all tests), I mocked `../utils/activityLogger` to a `jest.fn()` in the one new test file that needed it — a Rule 3 blocking-issue fix, scoped narrowly.

**4. Fixed a fake-timer id-collision in the todos-ordering test.**
`addTodo`'s id comes from `Date.now()`. Under jest's modern fake timers (active for the buddy-message/goal-celebration assertions in the same test file), `Date.now()` is frozen unless explicitly advanced — three back-to-back `handleAddTodo()` calls in the ordering test produced three identical ids, so `toggleTodo(middleId)` flipped all three rows instead of one. Fixed by advancing fake timers by 1ms between adds in the test. This is a test-authoring fix, not a change to `useFocusSession.js` or `useFocusScreenState.js`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking issue] `firebase/firestore` ESM import unparseable by jest**
- **Found during:** Task 2, first GREEN test run
- **Issue:** `useFocusSession.js` → `activityLogger.js` → `firebase/firestore` (real package) — jest's `transformIgnorePatterns` doesn't cover `firebase`, so `import ... from 'firebase/firestore'` (an ESM `export` statement) crashed the test runner with `SyntaxError: Unexpected token 'export'`. No prior test in this repo exercised this import chain since `useFocusSession.js` had never been imported into a test file before this plan.
- **Fix:** Added `jest.mock('../utils/activityLogger', () => ({ logActivity: jest.fn() }))` to `useFocusScreenState.test.js`. Scoped to the one test file; no change to jest config, `useFocusSession.js`, or `activityLogger.js`.
- **Files modified:** `mobile/src/__tests__/useFocusScreenState.test.js`
- **Verification:** Full suite passes (`npm run check` exits 0, 366 tests)
- **Commit:** `0d5065a6`

**2. [Rule 1 - Bug in my own test] Fake-timer id collision in the todos-ordering test**
- **Found during:** Task 2, GREEN test run
- **Issue:** `expect(todos.map(t => t.done)).toEqual([false, true, false])` failed with `[true, true, true]` — three sequential `Date.now()`-based ids collided because modern fake timers freeze the clock.
- **Fix:** Advance fake timers 1ms between each `handleAddTodo()` call in the test loop.
- **Files modified:** `mobile/src/__tests__/useFocusScreenState.test.js`
- **Verification:** Test passes with correct id uniqueness; re-ran full suite, no other test affected
- **Commit:** `0d5065a6`

Total deviations: 2 (both Rule 1/3, both scoped to the new test file, neither touching `useFocusSession.js` or production behavior). Impact: none on shipped behavior; both are test-infrastructure fixes needed to exercise real code paths that had never been under test before this plan.

## Initial RED Run (verbatim, Task 2 acceptance criteria)

Command: `npx jest src/__tests__/useFocusScreenState.test.js` (before `useFocusScreenState.js` existed):

```
FAIL src/__tests__/useFocusScreenState.test.js
  ● Test suite failed to run

    Cannot find module '../hooks/useFocusScreenState' from 'src/__tests__/useFocusScreenState.test.js'

      18 |
      19 | import { renderHook, act } from '@testing-library/react-native'
    > 20 | import { useFocusScreenState, BACKGROUNDS } from '../hooks/useFocusScreenState'
         | ^
      21 |
      22 | jest.mock('../context/AuthContext', () => ({
      23 |   useAuthContext: () => ({ user: { uid: 'test-uid' } }),

      at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/resolver.js:427:11)
      at Object.require (src/__tests__/useFocusScreenState.test.js:20:1)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        0.647 s
```

This is the RED evidence the plan's Task 2 acceptance criteria requires — the target module did not exist yet, proving the subsequent GREEN run exercises real, newly-written code rather than passing vacuously.

## `useFocusScreenState` Return-Key Contract (frozen for plans 02-02 through 02-07)

Spread from `useFocusSession`: `preset, setPreset, subject, setSubject, sound, setSound, sessionGoal, setSessionGoal, todos, addTodo, toggleTodo, clearTodos, phase, secondsLeft, pomodoroCount, sessionRP, partialMinutes, sessionXP, cyclePosition, start, pause, resume, skip, stop, reset, history, progress, FOCUS_PRESETS`.

Added by `useFocusScreenState`: `isActive, isDone, subjectChips, soundOptions, backgrounds, buddyMessage, todoInput, setTodoInput, customSubject, setCustomSubject, showCustomInput, background, setBackground, goalCelebModal, pet, handleSubjectChip, showCustomSubjectInput, handleCustomSubject, handleAddTodo, clearBuddyMessage, dismissGoalCeleb, goBack, openHistory, confirmStopAndGoBack`.

Also exported (named, alongside the hook): `BACKGROUNDS`.

## Goal-Celebration Equality Assertion: Driven Deterministically

The plan's `<behavior>` block anticipated this assertion might not be drivable deterministically ("if the surrounding async settle... cannot be made deterministic in this environment, do NOT weaken or delete the assertion — leave the test in place marked with the reason"). It was drivable: with `jest.useFakeTimers()` active and `sound` defaulting to `SOUND_OPTIONS[0]` ('off', so `startSound()` short-circuits with no real async audio load), advancing fake timers by the full focus-interval duration plus the 600ms celebration delay reliably lands `goalCelebModal` on `true`. No flake observed across repeated local runs. No gap to route to the FOCUS-06 manual pass for this specific assertion.

## Behavior Discrepancy Noticed During the Move

None found beyond what `02-CHARACTERIZATION.md` already documents as a **pre-existing** fact (not introduced by this move): the two end-session confirmation paths were assumed byte-identical by `02-RESEARCH.md`'s Open Question 2, but re-reading the source this session (and preserved exactly in the new hook) confirms they differ in post-stop navigation. This was already known and dispositioned by the plan before this session started — recorded here as a finding, not a fix, per the plan's own instruction not to slip behavior changes into a structural refactor.

## Issues Encountered

None beyond the two auto-fixed deviations documented above. No checkpoints were hit (plan has `has_checkpoints: false`, consistent with what actually happened). No authentication gates.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness

Plans 02-02 through 02-07 can now:
- Copy the `useFocusScreenState` return-key contract as their prop source for every remaining extracted component (`FocusActiveScreen`, `BigPetDisplay`, `SessionSummaryStats`, `DoneActions`, `GoalCelebrationModal`, `FocusSetupScreen`, `ActiveSessionHeader`, `TimerControls`, `ActiveTaskList`, `PomodoroCycleDots`, `SubjectPicker`, `DurationPicker`, `GoalPicker`, `TaskInput`, `TaskList`, `SoundPicker`, `BackgroundPicker`)
- Follow the `FocusDoneScreen.jsx` shape (own style factory, `useTheme()` called directly, callback props, no `navigation` prop) as the proven template
- Reuse the `confirmEndSession`/`confirmStopAndGoBack` pattern for any other component that needs the end-session dialog
- Plan 02-04 completes the "no inline JSX" half of FOCUS-02 (setup branch still inline in `FocusScreen.jsx`); plan 02-02 does the same for the active branch
- Plan 02-08's manual FOCUS-06 parity pass has `02-CHARACTERIZATION.md` ready as its scoring reference

## Self-Check: PASSED

- FOUND: `.planning/phases/02-focusscreen-decomposition/02-CHARACTERIZATION.md`
- FOUND: `mobile/src/hooks/useFocusScreenState.js`
- FOUND: `mobile/src/__tests__/useFocusScreenState.test.js`
- FOUND: `mobile/src/components/FocusScreen/FocusDoneScreen.jsx`
- FOUND: `mobile/src/components/FocusScreen/__tests__/FocusDoneScreen.test.jsx`
- FOUND: commit a5cbc942
- FOUND: commit a4635fe4
- FOUND: commit 0d5065a6
- FOUND: commit 838808cf

---
*Phase: 02-focusscreen-decomposition*
*Completed: 2026-09-14*
