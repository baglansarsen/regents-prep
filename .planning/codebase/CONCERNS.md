---
last_mapped_commit: 874b2634efd05a4f691515ba14014a4561ed9e9c
last_mapped_at: 2026-09-14
---
# Codebase Concerns

**Analysis Date:** 2026-09-14

## Tech Debt

### Large Screen Components

**Files:** `mobile/src/screens/HomeScreen.jsx` (1681 lines), `mobile/src/screens/QuizScreen.jsx` (1221 lines), `mobile/src/screens/FriendsScreen.jsx` (987 lines), `mobile/src/screens/FocusScreen.jsx` (908 lines)

- Issue: Screen components far exceed recommended sizes; multiple responsibilities mixed into single files
- Impact: Difficult to test, maintain, and reason about; difficult to isolate bugs; increased cognitive load when onboarding
- Fix approach: Extract UI sub-components into `components/` (e.g., `HomeScreen/ActionCard`, `HomeScreen/UnitBanner`, `QuizScreen/AnswerReview`); extract business logic into hooks (e.g., `useHomeAgenda`, `useQuizState`)
- Priority: High (impacts every session when debugging screen-related issues)

### Missing Answer-Cache for `gradeWriting` Cost Optimization

**Files:** `functions/index.js` (gradeWriting function, line 283-379)

- Issue: AI grading calls (written answer questions) have no cache; identical answers across students are re-graded with redundant API calls (~$0.01 per grade, 10/user/day cap)
- Current: `explainMistake` has a tutor cache; `gradeWriting` does not. Short CRQ answers converge heavily across students (same question, same answer type) but are never deduplicated
- Impact: Unnecessary API costs; slower feedback if rate-limited by daily cap
- Fix approach: Add a Firestore cache keyed by `(questionKey, normalizedAnswer, maxPoints)` where normalize = lowercase + trim + collapse whitespace + strip punctuation (already has `normalizeAnswer` helper at line 275); first student to hit the pair pays; subsequent students read cached grade for free. Documented in `AI_GRADING_NOTES.md` as the "biggest win" cost lever
- Priority: Medium (documented high-ROI optimization that has not been implemented)

### Prompt Caching Not Implemented for LLM Calls

**Files:** `functions/index.js` (both `explainMistake` line 189-198 and `gradeWriting` line 352-359)

- Issue: Haiku calls use identical stable prefixes (system prompt + question + model answer + explanation) across students for the same question; prefix caching at ~0.1× cost is available but not enabled
- Current: All prefix tokens counted at full rate (no cache_read_input_tokens savings)
- Impact: ~10% of input token cost could be recouped per repeat question (savings only trigger if prefix ≥ 2048 tokens; needs verification)
- Fix approach: Enable prompt caching in Anthropic SDK calls (requires API upgrade, then add `cache_control: { type: 'ephemeral' }` to the system message). Caveat: Verify `cache_read_input_tokens` in response before relying on it; minimum cacheable prefix may be larger than our prompt
- Priority: Low (requires validation that our prefix is large enough; skip if < 2048 tokens)

## Known Bugs

### Duplicate Firestore Rules Pattern for `/classrooms`

**Files:** `firestore.rules` (lines 66 and 156)

- Issue: Two `match /classrooms/{classCode}` rules exist; the second (line 156, labeled "B2B Classrooms") has overly permissive `allow read, write: if request.auth != null` with no teacher/owner validation
- Problem: The rules engine will use the **first** matching rule (line 66, which is correct: teacher-only writes, any auth can read); the second rule is dead code. However, dead rules are maintenance debt and confusing
- Trigger: Anyone viewing the rules or making changes to them may assume B2B is handled by the second pattern when it's actually ignored
- Workaround: The first rule (line 66) is already correct; no functional bug in enforcement
- Fix: Delete lines 156-158 (the dead B2B classrooms rule) or clarify in a comment that the pattern at line 66 handles both cases

### PetShopScreen App Icon Change TODO

**Files:** `mobile/src/screens/PetShopScreen.jsx` (line 116)

- Issue: `TODO: call setAppIcon(pet.petType) once icon assets are added` — feature incomplete
- Problem: User can select a pet as their app icon but the actual icon change is not wired; user selects, but sees no visual change on the home screen
- Trigger: User selects a pet in the shop → expects app icon on home screen to change → sees the old icon
- Impact: Low (cosmetic feature, does not block core functionality)
- Fix: Collect icon assets for each pet type, then wire `setAppIcon(pet.petType)` in the purchase confirmation flow in `PetShopScreen.jsx` line 116

## Security Considerations

### Firebase Public Config in Mobile Bundle

**Files:** `mobile/src/firebase.js` (lines 11-18)

- Risk: Firebase API keys are hardcoded in the mobile app bundle
- Current mitigation: These are **public API keys** intentionally shared with clients; Firestore Security Rules (line 34+) enforce user ownership and auth gates (not public read/write). This is the intended Firebase architecture — keys are not secrets
- Recommendations: 
  - Monitor Firestore Security Rules for over-permissive patterns (currently well-scoped by user/teacher/admin)
  - Use Firebase App Check if moving to a paid tier to prevent cross-origin abuse (currently using auth-only)
  - Never put service account keys or API secrets in the client bundle (current setup is correct)
- Priority: Low (current implementation follows Firebase best practices)

### Firestore Rules Overly Permissive for Some Collections

**Files:** `firestore.rules` (line 157: B2B Classrooms)

- Risk: If the second `/classrooms` rule were ever activated (rules engine bug, rule reorder, etc.), `allow read, write: if request.auth != null` would permit any authenticated user to read/write any classroom
- Current mitigation: First rule (line 66) takes precedence; second rule is dead code
- Fix: Delete or clarify the dead rule to prevent future mistakes

## Performance Bottlenecks

### Firestore Hangs Without Network or Cache

**Files:** `mobile/src/context/GoalContext.js` (lines 31-41)

- Problem: Firestore's `getDoc()` never settles on its own when network is unreachable AND nothing is cached yet — blocks the app indefinitely (loading state stuck, blank screens)
- Observed: SessionImprovements.md notes GoalContext had a Firestore timeout issue that has **already been fixed** (withTimeout race, line 35-41)
- Impact: Requires app relaunch or network recovery to proceed; any goal-dependent screen (Home, FocusScreen, etc.) blanks out with no error state
- Current mitigation: `withTimeout()` (line 36-41) races the Firestore fetch against 6s timeout, then falls back to AsyncStorage
- Fix: ✅ Already implemented (race pattern with 6s timeout to AsyncStorage fallback)
- Follow-up: Still worth a manual pass on a real device with network disabled mid-load to confirm Home/GoalDetail recover within ~6s

### Module-Level Singletons Shared Across Users

**Files:** `mobile/src/hooks/useRP.js` (lines 41-52: `globalRP`, `globalWeeklyRP`, `globalLoaded`), `mobile/src/hooks/useProgress.js` (line 18: module-level `_pending` queue)

- Problem: Global singletons not scoped by uid; when a user signs out/logs in without relaunch, the old uid's RP/progress data can bleed into the new uid
- Observed: TESTING_CHECKLIST.md notes a "Guest-mode stat pollution" issue that has **been fixed** in AuthContext (lines 24-28: guest → real account swap clears singletons)
- Current mitigation: AuthContext detects `isAnonymous` uid swap and calls `resetGlobalRP()` + `resetPendingProgress()` before new uid's providers read anything (AuthContext.js:24-28)
- Impact: High if the guard fails (data leakage between accounts); currently protected by the swap detection
- Fix: ✅ Already implemented (auth swap guard calls resetGlobalRP + resetPendingProgress)
- Follow-up: Manual test still needed — sign in as guest, answer a few questions, sign into a real account without relaunching, confirm streak/RP/history all start clean for the real account

## Fragile Areas

### Test Coverage Gaps for Screen Components

**Files:** All screen components in `mobile/src/screens/` except integration tests

- Files: 191 source files (excluding content); 23 test files total (mostly utils/hooks, no screens)
- What's not tested: HomeScreen, QuizScreen, FriendsScreen, FocusScreen, ExamScreen, ResultsScreen, and 20+ other screen components have zero unit tests
- Why fragile: Logic mixed into screens (large files); no automated regression detection; refactors risk breaking navigation, state transitions, or error states without warning
- Safe modification: Extract hooks/utils into testable units (already partially done for `useProgress`, `useRP`, `useQuiz`); then write screen-level snapshot/behavior tests using React Testing Library
- Priority: High (screen refactors happen frequently; tests would catch regressions)

### Chromebook Branch Isolation (`feat/chromebook-b2b`)

**Files:** Separate branch `feat/chromebook-b2b` (never merges to master)

- Files: `chromebook/` entire subtree; `feat/chromebook-b2b` is a permanent fork
- Why fragile: `chromebook/` and `master` diverge over time; shared content flows master → chromebook only (one-way); if mobile code refactors a shared hook or util, the chromebook branch can silently become incompatible
- Safe modification: Keep `shared/content/` in sync (master branch is source of truth); cherry-pick mobile-only improvements to chromebook if they apply; maintain a git worktree for chromebook builds to avoid stash/branch-switch conflicts
- Priority: Medium (documented in HANDOFF.md; mitigated by one-app-per-commit rule and content-flow discipline)

### Missing Error Boundaries in Complex Screens

**Files:** Screens with high state complexity (`mobile/src/screens/HomeScreen.jsx`, `mobile/src/screens/QuizScreen.jsx`, `mobile/src/screens/FocusScreen.jsx`)

- What's missing: No React Error Boundary wrappers around these large screens; a crash in nested component renders a full red screen with no fallback UI
- Why fragile: Large screens have many hooks (HomeScreen uses 20+); an error in a context read or hook can crash the entire screen mid-interaction
- Impact: User loses all progress on current screen (not persisted mid-quiz); requires app force-restart
- Fix approach: Wrap each major screen in an Error Boundary (`Sentry` integration already exists for Firebase; could also use a custom boundary); log errors to Sentry, show a graceful "Something went wrong. Try again." sheet instead of red screen
- Priority: Medium (Firebase Crash Reporting is already wired; Error Boundaries would prevent full-screen hangs)

### Offline-First Cache Synchronization

**Files:** Multiple contexts and hooks (AuthContext, GoalContext, StreakContext, LivesContext, etc.)

- What's fragile: Each context independently reads/writes AsyncStorage + Firestore; no central cache-invalidation or conflict-resolution strategy
- Risk: If two contexts write overlapping user metadata in different orders (e.g., `users/{uid}/meta/goals` vs. `users/{uid}/meta/streak`), stale cache on device A can overwrite fresh Firestore data after a sync
- Current mitigation: Firestore persistent local cache handles this at the SDK level; AsyncStorage is secondary fallback only (offline playback)
- Why it works: Schema is de-normalized (each context owns its own doc path); no multi-doc transactions
- Priority: Low (current design is offline-safe by structure; sync conflicts are prevented by doc isolation)

## Scaling Limits

### Daily AI Grading Cap

**Files:** `functions/index.js` (line 270: `GRADE_DAILY_CAP = 10`)

- Current capacity: 10 live model calls per student per day (cached results are free, unlimited)
- Limit: If a student attempts > 10 graded written questions per day without cache hits, the 11th+ are rejected with "Daily grading limit reached"
- Trigger: Power users in exam-prep mode (practicing a full exam = 8+ written questions, plus daily attempts)
- Scaling path: Increase `GRADE_DAILY_CAP` (line 270), or implement answer-cache (see "Tech Debt" section) so repeat questions don't consume the cap
- Priority: Low (cache-first design pushes most load to free reads; cap only affects high-volume new questions)

### Per-User Tutor Explanation Cap

**Files:** `functions/index.js` (line 27: `DAILY_CAP = 60`)

- Current capacity: 60 tutor calls (`explainMistake`) per student per day (cached results are free, unlimited)
- Limit: After 60 new "Why was I wrong?" explanations in a day, further requests are rejected with "Daily tutor limit reached"
- Trigger: Power users / students using the tutor heavily for every wrong answer
- Scaling path: Increase `DAILY_CAP` (line 27), though 60 is already generous (= ~4 full lessons at 15 questions each); alternatively, implement tiered limits (free users 20/day, premium 60/day)
- Priority: Low (soft limit for abuse prevention; hit mainly by testers or extreme outliers)

### HomeScreen Component Memory / Render Time

**Files:** `mobile/src/screens/HomeScreen.jsx` (1681 lines)

- Current capacity: ~20 hooks (useProgress, useRP, useGoal, useLeague, usePredictedScore, etc.) all fetching and updating state concurrently; dozens of sub-components rendering
- Limit: Render time / memory spike on slow devices (older Android, low-RAM devices); initial load stalls if network is slow (waiting for Firestore + Stripe + RevenueCat calls)
- Scaling path: Code-split into lazy-loaded sub-screens; move non-critical data fetches to background timers; implement useMemo around expensive derivations (homeAgenda computation)
- Priority: Medium (affects perceived performance on first load; monitored via Sentry performance tracking)

## Dependencies at Risk

### Expo SDK Version Lag

**Files:** `mobile/package.json` (line 25: `expo: ^54.0.37`)

- Risk: Expo 54 is several versions behind latest; upcoming Expo 55+ may have breaking changes in plugins, native module compatibility
- Impact: Blocking issues: New Architecture enablement (already done); Apple on-device LLM bridge (`react-native-ai/apple`) requires Expo 53+ (app is on 52, mentioned in AI_GRADING_NOTES.md line 58)
- Migration plan: Bump to Expo 55/56 once EAS build is stable; test on real iOS/Android devices before prod deployment
- Priority: Medium (parked Apple LLM feature blocked by Expo version; blocking upgrade for new device feature support)

### React Native 0.76 → 0.80+

**Files:** `mobile/package.json` (line 49: `react-native: 0.81.5`)

- Risk: Currently on a late 0.81 patch; 0.82+ is approaching but dependency landscape is still stabilizing
- Impact: Low (New Architecture is already enabled, fixing many of the old compatibility issues)
- Migration plan: Monitor 0.82 release; bump after Expo and Firebase support it
- Priority: Low (current version is stable; no immediate breaking changes)

### Firebase v12 → v13

**Files:** `mobile/package.json` (line 45: `firebase: ^12.18.0`)

- Risk: Firebase v13 may introduce breaking changes to Auth/Firestore APIs
- Impact: Unknown until release; currently using `getReactNativePersistence` workaround (firebase.js:6) for RN compatibility
- Migration plan: Test v13 against the app's auth + Firestore patterns; defer upgrade 1–2 minor versions for stability
- Priority: Low (v12 is current stable; v13 not yet critical)

## Missing Critical Features

### App Icon Customization (Pet Shop)

**Files:** `mobile/src/screens/PetShopScreen.jsx` (line 116 TODO)

- Problem: User can "buy" a pet to customize app icon, but visual change (home screen icon) never happens
- Blocks: Cosmetic feature complete; pet shop feels broken despite functional purchase flow
- Priority: Low (core app functionality unaffected; purely cosmetic)

### iOS 16+ on-device LLM Option (Apple Intelligence)

**Files:** Parked, not implemented

- Problem: On iPhone 15 Pro+ with iOS 26, Apple's on-device Foundation Models (~3B, free, offline) could handle cheap first-pass grading/tutoring; current design uses Haiku for all queries
- Blocks: Feature gate requires RN 0.80+ / Expo 53+; app is on RN 0.76 / Expo 52 (mentioned in AI_GRADING_NOTES.md)
- Priority: Low (parked until Expo upgrade; nice-to-have cost reduction, not critical path)

## Test Coverage Gaps

### Screen Component Integration Tests

**What's not tested:** HomeScreen, QuizScreen, FriendsScreen, ExamScreen, ResultsScreen, and 15+ other screens

- Files: `mobile/src/screens/` (all 40+ screens); only 2–3 snapshot tests exist; no behavior/interaction tests
- Risk: Navigation state transitions, error states, data fetching logic, and user interactions are never validated; regressions (e.g., broken button, stale data, infinite loop) only caught in manual QA or production
- Specific gaps:
  - HomeScreen: No test for "no goal" → "goal set" state transition, mission card rendering logic, or action chip row priority
  - QuizScreen: No test for struggle mode, energy gate, repeat round flow, or audio/haptics integration
  - FriendsScreen: No test for friend request acceptance, blocking, or school leaderboard segment toggle
  - ExamResultsScreen: No test for written/graded scoring logic, "why was I wrong?" coach rendering, or share card variants
  - FocusScreen: No test for filter state, search, or error fallbacks when category is empty

- Priority: High (screen logic is the app's core; most bugs discovered in production would be caught by integration tests)

### Error State Coverage

**What's not tested:** Error handling paths (offline, network timeout, API rate limit, invalid data)

- Files: All screens and hooks; `catch` blocks exist (44 in hooks/) but are rarely tested
- Risk: Error paths discovered by users (500 error, "Daily limit reached", network hiccup) cause UX regressions; no test ensures the error UI renders or recovery flows work
- Examples:
  - `GoalContext.js`: withTimeout race tested by code review, never by automated test
  - `gradeWriting`: `resource-exhausted` error (daily cap) untested; unclear if UI shows the alert or silently fails
  - `QuizScreen`: `useRewardedAd` failure (ad SDK not available) untested; unclear if button gracefully disables or crashes

- Priority: Medium (affects user trust; errors are hard to reproduce on CI but easy to hit in QA)

### Offline Mode Coverage

**What's not tested:** AsyncStorage fallback, Firestore cache replay, and sync conflict handling

- Files: GoalContext, StreakContext, LivesContext, AuthContext (all use Firestore persistent cache)
- Risk: Offline workflows are tested manually (airplane mode, network kill) but never automated; sync bugs only found after deploy
- Priority: Low (offline-first design is sound by structure; sync conflicts prevented by doc isolation; manual testing sufficient for now)

---

*Concerns audit: 2026-09-14*
