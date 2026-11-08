# Exam-date study plan: goals and pacing from the date the student picks

**Status:** proposal, 2026-11-07; **Phase 0 shipped 2026-11-08; Phase 1 (engine, `utils/studyPlan.js`) built 2026-11-08; Phase 2 (study time + plan preview in goal setup) built 2026-11-08.** Decisions taken: study-time question in goal setup only (not onboarding); "N days a week", not fixed weekdays. Scope: `mobile/` only.

**Goal:** when a student picks "June 2027, Safe Pass (75)", the app should turn that into a plan they can follow. That means what to finish this week and what to do today, plus whether they're on track and what to change if they're not. The plan adjusts itself as days pass, sessions are missed, scores change, or the date changes.

---

## 1. What exists today (and what's missing)

Mapped from the code on 2026-11-07. Paths are under `mobile/src/`.

| Piece | Where | What it does now |
|---|---|---|
| Date + goal pick | `screens/ReggieOnboardingScreen.jsx:47-98`, `screens/GoalSetupScreen.jsx` | Student picks subject → session (`getUpcomingExamSessions`) → tier (65/75/85, `data/goalConfig.js`) |
| Goal storage | `context/GoalContext.js` | Per subject: `{target, examDateStr, committedAt, baselineScore, predicted, rescuePlan}`; AsyncStorage `@regentsGoal_v1_${uid}` + Firestore `users/{uid}/meta/goals` |
| Exam calendar | `utils/examDates.js` | Computed: same Tuesday for every subject (Jan wk4, Jun wk3, Aug wk2). No real NYSED dates |
| Countdown | `HomeScreen.jsx:213-217`, `getExamLabel` | Uses the chosen date until it passes, then silently rolls to the next computed session |
| Daily pick | `utils/todayMission.js`, `utils/homeAgenda.js` | Priority ladder; days-to-exam matters only for "practice exam within 14 days" |
| Last-month mode | `utils/rescuePlan.js`, `components/RescuePlanSheet.jsx` | One-time urgency answer (week/month/long) and target mode; takes over Home at ≤30 days |
| Today's 3 tasks | `buildTodayPlan` in `todayMission.js:314-434` | Fix → learn → practice; headline "+N to reach T"; ignores time left |
| Readiness | `utils/predictedScore.js`, `hooks/usePredictedScore.js` | Predicted score, per-unit pct, confidence, weakest / highest-yield unit |
| Reminders | `hooks/useNotifications.js`, `utils/goalNotifications.js`, `hooks/useGoalNotificationScheduler.js` | Daily reminder; countdown alerts at 30/14/7/3/1 days; Sunday report; active subject only |
| Daily goal | `hooks/useDailyGoal.js` | RP-based (10/20/50/100); no minutes-per-day target |

**Gaps this plan closes:**
- **G1. No pacing.** Nothing works out "N units left, M study days left → this much per week." Days-to-exam only affects practice-exam timing and the ≤30-day rescue switch.
- **G2. Guessed calendar.** All subjects share one computed Tuesday. The label says "days to **next** Regents" even when the count is to the student's chosen session.
- **G3. Passed dates.** After the chosen date passes, the countdown silently moves to the next session. The stored date is never updated, and the notification bridge sees negative days.
- **G4. Changing the goal wipes it.** `commitGoal` rebuilds the entry, dropping `rescuePlan`, `committedAt`, the baseline and the prediction anchor.
- **G5. Stale urgency.** `rescuePlan.urgency` is answered once and never re-derived as the date approaches.
- **G6. One subject at a time.** Goals are per subject, but Home, reminders and quests only use the active subject. Nothing balances two exams.
- **G7. No time budget.** No "how many days a week / minutes a day can you study" input, so the plan can't tell whether the goal is realistic.
- **G8. Data limits that skew a long plan.** Quiz history is capped at 200 rows across subjects (`useProgress.js:144`). Study time is kept for 7 days and isn't per subject. `ProgressPanel.jsx:41` calls `useStudyTime()` without a uid.

---

## 2. What the student experiences

```
ONBOARDING / GOAL SETUP                    HOME (every day)                         MY PLAN (new screen)
1. Subject                                 "Week 6 of 33 · On track ✓"              Timeline:
2. Exam session  (real NYSED date)         Today: 3 tasks sized to your minutes      ── Learn ──────── Mar 3
3. Goal: Pass / Safe Pass / Mastery        DO THIS NEXT ← from today's phase         ── Strengthen ─── May 12
4. NEW: "When can you study?"                                                        ── Exam prep ──── Jun 9
   days/week + minutes/day                 Behind? → "2 lessons behind.              ── Final week ─── Jun 16
5. Preview: "Finish all 14 units by          Catch up this weekend, or add             EXAM ─────────── Jun 23
   Mar 3, then 3 practice exams.             10 min/day."                            This week: Unit 7 (2 lessons),
   About 25 min, 4 days a week."                                                     review 6 mistakes, 1 quiz
   [Looks good] [Adjust]                                                             Milestones ✓/○
```

Principles:
- **One plan, many views.** Home, My Plan, reminders and the rescue mode all read the same computed plan. No surface picks its own logic.
- **Computed, not stored.** The plan is recalculated from goal + progress + today's date every time. Only the student's choices are stored: date, target, availability. Re-planning happens on its own.
- **Honest feasibility.** If the goal doesn't fit the time available, say so early, with three fixes: more minutes, a later session, or a lower tier.
- **Never silently move the date.** When the chosen date passes, ask what happened.

---

## 3. The plan engine (`utils/studyPlan.js`, pure, fully tested)

```
buildStudyPlan({
  today,                     // 'YYYY-MM-DD' (local)
  examDateStr, target,       // from GoalContext
  availability,              // { daysPerWeek: 3-7, minutesPerDay: 10|15|25|40|60 }
  units,                     // content/<subject>/units.js (lessonCount, examWeight, order)
  lessonsDone,               // per unit, from useLessonProgress
  topicBreakdown, predicted, // from usePredictedScore
  dueCount, practiceExamsTaken, studiedDates,
}) → {
  daysLeft, studyDaysLeft,
  phase: 'learn'|'strengthen'|'exam_prep'|'final_week'|'exam_day'|'passed',
  phases: [{ id, start, end }],                 // timeline for My Plan
  pace: { lessonsTotal, lessonsDone, lessonsLeft, learnStudyDays, lessonsPerStudyDay, capacityPerStudyDay, shortfallLessons, status: 'ahead'|'on_track'|'behind'|'at_risk' },
  thisWeek: { units: [{unitId, lessons}], reviews, quizzes, practiceExam?: boolean },
  milestones: [{ id, date, done }],             // checkup, unit coverage done, practice exam 1/2/3, mistakes cleared
  feasibility: { fits: boolean, minutesNeededPerDay, suggestions: [...] },
  todayBudgetMinutes,
}
```

**Phases**, working back from the exam date. Lengths shrink in proportion when time is short:

| Phase | Default window | Focus | Today's tasks lean to |
|---|---|---|---|
| Learn | start → coverage date | First pass through every unit in order | `next_lesson` |
| Strengthen | coverage → exam −21 d | Weakest, highest-yield units below target (`rankUnitsByYield`) | `weak_unit_quiz`, flashcards |
| Exam prep | −21 d → −7 d | Practice exams (one per ~week), mistake review | `practice_exam`, `review_mistakes` |
| Final week | −7 d → −1 d | Short sessions, mistakes, one last exam, no new units | `review_mistakes`, `daily_trap` |
| Exam day | 0 | Encouragement only | — |
| Passed | > 0 days after | Ask how it went (§6) | — |

**Pace:**
- Lessons left = Σ(lessonCount − lessonsDone) over all units.
- Study days in Learn = study days between today and the coverage date, using `daysPerWeek`.
- `lessonsPerStudyDay = ceil(lessonsLeft / learnStudyDays)`.
- Status looks forward, so it needs no record of where the student started and can't drift. It compares the minutes the remaining lessons need per study day (`lessonsPerStudyDay × minutesPerLesson`) with `minutesPerDay`:
  - **ahead:** ratio ≤ 0.6
  - **on_track:** ≤ 1.0
  - **behind:** ≤ 1.3
  - **at_risk:** above 1.3, or lessons left with no learn days remaining
  - `shortfallLessons` = lessons the learn window can't fit at the student's minutes (for "N lessons behind" copy).
- Phase windows: final week 7 days (all remaining days when ≤ 7); exam prep up to 14 days (half of what's left, rounded up, when short); strengthen 2 days per unit (7–42) when the timeline is long, 25% of the pre-prep time when short; learn is the rest. The coverage date is anchored to the exam, so it doesn't drift as days pass. *(Implemented in Phase 1; replaces the earlier "expected lessons by today" idea.)*
- Minutes per lesson are estimated from real data where available: `useStudyTime` quiz minutes per lesson completed. Otherwise the default is 8 min (the current `MINUTES` constants).

**Feasibility:** `minutesNeededPerDay` = (learn + strengthen + prep minutes) / study days. If it exceeds `minutesPerDay` by more than 20%, `fits = false`. Suggestions are ranked by how much they close the gap:
1. Add N min/day.
2. Add a study day per week.
3. Pick the next session (shows its date).
4. Aim for Pass instead of Safe Pass.

**Rescue mode becomes a phase.** When fewer than 30 days remain *and* status is behind or at risk, `pickRescueAction` takes over. Urgency is derived from `daysLeft` every time (fixes G5). The stored `rescuePlan.urgency` is kept only as a starting answer.

**Wiring into what exists (no new ladders):**
- `pickTodayMission` / `buildHomeAgenda` get `plan.phase` and use it to reorder their existing rungs. Example: in Learn, `next_lesson` comes before `weak_unit_quiz` unless the weak unit is far below target.
- `buildTodayPlan` sizes its 3 tasks to `todayBudgetMinutes` and uses `thisWeek.units` for the "learn" task.
- `pickSmartQuest` and the review priority (`reviewQueue.js:161`) read `plan.daysLeft` instead of re-deriving it.

---

## 4. Data changes

| Change | Where | Notes |
|---|---|---|
| `availability: {daysPerWeek, minutesPerDay}` | GoalContext entry (per subject) + a per-user default | New field. Old goals default to 5 days × 15 min until the student answers |
| `updateGoal(subject, patch)` | GoalContext | Merges fields. `commitGoal` remains only for a brand-new goal. Fixes G4 |
| `examSessions` data file | `data/regentsCalendar.js` | Real NYSED dates per subject per session, with a `confirmed: boolean` flag; computed dates only as fallback, labeled "estimated" (G2) |
| `planOutcome` on a goal | GoalContext | `{status: 'took'|'missed'|'moved', score?, at}` when the date passes (§6) |
| Quiz history cap | `useProgress.js:144` | Raise or query per subject so the plan counts all lessons done (G8) |
| `useStudyTime` | per subject, 60 days | Needed for real minutes-per-lesson and the weekly report (G8); fix the missing uid in `ProgressPanel.jsx:41` |

Nothing is stored about the plan itself; it is always recomputed (§2).

---

## 5. Screens and reminders

- **Onboarding (ReggieOnboardingScreen):** add a step after the goal tier: "When can you study?" with day chips (Mon–Sun) and minute chips (10/15/25/40/60). Then a preview card from `buildStudyPlan`. If `fits` is false, it shows the suggestions with one-tap fixes before finishing.
- **GoalSetupScreen:** the same availability control and preview. "Update my goal" uses `updateGoal`, so history and rescue answers survive.
- **My Plan (new, from the Home countdown and GoalDetail):**
  - phase timeline
  - this week's units and reviews
  - milestones
  - pace status with a one-line "how to catch up"
  - an "Edit date / goal / study time" button
- **Home:**
  - The countdown label reads "**N days to your June Regents**" (the chosen session, not "next"), plus a pace chip such as "On track" or "2 lessons behind".
  - The DO THIS NEXT hero is unchanged in look; its pick now comes from the phase.
- **Reminders:**
  - Daily reminder at the student's time, on study days only, with plan-aware text ("Unit 7, lesson 2 today, about 15 min").
  - Countdown alerts unchanged, but computed from the clamped `daysLeft`.
  - Sunday report: "This week: 4/5 lessons, 1 quiz. Next week: Unit 8."
  - Fix the reminder text being overwritten by the streak-only version (`useNotifications.js:174-178`).

---

## 6. When things change

| Event | What happens |
|---|---|
| Missed days | Pace recalculates; status → behind; Home says how to catch up (weekend, +minutes). No guilt copy |
| Score jumps (practice exam) | Strengthen focus moves to the next weakest unit; status can go to ahead |
| Student changes date/target/availability | `updateGoal`; plan recomputes; preview shows the new timeline before saving |
| Chosen date passes | Next open: "How did the June Regents go?" → I took it (optional score) / I didn't take it / It moved. "Didn't take it" or "moved" opens session picker for the next date. No silent rollover (G3) |
| Two subjects with goals | Each has its own plan. Home shows the active subject; My Plan shows a combined weekly load and warns when the total exceeds availability (G6, Phase 5) |

---

## 7. Build phases

Each phase ships on its own with tests, mobile-only commits, and the usual check before each push.

| Phase | Ships | Tests |
|---|---|---|
| **0. Fix the foundations** | `updateGoal` (G4); countdown label names the chosen session (G2 copy); clamp/flag passed dates instead of rolling silently (G3); `rescuePlan` urgency derived from days (G5); notification bridge never sees negative days; `ProgressPanel` uid fix | New: `examDates.test.js`, `GoalContext.test.js`; extend `rescuePlan.test.js`, `homeAgenda.test.js` |
| **1. Plan engine** | `utils/studyPlan.js` pure: phases, pace, feasibility, thisWeek, milestones | `studyPlan.test.js`: the boundary days −30/−21/−7/−1/0/+1; empty progress; all units done; 2 days left with 10 units; daysPerWeek 3 vs 7; leap/DST-safe date math |
| **2. Availability + preview** | Onboarding step and GoalSetup control; preview card with fixes | Render tests for the preview states (fits / doesn't fit) |
| **3. Plan on Home + My Plan screen** | Phase-aware mission ordering; budget-sized today tasks; pace chip; My Plan screen | Extend `todayMission`/`todayPlan` tests per phase; render test for My Plan |
| **4. Reminders + date-passed flow** | Plan-aware daily/weekly text; study-days-only reminders; "How did it go?" flow | `goalNotifications.test.js`; flow test for the passed-date prompt |
| **5. Multiple subjects** | Combined weekly load; per-subject reminders | Engine tests with two goals |

Phase 0 is small and fixes real bugs today, so it's worth doing even if the rest waits.

---

## 8. Decisions needed before building

1. **Real exam dates.** NYSED publishes each session's schedule (subject, date, AM/PM). Should I build `data/regentsCalendar.js` from the published January/June 2026 and 2027 schedules (you confirm the source), with computed dates shown as "estimated" until a schedule is out?
2. **Availability question in onboarding.** It adds one step. Ask it in onboarding (better first plan), or only in GoalSetup with defaults until then?
3. **Daily goal.** Keep the RP daily goal as it is, or replace it with the plan's minutes-per-day so there's one daily target?
4. **Multiple subjects.** Plan for one subject first (Phases 0–4), with multi-subject (Phase 5) later? Or design for it from the start?
5. **Weekly structure.** Fixed study days ("Mon, Wed, Fri") with reminders only those days, or just "N days a week, any days"?

## 9. Not in scope

- AI-generated study schedules (the engine is rules-based and testable).
- Calendar app export, parent/teacher views, and chromebook.
- Changing lesson content or the unit order.
