import { useState, useEffect, useRef, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const MAX_LIVES      = 5
const REFILL_COST_XP = 300
const REFILL_MS      = 30 * 60 * 1000   // 30 minutes
const KEY_LIVES      = '@lives'
const KEY_REFILL_AT  = '@livesNextRefillAt'

function nowISO() { return new Date().toISOString() }
function msUntil(iso) { return new Date(iso).getTime() - Date.now() }

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
              livesRef.current = d.lives
              setLives(d.lives)
              setNextRefillAt(d.nextRefillAt ?? null)
              return
            }
          }
        } catch (_) {}
      }
      // Fallback: AsyncStorage
      try {
        const [lv, ra] = await AsyncStorage.multiGet([KEY_LIVES, KEY_REFILL_AT])
        const lNum = lv[1] ? parseInt(lv[1]) : MAX_LIVES
        livesRef.current = lNum
        setLives(lNum)
        setNextRefillAt(ra[1] ?? null)
      } catch (_) {}
    }
    load()
  }, [uid])

  // ─── Auto-refill ticker ───────────────────────────────────────────────────
  useEffect(() => {
    const tick = async () => {
      if (livesRef.current >= MAX_LIVES || !refillRef.current) return
      const waitMs = msUntil(refillRef.current)
      if (waitMs <= 0) {
        const newLives = Math.min(livesRef.current + 1, MAX_LIVES)
        const newRefill = newLives < MAX_LIVES
          ? new Date(Date.now() + REFILL_MS).toISOString()
          : null
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
