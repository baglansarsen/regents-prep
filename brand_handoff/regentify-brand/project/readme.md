# Regentify Brand & Design System

**Regentify** is a gamified NY Regents Exam prep app for high-school students — *Duolingo for state exams*. Bright, bouncy and encouraging, but trustworthy because real grades are on the line. The name plays on **Regents** + **-ify**.

This project is the brand & design system: the logo, mascot, colour/type/spacing foundations, and reusable UI built on the **Duolingo-playful** brand direction (Fredoka + Nunito, Spark-Green `#1FC36B`).

## Sources
- `brand/Regentify-Brandbook.html` + `Logo-Prompt.md` (in the attached `regents-prep/` folder) — the canonical brand direction this system follows.
- `regents-prep/` codebase (read-only) — the shipped app. **Note:** the live app currently ships a *dark, Inter-based* theme with a bluish green (`#16a34a`); this design system intentionally follows the **brand book** (the aspirational/canonical brand), not the legacy app theme. The codebase is used for product *structure* (subjects, units, XP, streaks, leagues, daily question) — see `src/screens/`, `src/data/subjects.js`.

## Visual foundations
- **Colour** — Spark Green `#1FC36B` (primary), Forest `#0E9F52` (depth/pressed), Green Deep `#0A7D40`, XP Yellow `#FFC93C`, Ink `#0F2018`, Slate `#5B6B62`, Mint Wash `#EAFBF1`. Gamification accents each own one metric: Coral `#FF5A5F` (streaks/lives), Violet `#7C5CFC` (Pro), Sky `#34B3F1` (info).
- **Type** — Fredoka (display/wordmark/buttons, weight 600) + Nunito (body, 600/900). *Loaded from Google Fonts CDN — no local binaries in the repo.*
- **Shape** — corner radii 10–24px everywhere, never sharp. Soft card shadow `0 10px 30px rgba(15,32,24,.08)`.
- **The "pop"** — buttons sit on a solid 5px offset bottom shadow and press *down* 3px on tap. This tactile bounce is the signature interaction.
- **Icon gradient** — green `#27D078 → #0E9F52` on light; solid Spark Green on dark.

## Content & voice
Talk like a hype-friend who happens to know the answer key. Short, second-person, celebrate effort, make mistakes feel safe — academic accuracy non-negotiable. Emoji are welcome as metric icons (🔥 streak, 🪙 XP). Say *"Close! Let's break this one down together."* — never *"Incorrect. Please review the material."*

## Mascot — Reggie
A friendly baby **dino** in a graduation cap (chosen over the owl to avoid Duolingo overlap). Green body, mint belly, XP-yellow spikes/feet. Five poses: `happy` (idle), `cheer` (celebrate), `think` (hints), `sleepy` (streak at risk), `wave` (greeting).

## Index / manifest
**Brand deliverables**
- `Regentify Reggie Dino.html` — final logo brand sheet (icon, lockups, app-icon mockup, favicons, usage).
- `Regentify Logo Concepts.html` — round-1 concept exploration (Summit / Cap&Stem / Reggie).
- `Regentify Mascot Options.html` — non-owl mascot exploration (frog / fox / dino).
- `assets/logo/` — layered SVG exports: `reggie-dino-icon.svg`, `…-icon-dark.svg`, `…-favicon.svg`, `…-mark.svg`, `lockup-horizontal.svg`, `lockup-stacked.svg`.

**Foundations** — `styles.css` → `tokens/{colors,typography,spacing}.css`. Specimen cards in `guidelines/`.

**Components** (`window.DesignSystem_756e59`)
- `components/brand/Reggie` — mascot (5 poses).
- `components/forms/Button` — pop button (primary/secondary/pro/danger).
- `components/forms/ChoiceButton` — quiz answer row (idle/correct/wrong/dim).
- `components/feedback/StatChip` — gamification pill (xp/streak/lives/pro/info).
- `components/feedback/ProgressBar` — mint/green progress meter.
- `components/core/Card` — soft surface (default / selected / interactive).
- `components/navigation/LessonNode` — circular study-path node (done / active / locked).

**UI kit** — `ui_kits/app/index.html`: interactive recreation of the core loop (Login → Study Path → Quiz → Results) plus League (Bronze→Diamond leaderboard) and Profile, all wired through the tab bar, in the playful brand.

## Possible next steps
- More screens in the UI kit (League leaderboard, Pet/Reggie shop, Profile).
- A slide-deck template for investor/teacher decks.
- Self-hosted font binaries (currently Google Fonts CDN).
