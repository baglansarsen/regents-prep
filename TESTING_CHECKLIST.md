# Device Test Checklist — unmerged mobile work

Covers the three unpushed branches. **Use a dev build (not Expo Go)** wherever ads or
native modules are involved; Expo Go rows are called out. Pre-req for most rows: a
**free (non-premium)** account, since lives/ads only gate free users.

Branches:
- `feat/hearts-finish-then-refill`
- `feat/exam-ux-and-placement-unlocks`
- `fix/quiz-feedback-scroll`

---

## 1. Hearts — live refill countdown  (`feat/hearts-finish-then-refill`)
- [x] Drop below 5 hearts (miss a question). The **header pill** shows a `m:ss`
      countdown that **ticks down every second** (not frozen).
- [x] Open the **Rewards sheet** (tap hearts) → "Next life in m:ss" ticks in sync.
- [ ] Let the countdown reach 0 → a heart is granted and the countdown re-anchors to
      the next life (no negative/stuck time).
- [ ] Background the app ~2 min, reopen → hearts/countdown reflect elapsed time
      (catch-up), not a frozen value.

## 2. Hearts — finish lesson then refill  (`feat/hearts-finish-then-refill`)
- [x] Start a lesson, miss questions until **hearts hit 0 mid-lesson** → a small
      **non-blocking banner** appears ("Out of hearts — finish this lesson…"); the
      full-screen blocker does **not** appear.
- [x] Keep answering after 0 hearts → you can complete the remaining questions
      uninterrupted; further wrong answers cost nothing.
- [x] Finish that lesson → the **refill gate auto-appears** before the Results screen.
- [ ] In the gate, the **countdown ticks**; **Refill All (300 RP)** works (if enough RP)
      → lands on Results.
- [ ] Tap **"Continue without refilling"** → proceeds to Results normally (not trapped).
- [ ] **Watch Ad** (dev build) → grants a **full refill (5 hearts)**, then proceeds to
      Results. *(Confirm reward = 5, not +1.)*
- [ ] **Expo Go / web:** ad button shows **"Loading ad…"** (disabled); RP refill +
      countdown + dismiss still work.

## 3. Hearts — lesson start gate  (`feat/hearts-finish-then-refill`)
- [ ] From Home at **0 hearts**, tap a lesson → the **same refill gate** (ad + RP +
      premium + ticking countdown) appears — **not** the old plain alert.
- [ ] Refill (ad or RP) in the gate → the tapped lesson **starts** automatically.
- [ ] Dismiss ("Not now") → no lesson starts; you stay on Home.
- [ ] Repeat for the other entry points that gate on hearts (Quick Practice / Smart
      Study / topic quiz) — each opens the gate and resumes correctly after refill.

## 4. Hearts — premium bypass  (`feat/hearts-finish-then-refill`)
- [ ] As a **premium** user: hearts show **❤️ ∞**, never decrement; **no banner, no
      gate** mid-lesson, at lesson end, or at lesson start.

## 5. Placement test — unit-aware unlock  (`feat/exam-ux-and-placement-unlocks`)
- [ ] **Fresh account**, Living Environment → take the placement test → it shows
      **10 questions** (not 1) across varied topics.
- [ ] Each question now requires tapping **Submit** to commit (tapping a choice only
      selects; you can change it before Submit).
- [ ] Ace the **cell** questions + **Genetics** → on finishing, the Home grid shows the
      matching units (**Cell Structure / Energy / Biochemistry** AND **Genetics**)
      **unlocked**. *(This is the core fix — split-cell units must unlock.)*
- [ ] Regression: separately finish a unit's lessons the normal way → the **next unit
      unlocks** as before.
- [ ] Humanities subject (e.g. Global History) → placement is **skipped** (no MC pool),
      goes straight through.

## 6. Past-exam UI/UX  (`feat/exam-ux-and-placement-unlocks`)
- [x] Start any exam → the **timer reflects the subject** (180 min), not 85.
- [x] **Review step:** tap **Review** → see lists of **unanswered** + **flagged**
      questions; tap one to **jump back**; then **Submit exam**.
- [x] **Flag** a question (a11y label reads sensibly with VoiceOver/TalkBack if testing
      accessibility); flagged dot shows in the dots row and the review list.
- [x] **Written question:** tap **Show model answer** → it reveals **inline** (not a
      native alert); tap again hides it.
- [x] **Keyboard:** type in a written answer, then navigate Prev/Next or tap a dot →
      keyboard **dismisses** (no stuck keyboard over the next question).
- [ ] **Written-heavy exam** (e.g. a history exam, mostly written): submit → results
      show **no `NaN%`** and review shows **no "✓ undefined"**.
- [ ] **Normal MC exam:** score still computes correctly; review shows the correct
      choice only on missed questions.
- [ ] **Written scoring (Premium):** AI-grade a written answer in-exam → results
      breakdown shows **earned/total written points** (not just "N submitted").
      Free user: written shows **"ungraded"**, MC still scores.
- [ ] Pick an exam with no data / force an error → an **`Alert.alert`** (titled dialog),
      not a bare `alert()`.

## 7. Quiz feedback panel scroll  (`fix/quiz-feedback-scroll`)
- [ ] Miss a question, tap **"Why was I wrong?"** (Premium) → with a **long** AI answer,
      the feedback panel **scrolls** and you can reach the **top** of the answer.
- [ ] **CONTINUE** button stays **pinned/visible** at the bottom while the answer scrolls.
- [ ] Short feedback still looks right (panel not awkwardly tall).

## 8. Regression — zero-graded & general  (`feat/exam-ux-and-placement-unlocks`)
- [ ] Complete a **normal lesson** → score %, RP, mastery, streak all behave as before
      (the zero-graded guard didn't change normal lessons).
- [ ] Complete a **⚡ Challenge** → pass/fail + next-unit unlock still works; if you
      finish a challenge at 0 hearts, the end refill gate appears too.

---

### Sign-off
- [ ] All above pass on **iOS** (dev build)
- [ ] All above pass on **Android** (dev build)
- [ ] Quick smoke pass in **Expo Go** (non-ad paths only)
- [ ] No red-screens / console errors during the runs
