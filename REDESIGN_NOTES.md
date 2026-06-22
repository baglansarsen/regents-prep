# Home Screen Redesign — What Went Where

The home screen was decluttered to put **units and lessons first**. Nothing was
deleted — every feature still exists, just in a new place. This note is a map.

## In the app

**Home screen now, top to bottom:**
1. Greeting + days-to-exam
2. One banner (streak-freeze *or* engagement nudge — only if relevant, never both)
3. **Lessons** — the unit/lesson path (now the first thing you see)
4. Regents Goal card
5. **Pet companion** — a small card; tap it to open the full pet
6. Daily quest card
7. Focus Timer

**Things that moved off Home — where they are now:**

| You're looking for… | It's now at… |
|---|---|
| Week streak dots (the 7 circles) | Removed from home — tap the **🔥 in the top bar** for the streak calendar |
| Daily Goal ring (RP today) | Removed — your RP is the **⭐ in the top bar**; goals live in the **Regents Goal card** |
| Feed / play / **dig** / **shop** / pet status bars | **Pet screen** — tap the pet companion card on home |
| Pet trivia | **Pet screen** (same place) |
| **Quick Quiz, Speed Round, Flashcards, Practice Mistakes** | **Exams tab** (bottom bar) — "Quick Practice" row at the top, above the past exams |

Quick reference: streak & RP → top bar · pet stuff → tap the pet · quick practice → Exams tab.

## In the code

| File | What's there |
|---|---|
| `mobile/src/screens/HomeScreen.jsx` | Reordered — lesson path moved to the top; week dots, daily-goal ring, big pet block, trivia, and the quick-practice grid removed |
| `mobile/src/screens/PetScreen.jsx` | **New** — the pet hub (visual, message, status bars, dig, shop, trivia) |
| `mobile/src/screens/ExamPickerScreen.jsx` | Added the "Quick Practice" section (the 4 buttons + their handlers) at the top of the exam list |
| `mobile/src/navigation/AppNavigator.jsx` / `AppNavigator.web.jsx` | Registered the new `Pet` route (next to `PetShop`) |
| `mobile/src/utils/subjectData.js` | **New** — `getSubjectData(subject)`, the shared question-bank resolver the practice buttons use |

### Handlers that relocated
- `startSpeedRound`, `startPracticeMistakes` (were in HomeScreen) → now `practiceSpeed` / `practiceMistakes` in `ExamPickerScreen`.
- `handleDig` (the pet's daily dig, was in HomeScreen) → now in `PetScreen`.

### How navigation works now
- **Home → Pet:** the pet companion card calls `navigation.navigate('Pet')` (route registered in `AppNavigator`).
- **Exams tab → practice:** buttons call `navigation.navigate('StudyTab', { screen: 'Quiz' | 'SpeedRound' | 'Flashcards', params })` — a cross-tab jump into the Study tab's stack. After a session finishes, you land back on the Study tab (Home), not Exams. This is expected.

## Done in the same release (1.0.3, not redesign-related)
- Daily-quest RP reward is now actually awarded on completion (was computed then discarded).
- Sign-out clears local caches so a new account on the device no longer inherits the previous user's streak / goal / RP / pet / lives.
- Subscription Product IDs fixed; in-app subscription screen used instead of the hosted paywall; tips hidden until their IDs are reconciled.

## Known leftovers (harmless)
- A few unused StyleSheet keys remain in `HomeScreen.jsx` (`quickGrid`, `weekRow`, etc.) — no runtime impact.
- The home pet companion passes `onPress` to `PetWidget` *and* wraps it in a `TouchableOpacity`; both navigate to Pet, so it's safe (worst case, tapping the sprite pets it instead of navigating).
