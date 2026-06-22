/**
 * ReggieAnim — React wrapper for the Reggie CSS animation engine.
 *
 * Scenes available:
 *   'loading'   – seamless idle bob (loop)
 *   'celebrate' – jump + confetti rain (one-shot)
 *   'streak'    – heartbeat pulse + flame glow (loop)
 *   'welcome'   – springs up then waves hello (one-shot)
 *   'encourage' – sympathetic shake → thumbs-up (one-shot)
 *
 * Usage:
 *   <ReggieAnim scene="loading" size={160} />
 *   <ReggieAnim scene="celebrate" size={200} onEnd={() => setDone(true)} />
 */

import React, { useEffect, useRef } from 'react'

// Ensure scripts are loaded once
let scriptsLoaded = false
function ensureScripts() {
  if (scriptsLoaded || typeof window === 'undefined') return Promise.resolve()
  return new Promise((resolve) => {
    let loaded = 0
    const done = () => { if (++loaded === 2) { scriptsLoaded = true; resolve() } }
    const s1 = document.createElement('script'); s1.src = '/reggie-character.js'; s1.onload = done; document.head.appendChild(s1)
    const s2 = document.createElement('script'); s2.src = '/reggie-animations.js'; s2.onload = done; document.head.appendChild(s2)
  })
}

export default function ReggieAnim({ scene = 'loading', size = 200, style = {}, className = '', onEnd, clip }) {
  const hostRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    ensureScripts().then(() => {
      if (cancelled || !hostRef.current || !window.ReggieAnim) return
      if (animRef.current) { try { animRef.current.stop() } catch (_) {} }
      const opts = { size, loop: undefined, clip }
      const a = window.ReggieAnim.mount(hostRef.current, scene, opts)
      animRef.current = a
      if (onEnd) a.on('end', onEnd)
    })
    return () => {
      cancelled = true
      if (animRef.current) { try { animRef.current.stop() } catch (_) {} }
    }
  }, [scene, size]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={hostRef}
      className={className}
      style={{ width: size, height: size, position: 'relative', ...style }}
    />
  )
}
