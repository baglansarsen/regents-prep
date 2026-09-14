---
last_mapped_commit: 874b2634efd05a4f691515ba14014a4561ed9e9c
last_mapped_at: 2026-09-14
---
# External Integrations

**Analysis Date:** 2026-09-14

## APIs & External Services

**AI/Tutoring:**

- Claude API (Anthropic)
  - SDK: `@anthropic-ai/sdk` (0.105.0 in functions, 0.100.1 in root)
  - Purpose: AI tutor proxy for "mistake explanations" — generates personalized coaching when students answer incorrectly
  - Auth: Firebase Functions secret `ANTHROPIC_API_KEY`
  - Implementation: `functions/index.js` / `explainMistake()` endpoint
  - Caching: Results cached in Firestore (`tutorCache`) by question + wrong choice (first call ~$0.001 via Claude Haiku, subsequent calls free)

**Authentication Providers:**

- Google Sign-In
  - SDK: `@react-native-google-signin/google-signin` (16.1.4)
  - Web endpoint: `expo-auth-session` for OAuth2 flow
  - Mobile config: Google OAuth Client ID stored in `app.json` CFBundleURLSchemes
  - API Key: `752904748328-82me96mfpu3vhv9qm2f5u300qllktr4t` (hardcoded in app.json)
  - Scope: `cloud-platform` (write access to Firestore for user data)

- Apple Sign-In
  - SDK: `expo-apple-authentication` (8.0.8)
  - Platform: iOS only (native support)
  - Config: `usesAppleSignIn: true` in app.json

- Email/Password
  - Firebase native authentication (no external SDK)
  - Credentials stored in Firebase Auth

- Anonymous
  - Firebase native authentication (no external SDK)
  - Used as fallback for unauthenticated access

## Data Storage

**Primary Database:**

- Firebase Firestore
  - Project ID: `regents-prep`
  - Provider: Google Cloud
  - Client: `firebase` (v12.18.0 mobile, v10.13.0 chromebook)
  - Persistence: Mobile uses `persistentLocalCache()` for offline-first reads; web uses default (IndexedDB)
  - Collections:
    - `users/{uid}` — User profiles, XP, streaks, pets, subscription status, study progress
    - `users/{uid}/quizHistory` — Quiz attempt records (questions, answers, timings)
    - `users/{uid}/meta/{xp|weeklyXP|streak|pet}` — Leaderboard-visible stats
    - `users/{uid}/friends/{friendId}` — Friend relationships (bidirectional)
    - `classrooms/{classId}` — Classroom data (teacher-owned, student-joinable)
    - `classrooms/{classId}/members/{studentUid}` — Classroom roster
    - `joinCodes/{code}` — Teacher-generated classroom join codes
    - `leaderboard/{userId}` — Cached leaderboard rankings
    - `challengeEvents/{eventId}` — Challenge/friend competition data
    - `tutorCache/{questionId}__{wrongChoiceLetter}__v2` — AI tutor cached explanations
  - Connection: Auth required (Google, email, or anonymous); Firestore rules enforce user/teacher/admin access levels

**File Storage:**

- Firebase Cloud Storage (implicit via `regents-prep.firebasestorage.app` bucket)
  - Used for: question images, user avatar (pet images)
  - Access: Firestore rules control read/write

**Local Caching:**

- AsyncStorage (`@react-native-async-storage/async-storage` 2.2.0)
  - Stores: User preferences, offline quiz state, lives count, achievement progress
  - Syncs with Firestore on connection restore

**Content/Data:**

- Bundled JavaScript objects (`shared/content/` sourced into binaries)
  - Files: `questions.js` (~357KB), `schools.js`, `flashcards.js`, `achievements.js`, `petConfig.js`, `levels.js`
  - Aliased as `@content` in both web and mobile builds
  - Single source of truth for exam questions, schools, flashcard sets, achievement definitions

## Authentication & Identity

**Auth Provider:**

- Firebase Authentication
  - Implementation: `initializeAuth()` with `getReactNativePersistence(AsyncStorage)` on mobile; `getAuth()` on web
  - Providers enabled (via `firebase.json`):
    - Anonymous (enabled)
    - Email/Password (enabled, no email verification required, password required)
    - Google Sign-In (enabled, OAuth brand display name "Regents Prep")
  - Admin email: `baglan.sarsen@gmail.com` (for dashboard access via Firestore rules)

**Session Management:**

- Mobile: Persisted in AsyncStorage via `getReactNativePersistence()`
- Web: Persisted in IndexedDB (default Firebase Auth)
- Sign-out: Triggers RevenueCat reset to anonymous (see `mobile/src/hooks/useAuth.js`)

## Monetization & Subscriptions

**RevenueCat Integration:**

- SDKs: `react-native-purchases` (10.8.1), `react-native-purchases-ui` (10.8.1)
- Purpose: In-app subscription management (iOS App Store, Google Play) and hosted paywall UI
- Configuration: RevenueCat dashboard (plan/pricing managed server-side; never requires app update)
- Paywall: `RNPaywalls` native module (lazy-loaded, via `TurboModuleRegistry` guard)
- Implementation: `mobile/src/hooks/usePurchases.js`
  - Lazy-load with native module presence check (TurboModuleRegistry probe required to avoid SIGABRT crashes under New Architecture)
  - Handles subscription products and non-subscription products (consumables, e.g., tip jar)
  - App Store public SDK key: hardcoded (API key `key_ios_...`, see app.json apple ID)
- Entitlements: Premium subscription (ad-free, unlimited lives, etc.)

**Advertising:**

- Google Mobile Ads
  - SDK: `react-native-google-mobile-ads` (16.3.3)
  - App IDs (in app.json plugins):
    - Android: `ca-app-pub-2023523440912350~8290368804`
    - iOS: `ca-app-pub-2023523440912350~8962352450`
  - Ad format: Rewarded interstitial (grant lives/bonus XP on completion)
  - Implementation: `mobile/src/hooks/useRewardedAd.js` (lazy-loaded with try/catch guard)
  - Tracking: App Tracking Transparency (ATT) prompt via `expo-tracking-transparency`; controls personalized vs. non-personalized ad delivery
  - SKAdNetwork IDs: 48 skadnetwork items configured in app.json for iOS attribution

## Notifications

**Push Notifications:**

- Expo Notifications (`expo-notifications` 0.32.17)
  - Purpose: Real-time alerts (challenges, friend events, streak milestones)
  - Lazy-loaded with try/catch guard (native module absent in Expo Go)
  - Implementation pattern: see CLAUDE.md native module guard rules

**Location Services:**

- Expo Location (`expo-location` 19.0.8)
  - Purpose: Find schools near user's current location
  - iOS permission: `NSLocationWhenInUseUsageDescription` (in app.json)
  - Android permissions: `ACCESS_COARSE_LOCATION`, `ACCESS_FINE_LOCATION` (in app.json)
  - Implementation: Lazy-loaded with try/catch (web/Expo Go fallback)

## Monitoring & Observability

**Error Tracking:**

- Not detected

**Logs:**

- Browser/native console (local development)
- Firebase Cloud Logging (via admin SDK for functions)
- EAS Build logs (CI/CD diagnostics)
- Manual review via `firebase functions:log`

**Analytics:**

- Not detected (no Google Analytics, Segment, or similar)
- Firestore audit logs (implicit via GCP billing account)

## CI/CD & Deployment

**Hosting:**

- Firebase Hosting
  - Targets:
    - `regents` — Chromebook web app (SPA from `chromebook/dist/`)
    - `mobile-web` — Mobile web export (PWA from `mobile/dist/`)
  - Rewrites: All non-asset requests → `index.html` (SPA routing)
  - Deployment: `firebase deploy --only hosting` (or specific targets)

**Build/CI:**

- EAS Build (cloud-based)
  - Profiles: `development` (internal dist), `preview` (APK/device IPA), `production` (App Store Bundle/Release)
  - iOS: Xcode Cloud integration (automatic builds on push to `master` branch)
  - Android: EAS cloud build
  - App versioning: `appVersionSource: remote` (EAS manages version numbers, not app.json)

**Deployment:**

- EAS Submit (CI/CD for app stores)
  - iOS: Submits to App Store Connect via authenticated session (appleId `baglan.sarsen@gmail.com`, ascAppId `6776260260`, appleTeamId `ZYVRJGM2ZY`)
  - Android: Submits to Google Play via service account JSON (`regapp-c3e0d-b147688ce5b5.json`), internal track

**Local Emulation:**

- Firebase Emulators
  - Start: `firebase emulators:start`
  - Connect web app: `VITE_USE_EMULATORS=true npm run dev` (in root)
  - Services: Firestore, Auth, Functions, Storage

**Script Deployment:**

- Content enrichment: `scripts/enrich-*.mjs` (Node.js, run locally; requires Anthropic API key for some)
- Bash deployments: `scripts/deploy.sh`, `scripts/deploy-chromebook.sh`

## Environment Configuration

**Required Environment Variables (Web):**

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

**Optional Environment Variables:**

- `VITE_USE_EMULATORS=true` — Routes web app to local Firebase emulators

**Cloud Functions Secrets:**

- `ANTHROPIC_API_KEY` — Claude API key (managed in Firebase Functions configuration)

**Secrets Location:**

- Mobile: Hardcoded in `mobile/src/firebase.js` (Firebase SDK API key, safe with key restrictions)
- Web: Environment file `.env` (Vite injects at build time)
- Functions: Firebase Functions secrets manager (accessed via `defineSecret()`)
- App Store: Apple Developer account (via Xcode Cloud / EAS Submit)
- Google Play: Service account JSON (stored in `mobile/eas.json`, secure in repository via `.gitignore`)

## Webhooks & Callbacks

**Incoming Webhooks:**

- Firebase Cloud Functions (`onCall` endpoints):
  - `explainMistake` — Called by mobile/web app to get AI tutor explanations
  - Auth: Firebase ID token (required)

**Outgoing Webhooks:**

- Firebase Auth triggers (implicit):
  - User creation → Firestore `users/{uid}` document auto-initialized
- EAS Build notifications (configured in EAS dashboard):
  - Slack/email on build completion

**OAuth Redirects:**

- Google Sign-In: Redirects via `expo-auth-session` or native Google Sign-In SDK
- Apple Sign-In: Native iOS sign-in flow (iOS only)

## Third-Party Data Dependencies

**Google Fonts:**

- Fredoka (@expo-google-fonts/fredoka)
- Nunito (@expo-google-fonts/nunito)
- Loaded at app startup via expo-font plugin

**Question Data Source:**

- NY State Regents exam PDFs (manually scraped and processed by Python scripts in `scripts/`)
- Stored in `shared/content/questions.js` (committed to repo)
- Updated via local script runs (never automated CI)

---

*Integration audit: 2026-09-14*
