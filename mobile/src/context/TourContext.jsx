import React, { createContext, useContext, useRef, useState, useEffect, useCallback, useMemo } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from './AuthContext'

/**
 * TourContext — first-run spotlight guided tour.
 *
 * Replaces the old full-screen intro carousel. UI elements opt in as tour
 * targets via `useTourTarget(id)` (spread the returned `{ ref, collapsable }`
 * onto the element). A single `<TourHost/>` (mounted at the TabNavigator root)
 * reads this context, measures the active step's target with measureInWindow,
 * dims around it, and shows a coachmark.
 *
 * Completion mirrors the intro flag exactly: AsyncStorage `@tour_done_v1_<uid>`
 * + Firestore `users/{uid}/meta/tour` (offline-first with cross-device fallback).
 */

export const tourDoneKey = (uid) => `@tour_done_v1_${uid}`

// id === null → centered card with no spotlight hole (the closing step).
export const TOUR_STEPS = [
  { id: 'subject', placement: 'bottom', title: 'Subject & goal',   body: 'Tap here to switch subjects, set a target score, and watch your 🎯 predicted score climb as you study.' },
  { id: 'streak',  placement: 'bottom', title: 'Your streak',      body: 'Study every day to keep your 🔥 streak alive. Miss a day and a freeze can save it.' },
  { id: 'lives',   placement: 'bottom', title: 'Energy',           body: 'A miss uses a bit of energy ❤️. It recharges over time — or go unlimited with Premium.' },
  { id: 'rp',      placement: 'bottom', title: 'Regents Points',   body: 'Earn ⭐ RP (Regents Points) for everything you do. Spend it on your pet, streak freezes, and power-ups.' },
  { id: null,      placement: 'center', title: "You're all set!",  body: 'Find quick practice and past exams in the Exams tab, your study buddy on the Home screen, and Progress, Social & Profile from the tabs below. Happy studying! 🚀' },
]

const TourContext = createContext(null)

export function TourProvider({ children }) {
  const { user } = useAuthContext()
  const uid = user?.uid
  const isAnon = !!user?.isAnonymous

  const [isActive,        setIsActive]        = useState(false)
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [tourDone,        setTourDone]        = useState(false)
  const [doneLoaded,      setDoneLoaded]      = useState(false)

  // Refs avoid re-renders: target nodes + the Home scroll handle.
  const registry    = useRef(new Map())  // id -> React ref
  const scrollerRef = useRef(null)        // { scrollTo(id) } registered by HomeScreen

  // ── Load the done-flag (mirror the intro flag: AsyncStorage → Firestore) ────
  useEffect(() => {
    let cancelled = false
    if (!uid) { setTourDone(false); setDoneLoaded(false); return }
    if (isAnon) { setTourDone(true); setDoneLoaded(true); return }  // guests never see the tour

    ;(async () => {
      try {
        let done = !!(await AsyncStorage.getItem(tourDoneKey(uid)))
        if (!done) {
          const snap = await getDoc(doc(db, 'users', uid, 'meta', 'tour'))
          done = snap.exists()
          if (done) AsyncStorage.setItem(tourDoneKey(uid), '1').catch(() => {})
        }
        if (!cancelled) { setTourDone(done); setDoneLoaded(true) }
      } catch {
        if (!cancelled) { setTourDone(false); setDoneLoaded(true) }
      }
    })()
    return () => { cancelled = true }
  }, [uid, isAnon])

  const registerTarget    = useCallback((id, ref) => { registry.current.set(id, ref) }, [])
  const unregisterTarget  = useCallback((id) => { registry.current.delete(id) }, [])
  const registerScroller  = useCallback((handle) => { scrollerRef.current = handle }, [])

  // Window-absolute rect of a target, or null.
  //
  // Driven by setTimeout (NOT requestAnimationFrame): on first run the tour can
  // start while a native prompt (ATT / notifications) or app-inactive state has
  // rAF paused — an rAF-gated measure then never fires its callback and the
  // overlay hangs black for 30–40s until the app is backgrounded/foregrounded.
  // setTimeout still fires in those states. A hard cap guarantees the promise
  // always resolves (→ graceful centered fallback), so the overlay can't hang.
  const measureTarget = useCallback((id) => new Promise((resolve) => {
    const node = registry.current.get(id)?.current
    if (!node || typeof node.measureInWindow !== 'function') { resolve(null); return }
    let tried = 0
    let settled = false
    const done = (v) => { if (!settled) { settled = true; resolve(v) } }
    const attempt = () => {
      if (settled) return
      node.measureInWindow((x, y, width, height) => {
        if (width > 0 && height > 0) { done({ x, y, width, height }); return }
        if (tried++ < 8) { setTimeout(attempt, 120); return }  // ~1s of layout-settle retries
        done(null)
      })
    }
    setTimeout(attempt, 0)
    setTimeout(() => done(null), 1500)  // hard cap — never leave the overlay measuring
  }), [])

  // Scroll a below-the-fold Home target into view, then wait for the scroll.
  const scrollToTarget = useCallback(async (id) => {
    scrollerRef.current?.scrollTo?.(id)
    await new Promise((r) => setTimeout(r, 280))
  }, [])

  const finish = useCallback(async () => {
    setIsActive(false)
    setActiveStepIndex(0)
    setTourDone(true)
    if (uid && !isAnon) {
      try {
        await AsyncStorage.setItem(tourDoneKey(uid), '1')
        await setDoc(
          doc(db, 'users', uid, 'meta', 'tour'),
          { value: true, updatedAt: new Date().toISOString() },
          { merge: true },
        )
      } catch {}
    }
  }, [uid, isAnon])

  const next = useCallback(() => {
    setActiveStepIndex((i) => {
      if (i >= TOUR_STEPS.length - 1) { finish(); return i }
      return i + 1
    })
  }, [finish])

  const skip = useCallback(() => { finish() }, [finish])

  const start = useCallback(({ replay = false } = {}) => {
    if (isActive) return
    if (!replay && tourDone) return
    setActiveStepIndex(0)
    setIsActive(true)
  }, [isActive, tourDone])

  // First-run entry: re-read the flag immediately before starting (race-safe).
  const maybeStartFirstRun = useCallback(async () => {
    if (isActive || !uid || isAnon) return
    try {
      if (await AsyncStorage.getItem(tourDoneKey(uid))) { setTourDone(true); return }
    } catch {}
    setActiveStepIndex(0)
    setIsActive(true)
  }, [isActive, uid, isAnon])

  const value = useMemo(() => ({
    isActive, activeStepIndex, steps: TOUR_STEPS, tourDone, doneLoaded,
    registerTarget, unregisterTarget, measureTarget,
    registerScroller, scrollToTarget,
    start, next, skip, finish, maybeStartFirstRun,
  }), [
    isActive, activeStepIndex, tourDone, doneLoaded,
    registerTarget, unregisterTarget, measureTarget,
    registerScroller, scrollToTarget, start, next, skip, finish, maybeStartFirstRun,
  ])

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>
}

export function useTour() {
  const ctx = useContext(TourContext)
  if (!ctx) throw new Error('useTour must be used inside <TourProvider>')
  return ctx
}

/**
 * Register an element as a tour target. Spread the result onto the element:
 *   const streak = useTourTarget('streak')
 *   <TouchableOpacity {...streak}>…
 * `collapsable: false` is required so Android doesn't flatten the view away
 * (measure* would return zeros otherwise).
 */
export function useTourTarget(id) {
  const ref = useRef(null)
  const ctx = useContext(TourContext)
  useEffect(() => {
    if (!ctx) return
    ctx.registerTarget(id, ref)
    return () => ctx.unregisterTarget(id)
  }, [id, ctx])
  return { ref, collapsable: false }
}
