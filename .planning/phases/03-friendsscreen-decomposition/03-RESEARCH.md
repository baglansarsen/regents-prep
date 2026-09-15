# Phase 3: FriendsScreen Decomposition - Research

**Researched:** 2026-09-15
**Domain:** React Native (Expo/RN 0.81) screen decomposition — orchestration hook + sub-component
extraction, structure-only refactor, second application of Phase 2's extraction template.
**Confidence:** HIGH (all findings below are grounded in this session's direct reads of
`FriendsScreen.jsx`, the 5 domain hooks, the installed `@react-navigation/core` source, the
installed `@testing-library/react-native` source, Phase 2's committed test files, and
`.planning/codebase/CONCERNS.md`.)

## Summary

This phase decomposes `FriendsScreen.jsx` (987 lines) using the exact recipe
`02-EXTRACTION-TEMPLATE.md` established: characterization notes first, then an orchestration hook
that absorbs all local state/handlers/effects, then one container per render branch (here, per
tab), then widget splits within each container, then a mechanical phase-close audit. CONTEXT.md
has already locked the hook-composition shape (D-01/D-02/D-03), the by-tab component split
(D-04/D-05/D-06), and state ownership (D-07) — this research does not re-derive those. It focuses
on the five things CONTEXT.md flagged as genuinely new relative to Phase 2: testing the Podium's
staggered `Animated` sequence, moving a `useFocusEffect` call into a custom hook (and testing that),
the mocking boundary for a hook that composes 5 pre-existing domain hooks instead of 1, and
plan/wave sizing for a larger screen.

The single highest-impact finding: **all five domain hooks (`useFriends`, `useChallenges`,
`useLeaderboard`, `useFriendsLeaderboard`, `useLeague`) import `firebase/firestore` directly at
module top level** (not just inside a deferred call, the way Phase 2's `useFocusSession` did for
`logActivity`). This means merely importing `useFriendsScreenState.js` in a test — without calling
or exercising any of the five hooks — will crash Jest with the same `SyntaxError: Unexpected token
'export'` Phase 2 hit once (Trap 9), unless each domain hook is `jest.mock`-ed at the module level.
Phase 2's precedent of "wrap the domain hook, don't mock it, exercise it for real" does not
directly transfer here: doing that for one hook cost one scoped mock (`activityLogger`); doing it
for five would mean re-implementing ~13 named Firestore exports behind a hand-rolled mock with
per-collection-path branching. **Recommendation: mock all 5 domain hook modules directly in
`useFriendsScreenState.test.js`**, returning fixture data shaped like each hook's real return
object. This is also the requirements-correct scope: FRIENDS-04 covers hooks "extracted from
FriendsScreen" (the new orchestration hook), not the 5 pre-existing domain hooks Phase 3 wraps
unchanged — Phase 2 set this precedent by not writing a new test file for `useFocusSession` either.

**Primary recommendation:** Mock the 5 domain hooks (not `firebase/firestore` wholesale) in
`useFriendsScreenState.test.js`; mock `@react-navigation/native`'s `useFocusEffect` per-file
(consistent with this codebase's existing per-file context-mocking convention) rather than standing
up React Navigation's official `createTestStackNavigator` test harness, since this phase is a
structure-only refactor and is not adding new focus-behavior coverage; test `Podium`/`RankRow`
exactly like Phase 2 tested `BigPetDisplay` — render/interact against static output, never assert
on `Animated.Value` internals directly, because the existing precedent test does not and passes
cleanly with real `Animated.sequence`/`stagger`/`spring` calls untouched.

## Architectural Responsibility Map

This is a mobile-only RN app (no SSR/CDN tier); tiers are adapted accordingly.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Tab/leaderboard-segment UI state (`tab`, `lbMode`, `podiumKey`) | Orchestration Hook (`useFriendsScreenState`) | — | D-07 locks this; screen becomes zero-local-state, matching Phase 2's `FocusScreen` |
| Cross-hook refresh orchestration (`handleRefresh`'s `Promise.all`) | Orchestration Hook | — | D-01 locks this; screen currently owns it, moves unchanged |
| Friend-request accept/decline, remove-friend confirm | Orchestration Hook (`confirmRemoveFriend`) / Domain Hook (`useFriends`) | — | Alert-flow orchestration moves to the new hook (D-01); the actual Firestore write (`removeFriend`) stays in `useFriends`, untouched |
| Podium/RankRow reveal animation | Sub-component (`Podium`, `RankRow`) | — | D-05 locks verbatim relocation; animation logic is component-local `Animated.Value` state, not hook state |
| Firestore reads/writes (friends, requests, challenges, leaderboard, league) | Domain Hooks (`useFriends`, `useChallenges`, `useLeaderboard`, `useFriendsLeaderboard`, `useLeague`) | Firestore (Persistence) | Unchanged — "wrap, don't absorb" precedent from Phase 2 applies identically here; 0-line diff expected on all 5 files |
| Screen-focus-triggered school-leaderboard refresh | Orchestration Hook (via `useFocusEffect`) | Navigation (React Navigation context) | Moves into the hook per D-01/code_context; internally still resolves `navigation` via React Navigation's own context, independent of the `navigation` prop passed into the hook (see Pitfall 2 below) |
| Navigation calls (`navigateToProfile`, `Challenge`, `AddFriend`, `SchoolPicker`, `League`) | Orchestration Hook (named handlers) / passthrough | — | Confirm which navigate calls become named hook handlers vs. stay as direct `navigation.navigate` passed through — see "Navigation handler shape" below |

## Package Legitimacy Audit

**Not applicable — this phase installs no new packages.** All libraries used (`react`,
`react-native`, `@react-navigation/native` `^6.1.18`, `@testing-library/react-native` `14.0.1`,
`jest` `^29.7.0`) are already installed dependencies, confirmed in `mobile/package.json` and
`mobile/node_modules/`. No `npm install` step belongs in this phase's plans.

## Standard Stack

No new stack — this phase reuses the exact installed versions already in the repo, confirmed by
direct read of `mobile/package.json` and `mobile/node_modules/*/package.json`:

| Library | Version | Purpose | Provenance |
|---------|---------|---------|------------|
| `@testing-library/react-native` | 14.0.1 | `render`, `renderHook`, `fireEvent`, `screen` | [VERIFIED: mobile/node_modules/@testing-library/react-native/package.json] |
| `@react-navigation/native` | 6.1.18 | `useFocusEffect`, `useNavigation` (re-exported from `@react-navigation/core`) | [VERIFIED: mobile/node_modules/@react-navigation/native/package.json, mobile/node_modules/@react-navigation/core/src/useFocusEffect.tsx] |
| `jest` | 29.7.0 (via `jest-expo` 54.0.18 preset) | Test runner | [VERIFIED: mobile/package.json:68-69] |
| `firebase` | 12.18.0 | Firestore client SDK — real ESM package, must be mocked per test file that transitively imports a domain hook | [VERIFIED: mobile/package.json:45, and Phase 2's own Trap 9] |

No installation commands needed for this phase.

## Architecture Patterns

### System Architecture Diagram

```
FriendsScreen.jsx (navigation, route props)
        │
        ▼
useFriendsScreenState(navigation, route)   ← new orchestration hook
        │
        ├─ calls useFriends(uid, user)            → Firestore: friends, requests, feed
        ├─ calls useChallenges(uid, user)          → Firestore: challenges
        ├─ calls useLeaderboard(uid, user)         → Firestore: leaderboard (school)
        ├─ calls useFriendsLeaderboard(uid, user)  → Firestore: leaderboard (friends, weekly)
        ├─ calls useLeague(uid)                    → Firestore: leaderboard (league tier)
        │
        ├─ useFocusEffect(→ refreshSchool)  ← re-reads school leaderboard on screen focus
        │        (internally resolves navigation via React Navigation context,
        │         independent of the `navigation` param passed into the hook)
        │
        ├─ handleRefresh() → Promise.all([7 refresh calls]) → bumps podiumKey
        ├─ confirmRemoveFriend(f) → Alert.alert → removeFriend(uid)
        ├─ navigateToProfile(entry) → navigation.navigate('UserProfile', ...)
        │
        └─ returns FLAT object: { tab, lbMode, podiumKey, friends, incomingRequests,
             weeklyRanking, leaderboard, school, schoolLoading, weekLoading, tier,
             leagueMembers, incomingBattles, completedBattles, feed, ...handlers }
                        │
                        ▼
        FriendsScreen.jsx renders from returned state only (zero local state, zero local functions)
                        │
        ┌───────────────┼────────────────┬────────────────┐
        ▼               ▼                ▼                ▼
  LeaderboardTab     FriendsTab       BattlesTab       ActivityTab
  (mode toggle,     (friend code,   (incoming/        (feed rows)
   Podium,          FriendCard      completed
   RankRow list,     rows)           battle rows)
   school/league
   sections)
        │
        ▼
  Avatar / Podium / RankRow  (relocated verbatim, module-local Animated logic untouched)
```

### Recommended Project Structure

```
mobile/src/
├── hooks/
│   └── useFriendsScreenState.js        # new orchestration hook
├── components/FriendsScreen/
│   ├── Avatar.jsx                      # relocated verbatim (D-05)
│   ├── Podium.jsx                      # relocated verbatim (D-05)
│   ├── RankRow.jsx                     # relocated verbatim (D-05)
│   ├── LeaderboardTab.jsx              # container (D-04)
│   ├── FriendsTab.jsx                  # container (D-04)
│   ├── BattlesTab.jsx                  # container (D-04)
│   ├── ActivityTab.jsx                 # container (D-04)
│   ├── <within-tab widgets>.jsx        # left to planner/executor judgment (CONTEXT.md)
│   └── __tests__/
│       ├── Avatar.test.jsx
│       ├── Podium.test.jsx
│       ├── RankRow.test.jsx
│       └── ...one test file per component (Gate A)
└── screens/
    └── FriendsScreen.jsx               # reduced to hook call + tab-branch render
```

### Pattern: Orchestration hook wraps 5 domain hooks, doesn't absorb them

Same "wrap, don't absorb" precedent as Phase 2 (`02-EXTRACTION-TEMPLATE.md`'s "Hook composition"
section), applied 5 times instead of once. Each domain hook file (`useFriends.js`, `useChallenges.js`,
`useLeaderboard.js`, `useFriendsLeaderboard.js`, `useLeague.js`) should show a **0-line diff**
across the whole phase, verifiable the same way Phase 2 verified it: `git diff <first-phase-commit>
-- mobile/src/hooks/useFriends.js mobile/src/hooks/useChallenges.js mobile/src/hooks/useLeaderboard.js
mobile/src/hooks/useFriendsLeaderboard.js mobile/src/hooks/useLeague.js` at phase close.

### Pattern: Preserve the exact naming-collision resolution already in production

D-03 (locked) requires preserving these exact destructure-rename pairs — confirmed against the
actual call site [VERIFIED: mobile/src/screens/FriendsScreen.jsx:263-267]:

```js
// Source: mobile/src/screens/FriendsScreen.jsx:263-267 (verbatim)
const { friends, incomingRequests, sentRequests, friendCode, feed, acceptRequest, declineRequest, removeFriend, refreshFeed, refreshRequests, refreshFriends } = useFriends(uid, user)
const { incoming: incomingBattles, completed: completedBattles, refresh: refreshBattles } = useChallenges(uid, user)
const { leaderboard, school, loading: schoolLoading, refresh: refreshSchool } = useLeaderboard(uid, user)
const { weeklyRanking, loading: weekLoading, refresh: refreshWeekly } = useFriendsLeaderboard(uid, user)
const { tier, members: leagueMembers, refresh: refreshLeague } = useLeague(uid)
```

**Verified detail resolving CONTEXT.md's own open item:** the screen does **not** currently
destructure `loading` from `useLeague(uid)` at all — only `tier`, `members: leagueMembers`, and
`refresh: refreshLeague` are pulled out [VERIFIED: mobile/src/screens/FriendsScreen.jsx:267]. So
`useLeague`'s `loading` field is unused today; `useFriendsScreenState` does not need to invent a
name for it — it can simply not destructure it (matching current behavior) or pass it through
unrenamed as `loading` if the planner wants it available for a future use, since nothing today reads
a field called `loading` off the hook's return value. Either choice preserves parity; not
destructuring it at all is the more literal "same behavior" choice.

### Pattern: Render-Podium-once vs. Podium-remounts-per-refresh

`podiumKey` increments on every `handleRefresh()` call
[VERIFIED: mobile/src/screens/FriendsScreen.jsx:294] and is used as the `Podium`'s React `key`
[VERIFIED: mobile/src/screens/FriendsScreen.jsx:409] specifically to force an unmount/remount so
the staggered reveal animation replays. This is a real behavioral dependency, not incidental —
`useFriendsScreenState` must expose `podiumKey` in its flat return (D-07 already locks this), and
whichever component renders `<Podium key={podiumKey} .../>` must keep passing it as `key`, not as a
regular prop, or the replay-on-refresh behavior silently breaks (FRIENDS-06 parity risk).

### Pattern: Navigation handler shape

Confirmed three distinct `navigation.navigate(...)` call sites beyond `navigateToProfile`
[VERIFIED: mobile/src/screens/FriendsScreen.jsx:332 (`Challenge`, from incoming-battle banner),
455 (`SchoolPicker`), 519 (`League`), 593 (`AddFriend`), 645 (`Challenge`, from FriendsTab),
687 (`Challenge`, from BattlesTab), 721 (`Challenge` rematch)]. Per Phase 2's "handlers wrap
navigation, components never see it" rule (`02-EXTRACTION-TEMPLATE.md`, "Hook contract shape"),
**every one of these should become a named handler returned by `useFriendsScreenState`** (e.g.
`goToChallenge(challengeId, friendName)`, `goToAddFriend()`, `goToSchoolPicker()`, `goToLeague()`,
`goToRematch(oppUid, oppName)`) rather than passing the raw `navigation` object down into
`LeaderboardTab`/`FriendsTab`/`BattlesTab`. This is the single decision (per Phase 2's own writeup)
that keeps every leaf component's test file free of navigation mocking — worth calling out
explicitly since CONTEXT.md's D-01 only names `navigateToProfile` and doesn't enumerate the other
six call sites.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Testing a component with `Animated.Value`/`sequence`/`stagger` | A custom Animated mock/driver shim | Nothing — render/interact against static output the same way `BigPetDisplay.test.jsx` already does | Verified empirically: the existing precedent test exercises real `Animated.loop`/`sequence`/`timing` with zero special setup and passes; `Podium`/`RankRow` should follow the identical pattern rather than inventing new Animated-testing infrastructure |
| Firestore-backed data for `useFriendsScreenState.test.js` | A hand-rolled `firebase/firestore` mock covering ~13 named exports across 5 different query shapes | `jest.mock` each of the 5 domain hook modules directly, returning fixture objects shaped like their real return values | Far smaller mock surface, matches the actual unit under test (the new hook's *own* orchestration logic — `Promise.all`, the Alert-confirm flow, `podiumKey` bump — not the 5 pre-existing hooks' Firestore logic, which is unchanged and out of this phase's requirement scope) |

**Key insight:** the "don't hand-roll" risk this phase introduces that Phase 2 didn't have is scale,
not novelty — the same two precedents (don't mock Animated, do mock Firestore-adjacent imports)
apply; there are just 5x more Firestore-importing modules in this hook's dependency graph than
Phase 2's 1.

## Common Pitfalls

### Pitfall 1: Importing any of the 5 domain hooks in a test crashes on `firebase/firestore`'s ESM syntax, even without calling the hook

**What goes wrong:** A test file does `import { useFriendsScreenState } from
'../hooks/useFriendsScreenState'`, which does `import { useFriends } from './useFriends'`, which
does `import { doc, getDoc, ... } from 'firebase/firestore'` at module top level
[VERIFIED: mobile/src/hooks/useFriends.js:1-6, useChallenges.js:1-6, useLeaderboard.js:1-3,
useFriendsLeaderboard.js:1-3, useLeague.js:18-24 — all five import directly from `'firebase/firestore'`].
Jest's `transformIgnorePatterns` [VERIFIED: mobile/package.json:75-77] does not include `firebase`
in its allow-list, so the real package's ESM `export` syntax is unparseable — the same failure mode
as Phase 2's Trap 9, but triggered at **module load time** for all 5 files instead of at one
function-call time for 1 file.

**Why it happens:** `firebase/firestore` ships ESM; this repo's Jest transform only un-ignores RN/Expo
packages, not `firebase`.

**How to avoid:** `jest.mock('../hooks/useFriends', () => ({ useFriends: jest.fn(() => ({...})), timeAgo: jest.fn() }))`
(and the equivalent for the other 4) at the top of `useFriendsScreenState.test.js`, before any
import of the real modules executes. Jest hoists `jest.mock` calls above imports, so the real
`firebase/firestore`-importing files are never actually `require()`-d.

**Warning signs:** `SyntaxError: Unexpected token 'export'` the moment `useFriendsScreenState.test.js`
is first run, pointing at a line inside `node_modules/firebase/firestore/dist/...`.

### Pitfall 2: `useFocusEffect` resolves its own `navigation` via React Navigation context — independent of any `navigation` prop passed into the hook

**What goes wrong (if assumed otherwise):** It would be easy to assume that because
`useFriendsScreenState(navigation, route)` already receives a `navigation` prop (per D-07, needed
for `navigateToProfile` etc.), moving `useFocusEffect(useCallback(() => { refreshSchool() },
[refreshSchool]))` into the hook could/should reuse that same prop. It cannot and should not —
`useFocusEffect`'s own implementation calls `useNavigation()` internally
[VERIFIED: mobile/node_modules/@react-navigation/core/src/useFocusEffect.tsx:15, "const navigation
= useNavigation()"] and uses that resolved object's `.isFocused()`/`.addListener('focus'/'blur',
...)` [VERIFIED: same file, lines 74-101] — it takes no navigation argument at all. In production
this is a non-issue: `useFriendsScreenState()` executes during `FriendsScreen`'s render, and React
context lookups are tree-position-based, not call-site-based, so `useNavigation()` inside the
(now hook-nested) `useFocusEffect` resolves to the exact same navigation object the screen's own
`navigation` prop refers to. No divergence, no bug — this is purely a testing concern (Pitfall 3).

**Why it happens:** `useFocusEffect`'s API design deliberately doesn't take a `navigation` parameter;
it's meant to be called from anywhere inside a screen's render tree.

**How to avoid:** Nothing to fix in production code — D-01/code_context's plan to move this
`useFocusEffect` call into `useFriendsScreenState` unchanged is correct. Flag this only so the
planner doesn't spend time trying to "wire" a navigation object into `useFocusEffect` that it
doesn't accept.

### Pitfall 3: `renderHook()` (RNTL v14) does not provide a React Navigation context, so a bare hook call to `useFocusEffect` inside `useFriendsScreenState` throws in tests

**What goes wrong:** `useFocusEffect` throws "Couldn't find a navigation object" when `useNavigation()`
can't find a `NavigationContext` ancestor [CITED: reactnavigation.org/docs/testing/ — official docs
confirm `useNavigation()`/`useFocusEffect` require the calling component to be rendered inside a
navigator's `Screen`, not just a bare `NavigationContainer`]. `@testing-library/react-native`'s
`renderHook()` mounts the hook inside a bare `HookContainer` component with no navigator ancestor
[VERIFIED: mobile/node_modules/@testing-library/react-native/dist/render-hook.js:13-21 — `function
HookContainer({ hookProps }) { const renderResult = hookToRender(hookProps); ...}`, no navigator
wrapper]. Calling `useFriendsScreenState(navigation, route)` from inside `renderHook()` without
mocking `useFocusEffect`/`useNavigation` will throw before any assertion runs.

**Why it happens:** React Navigation's per-screen navigation context is provided by a Navigator's
internal `Screen`/`descriptor` rendering, not by `NavigationContainer` alone — `renderHook()` never
renders either.

**How to avoid — two real options, pick one and document the choice in the plan:**
1. **Official-recommended, higher-fidelity:** stand up React Navigation's documented
   `createTestStackNavigator` helper [CITED: reactnavigation.org/docs/testing/] as the `wrapper`
   option `renderHook()` accepts (`renderHook(() => useFriendsScreenState(navigation, route), {
   wrapper: TestNavigatorWrapper })` — `renderHook`'s `wrapper` option is confirmed present in the
   installed version [VERIFIED: mobile/node_modules/@testing-library/react-native/dist/render-hook.js:22-30]).
   This actually exercises the real focus-listener wiring, at the cost of materially more test
   setup than any other hook test this codebase has written so far.
2. **Pragmatic, codebase-consistent (recommended):** `jest.mock('@react-navigation/native', () =>
   ({ ...jest.requireActual('@react-navigation/native'), useFocusEffect: (cb) =>
   require('react').useEffect(cb, []) }))` (or a simpler `jest.fn()` stub that just invokes the
   callback once) in `useFriendsScreenState.test.js`. This matches the exact pattern Phase 2 already
   uses for `AuthContext`/`PetContext`/`useRP` — per-file `jest.mock` rather than real providers —
   and is consistent with this phase's own scope: FRIENDS-04 asks for state-transition coverage on
   the new hook, not new focus-behavior test coverage. The official docs explicitly warn this means
   "you're not testing the focus logic" — acceptable here since the focus logic itself
   (`refreshSchool()` on focus) is untouched behavior being relocated, not new behavior being added.

**Warning signs:** Every test in `useFriendsScreenState.test.js` fails identically at mount, before
any hook-specific assertion, with a navigation-context error.

### Pitfall 4: FRIENDS-01's requirement wording repeats Phase 2's Trap 1 — one term doesn't match the actual code

**What goes wrong:** FRIENDS-01 and `.planning/codebase/CONCERNS.md` both describe "friend-request
accept/**block**" behavior [VERIFIED: .planning/codebase/CONCERNS.md:238, "No test for friend
request acceptance, blocking, or school leaderboard segment toggle"; REQUIREMENTS.md:25 uses the
same "accept/block" phrasing]. A full-text grep of both `useFriends.js` and `FriendsScreen.jsx` for
"block" returns **zero matches** [VERIFIED: `grep -rniE "block"
mobile/src/hooks/useFriends.js mobile/src/screens/FriendsScreen.jsx` → no output]. There is no
block feature. The actual behaviors are: **accept** (`acceptRequest`), **decline**
(`declineRequest`), and, separately, **remove an existing friend** via long-press →
`confirmRemoveFriend` → `Alert.alert` → `removeFriend`
[VERIFIED: mobile/src/screens/FriendsScreen.jsx:274-279, 622].

**Why it happens:** Same root cause as Phase 2's Trap 1 — a description written once in
`CONCERNS.md` (likely aspirational or copied from a different app's feature set) was carried
verbatim into `REQUIREMENTS.md` without being checked against the actual FriendsScreen code.

**How to avoid:** `03-CHARACTERIZATION.md` should document the **real** three behaviors (accept,
decline, remove) and not invent or search for a "block" flow. When satisfying FRIENDS-01's literal
text, treat "accept/block" as covering the closest real analog (accept/decline), the same way Phase
2 resolved its own stale-wording requirement.

### Pitfall 5: All the context-mocking traps from Phase 2 apply again, unchanged

FriendsScreen imports `useTheme()` (`ThemeContext`) and `useAuthContext()` (`AuthContext`)
[VERIFIED: mobile/src/screens/FriendsScreen.jsx:8-9]. Per Phase 2's own carried-forward finding
(`02-EXTRACTION-TEMPLATE.md`'s "Test tiers" section), `AuthContext` and `PetContext` **throw**
outside their provider; `ThemeContext` **silently returns `undefined`**, which fails later and more
confusingly, and can also crash at *module load time* if a component's transitive import chain
pulls in `@react-native-async-storage/async-storage` unmocked. Mock all context modules a
component-under-test imports, even transitively, even if the test never exercises the code path
that reads from them. `Avatar`/`Podium`/`RankRow` all receive `C` (theme colors) as a **prop**, not
via `useTheme()` directly [VERIFIED: mobile/src/screens/FriendsScreen.jsx:38, 52, 210 — all three
take `C` as a parameter], so their own test files likely don't need a `ThemeContext` mock — but any
tab container that calls `useTheme()` itself will.

## Code Examples

### Example: mocking a domain hook for `useFriendsScreenState.test.js`

```js
// Source: pattern derived from Phase 2's per-file context-mock convention
// (mobile/src/__tests__/useFocusScreenState.test.js:22-37), applied to a
// domain hook instead of a context.
jest.mock('../hooks/useFriends', () => ({
  useFriends: jest.fn(() => ({
    friends: [], incomingRequests: [], sentRequests: [], friendCode: 'ABC123', feed: [],
    acceptRequest: jest.fn(), declineRequest: jest.fn(), removeFriend: jest.fn(),
    refreshFeed: jest.fn(), refreshRequests: jest.fn(), refreshFriends: jest.fn(),
  })),
  timeAgo: jest.fn(() => 'just now'),
}))
```

### Example: verified return-object contract to preserve (from the current call site)

```js
// Source: mobile/src/screens/FriendsScreen.jsx:263-267 (read this session, verbatim)
const { friends, incomingRequests, sentRequests, friendCode, feed, acceptRequest, declineRequest, removeFriend, refreshFeed, refreshRequests, refreshFriends } = useFriends(uid, user)
const { incoming: incomingBattles, completed: completedBattles, refresh: refreshBattles } = useChallenges(uid, user)
const { leaderboard, school, loading: schoolLoading, refresh: refreshSchool } = useLeaderboard(uid, user)
const { weeklyRanking, loading: weekLoading, refresh: refreshWeekly } = useFriendsLeaderboard(uid, user)
const { tier, members: leagueMembers, refresh: refreshLeague } = useLeague(uid)
```

### Example: `Podium`/`RankRow` test pattern to follow (proven precedent, not invented)

```js
// Source: mobile/src/components/FocusScreen/__tests__/BigPetDisplay.test.jsx:31-56
// (this codebase's only existing test for an Animated-heavy component — no
// Animated mocking, no fake timers for the animation itself, just render +
// static-output assertions and fireEvent for the interactive case)
test('renders the catalogue glyph for a pet whose type matches a real entry', async () => {
  await render(<BigPetDisplay pet={basePet()} message={null} onPress={jest.fn()} />)
  expect(screen.getByText('🐶')).toBeOnTheScreen()
})
```

## Wave/Plan Sizing Guidance for Phases 3-5 (Rule for Phases 3-5, quoting `02-EXTRACTION-TEMPLATE.md`)

> "Two plans can share a wave only if they modify disjoint files. Two plans that both need to edit
> the same container file... must be sequential waves, even if their actual code changes don't
> conceptually depend on each other."

Applying that rule to FriendsScreen's actual shape:

| Wave | Suggested plan(s) | Parallel? | Why |
|---|---|---|---|
| 1 | Characterization notes (`03-CHARACTERIZATION.md`, committed standalone, zero source changes) | — (solo, must land first) | Same as Phase 2 — the FRIENDS-06 parity baseline must exist and be committed before any code moves |
| 2 | Create `useFriendsScreenState` (D-01/D-02/D-03/D-07), reduce screen to a single hook call, relocate `Avatar`/`Podium`/`RankRow` verbatim, and extract all 4 tab branches into containers (still holding their JSX inline, unsplit) in one plan | — (solo) | This plan is the only one that needs to touch `FriendsScreen.jsx`'s branch structure; doing all 4 tab extractions here (rather than one-tab-per-plan the way Phase 2 did one-branch-per-plan) avoids forcing 4 sequential waves just to keep editing the same screen file — FriendsScreen has 4 branches vs. Phase 2's 3, so copying Phase 2's one-branch-per-wave approach literally would add an extra forced-sequential wave for no benefit |
| 3 | Split widgets inside `FriendsTab.jsx`, split widgets inside `BattlesTab.jsx`, split widgets inside `ActivityTab.jsx`, extract the two always-visible top banners (pending-requests, incoming-battles) out of `FriendsScreen.jsx`'s shell | Yes (4-way parallel) | Each touches a disjoint file: `FriendsTab.jsx` vs. `BattlesTab.jsx` vs. `ActivityTab.jsx` vs. `FriendsScreen.jsx` (already vacated of branch logic by wave 2 — the top-banner extraction is the only remaining edit to that file, and no other wave-3 plan touches it) |
| 4 | Split `LeaderboardTab.jsx` — mode toggle + friends-mode section (Podium/RankRow composition) | — (solo, depends on wave 2) | `LeaderboardTab` is the most complex container (3 lbMode sub-views); splitting it needs its own wave(s) the way Phase 2's `FocusSetupScreen` needed 2 |
| 5 | Split `LeaderboardTab.jsx` further — school-mode section + league-mode section | — (solo, sequential after wave 4 — same file) | Same "shared file forces sequence" case as Phase 2's 02-06/02-07 |
| 6 | Phase-close audit: Gate A (every component has a test) / Gate B (test tier matches interactivity) mechanical checks, `git diff` 0-line confirmation on all 5 domain hooks, manual parity pass against `03-CHARACTERIZATION.md` | — (solo, depends on every prior wave) | Same as Phase 2's 02-08 — can only run once every widget exists |

**Estimate:** roughly **7-9 plans across 6 waves** — comparable to Phase 2's 8 plans/6 waves, since
the larger tab count (4 vs. 3) is offset by batching all 4 tab-branch extractions into a single
wave-2 plan instead of one-per-wave. Component count is likely **higher** than Phase 2's 18 (more
tabs, more distinct row/banner types visible in the screen's own JSX comments — friend-request
banner, incoming-battle banner, friend-code banner, `FriendCard`, `BattleRow` (2 variants: pending
vs. completed), `ActivityRow`, plus the 3 relocated `Avatar`/`Podium`/`RankRow`) — plan for
**20-28 components**, not 18. This is the planner's estimate to size against, not a hard target.

**Same mechanical gates Phase 2 used, runnable verbatim once component files exist:**

```bash
# Gate A — every component has a test
for f in mobile/src/components/FriendsScreen/*.jsx; do
  b=$(basename "$f" .jsx)
  test -f "mobile/src/components/FriendsScreen/__tests__/$b.test.jsx" || echo "MISSING-TEST $b"
done

# Gate B — every component's test is at the tier its interactivity assigns it
for f in mobile/src/components/FriendsScreen/*.jsx; do
  b=$(basename "$f" .jsx)
  t="mobile/src/components/FriendsScreen/__tests__/$b.test.jsx"
  if grep -qE 'onPress=|onChangeText=|onSubmitEditing=|onRequestClose=|onLongPress=' "$f"; then
    grep -q 'fireEvent' "$t" || echo "D01-GAP $b"
  else
    grep -q 'fireEvent' "$t" && echo "D01-OVER $b"
  fi
done
```

Note: Gate B's grep needs `onLongPress=` added to the pattern relative to Phase 2's version — the
`FriendCard`'s long-press-to-remove interaction [VERIFIED: mobile/src/screens/FriendsScreen.jsx:622,
`onLongPress={() => confirmRemoveFriend(f)}`] is a real interactive handler Phase 2's screen never
had, and Phase 2's literal gate script would silently classify it as non-interactive.

## Runtime State Inventory

Not applicable — this is a pure code-structure refactor (hook/component extraction), not a
rename/rebrand/migration. No stored data keys, service config, OS-registered state, secrets, or
build artifacts change names or shapes. FRIENDS-03/FRIENDS-04's new files
(`useFriendsScreenState.js`, `components/FriendsScreen/*.jsx`) are net-new, not renames of existing
runtime-referenced identifiers — confirmed no Firestore collection/field name, AsyncStorage key, or
navigation route name changes anywhere in CONTEXT.md's locked decisions or this research.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Mocking `@react-navigation/native`'s `useFocusEffect` per-file (rather than using the official `createTestStackNavigator` pattern) is the right tradeoff for this phase | Pitfall 3 | If the developer prefers higher-fidelity focus-behavior coverage, the plan would need the heavier test-navigator wrapper instead — more setup, but not a blocker either way; flag as an open discretion point for the planner, not a hard requirement |
| A2 | Estimated 20-28 total components and 7-9 plans/6 waves | Wave/Plan Sizing Guidance | This is a sizing estimate only, not derived from an executed history the way Phase 2's template's numbers were (Phase 2's own numbers ARE `[VERIFIED]` — pulled from its actual `02-0N-SUMMARY.md` files); actual counts may run higher or lower once the executor starts splitting `LeaderboardTab` and discovers the real widget boundaries |
| A3 | Not destructuring `useLeague`'s `loading` field (rather than passing it through unrenamed) is the more literal parity-preserving choice | Pattern: Naming-collision resolution | Low risk either way — CONTEXT.md itself flagged this as "confirm during planning," and neither choice changes any currently-observable behavior since nothing reads it today |

## Open Questions

1. **Which of the seven `navigation.navigate(...)` call sites become named hook handlers vs. get
   passed through as data (e.g., a `goToChallenge` handler vs. exposing raw challenge ids/names for
   the screen to build the navigate call itself)?**
   - What we know: Phase 2's precedent strongly favors named handlers for all of them (see
     "Navigation handler shape" pattern above), and CONTEXT.md only explicitly names
     `navigateToProfile`.
   - What's unclear: the exact handler names/signatures for the other six (`Challenge` ×3 call
     sites with different param shapes, `AddFriend`, `SchoolPicker`, `League`) — left to planning.
   - Recommendation: name them individually per call site (e.g., `goToChallengeFromBanner`,
     `goToChallengeFromFriendCard`, `goToRematch`) rather than one generic `goToChallenge(params)`
     that hides three different param shapes behind one signature — mirrors Phase 2's "keep
     genuinely different things separate" precedent (ActiveTaskList/TaskList, the 5 chip pickers).

2. **Exact within-tab widget boundaries (explicitly deferred to planner/executor judgment by
   CONTEXT.md).**
   - What we know: the screen's own JSX comments already mark natural boundaries (`{/* Pending
     requests */}`, `{/* Incoming battle challenges */}`, `{/* Friend code + add friend */}`, etc.)
     [VERIFIED: mobile/src/screens/FriendsScreen.jsx:304, 324, 575].
   - What's unclear: whether e.g. `BattleRow` (pending) and the completed-battle row
     [VERIFIED: mobile/src/screens/FriendsScreen.jsx:682-695 vs. 701-728 — these two are visibly
     different JSX shapes: one is a `TouchableOpacity` with a "Play" pill, the other is a plain
     `View` with a won/lost/tie badge and a "Rematch" pill] should be one component with a
     `variant` prop or two separate components.
   - Recommendation: keep them separate, following Phase 2's `ActiveTaskList`/`TaskList` precedent
     — they render genuinely different data shapes (`incomingBattles` items have no `winnerUid`;
     `completedBattles` items do) and a shared component would need a branching prop to hide that.

## Environment Availability

No external tool/service dependencies beyond what's already installed and verified above (Jest,
RNTL, React Navigation, Firebase SDK — all present in `mobile/node_modules`). Skipping the full
table since every dependency is already-installed and already in active use by Phase 1/Phase 2.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Jest 29.7.0 via `jest-expo` 54.0.18 preset [VERIFIED: mobile/package.json:68-69,73-74] |
| Config file | `mobile/package.json`'s `"jest"` key (no separate `jest.config.js`) [VERIFIED: mobile/package.json:73-83] |
| Quick run command | `cd mobile && npx jest <path-to-file>` |
| Full suite command | `cd mobile && npx jest` (or `npm run check` for jest + parse-check) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FRIENDS-01 | Characterization notes capture segment-toggle + accept/decline (not "block" — see Pitfall 4) + battle-accept + 4-tab structure | documentation (not automated) | n/a — manual doc review against `03-CHARACTERIZATION.md` | ❌ Wave 0/1 — net-new doc |
| FRIENDS-02 | `useFriendsScreenState` orchestration hook; screen reduced to hook call + render | unit | `cd mobile && npx jest src/__tests__/useFriendsScreenState.test.js` | ❌ Wave 0 — net-new |
| FRIENDS-03 | UI decomposed into named sub-components under `components/FriendsScreen/` | render/snapshot + interaction (per D-01 tier split) | `cd mobile && npx jest src/components/FriendsScreen/__tests__/` | ❌ Wave 0 — net-new dir |
| FRIENDS-04 | Every extracted hook (i.e., `useFriendsScreenState` only — the 5 pre-existing domain hooks are wrapped, not extracted, per Phase 2's precedent of not writing new tests for the wrapped domain hook) has state-transition tests | unit | same as FRIENDS-02 | ❌ Wave 0 |
| FRIENDS-05 | Every sub-component has a render/snapshot test | render/snapshot + interaction | Gate A/B scripts above, run at phase close | ❌ Wave 0 |
| FRIENDS-06 | Manual parity pass against characterization notes | manual-only | n/a | ❌ — carries the same risk Phase 2's FOCUS-06 hit (may end up "honest unrun" if no simulator/human-interaction tooling is available to the executing agent; see `02-08-SUMMARY.md` for that precedent) |

### Sampling Rate

- **Per task commit:** `cd mobile && npx jest <touched test file(s)>`
- **Per wave merge:** `cd mobile && npx jest` (full suite)
- **Phase gate:** Full suite green before `/gsd-verify-work`, plus Gate A/B scripts above with zero
  output, plus the 5-domain-hook 0-line `git diff` check

### Wave 0 Gaps

None — Phase 1's INFRA-01 already migrated the whole `mobile/` suite to
`@testing-library/react-native` 14.0.1 as the sole rendering/query library
[VERIFIED: .planning/REQUIREMENTS.md:12-13, marked complete]. No framework install needed. Every
test file this phase needs (`03-CHARACTERIZATION.md`,
`mobile/src/__tests__/useFriendsScreenState.test.js`, and the
`mobile/src/components/FriendsScreen/__tests__/*.test.jsx` files) is net-new phase work product,
not a pre-existing infrastructure gap.

## Security Domain

### Applicable ASVS Categories

This phase is a pure client-side structural refactor: no new input fields, no new auth/session
surface, no new cryptography, and no change to Firestore security rules (unchanged files per the
Runtime State Inventory above). ASVS applicability is therefore minimal:

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | `uid` continues to come from the existing, unmodified `useAuthContext()` — no auth logic touched |
| V3 Session Management | No | Not touched |
| V4 Access Control | No | Firestore security rules (server-side enforcement of friend-subtree writes, etc.) are unchanged; this phase only moves *where* the existing client calls originate from, not what they call |
| V5 Input Validation | No | No new user-input fields introduced; the existing friend-code input (`AddFriend` screen) is out of this phase's scope |
| V6 Cryptography | No | Not touched |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Reciprocal Firestore writes into another user's subtree (friend accept/remove writes into `users/{otherUid}/friends/{uid}`) | Tampering | Already enforced by `firestore.rules` (unchanged, outside this phase's scope) — this phase does not touch `acceptRequest`/`removeFriend`'s Firestore calls, only where they're invoked from |

No new threats introduced by this phase; the above is recorded for completeness per the security
domain protocol, not because this phase changes any security-relevant code path.

## Sources

### Primary (HIGH confidence — direct reads this session)
- `mobile/src/screens/FriendsScreen.jsx` (full 987-line read)
- `mobile/src/hooks/useFriends.js`, `useChallenges.js`, `useLeaderboard.js`,
  `useFriendsLeaderboard.js`, `useLeague.js` (full reads)
- `mobile/node_modules/@react-navigation/core/src/useFocusEffect.tsx` (full read)
- `mobile/node_modules/@testing-library/react-native/dist/render-hook.js` (full read)
- `mobile/src/components/FocusScreen/BigPetDisplay.jsx` and
  `__tests__/BigPetDisplay.test.jsx` (full reads — Animated-testing precedent)
- `mobile/src/hooks/useFocusScreenState.js` and `mobile/src/__tests__/useFocusScreenState.test.js`
  (full reads — hook-contract and context-mocking precedent)
- `mobile/package.json` (jest config, dependency versions)
- `.planning/codebase/CONCERNS.md` (stale "block" wording source)
- `.planning/phases/02-focusscreen-decomposition/02-EXTRACTION-TEMPLATE.md` (full read)
- `.planning/phases/03-friendsscreen-decomposition/03-CONTEXT.md`,
  `.planning/REQUIREMENTS.md`, `.planning/STATE.md`, `.planning/config.json` (full reads)

### Secondary (MEDIUM confidence — official docs, web-verified)
- [reactnavigation.org/docs/testing/](https://reactnavigation.org/docs/testing/) — official
  guidance on testing `useFocusEffect`/`useNavigation`, `createTestStackNavigator` pattern, and the
  explicit warning against mocking `useFocusEffect`

### Tertiary (LOW confidence)
- None used as a basis for any claim in this document — all findings above are either direct file
  reads or the one official-docs fetch.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new packages, all versions read directly from installed
  `package.json`s
- Architecture: HIGH — hook composition, naming, and component-boundary decisions are grounded in
  direct reads of the actual screen and hook files, cross-checked against CONTEXT.md's locked
  decisions
- Testing strategy (Animated, useFocusEffect, domain-hook mocking): HIGH for the factual claims
  (verified via source reads of installed packages and Phase 2's actual test files); MEDIUM for the
  specific recommendation to mock `useFocusEffect` per-file rather than use the official test
  navigator (a judgment call, flagged as Assumption A1, not a verified requirement)
- Pitfalls: HIGH — all five are grounded in direct source reads (Firestore imports, `useFocusEffect`
  source, `renderHook` source, `CONCERNS.md` vs. actual code grep)
- Wave/plan sizing: MEDIUM — grounded in Phase 2's actual executed numbers and this phase's actual
  file/branch count, but is an estimate for un-executed work (flagged as Assumption A2)

**Research date:** 2026-09-15
**Valid until:** 30 days (stable — no external dependency updates expected to affect this phase's
approach; re-verify if `@testing-library/react-native` or `@react-navigation/native` are upgraded
before this phase executes)
