/* @ds-bundle: {"format":3,"namespace":"DesignSystem_756e59","components":[{"name":"Reggie","sourcePath":"components/brand/Reggie.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"ProgressBar","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"StatChip","sourcePath":"components/feedback/StatChip.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"ChoiceButton","sourcePath":"components/forms/ChoiceButton.jsx"},{"name":"LessonNode","sourcePath":"components/navigation/LessonNode.jsx"}],"sourceHashes":{"assets/reggie/reggie-character.js":"f67e0bda3ebc","components/brand/Reggie.jsx":"fd0afd237b82","components/core/Card.jsx":"ae12ba34edf5","components/feedback/ProgressBar.jsx":"b654bf182c8e","components/feedback/StatChip.jsx":"b49e5b714530","components/forms/Button.jsx":"a7d707af5a1a","components/forms/ChoiceButton.jsx":"f847ceee9b3a","components/navigation/LessonNode.jsx":"e71983bb5cf1"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_756e59 = window.DesignSystem_756e59 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/reggie/reggie-character.js
try { (() => {
/* Regentify — Reggie the Dino · free-standing in-app character generator.
   Single source of truth: the showcase page and the SVG asset exporter both
   build from window.Reggie. Same shape vocabulary as the app-icon mark
   (one big eye, mortarboard cap, XP-yellow spikes + feet, mint belly). */
(function () {
  const C = {
    bodyTop: '#34D27D',
    bodyBot: '#0E9F52',
    body: '#1FC36B',
    shade: '#16A95C',
    deep: '#0A7D40',
    belly: '#EAFBF1',
    bellyEdge: '#CDEFDC',
    yellow: '#FFC93C',
    yellowDk: '#EFAE2E',
    ink: '#0F2018',
    white: '#fff',
    capDk: '#16241D',
    slate: '#5B6B62',
    coral: '#FF5A5F',
    sky: '#34B3F1',
    violet: '#7C5CFC'
  };
  const BODY = `M252 122
C198 122 156 158 150 208
C118 234 116 290 136 326
C152 376 198 412 252 412
C306 412 352 376 368 326
C388 290 386 234 354 208
C348 158 306 122 252 122 Z`;
  const tail = () => `<path d="M150 330 C112 332 96 360 104 392 C108 408 126 410 134 396 C124 374 132 350 158 344 Z" fill="${C.shade}"/>`;
  const spikes = () => `<g fill="${C.yellow}" stroke="${C.yellow}" stroke-width="6" stroke-linejoin="round"><path d="M170 176 L150 128 L210 160 Z"/><path d="M138 236 L96 206 L160 220 Z"/></g>`;
  const feet = pose => pose === 'sleep' ? `<ellipse cx="232" cy="412" rx="46" ry="18" fill="${C.yellow}"/><ellipse cx="300" cy="406" rx="40" ry="16" fill="${C.yellowDk}"/>` : `<ellipse cx="214" cy="416" rx="38" ry="17" fill="${C.yellowDk}"/><ellipse cx="296" cy="416" rx="38" ry="17" fill="${C.yellow}"/>`;
  const bodyShape = () => `<path d="${BODY}" fill="url(#bodyG)"/><path d="M252 412 C198 412 152 376 136 326 C150 360 196 384 252 384 C308 384 354 360 368 326 C352 376 306 412 252 412 Z" fill="${C.shade}" opacity=".55"/>`;
  const belly = () => `<ellipse cx="256" cy="320" rx="86" ry="82" fill="${C.belly}"/><path d="M196 286 q-22 30 0 64" fill="none" stroke="${C.bellyEdge}" stroke-width="10" stroke-linecap="round"/>`;
  const snout = () => `<ellipse cx="356" cy="288" rx="26" ry="22" fill="${C.body}"/><circle cx="372" cy="282" r="5" fill="${C.deep}"/>`;
  function arm(key) {
    const F = C.body,
      S = C.shade;
    const A = {
      rest_l: `<path d="M150 312 C124 318 114 344 126 364 C140 372 156 360 160 342 Z" fill="${S}"/>`,
      rest_r: `<path d="M354 312 C380 318 390 344 378 364 C364 372 348 360 344 342 Z" fill="${F}"/>`,
      wave_r: `<path d="M356 286 C396 262 420 214 414 176 C410 158 392 156 382 172 C372 206 352 244 340 268 Z" fill="${F}"/><circle cx="404" cy="172" r="20" fill="${F}"/>`,
      up_l: `<path d="M150 290 C120 256 110 214 120 184 C126 168 144 168 152 184 C160 214 168 256 170 286 Z" fill="${S}"/>`,
      up_r: `<path d="M356 290 C386 256 396 214 386 184 C380 168 362 168 354 184 C346 214 338 256 340 286 Z" fill="${F}"/>`,
      think_r: `<path d="M348 366 C338 344 338 328 348 316" stroke="${F}" stroke-width="24" fill="none" stroke-linecap="round"/><circle cx="346" cy="312" r="21" fill="${F}"/>`,
      thumb_r: `<path d="M344 304 C362 314 380 312 393 300" stroke="${F}" stroke-width="27" fill="none" stroke-linecap="round"/><circle cx="395" cy="276" r="25" fill="${F}"/><rect x="386" y="234" width="17" height="36" rx="8" fill="${F}"/>`,
      droop_l: `<path d="M150 334 C126 348 120 374 134 392 C148 398 162 384 162 366 Z" fill="${S}"/>`,
      droop_r: `<path d="M354 334 C378 348 384 374 370 392 C356 398 342 384 342 366 Z" fill="${F}"/>`,
      tuck_l: `<path d="M156 344 C140 356 138 374 152 384 C164 388 174 378 172 366 Z" fill="${S}"/>`,
      tuck_r: `<path d="M348 344 C364 356 366 374 352 384 C340 388 330 378 332 366 Z" fill="${F}"/>`
    };
    return A[key] || '';
  }
  function eye(exp) {
    const cx = 298,
      cy = 226;
    const white = `<circle cx="${cx}" cy="${cy}" r="50" fill="${C.white}"/>`;
    switch (exp) {
      case 'happy':
        return `<path d="M268 236 Q298 200 328 236" fill="none" stroke="${C.ink}" stroke-width="13" stroke-linecap="round"/>`;
      case 'wink':
        return `<path d="M270 230 Q298 250 326 230" fill="none" stroke="${C.ink}" stroke-width="13" stroke-linecap="round"/>`;
      case 'look_up':
        return white + `<circle cx="${cx + 6}" cy="${cy - 16}" r="24" fill="${C.ink}"/><circle cx="${cx + 15}" cy="${cy - 24}" r="8" fill="${C.white}"/>`;
      case 'sad':
        return white + `<circle cx="${cx + 2}" cy="${cy + 10}" r="24" fill="${C.ink}"/><circle cx="${cx + 10}" cy="${cy + 3}" r="7" fill="${C.white}"/><path d="M262 196 Q286 186 312 198" fill="none" stroke="${C.deep}" stroke-width="9" stroke-linecap="round"/>`;
      case 'sleep':
        return `<path d="M270 224 Q298 244 326 224" fill="none" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/>`;
      case 'sparkle':
        return white + `<circle cx="${cx + 8}" cy="${cy + 4}" r="25" fill="${C.ink}"/><circle cx="${cx + 18}" cy="${cy - 6}" r="9" fill="${C.white}"/><circle cx="${cx - 2}" cy="${cy + 12}" r="5" fill="${C.white}"/>`;
      default:
        return white + `<circle cx="${cx + 8}" cy="${cy + 6}" r="26" fill="${C.ink}"/><circle cx="${cx + 18}" cy="${cy - 4}" r="9" fill="${C.white}"/><circle cx="${cx - 2}" cy="${cy + 14}" r="5" fill="${C.white}"/>`;
    }
  }
  function mouth(key) {
    switch (key) {
      case 'open':
        return `<path d="M296 296 Q330 296 350 300 Q336 336 312 332 Q298 328 296 296 Z" fill="${C.deep}"/><path d="M302 320 Q318 332 336 322" fill="#FF8FA0"/>`;
      case 'grin':
        return `<path d="M292 300 Q322 338 356 304" fill="none" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/>`;
      case 'frown':
        return `<path d="M300 326 Q322 308 346 324" fill="none" stroke="${C.ink}" stroke-width="11" stroke-linecap="round"/>`;
      case 'small':
        return `<ellipse cx="324" cy="314" rx="12" ry="14" fill="${C.deep}"/>`;
      default:
        return `<path d="M300 306 Q326 326 350 308" fill="none" stroke="${C.ink}" stroke-width="11" stroke-linecap="round"/>`;
    }
  }
  function cap(tilt) {
    return `<g transform="rotate(${tilt || 0} 250 120)">
      <path d="M214 118 Q252 150 292 118 L292 134 Q252 166 214 134 Z" fill="${C.capDk}"/>
      <path d="M250 80 L338 116 L250 150 L162 116 Z" fill="${C.ink}"/>
      <circle cx="250" cy="116" r="8" fill="${C.yellow}"/>
      <path d="M250 116 L330 122 L332 168" fill="none" stroke="${C.yellow}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="332" cy="176" r="11" fill="${C.yellow}"/>
    </g>`;
  }
  function props(list) {
    let s = '';
    (list || []).forEach(p => {
      if (p === 'confetti') {
        [['#FF5A5F', 120, 120, 14], ['#34B3F1', 392, 140, 12], ['#7C5CFC', 150, 90, 10], ['#FFC93C', 360, 86, 12], ['#1FC36B', 420, 220, 10], ['#FF5A5F', 96, 210, 10], ['#7C5CFC', 412, 300, 9]].forEach(([c, x, y, r]) => {
          s += `<rect x="${x}" y="${y}" width="${r * 2}" height="${r}" rx="3" fill="${c}" transform="rotate(${(x + y) % 90} ${x} ${y})"/>`;
        });
      }
      if (p === 'zzz') {
        s += `<g fill="${C.slate}" font-family="Fredoka,system-ui" font-weight="700"><text x="372" y="150" font-size="34">z</text><text x="404" y="120" font-size="46">Z</text><text x="440" y="84" font-size="60">Z</text></g>`;
      }
      if (p === 'think') {
        s += `<g fill="${C.white}" stroke="${C.bellyEdge}" stroke-width="3"><circle cx="392" cy="150" r="34"/><circle cx="356" cy="196" r="14"/><circle cx="338" cy="224" r="8"/></g><text x="392" y="161" font-size="36" text-anchor="middle" fill="${C.slate}" font-family="Fredoka,system-ui" font-weight="700">?</text>`;
      }
      if (p === 'tear') {
        s += `<path d="M276 250 q-10 22 0 34 q12 -2 12 -16 q0 -10 -12 -18 Z" fill="${C.sky}"/>`;
      }
      if (p === 'sparkles') {
        [['#FFC93C', 120, 140, 16], ['#34B3F1', 402, 182, 12], ['#7C5CFC', 150, 300, 10]].forEach(([c, x, y, r]) => {
          s += `<path d="M${x} ${y - r} L${x + r * 0.28} ${y - r * 0.28} L${x + r} ${y} L${x + r * 0.28} ${y + r * 0.28} L${x} ${y + r} L${x - r * 0.28} ${y + r * 0.28} L${x - r} ${y} L${x - r * 0.28} ${y - r * 0.28} Z" fill="${c}"/>`;
        });
      }
    });
    return s;
  }
  function reggie(o) {
    o = o || {};
    const vb = o.viewBox || '0 0 512 512';
    const layers = [`<defs><linearGradient id="bodyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.bodyTop}"/><stop offset="1" stop-color="${C.bodyBot}"/></linearGradient></defs>`, props(o.propsBehind), tail(), spikes(), o.armL ? arm(o.armL) : '', bodyShape(), feet(o.pose), belly(), snout(), cap(o.capTilt), eye(o.eye), mouth(o.mouth), o.armR ? arm(o.armR) : '', props(o.props)];
    return `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${layers.join('')}</svg>`;
  }

  // circular face avatar — cropped viewBox onto the head
  function avatar(o) {
    o = o || {};
    return reggie(Object.assign({
      viewBox: '112 64 296 296',
      armL: 'rest_l',
      armR: 'rest_r'
    }, o));
  }
  const POSES = {
    idle: {
      eye: 'open',
      mouth: 'smile',
      armL: 'rest_l',
      armR: 'rest_r'
    },
    wave: {
      eye: 'happy',
      mouth: 'grin',
      armL: 'rest_l',
      armR: 'wave_r'
    },
    celebrate: {
      eye: 'happy',
      mouth: 'open',
      armL: 'up_l',
      armR: 'up_r',
      props: ['confetti']
    },
    think: {
      eye: 'look_up',
      mouth: 'small',
      armL: 'rest_l',
      armR: 'think_r',
      props: ['think']
    },
    encourage: {
      eye: 'wink',
      mouth: 'grin',
      armL: 'rest_l',
      armR: 'thumb_r',
      props: ['sparkles']
    },
    oops: {
      eye: 'sad',
      mouth: 'frown',
      armL: 'droop_l',
      armR: 'droop_r',
      props: ['tear']
    },
    sleep: {
      eye: 'sleep',
      mouth: 'small',
      armL: 'tuck_l',
      armR: 'tuck_r',
      pose: 'sleep',
      props: ['zzz']
    }
  };
  window.Reggie = {
    reggie,
    avatar,
    POSES,
    C
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/reggie/reggie-character.js", error: String((e && e.message) || e) }); }

// components/brand/Reggie.jsx
try { (() => {
/**
 * Reggie — the Regentify mascot (a friendly baby dino in a graduation cap).
 * Pose variants drive the app's emotional moments: idle, celebrate, hint, streak-at-risk.
 * Pure inline SVG, transparent background, brand palette only.
 */
function Reggie({
  pose = 'happy',
  size = 160,
  className = '',
  style = {},
  title
}) {
  const P = POSES[pose] || POSES.happy;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    style: style,
    width: size,
    height: size,
    viewBox: "0 0 320 320",
    role: "img",
    "aria-label": title || `Reggie the dino — ${pose}`,
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "160",
    cy: "298",
    rx: "78",
    ry: "13",
    fill: "#0F2018",
    opacity: "0.08"
  }), /*#__PURE__*/React.createElement("g", {
    fill: "#FFC93C",
    stroke: "#FFC93C",
    strokeWidth: "7",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M104 150 L86 108 L132 134 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M84 196 L48 168 L98 166 Z"
  })), P.armBack, /*#__PURE__*/React.createElement("path", {
    d: "M150 96 C214 96 262 138 272 196 C284 202 286 226 273 235 C264 282 232 312 184 322 C172 326 160 326 146 326 C84 326 48 282 48 218 C48 140 84 96 150 96 Z",
    transform: "translate(0,-22) scale(0.92)",
    fill: "#1FC36B"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "150",
    cy: "232",
    rx: "62",
    ry: "52",
    fill: "#EAFBF1"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "118",
    cy: "288",
    rx: "30",
    ry: "14",
    fill: "#FFC93C"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "196",
    cy: "290",
    rx: "30",
    ry: "14",
    fill: "#FFC93C"
  }), P.armFront || /*#__PURE__*/React.createElement("path", {
    d: "M104 232 q-22 7 -25 30",
    fill: "none",
    stroke: "#15A95B",
    strokeWidth: "18",
    strokeLinecap: "round"
  }), P.face, /*#__PURE__*/React.createElement("circle", {
    cx: "236",
    cy: "168",
    r: "6.5",
    fill: "#0E7A45"
  }), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M158 52 L232 82 L158 112 L84 82 Z",
    fill: "#0F2018"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "158",
    cy: "52",
    r: "9",
    fill: "#FFC93C"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M224 86 L224 116",
    stroke: "#FFC93C",
    strokeWidth: "7.5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "224",
    cy: "123",
    r: "9",
    fill: "#FFC93C"
  })), P.extras);
}
const EYE_WHITE = (cx, cy, r = 36) => /*#__PURE__*/React.createElement("circle", {
  cx: cx,
  cy: cy,
  r: r,
  fill: "#fff"
});
const POSES = {
  happy: {
    face: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "196",
      cy: "150",
      r: "36",
      fill: "#fff"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "207",
      cy: "155",
      r: "18",
      fill: "#0F2018"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "214",
      cy: "148",
      r: "6",
      fill: "#fff"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M168 196 q26 16 46 3",
      fill: "none",
      stroke: "#0F2018",
      strokeWidth: "10",
      strokeLinecap: "round"
    }))
  },
  cheer: {
    armFront: /*#__PURE__*/React.createElement("path", {
      d: "M104 214 q-30 -22 -22 -54",
      fill: "none",
      stroke: "#15A95B",
      strokeWidth: "18",
      strokeLinecap: "round"
    }),
    armBack: /*#__PURE__*/React.createElement("path", {
      d: "M214 150 q34 -16 40 -50",
      fill: "none",
      stroke: "#0E9F52",
      strokeWidth: "18",
      strokeLinecap: "round"
    }),
    face: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M178 150 q18 -22 36 0",
      fill: "none",
      stroke: "#0F2018",
      strokeWidth: "11",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M170 188 q26 4 44 0 q-6 30 -22 30 q-16 0 -22 -30 Z",
      fill: "#0F2018"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M176 206 q14 10 30 0",
      fill: "#FF7A85"
    })),
    extras: /*#__PURE__*/React.createElement("g", {
      fill: "#FFC93C"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M70 96 l5 13 13 5 -13 5 -5 13 -5 -13 -13 -5 13 -5 Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M252 70 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "66",
      cy: "170",
      r: "5"
    }))
  },
  think: {
    armFront: /*#__PURE__*/React.createElement("path", {
      d: "M150 244 q42 6 60 -16",
      fill: "none",
      stroke: "#15A95B",
      strokeWidth: "18",
      strokeLinecap: "round"
    }),
    face: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "196",
      cy: "150",
      r: "36",
      fill: "#fff"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "200",
      cy: "140",
      r: "17",
      fill: "#0F2018"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "206",
      cy: "134",
      r: "6",
      fill: "#fff"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M176 200 q14 6 30 2",
      fill: "none",
      stroke: "#0F2018",
      strokeWidth: "9",
      strokeLinecap: "round"
    })),
    extras: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "250",
      cy: "120",
      r: "7",
      fill: "#34B3F1",
      opacity: "0.5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "268",
      cy: "100",
      r: "10",
      fill: "#34B3F1",
      opacity: "0.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: "278",
      y: "86",
      fontFamily: "Fredoka, sans-serif",
      fontWeight: "700",
      fontSize: "34",
      fill: "#0E9F52"
    }, "?"))
  },
  sleepy: {
    armFront: /*#__PURE__*/React.createElement("path", {
      d: "M104 236 q-20 10 -20 32",
      fill: "none",
      stroke: "#15A95B",
      strokeWidth: "18",
      strokeLinecap: "round"
    }),
    face: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M178 152 q18 16 36 0",
      fill: "none",
      stroke: "#0F2018",
      strokeWidth: "10",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M182 198 q10 -7 18 0 q8 7 16 0",
      fill: "none",
      stroke: "#0F2018",
      strokeWidth: "8",
      strokeLinecap: "round"
    })),
    extras: /*#__PURE__*/React.createElement("g", {
      fill: "#34B3F1"
    }, /*#__PURE__*/React.createElement("text", {
      x: "236",
      y: "92",
      fontFamily: "Fredoka, sans-serif",
      fontWeight: "700",
      fontSize: "22",
      opacity: "0.7"
    }, "z"), /*#__PURE__*/React.createElement("text", {
      x: "256",
      y: "72",
      fontFamily: "Fredoka, sans-serif",
      fontWeight: "700",
      fontSize: "30",
      opacity: "0.85"
    }, "Z"))
  },
  wave: {
    armBack: /*#__PURE__*/React.createElement("path", {
      d: "M214 150 q40 -8 44 -44",
      fill: "none",
      stroke: "#0E9F52",
      strokeWidth: "18",
      strokeLinecap: "round"
    }),
    face: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "196",
      cy: "150",
      r: "36",
      fill: "#fff"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "207",
      cy: "153",
      r: "18",
      fill: "#0F2018"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "214",
      cy: "146",
      r: "6",
      fill: "#fff"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M168 194 q26 18 46 4",
      fill: "none",
      stroke: "#0F2018",
      strokeWidth: "10",
      strokeLinecap: "round"
    })),
    extras: /*#__PURE__*/React.createElement("circle", {
      cx: "262",
      cy: "104",
      r: "7",
      fill: "#FFC93C"
    })
  }
};
Object.assign(__ds_scope, { Reggie });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Reggie.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rgf-card{
  background: var(--paper, #fff);
  border: 1px solid var(--line, #E3EDE7);
  border-radius: var(--r-xl, 22px);
  box-shadow: var(--shadow-card, 0 10px 30px rgba(15,32,24,.08));
}
.rgf-card--selected{ border: 2px solid var(--spark-green, #1FC36B); }
.rgf-card--interactive{ cursor: pointer; transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; }
.rgf-card--interactive:hover{
  transform: translateY(-2px);
  border-color: var(--spark-green, #1FC36B);
  box-shadow: var(--shadow-float, 0 14px 40px rgba(15,32,24,.12));
}
.rgf-card--interactive:active{ transform: translateY(0); }
`;
let injected = false;
function inject() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-rgf', 'card');
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Card — the soft white surface used everywhere. Optional selected (green border)
 * and interactive (hover lift) modes.
 */
function Card({
  selected = false,
  interactive = false,
  pad = 22,
  className = '',
  style = {},
  children,
  ...rest
}) {
  inject();
  const cls = ['rgf-card', selected ? 'rgf-card--selected' : '', interactive ? 'rgf-card--interactive' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    style: {
      padding: pad,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressBar.jsx
try { (() => {
/**
 * ProgressBar — mint track with a green-gradient fill. The everyday progress meter
 * for lessons, units, and quizzes.
 */
function ProgressBar({
  value = 0,
  label,
  count,
  showMeta = true,
  height = 14,
  style = {}
}) {
  const pct = Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, showMeta && (label || count) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: "var(--font-body, 'Nunito', sans-serif)",
      fontWeight: 700,
      fontSize: 13,
      color: 'var(--slate, #5B6B62)'
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", null, count)), /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      background: 'var(--mint-2, #D6F5E3)',
      borderRadius: 'var(--r-pill, 999px)',
      overflow: 'hidden',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      background: 'linear-gradient(90deg, var(--forest, #0E9F52), var(--spark-green, #1FC36B))',
      borderRadius: 'var(--r-pill, 999px)',
      transition: 'width .4s ease'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/StatChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PRESETS = {
  xp: {
    icon: '🪙',
    color: '#0A7D40',
    tint: 'rgba(31,195,107,.10)'
  },
  streak: {
    icon: '🔥',
    color: '#FF5A5F',
    tint: 'rgba(255,90,95,.10)'
  },
  lives: {
    icon: '❤️',
    color: '#FF5A5F',
    tint: 'rgba(255,90,95,.10)'
  },
  pro: {
    icon: '⭐',
    color: '#7C5CFC',
    tint: 'rgba(124,92,252,.12)'
  },
  info: {
    icon: 'ℹ️',
    color: '#34B3F1',
    tint: 'rgba(52,179,241,.12)'
  }
};

/**
 * StatChip — a gamification pill. Each metric owns one accent color.
 * Use `kind` for a preset (xp/streak/lives/pro/info) or pass your own icon/color.
 */
function StatChip({
  kind = 'xp',
  value,
  icon,
  color,
  solid = false,
  style = {},
  ...rest
}) {
  const p = PRESETS[kind] || PRESETS.xp;
  const ic = icon ?? p.icon;
  const col = color ?? p.color;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      background: solid ? p.tint : '#fff',
      border: `1px solid ${solid ? 'transparent' : 'var(--line, #E3EDE7)'}`,
      borderRadius: 'var(--r-pill, 999px)',
      padding: '8px 15px',
      fontFamily: "var(--font-body, 'Nunito', sans-serif)",
      fontWeight: 800,
      fontSize: 14,
      color: col,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontSize: '1.05em',
      lineHeight: 1
    }
  }, ic), value);
}
Object.assign(__ds_scope, { StatChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/StatChip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rgf-btn{
  font-family: var(--font-display, 'Fredoka', sans-serif);
  font-weight: 600; letter-spacing: .02em;
  border: none; cursor: pointer; color: #fff;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  border-radius: var(--r-btn, 16px);
  transition: transform .06s ease, filter .15s ease, box-shadow .15s ease;
  -webkit-tap-highlight-color: transparent; user-select: none;
}
.rgf-btn--md{ padding: 14px 26px; font-size: 16px; }
.rgf-btn--lg{ padding: 17px 34px; font-size: 19px; }
.rgf-btn--sm{ padding: 10px 18px; font-size: 14px; }
.rgf-btn--full{ width: 100%; }

.rgf-btn--primary{ background: var(--spark-green, #1FC36B); box-shadow: var(--pop-green, 0 5px 0 #0E9F52); }
.rgf-btn--primary:hover{ filter: brightness(1.04); }
.rgf-btn--secondary{ background: #fff; color: var(--green-deep, #0A7D40); border: 1px solid var(--line, #E3EDE7); box-shadow: var(--pop-grey, 0 5px 0 #E3EDE7); }
.rgf-btn--secondary:hover{ background: var(--mint-wash, #EAFBF1); }
.rgf-btn--pro{ background: var(--violet, #7C5CFC); box-shadow: var(--pop-violet, 0 5px 0 #5b3fd1); }
.rgf-btn--pro:hover{ filter: brightness(1.05); }
.rgf-btn--danger{ background: var(--coral, #FF5A5F); box-shadow: var(--pop-coral, 0 5px 0 #d8403f); }

.rgf-btn:active:not(:disabled){ transform: translateY(3px); box-shadow: 0 2px 0 var(--shadow-pop-color, transparent); }
.rgf-btn--primary:active:not(:disabled){ box-shadow: 0 2px 0 var(--forest,#0E9F52); }
.rgf-btn--secondary:active:not(:disabled){ box-shadow: 0 2px 0 var(--line,#E3EDE7); }
.rgf-btn--pro:active:not(:disabled){ box-shadow: 0 2px 0 #5b3fd1; }
.rgf-btn--danger:active:not(:disabled){ box-shadow: 0 2px 0 #d8403f; }

.rgf-btn:disabled{ opacity: .5; cursor: not-allowed; box-shadow: none; transform: none; }
`;
let injected = false;
function inject() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-rgf', 'button');
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Button — the signature chunky, tappable Regentify button with a solid "pop" shadow.
 */
function Button({
  variant = 'primary',
  size = 'md',
  full = false,
  icon = null,
  disabled = false,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  inject();
  const cls = ['rgf-btn', `rgf-btn--${variant}`, `rgf-btn--${size}`, full ? 'rgf-btn--full' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls,
    disabled: disabled
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'inline-flex',
      fontSize: '1.1em'
    }
  }, icon), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/ChoiceButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rgf-choice{
  display: flex; align-items: flex-start; gap: 12px; width: 100%;
  background: #fff; border: 2px solid var(--line, #E3EDE7);
  border-radius: var(--r-lg, 18px); padding: 14px 16px;
  cursor: pointer; text-align: left; color: var(--ink, #0F2018);
  font-family: var(--font-body, 'Nunito', sans-serif); font-weight: 700; font-size: 15px;
  transition: border-color .15s, background .15s, transform .12s;
  -webkit-tap-highlight-color: transparent;
}
.rgf-choice:hover:not(:disabled):not(.is-correct):not(.is-wrong){
  border-color: var(--spark-green, #1FC36B); background: var(--mint-wash, #EAFBF1); transform: translateX(3px);
}
.rgf-choice:active:not(:disabled){ transform: translateX(1px); }
.rgf-choice:disabled{ cursor: default; }
.rgf-choice.is-correct{ border-color: var(--spark-green, #1FC36B); background: rgba(31,195,107,.12); }
.rgf-choice.is-wrong{ border-color: var(--coral, #FF5A5F); background: rgba(255,90,95,.10); }
.rgf-choice.is-dim{ opacity: .45; }

.rgf-choice__label{
  flex-shrink: 0; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
  background: var(--mint-2, #D6F5E3); color: var(--green-deep, #0A7D40);
  border-radius: var(--r-sm, 10px); font-family: var(--font-display, 'Fredoka', sans-serif);
  font-weight: 700; font-size: 13px;
}
.rgf-choice.is-correct .rgf-choice__label{ background: var(--spark-green, #1FC36B); color: #fff; }
.rgf-choice.is-wrong   .rgf-choice__label{ background: var(--coral, #FF5A5F); color: #fff; }
.rgf-choice__text{ line-height: 1.45; padding-top: 3px; }
`;
let injected = false;
function inject() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-rgf', 'choice');
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * ChoiceButton — a single multiple-choice answer row used in quizzes.
 * Drive feedback by switching `state` after an answer is picked.
 */
function ChoiceButton({
  label,
  state = 'idle',
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  inject();
  const cls = ['rgf-choice', state === 'correct' ? 'is-correct' : '', state === 'wrong' ? 'is-wrong' : '', state === 'dim' ? 'is-dim' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    disabled: disabled
  }, rest), label != null && /*#__PURE__*/React.createElement("span", {
    className: "rgf-choice__label"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "rgf-choice__text"
  }, children));
}
Object.assign(__ds_scope, { ChoiceButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ChoiceButton.jsx", error: String((e && e.message) || e) }); }

// components/navigation/LessonNode.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * LessonNode — a circular node on the Duolingo-style study path.
 * `done` = filled green w/ glow, `active` = pulsing brand ring (the next lesson),
 * `locked` = greyed. Show an emoji/number inside.
 */
function LessonNode({
  state = 'active',
  icon = '★',
  label,
  color = '#1FC36B',
  size = 72,
  onClick,
  style = {},
  ...rest
}) {
  const done = state === 'done';
  const locked = state === 'locked';
  const active = state === 'active';
  const ring = locked ? '#C7D6CD' : color;
  const bg = done ? `linear-gradient(135deg, ${color}, var(--forest, #0E9F52))` : locked ? 'var(--mint-2, #D6F5E3)' : '#fff';
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: locked ? undefined : onClick,
    disabled: locked,
    title: label,
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      border: 'none',
      background: bg,
      boxShadow: `0 0 0 4px ${ring}${done ? '' : ''}, ${done ? `0 6px 16px ${color}55` : '0 4px 0 ' + (locked ? '#C7D6CD' : color)}`,
      outlineOffset: 2,
      cursor: locked ? 'not-allowed' : 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1,
      fontFamily: "var(--font-display, 'Fredoka', sans-serif)",
      fontWeight: 700,
      transition: 'transform .12s ease',
      opacity: locked ? 0.85 : 1,
      ...style
    },
    onMouseDown: e => {
      if (!locked) e.currentTarget.style.transform = 'translateY(3px)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'translateY(0)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'translateY(0)';
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size * 0.34,
      lineHeight: 1,
      color: done ? '#fff' : locked ? '#8FA89A' : 'var(--ink,#0F2018)'
    }
  }, locked ? '🔒' : icon), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: done ? 'rgba(255,255,255,.9)' : 'var(--slate,#5B6B62)'
    }
  }, label));
}
Object.assign(__ds_scope, { LessonNode });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/LessonNode.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Reggie = __ds_scope.Reggie;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.StatChip = __ds_scope.StatChip;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ChoiceButton = __ds_scope.ChoiceButton;

__ds_ns.LessonNode = __ds_scope.LessonNode;

})();
