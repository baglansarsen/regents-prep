# Roadmap: Regentify Mobile Refactor

## Overview

Four of the app's largest, most tangled screens (`HomeScreen`, `QuizScreen`, `FriendsScreen`, `FocusScreen`) mix business logic and UI in single large files, violating the codebase's established "screens are thin, hooks own logic" pattern. This roadmap fixes the test stack first (one small prerequisite), then decomposes each screen in ascending blast-radius order — `FocusScreen` → `FriendsScreen` → `QuizScreen` → `HomeScreen` — with each phase closing that screen's full characterization/extraction/test/parity cycle before the next begins. No behavior or UI changes; tests land at extraction time, not after.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [x] **Phase 1: Test Infrastructure** - Remove deprecated test-renderer/jest-native, standardize on `@testing-library/react-native@14.0.1` (completed 2026-09-14)
- [ ] **Phase 2: FocusScreen Decomposition** - Extract `useFocusScreenState` + sub-components, with characterization tests and parity check
- [ ] **Phase 3: FriendsScreen Decomposition** - Extract `useFriendsScreenState` + sub-components, with characterization tests and parity check
- [ ] **Phase 4: QuizScreen Decomposition** - Extract scoring pure functions + `useQuizState` + sub-components, with characterization tests and parity check
- [ ] **Phase 5: HomeScreen Decomposition** - Extract `useHomeAgenda` + sub-components, with characterization tests, parity check, and singleton-isolation re-verification

## Phase Details

### Phase 1: Test Infrastructure

**Goal**: The test stack is stable and fully compatible with React 19, so hook/component tests written during the four screen refactors are trustworthy rather than built on a deprecated, incompatible foundation
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01
**Success Criteria** (what must be TRUE):

  1. `cd mobile && npx jest` runs and passes with `@testing-library/react-native@14.0.1` as the sole rendering/query library
  2. `react-test-renderer@18.x` and `@testing-library/jest-native` no longer appear in `mobile/package.json`
  3. Existing tests that previously relied on `jest-native` matchers or the old renderer (e.g. `useQuiz.test.js`) are updated and pass under the new setup

**Plans**: 2/2 plans executed

Plans:
**Wave 1**

- [x] 01-01-PLAN.md — Tracer: install baseline, failing-first `renderHook` smoke test, then the package swap (RNTL 14.0.1 only, `setupFilesAfterEnv` key deleted)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 01-02-PLAN.md — Expansion: prove `render()` + RNTL v14's built-in matchers work with zero setup wiring

### Phase 2: FocusScreen Decomposition

**Goal**: FocusScreen's business logic and UI are fully decomposed into a tested orchestration hook and named sub-components, with behavior and UI unchanged, establishing the extraction template for the remaining three screens
**Mode:** mvp
**UI hint**: yes
**Depends on**: Phase 1
**Requirements**: FOCUS-01, FOCUS-02, FOCUS-03, FOCUS-04, FOCUS-05, FOCUS-06
**Success Criteria** (what must be TRUE):

  1. Pre-extraction characterization notes document FocusScreen's current filter, search, and empty-category behavior before any code moves
  2. FocusScreen.jsx calls a single `useFocusScreenState` hook and renders from its return value, with no business logic left inline
  3. FocusScreen's UI lives in named sub-components under `components/FocusScreen/`
  4. Every extracted hook has unit tests covering its state transitions, and every extracted sub-component has a render/snapshot test
  5. Manual verification confirms FocusScreen's behavior and UI still match the pre-extraction characterization notes

**Plans**: TBD

Plans:

- [ ] 02-01: TBD

### Phase 3: FriendsScreen Decomposition

**Goal**: FriendsScreen's business logic and UI are fully decomposed into a tested orchestration hook and named sub-components, with behavior and UI unchanged, validating the extraction template on a second screen
**Mode:** mvp
**UI hint**: yes
**Depends on**: Phase 1
**Requirements**: FRIENDS-01, FRIENDS-02, FRIENDS-03, FRIENDS-04, FRIENDS-05, FRIENDS-06
**Success Criteria** (what must be TRUE):

  1. Pre-extraction characterization notes document FriendsScreen's current leaderboard-segment-toggle and friend-request accept/block behavior before any code moves
  2. FriendsScreen.jsx calls a single `useFriendsScreenState` hook and renders from its return value, with no business logic left inline
  3. FriendsScreen's UI lives in named sub-components under `components/FriendsScreen/`
  4. Every extracted hook has unit tests covering its state transitions, and every extracted sub-component has a render/snapshot test
  5. Manual verification confirms FriendsScreen's behavior and UI still match the pre-extraction characterization notes

**Plans**: TBD

Plans:

- [ ] 03-01: TBD

### Phase 4: QuizScreen Decomposition

**Goal**: QuizScreen's scoring math, business logic, and UI are fully decomposed into pure functions, a tested orchestration hook, and named sub-components, with behavior and UI unchanged, eliminating the existing test-logic-duplication smell
**Mode:** mvp
**UI hint**: yes
**Depends on**: Phase 1
**Requirements**: QUIZ-01, QUIZ-02, QUIZ-03, QUIZ-04, QUIZ-05, QUIZ-06, QUIZ-07
**Success Criteria** (what must be TRUE):

  1. Pre-extraction characterization notes document QuizScreen's current struggle-mode, energy-gate, and repeat-round behavior before any code moves
  2. Scoring/streak math lives in pure functions in `utils/quizScoring.js`, and `useQuiz.test.js`'s existing logic-mirroring workaround is no longer needed
  3. QuizScreen.jsx calls a single `useQuizState` hook (explicitly distinguished from the existing domain hook `useQuiz`) and renders from its return value, with no business logic left inline
  4. QuizScreen's UI lives in named sub-components under `components/QuizScreen/`
  5. Every extracted hook and pure function has unit tests, every extracted sub-component has a render/snapshot test, and manual verification confirms behavior/UI still match the pre-extraction characterization notes

**Plans**: TBD

Plans:

- [ ] 04-01: TBD

### Phase 5: HomeScreen Decomposition

**Goal**: HomeScreen's business logic and UI are fully decomposed into a tested orchestration hook and named sub-components, with behavior and UI unchanged, and the app's most singleton-sensitive screen re-verified clean after decomposition
**Mode:** mvp
**UI hint**: yes
**Depends on**: Phase 1
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07
**Success Criteria** (what must be TRUE):

  1. Pre-extraction characterization notes document HomeScreen's current no-goal/goal-set, mission-card, and action-chip-priority behavior before any code moves
  2. HomeScreen.jsx calls a single `useHomeAgenda` hook and renders from its return value, with no business logic left inline
  3. HomeScreen's UI lives in named sub-components under `components/HomeScreen/`
  4. Every extracted hook has unit tests covering its state transitions, and every extracted sub-component has a render/snapshot test
  5. Manual verification confirms HomeScreen's behavior/UI match the pre-extraction notes, and the guest→real-account swap test (`useRP`/`useProgress` singleton isolation) is re-run and confirmed clean

**Plans**: TBD

Plans:

- [ ] 05-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Test Infrastructure | 2/2 | Complete    | 2026-09-14 |
| 2. FocusScreen Decomposition | 0/1 | Not started | - |
| 3. FriendsScreen Decomposition | 0/1 | Not started | - |
| 4. QuizScreen Decomposition | 0/1 | Not started | - |
| 5. HomeScreen Decomposition | 0/1 | Not started | - |
