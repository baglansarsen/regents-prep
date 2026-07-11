# Handoff — session ending 2026-07-05

Context for the next Claude Code session in `regents-prep/`. Work is on `master`, **all pushed** through `ffcecca` (the push triggered an Xcode Cloud iOS build — check its status if a new TestFlight build is expected). Previous handoff (2026-06-17) fully superseded; that work shipped long ago.

## What shipped this session (all mobile/, all pushed)

1. `22ca5f5` — **Today's Mission system**: `pickTodayMission()` 6-rule priority cascade (`mobile/src/utils/todayMission.js`), mission card on HomeScreen, 22 unit tests.
2. `2d732f2` — **Code-review fixes** for it (a full multi-agent /code-review was run):
   - Mixed "All Topics" checkup quizzes now clear `coldStart` and seed the prediction prior (was an infinite-checkup loop).
   - New `weakestAttemptedUnitOf` feeds both pickers (weak-unit mission was unreachable while any unit was unattempted).
   - `pickSmartQuest` got a coldStart guard; shared constants live in `mobile/src/utils/studyConstants.js` (`MASTERY_MIN=85`, `PRACTICE_EXAM_WINDOW_DAYS=14`).
   - Checkup routes through `startQuiz(null, {limit:12})`; mission card gated on new `historyLoaded` flag from `useProgress`; dead `startTodaysMission` deleted; subtitle `\n`s removed.
3. `ef42967` — **Energy/recharge UX**: lives copy → energy ("Time to recharge!", 🪫 banner, "Confidence round" banner in struggle mode); new pure policy `shouldSpendEnergy()` (`mobile/src/utils/energy.js`) — repeat round + struggle mode never spend energy; lives mechanics/LivesContext untouched.
4. `8d094e9` — **School leaderboard v1**: School segment (Friends|School|League toggle in FriendsScreen) now ranks classmates by weekly RP (`rankSchoolWeekly` in `mobile/src/utils/schoolLeaderboard.js`; equality-only Firestore query, no composite index needed). Empty states: "Pick your school…" → new `SchoolPicker` route (both FriendsStack variants, reuses SchoolOnboardingScreen); "No classmates yet". `'Independent'` (onboarding skip) = no school.
5. `ffcecca` — **Share card variants**: `shareCardContent(variant)` in `mobile/src/utils/shareCardCopy.js` — quiz_result (copy unchanged), predicted_up, goal_committed, practice_exam, streak_milestone, weak_topic_mastered. Low exam scores framed positively ("I found my weak spots", number never shown). Triggers wired: ExamResults share button, GoalDetail "Share your climb", HomeScreen milestone "Share the streak", ResultsScreen auto-switches to mastery variant.

**Tests: 8 suites, 133 passing** (`cd mobile && npx jest`). Note: root CLAUDE.md still (wrongly) says the repo has no tests — flagged as improvement option #3.

## Open decision — waiting on the user

`SESSION_IMPROVEMENTS.md` (repo root, untracked) holds a 17-session audit with a **ranked table of 10 improvement options** (skills / automations / corrections). The user has NOT chosen which to implement. Top items: `/ship`+`/release-ios` skill; "check delivery path before re-debugging stale builds" rule; CLAUDE.md test-suite fix + `npm run check`; RevenueCat product-state rule. **Do nothing on these until the user picks numbers.**

## Manual verification still pending (from this session's features)

- Today's Mission: exercise the 6 branches on device/web; confirm single CTA on Home; no clipping at 320px.
- School leaderboard: Social → Leaderboard → School — all three states (no school / alone / ranked); pick a school via the new SchoolPicker route and confirm the list refreshes on return.
- Share cards: all 5 new variants render + capture correctly (especially the low-score practice exam card).
- Energy copy: struggle mode shows the "Confidence round" banner; refill gate says "Time to recharge!"; subscribers still bypass.

## Repo state / reminders

- Untracked (intentional, don't commit without asking): `SESSION_IMPROVEMENTS.md`, `handoff.md`, `AGENTS.md`, `CHROMEBACK_BRANCH_POLICY.md`, `TESTING_CHECKLIST.md`, root `app.json`, `.codex/`, `graphify-out/`. Modified: `.firebase/` cache (chromebook deploy artifact — leave it).
- Rules that have bitten before: **ask before commit AND push** (Xcode Cloud minutes); one app per commit; work in `mobile/` only unless asked; `feat/chromebook-b2b` never merges to master; `shared/content/` flows master → chromebook only.
