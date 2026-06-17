# Test Checklist — 2026-06-16 session

All items below are committed and pushed to `master` (in the Xcode Cloud build).
Ordered roughly easiest → deepest. Check off as you verify on device.

> ⚠️ None of these were run on a device by the author — this is the first real validation.
> Items marked **(native)** need a real build (RevenueCat/StoreKit); **(2 accounts)** need two signed-in users.

## Top bar
- [ ] **1. Combined course pill** (`b1dba85`) — one Duolingo-style pill `🧬 LE  78  ▼` (no 🎯 icon). Score chip readable; turns green when predicted ≥ goal target.
- [ ] **2. Subject/goal sheet** (`ff923f4`) — tap pill → bottom sheet: predicted-vs-target ring, "points to go", exam countdown. Tap a subject → switches + closes. CTA opens GoalDetail (goal set) / GoalSetup (no goal).

## Onboarding / tour
- [ ] **3. Spotlight tour** (`fbfd77d`, `8ce5c2d`) — fresh signup → pet → subject → school → land on Home → ~1s later tour highlights subject → streak → lives → RP → "all set". Profile → "How It Works" replays it. (New-user gate bug is fixed — it should actually fire.)
- [ ] **4. School filter chips** (`94726af`) — chips under school search are full-size with visible labels (not clipped).

## Profile / monetization
- [ ] **5. Merged Premium + Support row** (`f1ada7f`) — Profile shows ONE row → Support screen (no duplicate).
- [ ] **6. Tip Jar** (`297ec77` + fix `233d01e`) **(native)** — Profile → Support → three tip buttons show live App Store prices; tapping one opens the purchase sheet (NOT "Donation product not found").

## Home / Exams
- [ ] **7. Quick Practice → Exams tab + Pet screen** (`f7a8204`) — Exams tab shows Quick Quiz / Speed / Flashcards / Mistakes grid; Home pet widget opens the dedicated Pet screen.

## Progress tab
- [ ] **8. Progress rebuilt** (`335f1d7`) — predicted-score hero (matches Home), 3×2 stat strip (weekly RP, study today, best exam, quizzes, accuracy, mastered), weakest/strongest insight with a working **Practice** button, Achievements preview row. No "Analytics" button.

## Social tab
- [ ] **9a. Battles tab** (`47707d3`) **(2 accounts)** — A challenges B → "Waiting…"; when B plays, A's screen flips live to Won/Lost/Tie; result appears in A's Battles tab with a Rematch button.
- [ ] **9b. Leaderboard segment** — Friends / School / League 3-way; League shows tier banner + standings inline + "View promotion zones ›".
- [ ] **9c. League pull-to-refresh** — pull down on the League screen reloads.
- [ ] **9d. Friend management** — long-press a friend → confirm → removed from both sides; outgoing/pending requests shown.

## Exam countdown
- [ ] **10. Countdown rollover** (`8de17a7`) — a goal whose exam date has passed shows the NEXT session's countdown, never a negative number (check Home goal card, Progress hero, subject sheet, GoalDetail).

## Smart Review (adaptive remediation)
- [ ] **11. Self-clearing review** (`7172b66`) — fail several questions → 🩹 **Fix-ups (N)** node appears on that unit + **"Review your gaps"** card on Home/Progress. Run a review; answer items correctly → counts drop; once an item is retired the node count falls and disappears at 0. Practice Mistakes (Exams tab) is now prioritized (most-missed/overdue/weak-topic first).

## Curriculum revisions
- [ ] **12. Life Science: Biology** (`401fde0`) — switch subject to LS: new **📊 Data & Investigations** unit (2nd, after Cells); lessons populate; **✍️ Written Practice** button in Exams tab runs constructed-response items with model-answer reveal; no "Classification of Life" flashcards/achievement.
- [ ] **13. Living Environment** (`7f0dbf0`) — switch to LE: **10 units in order** — Cell Structure & Transport → Energy: Photosynthesis & Respiration → Biochemistry & Enzymes → Data & Investigations → Genetics → Evolution → Ecology → Human Body → Lab Skills → Mixed Review. Every unit's lessons populate (no repetition); Reproduction is folded into Human Body; new Science Practices + Lab Skills flashcards/strategies present.

---

### Known caveats
- Tip Jar / StoreKit: on a plain simulator, prices/purchase only work when **launched from Xcode** (the local `Products.storekit` config, not committed) or on a device with a **Sandbox Apple ID**.
- LE constructed-response pool is small (~5 written), so LE Written Practice is thin.
- Cell energy/biochem sub-units have no dedicated strategy guide (the cell strategy sits on Cell Structure) — graceful, not a bug.

---

# Curriculum revision — all 11 subjects (2026-06-17 session)

Items 12–13 above cover LS/LE. The rest of the curriculum was revised the next day.
Per subject: **switch to the subject in the top bar**, then confirm the unit list renders **in order**, **every unit's lessons populate without repeating**, the cross-cutting skill unit works, and flashcards/strategies show. All pushed.

## Sciences (science-practices treatment)
- [ ] **14. Earth Science** (`62457d9`) — 12 units: Rocks & the Rock Cycle → **Data, Maps & Reference Tables** → Weathering/Erosion/Deposition → Minerals → Plate Tectonics → Geologic Time → Meteorology → Climate → Water Cycle & Oceans → Solar System & Earth Motions → Moon, Stars & the Universe → Mixed Review. (Geology & Astronomy split; Maps merged.)
- [ ] **15. Chemistry** (`8a981d3`) — pool expanded 4→9 exams; 12 units incl. **Reference Tables & Data**, the Matter & Energy split (Classification / Energy & Phase Changes / Gas Laws), and a Mixed Review. No `context`/written → no stimulus/Worked-Examples for chem.
- [ ] **16. Physics** (`f5b7f11`) — pool expanded 3→8 exams; 10 units: all three mega-units split (Kinematics/Forces; Circuits/Electrostatics; Waves & Sound/Light & Optics) + **Formulas, Graphs & Diagrams** + Mixed Review.

## Math (Problem-Solving + Worked Examples)
- [ ] **17. Algebra 1** (`101a740`) — 10 units incl. Linear split (Solving Eq / Linear Functions) + **Problem-Solving & Modeling**. Exams tab shows a **🧠 Worked Examples** button → runs constructed-response items with step-by-step `modelAnswer` reveal.
- [ ] **18. Algebra 2** (`8d90bab`) — Polynomial Functions split + **Problem-Solving & Modeling** + Worked Examples.
- [ ] **19. Geometry** (`9228106`) — Congruence split (Lines/Angles/Transformations; Triangle Congruence) + **Proofs & Reasoning** unit + Worked Examples (100 written, mostly proofs).

## Humanities (skill-based, re-architected off the broken positional engine)
- [ ] **20. Global History** (`e2bbc93`) — 5 source-analysis units: Document & Source Analysis → Causation & Turning Points → Images & Political Cartoons → Maps & Geography → Themes & Review. New flashcards/strategies/achievements present. (Replaces fake era units.)
- [ ] **21. US History** (`f60ec96`) — same 5 skill units (Themes promoted), pool = all 9 exams, new local assets.
- [ ] **22. English** (`15c4a14`) — 6 reading-skill units: Close Reading → Author's Craft & Tone → Central Idea & Theme → Inference → Word Meaning in Context → Argument & Structure. **⚠️ Known: MC questions reference passages NOT in the data**, so they're hard to answer — verify the structure/units/flashcards, not answerability.

### Curriculum caveats
- **Heuristic tagging**: questions were tagged by keyword rules (reviewed at the distribution level, not per-question) — expect some mis-tags.
- **History era is a supplementary `subTopic` only** (~37% coverage); units are organized by analysis skill, which tags reliably (~77%).
- **English passages missing** (see #22) — needs a separate content-data pass to be fully answerable.
- **Per-subject achievements** arrays exist but the Progress/Achievements screen still computes from the LE+ES catalog — confirm whether each subject's achievements surface.
