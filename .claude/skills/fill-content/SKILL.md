---
name: fill-content
description: "Batch-fill or import Regents exam content (questions, explanations, enrichment) for Regentify. Use when the user asks to fill/complete/import exams or enrich content for a subject — replaces the manual 'continue / next 2 / keep going' pumping and ad-hoc handoff files."
---

# /fill-content [subject] [session e.g. june-2026]

Self-driving pipeline for exam content work. Work in batches until told to stop or the queue is empty; keep a running count so "how many left?" is always answerable. Do NOT wait for "continue" between items — report after each batch and proceed.

## 0. Locations (three copies exist — know which you're editing)

- `mobile/src/content/` — what the mobile app ships (primary target).
- `shared/content/` — source of truth for web; flows **master → chromebook** only.
- Root `src/data/` — undeployed root app (usually skip).
When parity matters, update mobile + shared in the same pass (separate commits per app rule does NOT apply here — content edits on master are one commit; carrying to chromebook is `git merge master` later).

## 1. Build the queue

- Enumerate exams: `mobile/src/content/regents-exams/<subject>/*.js` vs. the registered arrays in `index.js`.
- "Incomplete" = missing file for a real NYSED session, missing `explanation`/`diveDeep` fields, or missing `correct` answers.
- **Coverage greps must match BOTH key syntaxes**: `grep -E '"?explanation"?:'` — files mix bare and quoted keys. A 0% result means the check is broken, not the content.

## 2. Import from NYSED (real past exams)

- PDFs live at `https://www.nysedregents.org/<subjectdir>/<MYY>/...` — URL map + cache in `scripts/download_and_crop.py` (`scripts/pdf_cache/`). Download the **exam PDF and its scoring key** (`-sk.pdf`), convert with `pdftotext -layout`.
- Exam text is TWO-COLUMN — de-interleave before parsing. Extract MC questions only; match the sibling file's exact shape (`id/subject/year/session/totalMinutes/questions[]`).
- `correct` is ZERO-BASED; scoring key values are 1–4 → `correct = key − 1`.
- **Always cross-check every `correct` against the scoring key** with a script before finishing; fix mismatches in favor of the official key.
- Diagram-only-choice questions: include text + descriptive choices + key answer (don't skip them).
- Register new files in `index.js` (import + subject array), then babel-parse everything: `cd mobile && npm run check`.

## 3. Enrich (explanations / diveDeep / topics)

- Reuse the existing scripts in `scripts/` (`enrich-*.mjs`, `generate-humanities-exams.mjs`) rather than hand-writing where they fit.
- Topics/subTopics must come from the taxonomy already used in that subject's files — never invent new topic strings.

## 4. Batch rhythm

- Default batch: 2 exams (or 1 subject's enrichment pass). After each batch: report done/remaining, then continue automatically.
- Commit per logical unit (`feat(content): ...`) but **ask before any push** (Xcode Cloud).
- If the session is ending mid-queue, write the remaining queue into `handoff.md` — next session resumes from there.
