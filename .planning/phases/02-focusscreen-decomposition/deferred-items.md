# Phase 2 — Deferred Items

Out-of-scope discoveries logged during execution per the executor's Scope Boundary rule
(not fixed, only recorded).

## From Plan 02-03

- **File:** `mobile/src/utils/question.js` / `mobile/src/utils/__tests__/question.test.js`
- **Test:** `buildUnitSampledSet > guarantees at least 1 question per unit when target allows`
- **Issue:** Flaky — `buildUnitSampledSet` shuffles via `Math.random()` (Fisher-Yates,
  `shuffle()` in the same file) with no seeded RNG, so `topicsCovered.size` occasionally lands
  below the expected `6` across runs. Reproduced once during `npm run check` for plan 02-03, then
  passed on immediate re-run (23/23) with no code changes.
- **Scope:** Neither file is in 02-03's `files_modified`; unrelated to the FocusScreen
  decomposition. Not fixed per the Scope Boundary rule — pre-existing flakiness in placement-test
  sampling logic, out of this refactor's blast radius.
- **Recommendation:** A future test-infrastructure or placement-test phase should either seed the
  shuffle for deterministic test runs or loosen the assertion to a tolerance, rather than asserting
  an exact `Set` size against unseeded randomness.

## Reconfirmed during Plan 02-04

- Same test failed once more during `npm --prefix mobile run check` (`Expected: 6, Received: 5`),
  passed on immediate re-run (23/23) with zero code changes and zero files touched in this plan's
  `files_modified`. No new information beyond 02-03's entry above — recorded here only to confirm
  the flake is still present and still out of this refactor's scope.
