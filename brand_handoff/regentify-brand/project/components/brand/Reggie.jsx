import React from 'react';

/**
 * Reggie — the Regentify mascot (a friendly baby dino in a graduation cap).
 * Pose variants drive the app's emotional moments: idle, celebrate, hint, streak-at-risk.
 * Pure inline SVG, transparent background, brand palette only.
 */
export function Reggie({ pose = 'happy', size = 160, className = '', style = {}, title }) {
  const P = POSES[pose] || POSES.happy;
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 320 320"
      role="img"
      aria-label={title || `Reggie the dino — ${pose}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ground shadow */}
      <ellipse cx="160" cy="298" rx="78" ry="13" fill="#0F2018" opacity="0.08" />

      {/* back spikes */}
      <g fill="#FFC93C" stroke="#FFC93C" strokeWidth="7" strokeLinejoin="round">
        <path d="M104 150 L86 108 L132 134 Z" />
        <path d="M84 196 L48 168 L98 166 Z" />
      </g>

      {/* extra arm behind (cheer/wave) */}
      {P.armBack}

      {/* body */}
      <path
        d="M150 96 C214 96 262 138 272 196 C284 202 286 226 273 235 C264 282 232 312 184 322 C172 326 160 326 146 326 C84 326 48 282 48 218 C48 140 84 96 150 96 Z"
        transform="translate(0,-22) scale(0.92)"
        fill="#1FC36B"
      />
      {/* belly */}
      <ellipse cx="150" cy="232" rx="62" ry="52" fill="#EAFBF1" />

      {/* feet */}
      <ellipse cx="118" cy="288" rx="30" ry="14" fill="#FFC93C" />
      <ellipse cx="196" cy="290" rx="30" ry="14" fill="#FFC93C" />

      {/* front arm */}
      {P.armFront || (
        <path d="M104 232 q-22 7 -25 30" fill="none" stroke="#15A95B" strokeWidth="18" strokeLinecap="round" />
      )}

      {/* face: eyes + mouth (pose-specific) */}
      {P.face}

      {/* snout nostril */}
      <circle cx="236" cy="168" r="6.5" fill="#0E7A45" />

      {/* graduation cap */}
      <g>
        <path d="M158 52 L232 82 L158 112 L84 82 Z" fill="#0F2018" />
        <circle cx="158" cy="52" r="9" fill="#FFC93C" />
        <path d="M224 86 L224 116" stroke="#FFC93C" strokeWidth="7.5" strokeLinecap="round" />
        <circle cx="224" cy="123" r="9" fill="#FFC93C" />
      </g>

      {/* accessories: sparkles / zzz / think-bubble */}
      {P.extras}
    </svg>
  );
}

const EYE_WHITE = (cx, cy, r = 36) => <circle cx={cx} cy={cy} r={r} fill="#fff" />;

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
        {/* happy upturned eye */}
        <path d="M178 150 q18 -22 36 0" fill="none" stroke="#0F2018" strokeWidth="11" strokeLinecap="round" />
        {/* open cheering mouth */}
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
        {/* eye glancing up */}
        <circle cx="196" cy="150" r="36" fill="#fff" />
        <circle cx="200" cy="140" r="17" fill="#0F2018" />
        <circle cx="206" cy="134" r="6" fill="#fff" />
        {/* small thoughtful mouth */}
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
        {/* closed sleepy eye */}
        <path d="M178 152 q18 16 36 0" fill="none" stroke="#0F2018" strokeWidth="10" strokeLinecap="round" />
        {/* tiny wavy mouth */}
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
