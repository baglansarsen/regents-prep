# FocusScreen Pre-Extraction Characterization

Written before any line of `mobile/src/screens/FocusScreen.jsx` was moved. This is the
independent, pre-extraction baseline the FOCUS-06 manual parity pass is scored against
(02-01-PLAN.md). It is not amended after extraction begins — a retro-fitted baseline
would make FOCUS-06 a tautology.

Evidence base: a full read of `mobile/src/screens/FocusScreen.jsx` (908 lines) and
`mobile/src/hooks/useFocusSession.js` (388 lines) this session, plus
`.planning/phases/02-focusscreen-decomposition/02-UI-SPEC.md` and
`.planning/phases/02-focusscreen-decomposition/02-RESEARCH.md`.

## Requirement-Text Correction

FOCUS-01's literal wording asks this baseline to capture FocusScreen's "current filter,
search, and empty-category behavior." That wording describes features that **do not exist**
in this screen. A whole-file read of both `FocusScreen.jsx` and `useFocusSession.js`, plus
`grep -niE "search|filter|category" mobile/src/screens/FocusScreen.jsx mobile/src/hooks/useFocusSession.js`,
turns up exactly one hit:

```
mobile/src/screens/FocusScreen.jsx:229:    const doneTodos    = todos.filter((t) => t.done).length
```

That is a derived count computation on the done screen (`Array.prototype.filter` used to
count completed tasks) — not a filter *feature*, not a search input, and not a category
concept anywhere in either file.

The origin of the stale wording is `.planning/codebase/CONCERNS.md`, which lists under its
screen-testing-gaps section: "FocusScreen: No test for filter state, search, or error
fallbacks when category is empty." That phrase was carried into `REQUIREMENTS.md`'s FOCUS-01
verbatim without being re-checked against the actual 908-line file.

The sections below document the real analogs instead — the mutually-exclusive chip/swatch
selection state machines (the closest thing this screen has to "filter"-shaped behavior) and
the todos list's genuine empty-collection behavior. No search input, filter control, or
category concept is to be built to satisfy FOCUS-01's literal wording; doing so would violate
this phase's "no behavior changes" constraint.

## Phase Branches

FocusScreen renders exactly one of three mutually exclusive branches, selected by the
`phase` value returned from `useFocusSession`:

| Branch | Condition | Chrome shown | Chrome omitted |
|---|---|---|---|
| **Done** | `phase === 'done'` | Close (✕) button top-right, done heading + emoji, subject badge (if subject set), stat cards, tasks-completed line (if any tasks existed), two action buttons (New Session / View History), floating `StudyBuddyCompanion` (if pet chosen), goal-celebration `Modal` | No timer ring, no active header, no pomodoro dots |
| **Active** | `phase === 'focus' \| 'break' \| 'paused'` | Two-tone gradient background keyed to the selected `background`, active header (stop ✕ left, subject + pomodoro count center, "■ Stop" right), big centered pet (gated by `PETS_ENABLED`), 4 pomodoro-cycle dots, `RiveDemo` buddy, `FocusTimerRing`, pause/resume + skip controls, scrollable capped task list | No setup chips, no done stats |
| **Setup (idle)** | anything else (i.e. `phase === 'idle'`) | Header with "Focus Mode" title + History link + close (✕), subject chips + custom-subject input, duration presets, session-goal chips, task input + list, sound chips, background swatches, Start button, history link (if any history) | No timer ring, no done stats, no active header |

`isActive` and `isDone` are the two derived booleans the screen computes from `phase`
(`isActive = phase === 'focus' || phase === 'break' || phase === 'paused'`;
`isDone = phase === 'done'`); everything else falls through to the setup branch.

## Selection state machines

These are the screen's real "filter-shaped" behavior — five independent single-select
option sets, each rendered as a row of chips or swatches:

1. **Subject chips** (`SUBJECT_CHIPS` from `useFocusSession.js`, 7 options: Math, Science,
   English, History, Art, Music, Reading). Default at first mount: `subject` is `''`
   (nothing selected — no chip shows active). "Active" is decided by an **assembled string
   comparison**: `subject === chip.emoji + ' ' + chip.label` (e.g. `'📐 Math'`), not an id
   comparison. Single-select: choosing a chip sets `subject` to that assembled string and
   clears `showCustomInput`/`customSubject`. There is no way to return to "nothing selected"
   once a chip or custom subject is chosen — the only literal "empty" subject state is the
   untouched first-mount value.

   **Custom-subject path** (separate from the chip set): tapping "Other" clears `subject` to
   `''` and opens a text field (`showCustomInput = true`, `customSubject = ''`). The field
   commits on submit (`onSubmitEditing`) **and** on blur (`onBlur`) — both call the same
   `handleCustomSubject` handler. That handler is a no-op when `customSubject.trim()` is
   falsy (whitespace-only input commits nothing, `subject` stays whatever it was); otherwise
   it sets `subject` to the trimmed value. No chip is ever shown "active" while the custom
   subject is in effect (the assembled-string comparison won't match a chip's own label).

2. **Duration presets** (`FOCUS_PRESETS` from `useFocusSession.js`, 3 options: 15/25/50 min,
   with the 25-min preset as `FOCUS_PRESETS[1]`). Default at first mount: `preset` is the
   25-minute preset (`useFocusSession.js`'s own `useState(FOCUS_PRESETS[1])`). "Active" is
   decided by **id comparison**: `preset.id === p.id`. Single-select with no "none" state —
   a preset is always selected.

3. **Session-goal chips** (a literal inline `[0, 1, 2, 3, 4, 5]` array in the screen, not
   sourced from the hook). Default at first mount: `sessionGoal === 0`, labelled "None" in
   the UI (the only chip in this set with non-numeric label text). "Active" is decided by
   **numeric equality**: `sessionGoal === n`. This is the one selection set where the default
   value (`0` / "None") IS the semantic "nothing selected" state, and it is reachable again
   at any time by tapping "None" — unlike the other four sets, this one has a real return-to-
   empty path.

4. **Sound chips** (`SOUND_OPTIONS` from `useFocusSession.js`, 4 options: Off, Rain, Forest,
   Lo-fi). Default at first mount: `sound` is `SOUND_OPTIONS[0]` (Off). "Active" is decided by
   **id comparison**: `sound.id === opt.id`. Single-select, always one selected (Off counts as
   a selection).

5. **Background swatches** (`BACKGROUNDS`, a local const array in the screen itself, 6
   options: Sunny, Night, Forest, Ocean, Sunset, Space). Default at first mount: `background`
   is `BACKGROUNDS[0]` (Sunny). "Active" is decided by **id comparison**:
   `background.id === bg.id`. Single-select, always one selected.

Summary: every one of the five sets is single-select with no way to return to "nothing
selected," **except** the session-goal chips, whose "None" (0) option is itself the intended
default/empty state and remains reachable. Subject compares an assembled
`emoji + ' ' + label` string; the other four compare an `id`.

## Tasks list

Adding a task (`handleAddTodo`) requires non-blank `todoInput` text — a whitespace-only value
is a silent no-op (`if (!todoInput.trim()) return`). A valid add calls `addTodo(todoInput)`
(which itself re-trims inside `useFocusSession.js`'s `addTodo`), appends the new row to the
**end** of the array, and clears `todoInput`. The "Add" affordance (a text button) only
renders once `todoInput.trim().length > 0` — it is not present when the field is empty or
whitespace-only.

Both the setup-screen rows and the active-screen rows only ever toggle a row's `done` flag
via `toggleTodo(id)`. The setup row's trailing "✕" glyph is **not a delete control** — it
calls `toggleTodo(t.id)`, the same toggle the row's checkbox conceptually represents. No
delete capability exists anywhere in this screen or in `useFocusSession.js`.

An empty todos array renders zero rows and no placeholder/empty-state copy in either the
setup or active screen — the input row above the (empty) list is always visible, so the
section never looks broken even with no tasks. The active screen's task list is height-capped
at `maxHeight: 160` inside a `ScrollView` and scrolls once content exceeds that height; the
setup screen's list is not height-capped (it scrolls with the rest of the setup page).

## Session lifecycle and pet reactions

Controls, from `useFocusSession`: `start`, `pause`, `resume`, `skip`, `stop`, `reset`.

- `start()`: only fires from `idle`/`done`; resets `pomodoroCount`/`sessionRP` to 0 and moves
  to `phase: 'focus'`.
- `pause()`: only fires from `focus`/`break`; moves to `phase: 'paused'`, remembering which
  phase to resume into.
- `resume()`: only fires from `paused`; returns to the remembered pre-pause phase
  (`focus` or `break`).
- `skip()`: toggles between `focus` and `break` immediately (does not fire from `idle`/`done`).
- `stop()`: moves to `phase: 'done'` from any active state, computing and saving partial
  minutes/RP for an incomplete focus interval, and persists a history entry (skipped if total
  session time is under 1 minute).
- `reset()`: returns to `phase: 'idle'`, clearing `pomodoroCount`, `sessionRP`,
  `partialMinutes`, and `todos`.

Four transition-triggered buddy messages, each set via `setBuddyMessage` and cleared via a
`setTimeout`, with exact strings and delays (all defined in the screen, keyed off phase
transitions observed via a `prevPhase` ref):

| Transition | Message | Clear delay |
|---|---|---|
| `idle → focus` (via `start()`) | `` `${petName} is ready to focus! 📚` `` (pet name defaults to `'Buddy'` if unset) | 3000 ms |
| any → `break` | `'Take a break, you earned it! ☕'` | 3500 ms |
| `break → focus` (i.e. resuming the work phase after a break) | `"Let's go again! 💪"` | 2500 ms |
| any → `done` (via `stop()`) | `'Incredible focus today! ⭐'` | 4000 ms |

A fifth, separately-triggered message comes from `handlePomodoroComplete` (fired by
`useFocusSession` itself when a focus interval completes, independent of the phase-transition
effect above): `` `Amazing! ${count} pomodoro${count > 1 ? 's' : ''} done! 🍅` ``, cleared
after 3500 ms. This also triggers `triggerReaction('happy_dance')` and `studyBoost?.()`.

**Goal-celebration trigger**: a separate effect watches `pomodoroCount` and `sessionGoal`. It
does nothing if `sessionGoal === 0` (goal of "None" never celebrates) or if
`pomodoroCount < sessionGoal`. It fires exactly once, on the render where
`pomodoroCount === sessionGoal` (strict equality, not "greater than or equal" — the effect
also has an explicit `if (pomodoroCount !== sessionGoal) return` guard so it cannot re-fire on
a later render where the count has since exceeded the goal). On firing: `triggerReaction`,
`studyBoost?.()`, sets `buddyMessage` to a pet-specific string from
`SESSION_GOAL_PET_MESSAGES` (keyed by `pet?.petType`, falling back to
`SESSION_GOAL_PET_MESSAGES.default`), then after a 600 ms delay sets `goalCelebModal` to
`true` (opening the modal on the done screen — note this state persists across the
active→done transition since it is only cleared by explicit dismissal).

## Leaving an active session

Two distinct confirmation paths exist while `phase` is `focus`, `break`, or `paused`. Both
show the identical `Alert.alert` dialog: title `'End Session?'`, message `'Stop now and save
your progress?'`, buttons `'Keep Going'` (no-op) and `'Stop & Save'` (`style: 'destructive'`).
They differ in what happens after the user taps "Stop & Save":

1. **Back-gesture guard** (a `navigation.addListener('beforeRemove', ...)` effect, active only
   while active/paused): intercepts the navigation-away gesture, calls `e.preventDefault()`,
   shows the dialog, and on "Stop & Save" calls `stop()` followed by
   `navigation.dispatch(e.data.action)` — i.e. it completes the *intercepted* navigation
   action that triggered the guard.
2. **Active-header close button** (the ✕ on the left of the active-screen header): shows the
   same dialog inline in its `onPress`, and on "Stop & Save" calls `stop()` followed by
   `navigation.goBack()` — a plain go-back, not a replay of any intercepted action.

These two are **not** byte-identical despite sharing dialog copy — re-reading the file this
session (lines ~186-203 for the back-gesture guard, ~356-373 for the header close button)
confirms the post-stop navigation calls differ (`navigation.dispatch(e.data.action)` vs.
`navigation.goBack()`). A blind dedupe into one shared callback would be a behavior change and
is explicitly out of scope for this phase; only the shared dialog-showing logic may be
factored into one helper, invoked twice with different post-stop callbacks.

The active header's other stop affordance — the right-side "■ Stop" button — calls `stop()`
directly with **no confirmation dialog at all**. This is a third, distinct exit path from an
active session (no `Alert.alert`), and it is a real behavior of the current screen, not an
oversight to "fix" by adding a dialog.

## Not present in this screen

- **No search** — no search input or search behavior exists anywhere in `FocusScreen.jsx` or
  `useFocusSession.js`.
- **No filter control** — no user-facing "filter" affordance exists; the single `.filter()`
  call found is a derived count, not a feature (see Requirement-Text Correction above).
- **No category concept** — nothing in either file models a "category"; subjects are flat
  chips, not a category hierarchy.
- **No loading or spinner state** — all session/timer state is synchronous local React state;
  nothing is fetched, so there is nothing to show a loading indicator for. (Matches
  02-UI-SPEC.md's "loading" row, marked `⚠ unresolved` there — a pre-existing gap, correctly
  out of scope, not something this phase adds.)
- **No error or failure UI** — session actions (`start`/`stop`/`skip`/etc.) have no network
  call and cannot fail in the current implementation, so no error-state UI exists. (Matches
  02-UI-SPEC.md's "error" row, also `⚠ unresolved` there — same disposition as above.)
- **No empty-state copy** — the one genuine "empty collection" in this screen (the todos list)
  renders zero rows with no placeholder text, on both the setup and active screens.
- **No delete for tasks** — the only per-row action anywhere on a task is `toggleTodo`
  (flips `done`); no code path removes a row from the `todos` array.

This phase's extraction adds none of the above. Both `⚠ unresolved` rows cross-referenced from
02-UI-SPEC.md's UI Considerations table are pre-existing gaps in the shipped screen, flagged
there precisely so no later plan in this phase reads their absence as something to fix.

## How to score FOCUS-06

A human walking the running app after the phase's extraction plans land can verify parity
section by section:

1. **Phase Branches** — confirm the done/active/setup screens still show exactly the chrome
   listed above for each phase, with nothing extra and nothing missing.
2. **Selection state machines** — for each of the five chip/swatch rows, confirm the same
   default is selected on a fresh session, tapping an option marks it active (and only it),
   and the subject "Other" custom-input path still commits on both submit and blur while
   ignoring whitespace-only text.
3. **Tasks list** — confirm adding requires non-blank text, the Add button only appears with
   non-blank input, the setup row's ✕ still only toggles (never deletes), and an empty list
   shows zero rows with no placeholder copy.
4. **Session lifecycle and pet reactions** — run a full start → pause → resume → stop cycle
   and a start → skip cycle, confirming each of the four transition buddy messages appears
   with its exact copy and disappears after its listed delay, and that setting a session goal
   equal to an achieved pomodoro count opens the goal-celebration modal (with a goal of "None"
   never doing so).
5. **Leaving an active session** — trigger the back-gesture (swipe/hardware back) during an
   active session and confirm the dialog appears and returns you out of the screen on
   confirm; separately tap the header's ✕ during an active session and confirm the same
   dialog appears but returns you via a plain go-back; separately tap "■ Stop" and confirm it
   ends the session immediately with **no** dialog.
6. **Not present in this screen** — confirm no search box, filter control, category picker,
   loading spinner, error banner, empty-state message, or task-delete button has been
   introduced anywhere in the decomposed screen.
