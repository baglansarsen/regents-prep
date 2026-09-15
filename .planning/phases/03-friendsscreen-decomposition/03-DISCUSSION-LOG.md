# Phase 3: FriendsScreen Decomposition - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-09-15
**Phase:** 3-friendsscreen-decomposition
**Areas discussed:** Hook composition scope, Sub-component boundaries, Tab / leaderboard-segment state ownership

---

## Hook composition scope

| Option | Description | Selected |
|--------|-------------|----------|
| Hook absorbs orchestration | useFriendsScreenState calls all 5 domain hooks AND owns handleRefresh/confirmRemoveFriend/navigateToProfile, matching Phase 2's precedent | ✓ |
| Hook only wraps data, screen keeps orchestration | Hook re-exports the 5 hooks' return values only; handlers stay local to the screen | |

**User's choice:** Hook absorbs orchestration (recommended option)
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Flat object | Matches Phase 2's flat-spread precedent | ✓ |
| Namespaced by domain | Groups fields by source hook (friends.*, leaderboard.*, league.*) | |

**User's choice:** Flat object (recommended option)
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Preserve exact existing names | Keep schoolLoading/weekLoading/refreshSchool/refreshWeekly/refreshLeague/refreshBattles exactly as the screen names them today | ✓ |
| Open to renaming | Let planner/executor choose clearer names as long as they don't collide | |

**User's choice:** Preserve exact existing names (recommended option)
**Notes:** Real collision found during discussion — `loading` and `refresh` returned by 3-4 of the 5 domain hooks; screen already resolves via destructure-renaming today.

---

## Sub-component boundaries

| Option | Description | Selected |
|--------|-------------|----------|
| By tab, one container per tab | LeaderboardTab/FriendsTab/BattlesTab/ActivityTab, mirroring Phase 2's Setup/Active/Done split | ✓ |
| By widget, flatter structure | Podium/RankRow/FriendCard/RequestRow/BattleRow/ActivityRow as siblings, no tab wrapper | |

**User's choice:** By tab, one container per tab (recommended option)
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Verbatim relocation | Move Avatar/Podium/RankRow body-for-body, same as Phase 2's BigPetDisplay | ✓ |
| Flag for extra scrutiny during planning | Same verbatim move, but note Podium's staggered animation needs a dedicated before/after comparison task | |

**User's choice:** Verbatim relocation (recommended option)
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Keep scoped, defer the dedup | Avatar.jsx lives under components/FriendsScreen/; LeagueScreen's duplicate untouched | ✓ |
| Promote to shared components/ now | Extract a single shared Avatar, update both FriendsScreen and LeagueScreen | |

**User's choice:** Keep scoped, defer the dedup (recommended option)
**Notes:** Avatar found to be byte-for-byte duplicated in LeagueScreen.jsx (outside this phase's 4-screen scope) during discussion — logged as a deferred idea.

---

## Tab / leaderboard-segment state ownership

| Option | Description | Selected |
|--------|-------------|----------|
| In the hook, with everything else | tab/lbMode/podiumKey all live in useFriendsScreenState | ✓ |
| Stays local to the screen component | tab/lbMode/podiumKey remain useState in FriendsScreen.jsx | |

**User's choice:** In the hook, with everything else (recommended option)
**Notes:** Consistent with the hook-absorbs-orchestration decision above.

---

## Claude's Discretion

- Characterization notes format (FRIENDS-01) — same convention as Phase 2's `02-CHARACTERIZATION.md`
- Sub-component test depth (FRIENDS-05) — Phase 2's D-01 interactivity-based convention carries forward unchanged
- Within-tab widget naming (FriendCard/RequestRow/BattleRow/ActivityRow file boundaries) — left to planner/executor judgment against `02-EXTRACTION-TEMPLATE.md`

## Deferred Ideas

- Avatar component is duplicated byte-for-byte between `FriendsScreen.jsx` and `LeagueScreen.jsx` (outside this phase's scope) — a future cleanup pass could promote both to a single shared `components/Avatar.jsx`
