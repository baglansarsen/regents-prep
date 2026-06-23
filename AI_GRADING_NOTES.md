# AI Grading — cost notes & parked ideas

Context: `gradeWriting` (Cloud Function, `functions/index.js`) grades written/CRQ
answers against the stored `modelAnswer` + `explanation`. Currently **Haiku 4.5,
no thinking, 10/day per-user cap, structured output, NO cache**. ~$0.01/grade.
Goal: cheaper **without losing grading quality**.

## Cost levers (quality-preserving), ranked by impact

1. **Firestore answer-cache (biggest win).** Add a cache like `explainMistake`
   already has, keyed by `(questionKey, normalizedAnswer)` where normalize =
   lowercase + trim + collapse whitespace + strip punctuation. 1-point CRQ answers
   converge hard across students, so hit rate should be high → free repeats.
   100% quality-safe (identical input → identical grade by construction).
   *No answer-cache exists today — this is the main gap.*

2. **Trim output.** Output is the Haiku cost driver ($5/1M out vs $1/1M in).
   Drop `maxPoints` from the returned schema (client already knows it), instruct
   concise feedback, lower `max_tokens` 700 → ~400. ~30–40% output savings, no
   grade-accuracy loss.

3. **Deterministic pre-gate.** Before calling the model: empty/too-short answer →
   return "write more", no API call. Optionally exact/keyword-match against the
   official acceptable-responses list (now stored in each question's `explanation`)
   to auto-resolve only the *unambiguous* extremes (clearly correct / clearly
   blank); route everything uncertain to Haiku. Quality preserved because the LLM
   still handles every non-obvious case.

4. **Prompt caching — measure first.** The stable prefix (system + question +
   modelAnswer + acceptance) is identical across students for a given question and
   could cache at ~0.1×. **Caveat:** Haiku's min cacheable prefix is ~2048 tokens;
   ours is likely smaller, so it may not trigger. Verify `cache_read_input_tokens`
   before relying on it.

5. **Batch API (50% off) — non-interactive only.** Doesn't fit real-time grading
   (student wants feedback now), but a future "grade my whole practice exam" mode
   could batch at half price.

Stack #1 + #2 + #3 (all quality-safe) for a multiple-x reduction on top of the
Haiku switch. Model tier is already at the Anthropic floor (Haiku); the way to go
lower is fewer/cheaper calls, not a weaker model.

## PARKED: Apple on-device LLM (Foundation Models) — test later

Idea: on iPhone **15 Pro and newer** (the Apple Intelligence tier), use Apple's
**on-device Foundation Models** (~3B, ships free with iOS 26, offline, private) as
a **free first-pass** grader / tutor nudge, falling back to Claude `gradeWriting`
for the authoritative score. Handles the cheap volume at zero marginal cost.

Status / requirements before this is buildable:
- Device: iPhone 15 Pro/Pro Max + all 16/17 (A17 Pro+, 8 GB). iOS 26+, Apple
  Intelligence enabled, device+Siri language match. Must gate at runtime via
  `SystemLanguageModel` availability and fall back when unavailable.
- RN bridge exists: `@react-native-ai/apple` (Callstack, Vercel AI SDK-compatible),
  also `react-native-apple-llm`. Guided generation (`@Generable`) maps onto our
  `{score, verdict, feedback}` schema.
- ⚠️ **Blocker:** bridge needs **RN 0.80+ / Expo SDK 53+**; app is on
  **RN 0.76.9 / Expo 52** → needs an Expo upgrade first. New Architecture is
  already enabled (✅, required). iOS target 15.1 is fine (gate feature to iOS 26+).
- ⚠️ Quality: a ~3B on-device model is far weaker than Claude/Haiku for nuanced
  Regents grading — use it as a fast/offline/cheap path, NOT the authoritative grade.
- Can't be tested in CI/Expo Go/JS — only on a real Apple-Intelligence device via
  an EAS/dev build. Plan: spike on a branch (Expo bump + bridge + a test screen),
  then verify on a physical 15 Pro.

Refs: Apple support 121115 (devices); callstack.com on-device-apple-llm blog;
react-native-ai.dev.
