# FocusScreen Extraction Template

**Purpose:** the reusable recipe Phases 3-5 (FriendsScreen, QuizScreen, HomeScreen) copy, distilled
from what actually happened decomposing FocusScreen (8 plans, 6 waves), not from what the plan
predicted before execution started. Where the two differ, this document follows the executed
history — see each `02-0N-SUMMARY.md` for the primary source.

## The recipe

The ordered procedure this phase actually followed, plan by plan:

1. **Write the characterization notes and commit them before any code moves** (02-01, Task 1,
   commit `a5cbc942`). This is a standalone commit with zero source changes — the baseline must
   exist and be committed *before* the first line of the target screen moves, or the manual parity
   pass at phase close has nothing independent to compare against. `02-CHARACTERIZATION.md`'s own
   header states this explicitly: "It is not amended after extraction begins — a retro-fitted
   baseline would make FOCUS-06 a tautology."

2. **Create the orchestration hook and reduce the screen to a single hook call plus a branch**
   (02-01, Task 2, RED commit `a4635fe4` / GREEN commit `0d5065a6`). The orchestration hook wraps
   the screen's existing domain hook (see "Hook composition" below) and absorbs every remaining
   local `useState`/`useEffect`/handler that used to live directly in the screen component. The
   screen itself does not yet reach its final line count at this step — only the *first* render
   branch (in this phase's case, `done`) is extracted into a named container; the other branches
   are still inlined and will be peeled off in later waves.

3. **Move each render branch into its own container, one branch per plan/wave** (02-02 extracted
   `FocusActiveScreen` in wave 2; 02-04 extracted `FocusSetupScreen` in wave 3, and only at that
   point — once all three branches had a container — did the screen reach its final form). Each
   container receives the orchestration hook's full return value via prop spread and renders one
   branch's worth of JSX moved byte-for-byte from the original screen, including off-grid spacing
   values UI-SPEC flags as inconsistent — parity lock means preserving what shipped, not what a
   spec assumes shipped.

4. **Split each container into named widgets, grouped by the container's own style-factory
   sections** (02-03 split `FocusDoneScreen` in wave 2; 02-05 split `FocusActiveScreen` in wave 3;
   02-06 and 02-07 split `FocusSetupScreen` across waves 4 and 5). This step can only start once
   the container it splits exists — hence the wave ordering below.

5. **Audit the pairing and tier gates mechanically** (02-08, Task 1): confirm every component has a
   test, and every component's test tier matches whether it declares an interactive handler
   attribute. This is a gate run once, at phase close, over the final structure — not a per-plan
   step, because the tier of an individual widget cannot be fully evaluated until all widgets in a
   container have landed and the container's own remaining JSX (if any) is known.

6. **Run the manual parity pass** (02-08, Task 2): a human (or, if no human/simulator-interaction
   tooling is available to the executing agent, an honest "unrun" record — see 02-08-SUMMARY.md)
   walks the running app against the characterization notes from step 1.

### What can run in parallel, and why

This phase's actual wave assignments (from each plan's frontmatter `wave`/`depends_on`):

| Wave | Plans | Parallel? | Why |
|---|---|---|---|
| 1 | 02-01 | — (solo) | Must run first: creates the orchestration hook and the screen's reduced form every later plan builds on |
| 2 | 02-02, 02-03 | Yes | 02-02 touches `FocusActiveScreen.jsx` (new file); 02-03 touches `FocusDoneScreen.jsx` (from 02-01). Disjoint files, both depend only on 02-01 |
| 3 | 02-04, 02-05 | Yes | 02-04 touches `FocusSetupScreen.jsx` (new file, depends on 02-01+02-02 for the final screen's three-branch shape); 02-05 touches `FocusActiveScreen.jsx`'s internals (depends on 02-02). Disjoint files |
| 4 | 02-06 | — (solo) | Touches `FocusSetupScreen.jsx` |
| 5 | 02-07 | — (solo, sequential after 02-06) | **Also** touches `FocusSetupScreen.jsx` — this is the "shared files force sequence" case: 02-06 and 02-07 conceptually could have split independent sections of the same container, but both modify the same file's `makeStyles` and composition JSX, so a parallel wave would produce a merge conflict. They ran sequentially instead |
| 6 | 02-08 (this plan) | — (solo) | Depends on the three plans that did the final widget-split in each branch (02-03, 02-05, 02-07) — the phase-close audit needs every widget to already exist |

**Rule for Phases 3-5:** two plans can share a wave only if they modify disjoint files. Two plans
that both need to edit the same container file (because they're splitting adjacent sections of the
same still-partially-inline container) must be sequential waves, even if their actual code changes
don't conceptually depend on each other.

## Hook composition

**The precedent:** an orchestration hook (`use<Screen>ScreenState`) may call exactly one existing
domain hook and spread its return value into its own return object. This phase established that
`useFocusScreenState(navigation)` calls `useFocusSession(uid, earnRP, handlePomodoroComplete)`
internally, once, and spreads every key of `useFocusSession`'s return through — see
`02-01-SUMMARY.md`'s frozen "Return-Key Contract" for the exact key list.

**This is a deliberate, scoped exception to the standing layer rule.** `.claude/CLAUDE.md`'s
"Layers" section states hooks are "Used by: Screens exclusively (never hook-to-hook calls)." The
orchestration-hook pattern is hook-to-hook by construction. This phase treats that as an
intentional, narrow exception — not a repeal of the rule — scoped specifically to
"one orchestration hook wraps exactly one pre-existing domain hook for the same screen." It does
not license arbitrary hook-to-hook composition elsewhere in the codebase.

**Why wrapping beats absorbing:** `useFocusSession.js` owns the screen's highest-risk logic —
Firestore-backed activity logging, timer/interval management, RP/XP calculation, and the
partial-session-on-early-stop math. Absorbing that logic into the new orchestration hook (rewriting
it inline) would put all of it inside the parity surface this phase's "no behavior changes"
constraint has to protect. Wrapping instead means `useFocusSession.js` is never edited — verified
mechanically every plan via a zero-line `git diff`, most recently confirmed in 02-08's Task 1 gate
against the phase's very first commit (`aac73d00`, before any code moved). The highest-risk code
in the whole screen never entered this phase's blast radius at all.

**For Phases 3-5:** apply this precedent rather than re-deciding it per screen. `useFriendsScreenState`
wraps whatever existing domain hook(s) FriendsScreen currently calls directly; `useQuizState` wraps
`useQuiz` (note the deliberately non-colliding name, already flagged in `STATE.md`'s Blockers —
`useQuizState` vs. `useQuiz` are visually distinct enough that no further disambiguation action was
needed for FocusScreen's analogous `useFocusScreenState` vs. `useFocusSession` pair, and the same
reasoning should hold for Quiz); `useHomeAgenda` wraps HomeScreen's current direct hook calls.

**Flag for the developer, do not act on it:** `.claude/CLAUDE.md`'s "Layers" section wording — "hooks
... Used by: Screens exclusively (never hook-to-hook calls)" — now under-describes the actual
codebase once this phase's orchestration-hook pattern ships, and will under-describe it further
once Phases 3-5 repeat the pattern three more times. Whether to amend that wording (and how — e.g.
adding an explicit "orchestration hooks may wrap exactly one domain hook" carve-out) is the
developer's call, not this phase's. This phase does not edit `.claude/CLAUDE.md` or any file under
`.planning/codebase/` to make the standing rule match the new code — recording the exception here,
in this phase's own artifact, is the correct scope; rewriting the project's standing instructions
without the developer deciding is not.

## Hook contract shape

The return-object shape that worked, frozen by `02-01-SUMMARY.md` and unchanged for the rest of the
phase:

- **Spread straight through from the domain hook:** every key `useFocusSession` already returned
  (state values like `phase`, `todos`, `pomodoroCount`; setters like `setPreset`; actions like
  `start`/`pause`/`stop`) passes through unmodified. The orchestration hook does not rename or
  reshape these.
- **Derived phase booleans:** `isActive`, `isDone` — computed once in the orchestration hook from
  `phase`, so every container and widget can branch on a boolean rather than re-deriving the
  `phase === 'focus' || phase === 'break' || phase === 'paused'` comparison independently in
  multiple places.
- **Option lists passed through as data:** `subjectChips`, `soundOptions`, `backgrounds` — plain
  arrays, not JSX, handed to picker components as props so the component itself stays a pure
  render function over data rather than importing the option list itself.
- **Screen-local state the domain hook never owned:** `todoInput`, `customSubject`,
  `showCustomInput`, `background`, `goalCelebModal`, `buddyMessage` — state that existed as local
  `useState` calls directly in the pre-extraction screen, moved into the orchestration hook
  unchanged.
- **Named handlers, including navigation wrappers, so no component ever touches navigation
  directly:** `goBack`, `openHistory`, `confirmStopAndGoBack` wrap `navigation.goBack()` /
  `navigation.navigate(...)` calls inside the orchestration hook. Every container and widget takes
  a plain callback prop and never receives (or imports) a `navigation` object. This is what the
  phase's zero-`navigation`-reference grep gates on every container enforce, and it is what makes
  every extracted component testable with a plain `jest.fn()` callback double instead of a
  navigation mock.

**Why this shape matters for Phases 3-5:** the "handlers wrap navigation, components never see it"
rule is the single decision that keeps every leaf component's test file free of navigation mocking.
Skipping it (e.g. passing `navigation` down as a prop "for now") would work initially but would
force every downstream component test in that screen's decomposition to carry a navigation mock,
compounding across dozens of test files.

## Component boundaries

**The rule this phase used:** one container per render branch, grounded in the screen's own
pre-extraction section comments and `makeStyles` groupings — not an invented taxonomy. FocusScreen's
three phase branches (`done` / `focus|break|paused` / `idle`) mapped directly to `FocusDoneScreen`,
`FocusActiveScreen`, `FocusSetupScreen`. Then, one widget per style-factory grouping inside each
container — e.g. `FocusDoneScreen`'s stat-row style keys became `SessionSummaryStats`, its button
style keys became `DoneActions`, its modal style keys became `GoalCelebrationModal`.

**Two judgment calls this phase made and their reasons, both should be treated as precedent rather
than re-litigated per screen:**

1. **The two task-list variants (`ActiveTaskList` for the active branch, `TaskList` for the setup
   branch) were kept as separate components, not unified behind a flag.** They differ in real,
   non-cosmetic ways: `ActiveTaskList` is height-capped at `maxHeight: 160` inside a `ScrollView`
   and its empty-array guard lives inside the component; `TaskList` (setup branch) is not
   height-capped and scrolls with the rest of the setup page. A single `variant="active"|"setup"`
   flag would have hidden this real behavioral difference behind a prop, made the height-cap
   conditional instead of structural, and increased the risk of a future edit accidentally applying
   one branch's constraint to the other. Two small components with duplicated JSX shape are safer
   here than one component with a hidden branch.

2. **The two chip rows (per 02-CHARACTERIZATION.md's five selection state machines) were kept as
   five separate components (`SubjectPicker`, `DurationPicker`, `GoalPicker`, `SoundPicker`,
   `BackgroundPicker`), not generalized into one shared `ChipRow`.** Each set uses a genuinely
   different active-state comparison: `SubjectPicker` compares an assembled
   `emoji + ' ' + label` string; `DurationPicker`, `SoundPicker`, and `BackgroundPicker` compare an
   `id`; `GoalPicker` compares a raw number. A generalized `ChipRow` would need a comparator prop
   plus per-set special-casing for `SubjectPicker`'s custom-input fallback path, trading five small,
   independently readable components for one component with a branching comparator — worse for a
   parity-lock refactor whose entire point is minimizing behavior-change surface area per unit
   changed.

**For Phases 3-5:** look for the same signal — genuinely different comparison logic or genuinely
different structural constraint (height cap, scroll behavior) is a reason to keep components
separate even when their JSX looks superficially similar. Reach for a shared/generalized component
only when the underlying behavior, not just the markup, is actually identical.

## Test tiers

D-01 (this phase's test-depth split) restated concretely with this phase's final counts:

- **Render-only tier (zero callback props):** components with no `onPress`/`onChangeText`/
  `onSubmitEditing`/`onRequestClose` attribute get render/snapshot assertions and explicit
  presence/absence checks — never `fireEvent`. **2 of this phase's 18 components** landed here:
  `PomodoroCycleDots` and `SessionSummaryStats`.
- **Interaction tier (declares at least one interactive handler attribute):** gets `fireEvent`-based
  tests asserting exact handler arguments (not just call counts), including the negative case for
  any component with mutually-exclusive dual controls. **16 of this phase's 18 components** landed
  here.

**The two mechanical gates from 02-08 Task 1 that enforce this, runnable verbatim on any future
screen's `components/<ScreenName>/` directory:**

```bash
# Gate A — every component has a test
for f in mobile/src/components/<ScreenName>/*.jsx; do
  b=$(basename "$f" .jsx)
  test -f "mobile/src/components/<ScreenName>/__tests__/$b.test.jsx" || echo "MISSING-TEST $b"
done

# Gate B — every component's test is at the tier its interactivity assigns it
for f in mobile/src/components/<ScreenName>/*.jsx; do
  b=$(basename "$f" .jsx)
  t="mobile/src/components/<ScreenName>/__tests__/$b.test.jsx"
  if grep -qE 'onPress=|onChangeText=|onSubmitEditing=|onRequestClose=' "$f"; then
    grep -q 'fireEvent' "$t" || echo "D01-GAP $b"     # interactive component, no interaction test
  else
    grep -q 'fireEvent' "$t" && echo "D01-OVER $b"    # non-interactive component, has one anyway
  fi
done
```

Both printed nothing across all 18 of this phase's components (`02-08-SUMMARY.md` carries the
verbatim run).

**Three context modules needed mocking across this phase's test files, and they do not fail the
same way outside their provider** — Phases 3-5 will hit the same three, since they are app-wide
contexts, not FocusScreen-specific:

| Context | Hook | Outside its provider |
|---|---|---|
| `AuthContext` | `useAuthContext()` | **Throws** — `if (!ctx) throw new Error('useAuthContext must be used inside <AuthProvider>')` |
| `PetContext` | `usePetContext()` | **Throws** — same guarded-throw shape as `AuthContext` |
| `ThemeContext` | `useTheme()` | **Returns nothing** — `return useContext(ThemeContext)` has no guard, so it silently returns `undefined` outside a provider rather than throwing |

The practical consequence: a test that imports a component calling `useTheme()` without mocking
`ThemeContext` does not fail at the `useTheme()` call site — it fails later, and often confusingly,
when code tries to read a property off the `undefined` theme object (or, as this phase hit at least
once, when `ThemeContext.js`'s own import of `@react-native-async-storage/async-storage` crashes at
*module load time* under Jest, before any hook even runs — see "Traps" below). `AuthContext` and
`PetContext` fail loudly and immediately at the call site instead. Mock all three whenever a
component under test imports, even transitively, a file that calls any of their hooks.

## Traps this phase hit

1. **The requirement-text mismatch.** FOCUS-01's literal wording (and `REQUIREMENTS.md`'s copy of
   it) asks for characterization of FocusScreen's "current filter, search, and empty-category
   behavior." None of those three things exist anywhere in `FocusScreen.jsx` or
   `useFocusSession.js` — confirmed by a full-file read plus
   `grep -niE "search|filter|category"` turning up exactly one hit, a derived-count `.filter()`
   call, not a feature. The wording traces to a stale line in `.planning/codebase/CONCERNS.md`
   ("FocusScreen: No test for filter state, search, or error fallbacks when category is empty")
   that was carried into `REQUIREMENTS.md` verbatim without being re-checked against the actual
   908-line file. **The same stale line describes the other three screens this initiative will
   decompose.** Phases 3-5 should re-verify their own requirement wording (FRIENDS-01, QUIZ-01,
   HOME-01) against the actual screen files *before* planning, rather than inheriting
   `CONCERNS.md`'s description unread — it may or may not be accurate for those screens, and the
   only way to know is to read the file, the same way this phase did for FocusScreen.

2. **The two end-session paths that look identical but differ in what they do after stopping.**
   Both the back-gesture guard and the active header's close (✕) control show the identical
   `Alert.alert` dialog (same title, same message, same two button labels). `02-RESEARCH.md`'s Open
   Question 2 assumed these were byte-identical and could be deduped into one shared callback.
   Re-reading the actual source this phase confirmed they are not: the back-gesture guard calls
   `stop()` then replays the intercepted navigation action (`navigation.dispatch(e.data.action)`);
   the header close button calls `stop()` then does a plain `navigation.goBack()`. This phase
   factored only the shared dialog-showing logic into one helper (`confirmEndSession(onStopped)`),
   invoked twice with two different `onStopped` callbacks — not deduped into one identical
   function. **Any future screen with two visually-identical-looking exit/confirmation paths should
   be read at the source level before assuming they're mergeable**, not assumed identical from
   surface appearance or from an earlier research document's open question.

3. **The similarly named section-label style factory and local style key.** `mobile/src/styles/duo.js`
   exports a shared, reusable `sectionLabel(C)` style-factory function, already used elsewhere in
   the app (e.g. `ActionChipRow.jsx`). Independently, six of this phase's own components
   (`SubjectPicker`, `DurationPicker`, `GoalPicker`, `SoundPicker`, `BackgroundPicker`, `TaskInput`)
   each define their *own* local `sectionLabel` key inside their own component-local
   `StyleSheet`/`makeStyles` object — same name, but a genuinely different value
   (`fontSize: 12, letterSpacing: 0.8, marginBottom: 10, marginTop: 20`, no custom font) than the
   shared factory's (`fontFamily: 'Fredoka_600SemiBold', fontSize: 11, letterSpacing: 1.4`, no
   margins). This is a real trap for a future editor who sees `s.sectionLabel` in one of these six
   files and assumes it is (or should become) the same thing as importing `sectionLabel` from
   `../styles/duo` — it is not, and parity lock means the local, duplicated value must stay exactly
   as it is (it was already this way before this phase started). **Phases 3-5 should grep their own
   target screen for any style key name that collides with a name already exported from
   `mobile/src/styles/`, and treat a name collision as a "verify before touching" flag, not "these
   must be the same thing."**

4. **A second synthetic event in one test corrupted every later test's render in the same file**
   (02-04, `FocusSetupScreen.test.jsx`) — isolated as specific to this one large component's
   render-output size, not a general RNTL rule (`FocusActiveScreen.test.jsx` and
   `FocusDoneScreen.test.jsx` fire multiple `fireEvent` calls across multiple tests at comparable
   totals without the symptom). The workaround was splitting every multi-interaction test into
   single-interaction tests. **If a future screen's largest container's interaction-test file starts
   producing "overlapping act() calls" warnings or "Found multiple elements"/empty-tree failures
   that cascade from one test into every later one in the file, try one `fireEvent` per test before
   assuming the component itself is broken.**

5. **Grep-based acceptance-criteria checks can trip on prose, not just code.** This phase's own
   `<verify>` steps repeatedly grep test/component files for literal strings (`fireEvent`,
   `navigation`, `delete`, `remove`) to catch tier or scope violations — and repeatedly, a file's own
   doc-comment describing the *absence* of that thing (e.g. "no fireEvent, no callback assertions")
   tripped the same grep meant to catch its *presence*. Every instance (02-02's `navigation`
   docstring, 02-03's and 02-05's `fireEvent` docstrings, 02-07's deliberate avoidance of "delete"/
   "remove" anywhere in `TaskList.jsx`'s comments) required rewording the prose to describe the same
   fact without the literal string. **When writing a doc comment for a component whose whole point
   is the absence of some capability, phrase the absence without using the word your own
   verification gate will later grep for.**

6. **A test file's ambiguous text query can collide with real fixture data, not just other UI
   copy.** 02-04's `FocusSetupScreen.test.jsx` needed `getByText('History')` for the header's
   navigation link, but the real `SUBJECT_CHIPS` fixture data includes a subject chip literally
   labelled "History" — both render simultaneously with the default fixture. Fixed by filtering
   that one chip out of the props for the one test that queries the header link, not by switching to
   a positional/indexed query. **When sourcing test fixtures from real option-list exports (per this
   phase's own precedent of not hand-rolling fixture data), check the option labels for collisions
   with any UI copy the test also needs to query by text.**

7. **A component's transitive import chain can crash a test at module-load time even when the
   crashing branch never renders** (02-02, `FocusActiveScreen.test.jsx`). `FocusActiveScreen`
   itself reads no theme token, but statically imports `BigPetDisplay`, which calls `useTheme()` at
   its top level; `ThemeContext.js` imports `@react-native-async-storage/async-storage`, whose
   native module is `null` under Jest without a mock — crashing the whole test file even though
   `PETS_ENABLED` was `false` and the pet block never rendered. **A component that imports another
   component needs that other component's context mocks in its own test file, even if the test
   never exercises the code path that uses them.**

8. **`Date.now()`-based ids collide under modern fake timers** (02-01,
   `useFocusScreenState.test.js`). `addTodo`'s id comes from `Date.now()`; with
   `jest.useFakeTimers()` active for buddy-message/goal-celebration assertions in the same file,
   the clock is frozen unless explicitly advanced, so back-to-back adds produced identical ids.
   Fixed by advancing fake timers by 1ms between adds. **Any future hook test that both uses fake
   timers and calls a `Date.now()`-seeded id generator multiple times in one test needs an explicit
   timer advance between calls.**

9. **A real ESM package import can be unparseable by Jest even when nothing in the test file
   imports it directly** (02-01). `useFocusSession.js`'s `stop()` calls `logActivity()`, which
   imports the real `firebase/firestore` package — an ESM `export` statement Jest's
   `transformIgnorePatterns` doesn't cover, crashing with `SyntaxError: Unexpected token 'export'`
   the first time any test exercised that import chain. Fixed by mocking `../utils/activityLogger`
   in the one test file that needed it, not by touching the shared Jest config. **The first test to
   newly exercise an existing hook's Firestore-writing path in this codebase should expect this, and
   should scope the fix to its own test file.**

10. **A pre-existing asymmetry can be a real (if minor) inconsistency, correctly left unfixed**
    (02-05). `ActiveSessionHeader`'s left stop control (`onRequestStop`) has a `hitSlop` of
    `{ top: 8, bottom: 8, left: 8, right: 8 }`; the right stop control (`onStop`) has none. This was
    already true in the pre-extraction source and was carried over unchanged — correctly, since
    fixing it would be a behavior/hit-target change outside this phase's structural-only scope.
    **Recorded here, not fixed; carried forward below.**

## Cost

Sizing input for Phases 3-5, from this phase's actual totals:

- **Plans:** 8 (7 extraction plans + this phase-close plan)
- **Waves:** 6
- **Components created:** 18, under `mobile/src/components/FocusScreen/`
- **Component test files:** 18 (1:1 pairing, mechanically gated)
- **Test suites scoped to FocusScreen:** 19 (18 component suites + 1 orchestration-hook suite)
- **Tests scoped to FocusScreen:** 130 (of 475 in the full `mobile` suite at phase close)
- **Screen line count:** 908 lines (pre-extraction) → 13 lines (final), against a 35-line ceiling
- **Domain hook (`useFocusSession.js`) diff across the whole phase:** 0 lines — confirmed against
  the phase's first commit (`aac73d00`), not merely the most recent one

## Carry-forward

Every open item this phase is passing forward, so it is visible to whoever plans or executes
Phase 3 without needing to re-read all seven prior `SUMMARY.md` files:

- **FOCUS-06 (manual parity pass): see `02-08-SUMMARY.md`'s Task 2 section for the recorded
  outcome (pass, fail, or honest "unrun") — do not treat this template as the source of truth for
  that result, since it may be re-run after this template is written.**
- **Flaky pre-existing test, out of this refactor's scope:**
  `mobile/src/utils/__tests__/question.test.js`'s `buildUnitSampledSet > guarantees at least 1
  question per unit when target allows` — unseeded `Math.random()`-based shuffle occasionally
  undershoots the expected topic-coverage count. First seen in 02-03, reconfirmed in 02-04, logged
  in `.planning/phases/02-focusscreen-decomposition/deferred-items.md`. Neither file is part of any
  FocusScreen plan's `files_modified`. Recommendation (from `deferred-items.md`): a future
  test-infrastructure or placement-test phase should seed the shuffle or loosen the assertion to a
  tolerance.
- **Pre-existing hit-slop asymmetry, left unfixed by design:** `ActiveSessionHeader`'s left stop
  control has an explicit `hitSlop`; its right stop control does not. Carried over unchanged from
  the pre-extraction source (see Trap 10 above). Not a regression introduced by this phase; not
  fixed, because fixing it would be a hit-target behavior change outside structural-only scope.
- **Requirement-text mismatch likely repeats for the other three screens** (see Trap 1 above) —
  FRIENDS-01, QUIZ-01, and HOME-01 all reference the same `CONCERNS.md` line this phase found stale
  for FocusScreen. Each phase should independently re-verify its own requirement wording against
  its own screen file before planning.
- **Phase 4's naming-collision note, already in `STATE.md`'s Blockers/Concerns:**
  `useQuizState` (new orchestration hook) vs. `useQuiz` (existing domain hook) — flagged as needing
  explicit disambiguation (e.g. a JSDoc header) during Phase 4 planning. This phase's own
  `useFocusScreenState` vs. `useFocusSession` pair used sufficiently distinct names that no
  additional disambiguation action was needed, but Quiz's planner should not assume the same is true
  without checking.
