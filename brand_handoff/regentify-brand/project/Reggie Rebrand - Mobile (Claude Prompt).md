# Prompt for Claude Code — Re-skin the Regentify **mobile** app to the Reggie brand

This targets the Expo / React Native app at `regents-prep/mobile`. Good news: the mobile color palette in `src/theme.js` is **already on-brand** (Spark Green `#1FC36B`, Forest, XP Yellow, Coral, Sky, Violet, Mint Wash). So the mobile rebrand is narrow: **swap the owl logo for Reggie the Dino, add Fredoka as the display font, and a tiny token polish.** Ready-made Reggie icon assets are provided (see "Assets" at the bottom) — paste the prompt below into Claude Code, then drop those four PNGs in.

---

Re-skin this Expo / React Native app (`regents-prep/mobile`) to the new **Regentify** brand, fronted by the mascot **Reggie the Dino** (a round green dino in a graduation cap). The current mascot is an owl. **Do not change any logic, navigation, hooks, contexts, or data — this is a visual re-skin only: the logo assets, the display font, and two text-color tokens.**

## 1. Replace the app icons with Reggie

The app icon, splash, adaptive icon, and favicon currently render an **owl**. Replace these four files in `mobile/assets/` with the provided Reggie PNGs (same filenames, so nothing else needs rewiring):

- `assets/icon.png` — 1024×1024, Reggie on a full-bleed green gradient (no alpha — iOS-safe).
- `assets/adaptive-icon.png` — 1024×1024, Reggie on transparent, sized into the Android safe zone.
- `assets/splash-icon.png` — 1024×1024, Reggie on a white squircle tile (so it reads on the green splash background).
- `assets/favicon.png` — simplified Reggie tile for web.

`app.json` already sets the splash and Android adaptive-icon background to `#1FC36B` (Spark Green) — leave those as is. No code changes are needed for the icon swap.

**In-app logo:** `src/screens/LoginScreen.jsx` renders the hero logo with `require('../../assets/icon.png')`, so the login screen picks up Reggie automatically once the asset is replaced. Optionally, make the "Regentify" wordmark below it two-tone — wrap it so "Regent" is `C.text` and "ify" is the XP-yellow `#FFC93C`:

```jsx
<Text style={[T.h1, { marginTop: 10, textAlign: 'center' }]}>
  <Text style={{ color: C.text }}>Regent</Text><Text style={{ color: '#FFC93C' }}>ify</Text>
</Text>
```

Search the rest of `src/screens` and `src/components` for any other owl emoji (🦉) or `assets/icon.png` brand references and apply the same treatment.

## 2. Add Fredoka as the display font

The brand display font is **Fredoka** (headings, buttons, big numbers); body text stays **Nunito**. Right now everything uses Nunito.

- Install the font package: `npx expo install @expo-google-fonts/fredoka`
- In `App.js`, extend the `useFonts({ … })` call to also load Fredoka weights:

```js
import {
  Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, Nunito_900Black,
} from '@expo-google-fonts/nunito'
import { Fredoka_500Medium, Fredoka_600SemiBold, Fredoka_700Bold } from '@expo-google-fonts/fredoka'

// …
const [fontsLoaded] = useFonts({
  Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, Nunito_900Black,
  Fredoka_500Medium, Fredoka_600SemiBold, Fredoka_700Bold,
})
```

- In `src/styles/duo.js`, repoint the **display** entries of the `T` typography scale to Fredoka (leave `body` and `small` on Nunito):

```js
export const T = {
  h1:    { fontFamily: 'Fredoka_700Bold',     fontSize: 28, letterSpacing: -0.3 },
  h2:    { fontFamily: 'Fredoka_600SemiBold',  fontSize: 22 },
  h3:    { fontFamily: 'Fredoka_600SemiBold',  fontSize: 17 },
  body:  { fontFamily: 'Nunito_700Bold',       fontSize: 15, lineHeight: 22 },
  small: { fontFamily: 'Nunito_600SemiBold',   fontSize: 13 },
  label: { fontFamily: 'Fredoka_600SemiBold',  fontSize: 12, letterSpacing: 0.8, textTransform: 'uppercase' },
  btn:   { fontFamily: 'Fredoka_600SemiBold',  fontSize: 15, letterSpacing: 0.5, textTransform: 'uppercase' },
  num:   { fontFamily: 'Fredoka_700Bold',      fontSize: 36 },
}
```

Also update the `sectionLabel()` helper in the same file from `'Nunito_800ExtraBold'` to `'Fredoka_600SemiBold'`. Then grep `src` for any remaining hard-coded `fontFamily: 'Nunito_900Black'` / `'Nunito_800ExtraBold'` used on **headings, titles, or numbers** and switch those to `Fredoka_700Bold` / `Fredoka_600SemiBold` (Fredoka maxes out at 700 — never request 800/900). Leave body/paragraph text on Nunito.

## 3. Token polish in `src/theme.js`

The greens, coral, yellow, sky, and violet are already the brand values — leave them. Only nudge the text colors to the brand ink/slate, in **both** the `light` and `dark` objects:

- `light.text`: `#1F2937` → `#0F2018` (Ink)
- `light.textMuted`: `#6B7280` → `#5B6B62` (Slate)
- `light.bg`: `#F9F9F9` → `#F4FBF7` (faint mint page tint) — optional, for a warmer base.
- `dark.text` can stay `#F9FAFB`; the dark `textMuted` `#9CA3AF` is fine.

## 4. Verify

Run `npx expo start` and check: app boots, Fredoka loads (headings/numbers look rounded, not like the old Nunito), Reggie shows on the login hero, and the new icon/splash appear after a rebuild (`npx expo run:ios` / `run:android`, or a new EAS build, since native icon assets are baked at build time — Expo Go shows its own icon). Don't change any other behavior.

---

### Assets
The four Reggie PNGs are generated and ready in the brand kit at `mobile-assets/` — copy them into `regents-prep/mobile/assets/`, overwriting the owl files of the same name. (If you want a different splash treatment — e.g. Reggie directly on the green with no white tile — tell me and I'll regenerate.)

### Note
This installs the **Reggie the Dino** mark. The repo's `brand/` folder also has older logo options (A cap-arrow, B shield-check, C reggie-owl) — if you'd rather standardize on one of those, say so and I'll retarget. The chromebook web app has its own (more involved) rebrand prompt — see `Reggie Rebrand — Claude Prompt.md`.
