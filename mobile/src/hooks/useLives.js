import { useState, useEffect, useRef, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const MAX_LIVES      = 5
const REFILL_COST_XP = 300
const REFILL_MS      = 30 * 60 * 1000   // 30 minutes
const KEY_LIVES      = '@lives'
const KEY_REFILL_AT  = '@livesNextRefillAt'

/**
 * Grant every life that has accrued since `nextRefillAt`, not just one.
 * Lives regenerate one per REFILL_MS on a fixed schedule anchored at the
 * first due time, so a player who's been away for hours catches up fully.
 *
 * Returns the caught-up { lives, nextRefillAt }. nextRefillAt is advanced to
 * the next not-yet-due boundary (or null once the player is back at MAX).
 */
function catchUpRefills(lives, nextRefillAt) {
  if (lives >= MAX_LIVES) return { lives: MAX_LIVES, nextRefillAt: null }
  if (!nextRefillAt) return { lives, nextRefillAt: null }

  const now = Date.now()
  const due = new Date(nextRefillAt).getTime()
  if (isNaN(due) || now < due) return { lives, nextRefillAt }   // next life not due yet

  // The life due at `due` is earned, plus one for every full interval since.
  const accrued = 1 + Math.floor((now - due) / REFILL_MS)
  const gained  = Math.min(accrued, MAX_LIVES - lives)
  const newLives = lives + gained
  const newRefill = newLives < MAX_LIVES
    ? new Date(due + gained * REFILL_MS).toISOString()   // next un-earned boundary
    : null
  return { lives: newLives, nextRefillAt: newRefill }
}

async function save(uid, lives, nextRefillAt) {
  try {
    await AsyncStorage.multiSet([
      [KEY_LIVES,     String(lives)],
      [KEY_REFILL_AT, nextRefillAt],
    ])
  } catch (_) {}

  if (uid) {
    try {
      await setDoc(doc(db, 'users', uid), { lives, nextRefillAt }, { merge: true })
    } catch (_) {}
  }
}

export function useLives(uid, isSubscribed = false) {
  const [lives,       setLives]       = useState(MAX_LIVES)
  const [nextRefillAt, setNextRefillAt] = useState(null)
  const livesRef = useRef(MAX_LIVES)
  const refillRef = useRef(null)
  const uid_ref   = useRef(uid)
  uid_ref.current = uid

  // ─── Load on mount ────────────────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      // Try Firestore first
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
              if (lv !== d.lives) await save(uid, lv, ra)   // persist offline accrual
              return
            }
          }
        } catch (_) {}
      }
      // Fallback: AsyncStorage
      try {
        const [lvPair, raPair] = await AsyncStorage.multiGet([KEY_LIVES, KEY_REFILL_AT])
        const storedLives = lvPair[1] ? parseInt(lvPair[1]) : MAX_LIVES
        const { lives: lv, nextRefillAt: ra } = catchUpRefills(storedLives, raPair[1] ?? null)
        livesRef.current = lv
        setLives(lv)
        setNextRefillAt(ra)
        refillRef.current = ra
        if (lv !== storedLives) await save(uid_ref.current, lv, ra)
      } catch (_) {}
    }
    load()
  }, [uid])

  // ─── Auto-refill ticker ───────────────────────────────────────────────────
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

    const id = setInterval(tick, 60_000)
    tick()  // check immediately too
    return () => clearInterval(id)
  }, [])

  // Keep refillRef in sync with state
  useEffect(() => { refillRef.current = nextRefillAt }, [nextRefillAt])

  // ─── loseLife ─────────────────────────────────────────────────────────────
  const loseLife = useCallback(async () => {
    if (isSubscribed) return  // premium users have unlimited hearts
    if (livesRef.current <= 0) return
    const newLives = livesRef.current - 1
    const newRefill = refillRef.current ?? new Date(Date.now() + REFILL_MS).toISOString()
    livesRef.current = newLives
    setLives(newLives)
    setNextRefillAt(newRefill)
    refillRef.current = newRefill
    await save(uid_ref.current, newLives, newRefill)
  }, [])

  // ─── refillLives (costs 300 XP) ──────────────────────────────────────────
  const refillLives = useCallback(async (spendXP) => {
    const spent = await spendXP(REFILL_COST_XP)
    if (!spent) return false
    livesRef.current = MAX_LIVES
    setLives(MAX_LIVES)
    setNextRefillAt(null)
    refillRef.current = null
    await save(uid_ref.current, MAX_LIVES, null)
    return true
  }, [])

  // ─── addLife (rewarded ad — +1, never exceeds max) ───────────────────────
  const addLife = useCallback(async () => {
    const newLives  = Math.min(livesRef.current + 1, MAX_LIVES)
    // Keep existing refill timer running if it's already set; only start one
    // if the previous count was 0 (no timer existed yet).
    const newRefill = newLives < MAX_LIVES
      ? (refillRef.current ?? new Date(Date.now() + REFILL_MS).toISOString())
      : null
    livesRef.current = newLives
    setLives(newLives)
    setNextRefillAt(newRefill)
    refillRef.current = newRefill
    await save(uid_ref.current, newLives, newRefill)
  }, [])

  return { lives, maxLives: MAX_LIVES, loseLife, refillLives, addLife, nextRefillAt, refillCost: REFILL_COST_XP, isSubscribed }
}
