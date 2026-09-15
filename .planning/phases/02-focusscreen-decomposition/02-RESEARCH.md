# Phase 2: FocusScreen Decomposition - Research

**Researched:** 2026-09-14
**Domain:** React Native (Expo/RN 0.81, React 19) screen decomposition — extracting a 908-line
screen component into an orchestration hook + named sub-components, with zero behavior/UI change.
**Confidence:** HIGH (codebase-verified — no external library research needed; every claim below
is grounded in files read this session)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Sub-Component Test Depth (FOCUS-05)**

- **D-01:** The test-depth split is by **interactivity, not local state**: a sub-component that
  fires any callback prop (`onPress`, `onChange`, `onSubmit`, etc.) gets an interaction test
  (fireEvent + assert the callback was called with correct args) — even if it holds no local
  `useState`/`useReducer`. A component with zero callback props (pure display, e.g. a stat value
  or a static label) gets render/snapshot only.
- **D-02:** Rationale: most of FocusScreen's sub-components will be thin prop-forwarding wrappers
  around a callback (no local state of their own), and the main parity-break risk during
  extraction is "wrong prop wired to wrong handler" — which only an interaction test catches.
  Relying on the `useFocusScreenState` hook tests (FOCUS-04) alone to catch that class of bug was
  explicitly rejected as insufficient.

### Claude's Discretion

- **Sub-component boundaries** — how to split FocusScreen's ~900 lines into named components.
  Ground the split in the existing internal structure already visible in `FocusScreen.jsx`'s
  `makeStyles()` groupings and JSX comments rather than inventing a new taxonomy.
- **Characterization notes format (FOCUS-01)** — form and location of pre-extraction notes on
  filter/search/empty-category behavior. A markdown doc in the phase directory
  (`02-CHARACTERIZATION.md` or similar) is the natural default; depth should be "enough to verify
  FOCUS-06 parity against," not exhaustive prose.
- **Hook composition with `useFocusSession`** — whether `useFocusScreenState` wraps/composes the
  existing `useFocusSession` hook or absorbs its logic is left to the planner/executor to decide
  against actual code shape. Same collision-avoidance care as the Phase 4 `useQuizState`/`useQuiz`
  naming precedent applies (`useFocusScreenState` vs. `useFocusSession`) — names are already
  distinct enough that no disambiguation action is expected.

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope. No todos matched this phase.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FOCUS-01 | Pre-extraction characterization notes capture FocusScreen's current filter, search, and empty-category behavior | See **Pitfall 1 (Requirement-Text Mismatch)** below — the literal "filter/search/category" language does not match any code in `FocusScreen.jsx`; research maps it to the actual verifiable behaviors (chip-selection state, todo empty-list rendering) the notes must instead cover |
| FOCUS-02 | FocusScreen's business logic extracted into `useFocusScreenState`; screen reduced to calling the hook and rendering | See **Hook Composition Recommendation** and **Pattern 1** — `useFocusScreenState` wraps `useFocusSession` plus absorbs the screen's own local state/effects |
| FOCUS-03 | FocusScreen's UI decomposed into named sub-components under `components/FocusScreen/` | See **Recommended Project Structure** and **Sub-Component Boundary Proposal** — grounded in `makeStyles()` groupings and the file's own `// ── IDLE / ACTIVE / DONE ──` section comments |
| FOCUS-04 | Every extracted hook has unit tests covering state transitions | See **Validation Architecture** and **Pitfall 3 (Context Hooks Throw Without Providers)** |
| FOCUS-05 | Every extracted sub-component has a render/snapshot test | See **D-01/D-02** above (locked) plus **Code Examples** for the RNTL v14 render/fireEvent shape |
| FOCUS-06 | Manual verification confirms behavior/UI match pre-extraction characterization notes | See **02-UI-SPEC.md** (parity-lock contract, already approved) — characterization notes (FOCUS-01) plus UI-SPEC together form the parity baseline |

</phase_requirements>

## Summary

`FocusScreen.jsx` (908 lines, read in full this session) is a single default-exported function
component with three mutually-exclusive render branches gated on `phase` (`idle` → setup UI,
`focus`/`break`/`paused` → active UI, `done` → summary UI), plus one locally-defined sub-component
(`BigPet`, lines 40-113) already extracted in spirit but not in file structure. All timer/session
domain logic already lives in `useFocusSession` (`mobile/src/hooks/useFocusSession.js`, imported
and called once at line 137) — FocusScreen's own business logic is limited to: local UI-only state
(`buddyMessage`, `todoInput`, `customSubject`, `showCustomInput`, `background`, `goalCelebModal`),
three `useEffect`s (pet-reaction-on-phase-change, goal-celebration-trigger, back-gesture-guard),
and four small handler functions (`handleSubjectChip`, `handleCustomSubject`, `handleAddTodo`,
plus the inline stop-confirmation `Alert.alert` callback repeated at two call sites).

**No filter or search feature exists anywhere in `FocusScreen.jsx` or `useFocusSession.js`** — see
Pitfall 1. FOCUS-01's requirement text was traced to a pre-existing inaccuracy in
`.planning/codebase/CONCERNS.md` ("FocusScreen: No test for filter state, search, or error
fallbacks when category is empty"), which was carried into `REQUIREMENTS.md` verbatim without
re-verification against the actual file. The planner must not invent filter/search behavior to
satisfy this requirement — the characterization notes should instead cover the actual selection/
toggle state machines present in the code (subject chips, preset chips, sound chips, background
swatches, goal chips — all mutually-exclusive "filter"-shaped selections — plus the todos list's
empty-state rendering, which is the actual "empty-category" analog).

**Primary recommendation:** `useFocusScreenState(uid, navigation)` should **wrap** (not absorb)
the existing `useFocusSession` hook — call it internally, merge its return value with the screen's
own local state/handlers/effects, and return one flat object. This is the lower-risk option: it
keeps `useFocusSession`'s already-correct, already-isolated 388-line implementation completely
untouched (zero regression surface on the highest-complexity logic in the file — AppState
handling, notification scheduling, RP math), while still satisfying FOCUS-02's "single hook call
site" requirement. `useFocusSession` has exactly one other reference in the codebase
(`FocusHistoryScreen.jsx`, an unused/dead import — not a live call site), so there is no
cross-screen coupling risk either way, but wrapping is still preferred for blast-radius reasons.

## Architectural Responsibility Map

This is a mobile RN monolith, not a multi-tier web app — "tiers" below map to this project's own
documented layers (`.claude/CLAUDE.md` "Layers" section: Screens → Hooks → Contexts → Components →
Persistence), not browser/server/CDN tiers.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Screen rendering & phase routing (idle/active/done) | Screen (`FocusScreen.jsx`) | Component | Screen stays thin: renders `<FocusSetupScreen>`/`<FocusActiveScreen>`/`<FocusDoneScreen>` based on `phase` from the hook |
| Timer/session state machine (phase transitions, tick, RP award) | Hooks (`useFocusSession`, wrapped) | — | Already correctly isolated; untouched this phase |
| Pet reactions / buddy messages on phase transitions | Hooks (`useFocusScreenState`) | Context (`PetContext`) | Orchestration logic (the `useEffect` watching `phase`) belongs in the new hook; `triggerReaction`/`say` are context-provided actions |
| Session-goal celebration modal trigger | Hooks (`useFocusScreenState`) | Component (`GoalCelebrationModal`) | Trigger condition (`pomodoroCount === sessionGoal`) is business logic; the modal itself is presentation |
| Back-gesture guard (confirm before leaving mid-session) | Hooks (`useFocusScreenState`) | — | `navigation.addListener('beforeRemove', ...)` needs `stop()` and `phase` from the hook; cannot live in a presentational component |
| Subject/preset/sound/background/goal chip selection UI | Component (named pickers) | Hooks (setters from `useFocusSession`) | Rendering + interaction wiring is presentational; the actual state lives in the wrapped hook |
| Todo list management (add/toggle/render) | Hooks (`useFocusSession`, wrapped) | Component (`TaskInput`/`TaskList`) | State/mutation logic already in `useFocusSession`; only the list/row rendering is presentational |
| Session history persistence | Hooks (`useFocusSession`, wrapped) | Persistence (AsyncStorage) | Untouched this phase — `saveSession`/`AsyncStorage` calls stay inside `useFocusSession` |
| RP (currency) earning | Hooks (`useRP` context hook) | Persistence (Firestore, via `useRP`) | `useRP(uid)` is called once in `FocusScreen.jsx` today (line 119) and passed into `useFocusSession`; this call site moves into `useFocusScreenState` |
| Theme/color tokens | Context (`ThemeContext`) | Component (consumption via `useTheme()`) | Every extracted sub-component will call `useTheme()` itself, matching the existing `ActionChipRow.jsx` pattern (see Pattern 2) |

## Standard Stack

No new external packages are required for this phase — it is a pure structural refactor of
existing code using the test stack Phase 1 already installed and verified.

**Already installed (verified in `mobile/package.json`, read this session):**

| Library | Version | Purpose | Provenance |
|---------|---------|---------|------------|
| `@testing-library/react-native` | `^14.0.1` | `render`/`renderHook`/`fireEvent` for the new hook + component tests | `[VERIFIED: mobile/package.json:65]` — `"@testing-library/react-native": "^14.0.1"` |
| `jest` | `^29.7.0` | Test runner | `[VERIFIED: mobile/package.json:68]` |
| `jest-expo` | `~54.0.18` | Expo-aware Jest preset | `[VERIFIED: mobile/package.json:69]` |
| `test-renderer` | `^1.2.0` | RNTL v14's modern replacement for the deprecated `react-test-renderer`; confirmed on the npm registry as `"A lightweight test renderer for React and a modern replacement for the deprecated React Test Renderer"` | `[VERIFIED: npm registry via npm view]` |

**Explicitly absent (confirmed removed by Phase 1, do not reintroduce):** `@testing-library/jest-native`, `react-test-renderer`. No `setupFilesAfterEnv` key exists in `mobile/package.json`'s `jest` block `[VERIFIED: mobile/package.json:73-83]` — RNTL v14's matchers (e.g. `toBeOnTheScreen`) attach automatically on import, no jest.setup file needed.

### Alternatives Considered

Not applicable — no library selection is being made this phase (structural refactor of first-party
code only, per CONTEXT.md and PROJECT.md "no new state-management library" constraint).

## Package Legitimacy Audit

**Not applicable — no new external packages are installed by this phase.** All test tooling was
already vetted and installed in Phase 1 (`01-RESEARCH.md`, `01-VERIFICATION.md`).

## Architecture Patterns

### System Architecture Diagram

```
FocusScreen.jsx (thin — renders only)
        │
        │ calls (single hook, satisfies FOCUS-02)
        ▼
useFocusScreenState(uid, navigation)         ← NEW orchestration hook
        │
        ├── calls useAuthContext()            (existing context, moved from screen)
        ├── calls useRP(uid)                  (existing hook, moved from screen)
        ├── calls usePetContext()             (existing context, moved from screen)
        ├── WRAPS useFocusSession(uid, earnRP, onPomodoroComplete)   ← untouched, absorbed by reference
        ├── owns local state: buddyMessage, todoInput, customSubject,
        │                     showCustomInput, background, goalCelebModal
        ├── owns effects: pet-reaction-on-phase-change,
        │                 goal-celebration-trigger,
        │                 back-gesture-guard (navigation.addListener)
        └── owns handlers: handleSubjectChip, handleCustomSubject, handleAddTodo,
                            handleStopConfirm (dedupes the 2 inline Alert.alert call sites)
        │
        ▼ returns one flat object
FocusScreen.jsx switches on `phase` and renders:
        │
        ├── phase === 'idle'  → <FocusSetupScreen {...props} />
        │                            ├── <SubjectPicker />        (chips + custom input — interactive)
        │                            ├── <DurationPicker />       (preset chips — interactive)
        │                            ├── <GoalPicker />           (goal chips — interactive)
        │                            ├── <TaskInput /> + <TaskList />  (add/toggle — interactive)
        │                            ├── <SoundPicker />          (sound chips — interactive)
        │                            ├── <BackgroundPicker />     (bg swatches — interactive)
        │                            └── Start button + history link
        │
        ├── phase in {focus,break,paused} → <FocusActiveScreen {...props} />
        │                            ├── <ActiveSessionHeader />  (stop/subject/count — interactive)
        │                            ├── <BigPetDisplay />        (moved verbatim from lines 40-113 — interactive: onPress)
        │                            ├── <PomodoroCycleDots />    (pure display — NO callback prop → render/snapshot only)
        │                            ├── RiveDemo, FocusTimerRing (reused as-is, no change)
        │                            ├── <TimerControls />        (pause/resume/skip — interactive)
        │                            └── <ActiveTaskList />       (toggle — interactive)
        │
        └── phase === 'done'  → <FocusDoneScreen {...props} />
                                     ├── <SessionSummaryStats />  (pure display — NO callback prop → render/snapshot only)
                                     ├── <DoneActions />          (New Session / View History — interactive)
                                     └── <GoalCelebrationModal /> (interactive: onDismiss)
```

### Recommended Project Structure

```
mobile/src/
├── hooks/
│   ├── useFocusSession.js              # UNCHANGED — timer/session domain hook
│   └── useFocusScreenState.js          # NEW — orchestration hook (FOCUS-02)
├── components/FocusScreen/             # NEW directory (FOCUS-03)
│   ├── FocusSetupScreen.jsx            # idle-phase container
│   ├── FocusActiveScreen.jsx           # focus/break/paused-phase container
│   ├── FocusDoneScreen.jsx             # done-phase container
│   ├── SubjectPicker.jsx
│   ├── DurationPicker.jsx
│   ├── GoalPicker.jsx
│   ├── TaskInput.jsx
│   ├── TaskList.jsx                    # shared by setup + active views (different row styles — see UI-SPEC)
│   ├── SoundPicker.jsx
│   ├── BackgroundPicker.jsx
│   ├── ActiveSessionHeader.jsx
│   ├── BigPetDisplay.jsx               # moved verbatim from FocusScreen.jsx lines 40-113
│   ├── PomodoroCycleDots.jsx
│   ├── TimerControls.jsx
│   ├── SessionSummaryStats.jsx
│   ├── DoneActions.jsx
│   └── GoalCelebrationModal.jsx
├── __tests__/
│   └── useFocusScreenState.test.js     # NEW (FOCUS-04) — flat top-level dir, matches useQuiz.test.js placement
└── components/FocusScreen/__tests__/   # NEW (FOCUS-05) — colocated per project convention
    ├── SubjectPicker.test.jsx
    ├── PomodoroCycleDots.test.jsx      # render/snapshot only (D-01: no callback prop)
    └── ... (one test file per sub-component)
```

**This exact component list is a starting proposal, not a mandate** — CONTEXT.md leaves boundary
granularity to the planner/executor. The container-per-phase (`FocusSetupScreen`/
`FocusActiveScreen`/`FocusDoneScreen`) split is the strongest-grounded part of this proposal: it
directly mirrors the file's own `// ── IDLE setup screen ──`, `// ── ACTIVE screen ──`, `// ── DONE
screen ──` section comments (`FocusScreen.jsx` lines 493, 337, 227) `[VERIFIED: mobile/src/screens/FocusScreen.jsx:227,337,493]`. The finer-grained widget split (`SubjectPicker`, `DurationPicker`, etc.) follows the `makeStyles()` groupings (chips/presetRow/goalChips/todoInputRow/bgRow are each a distinct style block, `FocusScreen.jsx` lines 702-849) but the planner may choose coarser boundaries (e.g. one `FocusSetupScreen` with no further split) if it judges the finer split adds test overhead without matching risk reduction — the D-01/D-02 test-depth rule applies at whatever granularity is chosen.

### Pattern 1: Wrap, Don't Absorb, the Existing Domain Hook

**What:** `useFocusScreenState` calls `useFocusSession()` internally and spreads its return value
into its own return object, rather than copy-pasting `useFocusSession`'s 388 lines into the new
hook.

**When to use:** Whenever an existing, already-isolated domain hook exists and the "single
orchestration hook" requirement (FOCUS-02) would otherwise force the screen to call two hooks.

**Why this is the right call here (not just easier):** `useFocusSession` already does the hardest,
highest-regression-risk part of this screen correctly — `AppState` background/foreground
recovery (lines 121-173), notification scheduling, and RP-earning math. Re-deriving that logic
inside a new hook (the "absorb" alternative) multiplies the surface area FOCUS-06's manual
parity check has to cover, for zero requirement benefit — FOCUS-02 only requires FocusScreen.jsx
to call *one* hook, not that all logic live in *one function body*.

```javascript
// Source: pattern synthesized from useFocusSession.js (read in full this session)
// and FocusScreen.jsx lines 115-224 (read in full this session)
export function useFocusScreenState(uid, navigation) {
  const { earnRP } = useRP(uid)
  const { triggerReaction, studyBoost, say, pet } = usePetContext()

  const [buddyMessage, setBuddyMessage] = useState(null)
  // ...other screen-local state moved verbatim from FocusScreen.jsx lines 123-128

  const handlePomodoroComplete = useCallback((count) => {
    triggerReaction('happy_dance')
    studyBoost?.()
    setBuddyMessage(`Amazing! ${count} pomodoro${count > 1 ? 's' : ''} done! 🍅`)
    setTimeout(() => setBuddyMessage(null), 3500)
  }, [triggerReaction, studyBoost])

  const session = useFocusSession(uid, earnRP, handlePomodoroComplete)  // WRAP, not absorb

  // ...the three useEffects (pet-reaction, goal-celebration, back-gesture-guard)
  // move here verbatim from FocusScreen.jsx lines 144-203, referencing `session.phase` etc.

  return {
    ...session,
    buddyMessage, /* ...other local state + handlers */
  }
}
```

### Pattern 2: Sub-Components Call `useTheme()` Directly (Don't Prop-Drill `C`)

**What:** Each new named sub-component imports and calls `useTheme()` itself for the `C` color
token object, rather than receiving `C` as a prop from the container.

**When to use:** For every new sub-component under `components/FocusScreen/`.

**Source (already-established codebase pattern, not invented for this phase):**
```javascript
// Source: mobile/src/components/ActionChipRow.jsx (read in full this session)
import { useTheme } from '../context/ThemeContext'

export default function ActionChipRow({ chips = [], streak = null, onPress, onFreeze }) {
  const { C } = useTheme()
  const s = makeStyles(C)
  if (!chips.length && !streak) return null
  // ...
}

const makeStyles = (C) => StyleSheet.create({ /* ... */ })
```
This is the exact shape to replicate for `SubjectPicker`, `DurationPicker`, etc. — each file keeps
its own local `makeStyles(C)` factory (matching FocusScreen's own `makeStyles(C)` convention,
`FocusScreen.jsx` line 223 and 695), pulling only the style keys it needs rather than importing
FocusScreen's full 900-line `makeStyles` output.

### Anti-Patterns to Avoid

- **Pulling in `duoBtn`/`cardShadow`/`elevatedCard`/`pillTab` from `styles/duo.js` "for
  consistency" during extraction:** FocusScreen does NOT currently use these factories (per
  UI-SPEC's Component Inventory) — introducing them would be a visual change and is explicitly
  out of scope this phase.
- **Renaming AsyncStorage/Firestore keys or paths during extraction:** none of `useFocusSession`'s
  `historyKey(uid)` (`@focusHistory_v1_${uid}`) or Firestore paths change — this is a structure-
  only refactor (see Runtime State Inventory below).
- **Conflating `duo.js`'s `sectionLabel(C)` factory with FocusScreen's local `s.sectionLabel` style
  key:** these are two different, similarly-named things (UI-SPEC already flags this explicitly)
  — keep the local flat style as-is, do not import the factory.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Rendering RN component trees in tests | A custom shallow-render harness | `@testing-library/react-native`'s `render()`/`fireEvent()` (already installed, v14.0.1) | Already vetted by Phase 1; matches the `rntlSmoke.test.js` proof-of-life pattern |
| Testing a hook's state transitions | Manually instantiating the hook inside a throwaway component | `renderHook()` from the same RNTL package | Purpose-built for this exact case; already proven working under this project's Jest/Expo/React 19 combination (`rntlSmoke.test.js`) |
| Mocking `AuthContext`/`PetContext` for hook tests | A shared custom "TestProviders" wrapper component | Per-file `jest.mock('../../context/AuthContext', () => ({ useAuthContext: () => ({...}) }))` | Matches this repo's documented convention: "No shared setup/fixture file beyond jest config" and "each test is independent and isolated" (Phase 1 `01-PATTERNS.md`, `TESTING.md`) |

**Key insight:** This phase's testing needs (hook state-transition tests, component render/
interaction tests) are already fully served by the RNTL v14 stack Phase 1 installed and proved
functional — there is no gap to fill with a new library or hand-rolled harness.

## Runtime State Inventory

> Included because this phase is a structural refactor of a shipping screen (trigger condition per
> the research playbook), even though it is not a rename/rebrand.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | AsyncStorage key `@focusHistory_v1_${uid ?? 'anon'}` (`historyKey()`, `useFocusSession.js:41`) — session history array. Not touched: `useFocusSession` itself is unchanged, key format stays identical. | None — verified: extraction wraps the hook, doesn't rename the key or its owning module |
| Live service config | None — FocusScreen has no n8n/Datadog/Tailscale-style external service config | None |
| OS-registered state | `expo-notifications` scheduled notifications for phase-completion while backgrounded (`useFocusSession.js:127-134`) — scheduled/cancelled by `useFocusSession` internally, no screen-level or OS-registration change | None — `useFocusSession` untouched |
| Secrets/env vars | None — no secrets referenced by this screen or its hook | None |
| Build artifacts | None — pure JS/JSX source move, no native module or package changes | None |

**Canonical question answered:** After every file in this phase is updated, nothing outside the
moved/renamed files retains old state — `useFocusSession`'s AsyncStorage key, Firestore paths (via
`useRP`), and notification scheduling are all inside a module this phase does not modify.

## Common Pitfalls

### Pitfall 1: Requirement-Text Mismatch — "Filter, Search, Empty-Category" Does Not Exist in Code

**What goes wrong:** A planner or executor reads FOCUS-01's literal text ("capture FocusScreen's
current filter, search, and empty-category behavior") and either (a) searches the file for
filter/search UI that isn't there and stalls, or (b) invents new filter/search behavior to satisfy
the requirement text — which would violate the "no behavior changes" constraint (PROJECT.md,
CONTEXT.md, UI-SPEC).

**Why it happens:** `grep -niE "search|filter|category" screens/FocusScreen.jsx hooks/useFocusSession.js` (run this session) returns exactly one hit: `todos.filter((t) => t.done).length` — a derived count computation on the Done screen, not a filter *feature*. `.planning/codebase/CONCERNS.md` (line 240, read this session) already contains the identical phrase — "FocusScreen: No test for filter state, search, or error fallbacks when category is empty" — which was carried into `REQUIREMENTS.md`'s FOCUS-01 verbatim without being re-checked against the actual 908-line file. `[VERIFIED: mobile/src/screens/FocusScreen.jsx (full-file grep, this session); .planning/codebase/CONCERNS.md:240]`

**How to avoid:** FOCUS-01's characterization notes should document the *actual* state machines
present in the code instead:
- Mutually-exclusive chip/swatch selection ("filter"-shaped): subject chips, preset chips, sound
  chips, background swatches, session-goal chips — each is a single-select toggle over a fixed
  option set, the closest real analog to "filter" behavior in this screen.
- Todos list empty-state ("empty-category" analog): per UI-SPEC's UI Considerations table, zero
  todos renders zero rows with no placeholder copy — this is the screen's only real "empty
  collection" behavior.
- There is genuinely no search input, search behavior, or category concept anywhere in
  `FocusScreen.jsx` or `useFocusSession.js` — the characterization notes should state this
  explicitly (as UI-SPEC already does for the "Empty state: Not applicable" row) rather than
  leaving a gap that looks unaddressed.

**Warning signs:** Any PLAN.md task description that says "extract search logic" or "extract
filter logic" for FocusScreen is working from the stale requirement text, not the actual file.

### Pitfall 2: `useFocusScreenState` Composing a Hook Breaks the Documented "No Hook-to-Hook Calls" Convention — By Design, Unavoidably

**What goes wrong:** `.claude/CLAUDE.md`'s "Layers" section states hooks are "Used by: Screens
exclusively (never hook-to-hook calls)" as an existing architectural rule. FOCUS-02 requires
FocusScreen.jsx to call a *single* `useFocusScreenState` hook. These two constraints are mutually
exclusive if `useFocusSession`'s logic must remain reachable: either `useFocusScreenState` calls
`useFocusSession` internally (a hook-to-hook call, violating the documented rule), or FocusScreen
calls both hooks directly (satisfying the rule but violating FOCUS-02's single-hook mandate).

**Why it happens:** The documented "never hook-to-hook calls" rule predates this refactor
initiative and was written to describe the codebase *before* this decomposition pattern existed.
STATE.md already flags the identical tension for Phase 4 (`useQuizState` wrapping `useQuiz`) as a
"naming collision risk," but the deeper issue — hook-to-hook composition itself — applies here
first, one phase earlier.

**How to avoid:** Accept the hook-to-hook call as an intentional, scoped exception this phase
establishes as precedent (not a violation to silently work around). `useFocusScreenState` calling
`useFocusSession` is the correct design (see Pattern 1) — the planner should note in `02-SUMMARY.md`
/ `02-LEARNINGS.md` that "orchestration hooks may compose one existing domain hook" is now the
established exception to the "no hook-to-hook calls" rule, so Phases 3-5 apply it consistently
instead of re-litigating it per screen.

**Warning signs:** A plan that tries to inline all of `useFocusSession`'s 388 lines into
`useFocusScreenState` to "avoid" the hook-to-hook call — this multiplies regression surface for no
requirement benefit (see Summary's Primary Recommendation).

### Pitfall 3: Context Hooks Throw Without Providers — Hook/Component Tests Need Mocks, Not Bare `renderHook`

**What goes wrong:** `useAuthContext()` and `usePetContext()` both throw (`throw new Error(...)`)
when called outside their respective `<AuthProvider>`/`<PetProvider>` — confirmed by reading both
context files this session (`AuthContext.js:47-51`, `PetContext.js:26-30`). A bare
`renderHook(() => useFocusScreenState(uid, navigation))` with no mocking will throw immediately,
not silently return `undefined`.

**Why it happens:** These are intentional fail-fast guards (good practice), but they mean any test
that touches `useFocusScreenState` (which calls both contexts internally per Pattern 1) needs
those two context modules mocked. `useTheme()` (`ThemeContext.js`, read this session) does *not*
throw — it returns `useContext(ThemeContext)`, which is `null` outside a provider — so a
sub-component under test that calls `useTheme()` and then destructures `{ C }` will throw a
different error (`Cannot destructure property 'C' of 'null'`) unless `ThemeContext` is also mocked
or wrapped.

**How to avoid:** Per-test-file `jest.mock()` calls (matching this repo's "no shared fixture" test
convention, confirmed in `01-PATTERNS.md`):
```javascript
// Source: pattern synthesized from AuthContext.js:47-51, PetContext.js:26-30 (read this session)
// and this repo's existing jest.fn()-based mocking convention (TESTING.md "Mocking" section)
jest.mock('../../context/AuthContext', () => ({
  useAuthContext: () => ({ user: { uid: 'test-uid' } }),
}))
jest.mock('../../context/PetContext', () => ({
  usePetContext: () => ({
    triggerReaction: jest.fn(), studyBoost: jest.fn(), say: jest.fn(),
    pet: { chosen: false },
  }),
}))
jest.mock('../../context/ThemeContext', () => ({
  useTheme: () => ({ C: { bg: '#fff', text: '#000', brand: '#1FC36B' /* ...minimal fixture */ } }),
}))
```

**Warning signs:** A hook or component test failing with `useAuthContext must be used inside
<AuthProvider>` or `usePetContext must be used inside <PetProvider>` — this is the throw guard
firing, not a real bug in the extracted code.

### Pitfall 4: Timer-Driven `setTimeout`/`setInterval` Effects Need Fake Timers or Explicit `await`

**What goes wrong:** `handlePomodoroComplete` and the phase-transition `useEffect`s (all moved
into `useFocusScreenState` per Pattern 1) call `setTimeout(() => setBuddyMessage(null), 3500)` and
similar. A `renderHook` test that asserts `buddyMessage` clears without either advancing Jest's
fake timers or awaiting real time will flake or hang.

**Why it happens:** These are real `setTimeout` calls copied verbatim from `FocusScreen.jsx` (lines
134, 155, 160, 164, 169, 182) — extraction must preserve them exactly (no behavior change), so the
test surface for `useFocusScreenState` inherits this timer dependency.

**How to avoid:** Use `jest.useFakeTimers()` + `act(() => jest.advanceTimersByTime(3500))` around
any assertion on `buddyMessage` clearing, or scope those specific assertions out of FOCUS-04's
required coverage (state *transitions* — the message being set — are the required coverage; the
delayed-clear timeout is lower-value to test and can be noted as a deliberate gap).

**Warning signs:** A hook test that passes locally but times out or flakes in CI — almost always a
missed fake-timer setup around one of these `setTimeout` calls.

### Pitfall 5: `navigation.addListener('beforeRemove', ...)` Guard Has No Existing Mock Pattern in This Repo

**What goes wrong:** The back-gesture guard (`FocusScreen.jsx` lines 186-203) calls
`navigation.addListener('beforeRemove', (e) => {...})` and `navigation.dispatch(e.data.action)`.
No existing test in this repo mocks a React Navigation `navigation` prop (confirmed: zero screen-
level tests exist anywhere in the codebase per `01-PATTERNS.md`'s "No Analog Found" section) — this
phase is the first to need one.

**Why it happens:** This is genuinely new test-authoring ground for the project, not a gap in
existing conventions to follow.

**How to avoid:** Pass a minimal mock `navigation` object into `useFocusScreenState`/`renderHook`
tests: `{ addListener: jest.fn(() => jest.fn()), dispatch: jest.fn(), goBack: jest.fn(), navigate: jest.fn() }` — capture the callback passed to `addListener` and invoke it manually in the test to
simulate the back-gesture event, then assert `stop()` was called and/or `Alert.alert` fired with
the expected title/buttons.

**Warning signs:** Skipping test coverage for the back-gesture guard entirely because "there's no
pattern for it" — FOCUS-04 requires state-transition coverage for every extracted hook, and this
guard is part of `useFocusScreenState`'s behavior.

## Code Examples

### RNTL v14 `renderHook` for the New Orchestration Hook (awaited — v14 requirement)
```javascript
// Source: mobile/src/__tests__/rntlSmoke.test.js (read in full this session) —
// the proven-working shape for this exact RNTL v14 / jest-expo 54 / React 19 combination
import { renderHook, act } from '@testing-library/react-native'
import { useFocusScreenState } from '../useFocusScreenState'

test('start() transitions phase from idle to focus', async () => {
  const navigation = { addListener: jest.fn(() => jest.fn()), dispatch: jest.fn(), goBack: jest.fn() }
  const { result } = await renderHook(() => useFocusScreenState('test-uid', navigation))

  await act(async () => {
    result.current.start()
  })

  expect(result.current.phase).toBe('focus')
})
```

### RNTL v14 `render`/`fireEvent` for an Interactive Sub-Component (D-01 interaction test)
```javascript
// Source: pattern synthesized from rntlSmoke.test.js's render() shape (read this session)
// plus RNTL's documented fireEvent API (v14, same package already installed)
import { render, screen, fireEvent } from '@testing-library/react-native'
import DurationPicker from '../DurationPicker'

test('tapping a preset calls onSelectPreset with the chosen preset', async () => {
  const onSelectPreset = jest.fn()
  const presets = [{ id: 'short', study: 15, break: 5, label: '15 min' }]
  await render(<DurationPicker presets={presets} selectedId="short" onSelectPreset={onSelectPreset} />)

  fireEvent.press(screen.getByText('15 min'))

  expect(onSelectPreset).toHaveBeenCalledWith(presets[0])
})
```

### Render/Snapshot-Only Test for a Pure-Display Sub-Component (D-01: no callback prop)
```javascript
// PomodoroCycleDots has zero callback props — pure display per D-01, render/snapshot only
import { render, screen } from '@testing-library/react-native'
import PomodoroCycleDots from '../PomodoroCycleDots'

test('renders 4 dots with cyclePosition dots filled', async () => {
  await render(<PomodoroCycleDots cyclePosition={2} accentColor="#1FC36B" />)
  expect(screen.toJSON()).toMatchSnapshot()
})
```

## State of the Art

Not applicable in the traditional sense (no external framework/library version drift to track) —
the one relevant "old → new" shift is internal to this project:

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|---------------|--------|
| `react-test-renderer` + `@testing-library/jest-native` | `@testing-library/react-native@14.0.1`'s bundled `test-renderer` + built-in matchers | Phase 1 (this milestone) | All new tests in this phase must use the awaited `render`/`renderHook` shape and built-in matchers (e.g. `toBeOnTheScreen`), never `jest-native`'s `toHaveTextContent` etc. |
| Business logic + UI mixed in one 908-line screen file | Hook + named sub-components | This phase | Establishes the extraction template Phases 3-5 copy |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The sub-component boundary list in "Recommended Project Structure" (16 named files) is the right granularity — CONTEXT.md explicitly leaves this to discretion, so this is a proposal, not a verified requirement | Architecture Patterns | Low — reversible; the planner can coarsen or split further without violating any requirement, since FOCUS-03 only requires "named sub-components," not a specific count |
| A2 | "Wrap, don't absorb" (Pattern 1) is the lower-risk hook-composition choice | Summary, Pattern 1 | Low-Medium — if the executor finds `useFocusSession`'s API awkward to wrap cleanly (e.g. the `sound`/`subject` dependencies in its `useCallback` arrays), absorbing might reduce indirection; this is a judgment call given the same information, not a verified fact |
| A3 | A minimal `jest.mock()`-per-file convention (Pitfall 3's code example) is preferable to a shared test-providers wrapper | Don't Hand-Roll, Pitfall 3 | Low — reversible; both approaches produce working tests, this recommendation is about matching existing repo convention (verified) rather than a hard technical requirement |

## Open Questions

1. **Should `TaskInput`/`TaskList` be one component or two, given they render differently in
   setup vs. active-session views (checkbox-with-delete-X in setup vs. checkbox-with-strikethrough
   in active)?**
   - What we know: `FocusScreen.jsx` has two visually distinct todo-row renderings (lines 619-627
     for setup, lines 463-487 for active) sharing the same `todoRow`/`todoCheck`/`todoText` style
     keys but different interaction affordances (setup allows delete via `toggleTodo`-as-remove;
     no wait — re-checking: setup's `✕` next to each todo actually calls `toggleTodo(t.id)` too,
     line 623, not a delete — both views only ever toggle `done`, there is no delete-todo capability
     anywhere in this screen).
   - What's unclear: whether one shared `TaskRow` component with a `variant` prop, or two separate
     named components (`SetupTaskRow`/`ActiveTaskRow`), better serves the D-01 test-depth rule and
     future-phase copyability.
   - Recommendation: Two thin variant components is simpler to reason about under D-01 (each has
     a single, obvious callback prop) — but this is a planner-level call within the "Claude's
     discretion" boundary conditions.

2. **Does `handleStopConfirm` (deduping the two identical inline `Alert.alert('End Session?', ...)`
   call sites at lines 190-201 and 358-368) count as a behavior change if the button copy/order is
   preserved exactly?**
   - What we know: Both call sites use byte-identical title, message, and button configuration.
   - What's unclear: whether deduping two identical inline callbacks into one shared function
     inside `useFocusScreenState` is "structure-only" (safe) or introduces risk if a future subtle
     difference between the two call sites was missed in this read.
   - Recommendation: Treat as safe to dedupe (both are read in full this session and are
     byte-identical), but the plan's verification step should diff the two original call sites
     against the deduped version to confirm no divergence was missed.

## Environment Availability

Skipped — this phase has no external tool/service/runtime dependencies beyond the already-
installed npm packages in `mobile/node_modules` (verified via `package.json`, Phase 1 already
confirmed `cd mobile && npx jest` passes).

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Jest `^29.7.0` with `jest-expo ~54.0.18` preset `[VERIFIED: mobile/package.json:68-69,73-74]` |
| Config file | `mobile/package.json`'s `"jest"` key — no separate `jest.config.js` `[VERIFIED: mobile/package.json:73-83]` |
| Quick run command | `cd mobile && npx jest src/hooks/useFocusScreenState.test.js` (or the relevant sub-component test file, once created) |
| Full suite command | `cd mobile && npx jest` (or `npm run check` for jest + parse-check) |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOCUS-01 | Characterization notes document current behavior | docs (no automated test) | N/A | ❌ Wave 0 — new `02-CHARACTERIZATION.md` |
| FOCUS-02 | `useFocusScreenState` state transitions (phase changes, chip selection, todo add/toggle, back-gesture guard, goal celebration trigger) | unit | `cd mobile && npx jest src/__tests__/useFocusScreenState.test.js` | ❌ Wave 0 |
| FOCUS-03 | Sub-components render under `components/FocusScreen/` | render/snapshot | `cd mobile && npx jest src/components/FocusScreen` | ❌ Wave 0 |
| FOCUS-04 | Every extracted hook's state transitions covered | unit | same as FOCUS-02 | ❌ Wave 0 |
| FOCUS-05 | Every extracted sub-component has render (pure) or render+interaction (has callback prop, per D-01) test | render/snapshot + interaction | `cd mobile && npx jest src/components/FocusScreen` | ❌ Wave 0 |
| FOCUS-06 | Manual behavior/UI parity vs. characterization notes | manual-only | N/A — manual QA pass against `02-CHARACTERIZATION.md` + `02-UI-SPEC.md` | manual-only, justified: this is exactly what characterization-based refactor testing is for — an automated snapshot would only prove the *new* code matches itself, not that it matches the pre-extraction *behavior*, which is what the manual pass verifies |

### Sampling Rate
- **Per task commit:** `cd mobile && npx jest <touched-test-file>` (quick, scoped)
- **Per wave merge:** `cd mobile && npx jest` (full suite)
- **Phase gate:** Full suite green, plus the FOCUS-06 manual UAT pass, before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] `mobile/src/__tests__/useFocusScreenState.test.js` — covers FOCUS-02/FOCUS-04
- [ ] `mobile/src/components/FocusScreen/__tests__/*.test.jsx` (one per sub-component) — covers FOCUS-03/FOCUS-05
- [ ] `.planning/phases/02-focusscreen-decomposition/02-CHARACTERIZATION.md` — covers FOCUS-01 (pre-extraction notes, must exist and be committed *before* any extraction code moves)
- [ ] Per-file `jest.mock()` fixtures for `AuthContext`/`PetContext`/`ThemeContext` (Pitfall 3) — no shared test-utils file needed per this repo's convention, but each new test file needs these three mocks declared
- Framework install: none — RNTL v14.0.1 already installed and proven working (Phase 1)

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | This phase does not touch sign-in/session logic; `uid` is read from the already-authenticated `useAuthContext()`, unchanged |
| V3 Session Management | No | No session/token handling in this screen |
| V4 Access Control | No | No permission-gated actions; FocusScreen is available to any signed-in (or guest) user identically before and after this refactor |
| V5 Input Validation | Marginal — no new input surface | Existing `TextInput`s (custom subject, todo text) already `.trim()` before use (`handleCustomSubject`, `useFocusSession.js:70-74`'s `addTodo`) — extraction must preserve this trim-before-use pattern verbatim, not "improve" it (behavior-change constraint) |
| V6 Cryptography | No | No crypto operations in this screen |

### Known Threat Patterns for This Stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| None newly introduced | — | This phase introduces zero new attack surface — it is a structural refactor of already-shipped, already-reviewed client-side UI logic with no new network calls, no new stored-data shape, and no new user-input validation paths. The only "security-adjacent" item is preserving the existing `.trim()` input handling verbatim (see V5 above) |

**Overall assessment:** `security_enforcement` is on (`config.json`), but this phase's actual
threat-relevant surface is effectively nil — it is client-side-only UI restructuring of an
already-reviewed screen. No mitigations need to be *added*; the only requirement is not to
*regress* the existing (correct) input-trimming behavior during extraction.

## Sources

### Primary (HIGH confidence — files read in full this session)
- `mobile/src/screens/FocusScreen.jsx` (908 lines, read in full)
- `mobile/src/hooks/useFocusSession.js` (388 lines, read in full)
- `mobile/src/components/ActionChipRow.jsx` (48 lines, read in full — sub-component style analog)
- `mobile/src/context/ThemeContext.js` (lines 1-60+, read — confirms `useTheme()` non-throwing shape)
- `mobile/src/context/PetContext.js` (lines 26-30, read — confirms throw-without-provider guard)
- `mobile/src/context/AuthContext.js` (lines 47-51, read — confirms throw-without-provider guard)
- `mobile/src/hooks/useRP.js` (lines 64-69, read — confirms `useRP(uid)` signature)
- `mobile/src/screens/FocusHistoryScreen.jsx` (lines 1-20, read — confirms `useFocusSession` import is unused/dead there, not a live second call site)
- `mobile/src/__tests__/rntlSmoke.test.js` (71 lines, read in full — proven RNTL v14 shape)
- `mobile/src/__tests__/useQuiz.test.js` (first 100 lines read — existing test-file style analog)
- `mobile/package.json` (91 lines, read in full)
- `.planning/phases/02-focusscreen-decomposition/02-CONTEXT.md`, `02-UI-SPEC.md` (read in full)
- `.planning/REQUIREMENTS.md`, `.planning/STATE.md` (read in full)
- `.planning/codebase/CONCERNS.md` (read in full — source of the Pitfall 1 finding)
- `.planning/codebase/CONVENTIONS.md`, `.planning/codebase/TESTING.md` (read in full)
- `.planning/phases/01-test-infrastructure/01-PATTERNS.md` (read in full — confirms zero prior render/renderHook analog exists)
- `.claude/CLAUDE.md`, `CLAUDE.md` (repo root, both read via system context)
- `npm view test-renderer version description` (registry check, run this session)
- `grep -niE "search|filter|category" screens/FocusScreen.jsx hooks/useFocusSession.js` (run this session — zero real matches, confirming Pitfall 1)

### Secondary / Tertiary
None — this phase required no web search or external documentation; every claim is grounded in
first-party files read this session.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new packages; existing versions read directly from `package.json`
- Architecture: HIGH — every proposed pattern is grounded in a specific file/line range read in
  full this session
- Pitfalls: HIGH — all five pitfalls are derived from code actually read (context throw guards,
  requirement-text vs. code mismatch, timer calls, navigation API), not speculation

**Research date:** 2026-09-14
**Valid until:** No expiry driver (no external library versions to go stale) — re-verify only if
`FocusScreen.jsx`, `useFocusSession.js`, or the context files change before this phase executes.
