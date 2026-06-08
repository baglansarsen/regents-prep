import { useState, useEffect, useRef, useCallback } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const MAX_LIVES      = 5
const REFILL_COST_XP = 300
const REFILL_MS      = 30 * 60 * 1000   // 30 minutes
const KEY_LIVES      = '@lives'
const KEY_REFILL_AT  = '@livesNextRefillAt'

/**
 * Grant every life that has accrued since `nextRefillAt`, not just one.
 * Lives regenerate one per REFILL_MS on a fixed schedule.
 */
function catchUpRefills(lives, nextRefillAt) {
  if (lives >= MAX_LIVES) return { lives: MAX_LIVES, nextRefillAt: null }
  if (!nextRefillAt) return { lives, nextRefillAt: null }

  const now = Date.now()
  const due = new Date(nextRefillAt).getTime()
  if (isNaN(due) || now < due) return { lives, nextRefillAt }

  const accrued = 1 + Math.floor((now - due) / REFILL_MS)
  const gained  = Math.min(accrued, MAX_LIVES - lives)
  const newLives = lives + gained
  const newRefill = newLives < MAX_LIVES
    ? new Date(due + gained * REFILL_MS).toISOString()
    : null
  return { lives: newLives, nextRefillAt: newRefill }
}

async function save(uid, lives, nextRefillAt) {
  try {
    localStorage.setItem(KEY_LIVES, String(lives))
    if (nextRefillAt) {
      localStorage.setItem(KEY_REFILL_AT, nextRefillAt)
    } else {
      localStorage.removeItem(KEY_REFILL_AT)
    }
  } catch (_) {}

  if (uid) {
    try {
      await setDoc(doc(db, 'users', uid), { lives, nextRefillAt }, { merge: true })
    } catch (_) {}
  }
}

export function useLives(uid) {
  const [lives, setLives] = useState(MAX_LIVES)
  const [nextRefillAt, setNextRefillAt] = useState(null)
  const livesRef = useRef(MAX_LIVES)
  const refillRef = useRef(null)
  const uid_ref   = useRef(uid)
  uid_ref.current = uid

  // Load on mount
  useEffect(() => {
    async function load() {
      // Optimistic paint from localStorage first
      try {
        const localLives = localStorage.getItem(KEY_LIVES)
        const localRefill = localStorage.getItem(KEY_REFILL_AT)
        if (localLives !== null) {
          const storedLives = parseInt(localLives)
          const { lives: lv, nextRefillAt: ra } = catchUpRefills(storedLives, localRefill)
          livesRef.current = lv
          setLives(lv)
          setNextRefillAt(ra)
          refillRef.current = ra
        }
      } catch (_) {}

      // Confirm / update from Firestore
      if (uid) {
        try {
          const snap = await getDoc(doc(db, 'users', uid))
          if (snap.exists()) {
            const d = snap.data()
            if (d.lives !== undefined) {
              const { lives: lv, nextRefillAt: ra } = catchUpRefills(d.lives, d.nextRefillAt ?? null)
              livesRef.current = lv
              setLives(lv)
              setNextRefillAt(ra)
              refillRef.current = ra
              if (lv !== d.lives) await save(uid, lv, ra)
            }
          }
        } catch (_) {}
      }
    }
    load()
  }, [uid])

  // Auto-refill ticker
  useEffect(() => {
    const tick = async () => {
      if (livesRef.current >= MAX_LIVES || !refillRef.current) return
      const { lives: newLives, nextRefillAt: newRefill } =
        catchUpRefills(livesRef.current, refillRef.current)
      if (newLives !== livesRef.current) {
        livesRef.current = newLives
        setLives(newLives)
        setNextRefillAt(newRefill)
        refillRef.current = newRefill
        await save(uid_ref.current, newLives, newRefill)
      }
    }

    const id = setInterval(tick, 15_000) // check every 15s
    tick()
    return () => clearInterval(id)
  }, [])

  // Keep refillRef in sync with state
  useEffect(() => { refillRef.current = nextRefillAt }, [nextRefillAt])

  const loseLife = useCallback(async () => {
    if (livesRef.current <= 0) return
    const newLives = livesRef.current - 1
    const newRefill = refillRef.current ?? new Date(Date.now() + REFILL_MS).toISOString()
    livesRef.current = newLives
    setLives(newLives)
    setNextRefillAt(newRefill)
    refillRef.current = newRefill
    await save(uid_ref.current, newLives, newRefill)
  }, [])

  const refillLives = useCallback(async (spendXP) => {
    if (livesRef.current >= MAX_LIVES) return 'already_full'
    const spent = await spendXP(REFILL_COST_XP)
    if (!spent) return 'insufficient_xp'
    livesRef.current = MAX_LIVES
    setLives(MAX_LIVES)
    setNextRefillAt(null)
    refillRef.current = null
    await save(uid_ref.current, MAX_LIVES, null)
    return 'success'
  }, [])

  const addLife = useCallback(async () => {
    const newLives  = Math.min(livesRef.current + 1, MAX_LIVES)
    const newRefill = newLives >= MAX_LIVES ? null : refillRef.current
    livesRef.current = newLives
    setLives(newLives)
    setNextRefillAt(newRefill)
    refillRef.current = newRefill
    await save(uid_ref.current, newLives, newRefill)
  }, [])

  return { lives, maxLives: MAX_LIVES, loseLife, refillLives, addLife, nextRefillAt, refillCost: REFILL_COST_XP }
}
