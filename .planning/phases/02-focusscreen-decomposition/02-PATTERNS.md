# Phase 2: FocusScreen Decomposition - Pattern Map

**Mapped:** 2026-09-14
**Files analyzed:** 22 (1 modified screen, 1 new hook, 15 new sub-components, 2 test-group patterns, 1 characterization doc, 1 modal, plus grouped counts below)
**Analogs found:** 21 / 22 (one true "no analog" — the orchestration-hook role itself, since this is the first screen decomposed in the initiative)

All analog paths below were verified git-tracked via `git ls-files` before being cited (`mobile/src/screens/FocusScreen.jsx`, `mobile/src/hooks/useFocusSession.js`, `mobile/src/components/ActionChipRow.jsx`, `mobile/src/components/FocusTimerRing.jsx`, `mobile/src/context/{Theme,Pet,Auth}Context.js`, `mobile/src/hooks/useRP.js`, `mobile/src/__tests__/{rntlSmoke,useQuiz}.test.js` — all present in `git ls-files` output, none are gitignored mirrors).

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `mobile/src/hooks/useFocusScreenState.js` | hook (orchestration) | event-driven + CRUD (local state + wrapped domain hook) | `mobile/src/hooks/useFocusSession.js` (hook conventions) + `mobile/src/screens/FocusScreen.jsx:115-224` (logic to relocate) | role-match (no orchestration-hook precedent exists yet — this phase sets it) |
| `mobile/src/screens/FocusScreen.jsx` (modified → thin) | screen (thin) | request-response (renders from hook state) | Any already-thin screen pattern per `.planning/codebase/ARCHITECTURE.md` ("screens are thin") — no single file citation needed, this is the target shape, not a copy source | n/a (target state, not a copy) |
| `mobile/src/components/FocusScreen/FocusSetupScreen.jsx` | component (container) | request-response | `mobile/src/screens/FocusScreen.jsx:494-692` (idle-branch JSX being extracted verbatim) | role-match (container shape has no prior component-dir precedent; source JSX is exact) |
| `mobile/src/components/FocusScreen/FocusActiveScreen.jsx` | component (container) | request-response | `mobile/src/screens/FocusScreen.jsx:338-491` | role-match |
| `mobile/src/components/FocusScreen/FocusDoneScreen.jsx` | component (container) | request-response | `mobile/src/screens/FocusScreen.jsx:227-335` | role-match |
| `mobile/src/components/FocusScreen/SubjectPicker.jsx` | component (interactive picker) | request-response (onPress) | `mobile/src/components/ActionChipRow.jsx` | exact |
| `mobile/src/components/FocusScreen/DurationPicker.jsx` | component (interactive picker) | request-response | `mobile/src/components/ActionChipRow.jsx` | exact |
| `mobile/src/components/FocusScreen/GoalPicker.jsx` | component (interactive picker) | request-response | `mobile/src/components/ActionChipRow.jsx` | exact |
| `mobile/src/components/FocusScreen/SoundPicker.jsx` | component (interactive picker) | request-response | `mobile/src/components/ActionChipRow.jsx` | exact |
| `mobile/src/components/FocusScreen/BackgroundPicker.jsx` | component (interactive picker) | request-response | `mobile/src/components/ActionChipRow.jsx` | exact |
| `mobile/src/components/FocusScreen/TaskInput.jsx` | component (interactive form) | request-response (onSubmit/onChange) | `mobile/src/screens/FocusScreen.jsx:603-618` (todoInputRow JSX) + `ActionChipRow.jsx` (component shape) | role-match |
| `mobile/src/components/FocusScreen/TaskList.jsx` | component (interactive list) | CRUD (toggle) | `mobile/src/screens/FocusScreen.jsx:619-627` (setup todo rows) / `:463-487` (active todo rows) | role-match |
| `mobile/src/components/FocusScreen/ActiveSessionHeader.jsx` | component (interactive) | request-response (onPress stop) | `mobile/src/components/ActionChipRow.jsx` | role-match |
| `mobile/src/components/FocusScreen/TimerControls.jsx` | component (interactive) | request-response | `mobile/src/components/ActionChipRow.jsx` | role-match |
| `mobile/src/components/FocusScreen/DoneActions.jsx` | component (interactive) | request-response | `mobile/src/components/ActionChipRow.jsx` | role-match |
| `mobile/src/components/FocusScreen/GoalCelebrationModal.jsx` | component (interactive, modal) | request-response (onDismiss) | `mobile/src/screens/FocusScreen.jsx:313-332` (existing `<Modal>` JSX) | role-match |
| `mobile/src/components/FocusScreen/BigPetDisplay.jsx` | component (interactive, moved verbatim) | request-response (onPress) | `mobile/src/screens/FocusScreen.jsx:40-113` (`BigPet` — moves near-verbatim) | exact (literal source relocation) |
| `mobile/src/components/FocusScreen/PomodoroCycleDots.jsx` | component (pure display) | transform (props → visual) | `mobile/src/components/FocusTimerRing.jsx` | exact |
| `mobile/src/components/FocusScreen/SessionSummaryStats.jsx` | component (pure display) | transform | `mobile/src/components/FocusTimerRing.jsx` | exact |
| `mobile/src/__tests__/useFocusScreenState.test.js` | test (hook, unit) | event-driven | `mobile/src/__tests__/rntlSmoke.test.js` (RNTL v14 `renderHook`/`act` shape) | exact (shape) — no prior hook-with-context-mocks test exists, so mocks are new-ground (see Shared Patterns) |
| `mobile/src/components/FocusScreen/__tests__/*.test.jsx` (interactive, e.g. `SubjectPicker.test.jsx`) | test (component, interaction) | request-response | `mobile/src/__tests__/rntlSmoke.test.js` (`render`/`screen` shape) — **no existing `fireEvent` test in this repo**, pattern synthesized from RNTL's documented API + this file's `render()` shape | role-match (no interaction-test precedent exists anywhere in repo yet) |
| `mobile/src/components/FocusScreen/__tests__/PomodoroCycleDots.test.jsx` (pure-display, D-01) | test (component, snapshot) | transform | `mobile/src/__tests__/rntlSmoke.test.js` (`render`/`screen.toJSON()` shape) | role-match |

## Pattern Assignments

### `mobile/src/hooks/useFocusScreenState.js` (hook, orchestration)

**Analog:** `mobile/src/hooks/useFocusSession.js` (hook-authoring conventions) — logic content sourced from `mobile/src/screens/FocusScreen.jsx:115-224`.

**Imports pattern** (`useFocusSession.js` lines 1-9 — mirror this shape, adding context imports moved from the screen):
```javascript
import { useState, useRef, useEffect, useCallback } from 'react'
// ...plus, moved from FocusScreen.jsx lines 8-13:
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useRP } from '../hooks/useRP'
import { usePetContext } from '../context/PetContext'
import { useFocusSession, SUBJECT_CHIPS, SOUND_OPTIONS } from './useFocusSession'
```

**Hook signature + named export pattern** (`useFocusSession.js:62`): named export, no default — `export function useFocusScreenState(uid, navigation) { ... }` matches `export function useFocusSession(uid, earnRP, onPomodoroComplete)`.

**Core "wrap, don't absorb" composition pattern** (source-synthesized, grounded in `FocusScreen.jsx:117-142` call-site + `useFocusSession.js:62-388` return shape):
```javascript
export function useFocusScreenState(uid, navigation) {
  const { earnRP } = useRP(uid)
  const { triggerReaction, studyBoost, say, pet } = usePetContext()

  const [buddyMessage, setBuddyMessage] = useState(null)
  // ...other local state moved verbatim from FocusScreen.jsx:123-128

  const handlePomodoroComplete = useCallback((count) => {
    triggerReaction('happy_dance')
    studyBoost?.()
    setBuddyMessage(`Amazing! ${count} pomodoro${count > 1 ? 's' : ''} done! 🍅`)
    setTimeout(() => setBuddyMessage(null), 3500)
  }, [triggerReaction, studyBoost])

  const session = useFocusSession(uid, earnRP, handlePomodoroComplete)  // WRAP, not absorb

  // three useEffects (pet-reaction, goal-celebration, back-gesture-guard)
  // move here verbatim from FocusScreen.jsx:144-203, referencing session.phase etc.

  return { ...session, buddyMessage, /* ...other local state + handlers */ }
}
```

**Effect/ref pattern** (`useFocusSession.js:89-99` — refs mirroring state to avoid stale closures in timers/intervals): if any moved `useEffect`/`setTimeout` needs the latest value inside an async callback, follow this ref-mirror convention rather than adding it to a dependency array that would re-trigger the effect.

**Error handling:** None needed — this hook wraps existing, already-correct logic with no new async/Firestore/AsyncStorage calls of its own (all of that stays inside `useFocusSession`, per Runtime State Inventory in RESEARCH.md). No new try/catch introduced.

**Naming collision note:** `useFocusScreenState` vs. existing `useFocusSession` — names are already distinct; no action needed (per CONTEXT.md discretion note), but do not rename either during this phase.

---

### `mobile/src/components/FocusScreen/{FocusSetupScreen,FocusActiveScreen,FocusDoneScreen}.jsx` (container components)

**Analog:** the corresponding branch of `mobile/src/screens/FocusScreen.jsx` — idle (`:494-692`), active (`:338-491`), done (`:227-335`). These are direct JSX relocations, not new patterns — the boundary is grounded in the file's own `// ── IDLE setup screen ──`, `// ── ACTIVE screen ──`, `// ── DONE screen ──` comments at lines 493, 337, 227.

**Imports pattern** (mirror `FocusScreen.jsx:1-27`, trimmed to what each container actually renders): each container imports `useTheme` from `../context/ThemeContext`, `T`/`cardShadow`/`duoBtn` from `../styles/duo` **only if FocusScreen.jsx already imports them for that branch's JSX** — do not add `duoBtn`/`cardShadow` usage where the original branch didn't use it (Anti-Pattern in RESEARCH.md).

**Core pattern:** container receives the flat object returned by `useFocusScreenState` as props (or destructures individual props — planner's call), calls `useTheme()` itself for `C`, keeps its own `makeStyles(C)` slice (see Pattern 2 below), and renders the named sub-components in place of the original inline JSX blocks.

**Error handling:** None — pure presentational relocation, no new async paths.

---

### `mobile/src/components/FocusScreen/{SubjectPicker,DurationPicker,GoalPicker,SoundPicker,BackgroundPicker,ActiveSessionHeader,TimerControls,DoneActions}.jsx` (interactive picker/action components)

**Analog:** `mobile/src/components/ActionChipRow.jsx` (48 lines, read in full) — exact role + data-flow match: functional component, `useTheme()` called directly (not prop-drilled), local `makeStyles(C)` factory, callback props fired on press, renders `null`/nothing when there's nothing to show.

**Imports pattern** (`ActionChipRow.jsx:1-4`):
```javascript
import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext'
```
Do **not** import `sectionLabel`/`T` from `../styles/duo` unless the specific widget already relies on that factory in `FocusScreen.jsx` — FocusScreen uses its own local `s.sectionLabel` style key (line 521, 564, 585, 602, 630, 649), not the `duo.js` factory (see Anti-Patterns).

**Core pattern** (`ActionChipRow.jsx:15-37`):
```javascript
export default function SubjectPicker({ chips, selectedLabel, onSelectChip, showCustomInput, customSubject, onCustomSubjectChange, onCustomSubjectSubmit, onShowCustomInput }) {
  const { C } = useTheme()
  const s = makeStyles(C)
  if (!chips.length) return null   // guard pattern, only where the original had an equivalent conditional
  return (
    <View style={s.chips}>
      {chips.map((chip) => (
        <TouchableOpacity key={chip.id} style={[s.chip, /* active state */]} onPress={() => onSelectChip(chip)} activeOpacity={0.75}>
          {/* ... */}
        </TouchableOpacity>
      ))}
    </View>
  )
}
const makeStyles = (C) => StyleSheet.create({ /* pull only the style keys this widget needs from FocusScreen.jsx:695-908's makeStyles */ })
```

**Source style keys to extract per widget** (from `FocusScreen.jsx:695-908`, non-overlapping): `chips`/`chip`/`chipEmoji`/`chipText` (SubjectPicker, SoundPicker), `presetRow`/`presetBtn*` (DurationPicker), `goalChips`/`goalChip*` (GoalPicker), `bgRow`/`bgSwatch` (BackgroundPicker), `activeHeader`/`stopBtn*`/`activeSubject` (ActiveSessionHeader), `timerControls`/`controlBtn*` (TimerControls), `primaryBtn*`/`secondaryBtn*` (DoneActions).

**Error handling:** None — no async calls in these leaf components; all state mutation happens via the callback props supplied by `useFocusScreenState`/`useFocusSession`.

---

### `mobile/src/components/FocusScreen/TaskInput.jsx` + `TaskList.jsx` (interactive list components)

**Analog:** `mobile/src/screens/FocusScreen.jsx:603-618` (input row) and `:619-627` / `:463-487` (two visually distinct row renderings — setup vs. active, see RESEARCH.md Open Question 1) for the JSX to relocate; `ActionChipRow.jsx` for the component-shape convention (`useTheme()`, local `makeStyles`).

**Core pattern:** `TaskInput` wraps the existing `TextInput` + conditional "Add" button (`FocusScreen.jsx:604-617`), taking `value`, `onChangeText`, `onSubmit` as props (mirrors `handleAddTodo`/`todoInput`/`setTodoInput` already in the hook). `TaskList` (or two variant components, `SetupTaskRow`/`ActiveTaskRow`, per RESEARCH.md's Open Question 1 recommendation) takes `todos` + `onToggle` and maps rows exactly as `FocusScreen.jsx:619-627` (setup, with trailing ✕ that calls `toggleTodo`) and `:463-487` (active, strikethrough style) do today — **no delete capability exists; the ✕ toggles `done`, it does not remove** (confirmed by re-reading both call sites this session — do not add real delete behavior).

**Error handling:** None — `.trim()`-before-use is already handled inside `useFocusSession`'s `addTodo` (`useFocusSession.js:70-74`); the extracted `TaskInput` must not re-implement or "improve" this trim logic (V5 input-validation constraint, RESEARCH.md Security Domain).

---

### `mobile/src/components/FocusScreen/BigPetDisplay.jsx` (moved verbatim)

**Analog:** `mobile/src/screens/FocusScreen.jsx:40-113` (the existing local `BigPet` function component) — this is a **literal relocation**, not a re-implementation. Copy the function body byte-for-byte into the new file, rename `BigPet` → `BigPetDisplay` only if the planner wants the file/export name to match (optional — CONTEXT.md doesn't require a rename), add `import { useTheme } from '../context/ThemeContext'` (already used internally at line 41) and `import { PETS_ENABLED }` if the gating (`FocusScreen.jsx:397`) moves into this component rather than staying in the container.

**Interactivity:** has an `onPress` prop (line 40, 96) → gets an interaction test per D-01.

---

### `mobile/src/components/FocusScreen/GoalCelebrationModal.jsx` (interactive, modal)

**Analog:** `mobile/src/screens/FocusScreen.jsx:313-332` (existing `<Modal>` JSX, to be extracted verbatim) — no separate standalone `Modal`-based component exists elsewhere in `mobile/src/components/` to copy structural conventions from, so the container-relocation approach (like the three Focus*Screen containers) applies here too, not the `ActionChipRow` leaf-widget shape.

**Core pattern:** takes `visible`, `sessionGoal`, `petName`, `onDismiss` as props; internal JSX is `FocusScreen.jsx:313-332` unchanged (backdrop, card, celebration copy, dismiss button wired to `onDismiss` instead of inline `setGoalCelebModal(false)`).

**Interactivity:** `onDismiss` callback prop → interaction test per D-01.

---

### `mobile/src/components/FocusScreen/{PomodoroCycleDots,SessionSummaryStats}.jsx` (pure-display components)

**Analog:** `mobile/src/components/FocusTimerRing.jsx` (131 lines, read in full) — exact match: functional component, `useTheme()` for color fallbacks, zero callback props, renders purely from numeric/string props, local (non-factory) `StyleSheet.create` block at module scope.

**Imports pattern** (`FocusTimerRing.jsx:1-7`):
```javascript
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext'
```

**Core pattern** (`FocusTimerRing.jsx:9-33`, adapted): accept plain props (`cyclePosition`, `accentColor` for `PomodoroCycleDots`; `displayMin`, `pomodoroCount`, `partialMinutes`, `sessionRP` for `SessionSummaryStats`), compute derived display values inline (mirrors `FocusScreen.jsx:229-231`'s `doneTodos`/`totalTodos`/`displayMin` computation and `:404-413`'s dot-rendering loop), return JSX with no `TouchableOpacity`/callback anywhere.

**Interactivity:** zero callback props → render/snapshot-only test per D-01 (this is the concrete example cited in RESEARCH.md's Code Examples section).

---

### `mobile/src/__tests__/useFocusScreenState.test.js` (hook test)

**Analog:** `mobile/src/__tests__/rntlSmoke.test.js` (71 lines, read in full) — the proven awaited `renderHook`/`act` shape for this exact RNTL v14 / jest-expo 54 / React 19 stack.

**Core pattern** (from RESEARCH.md Code Examples, grounded in `rntlSmoke.test.js:27-40`):
```javascript
import { renderHook, act } from '@testing-library/react-native'
import { useFocusScreenState } from '../hooks/useFocusScreenState'

test('start() transitions phase from idle to focus', async () => {
  const navigation = { addListener: jest.fn(() => jest.fn()), dispatch: jest.fn(), goBack: jest.fn() }
  const { result } = await renderHook(() => useFocusScreenState('test-uid', navigation))
  await act(async () => { result.current.start() })
  expect(result.current.phase).toBe('focus')
})
```

**Required mocks (Shared Pattern — see below):** `AuthContext`, `PetContext`, `ThemeContext` must each be `jest.mock()`ed per-file (no shared fixture file exists in this repo's test convention).

---

### `mobile/src/components/FocusScreen/__tests__/*.test.jsx` (interactive component tests, D-01)

**Analog:** `mobile/src/__tests__/rntlSmoke.test.js`'s `render()`/`screen` shape (lines 50-60) — **no `fireEvent`-based interaction test exists anywhere in this repo yet**; the pattern below is synthesized from that proven `render()` shape plus RNTL v14's documented `fireEvent` API (already installed, same package).

**Core pattern** (RESEARCH.md Code Examples):
```javascript
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
Any component under test that calls `useTheme()` needs `ThemeContext` mocked (see Shared Patterns) since `useTheme()` returns `null` outside a provider and the component will throw on `{ C }` destructure.

---

### `mobile/src/components/FocusScreen/__tests__/PomodoroCycleDots.test.jsx` (render/snapshot test, D-01)

**Analog:** `mobile/src/__tests__/rntlSmoke.test.js:50-60` (`render`) — snapshot variant.

**Core pattern** (RESEARCH.md Code Examples):
```javascript
import { render, screen } from '@testing-library/react-native'
import PomodoroCycleDots from '../PomodoroCycleDots'

test('renders 4 dots with cyclePosition dots filled', async () => {
  await render(<PomodoroCycleDots cyclePosition={2} accentColor="#1FC36B" />)
  expect(screen.toJSON()).toMatchSnapshot()
})
```

---

## Shared Patterns

### Theme Consumption (`useTheme()` called directly, not prop-drilled)
**Source:** `mobile/src/components/ActionChipRow.jsx:16` / `mobile/src/components/FocusTimerRing.jsx:10`
**Apply to:** Every new file under `mobile/src/components/FocusScreen/` (containers and leaf widgets alike).
```javascript
import { useTheme } from '../context/ThemeContext'
const { C } = useTheme()
const s = makeStyles(C)
```
Each file keeps its own local `makeStyles(C)` factory scoped to only the style keys it needs — do not import `FocusScreen.jsx`'s full `makeStyles` output (908-line file) into every sub-component.

### Context Mocking for Tests (no throw-guard trip)
**Source:** synthesized from throw-guards in `mobile/src/context/AuthContext.js:47-51` and `mobile/src/context/PetContext.js:26-30`, plus this repo's documented "no shared fixture file" test convention (`.planning/phases/01-test-infrastructure/01-PATTERNS.md`, `TESTING.md`).
**Apply to:** `useFocusScreenState.test.js` and any component test whose tree reaches a component calling `useAuthContext()`/`usePetContext()`/`useTheme()`.
```javascript
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
  useTheme: () => ({ C: { bg: '#fff', text: '#000', brand: '#1FC36B' /* ...minimal fixture, extend per-test as needed */ } }),
}))
```
`useAuthContext`/`usePetContext` throw without a provider (fail-fast by design); `useTheme()` does not throw but returns `null`, which crashes on `{ C }` destructure — all three need mocking, not just the two that throw.

### Wrap-Don't-Absorb Domain Hook Composition
**Source:** `mobile/src/hooks/useFocusSession.js` (388 lines, untouched) + `mobile/src/screens/FocusScreen.jsx:137` (existing call site)
**Apply to:** `useFocusScreenState.js` only (single orchestration hook this phase).
Call `useFocusSession(uid, earnRP, handlePomodoroComplete)` internally and spread its return value — do not copy `useFocusSession`'s internals into the new hook. This is an intentional, scoped exception to `.claude/CLAUDE.md`'s "hooks: never hook-to-hook calls" rule (see RESEARCH.md Pitfall 2) and is the precedent Phases 3-5 should reuse, not re-litigate.

### Timer-Cleanup Pattern for `setTimeout`-Driven Buddy Messages
**Source:** `mobile/src/screens/FocusScreen.jsx:134,155,160,164,169,182` (six `setTimeout(() => setBuddyMessage(null), N)` call sites)
**Apply to:** Any `useEffect`/handler moved into `useFocusScreenState` that clears transient UI state after a delay.
Preserve every `setTimeout` call and its exact delay verbatim — no consolidation into a single shared timeout utility unless it produces byte-identical behavior (deduping is fine per RESEARCH.md's `handleStopConfirm` guidance, but only when call sites are verified byte-identical first).

### Input Trim-Before-Use (preserve, do not "improve")
**Source:** `mobile/src/hooks/useFocusSession.js:70-74` (`addTodo`'s `text.trim()`), `mobile/src/screens/FocusScreen.jsx:211-214` (`handleCustomSubject`'s `customSubject.trim()`)
**Apply to:** `TaskInput.jsx`, `SubjectPicker.jsx`'s custom-input path, and `useFocusScreenState.js`'s `handleCustomSubject`/`handleAddTodo` handlers.
Extraction must call `.trim()` in the same place it happens today — do not move trimming into the sub-component if the original trimmed in the hook/handler, or vice versa (behavior-preserving structural constraint, not a place to "clean up").

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `mobile/src/hooks/useFocusScreenState.js` (as an *orchestration-hook-wrapping-another-hook* role, distinct from its content) | hook | event-driven | No other screen in this codebase has yet been decomposed into a `use*ScreenState` hook — this phase is the template-setter (Phases 3-5's `useFriendsScreenState`/`useQuizState`/`useHomeAgenda` will copy *this* phase's output, not a pre-existing analog). Use `useFocusSession.js`'s hook-authoring conventions (named export, useState/useRef/useCallback shape) as the closest available substitute, per the Pattern Assignment above. |
| `mobile/src/components/FocusScreen/__tests__/*.test.jsx` (interaction variant, D-01) | test | request-response | Zero `fireEvent`-based interaction tests exist anywhere in this repo today (confirmed via repo-wide grep this session) — the pattern in this doc is synthesized from RNTL v14's documented API + the one proven `render()` call in `rntlSmoke.test.js`, not copied from a working precedent. Treat as the new precedent, not a risk. |
| `mobile/src/components/FocusScreen/GoalCelebrationModal.jsx` (as a standalone reusable `Modal` component convention) | component | request-response | No other file in `mobile/src/components/` wraps React Native's `<Modal>` as its own named component — the only `<Modal>` usage found is inline inside `FocusScreen.jsx:313-332` itself, which is what this file relocates verbatim. |

## Metadata

**Analog search scope:** `mobile/src/screens/`, `mobile/src/hooks/`, `mobile/src/components/`, `mobile/src/context/`, `mobile/src/__tests__/`, `mobile/src/components/*/__tests__/` (searched, found none pre-existing under `components/`)
**Files scanned (read in full or targeted grep+range this session):** `FocusScreen.jsx` (908 lines, full), `useFocusSession.js` (388 lines, full), `ActionChipRow.jsx` (48 lines, full), `FocusTimerRing.jsx` (131 lines, full), `PetContext.js` (30 lines, full), `AuthContext.js` (51 lines, full), `ThemeContext.js` (61 lines, full), `useRP.js` (259 lines, full), `rntlSmoke.test.js` (71 lines, full), `useQuiz.test.js` (first 120 lines) — 9 files total, ~1,857 lines read
**Pattern extraction date:** 2026-09-14
