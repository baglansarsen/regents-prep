# Architecture Research

**Domain:** React Native (Expo) large-screen decomposition into an existing hook-driven, context-based architecture
**Researched:** 2026-09-14
**Confidence:** HIGH (grounded directly in this codebase's source — `mobile/src/screens/`, `mobile/src/hooks/`, `mobile/src/components/`, `mobile/src/context/` — plus well-established React composition patterns)

## Standard Architecture

### System Overview (existing, confirmed by direct code read)

```
┌─────────────────────────────────────────────────────────────────────┐
│                            Screens (thin)                           │
│  HomeScreen.jsx · QuizScreen.jsx · FriendsScreen.jsx · FocusScreen   │
│  — currently NOT thin (908–1681 lines each) — this is the defect    │
├───────────────────────────┬───────────────────────────┬─────────────┤
│      Composition Hooks    │      Domain Hooks         │  Contexts   │
│  (precedented, minority   │  useProgress, useRP,      │  Auth,Theme,│
│   pattern — see below)    │  useQuiz, useFriends,     │  Lives,Pet, │
│  usePowerUps, usePredicted│  useFocusSession,         │  Sub,Goal,  │
│  Score, useGoalNotif...   │  useDailyStreak, ...      │  Speech,Tour│
├───────────────────────────┴───────────────────────────┴─────────────┤
│                    Firebase (Firestore + Auth) / AsyncStorage       │
└───────────────────────────────────────────────────────────────────────┘
                              ▲
                              │ props + callbacks only
┌─────────────────────────────┴─────────────────────────────────────────┐
│              Sub-components (presentational, already precedented)     │
│  NextActionCard, UnitBanner, ActionChipRow, PetWidget                 │
│  — props in, callbacks out, useTheme() allowed, domain contexts NOT   │
└─────────────────────────────────────────────────────────────────────────┘
```

**Correction to the existing `.planning/codebase/ARCHITECTURE.md` claim** that hooks are "used by screens exclusively (never hook-to-hook calls)": this is not fully accurate. Direct read of `mobile/src/hooks/` shows a real, working **composition-hook** pattern already in production:

- `usePowerUps.js` calls `useAuthContext()`, `useRP()`, `useDailyStreak()`, `useLivesContext()`, `useDoubleRP()`, `useSubscription()` — 6 hooks/contexts composed into one flat return shape (`{ items, rp }`), consumed identically by two different screens (`RewardsSheet`, `ShopScreen`).
- `usePredictedScore.js` composes `useDailyStreak()`, `useExamScores()`, `useGoal()`.
- `useGoalNotificationScheduler.js` composes `useAuthContext()`, `useGoal()`, `useStreak()`, `useSubject()`.

This is the exact shape needed for this refactor: a **screen-level orchestration hook** that composes several single-concern domain hooks/contexts and returns one flat, view-ready object. It is precedented, not novel — treat it as the target pattern rather than inventing something new.

### Component Responsibilities

| Component | Responsibility | Typical Implementation (this codebase) |
|-----------|----------------|------------------------------------------|
| Screen | Layout shell only: composes one orchestration hook, renders sub-components, passes hook output down as props | `HomeScreen.jsx` should shrink to imports + JSX tree + the one `useHomeAgenda()`-style call |
| Composition/orchestration hook | Combines 2+ domain hooks/contexts + screen-local UI state (`useState`) + effects (`useEffect`) + derived memoized values (`useMemo`); returns one flat object | New: `useHomeAgenda`, `useQuizState` (both names already suggested in `CONCERNS.md`), plus similarly for Friends/Focus |
| Domain hook | Single Firestore/AsyncStorage-backed concern; reusable across screens; already mostly extracted and correct | `useProgress`, `useRP`, `useQuiz`, `useFriends`, `useFocusSession`, `useDailyStreak` — leave these alone |
| Context | Truly global, cross-screen state (auth, theme, lives, pet, subscription, goal, speech, tour, subject, double-RP) | Unchanged by this refactor |
| Sub-component | Presentational: props in, callbacks out; may call `useTheme()` for styling but not domain contexts | `NextActionCard.jsx` — explicitly documents itself as "Presentational only — no hooks beyond useTheme/useState" in its own header comment; this is the convention to replicate |
| Util | Pure functions, no React, no I/O | `buildHomeAgenda`, `computeStreak`, `streakMultiplier` — these need zero test-harness ceremony |

## Concrete Per-Screen Findings (why each screen is 900–1700 lines)

Direct grep of each screen's hook/state calls shows the four screens are **not** violating the hook-driven pattern by calling Firestore inline — the domain-hook layer is already mostly correct. The bloat comes from three different sources, in this priority order:

1. **Un-extracted orchestration logic.** All four screens inline the "combine N hooks into the derived values the JSX needs" step directly in the component body — `useMemo` blocks for `subjectHistory`, `stickiestTopic`, `topMistakeType` in `HomeScreen.jsx`; animation-ref wiring (`slideAnim`, `pulseAnim`, `comboAnim`, `petBounceY/X`, `petScale`) and 7+ `useEffect` blocks in `QuizScreen.jsx`; podium animation refs (`barScale`, `avatarY`, `avatarOp`, `medalScale`, `rpOp`) in `FriendsScreen.jsx`; timer/pet-reaction glue in `FocusScreen.jsx`.
2. **Screen-local UI state left inline** (`showBubble`, `buddyMessage`, `petSay`, `repeatIntro`, `endGateParams` in Quiz; `tab`, `lbMode`, `refreshing`, `podiumKey` in Friends; `todoInput`, `customSubject`, `background`, `goalCelebModal` in Focus). This is correctly `useState`, just not grouped with the logic that mutates it.
3. **Un-extracted JSX** for sections that already have a clear single responsibility but haven't been cut into components — e.g., Quiz's repeat-round intro overlay and end-of-lesson refill gate, Friends' three tab bodies (Leaderboard/Challenges/Feed), Home's remaining agenda cards beyond what's already extracted (`NextActionCard`, `UnitBanner`, `ActionChipRow`, `PetWidget` are already good examples of step-3 done correctly).

**Home and Quiz already call 15–20 hooks/contexts each** (confirmed by grep) — that count itself is not the problem (each hook is single-purpose and correctly scoped); the problem is that nothing combines them into a named, testable shape before the JSX consumes them.

## Recommended Project Structure (extends what `PROJECT.md`/`CONCERNS.md` already specify)

```
mobile/src/
├── screens/
│   └── HomeScreen.jsx              # shrinks to: import hook, import sub-components, render JSX
├── hooks/
│   ├── useHomeAgenda.js            # NEW — orchestration hook for HomeScreen (name from CONCERNS.md)
│   ├── useQuizState.js             # NEW — orchestration hook for QuizScreen (wraps useQuiz + UI/animation state)
│   ├── useFriendsScreenState.js    # NEW — orchestration hook for FriendsScreen (podium anim + tab state)
│   ├── useFocusScreenState.js      # NEW — orchestration hook for FocusScreen (UI state + pet-reaction glue)
│   ├── useProgress.js              # unchanged — domain hook
│   └── useQuiz.js                  # unchanged — domain hook (do not confuse with useQuizState)
├── components/
│   ├── HomeScreen/                 # NEW subfolder — screen-scoped sub-components
│   │   ├── StreakCalendarSection.jsx
│   │   ├── LeagueWidget.jsx
│   │   └── DailyTrapCard.jsx
│   ├── QuizScreen/
│   │   ├── AnswerChoices.jsx
│   │   ├── FeedbackBubble.jsx
│   │   ├── RepeatIntroOverlay.jsx
│   │   └── EndOfLessonGate.jsx
│   ├── FriendsScreen/
│   │   ├── LeaderboardTab.jsx
│   │   ├── ChallengesTab.jsx
│   │   └── FriendsFeedTab.jsx
│   ├── FocusScreen/
│   │   ├── BackgroundPicker.jsx
│   │   └── TodoInput.jsx
│   ├── NextActionCard.jsx          # existing — the convention model to copy
│   └── UnitBanner.jsx              # existing — the convention model to copy
└── utils/
    └── homeAgenda.js                # existing pattern — pure derivation logic lives here, not in the hook
```

### Structure Rationale

- **`components/<ScreenName>/`:** matches `PROJECT.md` REFACTOR-01..04 and `CONCERNS.md`'s own suggested fix approach verbatim (`components/HomeScreen/ActionCard`, `QuizScreen/AnswerReview`). Don't invent a different folder shape.
- **Orchestration hooks stay flat in `hooks/`, not nested per-screen:** the existing `hooks/` directory is flat (36 files, no subfolders) and the composition-hook precedents (`usePowerUps`, `usePredictedScore`) live there too — follow that, don't create a `hooks/screens/` subfolder that has no precedent.
- **Naming collision risk:** `useQuizState` (new, orchestration) vs `useQuiz` (existing, domain engine) are easy to conflate. Put a one-line JSDoc header on the new hook explicitly stating "wraps useQuiz + screen-local UI/animation state; does not talk to Firestore directly" — mirrors the header convention already used in `usePowerUps.js` and `NextActionCard.jsx`.

## Architectural Patterns

### Pattern 1: Screen-Level Orchestration Hook (composition hook)

**What:** One hook per screen that calls the screen's several domain hooks + contexts, holds the screen's local UI-only `useState`, owns the `useEffect`s that glue them together, and returns one flat object.
**When to use:** Any screen currently calling more than ~4-5 hooks/contexts directly and doing non-trivial derivation with `useMemo`/`useEffect` in the component body.
**Trade-offs:** Adds one indirection layer, but is exactly the pattern this codebase already uses for cross-screen concerns (`usePowerUps`). The alternative — leaving 15-20 hook calls in the screen body — is the current defect.

```jsx
// mobile/src/hooks/useQuizState.js
// Orchestrates useQuiz (domain engine) + screen-local UI/animation state.
// Does NOT talk to Firestore directly — that stays in useQuiz/useProgress/useRP.
export function useQuizState(questionSet, opts) {
  const quiz = useQuiz(questionSet, opts)              // domain hook, untouched
  const { earnRP } = useRP(opts.uid)                    // domain hook, untouched
  const [showBubble, setShowBubble] = useState(false)   // screen-local UI state, moved in
  const petBounceY = useRef(new Animated.Value(0)).current

  useEffect(() => { /* pet-reaction glue that used to live in QuizScreen */ }, [quiz.phase])

  return { ...quiz, earnRP, showBubble, setShowBubble, petBounceY }
}
```

```jsx
// mobile/src/screens/QuizScreen.jsx — after extraction
export default function QuizScreen({ route }) {
  const state = useQuizState(route.params.questionSet, { uid })
  return (
    <SafeAreaView>
      <AnswerChoices {...state} />
      <FeedbackBubble visible={state.showBubble} />
    </SafeAreaView>
  )
}
```

### Pattern 2: Presentational Sub-Component (props in, callbacks out)

**What:** A component that receives all data as props and reports interactions via callback props; no domain-context subscriptions.
**When to use:** Any JSX block currently inline in a screen that has a clear single visual responsibility (a card, a tab body, a modal/overlay).
**Trade-offs:** More prop-drilling than a component that just reads context itself — but this is the deliberate, already-adopted trade-off in this codebase (see `NextActionCard.jsx`'s own doc comment), because it makes the component snapshot-testable without a provider tree.

```jsx
// Already the convention — mobile/src/components/NextActionCard.jsx (excerpt)
export default function NextActionCard({
  loading = false, goal, hero, headline, extras = [], doneIds, progress,
  onPress, onExtraPress, onOpenGoal, onSkip,
}) {
  const { C } = useTheme()          // ✓ styling context is allowed
  const [expanded, setExpanded] = useState(false)  // ✓ local disclosure state is fine
  // no useAuthContext(), usePetContext(), useSubscription() here — all data arrives via props
}
```

### Pattern 3: Pure-Function Extraction Before Hook Extraction

**What:** Before wrapping a screen's logic in an orchestration hook, first pull out any pure calculation (no React, no I/O) into a plain function in `utils/`.
**When to use:** Any `useMemo` block or plain derivation (`subjectHistory`, `stickiestTopic`, `topMistakeType`, streak-multiplier math) currently embedded in a screen or hook body.
**Trade-offs:** Small extra file per concept, but it is what makes step 5 (testing) cheap — pure functions need zero mocking or rendering to test, and can be imported directly by both the hook and its test (see Anti-Pattern below on the current test-duplication smell).

```js
// mobile/src/utils/quizScoring.js — NEW, extracted from useQuiz.js body
export function streakMultiplier(streak) {
  if (streak >= 5) return 2.0
  if (streak >= 3) return 1.5
  if (streak >= 2) return 1.25
  return 1.0
}
```

## Data Flow

### Extraction target: one-way down, callbacks up

```
Firestore / AsyncStorage
      ↓ (async read)
Domain hooks (useProgress, useRP, useFriends, useFocusSession, ...)
      ↓ (hook state)
Orchestration hook (useHomeAgenda / useQuizState / useFriendsScreenState / useFocusScreenState)
      — merges hook outputs + owns local UI state + runs glue useEffects —
      ↓ (one flat object: { ...data, ...uiState, handlers })
Screen (JSX shell only)
      ↓ (props)                                    ↑ (callback props)
Sub-components (NextActionCard-style, presentational)
      ↓ (user interaction: onPress, onSubmit, ...) ─┘
```

### Key Data Flows

1. **Quiz answer flow (unchanged by refactor, just relocated):** user taps choice → sub-component fires `onSelect(choiceIndex)` prop → orchestration hook's handler calls `quiz.check()` (domain hook) → domain hook calls `useProgress.saveResult()` (Firestore write) → orchestration hook's derived state updates → screen re-renders sub-components with new props. The Firestore write path (`useQuiz` → `useProgress`) does not move; only where the *calling* code lives moves, from screen body to orchestration hook body.
2. **Friends tab flow:** `tab`/`lbMode` local state (currently in `FriendsScreen.jsx`) moves into `useFriendsScreenState`; the screen renders `<LeaderboardTab data={...} onModeChange={...} />` etc. based on `state.tab`, with each tab's own JSX cut into its own component receiving only the slice of `useFriends`/`useLeaderboard`/`useLeague` data it needs.

## Extraction / Build Order

**Hooks before components, in this order, per screen:**

1. **Pure functions first (lowest risk, do this before touching any hook).** Grep the screen for `useMemo`/inline math with no React/Firestore dependency and move it to `utils/`. Zero behavior risk because these are copy-paste-import moves; immediately testable with plain Jest (no mocking, no rendering).
2. **One orchestration hook per screen, mechanical cut-and-paste.** Move every domain-hook call, every screen-local `useState`, every glue `useEffect`, and every `useMemo` that isn't already in step 1, out of the screen body and into a new hook (`useHomeAgenda`, `useQuizState`, etc.). The hook returns the same named values the screen already used — this step touches **zero JSX**, which makes it verifiable purely by diffing behavior (same props flow into the same render tree). Do this before any component extraction: component prop contracts should be designed against the *already-finalized* hook output shape, not guessed at, or the component boundary reworks itself when the hook shape later changes.
3. **Components last, least-coupled leaves first.** Within a screen, extract isolated overlays/modals/gates first (`RepeatIntroOverlay`, `EndOfLessonGate`, `ShareCardSheet`-style sheets) — these share the fewest sibling values and are cheapest to get wrong safely. Extract main-layout sections that share more derived state (hero cards, tab bodies) last, once the orchestration hook's return shape is proven stable from step 2.
4. **Tests land at each step, not after.** Step 1 pure functions → direct Jest unit tests, no duplication. Step 2 hooks → prefer testing their now-extracted pure helpers directly (see Anti-Pattern below); only add hook-level integration tests (with mocked Firestore, following the existing `jest.mock('firebase/firestore', ...)` convention) for behavior that can't be reduced to pure functions (e.g., effect ordering). Step 3 components → render/snapshot tests via `@testing-library/react-native` (already configured: `jest-expo` preset + `@testing-library/jest-native/extend-expect`), passing mock props — no provider wrapping needed if the component is properly presentational.

**Per-screen sequencing:** do `FocusScreen` (908 lines, fewest hooks, one dominant domain hook `useFocusSession`) first as the calibration pass, then `FriendsScreen` (987 lines, moderate hook count, clear tab boundaries), then `QuizScreen` (1221 lines, most animation/effect glue), then `HomeScreen` last (1681 lines, highest hook count and highest blast radius — the app's landing screen). This matches "smallest blast radius first" risk sequencing and lets the team validate the orchestration-hook + sub-component conventions on lower-stakes screens before applying them to the screen every session touches first.

## Anti-Patterns

### Anti-Pattern 1: Sub-Components Subscribing to Domain Contexts Directly

**What people do:** A newly extracted component calls `useAuthContext()`, `usePetContext()`, `useSubscription()`, etc. itself instead of receiving that data as props.
**Why it's wrong:** Breaks the render/snapshot-testability this codebase has already standardized on (`NextActionCard`'s own doc comment: "Presentational only — no hooks beyond useTheme/useState"); makes the component un-renderable in isolation without a full provider tree; re-introduces the exact coupling this refactor is meant to remove.
**Do this instead:** Read domain contexts once, in the screen's orchestration hook; pass the needed values down as props. `useTheme()` is the one exception already established in the codebase (styling infrastructure, not domain state) — calling it directly in a presentational component is fine and already done everywhere.

### Anti-Pattern 2: One Giant Mega-Hook Per Screen

**What people do:** Move all 15-20 hook calls plus every `useState`/`useEffect` into a single new hook with no internal grouping, effectively relocating the 1000+ line problem rather than solving it.
**Why it's wrong:** Produces an untestable, unreadable hook that is exactly as tangled as the screen it replaced, just in a different file; defeats `TEST-01`'s goal of hooks with tests covering discrete state transitions.
**Do this instead:** Split by concern into 2-4 focused hooks where a natural seam exists (e.g., `useQuizState` for domain+UI state, plus a separate `useQuizAnimations` for the six `Animated.Value` refs and their `useEffect` triggers) — mirrors the existing precedent where `usePowerUps` and `usePredictedScore` are each scoped to one coherent concern, not "everything this screen needs."

### Anti-Pattern 3: Duplicating Pure Logic Into Test Files ("Mirrored Copies")

**What people do:** The existing `useQuiz.test.js` explicitly documents doing this — copying the scoring/streak math out of `useQuiz.js` into the test file as comment-flagged "mirrored copies," to sidestep a `react-test-renderer`/Expo version mismatch with hook-rendering test utilities.
**Why it's wrong:** Creates silent drift risk — if `useQuiz.js`'s real logic changes, the mirrored copy in the test can pass while the real hook is broken, and nothing catches it. This is a known, self-documented smell in the current codebase, not a hypothetical.
**Do this instead:** For every new hook extracted during this refactor, apply Pattern 3 first (pure-function extraction into `utils/`) so tests can `import` the real function directly instead of duplicating it. This is the direct, actionable fix `TEST-01` should enforce for all newly extracted hooks — it doesn't require fixing the pre-existing `useQuiz.test.js` (out of scope per `PROJECT.md`), but it prevents the same smell from being reproduced four more times.

### Anti-Pattern 4: Building Components Before the Hook Shape Is Final

**What people do:** Extract a sub-component's JSX and design its props before the orchestration hook (step 2) is finished, guessing at what shape the hook will eventually return.
**Why it's wrong:** Causes rework — every guessed prop name has to be reconciled against the real hook output once step 2 lands, doubling the diff surface and increasing the chance of a behavior slip during a "pure structural" refactor.
**Do this instead:** Always finish step 2 (the orchestration hook, mechanical, zero-JSX) for a screen before starting step 3 (component extraction) on that same screen.

### Anti-Pattern 5: Promoting Screen-Local UI State to Context

**What people do:** During extraction, notice that a piece of state (e.g., `showBubble`, `tab`, `background`) is being threaded through several new sub-components and "solve" the drilling by lifting it into a new React Context.
**Why it's wrong:** Violates this codebase's own established boundary — Context is reserved for state that is genuinely global/cross-screen (Auth, Theme, Lives, Pet, Subscription, Goal, Speech, Tour, Subject, DoubleRP per `.planning/codebase/ARCHITECTURE.md`). Screen-scoped UI toggles are not that, and creating one-off contexts per screen defeats the purpose of a hook-driven architecture and adds provider-tree ceremony this refactor should be reducing, not adding.
**Do this instead:** Keep screen-local UI state in the screen's orchestration hook and pass it down as props; accept some prop-drilling within a single screen's component tree — that is the existing, working trade-off (see `NextActionCard`).

### Anti-Pattern 6: Renaming Firestore Fields or AsyncStorage Keys During Extraction

**What people do:** While moving code into a new hook/component, "clean up" a variable name and accidentally change the Firestore field name or `AsyncStorage` key it maps to.
**Why it's wrong:** This exact class of mistake previously shipped a crashing TestFlight build via a bulk `sed` rename (documented in this repo's `CLAUDE.md`). Pure structural refactors must not touch persistence-layer identifiers.
**Do this instead:** Per `CLAUDE.md`'s own rule: rename UI strings and local identifiers freely; Firestore field names and AsyncStorage keys keep their old names. Verify with `npm run check` before each commit, per-file edits only, no bulk rename tools.

## Scaling Considerations

Not a user-scale concern for this initiative — this is a structural refactor of existing code, not new capacity. The relevant "scale" axis is screen complexity, already captured in `CONCERNS.md`:

| Concern axis | Today | After this refactor | If a 5th large screen emerges later |
|---|---|---|---|
| Lines per screen file | 908-1681 | Target: screen file under ~150-200 lines (JSX shell + one hook call) | Same conventions apply directly — no new pattern needed |
| Hooks/contexts called directly in screen body | 15-20 | 1 (the orchestration hook) | Same |
| Render/state test coverage | ~0 for these 4 screens | 1+ render test per extracted component, 1+ unit test per extracted hook/pure function | Same pattern extends |

### Scaling Priorities

1. **First bottleneck (already hit):** screen files too large to safely modify — the entire reason for this initiative. Fixed by the extraction order above.
2. **Second bottleneck (watch for it, not yet present):** if an orchestration hook itself grows past ~300-400 lines because a screen's concerns don't split cleanly, split it into 2+ named hooks (Anti-Pattern 2) rather than letting it become the new mega-file.

## Integration Points

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Screen ↔ orchestration hook | Direct function call, one per screen | Screen calls exactly one new hook; that hook returns everything the screen's JSX needs |
| Orchestration hook ↔ domain hooks/contexts | Direct function calls (precedented: `usePowerUps`, `usePredictedScore`) | Domain hooks/contexts stay untouched; only the *caller* moves |
| Screen ↔ sub-component | Props down, callbacks up | No context reads inside sub-components except `useTheme()` |
| Sub-component ↔ sub-component | Not direct — always through the parent screen/hook | Prevents sibling components from developing hidden coupling |
| Extracted hook/component ↔ Firestore/AsyncStorage | Unchanged — still only through existing domain hooks (`useProgress`, `useRP`, etc.) | This refactor must not add new direct Firestore calls anywhere; if a new call site seems necessary, that's a signal to stop and flag it (per `PROJECT.md` behavior constraint) |

## Sources

- Direct read: `mobile/src/screens/HomeScreen.jsx`, `QuizScreen.jsx`, `FriendsScreen.jsx`, `FocusScreen.jsx` (import lists and hook/state call sites) — primary source, HIGH confidence
- Direct read: `mobile/src/hooks/usePowerUps.js`, `usePredictedScore.js`, `useGoalNotificationScheduler.js` — evidence for the composition-hook precedent — primary source, HIGH confidence
- Direct read: `mobile/src/components/NextActionCard.jsx` and directory listing of `mobile/src/components/` — evidence for the presentational sub-component convention — primary source, HIGH confidence
- Direct read: `mobile/src/__tests__/useQuiz.test.js` and `mobile/package.json` jest config — evidence for the current hook-testing convention and its "mirrored copy" smell — primary source, HIGH confidence
- `.planning/PROJECT.md`, `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/CONCERNS.md` — required reading, project-specific scope and constraints — primary source, HIGH confidence
- General React "container/presentational" and custom-hook composition patterns — well-established, uncontroversial software engineering practice; not independently web-verified this session because the codebase's own precedent (`usePowerUps` et al.) already demonstrates the pattern in production, which is a stronger source than generic external references for this specific codebase decision

---
*Architecture research for: React Native (Expo) screen decomposition into existing hook-driven architecture*
*Researched: 2026-09-14*
