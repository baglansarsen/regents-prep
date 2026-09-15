# Phase 2: FocusScreen Decomposition - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-09-14
**Phase:** 2-focusscreen-decomposition
**Areas discussed:** Sub-component test depth

---

## Area Selection

Four candidate gray areas were presented: Sub-component boundaries, Characterization notes format,
Hook composition with `useFocusSession`, Sub-component test depth. Only **Sub-component test
depth** was selected for discussion; the other three were left to Claude's discretion.

## Sub-Component Test Depth

**Question 1:** "FOCUS-05 requires a render/snapshot test per extracted sub-component. What's the
split criterion for how deep those tests go?"

| Option | Description | Selected |
|--------|-------------|----------|
| Stateful gets interaction, presentational gets snapshot (Recommended) | Components with local state/handlers get interaction tests; pure-display components get render/snapshot only | ✓ |
| All sub-components get interaction tests | Every component, even presentational ones, gets fireEvent tests | |
| All sub-components get snapshot/render only | Minimal — all behavior coverage lives in hook tests | |

**User's choice:** Stateful gets interaction, presentational gets snapshot (Recommended)

**Question 2 (follow-up):** "Define 'stateful' precisely for that split. Most FocusScreen
sub-components will just receive props + an onPress/onChange callback and call it — they won't
hold their own useState. Does that count as 'stateful' (interaction-tested) or 'presentational'
(snapshot-only)?"

| Option | Description | Selected |
|--------|-------------|----------|
| Any interactive callback counts as stateful (Recommended) | A component that fires onPress/onChange/onSubmit etc. gets an interaction test, even with no local useState | ✓ |
| Only local useState/useReducer counts as stateful | Only components managing their own internal state get interaction tests; callback-forwarders get snapshot-only | |

**User's choice:** Any interactive callback counts as stateful (Recommended)

**Notes:** The refined definition means most FocusScreen sub-components (which mostly forward
callback props rather than hold local state) will end up interaction-tested; only genuinely static
display pieces (no callback props at all) get snapshot-only tests. Rationale surfaced during
discussion: the main parity-break risk during extraction is "wrong prop wired to wrong handler,"
which only an interaction test catches — relying solely on `useFocusScreenState` hook tests
(FOCUS-04) to catch that class of bug was deemed insufficient.

---

## Claude's Discretion

- **Sub-component boundaries** — how to split FocusScreen into named components (by screen state
  vs. by widget). Not discussed; left to planner/executor, grounded in the codebase's existing
  internal structure.
- **Characterization notes format (FOCUS-01)** — form/location of pre-extraction behavior notes.
  Not discussed; a markdown doc in the phase directory is the assumed default given this project's
  existing `*-{ARTIFACT}.md` phase-directory convention.
- **Hook composition with `useFocusSession`** — whether `useFocusScreenState` wraps or absorbs the
  existing `useFocusSession` hook. Not discussed; left to planner/executor to decide against actual
  code shape.

## Deferred Ideas

None — discussion stayed within phase scope. No pending todos matched this phase.
