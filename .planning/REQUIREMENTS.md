# Requirements: Regentify Mobile Refactor

**Defined:** 2026-09-14
**Core Value:** Restore the codebase's established "screens are thin, hooks own logic" pattern in the four screens that violate it — HomeScreen, QuizScreen, FriendsScreen, FocusScreen — without changing behavior.

## v1 Requirements

Requirements for this refactor initiative. Each maps to one roadmap phase (one phase per screen, plus a small test-infrastructure prerequisite). Ordered by research-recommended blast-radius: FocusScreen → FriendsScreen → QuizScreen → HomeScreen.

### Test Infrastructure

- [x] **INFRA-01**: `mobile/`'s test stack has the deprecated `react-test-renderer@18.x` and `@testing-library/jest-native` removed, with `@testing-library/react-native@14.0.1` as the sole rendering/query library, and `cd mobile && npx jest` passing after the change

### FocusScreen

- [x] **FOCUS-01**: Pre-extraction characterization notes capture FocusScreen's current filter, search, and empty-category behavior
- [x] **FOCUS-02**: FocusScreen's business logic is extracted into a `useFocusScreenState` orchestration hook; the screen is reduced to calling the hook and rendering
- [x] **FOCUS-03**: FocusScreen's UI is decomposed into named sub-components under `components/FocusScreen/`
- [x] **FOCUS-04**: Every hook extracted from FocusScreen has unit tests covering its state transitions
- [x] **FOCUS-05**: Every sub-component extracted from FocusScreen has a render/snapshot test
- [ ] **FOCUS-06**: FocusScreen's manually-verified behavior/UI matches its pre-extraction characterization notes (left open — manual pass could not be exercised in the worktree-isolated executor environment; see `02-08-SUMMARY.md`)

### FriendsScreen

- [ ] **FRIENDS-01**: Pre-extraction characterization notes capture FriendsScreen's current leaderboard-segment-toggle, friend-request accept/block behavior
- [ ] **FRIENDS-02**: FriendsScreen's business logic is extracted into a `useFriendsScreenState` orchestration hook; the screen is reduced to calling the hook and rendering
- [ ] **FRIENDS-03**: FriendsScreen's UI is decomposed into named sub-components under `components/FriendsScreen/`
- [ ] **FRIENDS-04**: Every hook extracted from FriendsScreen has unit tests covering its state transitions
- [ ] **FRIENDS-05**: Every sub-component extracted from FriendsScreen has a render/snapshot test
- [ ] **FRIENDS-06**: FriendsScreen's manually-verified behavior/UI matches its pre-extraction characterization notes

### QuizScreen

- [ ] **QUIZ-01**: Pre-extraction characterization notes capture QuizScreen's current struggle-mode, energy-gate, and repeat-round behavior
- [ ] **QUIZ-02**: Scoring/streak math is extracted into pure functions in `utils/quizScoring.js`, removing the need for `useQuiz.test.js`'s existing logic-mirroring workaround
- [ ] **QUIZ-03**: QuizScreen's remaining business logic is extracted into a `useQuizState` orchestration hook (explicitly distinguished from the existing domain hook `useQuiz`); the screen is reduced to calling the hook and rendering
- [ ] **QUIZ-04**: QuizScreen's UI is decomposed into named sub-components under `components/QuizScreen/`
- [ ] **QUIZ-05**: Every hook and pure function extracted from QuizScreen has unit tests covering its state transitions
- [ ] **QUIZ-06**: Every sub-component extracted from QuizScreen has a render/snapshot test
- [ ] **QUIZ-07**: QuizScreen's manually-verified behavior/UI matches its pre-extraction characterization notes

### HomeScreen

- [ ] **HOME-01**: Pre-extraction characterization notes capture HomeScreen's current no-goal/goal-set, mission-card, and action-chip-priority behavior
- [ ] **HOME-02**: HomeScreen's business logic is extracted into a `useHomeAgenda` orchestration hook; the screen is reduced to calling the hook and rendering
- [ ] **HOME-03**: HomeScreen's UI is decomposed into named sub-components under `components/HomeScreen/`
- [ ] **HOME-04**: Every hook extracted from HomeScreen has unit tests covering its state transitions
- [ ] **HOME-05**: Every sub-component extracted from HomeScreen has a render/snapshot test
- [ ] **HOME-06**: HomeScreen's manually-verified behavior/UI matches its pre-extraction characterization notes
- [ ] **HOME-07**: The guest→real-account swap manual test (`useRP`/`useProgress` singleton isolation) is re-run and confirmed clean after HomeScreen's decomposition

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Screen Resilience

- **RESIL-01**: Error Boundaries wrapped around HomeScreen, QuizScreen, and FocusScreen
- **RESIL-02**: `useMemo`/`useCallback` audit on expensive derivations exposed by extraction (e.g. HomeScreen's agenda computation)

### Deeper Coverage

- **COVER-01**: Integration-style tests per screen for the flows CONCERNS.md itemizes (struggle mode, energy gate, friend-request accept/block, filter/search)
- **COVER-02**: Shared extraction pattern/checklist documented from the first completed screen, for use on future large-screen refactors

## Out of Scope

Explicitly excluded. Documented to prevent scope creep on a mature, shipping app.

| Feature | Reason |
|---------|--------|
| "While we're in there" feature/UX improvements (e.g. PetShopScreen app-icon TODO) | PROJECT.md scopes this out explicitly — mixing feature work into a structural refactor makes regressions impossible to attribute; log and defer |
| Bulk `sed`/codemod-driven renames across the 4 screens | A past `sed` rename already shipped a crashing TestFlight build (CLAUDE.md); per-file edits only |
| Full rewrite of any screen instead of incremental extraction | No behavior safety net on a shipping screen with near-zero coverage; blocks partial rollback |
| Chasing 100% test coverage or exhaustive suites before calling a screen "done" | PROJECT.md's actual bar is TEST-01/TEST-02 equivalents (hook + component tests), not a coverage number; deeper coverage is v2 |
| New state-management library (Redux, Zustand, Recoil, etc.) | The working Context + custom-hooks pattern stays; swapping paradigms mid-refactor is a large behavior-risk change disguised as cleanup |
| TypeScript migration | JS/JSX-only for this pass; a TS migration is its own separate initiative |
| Flattening extracted sub-components into the shared `components/` root | Loses screen-scoped grouping; only promote a component to shared root if a second screen actually reuses it |
| Deferring test-writing until all 4 screens are extracted | PROJECT.md's Key Decision: tests land at extraction time, per screen, per sub-unit — not batched at the end |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Complete |
| FOCUS-01 | Phase 2 | Complete |
| FOCUS-02 | Phase 2 | Complete |
| FOCUS-03 | Phase 2 | Complete |
| FOCUS-04 | Phase 2 | Complete |
| FOCUS-05 | Phase 2 | Complete |
| FOCUS-06 | Phase 2 | Pending (manual pass unrun) |
| FRIENDS-01 | Phase 3 | Pending |
| FRIENDS-02 | Phase 3 | Pending |
| FRIENDS-03 | Phase 3 | Pending |
| FRIENDS-04 | Phase 3 | Pending |
| FRIENDS-05 | Phase 3 | Pending |
| FRIENDS-06 | Phase 3 | Pending |
| QUIZ-01 | Phase 4 | Pending |
| QUIZ-02 | Phase 4 | Pending |
| QUIZ-03 | Phase 4 | Pending |
| QUIZ-04 | Phase 4 | Pending |
| QUIZ-05 | Phase 4 | Pending |
| QUIZ-06 | Phase 4 | Pending |
| QUIZ-07 | Phase 4 | Pending |
| HOME-01 | Phase 5 | Pending |
| HOME-02 | Phase 5 | Pending |
| HOME-03 | Phase 5 | Pending |
| HOME-04 | Phase 5 | Pending |
| HOME-05 | Phase 5 | Pending |
| HOME-06 | Phase 5 | Pending |
| HOME-07 | Phase 5 | Pending |

**Coverage:**

- v1 requirements: 27 total
- Mapped to phases: 27
- Unmapped: 0 ✓

---
*Requirements defined: 2026-09-14*
*Last updated: 2026-09-14 after roadmap creation*
