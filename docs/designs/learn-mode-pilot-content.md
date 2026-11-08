# Learn Mode Pilot — Classroom Protocol (v3)

**Status: DRAFT for founder review, 2026-11-07.** It replaces v2 (in-app A/B with a user-id split, the same 6 questions for everyone, and one follow-up item). The design comes from the CEO and eng reviews in `learn-mode-pilot-probe.md` (decisions D1–D5, D2R, D3R). Nothing goes to the teacher until the steps in "Before anything else" are done.

**What the pilot answers:** does a short "why" explanation help students remember more the next day when they see it **before** answering a question rather than **after**? Every student gets the same explanations; only the timing changes.

---

## Before anything else (founder)

- [ ] **T5:** the teacher has said yes and has a day-1 date and a day-2 date (consecutive school days).
- [ ] **T5:** the teacher has cleared the run with their school, and has notified parents if the district requires it.
- [ ] **T4:** the teacher has rewritten all 6 hints (see "The six questions"), and the founder has checked each rewrite against its four answer choices: no hint may name a choice, rule one out, or narrow them down.
- [ ] **T4:** the teacher has written the 8 next-day questions (see "Day 2").
- [ ] The decision rule below is unchanged since before the run.

---

## For the teacher

### What you'll do

Two class periods on two consecutive days: about 15 minutes on day 1 and 10 minutes on day 2. Your class does six Congruence & Transformations questions on paper. Each student gets a short "why" explanation for every question. For half of the questions it comes **before** they answer; for the other half it comes **after**. The next day they answer 8 new questions on the same ideas.

### The two halves

| Half | Questions | Topic |
|---|---|---|
| **T** (transformations) | Q1 (3001), Q3 (3003), Q5 (3005) | rigid motions, reflection, rotation |
| **C** (congruence & proof) | Q2 (3002), Q4 (3004), Q6 (3006) | SAS, congruence shortcuts, Reflexive Property |

The halves are split by topic on purpose. Q2 and Q4 are both about the included angle, so they stay together; that way a hint in one half can't help the other half's questions.

### The two forms

| | Half T (Q1, Q3, Q5) | Half C (Q2, Q4, Q6) |
|---|---|---|
| **Form 1** | "why" printed **above** each question | "why" printed **below** the answer line, under a fold or on the back: "Read this after you answer" |
| **Form 2** | "why" printed **below** the answer line, as above | "why" printed **above** each question |

Questions appear in the same order (Q1–Q6) on both forms. Each question's official explanation is printed on the **back** of the form, for students to read after finishing.

### Day 1 (about 15 minutes)

1. Give each student a code (see "Codes and privacy"). Write the code on the form, not the name.
2. Hand out Form 1 and Form 2 alternately by seat, so neighbors have different forms. Students who sit together should not compare.
3. Students answer Q1–Q6 in order. Where the "why" comes after, they read it only once they've answered.
4. Students then read the explanations on the back. **Do not go over the answers aloud** until day 2 is done; hearing the reasoning for all six would erase the difference between the halves.
5. Collect the forms.

### Day 2 (about 10 minutes)

Students answer **8 new questions**, 4 per half, without hints or explanations. Write them yourself from your unit, following these rules:

- **Half T (4 questions):** rigid motions vs. non-rigid ones (dilation, stretch), what a reflection keeps fixed, what a half-turn does. **Conceptual, not coordinate rules:** no "(x, y) → ?" mapping questions, since students memorize those overnight whatever the hint.
- **Half C (4 questions):** which given parts prove congruence (SAS vs. SSA, ASA vs. AAS), why SSA fails, and choosing the reason in a proof step (Reflexive vs. Transitive vs. Substitution).
- None of the 8 may repeat one of the six day-1 questions.
- Same difficulty as your usual quiz items. If almost everyone gets them right, we learn nothing.

Mix the 8 questions in any order, but keep a key showing which half each belongs to.

After day 2 you can go over everything with the class.

### Codes and privacy

- Make a code list (e.g. G01, G02, …) that maps codes to names. **It stays with you and never leaves the school.**
- What you send the founder is one row per code. **No names, no app user IDs, nothing else that identifies a student.**
- Students absent on either day: keep their row and mark them absent; they're left out of the comparison.

### Record sheet (what you send back)

One row per code:

| Code | Form (1/2) | Day-1 Q1–Q6 (✓/✗ each) | Day-2 half-T items (✓/✗ ×4) | Day-2 half-C items (✓/✗ ×4) | Absent day 1? | Absent day 2? | Has used Regentify Geometry before? (y/n/unsure) | Notes (wrong form, saw a neighbor's form, …) |
|---|---|---|---|---|---|---|---|---|

The last question matters because Q1–Q6 come from Regentify's question bank; students who've used the app may have seen them.

---

## The six questions

Question text, choices and explanations come from `shared/content/geometry/questions.js:20-78`. The correct answer is marked ✔. **Every hint below must be rewritten by the teacher (T4)**; each one notes the problem the reviews found.

**Q1 (3001), half T.** Which transformation preserves both shape and size (is an isometry)?
A) Dilation · B) Translation ✔ · C) Horizontal stretch · D) None of the above
- Explanation (back of form): Translation (slide) is an isometry: it moves every point the same distance and direction without changing shape or size. Dilations change size.
- v2 hint (do not use): "…Ask which option keeps the shape but changes the size."
- Problem: it points at Dilation, the top wrong answer, without saying to rule it out.

**Q2 (3002), half C.** Two triangles are congruent by SAS if they have…
A) two pairs of congruent angles and one pair of congruent sides · B) two pairs of congruent sides and the included angle congruent ✔ · C) all three pairs of sides congruent · D) two pairs of congruent sides and a non-included angle congruent
- Explanation: SAS requires two pairs of congruent sides with the angle between them (the included angle) also congruent.
- v2 hint (do not use): "…the angle is the included angle — the one between the two matching sides…"
- Problem: almost the exact wording of choice B.

**Q3 (3003), half T.** A point P(3, −2) is reflected across the x-axis. What are the coordinates of its image?
A) (−3, −2) · B) (3, 2) ✔ · C) (−3, 2) · D) (2, −3)
- Explanation: Reflection across the x-axis maps (x, y) → (x, −y). So P(3, −2) → (3, 2).
- v2 hint (do not use): "…for a point on the x-axis, which coordinate is already fixed? That's the coordinate that stays the same…"
- Problem: the coordinate that's "fixed" on the x-axis is y (y = 0). Read literally, the hint points to (−3, −2), the most common wrong answer.

**Q4 (3004), half C.** Which congruence shortcut does NOT exist for triangles?
A) SSS · B) ASA · C) SSA ✔ · D) AAS
- Explanation: SSA does not guarantee congruence. It is the "ambiguous case" that can produce 0, 1, or 2 triangles. SSS, ASA, and AAS are all valid.
- v2 hint (do not use): "…one lets you build a bigger or smaller copy… the other can swing to two different triangles…"
- Problem: AAA isn't among the choices, so only SSA fits; the hint gives the answer away.

**Q5 (3005), half T.** A rotation of 180° about the origin maps (x, y) to…
A) (y, x) · B) (−x, y) · C) (x, −y) · D) (−x, −y) ✔
- Explanation: A 180° rotation about the origin maps every point (x, y) to (−x, −y).
- v2 hint (do not use): "…If you started in Quadrant I, where do you have to end up?"
- Problem: leads straight to (−x, −y).

**Q6 (3006), half C.** In a proof, the reason "Reflexive Property" means…
A) Two angles that form a linear pair are supplementary · B) A segment or angle is congruent to itself ✔ · C) Angles in a triangle sum to 180° · D) Corresponding parts of congruent triangles are congruent
- Explanation: The Reflexive Property states that any geometric figure is congruent to itself (AB ≅ AB, ∠A ≅ ∠A).
- v2 hint: "Reflexive is the reason you cite when something equals itself — the go-to case is a side or angle shared by two triangles…"
- Problem: closest to acceptable, but "equals itself" is nearly the text of choice B. Rewrite it to teach when you'd use the reason, not what it says.

**What a good rewrite looks like:** it teaches the idea behind the question (why a rigid motion keeps size, what makes an angle "included", why some side/angle combinations don't lock a triangle in place), and a student could read it and still have to think about all four choices. It is one or two sentences, and the same text is used whether it's printed before or after.

---

## Analysis and decision rule (founder only, fixed before the run)

For each student with both days present:
- **Before score:** % correct on the 4 day-2 questions from the half where they saw the "why" **before** answering (half T on Form 1, half C on Form 2).
- **After score:** % correct on the 4 day-2 questions from the other half.
- **Difference:** before score minus after score, in points, so −100 to +100.

Per class, report: the number of complete students, the mean difference, and a 90% interval (mean ± 1.645 × SD / √n). Also report per-question day-2 % correct, so a broken or too-easy question shows up.

| Result | Decision |
|---|---|
| Fewer than 20 complete students in a class | Report counts only; no conclusion from that class |
| Both halves ≥ 90% correct on day 2 | Questions too easy: rerun with harder day-2 questions |
| One class only | "Promising" (mean > 0) or "not promising"; this only decides whether to recruit a second class |
| ≥ 2 classes pooled: mean ≥ 15 and interval entirely above 0 | Build the in-app test (re-target the pilot to questions the app actually serves, with the reachability test) |
| ≥ 2 classes pooled: interval entirely below 10 | Drop the "why before" idea |
| Anything else | Inconclusive: at most one rerun, then decide with what you have |

Do not change these thresholds after seeing results.

---

## History

- v1 (2026-09-23): draft hints, superseded.
- v2 (2026-09-24): teacher-reviewed hints for the in-app A/B. They were never shown to students: the in-app pilot could not run because mobile no longer serves ids 3001–3006 (`0082fbb`). The 2026-11-07 reviews also found that the hints point at answers.
- v3 (2026-11-07): this protocol.
