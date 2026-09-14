---
last_mapped_commit: 874b2634efd05a4f691515ba14014a4561ed9e9c
last_mapped_at: 2026-09-14
---
<!-- refreshed: 2026-09-14 -->

# Architecture

**Analysis Date:** 2026-09-14

## System Overview

Regentify is a monorepo with three separate apps sharing a single source of truth for exam question data. The architecture follows a layered, hook-driven pattern centered on Firestore as the persistent backend.

```text
┌────────────────────────────────────────────────────────────────────────────┐
│                           Client Applications                              │
├─────────────────────────────┬──────────────────────────┬────────────────────┤
│      mobile/ (primary)      │    chromebook/ (b2b)     │   src/ (root web)  │
│  React Native + Expo        │    React + Vite          │   React + Vite     │
│  `mobile/src/`              │    `chromebook/src/`     │   `src/`           │
└──────────────┬──────────────┴──────────────┬───────────┴────────┬──────────┘
               │                             │                    │
               ├─────────────────────────────┴────────────────────┤
               │                                                   │
               ▼                                                   ▼
┌──────────────────────────────────────────┐  ┌──────────────────────────────┐
│         Shared Content Layer             │  │  Firebase Backend            │
│  `shared/content/`                       │  │  (Firestore + Auth)          │
│  - subjects.js, levels.js, petConfig.js  │  │                              │
│  - algebra-1/, chemistry/, etc. (topic   │  │  `functions/index.js`        │
│    data, questions)                      │  │  - explainMistake            │
│  Aliased as @content in all apps         │  │  - gradeWriting              │
└──────────────────────────────────────────┘  └──────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| **Mobile App** | Primary interactive study platform for students; iOS/Android/PWA via Expo | `mobile/src/App.jsx` → `mobile/src/navigation/AppNavigator.jsx` |
| **Chromebook Web** | Lightweight web-first variant for classroom deployment; shared Firestore backend | `chromebook/src/App.jsx` |
| **Root Web App** | Fallback/legacy web interface; minimal structure | `src/App.jsx` |
| **Shared Content** | Single source of truth for question data, subjects, levels, pet config, strategies | `shared/content/` |
| **Cloud Functions** | AI-powered tutoring (mistake explanation) and essay grading via Anthropic API | `functions/index.js` |
| **Authentication** | Firebase Auth (Google Sign-In, Apple, email/password, guest mode) | Mobile: `mobile/src/firebase.js`, contexts: `*Context.js` |
| **Firestore** | User progress, mistakes, achievements, leagues, pet state, subscriptions | Accessed via hooks in `*/src/hooks/` |

## Pattern Overview

**Overall:** Hook-driven state management with layered separation between screens (UI), hooks (business logic), contexts (global state), and Firebase (persistence).

**Key Characteristics:**

- Screens are thin: they call hooks and render based on returned state
- Hooks encapsulate all business logic and Firestore access; they compose multiple contexts
- Contexts hold global UI state (Auth, Theme, Streak counters, Lives, Pet)
- Platform variants (`.web.jsx` files) override mobile defaults for web/Chromebook
- Adaptive content selection (`useQuiz`) adjusts difficulty on the fly based on performance
- Offline-first Firestore with persistent local cache means reads may be stale
- Gamification is pervasive: XP, streaks, lives, pet evolution, achievements, leagues

## Layers

**Screens (`*/src/screens/`):**

- Purpose: UI entry points; route destinations; 34 screens in mobile, ~18 in chromebook
- Contains: React components that render UI and call hooks
- Depends on: Hooks, contexts, components
- Used by: Navigation stacks (TabNavigator, FocusStack, etc.)
- Example: `mobile/src/screens/QuizScreen.jsx` renders quiz UI via `useQuiz()`

**Hooks (`*/src/hooks/`):**

- Purpose: Business logic and Firestore data layer
- Contains: 36 custom hooks in mobile (useQuiz, usePet, useProgress, useExamScores, etc.)
- Depends on: Firebase, contexts, utils
- Used by: Screens exclusively (never hook-to-hook calls)
- Example: `mobile/src/hooks/useProgress.js` manages quiz history in Firestore

**Contexts (`*/src/context/`):**

- Purpose: Global UI state and authentication
- Contains: 11 contexts in mobile (Auth, Theme, Streak, Lives, Pet, Subscription, Goal, Doubles, Speech, Tour, DoubleRP)
- Depends on: Firebase, AsyncStorage
- Used by: Hooks (for auth check, theme color palette, global counters)
- Example: `mobile/src/context/AuthContext.js` provides user state and handles cross-account logout cleanup

**Components (`*/src/components/`):**

- Purpose: Reusable UI elements
- Contains: Form fields, buttons, animations, cards, Lottie/Rive animation wrappers
- Platform variants: `.web.jsx` files provide web-specific overrides (navigation, animations)
- Used by: Screens
- Example: `mobile/src/components/LottieAnimation.web.jsx` stubs Lottie for web; native version loads dynamic JSON

**Utils (`*/src/utils/`):**

- Purpose: Pure helper functions
- Contains: question utilities, streak math, adaptive selection (smartQuest, rescuePlan), audio control, analytics
- Examples: `correctIndexOf()`, `computeStreak()`, `pickSmartQuest()`, `questionKey()`

**Shared Content (`shared/content/`):**

- Purpose: Single source of truth for curriculum
- Contains: 
  - Subject metadata: `subjects.js`, `schools.js`
  - Question data: `algebra-1/`, `chemistry/`, etc. (each with `questions.js`, `units.js`, etc.)
  - Gamification config: `levels.js`, `petConfig.js`, `achievements.js`, `flashcards.js`
  - Keywords and strategies: `topicKeywords.js`, `strategies-meta.js`
- Aliased: `@content` in both Metro (mobile) and Vite (web)
- Used by: All three apps, never duplicated

**Firebase (`mobile/src/firebase.js`, `src/firebase.js`, `chromebook/src/firebase.js`):**

- Purpose: Backend initialization and connection
- Contains: Firebase config, Firestore instance with persistent local cache, Auth, Functions
- Key pattern: Mobile hardcodes config; web apps use `VITE_*` env vars

## Data Flow

### Primary Request Path (Quiz)

1. **User enters quiz** → `QuizScreen.jsx` mounts
2. **Screen calls hook** → `useQuiz(questionSet)` initializes with adaptive engine
3. **Hook returns quiz state** → `{ currentQuestion, selected, check(), select() }`
4. **User selects answer** → `select(choiceIndex)` sets highlighted choice
5. **User taps "Check"** → `check()` grades, calls Firestore via `useProgress.saveResult()`
6. **Firestore write** → `functions/index.js` may trigger if a mistake occurred (if grading tutor is called)
7. **Hook updates local state** → score, streak, results array
8. **Screen re-renders** → feedback UI shows points earned, mistakes queued
9. **Adaptive loop** (in `useQuiz`) → if user struggled, splice easier questions mid-lesson

### Gamification Flow

1. **Quiz completion** → `useQuiz.check()` updates score and streak
2. **Screen passes score to context** → calls context update (e.g., `earnXP()` from RP context)
3. **Context writes Firestore** → XP total, level, achievements
4. **Hooks subscribe to context** → e.g., `usePet()` watches XP for evolution triggers
5. **Pet evolution** → if XP hits threshold, `usePet.checkAndEvolve()` updates Firestore
6. **Achievements** → `useAchievements()` watches progress and fires notifications

### Authentication Flow

1. **App launch** → `AppNavigator.jsx` checks `AuthContext` for user
2. **AuthContext mounted** → `onAuthStateChanged()` listener starts
3. **User logs in** → Google Sign-In, Apple Auth, or email (via Firebase Auth)
4. **Firebase Auth updates** → `onAuthStateChanged()` fires, sets user state
5. **Hooks re-read with uid** → `useProgress(uid)`, `usePet(uid)` now have user context
6. **Screens see user** → conditional rendering gates to authenticated screens
7. **Logout** → calls `clearLocalUserData()` to wipe AsyncStorage, reset module singletons, prevent data bleed

**State Management:**

- AsyncStorage: Device-local caches (quiz drafts, subject choice, offline data)
- Firestore: Source of truth (user progress, pets, achievements, social graph)
- Module singletons: Global RP total, pending writes (see `useRP.js`, `useProgress.js`) — cleared on logout to prevent cross-account bleed
- React Context: UI-only (theme, auth), never persisted directly
- Firestore local cache: Offline reads return stale data; always check `.metadata.hasPendingWrites` if freshness matters

## Key Abstractions

**Quiz Engine (`useQuiz.js`):**

- Purpose: Manages single quiz session (question selection, scoring, adaptive difficulty)
- Example: Struggle mode — 2 consecutive wrong answers trigger 3 easier questions; exit after 3 clean answers
- Streak multiplier: 5+ correct = 2× points, 3+ = 1.5×, 2+ = 1.25×
- Repeat mode: Duolingo-style end-of-quiz re-ask of missed questions (pedagogical, no scoring)
- Eliminates wrong choices via 50/50 hint and adjusts score if hint was used (half points, no streak bump)

**Progress Tracking (`useProgress.js`):**

- Purpose: Firestore-backed quiz history and result tracking
- Persists: Quiz results (correct/wrong, time, XP earned), mistakes for review
- Module-level singleton: `pendingProgress` queue (to batch async writes during offline)
- Firestore path: `users/{uid}/results/{resultId}`

**Pet System (`usePet.js`):**

- Purpose: Virtual pet companion with state, evolution, cosmetics, interactions
- Evolution: Pet evolves at XP thresholds (e.g., 10 → Buddy2 at 500 XP)
- Interactions: Feed, play, rename, potion effects, reactions, quest tracking
- Firestore: `users/{uid}/pet` (state, inventory, cosmetics), `users/{uid}/questProgress` (daily quest)
- Cosmetics: Skins, hats, backgrounds (purchasable via RevenueCat subscriptions)

**Leagues (`useLeague.js`):**

- Purpose: Weekly XP-based competition with 5 tiers (Bronze → Diamond)
- Firestore path: `leagues/{season}/{tier}/{uid}`
- Seasonal: Resets weekly; moved to archives after
- Leaderboard: Top 50 in tier visible

**Achievements (`useAchievements.js`):**

- Purpose: Milestone tracking (e.g., "3 day streak", "100 XP earned")
- Source: `shared/content/achievements.js`
- Firestore: `users/{uid}/achievements` (unlocked list)
- Toast notification on unlock

**Spaced Repetition (`useSpacedRepetition.js`):**

- Purpose: Algorithm-driven review scheduling (Leitner-style buckets)
- Firestore: Cards stored with last-review timestamp and bucket (1–5)
- Determines: Which cards show in review sessions

**Lessons & Topics:**

- Purpose: Pedagogical hierarchy (e.g., Algebra 1 → Functions → Quadratics)
- Source: `shared/content/algebra-1/units.js`, `topics.js`
- Selection: Via `useProgress()` + unlocking system (`useUnitUnlocks.js`)

## Entry Points

**Mobile App:**

- Location: `mobile/src/index.js` → `mobile/src/App.jsx` → `mobile/src/navigation/AppNavigator.jsx`
- Triggers: App startup (Expo)
- Responsibilities: Initialize Expo, Firebase, load fonts, render root navigator

**Chromebook App:**

- Location: `chromebook/src/main.jsx` → `chromebook/src/App.jsx` → `MainLayout()` component
- Triggers: Browser page load
- Responsibilities: Initialize Vite, Firebase, render current screen based on state

**Root Web App:**

- Location: `src/main.jsx` → `src/App.jsx`
- Triggers: Browser page load
- Responsibilities: Minimal app entry; rarely used (chromebook is the web target)

**Navigation (Mobile):**

- `AppNavigator` gates on auth → onboarding flow (school, subject, pet) → `TabNavigator`
- `TabNavigator` provides 4 tabs → StudyStack, ExamsStack, FriendsStack, ProfileStack
- Deep links and modal stacks (FocusStack, FriendsStack) overlay the tab bar

**Screen Entry (Chromebook):**

- `MainLayout()` manages screen state via `setScreen()`
- State machine: 'home' | 'exams' | 'mistakes' | 'analytics' | 'quiz' | 'results' | 'shop' | 'profile' | 'petPicker' | 'battle' | 'classroom'

## Architectural Constraints

- **Threading:** Single-threaded event loop (React Native, browser). Firestore operations are async; no worker threads used.
- **Global state:** 
  - `mobile/src/hooks/useRP.js` — module-level singleton `totalRP` (XP total, never persisted locally; always read from Firestore)
  - `mobile/src/hooks/useProgress.js` — module-level `pendingProgress` queue for batched offline writes
  - `functions/index.js` — in-memory LRU cache for tutor explanations (per-process, not shared)
- **Circular imports:** Checked on `npm run check` in mobile (parse-check.mjs); none known
- **Platform variants:** `.web.jsx` files in `mobile/src/components/` and `mobile/src/navigation/` override `.jsx` for web builds; this allows shared code with platform-specific UI
- **Offline behavior:** Firestore local cache is persistent; reads return stale data; app assumes intermittent connectivity
- **Device permissions:** Mobile app requires Notification (expo-notifications), Tracking (expo-tracking-transparency), Google Ad tracking (via ATT guard in `mobile/src/utils/adTracking.js`)

## Anti-Patterns

### Calling Hooks in Event Handlers

**What happens:** A screen calls a hook outside React's render phase (e.g., in a button handler).
**Why it's wrong:** Violates Rules of Hooks; can cause state sync issues, infinite loops, or crashes.
**Do this instead:** Call the hook at render time, store the callback in a `useCallback`, pass it to the button.

```jsx
// ❌ Wrong — hook called in handler
function MyScreen() {
  return <Button onPress={() => {
    const quiz = useQuiz(...) // Crash!
    quiz.check()
  }} />
}

// ✓ Correct — hook called at render time
function MyScreen() {
  const quiz = useQuiz(...)
  const handleCheck = useCallback(() => quiz.check(), [quiz])
  return <Button onPress={handleCheck} />
}
```

### Not Clearing User Data on Logout

**What happens:** `clearLocalUserData()` is not called when user logs out or switches accounts.
**Why it's wrong:** Module singletons (totalRP, pendingProgress) and AsyncStorage caches leak the previous user's data to the new account, causing progress corruption.
**Do this instead:** Always call `clearLocalUserData()`, then reset global singletons:

```jsx
// In logout handler
await clearLocalUserData() // Wipes AsyncStorage
resetGlobalRP()            // Resets totalRP to 0
resetPendingProgress()     // Clears pending queue
```

### Duplicating Content Data in the App

**What happens:** Question data or config is copy-pasted from `shared/content/` into `mobile/src/content/`.
**Why it's wrong:** Creates two sources of truth; updates to one don't sync; auditing becomes impossible.
**Do this instead:** Alias `@content` in build config and import from there only:

```jsx
// ✓ Correct
import { subjects } from '@content/subjects'

// ❌ Wrong — never duplicate
import { subjects } from '../data/subjects'
```

### Mocking Firebase in Tests Without Isolation

**What happens:** Tests call real Firestore (or unemulated version), affecting shared state.
**Why it's wrong:** Tests become flaky, slow, and affect each other; CI can fail intermittently.
**Do this instead:** Use Jest mocks or Firestore emulator in test setup; never call real Firebase in unit tests.

```js
// In jest setup
jest.mock('firebase/firestore', () => ({ /* mocked */ }))
// OR
process.env.VITE_USE_EMULATORS = 'true'
```

### Writing to Firestore Synchronously

**What happens:** Code assumes `saveProgress()` completes before the next line runs.
**Why it's wrong:** Firestore writes are async; the data may not persist if the app crashes or goes offline.
**Do this instead:** Always await or queue (via `pendingProgress`):

```jsx
// ❌ Wrong — fire and forget
quiz.check()
saveResult({ ... }) // Might not persist

// ✓ Correct — await or queue
await saveResult({ ... })
// OR
pendingProgress.push({ ... }) // Flushed on next sync
```

## Error Handling

**Strategy:** Errors are caught at screen level; hooks throw, screens catch and render error UI.

**Patterns:**

- Firestore errors (network, permission denied): caught in hooks, returned as state (`.loading`, `.error`)
- Auth errors (invalid email, weak password): caught in hook, displayed as toast/alert
- API errors (Anthropic timeout): caught in Cloud Function, graceful degradation (tutor unavailable)
- Permission errors: Firestore security rules prevent access; caught by hook, logged

Example (`useProgress.js`):

```js
const saveResult = async (result) => {
  try {
    await addDoc(collection(db, `users/${uid}/results`), result)
  } catch (err) {
    console.error('Save failed:', err)
    setError(err.message)
    // Fall back: queue for retry
    pendingProgress.push(result)
  }
}
```

## Cross-Cutting Concerns

**Logging:** 

- Mobile: `console.log/warn/error` during development
- Firebase: Cloud Logging via `functions/index.js` (tutor cache hits, grading errors)
- Sentry: Not configured (TODO — would be added per CONCERNS.md)

**Validation:**

- Question data: Schema validation in `shared/content/` during content pipeline (Python scripts in `scripts/`)
- User input: Form validation in screen components (email format, password strength)
- Firestore writes: Security rules in `firestore.rules` enforce permissions

**Authentication:**

- Login screens gate access: `LoginScreen.jsx` → Google Sign-In, Apple Auth, email/password, guest mode
- `AuthContext` provides session state; onboarding flow enforces school/subject/pet choice before tab navigation
- Session persistence: Firebase Auth handles token refresh; app stays logged in across restarts

**Rate Limiting:**

- Cloud Functions: Daily cap on `explainMistake()` calls (DAILY_CAP = 60 per user)
- Streaks: Daily study limit to prevent XP farming
- Challenges: Weekly entry limit

---

*Architecture analysis: 2026-09-14*
