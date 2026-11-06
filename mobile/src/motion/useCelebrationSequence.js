import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Drives a staged, skippable reveal (animation-plan.md Phase 2).
 *
 *   const seq = useCelebrationSequence([['reggie', 0], ['score', 350], ['cta', 1800]], { run })
 *   seq.reached('score')   // true once its time has come (or after skip)
 *   seq.skip()             // jump straight to the final state (tap-anywhere)
 *
 * Steps must be listed in time order (a step counts as reached once every
 * step before it has). `run` false holds the sequence (e.g. while another overlay is up). With
 * `instant` (Reduce Motion) every step is reached immediately.
 */
export function useCelebrationSequence(steps, { run = true, instant = false } = {}) {
  const [count, setCount] = useState(0)          // how many steps have been reached
  const timers = useRef([])
  const total = steps.length

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }

  useEffect(() => {
    if (!run) return
    if (instant) { setCount(total); return }
    clear()
    steps.forEach(([, ms], i) => {
      timers.current.push(setTimeout(() => setCount((c) => Math.max(c, i + 1)), ms))
    })
    return clear
    // steps is a static schedule per screen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run, instant])

  const skip = useCallback(() => { clear(); setCount(total) }, [total])

  const reached = useCallback((key) => {
    const i = steps.findIndex(([k]) => k === key)
    return i >= 0 && i < count
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  return { reached, skip, done: count >= total }
}
