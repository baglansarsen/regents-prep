# Prompt for Claude Code — Re-skin Regentify to the Reggie brand

Paste everything below the line into Claude Code, running inside the `regents-prep/chromebook` app.

---

Re-skin this Vite + React app to the new **Regentify** brand. The brand is a warm, gamified Regents-prep product fronted by a baby-dinosaur mascot, **Reggie the Dino** — a round green dino in a graduation cap. **Do not touch any logic, hooks, routing, data, or component structure. This is purely a visual re-skin: color tokens, fonts, and the logo.**

The app already centralizes its design system in `src/index.css` as CSS variables, and most components read those variables — so the fastest correct path is to **keep every variable name and only change its value**, then fix the few hard-coded spots and the logo.

## 1. Recolor the design tokens in `src/index.css`

In the `:root` block (light theme), replace these values. Keep the variable names exactly as they are:

| Variable | Old | New | Brand name |
|---|---|---|---|
| `--brand` | `#58CC02` | `#1FC36B` | Spark Green |
| `--brand-light` | `#7FDD2A` | `#27D078` | gradient top |
| `--brand-dark` | `#46A302` | `#0E9F52` | Forest |
| `--brand-bg` | `#D7FFB8` | `#D6F5E3` | Mint-2 |
| `--correct` | `#58CC02` | `#1FC36B` | Spark Green |
| `--correct-bg` | `#D7FFB8` | `#D6F5E3` | Mint-2 |
| `--correct-dark` | `#46A302` | `#0E9F52` | Forest |
| `--wrong` | `#FF4B4B` | `#FF5A5F` | Coral |
| `--wrong-dark` | `#CC0000` | `#E23B40` | Coral deep |
| `--warn` | `#FFC800` | `#FFC93C` | XP Yellow |
| `--warn-dark` | `#D97706` | `#D9A722` | XP Yellow deep |
| `--blue` | `#1CB0F6` | `#34B3F1` | Sky |
| `--blue-dark` | `#0A8DC7` | `#1E92D0` | Sky deep |
| `--purple` | `#CE82FF` | `#7C5CFC` | Violet |
| `--purple-dark` | `#A855F7` | `#5C3FD6` | Violet deep |
| `--purple-bg` | `#F3E8FF` | `#ECE7FF` | Violet tint |
| `--text` | `#1F2937` | `#0F2018` | Ink |
| `--text-muted` | `#6B7280` | `#5B6B62` | Slate |
| `--bg` | `#F9F9F9` | `#F4FBF7` | mint-tinted page |
| `--shadow-glow` | `rgba(88,204,2,0.15)` | `rgba(31,195,107,0.18)` | green glow |

Leave the `[data-theme="dark"]` block's structure intact, but update its brand greens to match: `--brand: #1FC36B`, `--brand-light: #27D078`, `--brand-dark: #0E9F52`, `--correct*` to the same greens, `--shadow-glow: rgba(31,195,107,0.25)`. The wrong/warn/blue/purple in dark mode can take the same new hues as light.

## 2. Swap the display font to Fredoka

The brand display font is **Fredoka** (headings, wordmark, buttons); body stays **Nunito**. The codebase uses `--font-outfit` everywhere for display type — the cleanest swap is to repoint that one variable instead of renaming usages.

- In `src/index.css`, change `--font-outfit: 'Outfit', sans-serif;` → `--font-outfit: 'Fredoka', sans-serif;` (keep the variable name so all `var(--font-outfit)` usages pick it up). Leave `--font-nunito` as is.
- In `index.html`, replace the Google Fonts `<link>` so it loads Fredoka instead of Outfit:

```html
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
```

Fredoka only ships weights 400–700, so if any rule uses `font-weight: 800/900` on display text, drop it to `700`.

## 3. Replace the logo with Reggie the Dino

The current logo is a `📖` / `📚` emoji plus a one-color "Regentify" wordmark. Replace with the real mark.

**a. Add the asset files.** Create `public/brand/` and add these two SVGs (source below). The full app-icon is for the sidebar/avatars; the simplified one is for the favicon and tiny sizes.

`public/brand/reggie-icon.svg`:
```svg
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Regentify — Reggie the Dino">
  <defs><linearGradient id="reggieTile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#27D078"/><stop offset="1" stop-color="#0E9F52"/></linearGradient></defs>
  <rect x="16" y="16" width="480" height="480" rx="118" fill="url(#reggieTile)"/>
  <g fill="#FFC93C" stroke="#FFC93C" stroke-width="10" stroke-linejoin="round"><path d="M176 206 L150 150 L210 184 Z"/><path d="M150 270 L104 232 L168 230 Z"/></g>
  <path d="M246 172 C322 172 380 220 392 286 C406 292 408 318 394 328 C384 380 350 414 298 426 C284 430 270 432 254 432 C186 432 148 386 148 316 C148 230 178 172 246 172 Z" fill="#1FC36B"/>
  <ellipse cx="248" cy="372" rx="72" ry="60" fill="#EAFBF1"/>
  <path d="M196 372 q-26 8 -30 34" fill="none" stroke="#15A95B" stroke-width="22" stroke-linecap="round"/>
  <ellipse cx="214" cy="442" rx="36" ry="17" fill="#FFC93C"/><ellipse cx="304" cy="444" rx="36" ry="17" fill="#FFC93C"/>
  <circle cx="320" cy="252" r="44" fill="#FFFFFF"/><circle cx="333" cy="257" r="22" fill="#0F2018"/><circle cx="341" cy="250" r="7" fill="#FFFFFF"/>
  <circle cx="388" cy="300" r="8" fill="#0E7A45"/><path d="M348 340 q30 18 52 4" fill="none" stroke="#0F2018" stroke-width="12" stroke-linecap="round"/>
  <path d="M262 116 L352 152 L262 188 L172 152 Z" fill="#0F2018"/><circle cx="262" cy="116" r="11" fill="#FFC93C"/><path d="M344 156 L344 192" stroke="#FFC93C" stroke-width="9" stroke-linecap="round"/><circle cx="344" cy="200" r="11" fill="#FFC93C"/>
</svg>
```

`public/brand/reggie-favicon.svg`:
```svg
<svg width="64" height="64" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Regentify">
  <defs><linearGradient id="favTile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#27D078"/><stop offset="1" stop-color="#0E9F52"/></linearGradient></defs>
  <rect x="16" y="16" width="480" height="480" rx="118" fill="url(#favTile)"/>
  <path d="M240 158 C322 158 388 214 400 292 C414 298 416 326 400 336 C390 396 352 436 296 448 C282 452 268 454 250 454 C176 454 130 402 130 322 C130 226 168 158 240 158 Z" fill="#1FC36B"/>
  <ellipse cx="244" cy="384" rx="84" ry="70" fill="#EAFBF1"/>
  <circle cx="322" cy="252" r="56" fill="#FFFFFF"/><circle cx="338" cy="258" r="28" fill="#0F2018"/>
  <circle cx="396" cy="306" r="10" fill="#0E7A45"/>
  <path d="M262 110 L360 148 L262 186 L164 148 Z" fill="#0F2018"/><circle cx="262" cy="110" r="13" fill="#FFC93C"/>
</svg>
```

**b. Favicon** — in `index.html`, inside `<head>`, add:
```html
<link rel="icon" type="image/svg+xml" href="/brand/reggie-favicon.svg" />
```

**c. Sidebar logo** — in `src/App.jsx`, the sidebar currently renders an emoji + text:
```jsx
<div className="sidebar-logo" onClick={() => setScreen('home')}>
  <span style={{ fontSize: '32px' }}>📖</span>
  <span className="sidebar-logo-text">Regentify</span>
</div>
```
Replace the emoji `<span>` with the icon, and make the wordmark two-tone ("Regent" in ink, "ify" in XP yellow):
```jsx
<div className="sidebar-logo" onClick={() => setScreen('home')}>
  <img src="/brand/reggie-icon.svg" alt="Regentify" style={{ width: '40px', height: '40px' }} />
  <span className="sidebar-logo-text"><span style={{ color: 'var(--text)' }}>Regent</span><span style={{ color: '#FFC93C' }}>ify</span></span>
</div>
```

**d. Loading screen** — in `src/App.jsx`, the `authLoading` block renders a `📖` emoji and "Loading Regentify...". Replace the emoji with `<img src="/brand/reggie-icon.svg" alt="" style={{ width: '88px', height: '88px', animation: 'float 1.5s ease-in-out infinite' }} />`.

**e. Login hero** — in `src/screens/LoginScreen.jsx`, the `.auth-hero` renders a `📚` emoji above `<h1 className="auth-logo-text">Regentify</h1>`. Replace the emoji `<div>` with `<img src="/brand/reggie-icon.svg" alt="" style={{ width: '120px', height: '120px', animation: 'breathe 4s ease-in-out infinite', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.25))' }} />`, and make the `<h1>` two-tone the same way as the sidebar wordmark. The hero gradient (`--blue-dark` → `--purple-dark`) can stay, or switch to the brand greens (`linear-gradient(135deg, #0E9F52, #0A7D40)`) for a more on-brand feel — your call.

Search the codebase for any other `📖`/`📚` brand emoji or `'Regentify'` wordmark spots and apply the same treatment.

## 4. Verify

Run `npm run dev` and check: dev server boots clean, Fredoka loads (headings look rounded, not like Outfit), the green is the new Spark Green everywhere, buttons/streak/XP/correct states recolor correctly, and Reggie shows in the sidebar, loading screen, login hero, and browser tab. Don't change any other behavior.

---

### Notes for the user
- The repo already has a `brand/` folder (with `Logo-Prompt.md` and icon options A/B/C). This prompt installs the **Reggie the Dino** mark from the new brand kit instead — if you'd rather use one of those existing options, tell me and I'll retarget the prompt.
- Full-detail and lockup SVGs (horizontal/stacked, dark-tile, tile-less) live in the brand kit's `assets/logo/` if you want them for the marketing site or larger placements.
