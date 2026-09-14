# Pitfalls Research

**Domain:** React Native (Expo) screen-component refactor — extracting hooks/sub-components from large screens with no intended behavior change, on a live shipping app
**Researched:** 2026-09-14
**Confidence:** MEDIUM (cross-checked web sources + official React docs; no project-specific incident reports beyond what's already in CONCERNS.md, which is HIGH confidence as first-party codebase analysis)

## Critical Pitfalls

### Pitfall 1: Stale Closures in Extracted Hooks

**What goes wrong:**
A value read inside a `useEffect`, `useCallback`, or event handler that gets moved into a new hook keeps referencing the value from the render in which the closure was created, not the current value — even though the code "looks" identical to what was inline in the screen. The bug is invisible in code review because the extracted hook compiles and lints clean; it only shows up as "the app used the old value" under specific timing (e.g., stale `uid`, stale `goal`, stale quiz index).

**Why it happens:**
Inline in a 1600-line screen, a closure over `homeAgenda` or `currentQuestionIndex` sits right next to the state declaration, so it's easy to eyeball correctness. Once that logic moves into `useHomeAgenda()` or `useQuizState()`, the reviewer sees only the hook in isolation and can't see whether the *caller's* re-render cadence still matches what the closure assumes. Dependency arrays that were "good enough" inline (because the whole screen re-rendered together) become wrong once the hook's effect has a narrower re-render boundary.

**How to avoid:**
- For every extracted hook, write down (in the PR/commit description or a comment) which values the hook's effects/callbacks close over and confirm each is in the dependency array — do not rely on eslint alone for hooks that read `ref.current` or context values.
- Run `eslint-plugin-react-hooks` (`exhaustive-deps` rule) on every extracted hook file specifically, even if the repo doesn't enforce it globally; treat any warning inside `mobile/src/hooks/*` created by this refactor as a stop-and-investigate signal, not a suppress-and-move-on.
- Prefer extracting the *effect and its full closure* verbatim first ("move don't rewrite"), then clean up in a clearly separate, smaller diff — never combine "extract" and "improve deps" in one change during this pass, since REQUIREMENTS explicitly bans opportunistic fixes.

**Warning signs:**
- A hook reads a prop/context value but the value isn't in its own dependency array or the caller's memoized inputs.
- Manual QA shows an action (e.g., "answer question") applying to the *previous* question after rapid navigation.
- Jest test for the hook passes with fixed inputs but fails intermittently when inputs change across re-renders within the same test.

**Phase to address:**
Every screen-decomposition phase (all four screens) — this is not a one-time setup concern, it recurs per extraction. Bake a "closure audit" step into each phase's plan/verification checklist rather than a single upfront phase.

---

### Pitfall 2: Effect Boundary Shift Changes Timing Without Changing Code

**What goes wrong:**
Moving a `useEffect` from the screen into a child hook or sub-component changes *when* it mounts/unmounts relative to siblings, even if the effect's own code is copied verbatim. Effects that used to run once when the screen mounted now run once per sub-component mount/unmount (e.g., if the sub-component conditionally renders), producing duplicate Firestore listeners, duplicate analytics events, or a subscription that never cleans up because the new boundary unmounts differently than the old one did.

**Why it happens:**
In the original screen, hook call order and conditional JSX were all in one function body, so effect timing followed the screen's single lifecycle. After decomposition, some logic now lives behind a component boundary that mounts/unmounts based on props (e.g., a modal, a conditional card) — an effect that was "always running while the screen is open" can silently become "running only while this card is visible," which is a behavior change even though no line of effect logic changed.

**How to avoid:**
- Before moving an effect out of the screen body, check: is the target sub-component always mounted whenever the screen is, or is it conditionally rendered? If conditional, either keep the effect in the parent hook (pass data down as props) or explicitly confirm the timing change is acceptable and flag it (per PROJECT.md's rule: behavior changes discovered as "needed" are a stop-and-flag signal, not a slip-in).
- For hooks with subscriptions/listeners (Firestore `onSnapshot`, `AppState` listeners, timers), test mount/unmount explicitly with React Testing Library's `render`/`unmount`, asserting the cleanup function was called exactly once per real unmount — not per Strict Mode double-invoke (see Pitfall 6).
- Grep the screen being refactored for `useEffect` calls with no dependency array or `[]` before starting — these are the ones most likely to encode "runs once for the screen's whole lifetime," which decomposition threatens most.

**Warning signs:**
- A Firestore listener count metric (or `console.log` count during dev) goes up after decomposition without a corresponding UI change.
- The extracted sub-component wraps a `useEffect` and also has a prop that controls whether it's rendered at all (`{showCard && <Card/>}`) — immediate suspect.

**Phase to address:**
Each screen's decomposition phase; specifically flag `FocusScreen` and `HomeScreen` given CONCERNS.md's note of ~20 hooks with concurrent Firestore/Stripe/RevenueCat fetches on `HomeScreen` — those are the highest-density effect boundaries in this codebase.

---

### Pitfall 3: Referential-Equality Breaks From New Object/Function Identities

**What goes wrong:**
An inline function or object literal defined inside the 1600-line screen body gets a new reference every render, same as always — but when it's extracted into a hook's *return value*, callers now treat that returned function/object as a dependency of their own `useEffect`/`useMemo`/`useCallback`, or pass it to a memoized child. If the hook doesn't wrap its returned callbacks in `useCallback` (with correct deps) and returned objects in `useMemo`, every render of the parent produces a "new" value, which can either (a) cause downstream effects to re-fire every render (silent perf regression, sometimes visible as jank/battery drain) or (b) defeat `React.memo` on a child, causing extra re-renders that are hard to notice functionally but show up as animation stutter or extra Firestore reads if a re-render re-triggers a fetch.

**Why it happens:**
Inline, referential identity rarely mattered because there was no boundary to cross — a function used directly in JSX doesn't care that it's "new" each render. Once it becomes a hook's return value consumed by other code, identity now matters. This is the single most common bug class introduced by hook extraction according to cross-checked sources (React docs, community writeups) and it's exactly the kind of thing that passes every visual/manual QA check yet regresses performance or triggers subtle over-fetching.

**How to avoid:**
- Every hook that returns functions or non-primitive values used by a caller's dependency array must wrap them in `useCallback`/`useMemo` with an explicit, correct dependency list — this matches the existing repo convention (CONVENTIONS.md already documents `useMemo` for context value memoization and `useCallback` for callback stability), so extracted hooks should follow the same pattern, not introduce a new one.
- When writing hook unit tests (TEST-01 requirement), add an explicit assertion that a returned callback/object is referentially stable across two renders with unchanged inputs (`rerender()` + `toBe()` on the previous reference) — this catches the bug class directly rather than relying on behavior-level tests to notice a perf issue.
- Do not add `React.memo` to newly extracted sub-components as a "nice to have" during this refactor — CONVENTIONS.md notes the codebase currently avoids it in favor of render-boundary discipline; introducing it now adds a second variable (memo + unstable prop identity) at the same time as the extraction, compounding risk.

**Warning signs:**
- A hook returns an object literal (`return { data, loading, refetch }`) built fresh in the hook body without `useMemo`.
- Test coverage shows the hook "works" but a snapshot/render test shows more render count than the original inline code produced under the same interaction.

**Phase to address:**
All four phases; specifically call out in the plan/verification for `HomeScreen` and `QuizScreen`, which CONCERNS.md flags as having the most concurrent hooks and the highest render-time sensitivity.

---

### Pitfall 4: React 19 Strict Mode Double-Invoke Surfaces (or Masks) Bugs Introduced by the Refactor

**What goes wrong:**
React 18/19 Strict Mode (active in Expo dev/Metro dev builds) deliberately mounts → unmounts → remounts every component once in development to verify effects tolerate remounting. When an effect is extracted into a new hook, this double-invoke can now expose problems that were previously masked by different effect ordering (double Firestore reads, duplicate `AppState` listener registration, double analytics fire) — or conversely, a genuinely broken cleanup function can go unnoticed in production (Strict Mode's double-invoke is dev-only; production still fires once per real mount).

**Why it happens:**
Developers naturally test the refactored screen in Expo Go / dev client, see "it works," and ship — but "works in dev with double-invoke" and "works in prod with single-invoke" are different guarantees. A cleanup function that no-ops on the first (Strict-Mode-forced) unmount can look correct in dev testing while actually leaking a subscription in production, and the inverse is also possible: dev-mode noise (duplicate console logs, duplicate cache writes) gets mistaken for a real regression when it's actually harmless Strict Mode behavior, wasting debugging time mid-refactor.

**How to avoid:**
- When manually verifying a decomposed screen in dev, explicitly account for Strict Mode: if you see something fire twice, check whether it also fires twice on `master` *before* your change (i.e., is this pre-existing behavior or new?) before treating it as a regression.
**Note:** this repo's dev client behavior for the RN New Architecture should already reflect this — do not spend refactor time "fixing" double-invoke noise that also exists in the unrefactored screen.
- For any effect with a subscription/listener, write the cleanup function to be idempotent and always test it with an explicit `unmount()` call in a Jest/RTL test rather than relying on manual dev-mode observation, which conflates Strict Mode noise with real bugs.

**Warning signs:**
- "New" console warnings/duplicate network calls appear after decomposition — before concluding it's a regression, verify against the pre-refactor screen under the same dev conditions.
- A cleanup function has a code path that assumes "this is the only time this runs."

**Phase to address:**
Applies to any phase touching effects with listeners/subscriptions — most relevant to `FocusScreen` (filters/search state) and `HomeScreen` (many concurrent fetches). Should be an explicit item in each phase's verification checklist: "confirm effect fire-count parity with the pre-refactor screen, accounting for Strict Mode."

---

### Pitfall 5: Behavior Silently Changes When Component Boundaries Cross State/Remount Lines

**What goes wrong:**
Extracting a chunk of JSX into a new sub-component can change whether React treats an element as the "same" element across re-renders (reconciliation identity), which changes whether local state inside that chunk persists or resets. A classic case: an inline `<TextInput>` with local `useState` for a filter/search string, once wrapped in a new `<FilterBar />` sub-component, can reset its internal state if the parent conditionally changes the sub-component's `key` or position in the tree, or if the extraction accidentally changes conditional rendering from "always rendered, visibility toggled by style" to "conditionally rendered via `&&`" — these look equivalent visually but are not equivalent to React's reconciler.

**Why it happens:**
"Extract this JSX block into a component" reads as a pure refactor, but JSX blocks aren't components until they're given a boundary, and that boundary interacts with React's diffing algorithm in ways that aren't visible by reading either version of the code in isolation — you have to reason about the *parent's* render output before and after.

**How to avoid:**
- When extracting a sub-component that contains local `useState` or an uncontrolled input, keep the exact same conditional-rendering shape at the call site (don't convert `style={{display: hidden ? 'none' : 'flex'}}`-style hiding into `{!hidden && <Comp/>}` conditional mounting, or vice versa, during a pure structural pass) unless the original screen already worked that way.
- Add a manual UAT step per screen decomposition specifically exercising "toggle this section closed then open, is the state preserved the same way as before" for any extracted piece with internal state (search filters, expandable cards, form drafts).
- This is the class of bug the "golden master" / characterization-test approach exists to catch: capture actual before/after interaction sequences (not just single renders) so a state-reset regression shows up in the diff.

**Warning signs:**
- Manual QA finds a text field, toggle, or filter that "forgets" its value after an interaction that shouldn't clear it (e.g., switching tabs and back, an unrelated re-render).
- A sub-component extraction changes `{condition ? <A/> : <B/>}` into `{condition && <A/>}{!condition && <B/>}` or similar — different reconciliation semantics even though visually equivalent.

**Phase to address:**
`FriendsScreen` (leaderboard segment toggle) and `FocusScreen` (filter/search state) are the highest-risk targets per CONCERNS.md's named gaps ("no test for... school leaderboard segment toggle", "no test for filter state, search"). Flag these specific interactions for characterization tests before touching the surrounding JSX.

---

### Pitfall 6: `.web.jsx` Platform-Variant Files Drift Out of Sync During Extraction

**What goes wrong:**
This codebase uses `.web.jsx` file-extension overrides (documented in CONVENTIONS.md and CLAUDE.md) for navigation, animations, and Firebase config. When a screen or a component it renders is decomposed, it's easy to update the native `.jsx` file's imports/props/hook usage and forget that a parallel `.web.jsx` variant exists elsewhere (or needs to exist) with a matching export shape. Metro/bundler resolution picks the right file per platform silently — there's no compiler error if the two variants drift, only a runtime difference on whichever platform you didn't test (commonly: developer tests iOS/Android, web PWA regresses unnoticed, or vice versa).

**Why it happens:**
None of these four screens are named as having their own `.web.jsx` variant today, but the sub-components and hooks they depend on (animations, navigation) do. Decomposition changes *how* a screen calls those dependencies (e.g., new prop shape passed to `LottieAnimation`, new hook wrapping navigation calls) — if the change touches a component with a `.web.jsx` counterpart, the native-only edit path means the web variant now has a mismatched contract and nobody sees an error until the PWA build runs.

**How to avoid:**
- Before editing any component/hook touched by the refactor, grep for a `.web.jsx` (or `.web.js`) sibling file (`find mobile/src -name "*.web.*"`) and check whether the file being changed, or anything it calls, has a platform variant.
- If a variant exists, mirror the interface change in both files in the same commit — never edit just the native file and assume the web variant "probably still works."
- Given PROJECT.md scopes this initiative to mobile screens (not web-specific work), the safest default is to avoid changing the *props/exported shape* of anything with a `.web.jsx` counterpart — extract internals freely, but keep the external contract (props in, JSX out) identical, which sidesteps the sync risk entirely.

**Warning signs:**
- `grep -rl "\.web\.jsx" mobile/src` intersects with any file touched by the refactor's diff.
- A prop or hook return value's shape changes for a component that's imported by both a screen and a navigator (navigators are the most common `.web.jsx` consumers here).

**Phase to address:**
Applies mainly if the refactor introduces new shared sub-components that `HomeScreen`/`QuizScreen` render and that also appear in web-specific navigation trees. Add an explicit "check for `.web.jsx` siblings" step to each phase's pre-flight checklist, and treat it as in-scope verification even though it's not one of the four named screens.

---

### Pitfall 7: Module-Level Singletons Get Duplicated or Bypassed During Extraction

**What goes wrong:**
CONCERNS.md documents that `useRP.js` and `useProgress.js` intentionally use module-level singleton state (`globalRP`, `_pending` queue) with explicit reset-on-sign-out guards to prevent cross-account data bleed. If a refactor phase touches code that reads/writes these singletons (directly, or by extracting a "new" hook that re-implements similar caching logic), there's a real risk of either (a) accidentally creating a *second* singleton with its own state that isn't covered by `AuthContext`'s existing reset-on-swap guard, reintroducing the exact stat-pollution bug that was already fixed once, or (b) breaking the existing guard by changing when/how the singleton is read relative to the auth-swap detection.

**Why it happens:**
Extraction work naturally tempts "let's clean this up while we're in here" — spotting a singleton pattern and thinking it should become a proper hook-scoped `useState` (a real behavior change) or a new context (a bigger behavior change). Given this project's explicit "no opportunistic fixes" constraint, any singleton refactor is out of scope, but the risk is doing it *accidentally* by, e.g., moving the module-level variable's read into a differently-scoped hook without preserving the exact reset semantics.

**How to avoid:**
- Treat `useRP.js`, `useProgress.js`, and any other module-level singleton as untouchable during this pass unless a specific requirement calls for it — if `HomeScreen`'s decomposition needs to consume `useRP`/`useProgress`, wrap/call them from the new hooks exactly as the screen did, don't inline their logic into the new hook.
- If a new hook extracted from one of the four screens introduces its own module-level `let`/object for caching (a tempting pattern to mirror what's already in the codebase), explicitly check it against `AuthContext`'s uid-swap guard (lines 24-28 per CONCERNS.md) — new singletons need the same reset wiring, or they need to not be singletons at all (prefer per-instance `useState` + context unless there's a proven reason for module scope).
- Add a specific manual test case per CONCERNS.md's existing follow-up: "sign in as guest, interact, sign into a real account without relaunch, confirm state starts clean" — re-run this exact scenario after decomposing `HomeScreen` (the heaviest consumer of `useRP`/`useProgress`), since it's the regression this refactor is most likely to reawaken.

**Warning signs:**
- A new hook file declares a variable outside the hook function body (`let cache = null` at module scope) — immediate flag for review.
- `HomeScreen`'s decomposition PR touches `useRP.js` or `useProgress.js` at all — should trigger a "why" check, since these two files are described as already-fixed and stable.

**Phase to address:**
Primarily the `HomeScreen` phase (heaviest consumer per CONCERNS.md's "~20 hooks" note). Verification: re-run the guest→real-account swap manual test after decomposition, not just standard UAT.

---

### Pitfall 8: Missing Error Boundaries Turn a Small Extraction Mistake Into a Full Red-Screen Crash

**What goes wrong:**
CONCERNS.md already flags that `HomeScreen`, `QuizScreen`, and `FocusScreen` have no Error Boundary wrapping them — a thrown error anywhere in their (many) hooks crashes the whole screen to a red screen / full app hang, losing any in-progress state (e.g., mid-quiz progress isn't persisted). This existing gap means the *cost of a refactor mistake* on these specific screens is higher than it would be on a screen with a boundary: a null-pointer from a hook returning `undefined` briefly during a render (e.g., a memoization bug, or a hook order change) doesn't degrade gracefully — it's a hard crash, on production, for real users, exactly the failure mode this project is trying to avoid.

**Why it happens:**
This isn't caused by the refactor — it's a pre-existing gap that the refactor inherits and that raises the stakes of every other pitfall on this list. A stale-closure bug or a referential-equality bug that would "just" cause a stale UI or a perf blip on a screen with an error boundary becomes an app crash on these four screens specifically.

**How to avoid:**
- This is explicitly out of scope for the refactor per PROJECT.md (no opportunistic fixes), but it should be flagged as a *sequencing* consideration: consider whether adding a lightweight Error Boundary wrapper around each of the four screens (a small, isolated, additive change — not a behavior change to the screen's own logic) should be an early phase or a fast-follow immediately after this refactor, precisely because it changes the blast radius of every other pitfall on this list from "crash" to "graceful degradation."
- Regardless of whether boundaries are added, treat any hook extraction on these four screens as "no error boundary is catching my mistake" — meaning defensive `try/catch` in async hook logic (already a repo convention per CONVENTIONS.md) and explicit null/undefined handling in newly extracted hooks matters more here than it would elsewhere.

**Warning signs:**
- A newly extracted hook can return `undefined` or throw during a render path that the original inline code guarded with an early return or default value that got lost in extraction.
- No existing Sentry alert volume increase after each phase ships — should be actively monitored (Sentry is already wired per CONCERNS.md), since these screens will crash-not-degrade if something slips through.

**Phase to address:**
Not a phase of this refactor per se (explicitly out of scope), but flag as a **recommended immediately-following milestone** in SUMMARY.md — and treat it as elevated justification for thorough testing (TEST-01/TEST-02) specifically on these four screens, since the safety net that exists elsewhere in the app (graceful error UI) doesn't exist here.

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|-----------------|------------------|
| Extracting a hook and "cleaning up" its dependency array at the same time as moving it | Feels efficient, avoids two passes | Conflates a structural change with a behavior change; if something breaks, you can't tell which edit caused it | Never during this refactor — split into "move verbatim" commit + separate "fix deps" commit if a real bug is found |
| Wrapping every extracted sub-component in `React.memo()` "for performance" | Feels like a natural companion to decomposition | Introduces referential-equality bugs (Pitfall 3) precisely when everything else is also changing, making root-causing harder | Only after decomposition is stable and tested; not bundled with structural extraction |
| Skipping hook unit tests for "simple" extracted hooks (e.g., a hook that just wraps a `useState` + one setter) | Saves time on low-risk-looking code | "Simple" hooks are exactly the ones nobody re-checks when a caller's usage changes later; TEST-01 requires coverage for a reason | Never — TEST-01 is a stated requirement, not optional per hook |
| Converting a conditional style-hide (`display: none`) into conditional JSX mounting (`{cond && <X/>}`) while "cleaning up" JSX during extraction | Looks cleaner, smaller render tree | Changes remount/state-reset semantics (Pitfall 5) — a real behavior change disguised as tidying | Never during this pass; defer to a follow-up UI-changes initiative |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|-----------------|-------------------|
| React Navigation (`navigation.setOptions`, header callbacks) | Header button callback closes over stale state captured at the time `setOptions` ran, not current state | Add the state to the effect's dependency array that calls `setOptions`, or read via a ref updated every render, so the header always calls the latest logic |
| Firestore listeners (`onSnapshot`) inside extracted hooks | Effect boundary shift causes a listener to attach/detach more or less often than before (Pitfall 2) | Test mount/unmount explicitly with RTL; verify listener count parity with pre-refactor screen using a mock/spy on the Firestore SDK call |
| `.web.jsx` platform variants (navigation, `LottieAnimation`, `RiveAnimation`) | Editing the native component's prop contract without checking for a `.web.jsx` sibling | Grep for `.web.jsx`/`.web.js` siblings before changing any shared component's exported shape; keep contracts stable during this pass |
| Module-level singletons (`useRP`, `useProgress`) | Treating them as internal hook state and inlining their logic into a newly extracted hook, losing the `AuthContext` reset-on-swap wiring | Call the existing hooks as black boxes from new code; never re-implement their caching inline in a new hook |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|-----------------|
| Unmemoized hook return values (objects/callbacks) consumed by other hooks' dependency arrays | Extra re-renders, effect loops that re-fire every render, possible extra Firestore reads | `useCallback`/`useMemo` on every hook return value that's used as a dependency elsewhere; test referential stability across re-renders | Immediately on `HomeScreen` (highest hook density per CONCERNS.md) — will show as jank or battery/read-cost increase, not a crash |
| Effect boundary shifted to a conditionally-mounted sub-component | Duplicate listeners/fetches on toggle-heavy screens (filters, expandable sections) | Keep effects in parent hooks when the sub-component's mount lifecycle differs from the screen's; verify with mount/unmount tests | Shows up on `FocusScreen` (filter toggles) and `FriendsScreen` (leaderboard segment toggle) first |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|--------------|-------------------|
| Extraction changes state-reset timing on a filter/search/toggle | User's in-progress input or expanded/collapsed state silently resets on an unrelated re-render | Preserve exact conditional-rendering shape for anything with local state during structural-only extraction; add characterization test for "toggle, do something else, toggle back" |
| A hook extraction crashes on one of the four boundary-less screens instead of degrading | Full red-screen crash mid-quiz/mid-session, losing unsaved progress | Defensive null/undefined handling in every extracted hook; treat these four screens as having zero safety net (Pitfall 8) |

## "Looks Done But Isn't" Checklist

- [ ] **Hook extracted with identical logic:** Often missing a referential-stability check — verify a returned callback/object `toBe()`-equal across two renders with unchanged inputs, not just that the values are functionally correct.
- [ ] **Effect moved into new hook/sub-component:** Often missing a mount/unmount-count parity check — verify the effect fires and cleans up the same number of times as the pre-refactor screen under the same interaction sequence, accounting for React 19 Strict Mode's dev-only double-invoke.
- [ ] **Sub-component with local state (filters, expandable cards, drafts):** Often missing a "reconciliation identity" check — verify state survives the same toggle/interaction sequence it did before extraction, not just that it renders correctly on first mount.
- [ ] **Shared component/hook touched by the refactor:** Often missing a `.web.jsx` sibling check — grep for platform variants before assuming a prop/export shape change is safe.
- [ ] **New hook that caches or holds state across calls:** Often missing an audit against existing module-level singletons (`useRP`, `useProgress`) and their `AuthContext` reset-on-swap guard — verify no new unscoped global was introduced.
- [ ] **Hook unit test (TEST-01) for "simple" hooks:** Often skipped because the hook "obviously" just wraps `useState` — write it anyway; these are exactly the hooks whose contract silently changes later without anyone noticing.

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|-----------------|------------------|
| Stale closure / missing dependency shipped to production | LOW–MEDIUM | Identify via Sentry error/behavior report tied to a specific interaction sequence; add the missing dependency; add a regression test asserting the previously-stale value updates correctly; ship as a hotfix commit (not amended) |
| Duplicate Firestore listener/fetch from shifted effect boundary | MEDIUM | Revert the specific extraction (git revert the phase's commit for that hook only, per the phase manifest); re-extract keeping the effect at the original boundary; add mount/unmount test before re-attempting |
| State-reset regression on a filter/toggle (Pitfall 5) | LOW | Usually a one-line fix (restore original conditional-rendering shape); add characterization test for the exact toggle sequence that broke, then re-verify |
| New singleton accidentally introduced without reset wiring (Pitfall 7) | HIGH | Requires auditing all call sites of the new singleton, wiring it into `AuthContext`'s existing swap-detection guard (or removing the singleton pattern in favor of scoped state) — treat as a stop-the-phase issue, not a quick patch, given this bug class previously caused real cross-account data bleed |
| Crash on one of the four boundary-less screens from an extraction mistake (Pitfall 8) | MEDIUM–HIGH | Immediate Sentry-driven hotfix revert of the specific phase commit via the phase manifest; consider this the strongest argument for prioritizing Error Boundary addition as a fast-follow, since recovery without one requires a full app relaunch for the affected user |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|-------------------|----------------|
| Stale closures in extracted hooks | Every screen phase (recurring, not one-time) | `exhaustive-deps` lint clean on new hook files + hook unit test exercising a re-render with changed inputs |
| Effect boundary timing shift | Every screen phase, esp. `HomeScreen`/`FocusScreen` | RTL mount/unmount test asserting listener/fetch fire-count parity with pre-refactor screen |
| Referential-equality breaks | Every screen phase, esp. `HomeScreen`/`QuizScreen` | Hook unit test asserting returned callbacks/objects are `toBe()`-stable across unchanged re-renders |
| Strict Mode double-invoke confusion | Every screen phase with listeners/subscriptions | Compare dev-mode fire-count against pre-refactor screen before treating as regression; idempotent cleanup functions |
| Reconciliation/state-reset changes | `FriendsScreen` (segment toggle), `FocusScreen` (filter/search) | Characterization test for toggle-then-return interaction sequences before touching surrounding JSX |
| `.web.jsx` variant drift | Any phase touching shared nav/animation components | Grep for `.web.jsx` siblings pre-flight; keep external contract stable |
| Module-level singleton duplication/bypass | `HomeScreen` phase (heaviest `useRP`/`useProgress` consumer) | Re-run guest→real-account swap manual test post-decomposition |
| Missing error boundaries amplifying crash blast radius | Not this refactor — flag as immediate fast-follow milestone | Monitor Sentry crash-rate on the four screens across each phase's rollout |

## Sources

- [Read This Before Refactoring Your Big React Class Components to Hooks (Medium)](https://medium.com/@MilkMan/read-this-before-refactoring-your-big-react-class-components-to-hooks-515437e9d96f)
- [Hooks, Dependencies and Stale Closures (tkdodo.eu)](https://tkdodo.eu/blog/hooks-dependencies-and-stale-closures)
- [Design decision: why do we need the stale closure problem in the first place? (react/react#16956)](https://github.com/react/react/issues/16956)
- [useEffect – React official docs](https://react.dev/reference/react/useEffect)
- [exhaustive-deps – React official ESLint plugin docs](https://react.dev/reference/react-eslint-plugin-react-hooks/lints/exhaustive-deps)
- [Object & array dependencies in the React useEffect Hook (benmvp.com)](https://www.benmvp.com/blog/object-array-dependencies-react-useEffect-hook/)
- [Stale state data calling a function from a header button with useEffect (react-navigation/react-navigation#6675)](https://github.com/react-navigation/react-navigation/issues/6675)
- [Navigation state reference — React Navigation official docs](https://reactnavigation.org/docs/navigation-state/)
- [React Native Web platform specific web.js extension (dev.to)](https://dev.to/gorbypark/react-native-web-platform-specific-web-js-extension-4o8n)
- [Platform-Specific Code — React Native official docs](https://reactnative.dev/docs/next/platform-specific-code)
- [Skip module resolution w/ Metro bundler (expo/expo#21736)](https://github.com/expo/expo/discussions/21736)
- [ReactJs Hooks: useCallback and useMemo (Medium)](https://medium.com/@vipulm124/reactjs-hooks-usecallback-and-usememo-012ad04da554)
- [React useMemo vs. useCallback: A pragmatic guide (LogRocket)](https://blog.logrocket.com/react-usememo-vs-usecallback/)
- [Why Is useEffect Running Twice? React 19 Strict Mode and Effect Cleanup (Pockit Blog)](https://pockit.tools/blog/react-19-useeffect-strict-mode-guide/)
- [Updates to Strict Mode in React 18 (UpgradeJS.com)](https://www.upgradejs.com/blog/javascript/react/updates-to-strict-mode-in-react-18.html)
- [Surviving Legacy Code with Golden Master and Sampling (The Code Whisperer)](https://blog.thecodewhisperer.com/permalink/surviving-legacy-code-with-golden-master-and-sampling)
- [Refactoring React components with Claude Code safely (koder.ai)](https://koder.ai/blog/refactoring-react-components-claude-code)
- [The two-Reacts bug: when packages aren't singletons (dev.to)](https://dev.to/r9v/the-two-reacts-bug-when-packages-arent-singletons-492h)
- [Hooks + multiple instances of React (facebook/react#13991)](https://github.com/facebook/react/issues/13991)
- Project-internal, HIGH confidence (first-party codebase analysis): `.planning/codebase/CONCERNS.md`, `.planning/codebase/CONVENTIONS.md`

---
*Pitfalls research for: React Native (Expo) large-screen refactor — Regentify mobile app*
*Researched: 2026-09-14*
