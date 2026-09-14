---
last_mapped_commit: 874b2634efd05a4f691515ba14014a4561ed9e9c
last_mapped_at: 2026-09-14
---
# Technology Stack

**Analysis Date:** 2026-09-14

## Languages

**Primary:**

- TypeScript/JavaScript (ES2024) - Full application stack (React, React Native, Node.js)
- JSX - UI component definitions across mobile and web
- Python - Content processing and data enrichment scripts

**Secondary:**

- Shell (Bash) - Deployment and utility scripts
- JSON - Configuration, data serialization

## Runtime

**Environment:**

- Node.js 22 (Firebase Cloud Functions)
- Expo SDK 54 (mobile runtime, iOS/Android/PWA)
- React Native 0.81.5 (mobile app framework)
- React 19.1.0 (web and mobile via React Native Web)

**Package Manager:**

- npm (all directories)
- Lockfiles: `package-lock.json` present in root and all subdirectories

## Frameworks

**Core:**

- React 18.3.1 / 19.1.0 - UI rendering (web and mobile)
- React Native 0.81.5 - Cross-platform mobile (iOS/Android) via Expo
- Expo 54.0.37 - Managed mobile platform for rapid iteration and deployment

**Navigation & State:**

- React Navigation 6.x - Screen routing and navigation stacks (`bottom-tabs`, `native-stack`, `stack`)
- React Context - Global state management (Auth, Theme, Streak, Lives, Pet, Subscription, Leaderboard)
- AsyncStorage (via `@react-native-async-storage/async-storage` 2.2.0) - Local persistent storage

**Styling & Animation:**

- Expo-built platform variants (`.web.jsx` and `.jsx` duals for platform-specific implementation)
- Lottie React Native 7.3.8 - Animation library for gamification UI
- Rive React Native 9.8.5 - Vector animation runtime for interactive elements
- React Native SVG 15.12.1 - SVG rendering and manipulation

**Build/Dev (Web):**

- Vite 5.4.2 - Modern bundler for web applications
- @vitejs/plugin-react 4.3.1 - Fast JSX/TSX transformation

**Build/Dev (Mobile):**

- Expo CLI (via `npm start`, `npm run ios`, `npm run android`, `npm run web`)
- EAS Build - Expo Application Services for managed CI/CD builds
- EAS Submit - App Store and Google Play submission automation
- Metro - React Native bundler (coordinated by Expo)
- Babel (preset: `babel-preset-expo` 54.0.10) - JavaScript transpilation

**Testing:**

- Jest 29.7.0 - Unit test runner
- jest-expo 54.0.18 - Expo-specific Jest configuration
- @testing-library/react-native 14.0.0 - React Native component testing utilities
- @testing-library/jest-native 5.4.3 - Assertions and matchers for RN
- @react-native/jest-preset 0.85.3 - Official RN Jest setup

## Key Dependencies

**Critical:**

| Package | Version | Purpose |
|---------|---------|---------|
| firebase | 12.18.0 (mobile), 12.13.0 (root), 10.13.0 (chromebook) | Firestore database, Authentication, Cloud Functions calls |
| firebase-admin | 12.7.0 (root), 13.0.0 (functions) | Server-side Firebase operations in Cloud Functions |
| firebase-functions | 6.1.0 | Serverless function framework and event system |
| @anthropic-ai/sdk | 0.105.0 (functions), 0.100.1 (root) | Claude API client for AI tutor (mistake explanations) |
| react-native-purchases | 10.8.1 | RevenueCat iOS/Android IAP integration for subscriptions |
| react-native-purchases-ui | 10.8.1 | Hosted RevenueCat paywall UI |
| react-native-google-mobile-ads | 16.3.3 | Google AdMob integration for rewarded ads |
| @react-native-google-signin/google-signin | 16.1.4 | Google Sign-In button and auth flow |
| expo-auth-session | 7.0.11 | OAuth2 session management for Google and Apple Sign-In |
| expo-apple-authentication | 8.0.8 | Apple Sign-In integration (iOS) |

**Infrastructure:**

| Package | Version | Purpose |
|---------|---------|---------|
| expo-tracking-transparency | 6.0.8 | App Tracking Transparency (ATT) prompt for IDFA access |
| expo-notifications | 0.32.17 | Push notifications (lazy-loaded, native module guard required) |
| expo-location | 19.0.8 | Geolocation for finding nearby schools |
| expo-web-browser | 15.0.11 | In-app browser for external links and OAuth flows |
| expo-speech | 14.0.8 | Text-to-speech for accessibility |
| expo-font | 14.0.12 | Custom font loading |
| @expo-google-fonts/fredoka | 0.4.1 | Fredoka font (Google Fonts) |
| @expo-google-fonts/nunito | 0.4.2 | Nunito font (Google Fonts) |
| react-native-gesture-handler | 2.28.0 | Gesture detection for navigation and interactions |
| react-native-screens | 4.16.0 | Native screen optimization for React Navigation |
| react-native-safe-area-context | 5.6.0 | Safe area (notch/dynamic island) awareness |
| react-native-view-shot | 4.0.0 | Screenshot/snapshot capture for exporting study results |
| react-native-web | 0.21.0 | React Native components for web platform |
| patch-package | 8.0.1 | Post-install patches for npm dependencies |

**Dev/Build:**

| Package | Version | Purpose |
|---------|---------|---------|
| @expo/metro-runtime | 6.1.2 | Metro runtime integration for Expo |
| expo-dev-client | 6.0.21 | Custom development client for advanced debugging |
| expo-build-properties | 1.0.10 | Gradle/native build configuration via app.json plugins |
| @expo/ngrok | 4.1.3 | Tunneling for testing on physical devices during development |

## Configuration

**Environment Variables (Web):**

- `VITE_FIREBASE_API_KEY` - Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID (`regents-prep`)
- `VITE_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Messaging sender ID
- `VITE_FIREBASE_APP_ID` - Firebase app ID
- `VITE_USE_EMULATORS` - (optional) Enable local Firebase emulators

**Cloud Functions Secrets:**

- `ANTHROPIC_API_KEY` - Claude API key (managed via Firebase Functions secrets config)

**Configuration Files:**

| File | Purpose |
|------|---------|
| `mobile/app.json` | Expo configuration: build settings, plugins, iOS/Android platform config, EAS project ID |
| `mobile/eas.json` | EAS Build/Submit profiles (development, preview, production builds and store submission) |
| `chromebook/vite.config.js` | Vite build config for Chromebook SPA (output: `dist/`) |
| `vite.config.js` | Vite build config for root web app (output: `web-dist/`, aliases `@content`) |
| `firebase.json` | Firebase deployment config: Firestore rules, auth providers, hosting targets, Cloud Functions |
| `.env.example` | Template for required web Firebase environment variables |

**Mobile Hardcoding:**

- Firebase SDK credentials are hardcoded in `mobile/src/firebase.js` (safe for public SDKs with API key restrictions)
- Web app uses `VITE_*` env vars from `.env` (loaded at build time)

## Platform Requirements

**Development:**

- macOS or Linux (iOS development requires macOS for Xcode)
- Xcode 15+ (iOS simulator and builds)
- Android Studio / SDK (Android emulator and builds)
- Node.js 22+
- Python 3.8+ (for content scripts)
- EAS CLI (`npm install -g eas-cli`)

**Build & Deployment:**

- EAS account (Expo services account) for cloud builds
- Apple Developer account (for iOS build submission and TestFlight)
- Google Play Console account (for Android build submission)
- Firebase project (`regents-prep`) with:
  - Firestore database
  - Firebase Authentication (email, Google, anonymous)
  - Cloud Functions (Node.js 22 runtime)
  - Hosting (two targets: `regents` for web, `mobile-web` for Expo web export)

**Production:**

- Firebase Hosting for web and PWA
- iOS App Store (via Xcode Cloud / EAS Submit)
- Google Play Store (via EAS Submit)

---

*Stack analysis: 2026-09-14*
