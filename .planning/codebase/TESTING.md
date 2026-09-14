---
last_mapped_commit: 874b2634efd05a4f691515ba14014a4561ed9e9c
last_mapped_at: 2026-09-14
---
# Testing Patterns

**Analysis Date:** 2026-09-14

## Test Framework

**Runner:**

- Jest `^29.7.0`
- Preset: `jest-expo` for Expo/React Native support
- Config: in `mobile/package.json` (no separate jest.config.js)

**Assertion Library:**

- Jest built-in matchers (no additional library needed)
- `@testing-library/jest-native` for native component assertions

**Setup:**

- `@testing-library/jest-native/extend-expect` loaded via `setupFilesAfterEnv`
- Transforms configured to ignore node_modules except for React Native and Expo packages
- Path aliases: `@content/` mapped to shared content, Firebase mocked for all tests

**Run Commands:**

```bash
cd mobile
npx jest                              # Run all tests
npm test                              # Same as above (alias)
npm run check                         # jest + babel parse-check of changed files
npm run check                         # Parse-check runs: jest --no-coverage && node scripts/parse-check.mjs
```

## Test File Organization

**Location:**

- **Integration into source tree:** Tests live alongside their code
  - Tests for module-level functions: in `src/__tests__/` (e.g., `livesLogic.test.js`, `predictedScore.test.js`)
  - Tests for utilities: in `src/utils/__tests__/` (e.g., `achievements.test.js`, `homeAgenda.test.js`)
- **No separate test directory:** All tests co-located with source for single-app focus (mobile)

**Naming:**

- Pattern: `[ModuleName].test.js` or `[functionName].test.js`
- Examples: `livesLogic.test.js`, `useQuiz.test.js`, `achievements.test.js`, `streakLogic.test.js`

**Structure:**

```
mobile/src/
├── __tests__/                     # Root test suite
│   ├── livesLogic.test.js
│   ├── useQuiz.test.js
│   ├── streakLogic.test.js
│   └── ...
├── utils/
│   ├── energy.js
│   ├── __tests__/                 # Utility-specific tests
│   │   ├── achievements.test.js
│   │   ├── homeAgenda.test.js
│   │   └── ...
│   └── ...
└── ...
```

## Test Structure

**Suite Organization:**

- Use both `test()` for simple cases and `describe()` for grouped test suites
- Section headers with descriptive comments and ASCII dividers for visual organization
- Example from `livesLogic.test.js`:

```javascript
// ── Already full ──────────────────────────────────────────────────────────────

test('at MAX_LIVES: no change, nextRefillAt cleared', () => {
  // ...
})

// ── No refill timer ───────────────────────────────────────────────────────────

test('no nextRefillAt: lives unchanged', () => {
  // ...
})
```

**Regression Guards:**

- Describe blocks link to plans/PRs explaining what's being tested and why
- Example from `achievements.test.js`:

```javascript
// Regression guard for Step 2 of
// ~/.claude/plans/expressive-meandering-lagoon.md: computeAchievements used
// to only evaluate Living Environment + Earth Science achievements —
// content/life-science/achievements.js's 9 `ls_*` achievements were dead
// code, never reachable no matter what a student did...

describe('computeAchievements includes life-science achievements', () => {
  // ...
})
```

**Patterns:**

*Setup/Teardown:*

- No explicit setup/teardown observed; mocks and fixtures are self-contained per test
- Each test is independent and isolated
- No shared state between tests

*Assertions:*

- Use Jest matchers: `toBe()`, `toEqual()`, `toBeLessThanOrEqual()`, `toBeGreaterThanOrEqual()`, `toBeNull()`, `toEqual()`
- Example from `livesLogic.test.js`:

```javascript
test('at MAX_LIVES: no change, nextRefillAt cleared', () => {
  const refillTime = new Date(Date.now() - REFILL_MS).toISOString()
  const result = catchUpRefills(5, refillTime)
  expect(result.lives).toBe(5)
  expect(result.nextRefillAt).toBeNull()
})
```

## Mocking

**Framework:** Jest's built-in mocking via `jest.fn()` and module mocking

**Patterns:**

```javascript
// Minimal Firebase mock in `src/__mocks__/firebase.js`:
export const db = {}
export const doc = jest.fn(() => ({}))
export const getDoc = jest.fn(() => Promise.resolve({ exists: () => false, data: () => ({}) }))
export const setDoc = jest.fn(() => Promise.resolve())
```

**What to Mock:**

- External dependencies (Firebase, native modules, API clients)
- Complex integrations that would slow down tests
- Time-dependent operations (dates, timers) via constants or helper functions

**What NOT to Mock:**

- Pure functions being tested (import and test them directly)
- Business logic in utilities (e.g., `streakMath`, `energy`) — import and exercise the real implementation
- State computation functions (e.g., `computeStreak()`, `catchUpRefills()`) — test the actual code, not a mock

**Example: Testing Real Function Not a Mock**
From `streakLogic.test.js`:

```javascript
// These exercise the REAL production functions from utils/streakMath — the same
// code StreakContext runs. (They used to re-implement an out-of-date copy that
// tested single-day boolean freezes and UTC dates, so they could pass while the
// app behaved differently. Importing the real module keeps them honest.)

import {
  computeStreak,
  computeMarkStudied,
  // ...
} from '../utils/streakMath'

// Tests import the real function and exercise it directly:
test('studied today: streak maintained and studiedToday is true', () => {
  const result = computeStreak({ streak: 5, lastDate: todayStr() }, 0)
  expect(result.streak).toBe(5)
  // ...
})
```

## Fixtures and Factories

**Test Data:**

- Constants defined at module level (e.g., `MAX_LIVES = 5`, `REFILL_MS = 30 * 60 * 1000`)
- Helper functions for data generation (e.g., `daysAgoStr(2)`, `yesterdayStr()`) from `utils/localDate`
- Subject/topic imports from content modules for achievement tests

**Location:**

- Fixtures live in the same test file or imported from utils (e.g., `localDate` helpers)
- No separate fixtures directory observed; data is generated inline or via imported utils

**Example Fixture Pattern** from `streakLogic.test.js`:

```javascript
const todayStr = localDateStr
const twoDaysAgoStr   = () => daysAgoStr(2)
const threeDaysAgoStr = () => daysAgoStr(3)

test('missed one day with 1 freeze: freeze consumed, streak kept, yesterday bridged', () => {
  const result = computeStreak({ streak: 7, lastDate: twoDaysAgoStr() }, 1)
  expect(result.streak).toBe(7)
  // ...
})
```

## Coverage

**Requirements:** Not enforced by CI; `npm run check` runs tests with `--no-coverage` flag

**View Coverage:**

```bash
cd mobile
npx jest --coverage                   # Generate and display coverage report
```

**Target:** No explicit minimum coverage requirement found in config; best practice is to test all public APIs and critical business logic

## Test Types

**Unit Tests (Primary):**

- Scope: Pure functions, utilities, business logic
- Approach: Import the function directly, call with test inputs, assert on outputs
- No mocking of internal dependencies unless they're external modules
- Examples: `energy.js` functions, `streakMath.js` functions, scoring logic in `useQuiz.js`

**Characterization Tests:**

- Used to verify state computation matches production behavior
- Example from `livesLogic.test.js`: tests characterize exact timer arithmetic to ensure live refill logic never changes unexpectedly

**Integration Tests (Limited):**

- Some utility tests combine multiple functions (e.g., `achievements.test.js` calls `computeAchievements()` which internally calls other functions)
- No full-stack integration tests observed; Firebase/async operations are mocked

**E2E Tests:**

- Not present in current test suite
- Manual testing via dev builds (Expo Go, Web, simulator) is the E2E approach

## Common Patterns

**Async Testing:**

- Not widely used; most business logic extracted into synchronous pure functions
- Example (rare) from Cloud Functions testing: functions are tested by calling them directly with mocked Firestore refs (synchronous mocks)
- Pattern for async: return the Promise and Jest waits automatically:

```javascript
test('async example', async () => {
  const result = await someAsyncFunction()
  expect(result).toBe(expected)
})
```

**Error Testing:**

- Validate that errors are thrown for invalid inputs:

```javascript
test('invalid nextRefillAt string: treated as not-due, lives unchanged', () => {
  const result = catchUpRefills(2, 'not-a-date')
  expect(result.lives).toBe(2)
  expect(result.nextRefillAt).toBe('not-a-date')
})
```

- Validate edge cases:

```javascript
test('never returns more than MAX_LIVES regardless of time elapsed', () => {
  const longAgo = new Date(Date.now() - 100 * REFILL_MS).toISOString()
  const result = catchUpRefills(0, longAgo)
  expect(result.lives).toBeLessThanOrEqual(MAX_LIVES)
  expect(result.lives).toBe(MAX_LIVES)
  expect(result.nextRefillAt).toBeNull()
})
```

**Boundary Testing:**

- Test edge cases explicitly (zero, max values, off-by-one scenarios)
- Example from `streakLogic.test.js`: tests clock skew, freeze consumption, gap bridging at exact boundaries

## Testing Patterns in Cloud Functions

**Approach:** No Jest tests in `functions/` directory; functions are tested manually or via integration tests

**Function Testing Strategy:**

- Validation happens first (parameter type checks)
- Cache layer is exercised before calling the expensive model
- Rate limiting (daily cap) is enforced and tested via mock Firestore calls
- All error paths throw `HttpsError` with appropriate codes

**Example from `functions/index.js` (not tested, but shows defensive logic):

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

## Testing Exclusions

**What's Not Tested (and Why):**

- React components (no component tests in Jest; visual testing is manual via dev builds)
- Navigation and routing (complex with Expo Navigation; manual testing preferred)
- Firebase persistence (assume working; mocked in unit tests)
- Native modules (lazy-loaded with try/catch guards; assume working when loaded)
- Animated/graphical features (Lottie, Rive, gestures) — manual testing

## Regression Testing Strategy

**Test Suite Purpose:**

- Prevent reintroduction of fixed bugs
- Verify complex business logic (streaks, lives, scoring) never drifts
- Ensure cross-subject content works (achievements, history, progress)

**Regression Examples:**

1. `livesLogic.test.js`: Characterizes timer math to prevent drift in live refill logic
2. `streakLogic.test.js`: Tests real production streak computation to catch silent behavior changes
3. `achievements.test.js`: Regression guard that life-science/geometry/chemistry achievements are actually earnable (were dead code before)
4. `predictedScore.test.js`: Ensures score prediction formula never drifts

---

*Testing analysis: 2026-09-14*
