# Phase 3: FriendsScreen Decomposition - Context

**Gathered:** 2026-09-15
**Status:** Ready for planning

<domain>
## Phase Boundary

Extract `FriendsScreen.jsx` (`mobile/src/screens/FriendsScreen.jsx`, 987 lines) into a single
`useFriendsScreenState` orchestration hook plus named sub-components under
`mobile/src/components/FriendsScreen/`, with **no behavior or visual changes** (pure structural
refactor). This is the second screen through the extraction template Phase 2 established — the
goal is to validate that template on a screen with materially more composition complexity (5
existing domain hooks vs. Phase 2's 1) before it's applied to QuizScreen and HomeScreen.

Requirements in scope: FRIENDS-01 through FRIENDS-06 (REQUIREMENTS.md). New features, UI changes,
or fixes to unrelated screens are out of scope per PROJECT.md.

</domain>

<decisions>
## Implementation Decisions

All three presented gray areas were selected for discussion. Test-depth split (D-01/D-02 pattern)
and characterization-notes format carry forward unchanged from Phase 2's locked precedent — not
re-discussed.

### Hook Composition Scope

- **D-01:** `useFriendsScreenState` absorbs the screen's cross-hook orchestration, not just the 5
  domain hooks' data. It calls `useFriends`, `useChallenges`, `useLeaderboard`,
  `useFriendsLeaderboard`, and `useLeague`, AND owns `handleRefresh` (the `Promise.all` across all
  7 refresh calls), `confirmRemoveFriend` (the `Alert.alert` confirm-then-remove flow), and
  `navigateToProfile`. `FriendsScreen.jsx` becomes a pure render-from-state consumer with zero
  local functions, matching Phase 2's `useFocusScreenState` precedent. — **Reversibility:**
  reversible — this is an internal hook-boundary choice; moving a handler back into the screen
  later touches only the hook and the screen, no public contract.
- **D-02:** The hook's return value is a single **flat object** (all fields at the top level, e.g.
  `{ friends, incomingRequests, leaderboard, tier, ... }`), not namespaced by domain
  (`{ friends: {...}, leaderboard: {...} }`). Matches Phase 2's flat-spread precedent
  (`{...state}` passed to sub-components).
- **D-03 (naming collision — locked, do not re-derive):** `loading` and `refresh` are returned by
  3-4 of the 5 domain hooks (`useLeaderboard`, `useFriendsLeaderboard`, `useLeague`, and
  `useChallenges` for `refresh`). The **existing screen already resolves this today** via
  destructure-renaming at the call site:
  - `useLeaderboard()` → `loading: schoolLoading`, `refresh: refreshSchool`
  - `useFriendsLeaderboard()` → `loading: weekLoading`, `refresh: refreshWeekly`
  - `useLeague()` → `refresh: refreshLeague` (also returns `loading`, unrenamed today since the
    screen doesn't currently consume League's own loading flag by that name — check actual usage
    during extraction)
  - `useChallenges()` → `refresh: refreshBattles`

  **`useFriendsScreenState` MUST preserve these exact existing names.** This is a zero-behavior-risk
  constraint, not a stylistic preference — do not invent new names during extraction.
  — **Reversibility:** costly — renaming later means touching every sub-component that destructures
  these fields; locking the names now avoids a second migration.

### Sub-Component Boundaries

- **D-04:** Split by **tab**, one container per tab: `LeaderboardTab`, `FriendsTab`, `BattlesTab`,
  `ActivityTab` as the four top-level containers under `components/FriendsScreen/`, mirroring
  Phase 2's Setup/Active/Done split (by screen-state, not by generic widget category). Each tab
  container then composes smaller widgets internally (e.g. `LeaderboardTab` renders the
  friends/school/league mode toggle, `Podium`, and `RankRow` list).
- **D-05:** The three already-extracted module-local components (`Avatar`, `Podium`, `RankRow` —
  currently function declarations inside `FriendsScreen.jsx`) relocate **verbatim** into their own
  files under `components/FriendsScreen/`, same pattern as Phase 2's `BigPetDisplay`. No logic
  changes to `Podium`'s staggered `Animated.sequence`/`Animated.stagger` reveal timing — this is a
  file-boundary move only. The existing threat-model precedent (cleanup-on-unmount must survive
  relocation) covers the applicable risk class; no additional scrutiny task beyond the standard
  interaction/render test is required.
- **D-06 (found during discussion — logged as deferred, not fixed):** `Avatar` is duplicated
  byte-for-byte in `mobile/src/screens/LeagueScreen.jsx` (confirmed via diff — identical signature,
  identical JSX, identical `avatarColor(name)` call). `LeagueScreen.jsx` is **not** one of the 4
  screens in this refactor's scope. `FriendsScreen`'s copy relocates to
  `components/FriendsScreen/Avatar.jsx` as its own scoped file; `LeagueScreen.jsx`'s copy is
  untouched. See Deferred Ideas below — do not promote to a shared component during this phase.

### Tab / Leaderboard-Segment State Ownership

- **D-07:** `tab` (which of the 4 tabs is active), `lbMode` (`'friends' | 'school' | 'league'`),
  and `podiumKey` (the remount-to-replay-animation counter) all live in `useFriendsScreenState`
  alongside the domain data — not as local `useState` in the screen component. This is consistent
  with D-01 (hook absorbs orchestration): the screen has zero local state of any kind, matching
  Phase 2's `FocusScreen.jsx` (zero local state today, post-extraction). The initial `tab` value
  still derives from `route?.params?.initialTab ?? 'Leaderboard'` — the hook needs `route` as an
  input alongside `navigation` to preserve this; confirm the exact signature against actual code
  during planning.

### Claude's Discretion

Not discussed — proceed using Phase 2's `02-EXTRACTION-TEMPLATE.md` as the primary grounding
source, and the same codebase conventions used there:

- **Characterization notes format (FRIENDS-01)** — same convention as Phase 2's
  `02-CHARACTERIZATION.md`: a markdown doc in the phase directory
  (`03-CHARACTERIZATION.md`), depth "enough to verify FRIENDS-06 parity against." Must explicitly
  cover the leaderboard-segment-toggle (friends/school/league) and friend-request accept/block
  flows per FRIENDS-01's own wording, plus the battle-challenge accept flow and the four-tab
  structure.
- **Sub-component test depth (FRIENDS-05)** — Phase 2's D-01 convention carries forward unchanged:
  split by interactivity (any callback prop → interaction test; zero callback props → render/snapshot
  only), not by whether the component holds local state.
- **Within-tab widget naming** — e.g. whether the friend-request banner, incoming-battle banner,
  friend-code banner, and individual `FriendCard`/`RequestRow`/`BattleRow`/`ActivityRow` rows get
  their own files or stay inline inside their tab container — left to planner/executor judgment
  against `02-EXTRACTION-TEMPLATE.md`'s component-boundary guidance and the existing internal
  structure already visible in `FriendsScreen.jsx`'s JSX comments (`{/* Pending requests */}`,
  `{/* Incoming battle challenges */}`, `{/* Friend code + add friend */}`, etc.).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Extraction template (from Phase 2 — the primary source for HOW)
- `.planning/phases/02-focusscreen-decomposition/02-EXTRACTION-TEMPLATE.md` — the proven recipe
  this phase validates on a second, more complex screen: hook-composition precedent, component-
  boundary judgment calls, D-01 test-tier gates, known traps (including a `sectionLabel`
  name-collision class directly relevant to this phase's own `loading`/`refresh` collision above)
- `.planning/phases/02-focusscreen-decomposition/02-CHARACTERIZATION.md` — format precedent for
  this phase's `03-CHARACTERIZATION.md`
- `.planning/phases/02-focusscreen-decomposition/02-01-SUMMARY.md` through `02-08-SUMMARY.md` —
  worked examples of the hook-composition and component-extraction decisions above, in practice

### Codebase maps
- `.planning/codebase/ARCHITECTURE.md` — "screens are thin, hooks own logic" pattern this phase
  restores
- `.planning/codebase/CONCERNS.md` — FriendsScreen named explicitly as one of the 4
  oversized/mixed screens
- `.planning/codebase/CONVENTIONS.md` — naming/style conventions (PascalCase components, camelCase
  `use`-prefixed hooks, named exports for hooks/utils)
- `.planning/codebase/TESTING.md` — existing Jest/RNTL testing patterns to follow

### Project-level
- `.planning/PROJECT.md` — behavior/UI-change constraint, out-of-scope rule (no refactoring of
  screens outside the 4 flagged, directly relevant to the Avatar/LeagueScreen deferral above), git
  workflow constraint (mobile-only commits, `npm run check` before commit, ask before pushing
  `master`)
- `.planning/REQUIREMENTS.md` — FRIENDS-01 through FRIENDS-06 full requirement text
- `CLAUDE.md` (repo root) — never bulk-rename with `sed -i` across `mobile/src`; per-file edits only

No other external specs/ADRs — requirements fully captured in REQUIREMENTS.md and this document.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `useFriends`, `useChallenges`, `useLeaderboard`, `useFriendsLeaderboard`, `useLeague`
  (`mobile/src/hooks/`) — five existing domain hooks (296/124/76/83/259 lines respectively,
  ~838 total) FriendsScreen already calls; `useFriendsScreenState` composes all five per D-01
- `T` (typography), `cardShadow` (`mobile/src/styles/duo.js`) — already imported and used by
  FriendsScreen today (unlike FocusScreen in Phase 2, which had its own local flat-style
  conventions) — preserve exactly as used, do not silently swap or extend usage
- `TIER_META` (`mobile/src/hooks/useLeague.js`) — league tier metadata (emoji, etc.) already
  imported; reuse unchanged

### Established Patterns
- "Screens are thin" — screens call hooks and render from returned state; this phase's D-01/D-07
  decisions push FriendsScreen fully into this pattern (zero local state, zero local functions)
- Module-local sub-components already exist inside the screen file itself (`Avatar`, `Podium`,
  `RankRow`) — this is the SAME starting shape Phase 2 had with its module-local `BigPet`, so the
  D-05 verbatim-relocation approach is directly precedented
- Test conventions: `*.test.js`/`*.test.jsx` co-located under `__tests__/`, RNTL v14
  `render()`/`renderHook()` (per Phase 1's completed test-infrastructure work)

### Integration Points
- `FriendsScreen.jsx` is the sole call site being modified; navigation entry point and
  `route?.params?.initialTab` contract unchanged
- New files land under `mobile/src/components/FriendsScreen/` (components) and
  `mobile/src/hooks/useFriendsScreenState.js` (the new orchestration hook), matching Phase 2's
  directory conventions
- `navigation.navigate('UserProfile', ...)`, `navigation.navigate('Challenge', ...)`,
  `navigation.navigate('AddFriend', ...)` — three distinct navigation targets called from within
  the screen today; all three move into the hook per D-01 (`navigateToProfile`) or stay as direct
  `navigation.navigate` calls passed through from the hook's returned handlers — confirm exact
  shape during planning
- `useFocusEffect(useCallback(() => { refreshSchool() }, [refreshSchool]))` — existing
  focus-triggered refresh; this effect moves into the hook along with `refreshSchool` per D-01

</code_context>

<specifics>
## Specific Ideas

No specific UI/behavior requests beyond parity. The concrete decisions from discussion are the
hook-composition shape (D-01/D-02/D-03), the by-tab component split with verbatim animation
relocation (D-04/D-05), the deferred Avatar duplication (D-06), and hook-owns-all-state (D-07).

</specifics>

<deferred>
## Deferred Ideas

- **Avatar component duplication** — `Avatar` (initial-letter circle) is byte-for-byte identical
  in `FriendsScreen.jsx` and `LeagueScreen.jsx`. `LeagueScreen.jsx` is outside this refactor's
  4-screen scope, so this phase keeps `FriendsScreen`'s copy scoped to
  `components/FriendsScreen/Avatar.jsx` rather than promoting a shared version. A future cleanup
  pass (not part of this initiative) could unify both into a single shared
  `components/Avatar.jsx`.

None — discussion otherwise stayed within phase scope. No todos matched this phase
(`todo.match-phase` returned zero matches).

</deferred>

---

*Phase: 3-friendsscreen-decomposition*
*Context gathered: 2026-09-15*
