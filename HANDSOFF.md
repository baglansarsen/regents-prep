# Handoff — Session 2026-06-07

## Branch strategy established
- `master` — mobile source of truth, triggers Xcode Cloud build on every push
- `feat/web-app-vite` — active mobile feature branch
- `feat/chromebook-b2b` — permanent chromebook branch, never merges to master; merge master → chromebook after `shared/content/` updates
- Xcode Cloud updated to build from `master` only (no more builds on every commit)
- Deploy chromebook: `git checkout feat/chromebook-b2b && npm run deploy`

## Commits merged to master (fix/mobile-bugs)

### 1. Pet speech bubble — `1b4cdd3`
- **Removed** the slow typewriter `SpeechBubble` overlay from `PetWidget` — it floated above the daily goal section at 35ms/char
- **Improved** the right-side pet bubble on HomeScreen:
  - Shows active `say()` message (dig reward, milestone) → falls back to time-of-day/subject-aware daily greeting → falls back to `getPetMessage()`
  - Pet-colored left accent border, pet name label, larger text
  - Active messages auto-dismiss after 4s; pet plays talk animation while speaking
- Files: `PetWidget.jsx`, `HomeScreen.jsx`

### 2. Images disappearing from exam + lessons — `7259918`
- **Root cause 1**: `QuestionCard.jsx` (lesson mode) used `question.image` as a bare relative path — React Native can't resolve `/images/exams/...` without a full URL. Lesson images were broken every single run.
- **Root cause 2**: `CDN_BASE` hardcoded separately in `QuizScreen.jsx` and `ExamScreen.jsx` (`regents-csas.web.app`) with no shared constant — drift on every edit.
- **Root cause 3**: `mobile/dist` (served by Firebase Hosting `regents` target) has no `/images/` directory — `expo export` doesn't copy exam images, so every deploy silently wiped them.
- **Fix**: single `imageUri()` helper in `mobile/src/utils/cdn.js` (`regents-prep.web.app`). All three files import it. Deploy scripts now run `copy:images` (copies `public/images/` → `mobile/dist/`) before every Firebase deploy.
- Files: `utils/cdn.js` (new), `QuizScreen.jsx`, `ExamScreen.jsx`, `QuestionCard.jsx`, root `package.json`

### 3. PetTriviaCard crash — `0b1548d`
- **Crash**: `TypeError: Cannot read property 'map' of undefined` in `PetTriviaCard` on HomeScreen
- **Root cause**: `getDayQuestion(pool)` was picking from the raw questions array which includes written/constructed-response questions (no `choices` field). `q.choices.map()` threw on them.
- **Fix**: filter to `Array.isArray(q.choices) && q.choices.length > 0` in `triviaPool.js` before picking. Safety guard added in `PetTriviaCard` as well.
- Files: `triviaPool.js`, `PetTriviaCard.jsx`

## Commits on feat/web-app-vite (from prior session, already pushed)
- `38b3f06` — streak freeze lastDate bug, lesson unlock race condition (pending queue in `useProgress`), timer removal from lessons, written question filter for all 10 subjects, LE june-2025 q43 context fix

## Active branches
| Branch | Status |
|---|---|
| `master` | Clean, Xcode Cloud building |
| `feat/web-app-vite` | Mobile feature work, ahead of master |
| `feat/chromebook-b2b` | Chromebook B2B Teacher Mode, deployed to `regents-prep.web.app` |

## Known issues / next session
- `feat/web-app-vite` has mobile fixes not yet merged to master (streak freeze, lesson unlock, timer removal, written question filter) — consider merging or opening a PR
- `daysUntilExam: 14` in `HomeScreen.jsx` is hardcoded — wire to real exam date when available
