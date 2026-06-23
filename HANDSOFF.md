# Handoff — AI grading for written/constructed-response answers (humanities content)

_Supersedes the prior 2026-06-07 handoff. Current active effort._

## Goal
Premium users can submit a written answer and have it AI-graded against an
authoritative `modelAnswer`. The code feature already ships (STEM-only at first);
this effort **fills the humanities content gap** so the grader covers Global
History, US History, and English too.

The "fill" = for each `type: "written"` constructed-response question (CRQ), populate:
- `text` — the real prompt (the crawled data is often corrupted; see below)
- `modelAnswer` — a concise exemplary full-credit response
- `explanation` — official acceptance criteria ("Full credit (1 pt) for… Acceptable responses (NYSED rating guide) include: …; Not acceptable: …")
- `maxPoints: 1` (CRQs are 1 point)

Source of truth = **official NYSED rating guides** (public PDFs), not invented answers (confirmed with user).

## The repeatable per-exam loop (proven, mechanical)
1. **List written Qs** in `shared/content/regents-exams/<subject>/<exam>.js` — note each Q's `number`, `image` basename, current `text`.
2. **Fetch the rating-guide PDF** with `WebFetch`. It can't parse the PDF, but it **saves the binary to disk** at `…/tool-results/webfetch-*.pdf` and prints the path.
3. **`Read` the saved PDF** pages ~4–12 (Part II "Question-Specific Rubric"). Each CRQ has a **"Score of 1: Correct response — Examples:"** list (acceptable answers) + **"Score of 0:"** list (not acceptable). That's the ground truth.
4. **Match CRQs by number + verified prompt text** (NOT by position). Edit the file **by `image`-path anchor** with a small Python script (template below).
5. **Verify**: `npx --no-install esbuild <file>.js --bundle=false --outfile=/dev/null --log-level=warning` prints nothing if it parses; re-grep `modelAnswer` set/null counts.
6. **Commit one exam per commit**: `content(<subject>): AI-grading model answers for <Mon Year> CRQs`, cite the source PDF URL, Co-author footer.

### NYSED rating-guide URL patterns
- **Global History II** (Framework, Grade 10): `https://www.nysedregents.org/ghg2/{Myy}/glhg2-{Myyyy}-rg.pdf` — month code `1`=Jan, `6`=June, `8`=Aug. E.g. Jun 2025 = `ghg2/625/glhg2-62025-rg.pdf`. **All 15 Global exams DONE.**
- **US History** (Framework): base dir `https://www.nysedregents.org/us-history-govt/{Myy}/`. ⚠️ **Two different guides per exam — use the right one:**
  - `ushg-{Myyyy}-rga.pdf` = **Part II Short-Essay Questions (Q29/Q30)** — full essays scored 0–5 by anchor papers. **NOT in our content data, and NOT Score-of-1 — skip.**
  - **Part III "Volume 2" guide** = **Part IIIA scaffold (document short-answer) questions** — these ARE our gradeable written Qs (#31–36 etc.), scored **0–1 with "Score of 1: Examples" lists** just like Global CRQs. ⚠️ **Filename is inconsistent across exams**: e.g. `ushg62023-rg2.pdf` (no hyphen), `ushg-82024-rg2.pdf` (hyphen). June 2024's `ushg-62024-rg2.pdf` returned 404 — try `-rgb.pdf` or WebSearch `nysedregents.org "ushg <Month Year> Part III rating guide"` to get the exact URL per exam. The `ushg-framework/` path (vs `us-history-govt/`) also hosts copies.
  - In our data, US written Qs are numbered ~#31–36 (the Civic Literacy document scaffold) plus image-only stimulus items (#7, #22 — leave null). No #29/#30 SEQ essays in the data.
- **English (ELA)**: path not confirmed; ELA is anchor-paper essays, not Score-of-1 lists — see Caveats.

### Image-anchor edit script (used every exam)
`#30` and `#33` often share truncated text like `"Based on this excerpt,"`, so anchor on the unique `image` path and replace the whole `text` value + insert fields:
```python
pat = re.compile(r'"text":\s*"(?:[^"\\]|\\.)*",\s*\n\s*"modelAnswer":\s*null,\s*\n\s*"image":\s*"'+re.escape(img)+r'"', re.S)
repl = ('"text": '+json.dumps(text,ensure_ascii=False)+',\n'
        '      "maxPoints": 1,\n'
        '      "modelAnswer": '+json.dumps(model,ensure_ascii=False)+',\n'
        '      "explanation": '+json.dumps(expl,ensure_ascii=False)+',\n'
        '      "image": '+json.dumps(img,ensure_ascii=False))
# write only if count of replacements == expected N
```
Run with the project Python: `$(cat graphify-out/.graphify_python)`.

## ⚠️ Data-quality reality
Crawled content is **corrupted**, not just missing answers:
- `text` is sometimes just the question number (`"29"`/`"30"`) — the real prompt is only in the scanned `image` and the rating guide.
- `text` sometimes has **bled-in garbage** (an entire Part III essay + all 5 documents appended). Replace the whole value with the clean prompt from the guide.
- The rating guide therefore both **repairs the prompt** and **supplies the answer**.

## Caveats / out of scope (don't guess)
- **Image-only questions** (`text: ""`, no rating-guide CRQ match): leave `modelAnswer: null`. These are the expected "pending" nulls in otherwise-complete files.
- **Big essays** — Global "Enduring Issues Essay" (Q35), US "Civic Literacy Essay", ELA Part 2/3: scored by **anchor papers** (scanned handwriting per score level), not Score-of-1 lists. Need a **separate pass** with a different rubric shape. Flag, don't fabricate.
- **English (ELA)**: only ~11 of 31 exams have essays as `type:"written"`; the rest are prose Parts. Decide structuring when you reach it.

## Progress (as of this handoff)
**Global History: 15 / 15 DONE ✅** — all CRQs filled from official NYSED guides, committed on `master` (commits `3ff7b5b` → `89edb53`).

**US History: 9 / 9 DONE ✅** — all Part IIIA Civic Literacy scaffold Qs (#31–36, 1 pt each) filled with modelAnswer + official Score-of-1/Score-of-0 acceptance criteria, committed on `master`. Per-exam rating-guide files used: june-2023 `ushg62023-rg2.pdf`, june-2024/25 + august-2023/24 (`-rg2.pdf` variants), january-2025/24 `ushg-1202{5,4}-rg2.pdf` (Vol. 2), january-2026 + august-2025 `ushg-{1,8}202{6,5}-rg.pdf` (combined guide; scaffold scoring on pp. 31–40). Remaining nulls in these files (#7/#11/#14/#18/#22/#23) are image-only multiple-choice/stimulus items — out of scope, leave null.

**English (ELA): OUT OF SCOPE ✅ (decided)** — not fillable by this loop, for two independent reasons: (1) the data is corrupted — the 11 items tagged `type:"written"` are mislabeled reading-passage fragments, not real prompts (e.g. jan-2026 #35 is a chunk of the Part 2 argument-essay source texts), and the actual MC items + essay prompts aren't captured; (2) real ELA writing (Part 2 argument essay, Part 3 text-analysis) is scored 0–6 holistically by anchor papers, which doesn't map to the single-`modelAnswer` shape `gradeWriting` needs. The grader already hard-rejects questions without a `modelAnswer`, so these items simply won't offer AI grading — no fabrication. If ELA is ever wanted, it needs a separate effort: repair the crawled data first, then add a band-rubric grading path (not this loop).

**The humanities content effort is COMPLETE** for all cleanly-structured, single-answer CRQs (Global 15/15 + US History 9/9). No remaining work in this loop.

## Repo state
- All work = **local commits on `master`**, currently **ahead of `origin/master` by 10**, **NOT pushed**. ⚠️ Pushing `master` triggers an Xcode Cloud iOS build — push intentionally.
- Content lives in `shared/content/` (single source of truth; `@content` alias). Per workflow, shared-content edits go on `master`, then `git merge master` into the chromebook branch to carry forward.

## Related: the code feature (already shipped, deployed live)
- `functions/index.js` → `gradeWriting` callable: Haiku 4.5, no thinking, 10/day per-user cap, structured-output schema. **Deployed & live.** Required a manual invoker grant after first deploy (`gcloud run services add-iam-policy-binding gradewriting --region=us-central1 --project=regents-prep --member=allUsers --role=roles/run.invoker`) — gen-2 callable gotcha (see memory `project_callable_invoker_gotcha`).
- Mobile: `hooks/useEssayGrader.js`, `components/AiGradeButton.jsx`; wired into `QuizScreen` (premium replaces self-assessment) and `ExamScreen`. Shipped via PR #2 (merged to master).
- The grader reads `question.text` + `modelAnswer` + `explanation` — exactly the fields this content effort fills, so completing the humanities content is what extends grading to those subjects.

## Next action
Continue the loop on the 5 remaining Global exams; then confirm the US History rating-guide URL and do those 9; then decide ELA structuring. ~2 exams/turn is the sustainable quality pace. The grading model is Haiku — spot-check that humanities answers read sensibly on a device build before relying on it.
