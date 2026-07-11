# Claude Code Session Audit — Improvement Options

Analyzed: 17 transcripts in `~/.claude/projects/-Users-baglansarsen-regents-prep/` (Jun 6 – Jul 5, 2026),
mined by 5 sub-agents + a self-review of the current session.

## ✅ Status: ALL 10 IMPLEMENTED (2026-07-05)

| # | Where it landed |
|---|-----------------|
| 1 | `.claude/skills/ship/SKILL.md` — `/ship` (TestFlight) + `/ship release` modes, EAS gotchas, export compliance |
| 2 | CLAUDE.md → "Debugging Rules": delivery-path-first rule |
| 3 | CLAUDE.md tests line fixed; `mobile/scripts/parse-check.mjs` + `npm run check` (jest + parse-check; verified it catches broken files) |
| 4 | CLAUDE.md → "Debugging Rules": RevenueCat store-side-state rule |
| 5 | `scripts/deploy-chromebook.sh` — persistent worktree of `feat/chromebook`; `.worktrees/` gitignored |
| 6 | `.claude/skills/fill-content/SKILL.md` — batched content pipeline w/ scoring-key cross-check |
| 7 | CLAUDE.md → "Debugging Rules": no `sed -i` bulk renames |
| 8 | CLAUDE.md → "Debugging Rules": both-key-syntax grep rule |
| 9 | Memory `feedback_sany_wrong_dir.md` (SANY repo already had its own CLAUDE.md) |
| 10 | Baked into the `/ship` skill (ITSAppUsesNonExemptEncryption=false) |

Verdict key: **SKILL** = reusable /command · **AUTOMATION** = script/hook · **CORRECTION** = CLAUDE.md/memory rule · **NOTHING** = session was fine.

---

## Per-session verdicts

### Jun 6 — release day (5 sessions: 287740ca, 84434ed1, d24dae96, 46e22ad0, 63811024)
Haptics/sounds, subject-content displacement fixes, first EAS production build. The chain
"commit → push → deploy → EAS build --auto-submit" was typed verbatim twice in one day; the first
EAS build hit 4 sequential config errors (eas init, project missing, bundleIdentifier, encryption flag).
Two tiny sessions were aborted starts (nothing).
**Verdict: SKILL — `/ship` (or `/testflight`)** — one command for the commit→push→deploy→EAS chain with the
EAS gotchas baked in. Bonus memory line: *export compliance = standard OS encryption only →
`ITSAppUsesNonExemptEncryption=false`, answer "None of the algorithms mentioned above."*

### Jun 7 — gamification bug batch + XP→RP mass rename (022881d9)
Bulk `sed -i` renames across 24+ files introduced syntax errors in Firestore writes → shipped a
**crashing TestFlight build** ("crash cause unknown" at session end).
**Verdict: CORRECTION** — rule: *never bulk-rename with `sed -i` in `mobile/src`; use per-file edits and
babel-parse every changed .js/.jsx before committing a many-file change. Firestore field names and
AsyncStorage keys keep old names in renames; only UI strings/identifiers change.*

### Jun 7–10 — pet/social features (fd2528e2)
Days of "still old version in TestFlight/simulator" reports (~5×) — Claude re-debugged working code when
the real cause was commits on `feat/web-app-vite` while Xcode Cloud builds only `master`, plus a stale
simulator bundle. (The ask-before-commit rule from this session is already in memory.)
**Verdict: CORRECTION** — rule: *when the user reports a mobile change "isn't showing", check the delivery
path FIRST (which branch has the commits vs. what Xcode Cloud builds; is the simulator running a fresh
bundle) before re-debugging code.*

### Jun 8 — enrichment audit false alarm + pet quiz (7cb2b259)
Coverage audit grepped only `"explanation":` (quoted keys); STEM files use bare `explanation:` → reported
0% for fully-enriched subjects. User escalated 3× ("bro check deeper").
**Verdict: CORRECTION** — rule: *content files mix bare and quoted keys — coverage audits must grep both
forms (`grep -E '\"?explanation\"?:'`); a 0% result means the check is wrong, not the content.*

### Jun 15 — App Store release mechanics + RevenueCat wiring (2b10a5d3)
Version-train/TestFlight-vs-App-Store mechanics re-derived interactively; CocoaPods conflicts;
`mobile/ios` gitignore trip-up. Facts are in memory but nothing executes the sequence.
**Verdict: SKILL — `/release-ios`** — bump `CFBundleShortVersionString`/build in `mobile/ios/Info.plist`
(app.json is ignored — ios/ is committed), verify version train, confirm ASC version record, syntax/pod
sanity check, one batched commit + single push (ask first). Overlaps with `/ship` — could be one skill
with a `release` mode.

### Jun 15 — graphify run (7ce49e32)
One pipeline hiccup, self-recovered on "try again".
**Verdict: NOTHING.**

### Jun 15–21 — polish sprint: tour, tip jar, repeat-mistakes, Rive, Android (f17d7aed)
Clean cadence overall (~35 quick commit/push messages, per-app discipline held). One real recurrence: the
tip-jar IAP error ("store didn't return 'tip_5'") was re-diagnosed **from code on 3 separate days**; root
cause was App Store Connect product state, not code.
**Verdict: CORRECTION** — rule: *RevenueCat "product not found / store didn't return X" ⇒ check store-side
state first (ASC consumable approval, RC offering attachment, StoreKit config in simulator scheme) —
don't re-audit usePurchases.js.*

### Jun 18 — chromebook deploy + Reggie rebrand spec (041c19ba)
Deploy required stash → switch to `feat/chromebook-b2b` → build → deploy → switch back → pop; the
`.firebase/` cache file blocked the branch switch and the stash half-applied onto the wrong branch.
**Verdict: AUTOMATION — `deploy-chromebook` script/skill** that builds+deploys from a **git worktree** of
the chromebook branch (no stash gymnastics, no cache-file collisions); also gitignore `.firebase/` cache.

### Jun 22–28 — mega-session: rate-app, AI-grader cost cuts, content grind, releases (9ebd6cf7)
Humanities exam gap-fill was hand-pumped with ~12 "continue/next" messages across days, plus an ad-hoc
`handsoff.md` to survive session boundaries. One push-without-permission violation (rule already exists).
Release ritual repeated ("1.0.4 approved → bump to 1.0.5 → push").
**Verdict: SKILL — `/fill-content [subject]`** — encode the pipeline (pick next incomplete exam in
`shared/content/regents-exams/`, fill/enrich, verify, commit, report remaining count); pairs naturally
with `/loop` for "keep going until you hit limit". The version-bump ritual folds into `/release-ios`.

### Jul 2 — SANY Agent Manager work from the wrong directory (0211404b, ae1c8e51, 2c566256)
Two sessions did work on `/Users/baglansarsen/SANY Agent Manager` while launched from regents-prep —
inheriting Regentify's CLAUDE.md rules and polluting this project's history/memory; the SANY agent
pattern + FERPA constraints get re-pasted each time.
**Verdict: CORRECTION** — start `claude` inside the SANY repo for SANY work, and give that repo its own
CLAUDE.md (agent pattern: Trigger → fetch → Claude JSON step → write → human review; FERPA constraints).

### Jun 28 – Jul 5 — current session: Today's Mission, review, energy UX, school leaderboard, share cards (4dbe18dc)
Clean multi-feature run (plan → implement → multi-agent review → fix → test → commit). Two small findings:
(1) project CLAUDE.md still says *"There are no tests anywhere in the repo"* — now false (133 Jest tests,
`npm test` configured in mobile/); future agents will skip running them. (2) A babel-parse check over
edited files was hand-rolled repeatedly with `node -e`.
**Verdict: CORRECTION** — update CLAUDE.md: replace the no-tests line with *"mobile/ has a Jest suite —
run `npx jest` after changing mobile/src; parse-check edited JSX with babel before committing."*
Optionally an **automation**: add a `mobile/package.json` script (e.g. `npm run check`) that runs jest +
babel-parse over changed files.

---

## Rollup — recommended order (by expected time saved)

| # | Option | Type | Why |
|---|--------|------|-----|
| 1 | `/ship` + `/release-ios` (one skill, two modes) | Skill | Release mechanics re-derived in 3+ sessions; every mistake burns Xcode Cloud minutes or an App Store round-trip |
| 2 | "Change isn't showing → check delivery path first" | Correction | Cost days of phantom debugging in fd2528e2 |
| 3 | CLAUDE.md test-suite update + `npm run check` | Correction (+small automation) | Stale doc actively misleads future sessions; would also have caught the Jun 7 sed crash |
| 4 | RevenueCat product-state memory rule | Correction | Same error re-diagnosed from code on 3 days |
| 5 | `deploy-chromebook` worktree script | Automation | Eliminates the stash/branch failure mode memory already warns about |
| 6 | `/fill-content` pipeline skill | Skill | Replaces manual "continue" pumping + handoff files — only if more content grinding is planned |
| 7 | No-`sed -i` bulk-rename rule | Correction | One shipped crash; cheap insurance |
| 8 | Both-key-syntax audit rule | Correction | One bad afternoon; cheap one-liner |
| 9 | SANY repo separation + its own CLAUDE.md | Correction | Stops cross-project pollution |
| 10 | Export-compliance memory one-liner | Correction | Answers a recurring App Store prompt forever |

Nothing has been implemented. Tell me which numbers to act on (e.g. "do 1–4") and I'll make the changes.
