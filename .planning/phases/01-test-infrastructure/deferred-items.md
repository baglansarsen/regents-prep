# Deferred Items — Phase 01 Test Infrastructure

Out-of-scope discoveries logged during execution, per SCOPE BOUNDARY rule (only auto-fix
issues directly caused by the current task's changes).

## Pre-existing flaky test: `mobile/src/utils/__tests__/question.test.js`

- **Discovered during:** Plan 01-01, Task 1 fail-first baseline run (`npm --prefix mobile run check`)
- **Test:** `buildUnitSampledSet › guarantees at least 1 question per unit when target allows`
- **Symptom:** Fails intermittently with `Expected: 6, Received: 5` — `buildUnitSampledSet` samples
  10 questions across 6 units of 5 questions each using unseeded `shuffle()`; roughly 1 in 5 runs
  misses covering all 6 topics.
- **Confirmed flaky, not caused by this plan:** ran the file 5x against the pre-swap manifest
  (before any package.json/package-lock.json change) — 4 passes, 1 failure, same assertion each
  time. This predates and is unrelated to the RNTL package swap; `question.js`'s sampling logic
  is untouched by this plan.
- **Action taken:** none — out of scope for Phase 1 (Test Infrastructure devDependency swap).
  Not fixed, not silenced, not skipped.
- **Recommendation:** a future task should either seed the shuffle in tests or make
  `buildUnitSampledSet`'s unit-coverage guarantee deterministic (e.g. round-robin first, then
  fill remaining slots randomly).
