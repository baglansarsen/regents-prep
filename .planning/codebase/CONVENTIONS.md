---
last_mapped_commit: 874b2634efd05a4f691515ba14014a4561ed9e9c
last_mapped_at: 2026-09-14
---
# Coding Conventions

**Analysis Date:** 2026-09-14

## Naming Patterns

**Files:**

- **Components:** PascalCase (e.g., `ActionChipRow.jsx`, `ReggieMascot.jsx`, `PetStatusBars.jsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useAuth.js`, `useQuiz.js`, `useLives.js`, `usePredictedScore.js`)
- **Utilities:** camelCase (e.g., `energy.js`, `question.js`, `reviewQueue.js`, `streakMath.js`)
- **Contexts:** PascalCase (e.g., `AuthContext.js`, `ThemeContext.js`, `LivesContext.js`)
- **Test files:** camelCase with `.test.js` suffix (e.g., `livesLogic.test.js`, `useQuiz.test.js`, `achievements.test.js`)

**Functions:**

- **React components:** PascalCase (e.g., `function HomeScreen()`, `export default function ActionChipRow()`)
- **Custom hooks:** camelCase with `use` prefix (e.g., `function useAuth()`, `export function useProgress()`)
- **Utility functions:** camelCase, often with verbs (e.g., `computeStreak()`, `buildUnitSampledSet()`, `shouldSpendEnergy()`, `energyBand()`)
- **Pure functions extracted for testing:** camelCase (e.g., `catchUpRefills()`, `computeEarned()`, `streakMultiplier()`)
- **Private/internal functions:** may be prefixed with underscore (e.g., `_GoogleSignin`, `_ensureInitialized()`)

**Variables:**

- Local variables and state: camelCase (e.g., `const uid = user?.uid`, `let called = false`)
- State setters from `useState()`: follow React convention (e.g., `const [user, setUser] = useState()`, `const [loading, setLoading] = useState()`)
- Refs: camelCase with `Ref` suffix (e.g., `const prevUserRef = useRef()`)

**Types/Constants:**

- Exported constants: UPPER_SNAKE_CASE (e.g., `BASE_MAX_ENERGY`, `MATH_MAX_ENERGY`, `MAX_LIVES`, `REFILL_MS`, `DAILY_CAP`, `LETTERS`)
- Config objects: UPPER_SNAKE_CASE (e.g., `MILESTONE_GIFTS`, `GOAL_PET_MESSAGES`, `MATH_SUBJECT_IDS`)
- Sets/enums: UPPER_SNAKE_CASE (e.g., `STRATEGY_CATEGORIES`, `PETS_ENABLED`, `SUBJECTS`, `MISTAKE_TYPES`)

## Code Style

**Formatting:**

- No explicit ESLint or Prettier config found; code follows implicit conventional patterns
- Two-space indentation is the standard (observed across all files)
- Semi-colons present (used consistently)
- Single quotes for strings in JS/JSX
- Template literals for complex strings

**Linting:**

- Not configured as a pre-commit hook; run `npm run check` manually in mobile app before committing multi-file changes
- `npm run check` combines `jest --no-coverage` with `node scripts/parse-check.mjs` (parse-check validates JS/JSX syntax of changed files)

## Import Organization

**Order (observed pattern):**

1. React core imports (e.g., `import React, { useState, useEffect, ... } from 'react'`)
2. React Native / Expo framework imports (e.g., `import { View, Text, StyleSheet } from 'react-native'`)
3. Third-party packages and modules (e.g., `import AsyncStorage from '@react-native-async-storage/async-storage'`, navigation libraries, Firebase)
4. Internal contexts (e.g., `import { useTheme } from '../context/ThemeContext'`)
5. Internal hooks (e.g., `import { useProgress } from '../hooks/useProgress'`)
6. Internal utilities (e.g., `import { shuffle, buildUnitSampledSet } from '../utils/question'`)
7. Internal components (e.g., `import UnitBanner from '../components/UnitBanner'`)
8. Internal data/content (e.g., `import * as esData from '../content/earth-science/index'`, `import { SUBJECTS } from '../content/subjects'`)
9. Styles (e.g., `import { T, duoBtn, cardShadow } from '../styles/duo'`, `import './index.css'`)

**Path Aliases:**

- `@content/` resolves to `shared/content/` in both Metro (mobile) and Vite (web)
- Relative imports are the default; no deep import chains encouraged
- Module resolution in mobile/jest config: `moduleNameMapper` maps `@content/(.*)$` to `<rootDir>/../shared/content/$1`

## Error Handling

**Patterns:**

- **Firebase operations:** use `try/catch` with specific error types (e.g., `HttpsError` in Cloud Functions)
- **Native module loading:** wrapped in try/catch with fallback stubs to prevent crashes in Expo Go (see `useAuth.js` for Google Sign-In pattern)
- **Firestore data access:** assume reads may come from cache; handle missing/undefined gracefully
- **Validation first:** type-check inputs before processing (e.g., `if (!Number.isInteger(wrongIdx))` in Cloud Functions)
- **Errors in Cloud Functions:** throw `HttpsError` with appropriate code and message (e.g., `'unauthenticated'`, `'invalid-argument'`, `'resource-exhausted'`)
- **Console logging:** `console.warn()` and `console.error()` used to surface issues; `console.log()` used for development

Example error handling from Cloud Functions (`functions/index.js`):

```javascript
if (!req.auth) throw new HttpsError('unauthenticated', 'Sign in required.')
if (!Number.isInteger(wrongIdx)) {
  throw new HttpsError('invalid-argument', 'Malformed question payload.')
}
try {
  resp = await client.messages.create({ ... })
} catch (e) {
  throw new HttpsError('internal', 'Tutor is unavailable right now.', e.message)
}
```

## Logging

**Framework:** `console` (no dedicated logging library)

**Patterns:**

- **Info:** `console.log()` for development output
- **Warnings:** `console.warn()` with context prefix (e.g., `console.warn('[useAuth] GoogleSignin.configure error:', e)`)
- **Errors:** `console.error()` with context and error details (e.g., `console.error('[useAuth] GoogleSignin.signIn error code:', e.code, 'message:', e.message)`)
- **Comments in logs:** often include the originating module/function in square brackets (e.g., `'[useAuth]'`, `'[mobile]'`)

## Comments

**When to Comment:**

- **Intent comments:** explain WHY (algorithm strategy, non-obvious decision), not WHAT (code is self-documenting)
- **Module docstrings:** JSDoc-style block comment at the top of files explaining module purpose
- **Complex logic:** section headers with ASCII dividers (e.g., `// ── Cache hit ────────────────────────────────────────`)
- **Non-obvious workarounds:** platform-specific guards, native module lazy-loading, timezone/date handling
- **Regression guards:** in tests, link to plans/PRs that explain the regression being tested

**JSDoc/TSDoc:**

- Used selectively for key functions
- Format: multiline comments with descriptions and intent
- Example from `functions/index.js`:

```javascript
/**

 * explainMistake — grounded "why was I wrong?" tutor.
 *
 * The correct answer + the human-authored explanation are passed IN as
 * authoritative context, so the model personalizes the existing explanation to
 * the student's specific wrong choice rather than deciding the answer itself.
 */
```

## Function Design

**Size:** Prefer small, focused functions; complex logic extracted into testable helpers

- Example: `catchUpRefills()` extracted from `useLives.js` for direct testing in `livesLogic.test.js`

**Parameters:** 

- Default values for optional params (e.g., `shouldSpendEnergy({ inRepeat = false, struggleMode = false } = {})`)
- Object destructuring for multiple related params
- Avoid deeply nested function signatures

**Return Values:**

- Predictable: null/undefined for "nothing", empty array `[]` for collections, false for booleans
- Async functions: always return a Promise (even if internally a no-op, return `Promise.resolve()`)
- Objects: return structured data with clear keys (e.g., `{ lives, nextRefillAt }`)

## Module Design

**Exports:**

- Named exports for utilities, contexts, hooks (e.g., `export function useAuth()`, `export function useProgress()`)
- Default export for React components (e.g., `export default function HomeScreen()`)
- Named + default not mixed in the same file (except contexts, which export both provider and hook)
- Mocks in `__mocks__/` mirror the same export names as their real modules

**Barrel Files:**

- Content modules use barrel files: `shared/content/[subject]/index.js` exports all topics, units, achievements, etc.
- App-level barrel files not commonly used; most direct imports from source files

## Platform-Specific Code

**Web/Native Variants:**

- Files ending in `.web.jsx` (or `.web.js`) override their `.jsx` counterpart when building for web
- Used for: Navigation (`navigation/AppNavigator.web.jsx`), animations (`LottieAnimation.web.jsx`), Firebase config (`firebase.web.js`)
- Pattern: both files export the same named function or default component; bundler picks the `.web.*` variant for web builds

**Platform Detection:**

- Use `Platform.OS === 'web'` or `Platform.OS === 'android'` for runtime checks
- Platform check in `HomeScreen.jsx` example:

```javascript
const glassStyle = Platform.OS === 'web' ? {
  backdropFilter: 'blur(24px)',
  // ...
} : {}
```

## Global State & Context

**State Management:**

- React Context for app-level state (Auth, Theme, Streak, Lives, Subscription, etc.)
- AsyncStorage for persistence
- Module-level singletons (RP total, pending progress writes) with reset functions for sign-out
- Memoization of context values to prevent unnecessary re-renders: `useMemo(() => ({ user, loading }), [user, loading])`

**Data Flow:**

- Unidirectional: contexts provide, components consume via hooks
- Hooks call contexts and combine with local state as needed
- Avoid deeply nested prop passing; use context for cross-cutting concerns

## Performance Patterns

**Memoization:**

- `useMemo()` used for expensive computations (e.g., context value memoization)
- `useCallback()` used for callback stability where children depend on reference equality
- `React.memo()` not explicitly used in observed code; optimization via proper re-render boundaries instead

**Offline-First Data:**

- Firestore initialized with persistent local cache
- Assume reads may return cached data
- Write operations optimistically update local state, then persist to Firestore

## Security & Secrets

**Secrets Handling:**

- API keys never committed; Firebase config in mobile hardcoded in `src/firebase.js`, web uses `VITE_*` env vars
- Cloud Functions access secrets via `firebase-functions/params` (e.g., `defineSecret('ANTHROPIC_API_KEY')`)
- `.env` files listed in `.gitignore`; use `.env.example` for reference

---

*Convention analysis: 2026-09-14*
