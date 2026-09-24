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

**Q3001** — Which transformation preserves both shape and size (is an isometry)?
> Why: An isometry is any move that doesn't stretch or shrink the shape — think of sliding a puzzle piece across a table without resizing it.

**Q3002** — Two triangles are congruent by SAS if they have...
> Why: SAS only works when the angle is *between* the two matching sides — like a hinge. If the angle isn't sandwiched between the two sides, SAS doesn't apply.

**Q3003** — A point P(3, −2) is reflected across the x-axis. What are the coordinates of its image?
> Why: Reflecting across the x-axis flips a point vertically — the x stays put, the y flips sign. Picture folding the graph paper along the x-axis.

**Q3004** — Which congruence shortcut does NOT exist for triangles?
> Why: Of all the side/angle combos, only one lets you build two different triangles from the same three pieces — that's why it's excluded as a valid shortcut. Think about which combo leaves the triangle's shape ambiguous.

**Q3005** — A rotation of 180° about the origin maps (x, y) to...
> Why: A 180° spin is a half-turn — every point ends up diagonally opposite where it started, on the other side of the origin.

**Q3006** — In a proof, the reason "Reflexive Property" means...
> Why: "Reflexive" comes from "reflect back on itself" — this reason is used whenever a proof needs to say something is equal to itself, like a shared side in two triangles.

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
