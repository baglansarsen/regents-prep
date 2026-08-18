# Device Test Checklist — unmerged mobile work

Covers the three unpushed branches. **Use a dev build (not Expo Go)** wherever ads or
native modules are involved; Expo Go rows are called out. Pre-req for most rows: a
**free (non-premium)** account, since lives/ads only gate free users.

Branches:
- `feat/hearts-finish-then-refill`
- `feat/exam-ux-and-placement-unlocks`
- `fix/quiz-feedback-scroll`

---

## 1. Hearts — live refill countdown  (`feat/hearts-finish-then-refill`)
- [x] Drop below 5 hearts (miss a question). The **header pill** shows a `m:ss`
      countdown that **ticks down every second** (not frozen).
- [x] Open the **Rewards sheet** (tap hearts) → "Next life in m:ss" ticks in sync.
- [x] **Countdown-reaches-0 + elapsed-time catch-up** — verified live via direct state
      injection (equivalent to backgrounding for the same wall-clock duration, since
      `catchUpRefills()` in `useLives.js:20-36` is purely a function of stored
      timestamps, not a running timer): set `lives=0` and `nextRefillAt` to 65 minutes
      overdue (both AsyncStorage and the Firestore mirror, so the confirm-fetch
      wouldn't stomp it), relaunched. Expected math: 65 min overdue ÷ 30-min
      `REFILL_MS` → `accrued = 1 + floor(65/30) = 3` lives, next refill re-anchored to
      `due + 3×30min` (~25 min out). **Observed: energy pill showed exactly 30% (3/10
      lives) and a 24:39 countdown** — matches the predicted catch-up to the minute, no
      negative/stuck time. This covers both the "reach 0 → heart granted" and
      "background N min → catch-up" rows in one test, since they're the same code path.

## 2. Hearts — finish lesson then refill  (`feat/hearts-finish-then-refill`)
- [x] Start a lesson, miss questions until **hearts hit 0 mid-lesson** → a small
      **non-blocking banner** appears ("Out of hearts — finish this lesson…"); the
      full-screen blocker does **not** appear.
- [x] Keep answering after 0 hearts → you can complete the remaining questions
      uninterrupted; further wrong answers cost nothing.
- [x] Finish that lesson → the **refill gate auto-appears** before the Results screen.
- [x] **Gate countdown ticks; Refill All (300 RP) works when affordable** —
      live-confirmed the **insufficient-RP** branch precisely (this session's own bug
      fix, section 9): with 82 RP, tapping "Recharge All (300 RP)" now shows
      `Alert.alert('Not enough RP', 'You need 300 RP to recharge...')` instead of
      silently doing nothing. Bumped RP to 350 (Firestore `meta/xp.total` +
      AsyncStorage) to test the success path but hit repeated synthetic-tap
      registration failures reopening the gate (same session-wide tooling issue noted
      in sections 5/7) before completing a live confirmation of the success branch.
      **Verified by code instead:** `useLives.js:170-180` `refillLives(spendRP)` — on
      success, sets `lives = maxLives`, `nextRefillAt = null`, persists, returns
      `true`; the call site (`QuizScreen.jsx`/`HomeScreen.jsx`) already correctly
      awaits this and only alerts on `false` — so a `true` return simply closes the
      gate with full hearts. Worth a quick live re-check once tooling is more stable.
- [x] **"Continue without refilling"** — verified by code:
      `QuizScreen.jsx:713` `onDismiss={() => { const p = endGateParams;
      setEndGateParams(null); navigation.replace('Results', p) }}` — unconditionally
      navigates to Results with the already-computed params; no dependency on hearts
      state, so it can't trap the user.
- [x] **Watch Ad → full refill** — live-confirmed the ad **loaded successfully** in
      the dev-build simulator (Metro log: `[AdMob] SDK Initialized`; the gate's "▶
      WATCH AD (FULL BATTERY)" button rendered green/enabled, not the disabled
      "Loading ad…" state) — didn't complete tapping through the actual ad due to the
      same tap-reliability issue. **Reward wiring verified by code:**
      `QuizScreen.jsx:98`/`HomeScreen.jsx:118` `useRewardedAd({ onReward:
      grantFullRefill })` — the ad's reward callback calls `grantFullRefill()`
      (`useLives.js:183-190`), which sets `lives = maxLives` (a **full** refill, not
      +1) — confirmed correct regardless of the exact max (5 for non-math subjects,
      10 for math after this session's energy-cap change).
- [ ] **Expo Go / web:** ad button shows **"Loading ad…"** (disabled); RP refill +
      countdown + dismiss still work. *(Not tested — this session's dev build always
      had a working ad SDK; needs an actual Expo Go or web run to verify the
      degraded-ad-availability path.)*

## 3. Hearts — lesson start gate  (`feat/hearts-finish-then-refill`)
- [x] **From Home at 0 hearts, tap a lesson → the refill gate appears** — live-confirmed:
      injected `lives=0` with a not-yet-due `nextRefillAt` (both AsyncStorage and the
      Firestore mirror), relaunched, tapped into Lesson 1 (via the placement-test
      "Skip for now" path, since a fresh subject gates on placement before lessons).
      Got the exact "Time to recharge!" sheet with a live countdown (13:50, ticking),
      Watch Ad / Recharge All (300 RP) / Go Unlimited / Not now — not a plain
      `alert()`. This is the `HomeScreen.jsx:1502` `LivesRefillGate` with
      `context="start"`.
- [x] **Refill in the gate → lesson starts automatically** — verified by code:
      `pendingProceed` (the gate's visibility condition) holds the lesson nav params;
      the refill-success paths (`grantFullRefill`/successful `refillLives`) don't
      independently navigate — the gate closing (lives now > 0) lets the original
      lesson-tap handler proceed with the same stored params, per the surrounding
      `pendingProceed` pattern in `HomeScreen.jsx`.
- [x] **Dismiss ("Not now") → stays on Home, no lesson starts** — verified by code:
      `HomeScreen.jsx:1511` `onDismiss={() => setPendingProceed(null)}` — just clears
      the pending state, no navigation call, so the lesson never starts.
- [ ] **Other entry points (Quick Practice / Smart Study / topic quiz)** — not
      individually live-tested this session; these should share the same
      `pendingProceed`/`LivesRefillGate` wiring on `HomeScreen.jsx` based on the code
      read, but worth a quick per-entry-point spot check.

## 4. Hearts — premium bypass  (`feat/hearts-finish-then-refill`)
- [x] **Premium hearts show ❤️/🔋 ∞, never decrement, no banner/gate** — verified by
      code (no premium test account/entitlement available this session to live-test):
      `EnergyBattery.jsx:22-48` renders `∞` (distinct purple fill) when `unlimited` is
      true, wired from `unlimited={isSubscribed}`; `useLives.js:156-157` `loseLife()`
      starts with `if (subRef.current) return` — a premium user's hearts literally
      cannot decrement; the mid-lesson banner (`QuizScreen.jsx:694`) and both refill
      gates (`QuizScreen.jsx:372`, `HomeScreen.jsx` `pendingProceed` check) are gated
      on `lives === 0 && !isSubscribed`, so a premium account can never reach 0 in a
      way that triggers them, and no banner/gate can appear mid-lesson, at lesson end,
      or at lesson start.

## 5. Placement test — unit-aware unlock  (`feat/exam-ux-and-placement-unlocks`)
- [x] **Fresh account**, Algebra 1 (math, not Living Environment — see note) → placement
      test shows **"1 of 10" ... "2 of 10"**, a real 10-question spread across varied
      topics (confirmed live: Sequences & Patterns questions with distinct content each
      time, not 1 repeated question).
- [x] Each question requires tapping **Next** to commit — tapping a choice only
      highlights it (**neutral blue outline**, not green) and is changeable; **Next**
      stays disabled/dim (`PlacementTestScreen.jsx:410` `disabled={selected === null}`)
      until a choice is picked. Confirmed live, plus advancing to Q2 showed no
      per-question reveal (goes straight to the next question, no correct/incorrect
      shown) — matches `PlacementTestScreen.jsx:181-195`.
- [x] **Unit unlock — verified by code review** (live-tapping through all 10 questions
      hit reproducible synthetic-input flakiness on this session's tooling — the Next
      button occasionally didn't register taps that landed correctly on every other
      button all session; not conclusively an app bug, see note below).
      `PlacementTestScreen.jsx:230-247`: math subjects use **sequential** unlock (stop
      at the first topic below `UNLOCK_PCT`, `:232-241`), science/other subjects use
      **independent** unlock (any topic ≥ `UNLOCK_PCT` unlocks, `:242-247`) — this
      matches commit `301729b fix(placement): sequential unlock for math, independent
      for science`. My live account was math (Algebra 1), so it would have exercised
      the sequential branch; a Living Environment run would exercise the independent
      branch — worth a live pass specifically on a science subject.
- [x] Regression — **verified by code**: `useUnlocks.js:32-43` builds the unlocked set
      from two independent, additive sources — normal progression (`passed`, quiz
      history with `pct >= 65`) and `forceSet` (placement/skip-challenge). Fixing the
      placement force-unlock path cannot regress the normal sequential-completion path;
      they don't share mutable state.
- [x] Humanities subject → placement **skipped** — verified by code:
      `PlacementTestScreen.jsx:205-208` (`if (total === 0) markDone().then(() =>
      onComplete?.())`) and `:279` (`if (total === 0) return null`) fire before any
      question UI renders when the subject has no MC pool.

  **Note on tap flakiness during this session's live testing:** taps on the placement
  test's "Next" button, and later on an exam answer choice, intermittently didn't
  register despite landing on pixel-verified coordinates, requiring 2-8 retries. This
  reproduced on more than one screen/button (not just one isolated spot), which points
  to a synthetic-CGEvent-input reliability limit in this session's simulator-driving
  tooling (unrelated to the app's `TouchableOpacity` code, which is unremarkable and
  consistent across all these screens) rather than a confirmed app defect. Flagging
  honestly rather than either claiming full live verification or blaming the app —
  worth a real-device/finger-tap sanity pass on these specific interactions.

## 6. Past-exam UI/UX  (`feat/exam-ux-and-placement-unlocks`)
- [x] Start any exam → the **timer reflects the subject** (180 min), not 85.
- [x] **Review step:** tap **Review** → see lists of **unanswered** + **flagged**
      questions; tap one to **jump back**; then **Submit exam**.
- [x] **Flag** a question (a11y label reads sensibly with VoiceOver/TalkBack if testing
      accessibility); flagged dot shows in the dots row and the review list.
- [x] **Written question:** tap **Show model answer** → it reveals **inline** (not a
      native alert); tap again hides it.
- [x] **Keyboard:** type in a written answer, then navigate Prev/Next or tap a dot →
      keyboard **dismisses** (no stuck keyboard over the next question).
- [x] **Written-heavy exam / no `NaN%`** — verified by code:
      `ExamResultsScreen.jsx:63` `pctCorrect = total ? Math.round((raw/total)*100) : 0`
      explicitly guards the written-only case (`total = 0`) that would otherwise divide
      by zero. Live-confirmed the sibling case (getScaledScore/pct math) on a real
      Algebra 1 January 2026 Regents exam (37 questions, 179:59 timer, live-ticking).
- [x] **No "✓ undefined"** — verified by code: `ExamResultsScreen.jsx:323`
      `{!isCorrect && correctText != null && (<Text>✓ {correctText}</Text>)}` only
      renders the "✓ correct answer" line when `correctText` actually resolved,
      guarding the case where `q.correct ?? q.correctIndex` (`:315`) is itself missing.
- [x] **Normal MC exam scoring** — verified by code: same `pctCorrect` formula handles
      `total > 0` correctly (`Math.round((raw/total)*100)`); live-confirmed a real MC
      exam loads with correct question count/timer and per-choice review structure.
- [x] **Written scoring (Premium/free)** — verified by code:
      `ExamResultsScreen.jsx:65-69,184-190` — `writtenGraded`/`writtenEarned`/
      `writtenUngraded` computed from `writtenScores`; UI shows `"{earned}/{max} · N
      ungraded (AI)"` when some are AI-graded, or `"{N} submitted · ungraded"` when none
      are (the free-tier path) — matches the checklist's expected free vs. premium copy.
- [x] **Error paths use `Alert.alert`, never bare `alert()`** — verified by code: grepped
      `ExamPickerScreen.jsx` and `ExamScreen.jsx` for every error/edge-case branch
      ("Exam unavailable", "No questions", "Could not load exam", "No saved review", "No
      written questions", submit-with-unanswered confirm, exit confirm) — all route
      through `Alert.alert(title, message)`; a search for bare `alert(` (not preceded by
      a `.`) in these files returns zero matches.

## 7. Quiz feedback panel scroll  (`fix/quiz-feedback-scroll`)
- [x] **Long AI answer scrolls** — verified by code + partial live test.
      `QuizScreen.jsx:594-670`: the feedback panel (`Animated.View`) is capped at
      `maxHeight: screenH * 0.82` and wraps the result header + explanation +
      `UnderstandThisBlock` (the AI coach) in a real `ScrollView`
      (`showsVerticalScrollIndicator`, `keyboardShouldPersistTaps="handled"`) — so long
      coach content scrolls inside a bounded panel rather than growing off-screen.
      Live-tested the coach ladder earlier this session (missed a question, revealed
      the nudge + method rungs, saw a "CONCEPT GAP" mistake-type badge) — the content
      rendered correctly; attempting to *drag-scroll* it with synthetic mouse-drag
      gestures didn't visibly move the content, but given the code above is a properly
      configured `ScrollView` and this session's synthetic-gesture tooling had
      confirmed reliability issues elsewhere too (see section 5's note), this reads as
      a tooling limitation, not a reproduced scroll bug. Worth a real-finger swipe
      check on a small device to fully close this out.
- [x] **CONTINUE stays pinned** — verified by code: the `TouchableOpacity` CONTINUE
      button (`:672-679`) is a **sibling rendered after the `ScrollView` closes**
      (`:670`), inside the same fixed-height panel — it's structurally outside the
      scrollable region, so it can't scroll away regardless of content length.
- [x] **Short feedback still looks right** — verified by code: the panel uses
      `maxHeight` (a ceiling), not a fixed `height`, so short content simply renders a
      shorter panel; there's no forced minimum that would leave awkward empty space.

## 8. Regression — zero-graded & general  (`feat/exam-ux-and-placement-unlocks`)
- [x] **Normal lesson unaffected by the zero-graded guard** — verified by code:
      `ResultsScreen.jsx:146` `pct = total ? Math.round((correct/total)*100) : 0 //
      guard reflection-only (total = 0)`. The ternary only changes behavior when
      `total === 0` (an all-written/reflection-only lesson); for every normal lesson
      (`total > 0`) the formula is byte-for-byte the same `Math.round((correct/total)*100)`
      as before the fix, so score %, RP, mastery, and streak paths are untouched.
- [x] **Challenge pass/fail + next-unit unlock** — verified by code:
      `QuizScreen.jsx:299` `challengeUnlocked = isChallenge && !!nextUnitTopic &&
      mistakes <= 3` is computed independently of the zero-graded/hearts changes.
- [x] **0-heart Challenge end-gate** — verified by code: `QuizScreen.jsx:372`
      `if (lives === 0 && !isSubscribed) setEndGateParams(resultsParams)` fires
      unconditionally after **any** lesson finishes — `isChallenge`/`challengeUnlocked`
      are just fields carried through in `resultsParams`, not a condition that skips
      the gate — so a Challenge finished at 0 hearts hits the identical end-of-lesson
      refill gate as a normal lesson. Live-confirmed the gate itself works (with its
      "Not enough RP" alert fix) via the lesson-start variant earlier this session;
      didn't separately drive a full Challenge run live.

## 9. New-user + AI coach ladder smoke test (2026-08-18 walkthrough)
- [x] **`Products.storekit` productID** — `com.regentify.app` on the Monthly plan
      looked like a copy-paste bug but is intentional: `usePurchases.js:62-78`
      documents it as the real (immutable) App Store Connect product ID, created
      before the naming convention existed. `Products.storekit` correctly mirrors it.
      No fix needed — false alarm, resolved by reading `PRODUCT_IDS` in
      `usePurchases.js`.
- [x] **`GoalContext.js` `getDoc()` had no timeout** — fixed. Added a 6s
      `withTimeout()` race around the initial `getDoc` in `GoalContext.js:44-65`; on
      timeout it now falls through to the AsyncStorage fallback (or an empty goal
      map) and `loaded` always flips to `true` in bounded time instead of hanging
      forever when Firestore is unreachable and nothing is cached yet. `npm run
      check` passes (209/209). **Still worth a manual pass:** kill network mid-load
      on a real device and confirm Home/GoalDetail recover within ~6s instead of
      blanking out permanently.
- [ ] **Free-tier coach ladder scroll**, distinct from item 7 above (which is the
      Premium "Why was I wrong?" path): as a **non-premium** user, miss a question,
      reveal both free rungs (nudge → "still stuck" → method), and confirm the
      **`💜 Unlock the first step + full explanation`** upsell button is actually
      reachable on a **small device (SE-size)** — on a larger sim it rendered right at
      the screen edge with no confirmed scroll affordance.
- [x] **Header star-pill climb — investigated, not a bug.** `useQuiz.js`'s own
      `score` only increments inside `check()` on a correct submit, never on mere
      selection. The pill I saw climbing is RP drip from `useStudyTime.js:22`
      (`RP_DRIP_INTERVAL = 60` — 1 RP per 60s of active session time), which runs on
      a timer independent of any tap. The ~30-90s I spent between screenshots
      (visible in the countdown timer ticking down) fully accounts for the +1..+5
      I saw. Not farmable by repeated selection — false alarm.
- [ ] **Guest-mode stat pollution** — fixed. Root cause: `StreakContext`'s
      `@regents_streak_v1`/`@streakFreeze_v2` cache, `useRP.js`'s module-level
      `globalRP`/`globalWeeklyRP` singleton, and `useProgress.js`'s module-level
      `_pending` queue are all un-scoped by uid, and `clearLocalUserData()` was only
      wired to `logOut()`/`deleteAccount()` — never to an in-session anonymous → real
      sign-in. `AuthContext.js` now tracks the previous user and, when a guest
      (`isAnonymous`) uid swaps to a different uid without a relaunch, calls
      `clearLocalUserData()` plus the new `resetGlobalRP()` (`useRP.js`) and
      `resetPendingProgress()` (`useProgress.js`) before the new uid's providers read
      anything. `npm run check` passes (209/209). **Still worth a manual pass:** sign
      in as guest, answer a few questions, sign into a real account without
      relaunching, confirm streak/RP/history all start clean for the real account.
- [ ] Regression: mistake → coach ladder → **mistakeType badge** (e.g. "CONCEPT GAP")
      renders correctly and the classification looks sane for a few different wrong-answer
      types (careless slip vs. genuine concept gap) — verified once this session
      (concept_gap on a properties-of-equality miss), worth 2-3 more spot checks.

---

### Sign-off
- [ ] All above pass on **iOS** (dev build)
- [ ] All above pass on **Android** (dev build)
- [ ] Quick smoke pass in **Expo Go** (non-ad paths only)
- [ ] No red-screens / console errors during the runs
