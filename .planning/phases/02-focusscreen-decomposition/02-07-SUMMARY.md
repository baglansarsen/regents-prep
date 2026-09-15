---
phase: 02-focusscreen-decomposition
plan: 07
subsystem: mobile-focus-screen
tags: [react-native, focus-screen, component-extraction, interaction-tests, rntl]
requires:
  - phase: 02-06
    provides: FocusSetupScreen composing SubjectPicker/DurationPicker/GoalPicker; chips/chip/chipEmoji/chipText style keys retained pending this plan's SoundPicker extraction
provides:
  - TaskInput component (task-entry field + conditional Add affordance)
  - TaskList component (setup-phase task rows with toggle-only trailing control)
  - SoundPicker component (background-sound chip row)
  - BackgroundPicker component (scene swatch row)
  - FocusSetupScreen recomposed to render all seven extracted components; holds no option-section JSX at all
affects: [02-08]
actuals:
  tokens: 7800
  tasks: 3
  commits: 3
tech-stack:
  added: []
  patterns:
    - "testID added purely for style-assertion addressability (BackgroundPicker's border-width selection indicator has no text-content proxy to query by) — no user-visible effect, not a behavior change"
key-files:
  created:
    - mobile/src/components/FocusScreen/TaskInput.jsx
    - mobile/src/components/FocusScreen/TaskList.jsx
    - mobile/src/components/FocusScreen/SoundPicker.jsx
    - mobile/src/components/FocusScreen/BackgroundPicker.jsx
    - mobile/src/components/FocusScreen/__tests__/TaskInput.test.jsx
    - mobile/src/components/FocusScreen/__tests__/TaskList.test.jsx
    - mobile/src/components/FocusScreen/__tests__/SoundPicker.test.jsx
    - mobile/src/components/FocusScreen/__tests__/BackgroundPicker.test.jsx
  modified:
    - mobile/src/components/FocusScreen/FocusSetupScreen.jsx
key-decisions:
  - "TaskList.jsx's doc comment avoids the literal words 'delete' and 'remove' anywhere in the file (including comments) because Task 1's own verify step greps the component file for `delete|remove` case-insensitively to guard against a destructive behavior change slipping in — a docstring explaining why no delete/remove capability exists would otherwise trip its own guard. Phrased instead as 'no other interaction exists on this row, and this extraction adds none.'"
  - "Prop names for SoundPicker (`soundOptions`/`sound`/`onSelectSound`) and BackgroundPicker (`backgrounds`/`background`/`onSelectBackground`) mirror the orchestration hook's own field names for the collection and current-value props, matching the established convention from DurationPicker (`presets`/`preset`/`onSelectPreset`) and GoalPicker (`sessionGoal`/`onSelectGoal`) in 02-06 — not a new naming scheme."
  - "Added `testID={swatch-<id>}` to BackgroundPicker's swatches (not present in the original inline JSX) purely so the interaction test can assert on the resolved border style directly — the swatch's selection indicator is a border-width change on the touchable itself, with no distinguishing text content a query could target the way chip/preset active-state assertions target their inner Text color. This has no runtime or visual effect; verified via `npm run check` and the unmodified FocusSetupScreen.test.jsx staying green."
patterns-established:
  - "Style-assertion testID pattern: when a component's active-state indicator lives on a non-text style property (border, background) with no text-content proxy, add a minimal testID scoped to that element only, rather than reaching for snapshot testing or fragile tree-walking (`.parent`) to locate the styled node."
requirements-completed: [FOCUS-03, FOCUS-05]
coverage:
  - id: D1
    description: "TaskInput extracted with the blank/whitespace-only Add-affordance boundary and the single-line (no multiline/no line-limit) field preserved"
    requirement: FOCUS-03
    verification:
      - kind: unit
        ref: "mobile/src/components/FocusScreen/__tests__/TaskInput.test.jsx#all 7 tests"
        status: pass
    human_judgment: false
  - id: D2
    description: "TaskList extracted with toggle-only trailing control (no remove/delete prop), row ordering, and empty/one/many list edges pinned"
    requirement: FOCUS-03
    verification:
      - kind: unit
        ref: "mobile/src/components/FocusScreen/__tests__/TaskList.test.jsx#all 4 tests"
        status: pass
      - kind: manual
        ref: "grep -cEi 'delete|remove' TaskList.jsx == 0"
        status: pass
    human_judgment: false
  - id: D3
    description: "SoundPicker and BackgroundPicker extracted with id-based active-state comparisons, the off-option-is-normal boundary, and the border-width selection indicator preserved exactly"
    requirement: FOCUS-05
    verification:
      - kind: unit
        ref: "mobile/src/components/FocusScreen/__tests__/SoundPicker.test.jsx#all 4 tests"
        status: pass
      - kind: unit
        ref: "mobile/src/components/FocusScreen/__tests__/BackgroundPicker.test.jsx#all 3 tests"
        status: pass
    human_judgment: false
  - id: D4
    description: "FocusSetupScreen recomposed to render all four extracted components and holds no option-section JSX at all; pre-existing FocusSetupScreen.test.jsx unmodified and green"
    requirement: FOCUS-03
    verification:
      - kind: unit
        ref: "mobile/src/components/FocusScreen/__tests__/FocusSetupScreen.test.jsx#all 21 tests (unmodified)"
        status: pass
      - kind: manual
        ref: "git diff --stat on FocusSetupScreen.test.jsx returns empty (UNCHANGED); npm --prefix mobile test -- src/components/FocusScreen reports 18 suites / 117 tests; npm --prefix mobile run check exits 0"
        status: pass
    human_judgment: false
duration: 25min
completed: 2026-09-15
status: complete
---

# Phase 02 Plan 07: Extract TaskInput, TaskList, SoundPicker, BackgroundPicker Summary

**Split FocusSetupScreen's last four inline sections — task entry, task rows, background sound, and scene — into named, interaction-tested components, completing FOCUS-03's decomposition with zero rendered-output change.**

## Performance
- **Duration:** ~25min
- **Started:** 2026-09-15T00:15:00Z (approx)
- **Completed:** 2026-09-15T00:40:00Z (approx)
- **Tasks:** 3
- **Files modified:** 9 (4 created components, 4 created test files, 1 modified container)

## Accomplishments
- `TaskInput` extracted with the exact blank/whitespace-only Add-affordance boundary (a trimmed-length check on the display value only, kept separate from the storage-side trim in `useFocusSession`'s `addTodo`) and the single-line field with no multiline flag or line-count limit.
- `TaskList` extracted with the toggle-only trailing control preserved byte-for-byte (the "✕" glyph reads like a dismissal but its handler only toggles `done` — no remove/delete prop exists on the component at all), plus the empty/one/many and ordering edges from FOCUS-05 and 02-UI-SPEC.md.
- `SoundPicker` and `BackgroundPicker` extracted mirroring `SubjectPicker`'s chip markup rather than generalizing a shared factory; the off-sound option selects and highlights with no special casing, and the scene swatch's border-width selection indicator (not a background-color change) is preserved exactly.
- `FocusSetupScreen` recomposed to render all seven extracted components (three from 02-06, four from this plan); its pre-existing interaction-test suite (`FocusSetupScreen.test.jsx`, written by plan 02-04) was not touched and all 21 of its tests still pass. The container now holds zero option-section JSX — the last of the four style-key groups (`chips`/`chip`/`chipEmoji`/`chipText`, `todoInputRow`/`todoInputField`/`todoAddBtn`/`todoAddBtnText`/`todoRow`/`todoCheck`/`todoText`, `bgRow`/`bgSwatch`, and `sectionLabel`) were deleted from its `makeStyles`, since every consumer now carries its own local copy.
- All four new components have interaction tests asserting handler arguments (not just call counts) per D-01/D-02, including negative active-state cases and the toggle-not-a-remove boundary.
- Full suite verification: `npm --prefix mobile test -- src/components/FocusScreen` reports 18 suites / 117 tests passing; `npm --prefix mobile run check` exits 0 across the whole mobile app (43 suites / 475 tests).

## Task Commits
1. **Task 1: Extract TaskInput and TaskList** - `486b692d` (feat)
2. **Task 2: Extract SoundPicker and BackgroundPicker** - `96a9d187` (feat)
3. **Task 3: Recompose the remaining sections of FocusSetupScreen** - `222a30ce` (refactor)

## Files Created/Modified
- `mobile/src/components/FocusScreen/TaskInput.jsx` - task-entry label, bordered field, conditional Add affordance (65 lines)
- `mobile/src/components/FocusScreen/TaskList.jsx` - setup-phase task rows with toggle-only trailing control (57 lines)
- `mobile/src/components/FocusScreen/SoundPicker.jsx` - background-sound chip row (64 lines)
- `mobile/src/components/FocusScreen/BackgroundPicker.jsx` - scene swatch row with border-width selection indicator (61 lines)
- `mobile/src/components/FocusScreen/__tests__/TaskInput.test.jsx` - 7 interaction tests
- `mobile/src/components/FocusScreen/__tests__/TaskList.test.jsx` - 4 interaction tests
- `mobile/src/components/FocusScreen/__tests__/SoundPicker.test.jsx` - 4 interaction tests
- `mobile/src/components/FocusScreen/__tests__/BackgroundPicker.test.jsx` - 3 interaction tests
- `mobile/src/components/FocusScreen/FocusSetupScreen.jsx` - now composes all seven extracted pickers/inputs; removed the last four style-key groups (`chips`/`chip`/`chipEmoji`/`chipText`, `todoInputRow`*/`todoRow`/`todoCheck`/`todoText`, `bgRow`/`bgSwatch`, `sectionLabel`); removed unused `TextInput` import; final size 192 lines (down from a much larger inline container across the phase)

## Final Prop Lists
- `TaskInput({ value, onChangeText, onAdd })`
- `TaskList({ tasks, onToggle })` — no remove/delete prop
- `SoundPicker({ soundOptions, sound, onSelectSound })`
- `BackgroundPicker({ backgrounds, background, onSelectBackground })`

## Final Container Line Counts
- `FocusSetupScreen.jsx`: 192 lines (chrome + composition only, no option-section JSX)
- `FocusActiveScreen.jsx`: 141 lines (reference, unchanged by this plan)
- `FocusDoneScreen.jsx`: 117 lines (reference, unchanged by this plan)

## Decisions Made
- Kept the words "delete" and "remove" entirely out of `TaskList.jsx` (including its doc comment) because Task 1's own verify step case-insensitively greps that exact file for those words as a guard against a destructive behavior change. A docstring explaining "no delete capability exists" would otherwise trip its own guard — documented as the docstring-word-collision pattern flagged going into this plan.
- Named `SoundPicker`/`BackgroundPicker` props after the orchestration hook's own field names for the collection and current value (`soundOptions`/`sound`, `backgrounds`/`background`), matching the convention 02-06 already established with `DurationPicker`'s `presets`/`preset` and `GoalPicker`'s `sessionGoal` — not a new naming scheme for this plan to invent.
- Added `testID={swatch-<id>}` to `BackgroundPicker`'s swatches, which the original inline JSX did not have. This was needed because the swatch's active-state indicator is a border-width/border-color change on the touchable itself (unlike chip/preset pickers, where the indicator is a text-color change on inner `Text` that can be queried by label). No user-visible or behavioral effect; `FocusSetupScreen.test.jsx` (which renders the same swatches with the same props) stayed green and unmodified, confirming no rendered-output change.

## Deviations from Plan
None - plan executed exactly as written. The `testID` addition above is documented as a decision, not a deviation, since it's purely a testability aid with no user-facing or behavioral effect and the plan's own prohibitions target visual/behavioral changes, not test instrumentation.

## Issues Encountered
None. No checkpoints were hit; no auth gates arose; no discrepancy was found during the move (styles, copy, and handler wiring for all four sections carried over verbatim from the pre-plan `FocusSetupScreen.jsx`).

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
FOCUS-03 is now fully satisfied: every part of `FocusScreen`'s UI lives in a named sub-component under `components/FocusScreen/`. Plan 02-08 (phase close) depends on this plan plus 02-03 and 02-05 — all three are now complete, so 02-08 can proceed to close out Phase 2's decomposition work (final verification pass, any remaining documentation/handoff artifacts). No blockers or open discrepancies are being carried forward from this plan.

## Self-Check: PASSED

All 8 created files and the 1 modified file confirmed present on disk. All 3 commits (`486b692d`, `96a9d187`, `222a30ce`) confirmed present in `git log`.

---
*Phase: 02-focusscreen-decomposition*
*Completed: 2026-09-15*
