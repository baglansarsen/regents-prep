# Feature Research

**Domain:** Large-screen-component refactor + test-coverage initiative (React Native / Expo, existing shipping app)
**Researched:** 2026-09-14
**Confidence:** MEDIUM (general refactoring/testing practice is well-established industry knowledge, cross-checked across multiple independent sources; project-specific application is inferred from this repo's own `.planning/codebase/` docs, which is HIGH confidence since it's a direct codebase read, not a web claim)

## Feature Landscape

This is not a product feature list — it's the landscape of "what a complete, well-executed refactor pass includes" for the specific initiative described in PROJECT.md: decompose `HomeScreen.jsx` (1681 lines), `QuizScreen.jsx` (1221 lines), `FriendsScreen.jsx` (987 lines), `FocusScreen.jsx` (908 lines) into sub-components + hooks, with tests added as code is extracted, zero behavior change.

### Table Stakes (Refactor Isn't Done Without These)

Missing any of these means the refactor either isn't actually finished, or risks silently reintroducing the same debt (untested screens, unstructured business logic) it set out to fix.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Pre-refactor characterization/safety-net tests | Feathers' characterization testing: you cannot safely restructure code with ~zero coverage (this repo has 23 test files, none for these 4 screens per CONCERNS.md) without first pinning down current behavior. Skipping this is how "structure-only" refactors quietly become behavior changes. | MEDIUM | For each screen, capture current behavior for its key state transitions (HomeScreen: no-goal→goal-set; QuizScreen: struggle mode, energy gate, repeat round; FriendsScreen: request accept/block, leaderboard toggle; FocusScreen: filter/search/empty-category) *before* extracting, per CONCERNS.md's own "specific gaps" list |
| Business logic extracted into hooks (`useHomeAgenda`, `useQuizState`, etc.) | This is the repo's own established pattern ("screens are thin — they call hooks and render based on returned state," per ARCHITECTURE.md) and PROJECT.md's stated Core Value. Not doing this means the "refactor" only moved code around visually without fixing the actual problem (logic/UI mixing) | HIGH | Naming convention already fixed by CONVENTIONS.md: camelCase `use`-prefixed, one hook = one concern. Follow the repo's existing extracted-hook precedent (`useProgress`, `useRP`, `useQuiz` already exist) |
| UI decomposed into named sub-components (`components/HomeScreen/ActionCard`, etc.) | CONCERNS.md names this exact fix approach; sub-component boundaries make each piece independently readable, testable, and reviewable in a diff | MEDIUM | PascalCase file naming per CONVENTIONS.md; group under `components/<ScreenName>/` per CONCERNS.md's suggested layout, not a flat dump into the shared `components/` root |
| Unit tests for every extracted hook's state transitions (TEST-01) | Explicit requirement in PROJECT.md; this is the actual deliverable of "add tests as code is extracted, not after" — the extraction moment is the only reliable point to capture coverage per the Key Decisions rationale | MEDIUM | Follow existing test conventions: `__tests__/` co-located, `describe`/`test` blocks, real functions imported and exercised directly (not mocked), per TESTING.md. Test pure state-transition functions the way `livesLogic.test.js` / `streakLogic.test.js` already do |
| Render/snapshot tests for every extracted sub-component (TEST-02) | Explicit requirement in PROJECT.md; catches accidental prop/markup drift during and after extraction | LOW–MEDIUM | This repo has *zero* component tests today (TESTING.md: "React components — no component tests in Jest"). This is new territory for the codebase, not an extension of an existing pattern — expect to establish the first React Testing Library / RN component-test setup as part of this work |
| Byte-for-byte behavior/UI parity verification per screen | PROJECT.md constraint: "No functional or visual changes... Any behavior change discovered as 'needed' is a signal to stop and flag it, not slip it in" | MEDIUM | Manual QA pass per screen against the characterization tests/pre-refactor behavior notes before considering that screen's plan complete; this is the actual acceptance gate for "done," not just "tests pass" |
| Per-file edits only, no bulk `sed`/find-replace across `mobile/src` | Explicit repo-wide rule in CLAUDE.md — a past `sed` rename shipped a crashing TestFlight build; these are exactly the large, high-traffic files that rule protects | LOW (as a discipline, not a technical feature) | `npm run check` (jest + babel parse-check) before every commit; this is a process table-stake, not optional |
| One screen (or one clear sub-unit) per commit/PR, incremental steps | Matches both the general refactor best practice (make the smallest incremental change, verify, commit) and this repo's "one app per commit" / small-batch git discipline | LOW | Enables safe rollback per screen if one extraction goes wrong, without unwinding the whole initiative |
| Preserve existing hook/context contracts screens depend on | These screens already consume 15–20+ existing hooks/contexts (Auth, Theme, Streak, Lives, Goal, RP, Progress, etc.). Extraction must not change how those are called or their return shapes, or it silently becomes a behavior change | MEDIUM | Treat existing context/hook APIs as a frozen boundary during this pass; changing them is legitimate future work, not this initiative |

### Differentiators (Goes Beyond Minimum, Adds Real Value)

Not required for "done," but each meaningfully reduces future risk or effort if the team has appetite for it during this pass.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Error Boundaries wrapped around each refactored screen | CONCERNS.md flags this as a real, named gap ("Missing Error Boundaries in Complex Screens") for exactly these 3-4 screens; decomposition is a natural moment to add this since sub-component boundaries make good boundary placement obvious | LOW–MEDIUM | Only add if it doesn't change *visible* behavior in the non-error path — a boundary that only activates on crash is arguably "structure," not a UI change, but confirm this framing with the team since PROJECT.md's constraint is strict |
| `useMemo`/`useCallback` audit on expensive derivations during extraction | CONCERNS.md explicitly flags HomeScreen's ~20 concurrent hooks and render/memory cost on slow devices; extraction is a natural moment to spot and fix missing memoization since the derivation becomes visible in isolation | LOW | Must produce identical output — memoization is a pure performance optimization, not a behavior change, so it's compatible with the "no behavior change" constraint if done carefully |
| Integration-style tests per screen (not just unit tests of hooks) | CONCERNS.md's "Screen Component Integration Tests" section lists specific untested flows per screen (struggle mode, energy gate, friend request accept/block, filter/search) — covering these goes beyond the minimum (hook state-transition tests + component snapshot tests) toward full regression protection | HIGH | Valuable but not required by PROJECT.md's TEST-01/TEST-02 wording; treat as a stretch goal per screen, not a blocking gate |
| Shared extraction pattern/checklist documented after the first screen | First screen (likely HomeScreen, the largest) becomes the template; documenting the pattern (folder layout, naming, test structure) makes screens 2-4 faster and more consistent | LOW | Natural byproduct of doing screen 1 well — capture it explicitly rather than reinventing per screen |
| Regression-guard comments linking tests to this refactor initiative | This repo's own convention (TESTING.md shows `achievements.test.js` linking to the PR/plan that motivated it) — applying it here documents *why* each extracted test exists | LOW | Free to add, matches existing house style, aids future maintainers |

### Anti-Features (Commonly Requested, Often Problematic Here)

Things teams doing this exact kind of refactor commonly reach for — and why each one specifically undermines this initiative.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|------------------|-------------|
| "While we're in there" feature/UX improvements | Temptation is high — you're already reading every line of a screen that clearly has rough edges (e.g., the noted PetShopScreen app-icon TODO) | PROJECT.md explicitly scopes this out ("New features or UI changes... is a separate initiative"); mixing feature work into a structural refactor makes it impossible to tell if a regression came from the extraction or the feature change, and inflates review/rollback risk on a mature production app | Log the idea (e.g., to CONCERNS.md or a backlog) and defer to a separate initiative, exactly as PROJECT.md's Out of Scope section instructs |
| Bulk `sed`/codemod-driven renames across the 4 screens | Feels faster than per-file edits, especially for repetitive extraction patterns | Explicit repo history: a `sed` rename already shipped a crashing TestFlight build; large high-traffic screen files are precisely the case CLAUDE.md's rule exists to prevent | Per-file edits with `npm run check` before each commit, even if slower |
| Rewriting all 4 screens from scratch instead of incremental extraction | Feels cleaner to design the "ideal" structure once and rebuild | A full rewrite of a shipping screen with near-zero test coverage has no behavior safety net; any subtle divergence (state timing, edge case, race condition) ships silently to production users. Big-bang rewrites also block partial rollback | Incremental "extract, verify, commit" steps per hook/sub-component (strangler-fig style extraction), keeping the screen shippable after every commit |
| Chasing 100% test coverage or exhaustive test suites before calling any screen "done" | Coverage percentage feels like an objective finish line | PROJECT.md's actual bar is TEST-01/TEST-02 (state-transition tests on extracted hooks, render/snapshot tests on extracted components) — not a coverage number. Chasing exhaustive coverage risks scope creep and stalling the refactor indefinitely on a large, already-fragile app | Treat TEST-01/TEST-02 as the acceptance gate; log deeper integration-test gaps (already itemized in CONCERNS.md) as follow-up work, not blockers |
| Introducing a new state-management library (Redux, Zustand, Recoil, etc.) as part of extraction | Screens with ~20 hooks feel like "obviously" a state-management problem | The established, working pattern here is Context + custom hooks (ARCHITECTURE.md); swapping paradigms mid-refactor is itself a large behavior-risk change disguised as cleanup, and directly violates "structure-only, no behavior change" | Extract into hooks that follow the existing Context+hooks pattern; a state-management migration is separate, larger, and out of scope |
| Migrating screens to TypeScript while extracting | Feels natural to "type things properly" while touching every line | This repo is JS/JSX throughout (per CONVENTIONS.md/STACK.md); introducing TS mid-refactor adds a second axis of change (typing decisions, build config) on top of structural extraction, multiplying review surface and regression risk | Keep this pass JS-only; a TS migration, if wanted, is its own initiative with its own plan |
| Flattening all extracted sub-components into the shared `components/` root | Seems to reduce nesting/depth | Loses the screen-scoped grouping CONCERNS.md itself recommends (`components/HomeScreen/ActionCard`) and makes it unclear which components are screen-specific vs. genuinely shared/reusable across the app | Nest extracted, screen-specific sub-components under `components/<ScreenName>/`; only promote a component to the shared root if it's actually reused by a second screen |
| Deferring test-writing to "after all 4 screens are extracted" | Feels efficient to batch all extraction first, then batch all test-writing | PROJECT.md's Key Decision is explicit: tests are added *as* code is extracted, not after, "because extraction is the only reliable moment to capture it" — deferring risks the same outcome that created the current zero-coverage state (tests get deprioritized once the "real" work looks done) | Write the hook/component test in the same commit or PR as its extraction, per screen, per sub-unit |

## Feature Dependencies

```
Pre-refactor characterization/behavior notes
    └──requires (comes before)──> Hook extraction (REFACTOR-0X)
                                        └──requires──> Hook unit tests (TEST-01)

Hook extraction (REFACTOR-0X)
    └──enables──> Sub-component extraction (thin screen calling hook + rendering sub-components)
                       └──requires──> Sub-component render/snapshot tests (TEST-02)

Behavior/UI parity verification
    └──requires──> Both hook extraction AND sub-component extraction complete for that screen
    └──gates──> "Screen is done" (per-screen closure, not whole-initiative closure)

Error Boundaries (differentiator) ──enhances──> Sub-component extraction (boundary placement is easiest once sub-components exist)
Memoization audit (differentiator) ──enhances──> Hook extraction (expensive derivations become visible once isolated in a hook)

"While we're in there" feature work ──conflicts──> Behavior/UI parity verification (any real feature change breaks the parity check by definition)
Big-bang rewrite ──conflicts──> Incremental per-file/per-commit discipline (CLAUDE.md rule)
```

### Dependency Notes

- **Characterization/behavior notes come before extraction:** you need a definition of "unchanged behavior" captured *before* you start moving code, or "no behavior change" becomes an unverifiable claim rather than a tested guarantee. This should be the first step in each screen's plan, not an afterthought.
- **Hook extraction enables sub-component extraction:** the repo's own pattern is "screens are thin — call hooks, render based on returned state" (ARCHITECTURE.md). Pulling logic into hooks first is what makes the remaining JSX small enough to decompose into clean sub-components; doing sub-component extraction first (while logic is still tangled in the screen) tends to produce sub-components that still need screen-level state threaded through many props.
- **Both extraction types require their matching test type as part of the same unit of work:** TEST-01 (hook tests) and TEST-02 (component tests) aren't a separate later phase — per PROJECT.md's Key Decision, they're captured at extraction time.
- **Parity verification gates per-screen closure:** each of the 4 screens (REFACTOR-01 through 04) should be independently verified for behavior/UI parity before being considered done — this project has 4 largely independent screens, not one monolithic deliverable, so don't wait until all 4 are extracted to check parity on the first one.
- **Anti-features conflict with the core constraint, not just with "good practice":** feature creep and big-bang rewrites aren't merely riskier alternatives — they directly violate PROJECT.md's stated constraint ("Behavior: No functional or visual changes") and the repo's git-safety rule, respectively. Treat both as hard stops, not tradeoffs to weigh.

## MVP Definition

This isn't a product with a launch — but the same "ruthless minimum" framing applies to what makes a single screen's refactor legitimately closeable.

### Must Include (per screen, to close REFACTOR-0X + TEST-01 + TEST-02)

- [ ] Pre-extraction behavior notes/characterization for that screen's key state transitions — without this, "no behavior change" is an assertion, not a verified fact
- [ ] Business logic extracted into one or more named hooks, screen reduced to calling hooks + rendering — this is the actual Core Value per PROJECT.md
- [ ] UI decomposed into named sub-components under `components/<ScreenName>/`
- [ ] Unit tests on every extracted hook's state transitions (TEST-01)
- [ ] Render/snapshot tests on every extracted sub-component (TEST-02)
- [ ] `npm run check` passing, per-file edits only, no bulk renames
- [ ] Manual behavior/UI parity check against pre-extraction notes

### Add After Validation (once the first screen's pattern is proven)

- [ ] Apply the same pattern to the remaining 3 screens, adjusting the extraction template based on what was learned on screen 1
- [ ] Memoization pass on any derivation flagged as expensive during extraction (e.g., HomeScreen's homeAgenda computation, per CONCERNS.md)
- [ ] Error Boundary wrap, if the team confirms this doesn't count as a "behavior change" under this initiative's constraint

### Future Consideration (explicitly out of scope for this initiative)

- [ ] Full integration/interaction test suites per screen (struggle mode, energy gate, friend-request flows, etc. — all itemized in CONCERNS.md) — defer to a dedicated test-coverage follow-up initiative
- [ ] Any new feature or UX change surfaced while reading these screens (e.g., PetShopScreen app-icon TODO) — log and defer per PROJECT.md's Out of Scope
- [ ] State-management or TypeScript migration — separate initiatives entirely, not a "later phase" of this one

## Feature Prioritization Matrix

| Feature | User Value* | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Pre-refactor characterization notes | HIGH (risk reduction) | LOW | P1 |
| Hook extraction (business logic) | HIGH | HIGH | P1 |
| Sub-component extraction (UI) | HIGH | MEDIUM | P1 |
| Hook unit tests (TEST-01) | HIGH | MEDIUM | P1 |
| Component render/snapshot tests (TEST-02) | MEDIUM | LOW–MEDIUM | P1 |
| Behavior/UI parity verification | HIGH | LOW | P1 |
| Error Boundaries per screen | MEDIUM | LOW | P2 |
| Memoization audit | MEDIUM | LOW | P2 |
| Integration-style tests per screen | HIGH (long-term) | HIGH | P3 |
| Shared extraction checklist/doc | LOW–MEDIUM | LOW | P3 |

*"User value" here means value to the engineering team maintaining this codebase (the actual "user" of a refactor), not end-user-facing value — by design, end users should notice nothing.

**Priority key:**
- P1: Must have — this is what REFACTOR-01..04 / TEST-01 / TEST-02 actually mean per PROJECT.md
- P2: Should have, add opportunistically per screen if it doesn't risk the "no behavior change" constraint
- P3: Nice to have, explicitly defer to a future initiative

## Sources

- `.planning/PROJECT.md` (this repo) — scope, constraints, Key Decisions, Out of Scope — HIGH confidence, primary source of truth for what "done" means here
- `.planning/codebase/CONCERNS.md` (this repo, mapped 2026-09-14) — names all 4 screens, sizes, fix approach, and itemized untested flows per screen — HIGH confidence, direct codebase analysis
- `.planning/codebase/TESTING.md` (this repo) — existing test conventions, what's tested/not tested today — HIGH confidence, direct codebase analysis
- `.planning/codebase/CONVENTIONS.md` (this repo) — naming/structure conventions extraction must follow — HIGH confidence, direct codebase analysis
- Michael Feathers' characterization/golden-master testing concept, cross-checked across independent sources (Wikipedia, Fabrizio Duroni's write-up, Cloudamite) — MEDIUM confidence, well-established industry practice, not project-specific
- General React refactoring/custom-hooks guidance (react.dev "Reusing Logic with Custom Hooks," CodeScene, community write-ups) — MEDIUM confidence, general practice
- React anti-patterns survey (multiple independent community sources: monolithic components, prop drilling, useEffect misuse, inline heavy computation) — MEDIUM confidence, general practice, cross-checked against this repo's own CONCERNS.md findings (e.g., HomeScreen's ~20 hooks and render-cost note independently corroborates the "heavy computation / monolithic component" anti-pattern warning)

---
*Feature research for: Large-screen-component refactor + test-coverage initiative (React Native/Expo)*
*Researched: 2026-09-14*
