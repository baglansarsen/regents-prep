# Phase 3: FriendsScreen Decomposition - Pattern Map

**Mapped:** 2026-09-15
**Files analyzed:** 12 explicit/implied files (1 hook, ~7-11 components estimated at 20-28 by RESEARCH.md, plus screen + characterization doc)
**Analogs found:** 12 / 12 (all analogs sourced from Phase 2's FocusScreen decomposition, already merged)

**Grounding note:** every analog below is Phase 2's completed, merged FocusScreen decomposition —
`mobile/src/hooks/useFocusScreenState.js`, `mobile/src/components/FocusScreen/*.jsx`, and their
`__tests__/*.test.jsx` pairs. This phase validates the exact same extraction template on a second
screen (CONTEXT.md, RESEARCH.md), so Phase 2's own shipped code is a stronger analog source than
any other pattern in the codebase. All analog paths below verified git-tracked
(`git ls-files -- mobile/src/hooks/useFocusScreenState.js mobile/src/components/FocusScreen/`
returned every listed file — none are gitignored mirrors).

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `mobile/src/hooks/useFriendsScreenState.js` | hook (orchestration) | CRUD + event-driven (Alert/focus-effect) | `mobile/src/hooks/useFocusScreenState.js` | exact |
| `mobile/src/__tests__/useFriendsScreenState.test.js` | test (hook) | CRUD + event-driven | `mobile/src/__tests__/useFocusScreenState.test.js` | exact |
| `mobile/src/screens/FriendsScreen.jsx` (modified) | screen (thin) | request-response (render-from-state) | `mobile/src/screens/FocusScreen.jsx` (post-02-01, now 13 lines — read via `git show` if needed; current shape inferred from `useFocusScreenState.js`'s contract) | exact |
| `mobile/src/components/FriendsScreen/Avatar.jsx` | component (leaf, render-only) | transform (pure render) | `mobile/src/components/FocusScreen/DoneActions.jsx` (render shape) — but zero callback props, so tier-wise closer to `PomodoroCycleDots.jsx`/`SessionSummaryStats.jsx` (render-only tier) | role-match |
| `mobile/src/components/FriendsScreen/Podium.jsx` | component (leaf, Animated) | transform + event-driven (onPress) | `mobile/src/components/FocusScreen/BigPetDisplay.jsx` | exact |
| `mobile/src/components/FriendsScreen/RankRow.jsx` | component (leaf, Animated) | transform + event-driven (onPress) | `mobile/src/components/FocusScreen/BigPetDisplay.jsx` | exact |
| `mobile/src/components/FriendsScreen/LeaderboardTab.jsx` | component (container, per-tab) | CRUD (list render) + event-driven | `mobile/src/components/FocusScreen/FocusSetupScreen.jsx` (multi-section container composing pickers) | exact |
| `mobile/src/components/FriendsScreen/FriendsTab.jsx` | component (container, per-tab) | CRUD (list render) + event-driven | `mobile/src/components/FocusScreen/FocusActiveScreen.jsx` (container composing list + banner widgets) | exact |
| `mobile/src/components/FriendsScreen/BattlesTab.jsx` | component (container, per-tab) | CRUD (list render) + event-driven | `mobile/src/components/FocusScreen/FocusActiveScreen.jsx` | exact |
| `mobile/src/components/FriendsScreen/ActivityTab.jsx` | component (container, per-tab) | CRUD (list render, read-only) | `mobile/src/components/FocusScreen/FocusDoneScreen.jsx` (container, mostly read-only summary) | role-match |
| `mobile/src/components/FriendsScreen/FriendCard.jsx` (discretion) | component (leaf, list row) | event-driven (onPress + onLongPress) | `mobile/src/components/FocusScreen/ActiveTaskList.jsx` (list-row-with-toggle-callback shape) | role-match |
| `mobile/src/components/FriendsScreen/BattleRow.jsx` / `CompletedBattleRow.jsx` (discretion, kept separate per RESEARCH.md Open Question 2) | component (leaf, list row, 2 variants) | event-driven (onPress) | `mobile/src/components/FocusScreen/ActiveTaskList.jsx` + `TaskList.jsx` (kept-separate list-variant precedent) | role-match |
| lbMode toggle widget (within `LeaderboardTab.jsx`, discretion) | component (leaf, chip toggle) | event-driven (onPress, active-state compare) | `mobile/src/components/FocusScreen/SubjectPicker.jsx` (chip-row active-state comparison pattern) | exact |
| `03-CHARACTERIZATION.md` | doc | n/a | `.planning/phases/02-focusscreen-decomposition/02-CHARACTERIZATION.md` | exact (format precedent) |

## Pattern Assignments

### `mobile/src/hooks/useFriendsScreenState.js` (hook, CRUD + event-driven)

**Analog:** `mobile/src/hooks/useFocusScreenState.js` (full file read this session)

**Imports pattern** (`useFocusScreenState.js` lines 21-26):
```javascript
import { useState, useCallback, useRef, useEffect } from 'react'
import { Alert } from 'react-native'
import { useAuthContext } from '../context/AuthContext'
import { useRP } from './useRP'
import { usePetContext } from '../context/PetContext'
import { useFocusSession, SUBJECT_CHIPS, SOUND_OPTIONS } from './useFocusSession'
```
For `useFriendsScreenState.js`, the equivalent import block (per D-01/D-07 and the verified call
site at `FriendsScreen.jsx:1-15`) is:
```javascript
import { useState, useCallback } from 'react'
import { Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useFriends, timeAgo } from './useFriends'
import { useChallenges } from './useChallenges'
import { useLeaderboard } from './useLeaderboard'
import { useFriendsLeaderboard } from './useFriendsLeaderboard'
import { useLeague, TIER_META } from './useLeague'
```
Note: `useFocusScreenState` takes only `navigation` as a param (its own docstring, lines 12-16,
explains why — reading `uid` via `useAuthContext()` inside the hook instead of threading it in).
`useFriendsScreenState` should do the same for `uid`/`user`, but per D-07 it additionally needs
`route` (for `route?.params?.initialTab`) — so the signature is `useFriendsScreenState(navigation, route)`,
not a direct copy of Focus's single-param shape.

**Hook-wrap-not-absorb pattern (5x instead of 1x)** — the file's own docstring (lines 1-20) states
the precedent explicitly: "wraps the existing, untouched useFocusSession domain hook ... Pattern 1
... 'wrap, don't absorb'". Line 70: `const session = useFocusSession(uid, earnRP, handlePomodoroComplete)  // WRAP, not absorb`.
For FriendsScreen, apply this 5 times using the **exact destructure-rename pairs already verified
in RESEARCH.md** (D-03, locked) — copy verbatim from `FriendsScreen.jsx:263-267`:
```javascript
const { friends, incomingRequests, sentRequests, friendCode, feed, acceptRequest, declineRequest, removeFriend, refreshFeed, refreshRequests, refreshFriends } = useFriends(uid, user)
const { incoming: incomingBattles, completed: completedBattles, refresh: refreshBattles } = useChallenges(uid, user)
const { leaderboard, school, loading: schoolLoading, refresh: refreshSchool } = useLeaderboard(uid, user)
const { weeklyRanking, loading: weekLoading, refresh: refreshWeekly } = useFriendsLeaderboard(uid, user)
const { tier, members: leagueMembers, refresh: refreshLeague } = useLeague(uid)
```
Do **not** spread each domain hook's return wholesale the way Focus's single-hook wrap does
(`...session` at line 194) — D-02 requires one flat object, and D-03's renames mean a plain spread
would silently reintroduce the `loading`/`refresh` collision this phase must avoid. Destructure
each domain hook's return individually (as above), then include every destructured field in the
final flat return object.

**Alert-confirm-then-mutate pattern** (`useFocusScreenState.js` lines 174-190, `confirmEndSession`):
```javascript
function confirmEndSession(onStopped) {
  Alert.alert('End Session?', 'Stop now and save your progress?', [
    { text: 'Keep Going', onPress: () => {} },
    {
      text: 'Stop & Save',
      style: 'destructive',
      onPress: () => {
        stop()
        onStopped()
      }
    }
  ])
}
```
Copy this exact shape for `confirmRemoveFriend` — the current inline version at
`FriendsScreen.jsx:274-279` is already close to this pattern (2-button `Alert.alert`, destructive
style, mutation in the destructive button's `onPress`):
```javascript
function confirmRemoveFriend(f) {
  Alert.alert('Remove Friend', `Remove ${f.displayName ?? 'this friend'}?`, [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Remove', style: 'destructive', onPress: () => removeFriend(f.id ?? f.uid) },
  ])
}
```
Move this function, unchanged, into the hook.

**Named-navigation-handler pattern** (`useFocusScreenState.js` lines 161-167, 188-190):
```javascript
function goBack() {
  navigation.goBack()
}
function openHistory() {
  navigation.navigate('FocusHistory', { history })
}
function confirmStopAndGoBack() {
  confirmEndSession(() => navigation.goBack())
}
```
RESEARCH.md's "Navigation handler shape" section identifies 7 `navigation.navigate(...)` call
sites in `FriendsScreen.jsx` (lines 332, 455, 519, 593, 645, 687, 721) that must each become a
named handler following this exact shape — e.g.:
```javascript
function navigateToProfile(entry) {
  navigation.navigate('UserProfile', { targetUid: entry.uid, displayName: entry.displayName ?? entry.name ?? 'Student' })
}
function goToChallengeFromBanner(challengeId, friendName) {
  navigation.navigate('Challenge', { challengeId, friendName })
}
function goToAddFriend() {
  navigation.navigate('AddFriend')
}
function goToSchoolPicker() {
  navigation.navigate('SchoolPicker')
}
function goToLeague() {
  navigation.navigate('League')
}
```
(Name the remaining `Challenge` call sites individually per RESEARCH.md's Open Question 1
recommendation — `goToChallengeFromFriendCard`, `goToRematch`, etc. — not one generic
`goToChallenge(params)`.)

**`useFocusEffect` relocation pattern** — `useFocusScreenState.js` does not itself call
`useFocusEffect` (Focus's screen-focus behavior differs), but the target line in
`FriendsScreen.jsx:272` is:
```javascript
useFocusEffect(useCallback(() => { refreshSchool() }, [refreshSchool]))
```
Move this verbatim into the hook body (RESEARCH.md Pitfall 2 confirms `useFocusEffect` resolves its
own `navigation` via context, independent of the `navigation` param — no rewiring needed).

**Return-object flat-spread pattern** (`useFocusScreenState.js` lines 192-223) — mirror the
category grouping (spread-through fields / derived booleans / option data / screen-local state /
handlers), but per D-02 do not spread a domain hook's raw object (see above) — build the flat
object field-by-field from each destructured domain-hook binding plus `tab`, `lbMode`, `podiumKey`
(D-07), `confirmRemoveFriend`, `navigateToProfile`, the 6 other named nav handlers, and
`handleRefresh`.

**Cross-hook refresh orchestration pattern** — closest existing precedent is
`FriendsScreen.jsx:291-296` itself (not yet in Focus's single-domain-hook shape, since Focus only
ever refreshes one thing); move this verbatim into the hook, unchanged:
```javascript
async function handleRefresh() {
  setRefreshing(true)
  await Promise.all([refreshWeekly(), refreshSchool(), refreshFeed(), refreshRequests(), refreshFriends(), refreshBattles(), refreshLeague()])
  setPodiumKey((k) => k + 1)   // remount Podium → replay animation
  setRefreshing(false)
}
```

---

### `mobile/src/__tests__/useFriendsScreenState.test.js` (test, hook)

**Analog:** `mobile/src/__tests__/useFocusScreenState.test.js` (lines 1-100 read this session)

**Context-mock pattern** (lines 22-41):
```javascript
jest.mock('../context/AuthContext', () => ({
  useAuthContext: () => ({ user: { uid: 'test-uid' } }),
}))
jest.mock('../context/PetContext', () => ({
  usePetContext: () => ({ triggerReaction: jest.fn(), studyBoost: jest.fn(), say: jest.fn(), pet: {...} }),
}))
jest.mock('../hooks/useRP', () => ({ useRP: () => ({ earnRP: jest.fn() }) }))
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)
```
**Firestore-import-chain mock pattern** (lines 43-51, this phase's Pitfall 1 at 5x scale):
```javascript
jest.mock('../utils/activityLogger', () => ({
  logActivity: jest.fn(),
}))
```
Per RESEARCH.md's Pitfall 1 and its own "Code Examples" section, `useFriendsScreenState.test.js`
needs the equivalent for all 5 domain hooks instead of one utility:
```javascript
jest.mock('../hooks/useFriends', () => ({
  useFriends: jest.fn(() => ({
    friends: [], incomingRequests: [], sentRequests: [], friendCode: 'ABC123', feed: [],
    acceptRequest: jest.fn(), declineRequest: jest.fn(), removeFriend: jest.fn(),
    refreshFeed: jest.fn(), refreshRequests: jest.fn(), refreshFriends: jest.fn(),
  })),
  timeAgo: jest.fn(() => 'just now'),
}))
// ...repeat for useChallenges, useLeaderboard, useFriendsLeaderboard, useLeague
```
Also mock `@react-navigation/native`'s `useFocusEffect` per RESEARCH.md Pitfall 3 recommendation 2
(pragmatic, codebase-consistent):
```javascript
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useFocusEffect: (cb) => require('react').useEffect(cb, []),
}))
```
**Fake-timer + navigation-double pattern** (lines 53-68):
```javascript
function makeNavigation() {
  return { addListener: jest.fn(() => jest.fn()), dispatch: jest.fn(), goBack: jest.fn(), navigate: jest.fn() }
}
beforeEach(() => { jest.useFakeTimers() })
afterEach(() => { jest.useRealTimers() })
```
**`renderHook`/`act` assertion pattern** (lines 72-99):
```javascript
test('fresh mount returns idle phase with empty/default state', async () => {
  const navigation = makeNavigation()
  const { result } = await renderHook(() => useFocusScreenState(navigation))
  expect(result.current.phase).toBe('idle')
  // ...
})
```
For Friends, assert the flat return object's fresh-mount shape (`tab === 'Leaderboard'` unless
`route.params.initialTab` overrides, `lbMode === 'friends'`, `podiumKey === 0`, each domain-hook
field present) the same way.

---

### `mobile/src/components/FriendsScreen/Avatar.jsx` (component, leaf, render-only)

**Analog:** `mobile/src/components/FocusScreen/DoneActions.jsx` for structure; render-only tier
follows Phase 2's `PomodoroCycleDots`/`SessionSummaryStats` precedent (RESEARCH.md's own D-05 note
says this is a verbatim relocation, matching `BigPetDisplay`'s verbatim-move precedent exactly).

**Verbatim relocation pattern** (`BigPetDisplay.jsx` docstring, lines 1-12):
```javascript
/**
 * BigPetDisplay — large centered pet with bounce + speech bubble.
 *
 * Relocated body-for-body from the module-local `BigPet` component that lived
 * in `mobile/src/screens/FocusScreen.jsx` (lines 39-113 before this plan).
 * No behavior change: same float-loop timings, ... Only the two relative
 * import paths were adjusted for this file's new depth under `components/FocusScreen/`.
 */
```
Copy this exact framing for `Avatar.jsx`'s docstring, referencing `FriendsScreen.jsx:38-49`
(current `Avatar` function). Only relative import paths change; `Avatar`'s body itself has no
project-internal imports to fix (it uses only `View`/`Text` from `react-native`, taken as `C` prop
— no `useTheme()` call to relocate, per RESEARCH.md's Pitfall 5 note that `Avatar`/`Podium`/`RankRow`
all receive `C` as a prop).

**Render-only test tier** — `Avatar` has zero callback props (`onPress` etc.), so it belongs in the
render-only tier, structurally like:
```javascript
// Pattern from mobile/src/components/FocusScreen/__tests__/BigPetDisplay.test.jsx:31-35
test('renders the initial letter for a given name', async () => {
  await render(<Avatar name="Jordan" C={fixtureTheme} />)
  expect(screen.getByText('J')).toBeOnTheScreen()
})
```

---

### `mobile/src/components/FriendsScreen/Podium.jsx` (component, leaf, Animated)

**Analog:** `mobile/src/components/FocusScreen/BigPetDisplay.jsx` (full file + test, read this
session) — the codebase's only precedent for an `Animated`-heavy leaf component.

**Animated-without-mocking pattern** (`BigPetDisplay.jsx` lines 20-32):
```javascript
const bounceY  = useRef(new Animated.Value(0)).current
useEffect(() => {
  const float = Animated.loop(Animated.sequence([
    Animated.timing(bounceY, { toValue: -8, duration: 1600, useNativeDriver: true }),
    Animated.timing(bounceY, { toValue: 0,  duration: 1600, useNativeDriver: true }),
  ]))
  float.start()
  return () => float.stop()   // cleanup-on-unmount — D-05's flagged risk class
}, [])
```
`Podium.jsx` (relocated from `FriendsScreen.jsx:52-207`) has the same cleanup-on-unmount shape but
with `setTimeout`/`clearTimeout` instead of a loop's `.stop()`:
```javascript
// FriendsScreen.jsx:115-121 (verbatim, relocate unchanged)
return () => {
  clearTimeout(avatarTimer)
  clearTimeout(medalTimer)
  clearTimeout(rpTimer)
}
```
D-05 explicitly says this cleanup-on-unmount risk class is already covered by the standard
interaction/render test — no extra scrutiny task needed.

**Test pattern — render/interact against static output, never assert on `Animated.Value`
internals** (`BigPetDisplay.test.jsx` lines 31-49, and RESEARCH.md's own "Don't Hand-Roll" table):
```javascript
test('renders the catalogue glyph for a pet whose type matches a real entry', async () => {
  await render(<BigPetDisplay pet={basePet()} message={null} onPress={jest.fn()} />)
  expect(screen.getByText('🐶')).toBeOnTheScreen()
})
test('pressing the pet calls the press callback exactly once', async () => {
  const onPress = jest.fn()
  await render(<BigPetDisplay pet={basePet()} message={null} onPress={onPress} />)
  fireEvent.press(screen.getByText('🐶'))
  expect(onPress).toHaveBeenCalledTimes(1)
})
```
For `Podium.jsx`, follow identically: render with a small `top3` fixture, assert visible text
(names, RP values, medal emoji) and that `onPressEntry` fires with the right entry on
`fireEvent.press` — never touch `barScale`/`avatarY`/etc. directly.

---

### `mobile/src/components/FriendsScreen/RankRow.jsx` (component, leaf, Animated)

**Analog:** same as `Podium.jsx` — `BigPetDisplay.jsx`/`.test.jsx`. `RankRow` (relocated from
`FriendsScreen.jsx:210-246`) has a simpler single-`Animated.Value`-pair shape (`slideX`, `opAnim`)
with the same `setTimeout`-based reveal-delay pattern; same "render/interact against static output"
test rule applies.

---

### `mobile/src/components/FriendsScreen/LeaderboardTab.jsx` (component, container)

**Analog:** `mobile/src/components/FocusScreen/FocusSetupScreen.jsx` (full file read this session)
— closest match because it is the multi-section container that composes several named pickers
under one scrollable chrome, structurally identical to what `LeaderboardTab` needs (mode toggle +
3 lbMode sections, each composing `Podium`/`RankRow` or plain rows).

**Container composition pattern** (`FocusSetupScreen.jsx` lines 21-66, prop list, and 96-144,
composition):
```javascript
import SubjectPicker from './SubjectPicker'
import DurationPicker from './DurationPicker'
// ...
export default function FocusSetupScreen({
  subjectChips, subject, showCustomInput, customSubject, presets, preset, sessionGoal,
  // ...
  handleSubjectChip, showCustomSubjectInput, setCustomSubject, handleCustomSubject,
  // ...
}) {
  const { C } = useTheme()
  const s = makeStyles(C)
  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={s.setupScroll} showsVerticalScrollIndicator={false}>
        <SubjectPicker chips={subjectChips} subject={subject} ... onSelectChip={handleSubjectChip} .../>
        <DurationPicker presets={presets} preset={preset} onSelectPreset={setPreset} />
        {/* ... */}
      </ScrollView>
    </SafeAreaView>
  )
}
```
`LeaderboardTab.jsx` receives the flat hook return via prop spread (per RESEARCH.md's
recommendation, this container does call `useTheme()` itself — unlike `Avatar`/`Podium`/`RankRow`
which take `C` as a prop — since `FriendsScreen.jsx`'s top-level `s = makeStyles(C)` currently
supplies all the styles this tab's JSX (lines 362-569) uses). Its own props list should mirror
`FocusSetupScreen`'s "plain values + callbacks only, no navigation object" shape (RESEARCH.md's
"Navigation handler shape" — pass `goToSchoolPicker`/`goToLeague`, never raw `navigation`).

**"Genuinely different active-state comparison stays separate" boundary rule** applies to the mode
toggle vs. `Podium`/`RankRow`/plain-row composition inside `LeaderboardTab` — see
`SubjectPicker.jsx` excerpt below for the toggle widget itself.

---

### `mobile/src/components/FriendsScreen/FriendsTab.jsx` / `BattlesTab.jsx` (component, containers)

**Analog:** `mobile/src/components/FocusScreen/FocusActiveScreen.jsx` (full file read this
session) — closest match because it is a container that composes a header widget, a list widget,
and inline action rows, all wired through callback props with zero direct `navigation` access.

**Container-composes-leaf-widgets pattern** (`FocusActiveScreen.jsx` lines 32-131):
```javascript
export default function FocusActiveScreen({
  phase, secondsLeft, progress, pomodoroCount, sessionGoal, cyclePosition, subject, background,
  todos, pet, buddyMessage,
  pause, resume, skip, stop, confirmStopAndGoBack, toggleTodo, clearBuddyMessage,
}) {
  return (
    <View style={{ flex: 1, backgroundColor: bg.top }}>
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <ActiveSessionHeader subject={subject} pomodoroCount={pomodoroCount} ... onRequestStop={confirmStopAndGoBack} onStop={stop} />
        <PomodoroCycleDots cyclePosition={cyclePosition} accentColor={ringColor} />
        <TimerControls phase={phase} isBreak={isBreak} ... onPause={pause} onResume={resume} onSkip={skip} />
        <ActiveTaskList tasks={todos} onToggle={toggleTodo} accentColor={bg.accent} textColor={textColor} mutedColor={mutedColor} />
      </SafeAreaView>
    </View>
  )
}
```
`FriendsTab.jsx` composes the friend-code banner, sent-requests text, and `FriendCard` rows
(`FriendsScreen.jsx:572-663`); `BattlesTab.jsx` composes the incoming/completed battle sections
(`FriendsScreen.jsx:666-730`). Each named widget receives only plain values + callbacks, matching
`ActiveTaskList`'s `{ tasks, onToggle, accentColor, textColor, mutedColor }` shape — no `navigation`
prop reaches any leaf.

---

### `mobile/src/components/FriendsScreen/ActivityTab.jsx` (component, container, mostly read-only)

**Analog:** `mobile/src/components/FocusScreen/FocusDoneScreen.jsx` — read-only summary container
(not read this session in full, but its role — a container whose content is mostly derived/display
data rather than interactive controls — matches `ActivityTab`'s feed-row rendering,
`FriendsScreen.jsx:733-789`, which has no interactive elements at all besides the tab switch itself
owned by the hook).

---

### `FriendCard.jsx` (discretion widget, event-driven onPress + onLongPress)

**Analog:** `mobile/src/components/FocusScreen/ActiveTaskList.jsx` (full file + test read this
session) — closest precedent for a list-row component with a press callback and no local state.

**List-row-with-callback pattern** (`ActiveTaskList.jsx` lines 19-47):
```javascript
export default function ActiveTaskList({ tasks = [], onToggle, accentColor, textColor, mutedColor }) {
  if (!tasks.length) return null
  return (
    <ScrollView style={s.activeTodos} showsVerticalScrollIndicator={false}>
      {tasks.map((t) => (
        <TouchableOpacity key={t.id} style={s.todoRow} onPress={() => onToggle(t.id)} activeOpacity={0.7}>
          {/* ... */}
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}
```
`FriendCard` needs both `onPress` (→ `navigateToProfile`) and `onLongPress` (→
`confirmRemoveFriend`), per `FriendsScreen.jsx:619-624`:
```javascript
<TouchableOpacity
  style={s.friendCardMain}
  onPress={() => navigateToProfile({ uid: f.id ?? f.uid, displayName: f.displayName })}
  onLongPress={() => confirmRemoveFriend(f)}
  activeOpacity={0.8}
>
```
**Test pattern — argument-asserting interaction test** (`ActiveTaskList.test.jsx` lines 39-51):
```javascript
test('pressing a row calls onToggle with that row id', async () => {
  const props = baseProps({ tasks: [{ id: 1, ... }, { id: 2, ... }] })
  await render(<ActiveTaskList {...props} />)
  fireEvent.press(screen.getByText('practice set'))
  expect(props.onToggle).toHaveBeenCalledWith(2)
})
```
Mirror this for `FriendCard`'s `onPress` (assert the exact profile-nav arg) and add a second test
for `onLongPress` firing `onRemove`/`confirmRemoveFriend` with the right friend record. Note
RESEARCH.md's Gate B update: `onLongPress=` must be added to the interactivity grep pattern (it
was not present in Phase 2's `02-08` gate script, since Focus had no long-press interactions).

**Empty-array render-nothing guard** (`ActiveTaskList.jsx` line 20, `ActiveTaskList.test.jsx` lines
73-77) — mirrors `FriendsScreen.jsx:608-616`'s empty-state block, but note Friends' empty case
renders an illustrated empty-state (not `return null`) — do not copy the `if (!tasks.length) return
null` guard literally; follow the existing empty-state JSX instead (parity lock).

---

### `BattleRow.jsx` / `CompletedBattleRow.jsx` (discretion widgets, 2 variants kept separate)

**Analog:** `mobile/src/components/FocusScreen/ActiveTaskList.jsx` + `TaskList.jsx` — Phase 2's own
precedent for keeping two structurally-similar-looking list-row components separate rather than
unifying behind a `variant` prop, documented in `02-EXTRACTION-TEMPLATE.md`'s "Component
boundaries" section, judgment call 1: "A single `variant='active'|'setup'` flag would have hidden
this real behavioral difference behind a prop... Two small components with duplicated JSX shape are
safer here than one component with a hidden branch." RESEARCH.md's Open Question 2 applies this
same reasoning to `BattleRow` (incoming, `TouchableOpacity` + "Play" pill,
`FriendsScreen.jsx:682-695`) vs. the completed-battle row (plain `View` + won/lost/tie badge +
"Rematch" pill, `FriendsScreen.jsx:701-728`) — keep them as two separate components, not one with a
branching prop.

---

### lbMode toggle widget (discretion, within `LeaderboardTab.jsx`)

**Analog:** `mobile/src/components/FocusScreen/SubjectPicker.jsx` (full file + test read this
session) — closest precedent for a chip-row toggle with an active-state string/id comparison and no
local state.

**Chip-toggle-with-active-comparison pattern** (`SubjectPicker.jsx` lines 19-49):
```javascript
export default function SubjectPicker({ chips, subject, /* ... */ onSelectChip, /* ... */ }) {
  const { C } = useTheme()
  return (
    <>
      <Text style={[s.sectionLabel, { color: C.textMuted }]}>What are you studying?</Text>
      <View style={s.chips}>
        {chips.map((chip) => {
          const active = subject === chip.emoji + ' ' + chip.label
          return (
            <TouchableOpacity key={chip.id} style={[s.chip, active && {...}]} onPress={() => onSelectChip(chip)} activeOpacity={0.75}>
              <Text style={s.chipEmoji}>{chip.emoji}</Text>
              <Text style={[s.chipText, { color: active ? '#fff' : C.text }]}>{chip.label}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </>
  )
}
```
The lbMode toggle (`FriendsScreen.jsx:367-386`) is a fixed 3-option row (`friends`/`school`/
`league`, not a mapped array), so the closest literal shape is simpler than `SubjectPicker`'s
`.map()` — but the **active-state comparison + callback-per-option** pattern transfers directly:
```javascript
// FriendsScreen.jsx:368-373 (verbatim, relocate into the toggle widget)
<TouchableOpacity style={[s.modeBtn, lbMode === 'friends' && s.modeBtnActive]} onPress={() => setLbMode('friends')}>
  <Text style={[s.modeBtnText, lbMode === 'friends' && s.modeBtnTextActive]}>🔥 Friends</Text>
</TouchableOpacity>
```
Note per D-07, `setLbMode` itself lives in the hook (not local `useState`), so this widget receives
`lbMode` + a `setLbMode` (or `onSelectMode`) callback prop, same as `SubjectPicker` receives
`subject` + `onSelectChip`.

**Test pattern** (`SubjectPicker.test.jsx` lines 37-58):
```javascript
function baseProps(overrides = {}) {
  return { chips: SUBJECT_CHIPS, subject: '', /* ... */ onSelectChip: jest.fn(), /* ... */ ...overrides }
}
test('renders the section label and every chip label in list order', async () => {
  await render(<SubjectPicker {...baseProps()} />)
  expect(screen.getByText('What are you studying?')).toBeOnTheScreen()
})
test('pressing a subject chip calls the select handler with that chip record', async () => { /* ... */ })
```
Mirror for the lbMode toggle: assert all 3 labels render, and that pressing each option calls the
select callback with the right mode string.

---

## Shared Patterns

### Context mocking (AuthContext / PetContext / ThemeContext)

**Source:** `.planning/phases/02-focusscreen-decomposition/02-EXTRACTION-TEMPLATE.md`'s "Test
tiers" section (Three context modules table) + `mobile/src/__tests__/useFocusScreenState.test.js`
lines 22-41, `mobile/src/components/FocusScreen/__tests__/BigPetDisplay.test.jsx` lines 14-25.

**Apply to:** `useFriendsScreenState.test.js` (needs `AuthContext` mock — the hook calls
`useAuthContext()`; per RESEARCH.md Pitfall 5, `FriendsScreen.jsx:8-9` also imports `ThemeContext`,
so any container that calls `useTheme()` itself, e.g. `LeaderboardTab`/`FriendsTab`/`BattlesTab`/
`ActivityTab`, needs a `ThemeContext` mock in its own test file too — `Avatar`/`Podium`/`RankRow` do
not, since they take `C` as a prop).

```javascript
// AuthContext — throws outside provider
jest.mock('../context/AuthContext', () => ({
  useAuthContext: () => ({ user: { uid: 'test-uid' } }),
}))
// ThemeContext — silently returns undefined outside provider (fails later, more confusingly)
jest.mock('../../../context/ThemeContext', () => ({
  useTheme: () => ({ C: { bg: '#111827', text: '#F9FAFB', textMuted: '#9CA3AF', brand: '#1FC36B', surface: '#1F2937', surface2: '#374151', border: '#4B5563' } }),
}))
```
Note: this phase does not need a `PetContext` mock (FriendsScreen never imports `PetContext` —
confirmed via `FriendsScreen.jsx:1-15`'s import block having no `PetContext` reference), unlike
Phase 2's Focus screen which needed all three.

### Domain-hook mocking at 5x scale (replaces Focus's single `activityLogger` mock)

**Source:** RESEARCH.md's "Code Examples" section and Pitfall 1 (full text above under
`useFriendsScreenState.test.js`'s Pattern Assignment).

**Apply to:** `useFriendsScreenState.test.js` only — per FRIENDS-04 and Phase 2's own precedent
(`useFocusSession.js` never got its own new test file since it's wrapped, not extracted), the 5
domain hooks (`useFriends`, `useChallenges`, `useLeaderboard`, `useFriendsLeaderboard`, `useLeague`)
are mocked at the module level here, not exercised for real, and are never separately tested by
this phase.

### `useFocusEffect` per-file mock (new pattern this phase introduces, not present in Phase 2)

**Source:** RESEARCH.md Pitfall 3, recommendation 2.

**Apply to:** `useFriendsScreenState.test.js` only (the only file in this phase that calls
`useFocusEffect`, once it's relocated per D-01).

```javascript
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useFocusEffect: (cb) => require('react').useEffect(cb, []),
}))
```

### Navigation handlers wrap navigation, components never see it

**Source:** `.planning/phases/02-focusscreen-decomposition/02-EXTRACTION-TEMPLATE.md`'s "Hook
contract shape" section (`goBack`, `openHistory`, `confirmStopAndGoBack` precedent) +
`mobile/src/hooks/useFocusScreenState.js` lines 161-190.

**Apply to:** `useFriendsScreenState.js` (produces the named handlers) and every container/widget
under `components/FriendsScreen/` (receives only the named handlers as callback props, never a raw
`navigation` object). This is the single decision that keeps every leaf component's test file free
of navigation mocking — verified by Phase 2's zero-`navigation`-reference grep gate at phase close;
Phase 3 should run the equivalent grep over `components/FriendsScreen/*.jsx` before its own
phase-close audit.

### Verbatim relocation of module-local components (D-05)

**Source:** `mobile/src/components/FocusScreen/BigPetDisplay.jsx` lines 1-12 (docstring framing)
+ `.planning/phases/02-focusscreen-decomposition/02-EXTRACTION-TEMPLATE.md`'s recipe step 2 ("Move
each render branch...") and Trap 7 (transitive-import context-mock gotcha).

**Apply to:** `Avatar.jsx`, `Podium.jsx`, `RankRow.jsx` — relocate the function bodies from
`FriendsScreen.jsx:38-246` unchanged, adjust only relative import paths, document the pre-move
source location in each file's docstring the same way `BigPetDisplay.jsx` does.

### Test tiers (D-01, render-only vs. interaction)

**Source:** `.planning/phases/02-focusscreen-decomposition/02-EXTRACTION-TEMPLATE.md`'s "Test
tiers" section — gate scripts (Gate A/B), reproduced in RESEARCH.md with the `onLongPress=` pattern
addition needed for `FriendCard`.

**Apply to:** every file under `components/FriendsScreen/`. Zero-callback-prop components
(`Avatar`) → render-only tier. Every other component in this phase (Podium, RankRow, all 4 tab
containers, all discretion widgets) declares at least one interactive handler and gets an
interaction test.

## No Analog Found

None. Every file this phase creates or modifies has a direct, already-merged analog in Phase 2's
FocusScreen decomposition (per this phase's own explicit grounding directive) — RESEARCH.md's own
"Wave/Plan Sizing Guidance" table confirms the same recipe, component-boundary judgment calls, and
test-tier gates apply without modification, just at larger scale (5 domain hooks vs. 1, 4 tabs vs.
3 branches, ~20-28 components vs. 18).

## Metadata

**Analog search scope:** `mobile/src/hooks/useFocusScreenState.js`,
`mobile/src/__tests__/useFocusScreenState.test.js`, `mobile/src/components/FocusScreen/*.jsx` and
`__tests__/*.test.jsx` (Phase 2, fully merged); `mobile/src/screens/FriendsScreen.jsx` (this
phase's target, full 987-line read); `mobile/src/hooks/use{Friends,Challenges,Leaderboard,
FriendsLeaderboard,League}.js` (import-block reads only, confirming the 0-diff/Firestore-import
claims already established in RESEARCH.md).

**Files scanned:** 1 target screen (full), 1 orchestration hook + test (full), 8 FocusScreen
components + tests (full: `useFocusScreenState.js`, `.test.js`, `FocusSetupScreen.jsx`,
`SubjectPicker.jsx` + test, `ActiveTaskList.jsx` + test, `BigPetDisplay.jsx` + test,
`FocusActiveScreen.jsx`, `DoneActions.jsx`), 5 domain hooks (import blocks only), plus
`02-EXTRACTION-TEMPLATE.md` (full).

**Pattern extraction date:** 2026-09-15
