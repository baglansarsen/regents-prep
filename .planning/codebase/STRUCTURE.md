---
last_mapped_commit: 874b2634efd05a4f691515ba14014a4561ed9e9c
last_mapped_at: 2026-09-14
---
# Codebase Structure

**Analysis Date:** 2026-09-14

## Directory Layout

```
regents-prep/ (monorepo root)
├── mobile/                          # React Native + Expo app (primary)
│   ├── src/
│   │   ├── screens/                 # 34 screen components (one per route)
│   │   ├── navigation/              # AppNavigator, TabNavigator, FocusStack, etc.
│   │   ├── hooks/                   # 36+ custom hooks (useQuiz, useProgress, usePet, etc.)
│   │   ├── context/                 # 11 global contexts (Auth, Theme, Streak, Pet, etc.)
│   │   ├── components/              # Reusable UI + animations; .web.jsx variants for web build
│   │   ├── utils/                   # Helper functions (question math, streak logic, adaptive selection)
│   │   ├── data/                    # Client-side mobile-specific data (petConfig, goals, etc.)
│   │   ├── content/                 # LOCAL COPY of shared/content (outdated; don't edit)
│   │   ├── config/                  # Feature flags (PETS_ENABLED, etc.)
│   │   ├── styles/                  # Shared color/spacing constants
│   │   ├── firebase.js              # Firebase config (hardcoded)
│   │   ├── App.jsx                  # Root component
│   │   └── index.js                 # Entry point
│   ├── app.json                     # Expo config
│   ├── package.json
│   ├── metro.config.js              # Metro bundler (React Native) config with @content alias
│   ├── jest.config.js               # Jest test config
│   └── scripts/                     # parse-check.mjs for pre-commit validation
│
├── chromebook/                      # React + Vite web app (B2B/classroom)
│   ├── src/
│   │   ├── screens/                 # ~18 screen components (state machine based)
│   │   ├── hooks/                   # Subset of mobile hooks + chromebook-specific (useClassroom, etc.)
│   │   ├── components/              # Reusable UI (desktop-first)
│   │   ├── data/                    # Chromebook-specific data
│   │   ├── App.jsx                  # Root component (MainLayout state machine)
│   │   ├── firebase.js              # Firebase config (uses VITE_* env vars)
│   │   └── main.jsx                 # Vite entry point
│   ├── vite.config.js               # Vite bundler config with @content alias
│   ├── package.json
│   ├── index.html
│   └── dist/                        # Built output (committed to .gitignore)
│
├── src/                             # Root web app (React + Vite, legacy fallback)
│   ├── screens/                     # Screen components
│   ├── hooks/                       # Hooks (subset of mobile)
│   ├── components/
│   ├── App.jsx
│   ├── main.jsx
│   ├── firebase.js
│   └── index.css
│
├── shared/                          # Shared content — single source of truth
│   └── content/
│       ├── subjects.js              # Subject metadata (name, color, description)
│       ├── schools.js               # NY schools list
│       ├── levels.js                # XP thresholds, progression table
│       ├── achievements.js          # Achievement definitions
│       ├── petConfig.js             # Pet species, evolutions, behaviors
│       ├── flashcards.js            # Flashcard data
│       ├── strategies-meta.js        # Test strategy topics
│       ├── topicKeywords.js          # Keywords per topic (for content audits)
│       ├── triviaPool.js            # Daily trivia questions
│       ├── questions.js             # Question pooling utilities
│       ├── algebra-1/               # Subject-specific directory
│       │   ├── index.js             # Re-exports for convenience
│       │   ├── questions.js         # All questions for this subject (~400 questions)
│       │   ├── units.js             # Unit definitions (Functions, Quadratics, etc.)
│       │   ├── topics.js            # Fine-grained topic breakdown
│       │   ├── explanations.js      # Question explanations
│       │   └── keywords.js
│       ├── algebra-2/               # (same structure)
│       ├── geometry/
│       ├── chemistry/
│       ├── physics/
│       ├── earth-science/
│       ├── living-environment/
│       ├── life-science/
│       ├── us-history/
│       ├── global-history/
│       ├── english/
│       └── regents-exams/           # Full practice exams (by year/date)
│
├── functions/                       # Firebase Cloud Functions
│   ├── index.js                     # explainMistake(), gradeWriting()
│   ├── package.json
│   └── .env                         # ANTHROPIC_API_KEY (via Firebase secret)
│
├── scripts/                         # Development & content pipeline scripts
│   ├── parse-check.mjs              # Pre-commit validation (mobile only)
│   └── (Python crawlers for Regents PDF scraping)
│
├── public/                          # Static assets
│   └── images/                      # Copied to mobile/dist/ on web export
│
├── .planning/                       # Analysis & planning docs (THIS DIRECTORY)
│   ├── codebase/
│   │   ├── ARCHITECTURE.md
│   │   ├── STRUCTURE.md
│   │   └── (CONVENTIONS.md, TESTING.md, CONCERNS.md, STACK.md, INTEGRATIONS.md on other focuses)
│   └── (phase docs, etc.)
│
├── .firebase/                       # Firebase config (local)
├── .firebaserc                      # Firebase project mappings (regents-prep, mobile-web)
├── firebase.json                    # Firebase hosting config
├── firestore.rules                  # Firestore security rules
├── firestore.indexes.json           # Firestore composite indexes
│
├── CLAUDE.md                        # Guidance to Claude Code (critical — branch policy, focus rule)
├── vite.config.js                   # Root Vite config (builds src/ → web-dist/)
├── package.json                     # Root monorepo package.json
├── index.html                       # Root web app HTML
│
└── (logs, config, assets, etc.)
```

## Directory Purposes

**`mobile/src/screens/`:**

- Purpose: Route destinations; one component per primary screen
- Key files: `HomeScreen.jsx`, `QuizScreen.jsx`, `ExamScreen.jsx`, `PetScreen.jsx`, `LeagueScreen.jsx`, `ProfileScreen.jsx`, `FriendsScreen.jsx`, `AchievementsScreen.jsx`
- Structure: Each file is a function component; imports hooks and contexts; renders UI
- Routing: Defined in `mobile/src/navigation/` stacks; screens never call each other directly

**`mobile/src/navigation/`:**

- Purpose: Navigator definitions; routing logic
- Key files:
  - `AppNavigator.jsx` — Root auth gate + onboarding flow gating
  - `TabNavigator.jsx` — 4-tab bottom navigator (Study, Exams, Social, Profile)
  - `StudyStack.jsx`, `ExamsStack.jsx`, `FriendsStack.jsx`, `ProfileStack.jsx` — Per-tab native stacks
  - `FocusStack.jsx` — Overlay for focus session mode
  - `.web.jsx` variants — Web-specific navigation (no bottom tabs; linear screen flow)
- Pattern: Each stack is a `createNativeStackNavigator()` with conditional screens based on feature flags

**`mobile/src/hooks/`:**

- Purpose: Business logic isolation; Firestore interactions
- Key categories:
  - **Quiz/Study:** `useQuiz.js`, `useFocusSession.js`, `useSpacedRepetition.js`, `useExamScores.js`
  - **Gamification:** `usePet.js`, `useLeague.js`, `useLives.js`, `useRP.js` (XP), `useDailyStreak.js`, `useAchievements.js`
  - **Social:** `useFriends.js`, `useChallenges.js`, `useLeaderboard.js`
  - **User Data:** `useAuth.js`, `useProgress.js`, `useSchool.js`, `useMistakes.js`, `useUnlocks.js`
  - **Utilities:** `useNotifications.js`, `usePurchases.js`, `useQuizSound.js`, `usePetAnimation.js`
- No hook-to-hook dependencies; all flow through contexts

**`mobile/src/context/`:**

- Purpose: Global UI state; shared between hooks and screens
- Files:
  - `AuthContext.js` — User session, login state
  - `ThemeContext.js` — Dark/light mode, color palette
  - `StreakContext.js` — Daily streak counter (XP milestones, freezes)
  - `LivesContext.js` — Hearts/lives for quiz mode
  - `PetContext.js` — Pet state (currently not used; pet state lives in Firestore via usePet hook)
  - `SubscriptionContext.js` — Premium subscription status (RevenueCat)
  - `SubjectContext.js` — Selected subject for study
  - `GoalContext.js` — User-set study goals
  - `SpeechContext.js` — Text-to-speech enabled/disabled
  - `TourContext.jsx` — First-time user onboarding tour
  - `DoubleRPContext.js` — 2× XP multiplier (event-based)
- Pattern: Each context provides a hook (`useAuthContext()`, etc.) for consumption

**`mobile/src/components/`:**

- Purpose: Reusable UI primitives and composed components
- Categories:
  - **Animations:** `LottieAnimation.jsx` (Lottie JSON), `RiveAnimation.jsx` (Rive runtime) + `.web.jsx` stubs
  - **Forms:** Input fields, pickers, selection UI
  - **Cards:** Quiz question card, result card, pet card, achievement card
  - **Dialogs:** Modals, toasts, confirmations
  - **Layout:** GlobalTopBar, StreakCelebrationHost, TourHost
- Pattern: Platform variants (`.web.jsx`) override `.jsx` for web; imports from shared components

**`mobile/src/utils/`:**

- Purpose: Pure helper functions, no side effects
- Key files:
  - `question.js` — `correctIndexOf()`, `shuffle()`, `questionKey()`, `buildUnitSampledSet()` for adaptive question selection
  - `streakMath.js` — Streak computation, freeze logic, milestone calculation
  - `smartQuest.js` — `pickSmartQuest()` for daily smart question recommendation
  - `rescuePlan.js` — Study plan selection logic for low-performing students
  - `adTracking.js` — Google Mobile Ads, ATT guard
  - `clearLocalUserData.js` — Logout cleanup (AsyncStorage wipe)
- Pattern: Exported functions, constants; no Firebase or context calls

**`mobile/src/firebase.js`:**

- Purpose: Firebase initialization
- Contains: `initializeApp()`, auth with React Native persistence, Firestore with local cache, Functions client
- Config: Hardcoded (not env vars; public API keys in mobile config are intentional)

**`shared/content/`:**

- Purpose: Single source of truth for curriculum
- **Subject directories** (e.g., `algebra-1/`):
  - `questions.js` — Array of ~400 question objects: `{ id, subject, unit, topic, text, choices, correct, explanation, difficulty }`
  - `units.js` — Hierarchy: subject → unit → topics (e.g., Algebra 1 → Polynomials → Factoring)
  - `topics.js` — Fine-grained topic defs
  - `explanations.js` — Full explanations (may be moved to Firestore for size)
  - `index.js` — Re-exports for convenience
- **Config files**:
  - `subjects.js` — `{ id, name, color, description, unitCount, questionCount }`
  - `levels.js` — `regentsXP[]` array of XP thresholds per level
  - `petConfig.js` — Pet species, evolution trees, stat ranges
  - `achievements.js` — Achievement defs: `{ id, title, description, icon, unlock: (stats) => bool }`
  - `schools.js` — NY schools (for school selection onboarding)
- **Aliasing**: Resolved via:
  - Metro: `metro.config.js` → `'@content': path.resolve('../../shared/content')`
  - Vite (root web): `vite.config.js` → `'@content': path.resolve(__dirname, 'shared/content')`
  - Vite (chromebook): `vite.config.js` → `'@content': path.resolve(__dirname, '../shared/content')`

**`chromebook/src/`:**

- Purpose: Lightweight web app for classroom/B2B use
- Structure: Mirrors mobile but desktop-first; state machine instead of navigator
- Key difference: `App.jsx` → `MainLayout()` renders different screens based on `screen` state variable, not navigation stacks
- Screens: Same UI logic as mobile but simplified (fewer animations, desktop layout)

**`functions/`:**

- Purpose: Serverless backend for AI features
- `index.js`:
  - `explainMistake()` — Accepts `(question, choices, correct, wrongChoice, explanation)` → returns `{ nudge, method, firstStep, explanation, mistakeType }`
  - `gradeWriting()` — Accepts essay text → returns `{ score, feedback, rubric }`
  - Cache key: `tutorCache/{v2}/{questionId}/{wrongChoiceIndex}` → avoids re-calling Anthropic for duplicate mistakes
- Environment: `ANTHROPIC_API_KEY` stored as Firebase Secret
- Rate limiting: 60 calls/user/day via Firestore counters

**`scripts/`:**

- Purpose: Development and deployment utilities
- `parse-check.mjs` — Run `npm run check` before committing mobile changes; validates all touched `.js`/`.jsx` files with Babel parser
- Python scripts — Regents PDF crawlers (run locally; generate question data for `shared/content/`)

**`public/images/`:**

- Purpose: Static image assets
- Usage: Pet sprites, achievement icons, backgrounds
- Deploy: Copied to `mobile/dist/` on web export; hosted by Firebase

## Key File Locations

**Entry Points:**

- Mobile app: `mobile/src/index.js` → `mobile/src/App.jsx` → `mobile/src/navigation/AppNavigator.jsx`
- Chromebook app: `chromebook/src/main.jsx` → `chromebook/src/App.jsx` (renders `MainLayout()`)
- Root web app: `src/main.jsx` → `src/App.jsx`

**Configuration:**

- Firebase (mobile): `mobile/src/firebase.js` (hardcoded config)
- Firebase (web/chromebook): `src/firebase.js`, `chromebook/src/firebase.js` (env vars: `VITE_*`)
- Expo: `mobile/app.json` (version, plugins, native modules, app name)
- Vite: `vite.config.js` (root), `chromebook/vite.config.js` (chromebook)
- Metro: `mobile/metro.config.js` (React Native bundler)
- Firestore rules: `firestore.rules` (security)
- Firebase hosting: `firebase.json` (routing, deploys to `regents` and `mobile-web` targets)

**Core Logic:**

- Quiz: `mobile/src/hooks/useQuiz.js`, `mobile/src/screens/QuizScreen.jsx`
- Pet: `mobile/src/hooks/usePet.js`, `mobile/src/screens/PetScreen.jsx`
- Progress: `mobile/src/hooks/useProgress.js` (Firestore access)
- Auth: `mobile/src/context/AuthContext.js` (Firebase Auth, session)
- AI tutoring: `functions/index.js` (Cloud Function)

**Testing:**

- Mobile unit tests: `mobile/src/__tests__/` + `mobile/src/*/(__tests__|*.test.js)`
- Run: `cd mobile && npx jest` or `npm run check` (parse-check + jest)
- No E2E tests (yet; Detox configured in EAS but not run in CI)

## Naming Conventions

**Files:**

- Screens: PascalCase, `*Screen.jsx` suffix (e.g., `HomeScreen.jsx`, `QuizScreen.jsx`)
- Hooks: camelCase, `use*` prefix (e.g., `useQuiz.js`, `usePet.js`)
- Contexts: PascalCase, `*Context.js` suffix (e.g., `AuthContext.js`, `ThemeContext.js`)
- Components: PascalCase, no suffix (e.g., `PetCard.jsx`, `QuizCard.jsx`)
- Utils: camelCase (e.g., `streakMath.js`, `question.js`)
- Tests: `*.test.js` or `*.spec.js` (Jest convention) or `__tests__/` subdirectory

**Directories:**

- Plural for collections (`screens/`, `hooks/`, `components/`, `utils/`)
- Singular for singletons (`context/`, `config/`)
- Subject directories: kebab-case (e.g., `algebra-1/`, `earth-science/`)

**Variables & Functions:**

- camelCase for functions and variables (e.g., `selectAnswer()`, `currentQuestion`)
- CONSTANT_CASE for constants and config (e.g., `BASE_POINTS`, `STRUGGLE_WRONG`, `MAX_FREEZE`)
- PascalCase for components and classes (e.g., `HomeScreen`, `AuthProvider`)
- Firestore paths: snake_case fields (e.g., `users/{uid}/results/{resultId}`, `created_at`)

**AsyncStorage Keys:**

- Format: `@namespace_description_v{version}` (e.g., `@subject_chosen_v1_${uid}`, `@school_chosen_v1_${uid}`)
- Versioning: Append `_v1`, `_v2` to avoid stale cache issues on schema changes

**Firestore Collections & Documents:**

- Collections: plural, lowercase (e.g., `users`, `results`, `achievements`)
- Documents: `{uid}` for user docs; `{questionId}` for question refs
- Subcollections: plural (e.g., `users/{uid}/results/`, `users/{uid}/achievements/`)

## Where to Add New Code

**New Quiz/Study Feature:**

- Implementation: `mobile/src/hooks/use<Feature>.js` (business logic, Firestore access)
- UI: `mobile/src/screens/<Feature>Screen.jsx` (render, call hook)
- Tests: `mobile/src/hooks/__tests__/use<Feature>.test.js`
- Content (if needed): `shared/content/<subject>/*.js` (curriculum data)

**New Gamification Element (XP, Achievement, etc.):**

- Logic: `mobile/src/hooks/use<Element>.js` (tracks state, triggers Firestore writes)
- Context: `mobile/src/context/<Element>Context.js` (if global state needed)
- Config: `shared/content/achievements.js` or `levels.js` (thresholds, definitions)
- Trigger points: Hooks call context updates, which are read by achievement checkers

**New UI Component:**

- Shared component: `mobile/src/components/<Name>.jsx`
- If animation: also create `mobile/src/components/<Name>.web.jsx` (stub for web)
- If platform-specific: use `.ios.jsx`, `.android.jsx`, `.web.jsx` suffixes
- Reusable: imported by screens and other components

**Chromebook-specific Feature:**

- Screens: `chromebook/src/screens/<Feature>Screen.jsx` (may copy/adapt mobile version)
- Hooks: `chromebook/src/hooks/use<Feature>.js` (subset of mobile, plus chromebook-specific like `useClassroom()`)
- Shared content: Use `@content` alias (no copy)

**Cloud Function / Backend Logic:**

- Implementation: `functions/index.js` (HTTP callable or Firestore trigger)
- Testing: Manual via Firebase emulator or deployed function logs
- Secrets: Store API keys in Firebase Secret Manager; reference via `defineSecret()`

**Content / Question Data:**

- Location: `shared/content/<subject>/questions.js` (or `units.js`, `topics.js` as needed)
- Format: Structured JSON/JS: `{ id, subject, unit, topic, text, choices, correct, explanation, difficulty, explanation_audio?, explanation_video? }`
- Never: Edit `mobile/src/content/` (outdated copy); always edit source in `shared/content/`

**New Subject:**

- Directory: `shared/content/<subject-name>/`
- Files: `index.js`, `questions.js`, `units.js`, `topics.js`, `explanations.js`, `keywords.js`
- Register: Add entry to `shared/content/subjects.js`
- Alias will resolve: `import * as data from '@content/<subject-name>'` in any app

## Special Directories

**`.planning/codebase/`:**

- Purpose: Architecture & structure analysis (this file lives here)
- Generated: By `/gsd-map-codebase` skill
- Committed: Yes (docs only, no secrets)
- Contents: `ARCHITECTURE.md`, `STRUCTURE.md`, `CONVENTIONS.md`, `TESTING.md`, `CONCERNS.md`, `STACK.md`, `INTEGRATIONS.md`

**`.firebase/`:**

- Purpose: Firebase project metadata (local config)
- Generated: By `firebase init`
- Committed: Yes (project config, not secrets)

**`mobile/dist/` and `chromebook/dist/`:**

- Purpose: Build output
- Generated: By `expo export` and `vite build`
- Committed: No (in `.gitignore`)

**`web-dist/`:**

- Purpose: Root web app build output
- Generated: By `vite build`
- Committed: No (in `.gitignore`)

**`downloads/`:**

- Purpose: Downloaded content (test papers, etc.)
- Generated: Scripts or manual download
- Committed: Mostly (user data stored here for reference)

**`scripts/`:**

- Purpose: Development utilities and content pipeline
- Committed: Yes
- Run locally: Never in CI (content crawling too slow)

---

*Structure analysis: 2026-09-14*
