/* Regentify — Reggie Animations · in-app motion module.
   Bouncy, springy, Duolingo-style scene player built on window.Reggie.
   Chromebook-friendly: pure CSS transforms + rAF, no libraries, GPU-cheap.

   USAGE (in app):
     <script src="assets/reggie/reggie-character.js"></script>
     <script src="assets/reggie/reggie-animations.js"></script>
     const a = ReggieAnim.mount(hostEl, 'celebrate', { loop:false, size:240 });
     a.replay();           // play the one-shot again
     a.pause(); a.play();  // control playback
     a.seek(0.5);          // scrub to 50% (0..1)
     a.setLoop(true);      // toggle seamless loop
     a.on('end', () => …); // fires when a one-shot finishes
     a.destroy();          // tear down

   SCENES: loading · celebrate · streak · welcome · encourage
*/
(function () {
  const R = window.Reggie;
  if (!R) { console.error('ReggieAnim: load reggie-character.js first'); return; }

  /* ---------- math + easing ---------- */
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const seg = (p, a, b) => clamp((p - a) / (b - a), 0, 1);
  const ease = {
    out:  t => 1 - Math.pow(1 - t, 3),
    in:   t => t * t * t,
    inOut:t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    outBack: t => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
    outElastic: t => { const c4 = (2 * Math.PI) / 3; return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1; },
  };

  /* ---------- extra poses (no static props — DOM particles do the sparkle) ---------- */
  const P = Object.assign({}, R.POSES, {
    cheer:  { eye: 'happy',   mouth: 'open',  armL: 'up_l',   armR: 'up_r' },
    hooray: { eye: 'sparkle', mouth: 'open',  armL: 'up_l',   armR: 'up_r' },
    thumbs: { eye: 'wink',    mouth: 'grin',  armL: 'rest_l', armR: 'thumb_r' },
    hi:     { eye: 'happy',   mouth: 'grin',  armL: 'rest_l', armR: 'wave_r' },
  });

  /* ---------- particle factories ---------- */
  function confetti(layer, arr) {
    const cols = ['#FF5A5F', '#34B3F1', '#7C5CFC', '#FFC93C', '#1FC36B', '#FF8FA0'];
    for (let i = 0; i < 46; i++) {
      const w = 6 + Math.random() * 7, h = 9 + Math.random() * 9, el = document.createElement('div');
      Object.assign(el.style, { position: 'absolute', top: '0', left: '0', width: w + 'px', height: h + 'px',
        background: cols[i % cols.length], borderRadius: Math.random() < 0.4 ? '50%' : '2px', opacity: '0', willChange: 'transform,opacity' });
      layer.appendChild(el);
      arr.push({ el, kind: 'confetti', x: 8 + Math.random() * 84, delay: Math.random() * 0.22,
        drift: (Math.random() - 0.5) * 90, sway: 6 + Math.random() * 16, spin: (Math.random() < 0.5 ? -1 : 1) * (300 + Math.random() * 600), fall: 0.78 + Math.random() * 0.5 });
    }
  }
  function sparkles(layer, arr) {
    const cols = ['#FFC93C', '#34B3F1', '#7C5CFC', '#1FC36B', '#FF5A5F'];
    for (let i = 0; i < 8; i++) {
      const el = document.createElement('div'); el.textContent = '✦';
      Object.assign(el.style, { position: 'absolute', left: '50%', top: '46%', fontSize: (13 + Math.random() * 14) + 'px',
        color: cols[i % cols.length], transform: 'translate(-50%,-50%)', willChange: 'transform,opacity', opacity: '0' });
      layer.appendChild(el);
      arr.push({ el, kind: 'spark', ang: (i / 8) * Math.PI * 2, rad: 86 + Math.random() * 46, ph: Math.random(), sp: 0.6 + Math.random() * 0.8 });
    }
  }

  /* ---------- scenes ---------- */
  const SCENES = {
    /* seamless idle bob — loading / between screens */
    loading: {
      duration: 1150, loop: true, pose: 'idle',
      frame(p, c) {
        c.setPose('idle');
        const y = -7 - 7 * Math.sin(p * Math.PI * 2);
        const sy = 1 - 0.045 * Math.cos(p * Math.PI * 2);
        const rot = Math.sin(p * Math.PI * 2) * 2.5;
        c.figure.style.transform = `translateY(${y}px) rotate(${rot}deg) scale(${2 - sy},${sy})`;
        c.glow.style.opacity = '0';
      },
    },

    /* lesson-complete celebration — jump + confetti rain */
    celebrate: {
      duration: 1700, loop: false, pose: 'cheer', particles: confetti,
      frame(p, c) {
        c.setPose('cheer');
        let y, sx = 1, sy = 1;
        if (p < 0.12) { const t = seg(p, 0, 0.12); y = lerp(0, 10, t); sy = lerp(1, 0.82, t); sx = lerp(1, 1.16, t); }
        else if (p < 0.42) { const t = ease.out(seg(p, 0.12, 0.42)); y = lerp(10, -96, t); sy = lerp(0.82, 1.1, t); sx = lerp(1.16, 0.95, t); }
        else if (p < 0.56) { const t = ease.in(seg(p, 0.42, 0.56)); y = lerp(-96, 0, t); const l = seg(p, 0.48, 0.56); sy = lerp(1.1, 0.8, l); sx = lerp(0.95, 1.18, l); }
        else if (p < 0.74) { const t = seg(p, 0.56, 0.74); y = -28 * Math.sin(t * Math.PI); const l = seg(p, 0.56, 0.64); sy = lerp(0.8, 1, l); sx = lerp(1.18, 1, l); }
        else { const t = seg(p, 0.74, 1); y = -5 * Math.sin(t * Math.PI); }
        c.figure.style.transform = `translateY(${y}px) scale(${sx},${sy})`;
        // soft mint pop on launch
        c.glow.style.background = 'radial-gradient(circle, rgba(31,195,107,.35), rgba(31,195,107,0) 70%)';
        c.glow.style.opacity = (p > 0.12 && p < 0.5 ? (1 - Math.abs(p - 0.3) / 0.2) * 0.9 : 0).toString();
        // confetti rain from apex
        const H = c.host.clientHeight, W = c.host.clientWidth, spawn = 0.2;
        c.particles.forEach(pt => {
          const lp = (p - spawn - pt.delay * 0.12) / (1 - spawn);
          if (lp <= 0) { pt.el.style.opacity = '0'; return; }
          const t = Math.min(1, lp);
          const yy = -24 + (t * t * 0.62 + t * 0.38) * H * pt.fall;
          const x = pt.x / 100 * W + Math.sin(t * Math.PI * 2.4) * pt.sway + pt.drift * t;
          pt.el.style.opacity = (t > 0.86 ? (1 - (t - 0.86) / 0.14) : 1).toString();
          pt.el.style.transform = `translate(${x}px,${yy}px) rotate(${pt.spin * t}deg)`;
        });
      },
    },

    /* streak / milestone reward — heartbeat pulse + flame glow + sparkles */
    streak: {
      duration: 1500, loop: true, pose: 'hooray', particles: sparkles,
      initFlame(c) {
        const f = document.createElement('div'); f.textContent = '🔥';
        Object.assign(f.style, { position: 'absolute', left: '50%', bottom: '2%', fontSize: (c.size * 0.34) + 'px',
          transform: 'translateX(-50%)', zIndex: '1', filter: 'drop-shadow(0 0 14px rgba(255,150,40,.6))', willChange: 'transform' });
        c.host.insertBefore(f, c.figure); c._flame = f;
      },
      frame(p, c) {
        if (!c._flame) SCENES.streak.initFlame(c);
        c.setPose('hooray');
        const beat = Math.pow(Math.sin(p * Math.PI * 2), 2);
        const y = -beat * 9;
        c.figure.style.transform = `translateY(${y}px) scale(${1 + 0.06 * beat})`;
        c.glow.style.background = 'radial-gradient(circle, rgba(255,160,50,.5), rgba(255,201,60,0) 68%)';
        c.glow.style.opacity = (0.35 + 0.55 * beat).toString();
        const flick = Math.sin(p * Math.PI * 22) * 4;
        c._flame.style.transform = `translateX(-50%) scale(${1 + 0.22 * beat}) rotate(${flick}deg)`;
        c.particles.forEach((s, i) => {
          const tw = Math.pow(Math.sin((p * s.sp + s.ph) * Math.PI * 2), 2);
          const ang = s.ang + p * Math.PI * 0.5;
          const x = Math.cos(ang) * s.rad, yy = Math.sin(ang) * s.rad * 0.7 - 10;
          s.el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${yy}px)) scale(${0.4 + tw})`;
          s.el.style.opacity = (0.15 + 0.85 * tw).toString();
        });
      },
    },

    /* onboarding welcome — springs up from below, then waves hello */
    welcome: {
      duration: 1700, loop: false, pose: 'hi',
      frame(p, c) {
        c.setPose('hi');
        let y, sc, op, rot = 0;
        if (p < 0.46) { const t = ease.outBack(seg(p, 0, 0.46)); y = lerp(150, 0, t); sc = lerp(0.6, 1, t); op = seg(p, 0, 0.2); }
        else { const t = seg(p, 0.46, 1); y = 0; sc = 1; op = 1; rot = Math.sin(t * Math.PI * 6) * 11 * (1 - t * 0.7); }
        c.figure.style.transformOrigin = '50% 80%';
        c.figure.style.transform = `translateY(${y}px) rotate(${rot}deg) scale(${sc})`;
        c.figure.style.opacity = op;
        c.glow.style.background = 'radial-gradient(circle, rgba(31,195,107,.28), rgba(31,195,107,0) 70%)';
        c.glow.style.opacity = (op * 0.8).toString();
      },
    },

    /* wrong-answer encouragement — sympathetic shake, then a thumbs-up rebound */
    encourage: {
      duration: 1600, loop: false, pose: 'oops',
      frame(p, c) {
        let y = 0, rot = 0, sc = 1;
        if (p < 0.5) { c.setPose('oops'); const t = seg(p, 0, 0.5); rot = Math.sin(t * Math.PI * 5) * 9 * (1 - t * 0.35); y = 6 * Math.min(1, t * 2.2); }
        else { c.setPose('thumbs'); const t = ease.outBack(seg(p, 0.5, 0.82)); y = lerp(6, -16, t); sc = lerp(1, 1.06, Math.sin(seg(p, 0.5, 0.78) * Math.PI)); const s = seg(p, 0.82, 1); y = lerp(-16, 0, s) - (s < 1 ? 0 : 0); }
        c.figure.style.transformOrigin = '50% 88%';
        c.figure.style.transform = `translateY(${y}px) rotate(${rot}deg) scale(${sc})`;
        c.figure.style.opacity = 1;
        c.glow.style.opacity = (p > 0.5 ? (1 - seg(p, 0.5, 1)) * 0.5 : 0).toString();
        c.glow.style.background = 'radial-gradient(circle, rgba(255,201,60,.4), rgba(255,201,60,0) 70%)';
      },
    },
  };

  /* ---------- mount ---------- */
  function mount(host, key, opts) {
    opts = opts || {};
    const scene = SCENES[key];
    if (!scene) throw new Error('ReggieAnim: unknown scene "' + key + '"');
    host.innerHTML = '';
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    host.style.overflow = opts.clip === false ? 'visible' : 'hidden';

    const glow = document.createElement('div');
    Object.assign(glow.style, { position: 'absolute', left: '50%', top: '52%', width: '78%', paddingBottom: '78%',
      transform: 'translate(-50%,-50%)', borderRadius: '50%', opacity: '0', zIndex: '0', pointerEvents: 'none' });

    const size = opts.size || 220;
    const figure = document.createElement('div');
    Object.assign(figure.style, { position: 'absolute', left: '50%', bottom: '7%', width: size + 'px', height: size + 'px',
      marginLeft: (-size / 2) + 'px', transformOrigin: '50% 92%', zIndex: '2', willChange: 'transform,opacity' });

    const pLayer = document.createElement('div');
    Object.assign(pLayer.style, { position: 'absolute', inset: '0', pointerEvents: 'none', zIndex: '3' });

    host.append(glow, figure, pLayer);

    let curPose = null;
    function setPose(poseKey) {
      if (poseKey === curPose) return;
      curPose = poseKey;
      figure.innerHTML = R.reggie(P[poseKey] || P.idle);
      const svg = figure.firstChild;
      if (svg) { svg.style.width = '100%'; svg.style.height = '100%'; svg.style.display = 'block'; }
    }

    const particles = [];
    if (scene.particles) scene.particles(pLayer, particles, opts);

    const ctx = { host, figure, glow, pLayer, particles, setPose, size };
    scene.frame(0, ctx);

    let progress = 0, playing = false, speed = opts.speed || 1, last = 0, raf = null;
    let loop = opts.loop != null ? opts.loop : scene.loop;
    const listeners = {};
    const emit = e => (listeners[e] || []).forEach(f => f(progress));
    const render = p => scene.frame(p, ctx);

    function tick(now) {
      if (!last) last = now;
      const dt = (now - last); last = now;
      if (playing) {
        progress += dt * speed / scene.duration;
        if (progress >= 1) { if (loop) { progress %= 1; emit('loop'); } else { progress = 1; playing = false; emit('end'); } }
      }
      render(progress);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    const ctrl = {
      duration: scene.duration, scene: key,
      play() { if (progress >= 1) progress = 0; playing = true; last = 0; emit('play'); return ctrl; },
      pause() { playing = false; emit('pause'); return ctrl; },
      toggle() { return playing ? ctrl.pause() : ctrl.play(); },
      replay() { progress = 0; playing = true; last = 0; emit('play'); return ctrl; },
      seek(p) { progress = clamp(p, 0, 1); render(progress); emit('seek'); return ctrl; },
      setLoop(b) { loop = !!b; return ctrl; },
      setSpeed(s) { speed = s; return ctrl; },
      on(e, f) { (listeners[e] = listeners[e] || []).push(f); return ctrl; },
      get progress() { return progress; },
      get playing() { return playing; },
      get loop() { return loop; },
      destroy() { cancelAnimationFrame(raf); host.innerHTML = ''; },
    };
    if (opts.autoplay !== false) ctrl.play();
    return ctrl;
  }

  window.ReggieAnim = {
    mount,
    scenes: Object.keys(SCENES),
    meta: {
      loading:   { label: 'Loading bounce',  emoji: '⏳', note: 'Seamless idle bob for loaders & between-screen waits.', loop: true },
      celebrate: { label: 'Lesson complete', emoji: '🎉', note: 'Squash-jump with confetti rain. Plays on finish.',     loop: false },
      streak:    { label: 'Streak reward',   emoji: '🔥', note: 'Heartbeat pulse, flame glow & twinkling sparkles.',     loop: true },
      welcome:   { label: 'Onboarding wave', emoji: '👋', note: 'Springs up from below, then waves hello.',             loop: false },
      encourage: { label: 'Wrong answer',    emoji: '💪', note: 'Sympathetic shake, then a reassuring thumbs-up.',       loop: false },
    },
  };
})();
