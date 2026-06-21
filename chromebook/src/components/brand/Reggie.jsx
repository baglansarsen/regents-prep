import React from 'react';

/**
 * Reggie — the Regentify mascot (a friendly baby dino in a graduation cap).
 * Pose variants: happy (idle), cheer (celebrate), think, sleepy, wave.
 * Supports rendering as a circular avatar or full-body, with vector accessories.
 */
export function Reggie({
  pose = 'happy',
  size = 160,
  className = '',
  style = {},
  accessories = [],
  isAvatar = false,
  title
}) {
  const P = POSES[pose] || POSES.happy;

  const hasOtherHat = accessories.includes('wizardHat') || accessories.includes('cowboyHat') || accessories.includes('crown');

  return (
    <svg
      className={className}
      style={{
        ...style,
        borderRadius: isAvatar ? '50%' : 'none',
        background: isAvatar ? 'var(--brand-bg)' : 'transparent',
      }}
      width={size}
      height={size}
      viewBox={isAvatar ? "112 64 220 220" : "0 0 320 320"}
      role="img"
      aria-label={title || `Reggie the dino — ${pose}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ground shadow (only for full-body) */}
      {!isAvatar && (
        <ellipse cx="160" cy="298" rx="78" ry="13" fill="#0F2018" opacity="0.08" />
      )}

      {/* Glow Aura (Background effect) */}
      {accessories.includes('glowAura') && (
        <g fill="#FFC93C" opacity="0.8">
          <path d="M70 76 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z" />
          <path d="M262 60 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" />
          <path d="M250 260 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" />
          <path d="M90 280 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" />
        </g>
      )}

      {/* Back spikes */}
      <g fill="#FFC93C" stroke="#FFC93C" strokeWidth="7" strokeLinejoin="round">
        <path d="M104 150 L86 108 L132 134 Z" />
        <path d="M84 196 L48 168 L98 166 Z" />
      </g>

      {/* Tail (behind) */}
      <path d="M76 250 C44 252 32 274 38 298 C40 310 54 312 60 301 C52 284 58 266 78 261 Z" fill="#15A95B" />

      {/* Extra arm behind (cheer/wave) - bypassed if avatar */}
      {!isAvatar && P.armBack}

      {/* Tiny Backpack accessory (render behind body) */}
      {!isAvatar && accessories.includes('tinyBackpack') && (
        <g fill="#EF4444">
          <rect x="52" y="190" width="36" height="56" rx="10" />
          <rect x="58" y="210" width="24" height="28" rx="4" fill="#B91C1C" />
          {/* straps */}
          <path d="M88 200 C110 200 110 240 88 240" fill="none" stroke="#B91C1C" strokeWidth="6" />
        </g>
      )}

      {/* Body */}
      <path
        d="M150 96 C214 96 262 138 272 196 C284 202 286 226 273 235 C264 282 232 312 184 322 C172 326 160 326 146 326 C84 326 48 282 48 218 C48 140 84 96 150 96 Z"
        transform="translate(0,-22) scale(0.92)"
        fill="#1FC36B"
      />

      {/* Belly */}
      <ellipse cx="150" cy="232" rx="62" ry="52" fill="#EAFBF1" />

      {/* Feet (only for full-body) */}
      {!isAvatar && (
        <>
          <ellipse cx="118" cy="288" rx="30" ry="14" fill="#FFC93C" />
          <ellipse cx="196" cy="290" rx="30" ry="14" fill="#FFC93C" />
        </>
      )}

      {/* Front arm - bypassed if avatar */}
      {!isAvatar && (P.armFront || (
        <path d="M104 232 q-22 7 -25 30" fill="none" stroke="#15A95B" strokeWidth="18" strokeLinecap="round" />
      ))}

      {/* Face: eyes + mouth */}
      {P.face}

      {/* Snout nostril */}
      <circle cx="236" cy="168" r="6.5" fill="#0E7A45" />

      {/* Sunglasses accessory */}
      {accessories.includes('sunglasses') && (
        <g fill="#0F2018">
          {/* left lens */}
          <path d="M156 142 L220 142 L210 174 L166 174 Z" rx="3" />
          {/* bridge */}
          <rect x="220" y="146" width="12" height="6" />
          {/* arm */}
          <path d="M156 146 L130 152" stroke="#0F2018" strokeWidth="6" />
        </g>
      )}

      {/* Default Graduation Cap */}
      {!hasOtherHat && (
        <g>
          <path d="M158 52 L232 82 L158 112 L84 82 Z" fill="#0F2018" />
          <circle cx="158" cy="52" r="9" fill="#FFC93C" />
          <path d="M224 86 L224 116" stroke="#FFC93C" strokeWidth="7.5" strokeLinecap="round" />
          <circle cx="224" cy="123" r="9" fill="#FFC93C" />
        </g>
      )}

      {/* Wizard Hat accessory */}
      {accessories.includes('wizardHat') && (
        <g>
          <path d="M100 70 L158 -5 L216 70 Z" fill="#7C5CFC" />
          <ellipse cx="158" cy="70" rx="68" ry="12" fill="#7C5CFC" />
          {/* stars */}
          <polygon points="158,25 160,30 165,30 161,33 162,38 158,35 154,38 155,33 151,30 156,30" fill="#FFC93C" />
          <polygon points="135,45 137,48 141,48 138,50 139,54 135,52 131,54 132,50 129,48 133,48" fill="#FFC93C" />
          <polygon points="180,45 182,48 186,48 183,50 184,54 180,52 176,54 177,50 174,48 178,48" fill="#FFC93C" />
        </g>
      )}

      {/* Cowboy Hat accessory */}
      {accessories.includes('cowboyHat') && (
        <g>
          <ellipse cx="158" cy="74" rx="74" ry="15" fill="#B45309" />
          <path d="M116 72 C116 28 200 28 200 72 Z" fill="#92400E" />
          <path d="M116 70 Q158 78 200 70" stroke="#FFC93C" strokeWidth="5" fill="none" />
        </g>
      )}

      {/* Royal Crown accessory */}
      {accessories.includes('crown') && (
        <g>
          <path d="M110 75 L110 40 L130 58 L158 30 L186 58 L206 40 L206 75 Z" fill="#FFC93C" stroke="#D97706" strokeWidth="2.5" />
          <circle cx="110" cy="38" r="4.5" fill="#EF4444" />
          <circle cx="158" cy="28" r="5.5" fill="#EF4444" />
          <circle cx="206" cy="38" r="4.5" fill="#EF4444" />
          {/* jewel accents */}
          <circle cx="134" cy="65" r="3" fill="#3B82F6" />
          <circle cx="182" cy="65" r="3" fill="#3B82F6" />
        </g>
      )}

      {/* Extras (floating Zzz / confetti) */}
      {!isAvatar && P.extras}
    </svg>
  );
}

const POSES = {
  happy: {
    face: (
      <g>
        <circle cx="196" cy="150" r="36" fill="#fff" />
        <circle cx="207" cy="155" r="18" fill="#0F2018" />
        <circle cx="214" cy="148" r="6" fill="#fff" />
        <path d="M168 196 q26 16 46 3" fill="none" stroke="#0F2018" strokeWidth="10" strokeLinecap="round" />
      </g>
    ),
  },

  cheer: {
    armFront: <path d="M104 214 q-30 -22 -22 -54" fill="none" stroke="#15A95B" strokeWidth="18" strokeLinecap="round" />,
    armBack: <path d="M214 150 q34 -16 40 -50" fill="none" stroke="#0E9F52" strokeWidth="18" strokeLinecap="round" />,
    face: (
      <g>
        <path d="M178 150 q18 -22 36 0" fill="none" stroke="#0F2018" strokeWidth="11" strokeLinecap="round" />
        <path d="M170 188 q26 4 44 0 q-6 30 -22 30 q-16 0 -22 -30 Z" fill="#0F2018" />
        <path d="M176 206 q14 10 30 0" fill="#FF7A85" />
      </g>
    ),
    extras: (
      <g fill="#FFC93C">
        <path d="M70 96 l5 13 13 5 -13 5 -5 13 -5 -13 -13 -5 13 -5 Z" />
        <path d="M252 70 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" />
        <circle cx="66" cy="170" r="5" />
      </g>
    ),
  },

  think: {
    armFront: <path d="M150 244 q42 6 60 -16" fill="none" stroke="#15A95B" strokeWidth="18" strokeLinecap="round" />,
    face: (
      <g>
        <circle cx="196" cy="150" r="36" fill="#fff" />
        <circle cx="200" cy="140" r="17" fill="#0F2018" />
        <circle cx="206" cy="134" r="6" fill="#fff" />
        <path d="M176 200 q14 6 30 2" fill="none" stroke="#0F2018" strokeWidth="9" strokeLinecap="round" />
      </g>
    ),
    extras: (
      <g>
        <circle cx="250" cy="120" r="7" fill="#34B3F1" opacity="0.5" />
        <circle cx="268" cy="100" r="10" fill="#34B3F1" opacity="0.5" />
        <text x="278" y="86" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="34" fill="#0E9F52">?</text>
      </g>
    ),
  },

  sleepy: {
    armFront: <path d="M104 236 q-20 10 -20 32" fill="none" stroke="#15A95B" strokeWidth="18" strokeLinecap="round" />,
    face: (
      <g>
        <path d="M178 152 q18 16 36 0" fill="none" stroke="#0F2018" strokeWidth="10" strokeLinecap="round" />
        <path d="M182 198 q10 -7 18 0 q8 7 16 0" fill="none" stroke="#0F2018" strokeWidth="8" strokeLinecap="round" />
      </g>
    ),
    extras: (
      <g fill="#34B3F1">
        <text x="236" y="92" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="22" opacity="0.7">z</text>
        <text x="256" y="72" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="30" opacity="0.85">Z</text>
      </g>
    ),
  },

  wave: {
    armBack: <path d="M214 150 q40 -8 44 -44" fill="none" stroke="#0E9F52" strokeWidth="18" strokeLinecap="round" />,
    face: (
      <g>
        <circle cx="196" cy="150" r="36" fill="#fff" />
        <circle cx="207" cy="153" r="18" fill="#0F2018" />
        <circle cx="214" cy="146" r="6" fill="#fff" />
        <path d="M168 194 q26 18 46 4" fill="none" stroke="#0F2018" strokeWidth="10" strokeLinecap="round" />
      </g>
    ),
    extras: <circle cx="262" cy="104" r="7" fill="#FFC93C" />,
  },
};
