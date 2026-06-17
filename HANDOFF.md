# Handoff — Regentify mobile session

_Last updated: 2026-06-16 · branch `master` · all work below is **committed and pushed** to `origin/master` (HEAD `47707d3`)._

## TL;DR
This session reworked several `mobile/` surfaces (top bar, Tour, Profile, Progress tab, Social tab) and fixed two real bugs (tip purchases, exam countdown). **None of it has been run on a device/simulator yet** — the changes are visual/multi-screen and the highest-value items need on-device (and in two cases, two-account / StoreKit) verification. See **Needs verification** below.

## Commits this session (oldest → newest, all pushed)
| Commit | What |
|--------|------|
| `fbfd77d` | Replace startup intro carousel with in-app spotlight Tour |
| `94726af` | Fix school onboarding filter-chip clipping |
| `297ec77` | Enable Tip Jar with live App Store prices |
| `f1ada7f` | Merge "Go Premium" + "Support" into one Profile row |
| `f7a8204` | Relocate Quick Practice → Exams tab; extract `PetScreen` |
| `ff923f4` | Top-bar subject sheet (switch + goal) + score badge |
| `8ce5c2d` | Align Tour with new UI; remove intro carousel entirely |
| `335f1d7` | Rebuild Progress tab into one hub; retire `AnalyticsScreen` |
| `b1dba85` | Merge subject + score into one Duolingo-style course pill |
| `233d01e` | **Fix:** tip consumables query `NON_SUBSCRIPTION` |
| `8de17a7` | **Fix:** exam countdown rolls to next session once date passes |
| `47707d3` | Social tab: close battle loop, Battles tab, League segment, friend mgmt |

## Key areas changed
- **Top bar** (`components/GlobalTopBar.jsx`): one course pill = subject + inline score chip + chevron → opens `SubjectSheet` (`components/SubjectSheet.jsx`, new) showing the Regents goal + subject switcher. Score read cheaply from `useGoal().getGoal(subject).predicted.value`.
- **Tour** (`context/TourContext.jsx`, `components/TourHost.jsx`): steps now subject → streak → lives → rp → done; anchors live in the fixed top bar. Replays from Profile → "How It Works". Carousel (`IntroductionScreen.jsx`) deleted. First-run gate fixed (was blocked for all new users by `placementDone===false`).
- **Home/Exams** (`screens/HomeScreen.jsx`, `ExamPickerScreen.jsx`, `utils/subjectData.js`): Quick Practice moved to Exams tab; pet hub extracted to `screens/PetScreen.jsx` (new `Pet` route).
- **Progress tab** (`screens/ProgressScreen.jsx`): predicted-score hero, 3×2 stat strip, weakest/strongest insight + Practice CTA, achievements preview row. `utils/achievements.js` (new) shared with `AchievementsScreen`. `AnalyticsScreen.jsx` deleted (was stale LE-only data).
- **Social tab** (`screens/FriendsScreen.jsx` + challenge/league screens, `hooks/useChallenges.js`, `useFriends.js`): live-updating battle result (`onSnapshot`), new Battles tab (pending + results + rematch), Leaderboard 3-way segment (Friends/School/League), League pull-to-refresh, `removeFriend` + pending-requests surfaced.
- **Bug fixes:** `hooks/usePurchases.js` passes `PRODUCT_CATEGORY.NON_SUBSCRIPTION` to `getProducts` (tips are consumables); `utils/examDates.js` adds `daysUntilExam()` / `effectiveExamDateStr()` used at all countdown sites.

## Needs verification (not yet run anywhere)
1. **Social battle loop — needs TWO accounts.** A challenges B → "Waiting…" should flip live to Won/Lost/Tie when B plays; result then appears in A's **Battles** tab with Rematch.
2. **Tip Jar — needs native build.** Tap a tip → StoreKit purchase sheet (no "product not found"). Simulator only works when **launched from Xcode** (StoreKit config), or use a device with a Sandbox Apple ID. See StoreKit note below.
3. **Exam countdown:** a goal whose committed exam date has passed should show the *next* session, never a negative number.
4. **Visual passes:** course pill (score chip readable, greens at goal), Progress hero/stat-grid/insights, Social Leaderboard segment + League inline standings.
5. Fresh-signup flow: pet → subject → school → Home → spotlight Tour starts (~0.9s) on the subject pill.

## Local-only / uncommitted (intentionally not pushed)
- `mobile/ios/Products.storekit` (gitignored) + the **Run-action** `Regentify.xcscheme` edit — local StoreKit testing only; lets a simulator render simulated tip prices when **launched from Xcode** (Edit Scheme ▸ Run ▸ Options ▸ StoreKit Configuration = Products.storekit). Archive action untouched → production unaffected.
- `REDESIGN_NOTES.md` — untracked, not authored this session.
- `graphify-out/` — knowledge-graph artifacts (kept current; `/graphify update` after code changes, code-only runs cost 0 tokens).

## Project gotchas (carry forward)
- **Always ask before commit/push** — every push triggers an Xcode Cloud build.
- **Mobile only** — don't touch `src/` (web) or `chromebook/` unless asked.
- Validate JSX via local `@babel/core` (`transformFileSync`, preset `babel-preset-expo`) — `npx babel` resolves to a broken babel@5 in this env.
- Committed `mobile/ios/` means `app.json` plugins/infoPlist are ignored; edit `mobile/ios/Info.plist` directly.
- No tests anywhere in the repo; verification is manual.
