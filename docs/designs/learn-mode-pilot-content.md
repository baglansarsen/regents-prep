# Pilot Content: Congruence & Transformations — Pre-Answer "Why"

Companion content for `learn-mode-pilot-probe.md`. Scoped to this pilot only —
**not** added to `shared/content/`. Delete or promote after the pilot resolves.

## Topic
Congruence & Transformations (Unit 1, `shared/content/geometry/units.js:17`) —
existing question ids 3001-3006 in `shared/content/geometry/questions.js`.
Chosen because it's the first proof-heavy unit most Geometry students hit each
year, so a teacher-friend can validate/replace these against what their class
is actually stuck on right now.

## What's different from existing content
Every question below already has a post-answer `explanation` field in
`shared/content/geometry/questions.js` (shown in QuizScreen after the student
picks an answer, full version Premium-gated). The text below is new: a
**pre-answer** hint shown before the student attempts the question — the
untested variable from the pilot design. Don't confuse the two; the pilot
measures whether seeing the "why" before attempting changes 24h retention,
not whether an explanation exists at all.

## Variant Assignment
Deterministic split per the engineering review: hash each student's app user
ID (or, if the teacher is doing this by hand on paper, alphabetically split
the roster) into Variant A or B. Same 6 questions, same order, for both.

- **Variant A (control):** Question only. No pre-answer hint. (Existing
  post-answer explanation still shows after they answer, unchanged.)
- **Variant B (test):** One-sentence "why" hint shown before the question,
  then the same question. Post-answer explanation still shows after, unchanged.

## The Six Pre-Answer Hints (Variant B only)

**Status: v2, teacher-reviewed 2026-09-24.** Verified against `shared/content/geometry/questions.js`: Q3004's choices include SSA (as the replacement hint assumes), and Q3003's replacement hint does not leak the answer (confirmed against its coordinate-pair choices). v1 draft hints are superseded — Q3003 v1 leaked the answer, Q3004 v1 risked being factually wrong depending on choices.

**Q3001** — Which transformation preserves both shape and size (is an isometry)?
> Why: "Isometry" is just the textbook word for what the Regents calls a *rigid motion* — a move where the image is congruent to the original. The catch: "same shape" is not enough. Ask which option keeps the shape but changes the size.
>
> Teacher note: real stumbling block is vocabulary, not concept — Regents says "rigid motion," rarely "isometry." Top wrong answer is dilation ("same shape, so congruent").

**Q3002** — Two triangles are congruent by SAS if they have...
> Why: SAS only works when the angle is the *included* angle — the one between the two matching sides, like a hinge. If the angle sits at the end of the sides instead of between them, it's not SAS.
>
> Teacher note: included-angle confusion is the real error; SSA-mislabeled-as-SAS is the #1 distractor.

**Q3003** — A point P(3, −2) is reflected across the x-axis. What are the coordinates of its image?
> Why: Points sitting *on* the mirror line don't move when you reflect. So before you answer, ask: for a point on the x-axis, which coordinate is already fixed? That's the coordinate that stays the same for every point.
>
> Teacher note: real error is flipping the coordinate that matches the axis name, not "x stays, y flips" as a bare rule. Coordinate-rule items risk leaking the answer — hints must stay reasoning strategies, never the mapping.

**Q3004** — Which congruence shortcut does NOT exist for triangles?
> Why: A shortcut is only valid if the given pieces lock in exactly one triangle. Two combos fail that test: one lets you build a bigger or smaller copy of the same shape, the other can swing to two different triangles. Look for the combo that doesn't pin the triangle down.
>
> Teacher note: real confusions are doubting AAS exists (drilled on ASA) and thinking HL is made up, not just SSA. Confirmed SSA is among this question's choices before shipping this hint.

**Q3005** — A rotation of 180° about the origin maps (x, y) to...
> Why: A 180° spin is a half-turn — the point lands on the exact opposite side of the origin, same distance away. If you started in Quadrant I, where do you have to end up?
>
> Teacher note: half-turn answer was already right in v1; real error is mixing up the 90° rules and guessing 180° by analogy — made visual instead.

**Q3006** — In a proof, the reason "Reflexive Property" means...
> Why: Reflexive is the reason you cite when something equals *itself* — the go-to case is a side or angle shared by two triangles. If two *different* things are being set equal, it's a different property.
>
> Teacher note: shared-side anchor was already right in v1; dropped the etymology (inaccurate). Real confusion is Reflexive vs. Substitution vs. Transitive — reframed as a decision rule.

### Pilot-design notes from teacher review
- Q3003 and Q3005 are coordinate-rule items — hints must stay reasoning strategies, never the coordinate mapping itself.
- The 24h follow-up should be a proof-reason item (like Q3006), not another coordinate item — coordinate rules get memorized overnight regardless of hint, which would wash out any real effect.

## Data to Collect (per the engineering review — no formal test suite, just this)
For each student: variant (A/B), per-question correct/incorrect, timestamp.
24h later: one follow-up question on the same concept (e.g., a 7th
Congruence question not in the original 6), correct/incorrect only.

## Handoff to Teacher-Friend
These hints are a draft, not validated against what their students actually
struggle with. Before running the pilot, have the teacher-friend review and
replace any hint that doesn't match a real stumbling block they've observed —
that judgment call is the one part of this pilot that has to come from a
real teacher, not from this draft.
