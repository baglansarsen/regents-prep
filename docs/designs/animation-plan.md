# Regentify motion plan: game-feel animation

**Goal:** make every study action *feel* rewarding the way the best gamified learning apps do. Each tap gets a physical response, each answer gets an immediate verdict, and each lesson ends in a payoff. We borrow the **patterns** (tactile buttons, verdict panel, celebration sequence, living mascot), not anyone's art, characters, sounds or layouts. Reggie, our palette and our sounds stay ours.

Scope: `mobile/` only. Native, web PWA and iPhone Duo must all work.

---

## Status (2026-11-06): phases 0–6 shipped

| Phase | Shipped | Notes |
|---|---|---|
| 0 Foundation | ✅ | `src/motion/`: tokens, useReducedMotion, useFeedback, PressableDuo, Burst |
| 1 Answer moment | ✅ | AnswerChoice, ProgressBar (sheen/glow), ReactingReggie, energy flash |
| 2 Lesson complete | ✅ | useCelebrationSequence + Reveal; tap-to-skip; Perfect stamp |
| 3 Home path | ✅ | StartCallout, UnlockPop, PressScale, scroll-to-node, animated unit bars |
| 4 Rewards travel | ✅ | RewardFlight (RP → top bar), streak flicker, LevelUpCelebration |
| 5 Reggie alive | ✅ code-only | AnimatedReggie (breathe/blink/pose cross-fade), useReggieReaction. **Rive version still needs art.** |
| 6 Guardrails | ✅ | Reduce Motion verified on every surface (web, `prefers-reduced-motion`); fold/unfold mid-celebration responsive at Duo sizes; Home idle ≈61 commits/s on web (same as before the work) |

Still open: §5 decisions 2–4 (Rive/Lottie art, new sounds, in-app Sound/Animations toggles), and on-device feel (haptics, 120Hz) on iPhone + iPhone Duo hardware.
Press feedback (PressableDuo, PressScale) intentionally stays on under Reduce Motion: direct, touch-anchored feedback, per Apple's guidance.

## 1. What exists today (audit, 2026-11-06)

| Area | Today | Gap |
|---|---|---|
| Buttons (`duoBtn`) | 4pt bottom ledge, `TouchableOpacity` fade | No press-down. The ledge never "squishes", so the tactile cue is missing |
| Quiz answer | Slide-up feedback panel, pet bounce/shake, combo spring, correct/wrong sounds, haptics | No option-level reaction (picked card doesn't pop, wrong card doesn't shake), progress bar jumps, Reggie static |
| Lesson complete (`ResultsScreen`) | RP count-up (900ms), streak banner spring, `MasteryCelebration` confetti on first mastery | No staged reveal; every completion feels the same; perfect lesson not special |
| Home path | Current node pulse loop (750ms) | No unlock moment, no "start here" callout, path doesn't scroll to current node |
| Top bar (streak / RP / energy) | Static numbers | Earned RP doesn't *travel* anywhere; energy loss invisible |
| Reggie | Static SVG, 7 poses (idle, wave, celebrate, think, encourage, oops, sleep) | Pose changes are hard cuts; no idle life (blink/breathe) |
| Streak | `StreakCelebration` modal with confetti + week chain | Good base; flame itself doesn't ignite |
| Accessibility | None | **No Reduce Motion support anywhere** (must fix first) |
| Stack | RN `Animated` (27 files), Lottie + Rive installed (Rive: 1 demo), expo-haptics, expo-av sounds | No Reanimated; no shared motion tokens; 3 separate confetti implementations |

---

## 2. Motion principles

1. **Every action gets the trio:** motion + haptic + (optional) sound, fired in the same frame. Motion alone feels floaty; haptics alone feel broken.
2. **Fast in, springy out.** Responses start within one frame (<16ms) and settle in 150–400ms. Celebrations may run 1–2.5s but must be **tap-to-skip**.
3. **Verdict before explanation.** Correct/wrong is readable from color + motion in under 200ms, before any text is read.
4. **Escalate rewards.** Normal < combo ×3 < perfect lesson < streak milestone < level up. Never play the biggest celebration for a small win.
5. **Native driver only.** Animate `transform` and `opacity` only (progress bars use `scaleX`, not `width`), so motion stays at 60/120fps (ProMotion, iPhone Duo) even while JS is busy.
6. **Respect Reduce Motion.** Swap movement for opacity cross-fades; keep haptics and sound.
7. **Interruptible.** Leaving a screen mid-animation stops it cleanly. Never chain `navigation.goBack()` into a Modal-close tick (see the Modal+goBack wedge in project memory).

### Motion tokens (`src/motion/tokens.js`)
```js
export const DUR = { instant: 90, fast: 150, base: 250, slow: 400, celebrate: 1200 }
export const SPRING = {
  snappy: { tension: 400, friction: 22 },  // presses, selection
  bouncy: { tension: 300, friction: 10 },  // verdicts, pops
  gentle: { tension: 120, friction: 14 },  // sheets, panels
}
export const EASE = { out: Easing.out(Easing.cubic), inOut: Easing.inOut(Easing.cubic) }
```

---

## 3. Phased plan

Effort is in focused dev-days and assumes no new native modules (see §5).

### Phase 0: Foundation (1.5 days) · *ship first, unlocks everything else*
- `src/motion/tokens.js`: the tokens above.
- `src/motion/useReducedMotion.js`: `AccessibilityInfo.isReduceMotionEnabled()` + change listener; web reads `prefers-reduced-motion`.
- `src/motion/feedback.js`: `react('correct' | 'wrong' | 'tap' | 'unlock' | 'celebrate')` fires haptic + sound together (wraps `utils/haptics` + `useQuizSound`).
- **`<PressableDuo>`**: drop-in for `TouchableOpacity` + `duoBtn`. On press-in, the face translates down 4pt while the ledge collapses (spring `snappy`) plus `hapticTick`; on release it pops back. This is the single biggest "feel" upgrade and applies to every primary button.
- `<Burst>`: one confetti/particle component replacing the three copies (Mastery, Streak, PetEvolution), with an intensity prop (`small | medium | large`).

### Phase 1: The answer moment (2.5 days) · *highest impact; it happens 20× per lesson*
| Event | Motion | Haptic / sound |
|---|---|---|
| Tap an option | Card scales 0.97 → 1.0 (`snappy`), border animates to brand color | tick |
| CHECK, correct | Option pops 1.0 → 1.06 → 1.0 (`bouncy`); verdict panel slides up with spring, green; check icon draws in (stroke-dash on SVG) | success · correct.wav |
| CHECK, wrong | Picked option shakes ±8pt ×3 (~300ms) and tints red; the correct option glows green after 150ms; panel slides up red | warning · wrong.wav |
| Progress bar | Fills with spring via `scaleX`; a light sheen sweeps across on every correct answer | — |
| Combo ×3, ×5, ×10 | "3 in a row!" chip pops above the bar; bar gets a pulsing glow while the combo holds | heavy at ×5 |
| Reggie (header) | Hops into **encourage** on correct, droops into **oops** on wrong, then back to idle (see Phase 5) | — |
| Energy lost | Bolt chip in the top bar flashes and the fill animates down | — |

### Phase 2: Lesson-complete payoff (2 days)
A staged, skippable sequence on `ResultsScreen` (`useCelebrationSequence` drives the steps):
1. Reggie jumps in with **celebrate** pose and `<Burst size="medium">` (0–600ms).
2. Stat cards (RP, accuracy, time) stagger up 80ms apart (`bouncy`).
3. RP counts up with a soft tick sound every ~10 points (existing count-up, sped to 700ms).
4. **Perfect lesson** variant: `<Burst size="large">`, gold accent, "Perfect!" stamp scales in from 1.6 → 1.0.
5. Streak continues → existing `StreakCelebration` after a 300ms beat; the flame "ignites" (scale 0 → 1.15 → 1, flicker loop).
6. CONTINUE button slides up last. Tap anywhere skips to the final state.

### Phase 3: Home path & progression (2 days)
- **Scroll-to-current:** on focus, the path scrolls so the current node is centered (`ScrollView.scrollTo`, animated).
- **"Start" callout:** bouncing tooltip above the current node (translateY loop, 1.2s), replacing the plain pulse.
- **Unlock moment:** returning from a passed lesson, the next node's lock pops off (scale + rotate out), the node colorizes, and `<Burst size="small">` + unlock haptic fire. Detected by comparing previous vs current unlocked set on focus.
- **Unit banner:** progress bar fills from the old to the new value on return.
- Node press uses `<PressableDuo>` (round variant).

### Phase 4: Rewards travel (1.5 days)
- **RP flies home:** on lesson complete, 5–8 ⭐ particles arc from the RP card to the top-bar ⭐ chip (bezier via interpolated translateX/Y). The chip bumps when they land and the number ticks up.
- **Streak chip:** 🔥 does a single flicker + scale bump when today's streak is secured.
- **Level up:** full-screen moment (badge scales in with `bouncy`, rays rotate slowly behind, `<Burst large>`), shown once per level.

### Phase 5: Reggie comes alive (2–3 days, art-dependent)
- **Now (code-only):** wrap `ReggieMascot` in `<AnimatedReggie>`:
  - idle breathe (scaleY 1 → 1.02, 2.4s loop) + blink (eyes group opacity, every 3–6s random);
  - pose changes cross-fade 120ms with squash/stretch (scaleY 0.9 → 1.05 → 1);
  - `react(pose)` API so screens just call `reggie.react('encourage')`.
- **Later (needs an artist):** a Rive state machine for Reggie (`idle`, `talk`, `cheer`, `oops`, `sleep` + lip-flap). `rive-react-native` is already installed; today's `owl.riv` is a demo, not our character. Rive gives the most "alive" result and is tiny on disk.

### Phase 6: Polish & guardrails (1 day)
- Reduce Motion pass over every new animation (cross-fade fallbacks).
- Web parity check (RN-web runs `Animated` without the native driver; keep loops few and cheap after the Home render-loop fix).
- iPhone Duo check: fold/unfold mid-celebration must not break layouts (`useWindowDimensions` only, no stored sizes).
- Perf budget: ≤2 concurrent looping animations per screen; measure with the commit-tracking probe used in the design review.

**Total:** about 12–13 dev-days, shippable phase by phase. Phases 0 + 1 alone deliver most of the felt difference.

---

## 4. Build order & shipping

| Order | Ship as | Why |
|---|---|---|
| 1 | Phase 0 + `PressableDuo` on Login/Onboarding/Home CTAs | Low risk, instant feel upgrade, sets up tokens |
| 2 | Phase 1 (quiz) | Most-repeated moment |
| 3 | Phase 2 (results) | The payoff loop |
| 4 | Phase 3 + 4 | Progression and rewards |
| 5 | Phase 5 (code) → Rive later | Personality |

One `feat(mobile): …` commit per component/surface; push in batches (each push = an Xcode Cloud build).

---

## 5. Decisions needed

1. **Reanimated: yes or not yet?** *Recommendation: not yet.* Everything above runs on RN `Animated` with the native driver. Reanimated 4 (+ `react-native-worklets`) is a native dependency: `pod install` into the committed `ios/`, a Babel plugin, an Expo Go/web check, and an Xcode Cloud risk. Revisit only if gesture-driven motion (drag-to-match questions, swipeable cards) lands.
2. **Art for Reggie (Rive) and celebration Lottie files:** commission or draw in-house? Code-only versions ship first either way.
3. **Sounds:** we have `correct.wav` / `wrong.wav`. Phase 2+ wants a tick, a combo chime, a level-up sting and an unlock pop. These must be original or properly licensed, never ripped from another app.
4. **Settings:** add "Sound effects" and "Animations: full / reduced" toggles in Profile → Settings? (Recommended; the OS Reduce Motion setting is honoured regardless.)

---

## 6. How we'll verify
- Jest: tokens/`useReducedMotion`/`useCelebrationSequence` step ordering (fake timers); `<PressableDuo>` fires haptic on press-in.
- Device: iPhone 18 Pro + iPhone Duo simulator (outer + unfolded) + web at 390px; 120Hz smoothness check via Instruments' Core Animation FPS.
- Reduce Motion on in iOS Settings: no translation/scale, cross-fades only.
