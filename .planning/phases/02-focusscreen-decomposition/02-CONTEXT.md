# Phase 2: FocusScreen Decomposition - Context

**Gathered:** 2026-09-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Extract `FocusScreen.jsx` (`mobile/src/screens/FocusScreen.jsx`, 908 lines) into a single
`useFocusScreenState` orchestration hook plus named sub-components under
`mobile/src/components/FocusScreen/`, with **no behavior or visual changes** (pure structural
refactor). This phase also **sets the extraction template** the next three screen phases
(FriendsScreen, QuizScreen, HomeScreen) will copy, so decisions here about component boundaries,
characterization-note format, and hook composition carry precedent weight beyond this phase alone.

Requirements in scope: FOCUS-01 through FOCUS-06 (REQUIREMENTS.md). New features, UI changes, or
fixes to unrelated screens are out of scope per PROJECT.md.

</domain>

<decisions>
## Implementation Decisions

Only one gray area was selected for discussion (sub-component test depth); the other three
presented areas (sub-component boundaries, characterization-notes format, hook composition with
`useFocusSession`) were left to Claude's discretion — see below.

### Sub-Component Test Depth (FOCUS-05)

- **D-01:** The test-depth split is by **interactivity, not local state**: a sub-component that
  fires any callback prop (`onPress`, `onChange`, `onSubmit`, etc.) gets an interaction test
  (fireEvent + assert the callback was called with correct args) — even if it holds no local
  `useState`/`useReducer`. A component with zero callback props (pure display, e.g. a stat value
  or a static label) gets render/snapshot only. — **Reversibility:** reversible — this is a test
  authoring convention, not a code structure; changing it later just means adding/removing test
  files.
- **D-02:** Rationale (from discussion): most of FocusScreen's sub-components will be thin
  prop-forwarding wrappers around a callback (no local state of their own), and the main
  parity-break risk during extraction is "wrong prop wired to wrong handler" — which only an
  interaction test catches. Relying on the `useFocusScreenState` hook tests (FOCUS-04) alone to
  catch that class of bug was explicitly rejected as insufficient.

### Claude's Discretion

The user did not select these areas for discussion — proceed using codebase conventions and the
approved UI-SPEC (`02-UI-SPEC.md`) as the grounding source, and document the actual choice made in
`02-SUMMARY.md` / `02-LEARNINGS.md` at phase close since it sets precedent for Phases 3-5:

- **Sub-component boundaries** — how to split FocusScreen's ~900 lines into named components
  (e.g. by screen state: Setup/Active/Done views, vs. by widget: `TodoList`, `PresetPicker`,
  `GoalCelebrationModal`, `TimerControls`). Ground the split in the existing internal structure
  already visible in `FocusScreen.jsx`'s `makeStyles()` groupings and JSX comments rather than
  inventing a new taxonomy.
- **Characterization notes format (FOCUS-01)** — form and location of pre-extraction notes on
  filter/search/empty-category behavior. A markdown doc in the phase directory
  (`02-CHARACTERIZATION.md` or similar) is the natural default given this project's existing
  `*-{ARTIFACT}.md` phase-directory convention; depth should be "enough to verify FOCUS-06 parity
  against," not exhaustive prose.
- **Hook composition with `useFocusSession`** — FocusScreen already calls an existing
  `useFocusSession` hook (`mobile/src/hooks/useFocusSession.js`). Whether `useFocusScreenState`
  wraps/composes it or absorbs its logic is left to the planner/executor to decide against actual
  code shape. Note the naming-precedent risk already flagged in STATE.md for Phase 4
  (`useQuizState` vs. existing `useQuiz`) — the same collision-avoidance care applies here
  (`useFocusScreenState` vs. existing `useFocusSession`); names are already distinct enough that no
  disambiguation action is expected, but keep it in mind if the hook composition merges the two.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design contract
- `.planning/phases/02-focusscreen-decomposition/02-UI-SPEC.md` — approved parity-lock UI design
  contract (spacing/typography/color/copy transcribed from the shipped screen); planner must treat
  this as the visual/interaction source of truth, not `FocusScreen.jsx` prose description

### Codebase maps
- `.planning/codebase/ARCHITECTURE.md` — "screens are thin, hooks own logic" pattern this phase
  restores
- `.planning/codebase/CONCERNS.md` — FocusScreen named explicitly as one of the 4 oversized/mixed
  screens; documents the general fix approach (extract sub-components + hooks) and the "no
  screen-level tests" fragility this phase's FOCUS-04/FOCUS-05 close
- `.planning/codebase/CONVENTIONS.md` — naming/style conventions (PascalCase components, camelCase
  `use`-prefixed hooks, named exports for hooks/utils)
- `.planning/codebase/TESTING.md` — existing Jest/RNTL testing patterns to follow

### Project-level
- `.planning/PROJECT.md` — behavior/UI-change constraint, git workflow constraint (mobile-only
  commits, `npm run check` before commit, ask before pushing `master`)
- `.planning/REQUIREMENTS.md` — FOCUS-01 through FOCUS-06 full requirement text
- `CLAUDE.md` (repo root) — never bulk-rename with `sed -i` across `mobile/src`; per-file edits only

No other external specs/ADRs — requirements fully captured in REQUIREMENTS.md and the UI-SPEC above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `FocusTimerRing`, `StudyBuddyCompanion`, `RiveDemo` (`mobile/src/components/`) — already-extracted
  shared components FocusScreen consumes as-is; reuse unchanged, do not re-implement
- `T` (typography), `duoBtn`/`duoBtnOutline`/`cardShadow`/`elevatedCard`/`pillTab`/`sectionLabel`
  (`mobile/src/styles/duo.js`) — project's internal hand-authored design-system helpers.
  **Important:** FocusScreen currently does NOT use the button/card/pill factories (it has its own
  local flat-style conventions) — do not silently swap them in during extraction, that would be a
  visual change (see UI-SPEC Component Inventory)
- `useFocusSession` (`mobile/src/hooks/useFocusSession.js`) — existing domain hook FocusScreen
  already calls; composition approach with the new `useFocusScreenState` is a planner/executor
  decision (see Claude's Discretion above)

### Established Patterns
- "Screens are thin" — screens call hooks and render from returned state; hooks own business logic
  + Firestore access (never hook-to-hook calls) — this is the pattern being restored
- Platform variants: `.web.jsx` overrides `.jsx` for web builds. **Checked and confirmed clear for
  this phase:** none of FocusScreen's shared dependencies (`FocusTimerRing`, `StudyBuddyCompanion`,
  `RiveDemo`) have a `.web.jsx` variant — the platform-variant risk flagged generically in
  STATE.md's Blockers/Concerns does not apply to Phase 2's specific dependency set
- Test conventions: `*.test.js` co-located under `__tests__/`, RNTL v14 `render()`/`renderHook()`
  (per Phase 1's completed test-infrastructure work) — no `@testing-library/jest-native` or
  `react-test-renderer` available anymore

### Integration Points
- `FocusScreen.jsx` is the sole call site being modified; navigation entry point unchanged
- New files land under `mobile/src/components/FocusScreen/` (components) and presumably
  `mobile/src/hooks/` (the new `useFocusScreenState` hook), matching existing directory conventions

</code_context>

<specifics>
## Specific Ideas

No specific UI/behavior requests beyond parity — the UI-SPEC (`02-UI-SPEC.md`) is the transcribed
source of truth for every visual/copy value. The one concrete decision from discussion (D-01/D-02
above) is the test-depth split by interactivity.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope. No todos matched this phase (`todo.match-phase`
returned zero matches).

</deferred>

---

*Phase: 2-focusscreen-decomposition*
*Context gathered: 2026-09-14*
