import { useState, useEffect } from 'react'

/**
 * Live countdown to an ISO timestamp. Returns whole seconds remaining (>= 0),
 * ticking down once per second. Returns 0 when `isoStr` is null/empty.
 *
 * Shared by the hearts UIs (GlobalTopBar, RewardsSheet, LivesRefillGate) so the
 * "next life in mm:ss" display actually ticks instead of freezing at render.
 */
export function useCountdown(isoStr) {
  const compute = () =>
    isoStr ? Math.max(0, Math.ceil((new Date(isoStr).getTime() - Date.now()) / 1000)) : 0

  const [secs, setSecs] = useState(compute)

  useEffect(() => {
    if (!isoStr) { setSecs(0); return }
    setSecs(compute())                 // resync immediately when the target changes
    const id = setInterval(() => setSecs(compute()), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isoStr])

  return secs
}

/** Format seconds as m:ss (e.g. 93 → "1:33"). */
export function formatCountdown(s) {
  const m = Math.floor(s / 60)
  return `${m}:${String(s % 60).padStart(2, '0')}`
}
