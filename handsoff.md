# Handoff — iOS TestFlight release prep (Regentify)

_Last updated: 2026-06-04 (session 5: automated enrichment, flashcards & routing)_

## ⚡ Latest session (session 5: automated enrichment completion, humanities flashcards, routing fixes)

### 100% Questions Enriched Across Humanities (English, Global History, US History)
- Completed enrichment for **1,014 multiple-choice questions** across English, Global History, and US History exams.
- All platforms (`mobile/src/content`, `shared/content`, `src/data`) are fully synchronized with identical question data.
- Fills detailed `explanation` and `diveDeep` test-taking strategy fields for every question.
- Discovered and repaired multiple OCR discrepancies (e.g. empty choices, text mergers, incorrect question types) before run.

### Humanities Flashcards Integrated
- Generated and integrated **135 humanities flashcards** (40 ELA, 50 Global History, 45 US History) into `flashcards.js` on all three platforms.
- Corrected the routing and fallback behavior in `mobile/src/screens/FlashcardScreen.jsx` to dynamically map and filter flashcard decks according to the active subject (resolving a fallback bug).

### Deployment and Git
- **Firebase Deployment**: Successfully built and deployed Chromebook (`regents`) target to Firebase Hosting at `https://regents-prep.web.app` from `chromebook/dist`.
- **Checked-in Tooling**: Staged and committed scripts used for this session's validation and formatting:
  - `scripts/sync-enrichment.mjs` — Synchronizes and validates enrichment data between all platforms.
  - `scripts/write-enrichment.mjs` — Merges generated explanations back into source JS modules.
  - `scripts/add-humanities-flashcards.mjs` — Formats and appends flashcards.
  - `scripts/analyze-enrichment.mjs` — Analyzes missing fields or structures.
  - `scripts/list-missing.mjs` — Checks and lists missing properties.
  - Excluded `scratch/` files from Git tracking.

## ⚡ Previous session (session 4: add 3 humanities subjects + enrichment automation)

### Wired English, Global History, US History exams into all platforms (COMMITTED + DEPLOYED)
- Added three new subjects across **all three platforms** (`mobile/src/content`, `shared/content` [deployed web], `src/data`):
  - **English (ELA):** 31 exams, 342+ questions
  - **Global History:** 15 exams, 156+ questions
  - **US History:** 9 exams, 85+ questions
- Each platform's `regents-exams/index.js` + `subjects.js` updated with imports, arrays, metadata (icon, color, shortName).
- Raw wire-up from `output/data/<subject>/<session>.json` (extracted OCR) → app modules. Real question text/choices; explanation/diveDeep not yet filled.
- **508 new images** (`english/`, `global-history/`, `us-history/`) copied into `public/images/exams/` for CDN serving.
- Generators:
  - `scripts/generate-humanities-exams.mjs` (one-time): output JSON → raw app modules (both platforms)
  - `scripts/enrich-humanities.mjs` (older): enrich questions only
  - `scripts/enrich-full.mjs` (new): enrich questions + generate flashcards (all three platforms at once)

### Enrichment automation ready (NOT YET RUN — requires API key)
- Three tools created, ready for execution:
  1. **`scripts/enrich-all.prompt.md`** — detailed system prompt for agent/CLI
  2. **`scripts/enrich-full.mjs`** — automated node script: enriches all 583 MC questions + generates ~130 flashcards (English ~40, Global ~50, US ~45)
  3. **`ENRICHMENT.md`** — usage guide, subject specs, troubleshooting
- Non-destructive enrichment pattern: fills only missing `explanation`/`diveDeep` fields, skips already-enriched questions, preserves all existing data.
- Cost estimate: ~$0.20–$0.30 (Claude 3.5 Sonnet), ~2–3 hours runtime (API latency), idempotent (safe to re-run).
- **Next step:** run `ANTHROPIC_API_KEY=sk-... node scripts/enrich-full.mjs` (user to execute with their key).

### Exam counts & validation
- **Web (src/data):** 140 imports (8 subjects: STEM + life-science only, humanities NOT in this tree's index yet)
- **Mobile (mobile/src/content):** 179 imports (all 11 subjects)
- **Deployed web (shared/content):** 180 imports (all 11 subjects) ← **THIS IS THE LIVE CDN**
- Both Vite builds pass (root `npm run build` + `cd chromebook && npm run build`).
- All registries resolve with no duplicate IDs.

---

## ⚡ Previous session (session 3: web hosting / corrected images live)

### Corrected exam images pushed live (DONE)
- Corrected images in `output/images/` were already propagated locally
  (`output/images` → root `public/images` → `chromebook/public/images`, a **symlink**) but had
  never been deployed, so `regents-prep.web.app` served stale versions.
- Rebuilt `chromebook/` + deployed `--only hosting:regents`. Verified live CDN now matches
  (e.g. `geo-june-2025/q10.png` md5 `9c94abff…`).
- The mobile app loads all exam images from `regents-prep.web.app` at runtime (`CDN_BASE` in
  `mobile/src/screens/QuizScreen.jsx` + `ExamScreen.jsx`), so this is live immediately — **no
  app rebuild/resubmission needed**.

### Fixed `scripts/deploy.sh` (was broken for current hosting layout) (COMMITTED this session)
- It targeted `dist/` (root vite build), but Firebase serves the `regents` target from
  **`chromebook/dist`** (`firebase.json` / `.firebaserc`). Now it builds `chromebook/`, and
  `--images-only` refreshes `chromebook/dist/images` (with a guard if no build exists), then
  deploys `--only hosting:regents`.
- `./scripts/deploy.sh` = build chromebook + deploy live site. `--images-only` = push image
  changes with no rebuild. `--verify` = verify images first.
- **mobile-web** site (`regents-prep-mobile.web.app`) is separate: `npm run deploy:mobile`.

### Hosting / data map (reference)
- `regents` → `chromebook/dist` → `regents-prep.web.app` (web app **and** all exam images that
  both web + mobile consume). `mobile-web` → `mobile/dist` → `regents-prep-mobile.web.app`.
- Source of truth: `output/data/*.json` (raw) + `output/images/**`. App-consumed enriched exams:
  `mobile/src/content/regents-exams/<subject>/<session>.js` (add `topic`, `explanation`,
  `diveDeep`, `modelAnswer`). No auto-generator from `output/data` → these; enrichment is manual.
- A non-destructive agent prompt for writing `explanation`/`diveDeep`/`modelAnswer` (fills only
  missing fields, never deletes/reorders) was drafted this session — not yet saved to the repo.

### Xcode Cloud (decided: DROP, stay on EAS)
- Xcode Cloud failed ("Workspace Regentify.xcworkspace does not exist") because `mobile/ios/` is
  gitignored and Xcode Cloud clones git only; EAS uploads the working tree so it's unaffected.
  Action: disable the Xcode Cloud "Default" workflow in App Store Connect to stop failure emails.

---

## ⚡ Previous session (session 2: placement test + Apple sign-in entitlement)

### Placement test — UX refresh + unit-unlock fix (COMMITTED)
- **Bug fixed:** completing the placement test force-unlocked topics in AsyncStorage
  (`@skipUnlocks_${subject}`) but Home never re-read them, so units stayed locked. The test is a
  `Modal` *inside* HomeScreen, so its `useFocusEffect` reload never re-fires when the modal closes.
  Fix: `handlePlacementComplete` in `mobile/src/screens/HomeScreen.jsx` now calls
  `reloadSkipUnlocks()` → units unlock instantly after START LEARNING.
- **New `'intro'` phase** in `mobile/src/screens/PlacementTestScreen.jsx` (now the first screen):
  hero + info card + **START TEST →** and an obvious **SKIP FOR NOW** button. Header "Skip test →"
  chip kept as secondary.
- **Android back** inside the placement modal → `handlePlacementBack` in HomeScreen shows a
  "Skip the placement test?" confirm (persists `@placementDone_v1_${uid}`). Wired via the Modal's
  `onRequestClose` (RN routes Android back there, not to a BackHandler inside modal content).
- **Visual refresh:** progress bar + dots reflect the answered question; question card uses
  `elevatedCard`; results screen has a big score hero, fixed "Topic Breakdown" alignment, and an
  `ActivityIndicator` spinner on the saving CTA. Scoring / `UNLOCK_PCT = 80` / `forceUnlock` flow
  unchanged.

### Sign in with Apple — entitlement fix (⚠️ NOT in git — see below)
- **Symptom:** "The authorization attempt failed for an unknown reason" (`ASAuthorizationError`
  1000) on Apple sign-in. **Cause:** `mobile/ios/Regentify/Regentify.entitlements` was an empty
  `<dict>` — missing `com.apple.developer.applesignin`. The native request aborts before reaching
  Firebase. (Committed-ios → EAS skips prebuild → app.json/plugins never added it.)
- **Fix applied (local working tree):** added `com.apple.developer.applesignin = ["Default"]` to
  `mobile/ios/Regentify/Regentify.entitlements`, and `"usesAppleSignIn": true` to `app.json` ios
  block (defensive, for any future prebuild).
- **⚠️ `mobile/ios/` is gitignored** (`mobile/.gitignore:40:/ios`) — 0 tracked files. So this
  entitlement edit (like last session's Info.plist build-#16 fix) is **NOT in git history**. It
  lives only in the local working tree and ships to TestFlight via the EAS upload (root
  `.easignore`). If this machine/checkout is lost, re-apply the entitlement by hand.
- **Still required to make Apple sign-in actually work:**
  1. **Rebuild** (entitlement is compiled into the binary; current build won't change). EAS managed
     credentials auto-enable the App ID "Sign in with Apple" capability on build.
  2. **Firebase Console → Authentication → Sign-in method → enable Apple** (else next error is
     `auth/operation-not-allowed`).
  3. Simulator only: must be signed into iCloud in Settings, or it fails regardless.

---


> Previous handoff (Life Science: Biology content integration) is **done & shipped**
> (commit `4365623`, deployed to https://regents-prep.web.app). See git history for that.
> This doc covers the current effort: getting the iOS app onto TestFlight and clearing
> App Store review blockers.

## TL;DR current state
- **Build #16 is the live one** — building on EAS + auto-submitting to TestFlight.
  It fixes the launch crash that killed build #15.
- **All of this session's code is UNCOMMITTED** in the working tree. EAS builds from the
  working tree (not git), so builds include it — but it still needs to be committed.
- Mobile-only work (`mobile/`), per project convention.

## ⚠️ Build #15 crashed on launch — root cause & fix (CRITICAL to understand)
- **Symptom:** TestFlight build #15 aborted instantly on launch (SIGABRT).
- **Real reason** (from device console): `RCTFatalException: This app is missing
  'NSUserTrackingUsageDescription'`. The ATT call at launch hard-aborts without that
  Info.plist key. An `RCTFatalException` is native — a JS try/catch cannot stop it.
- **Why it was missing:** the repo has a **committed `mobile/ios/` directory**, so EAS
  **skips `prebuild`** and ignores `app.json` `plugins` + `ios.infoPlist`. The
  `expo-tracking-transparency` key set in app.json never reached the native plist.
- **Fix (build #16):** added directly to `mobile/ios/Regentify/Info.plist`:
  - `NSUserTrackingUsageDescription` (the launch crash)
  - `NSLocationWhenInUseUsageDescription` (same crash class via school-onboarding
    "find nearby" location call)
- **Rule going forward:** ANY permission / native-module / plist change must be edited
  **directly in `mobile/ios/`** — app.json plugins do NOT apply. (e.g. a future
  `ITSAppUsesNonExemptEncryption: false` to stop the export-compliance prompt must go in
  the native plist, not app.json.)

## Diagnosing native launch crashes (the workflow that found this)
1. USB-connect iPhone, trust. `brew install libimobiledevice`.
2. Pull crash logs: `idevicecrashreport -u <udid> -k -e /tmp/x` → look in `/tmp/x/Retired/`
   for `Regentify-*.ips`. (`.ips` has the backtrace but NOT the exception reason.)
3. Get the exception reason: `xcrun devicectl device process launch --console
   --terminate-existing --device <coredevice-id> com.regentify.app` — streams the
   `*** Terminating app due to uncaught exception …` line.
4. Symbolicate app frames (if needed): download the IPA artifact, unzip, `atos -o
   Payload/Regentify.app/Regentify -arch arm64 -l 0x100000000 <0x100000000+imageOffset>`
   (release binary is stripped — needs the dSYM for names).

## Build / submit pipeline
```
cd mobile
EXPO_APPLE_ID=baglan.sarsen@gmail.com npx eas build -p ios --profile production --auto-submit --non-interactive
```
- EAS Expo account: **sbtproduct** (NOT the gmail Expo account, which doesn't own the app).
- Apple submit config (eas.json `submit.production.ios`): appleId `baglan.sarsen@gmail.com`,
  ascAppId `6776260260`, appleTeamId `ZYVRJGM2ZY`.
- `appVersionSource: remote` → build number auto-increments.
- Archive size kept under EAS's 2 GB limit by the **root** `.easignore` (~496 MB).

## Features added this session (all in `mobile/`, UNCOMMITTED)
1. **Sign in with Apple** — real impl in `src/hooks/useAuth.js` (`getAppleCredential`,
   `signInWithApple`, apple.com reauth in `deleteAccount`); enabled + regrouped Apple
   button in `src/screens/LoginScreen.jsx`; cancel-code fix (`ERR_REQUEST_CANCELED`).
   **⚠️ Requires Firebase Console: Authentication → Sign-in method → enable Apple**, or it
   throws `auth/operation-not-allowed`.
2. **In-app account deletion** (Guideline 5.1.1) — `src/utils/deleteUserData.js`,
   `deleteAccount()` in useAuth, UI in `src/screens/ProfileScreen.jsx`. NOTE: Android
   email-delete uses iOS-only `Alert.prompt` (broken on Android; fine for iOS).
3. **ATT + AdMob guard** — `src/utils/adTracking.js` (now probes
   `requireOptionalNativeModule` before importing); ATT requested before AdMob init in
   `App.js`.
4. **Safe-area / "space at top" fixes** — Study, Flashcards, SpeedRound, SkipChallenge,
   Results, Shop, Support, Achievements: dropped the doubled top inset (they sit under the
   persistent `GlobalTopBar`). StudyScreen card is now top-aligned + scrollable.
5. **Duolingo-style streak celebration** (full feature):
   - `src/context/StreakContext.jsx` (NEW) — single source of truth for streak state;
     fixes the old bug where each screen had its own `useDailyStreak` instance and the
     top bar / Home desynced. `useDailyStreak.js` is now a thin shim over it.
     `StreakProvider` added to `App.js`.
   - **Hybrid trigger**: completing the first lesson of the day (`markStudied`) extends
     the streak + fires the celebration (opening the app no longer extends it).
   - `src/components/StreakCelebration.jsx` (NEW) — full-screen: SVG gradient, count-up
     flame, confetti, animated week-chain, pet, milestone/personal-record/freeze/broken
     states, streak repair. `src/components/StreakCelebrationHost.jsx` (NEW) mounts it in
     `TabNavigator` so it shows instantly after a lesson, scoped to the main app.
   - Old `StreakCelebrationModal.jsx` deleted.
   - **Haptics**: added `expo-haptics` dep + `src/utils/haptics.js` (guarded).

## Remaining to ship publicly (manual, in App Store Connect)
- Verify **build #16 launches** on device (relaunch via `devicectl … --console`).
- **Firebase Console**: enable Apple sign-in provider.
- **Privacy Policy URL**: host `legal/privacy-policy.html` (e.g. on sbtstudio.org), paste URL.
- App Store listing: name/subtitle/description/keywords, screenshots (capture on a real
  device — simulator shows emoji as `?` tofu), age rating (4+), App Privacy questionnaire
  (Device ID/IDFA → "used to track: Yes" because of AdMob), App Review notes ("tap
  Continue as Guest — no login required"). Draft content was prepared this session.
- Create the subscription IAP product (RevenueCat) under Monetization → Subscriptions.

## Key references
- Accounts/IDs, Rive `image: latest` fix → see `~/.claude/.../memory/project_ios_testflight.md`
- Committed-ios/prebuild gotcha → `project_ios_committed_prebuild.md`
- Archive size / `.easignore` → `project_eas_archive_size.md`
