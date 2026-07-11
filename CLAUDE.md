# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

**Regentify** — an NY Regents Exam prep platform. It is a monorepo with three apps:
- `chromebook/` — React + Vite SPA for Chromebook/web users, deploys to Firebase Hosting target `regents`
- `mobile/` — React Native + Expo app (iOS/Android/PWA), deploys to Firebase Hosting target `mobile-web`
- `shared/content/` — single source of truth for all subject/exam question data, aliased as `@content` in both apps

Backend is Firebase (Firestore + Auth), project ID `regents-prep`. `mobile/` has a Jest suite (`cd mobile && npx jest`) — run it after changing `mobile/src`, and parse-check edited JS/JSX with `npm run check` before committing multi-file changes.

## Commands

### Mobile (primary development target)
```sh
cd mobile
npm start                        # Expo dev server (Expo Go or dev client)
npm run ios                      # run on iOS simulator
npm run android                  # run on Android emulator
npm run web                      # run as web PWA
npx jest                         # run the unit test suite
npm run check                    # jest + babel parse-check of git-changed src files
npx eas build --profile development   # EAS dev build
npx eas build --profile preview       # EAS preview build (APK / device IPA)
npx eas build --profile production    # EAS production build
npx eas submit --platform ios         # Submit to App Store
```

### Web / Chromebook
```sh
npm run dev                      # Vite dev server (root web app)
npm run build                    # Vite build → web-dist/
cd chromebook && npm run dev     # Chromebook sub-app dev server
npm run deploy:web               # Deploy chromebook app to Firebase
npm run deploy:mobile            # Build mobile web export and deploy
npm run deploy:all               # Deploy all hosting targets
```

### Firebase
```sh
firebase emulators:start         # Local emulators
VITE_USE_EMULATORS=true npm run dev   # Web app against emulators
```

## Architecture

### `@content` Alias
Both Metro (mobile) and Vite (web) resolve `@content/*` → `shared/content/*`. When updating subject/exam data, edit `shared/content/` — never the per-app copies.

### Mobile App Structure (`mobile/src/`)
- **`screens/`** — 35+ screens; each maps 1:1 to a navigator route
- **`navigation/`** — `AppNavigator` (auth gate) → `TabNavigator` → per-tab stacks. `.web.jsx` variants exist for web-specific nav
- **`context/`** — React contexts for Auth, Theme, Streak, Lives, Pet, Subscription, etc. Most global state lives here
- **`hooks/`** — 25+ custom hooks (`useQuiz`, `useProgress`, `usePet`, `usePurchases`, etc.); business logic belongs here, not in screens
- **`data/`** — static client-side data (petConfig, subjects, schools); mirrors `shared/content/` for mobile-specific needs
- **`components/`** — shared UI; platform-specific animation components use `.web.jsx` variants (`LottieAnimation`, `RiveAnimation`)

### Key Patterns
- **Platform variants**: files ending in `.web.jsx` (or `.web.ts`) override their `.jsx` counterpart when building for web. Navigation, animations, and some hooks use this pattern.
- **Offline-first Firestore**: Firestore is initialized with persistent local cache; assume reads may come from cache.
- **Gamification stack**: XP/levels, streaks, lives, leagues, pets (Lottie + Rive), friends/challenges, achievements, leaderboard — all wired through context + hooks.
- **Monetization**: RevenueCat (`react-native-purchases`) for subscriptions; Google Mobile Ads with ATT guard (see `mobile/src/utils/adTracking.js`). The AdMob native module must be lazy-loaded with a TurboModuleRegistry guard to avoid crashes in Expo Go.
- **Native module guard**: Any `requireNativeModule()` call (expo-notifications, expo-web-browser, etc.) must be wrapped in `try/catch` with a stub fallback — not doing so crashes Expo Go.

### Content / Data Pipeline
`scripts/` contains Python crawlers and Node.js enrichment scripts for building the question database from official NY Regents PDFs. Run these locally, never in CI.

### Builds
- EAS `appVersionSource: remote` — version is managed by EAS, not `app.json`
- Committed `mobile/ios/` directory means `app.json` plugins/infoPlist are ignored; edit `mobile/ios/Info.plist` directly for native iOS changes
- Root `.easignore` (not `mobile/.easignore`) controls what gets uploaded to EAS; keep it under 2 GB
- Firebase config for mobile is hardcoded in `mobile/src/firebase.js`; web uses `VITE_*` env vars from `.env`

## Focus Rule
Default to working in `mobile/` only. Do not touch `chromebook/` or root `src/` unless the user explicitly asks.

## Debugging Rules (learned the hard way)

- **"My change isn't showing" → check the delivery path FIRST, not the code.** Which branch are the commits on vs. what Xcode Cloud builds (`master` only)? Is TestFlight showing the new build number? Is the simulator running a fresh Metro bundle (`npx expo start -c`)? Days were lost re-debugging working code that simply wasn't deployed.
- **RevenueCat "product not found" / "store didn't return 'X'"** almost always means store-side state — App Store Connect consumable not approved, product not attached to the RC offering, or missing StoreKit config in the simulator scheme. Check the dashboards first; don't re-audit `usePurchases.js`.
- **Never bulk-rename with `sed -i` across `mobile/src`.** Use per-file edits, then `npm run check` before committing (a sed rename once shipped a crashing TestFlight build). In renames, Firestore field names and AsyncStorage keys keep their old names — only UI strings and local identifiers change.
- **Content-coverage audits must grep both key syntaxes** — files mix bare (`explanation:`) and quoted (`"explanation":`) keys, so use `grep -E '"?explanation"?:'`. A 0% enrichment result means the check is wrong, not the content.

## Git Workflow (monorepo: mobile + chromebook)

**One app per commit.** Never mix `mobile/` and `chromebook/` changes in the same commit. This is the single most important rule — it's what lets you cherry-pick or merge one app's work without dragging the other's along.

**Branch model:**
- `master` — the **mobile** release line. Every push to `master` triggers an Xcode Cloud iOS build (real minutes), so push intentionally: batch a few mobile commits, then push once. Always ask before pushing.
- `feat/chromebook-b2b` — the **permanent** chromebook home. **Never merges to `master`.**
- `feat/<mobile-thing>` — short-lived mobile feature branches off `master`; merge back to `master` and delete. Don't let them live long (they diverge).
- Don't create a branch that collects **both** apps' work (that mistake forced a cherry-pick untangle once).

**`shared/content/` flows one direction (master → chromebook):** edit + commit it on `master`, then `git merge master` into `feat/chromebook-b2b` to carry it forward. Never edit shared content on the chromebook branch to bring back.

**Hygiene:** commit or stash WIP on the branch it belongs to **before** switching branches (loose cross-branch WIP forces stash gymnastics). Keep the `feat(<scope>)` commit prefixes — they make "which app" obvious.

**Cross-cutting work:** split into two commits on two branches (mobile half on a master-based branch, chromebook half on `feat/chromebook-b2b`), with shared content flowing master → chromebook. Don't do both halves in one place.
