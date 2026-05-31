import { useState, useEffect, useRef, useCallback } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const MAX_LIVES      = 5
const REFILL_COST_XP = 300
const REFILL_MS      = 30 * 60 * 1000   // 30 minutes
const KEY_LIVES      = '@lives'
const KEY_REFILL_AT  = '@livesNextRefillAt'

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

  useEffect(() => {
    async function load() {
      let data = null
      if (uid) {
        try {
          const snap = await getDoc(doc(db, 'users', uid))
          if (snap.exists()) {
            const d = snap.data()
            if (d.lives !== undefined) {
              data = { lives: d.lives, nextRefillAt: d.nextRefillAt ?? null }
            }
          }
        } catch (_) {}
      }

      if (!data) {
        const storedLives = localStorage.getItem(KEY_LIVES)
        const storedRefill = localStorage.getItem(KEY_REFILL_AT)
        data = {
          lives: storedLives ? parseInt(storedLives) : MAX_LIVES,
          nextRefillAt: storedRefill ?? null,
        }
      }

      const { lives: lv, nextRefillAt: ra } = catchUpRefills(data.lives, data.nextRefillAt)
      livesRef.current = lv
      setLives(lv)
      setNextRefillAt(ra)
      refillRef.current = ra
      
      if (lv !== data.lives) {
        await save(uid, lv, ra)
      }
    }
    load()
  }, [uid])

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
        await save(uid, newLives, newRefill)
      }
    }

    const id = setInterval(tick, 20_000) // check every 20s on web for quick regeneration reaction
    tick()
    return () => clearInterval(id)
  }, [])

  useEffect(() => { refillRef.current = nextRefillAt }, [nextRefillAt])

  const loseLife = useCallback(async () => {
    if (livesRef.current <= 0) return
    const newLives = livesRef.current - 1
    const newRefill = refillRef.current ?? new Date(Date.now() + REFILL_MS).toISOString()
    livesRef.current = newLives
    setLives(newLives)
    setNextRefillAt(newRefill)
    refillRef.current = newRefill
    await save(uid, newLives, newRefill)
  }, [uid])

  const refillLives = useCallback(async (spendXP) => {
    const spent = await spendXP(REFILL_COST_XP)
    if (!spent) return false
    livesRef.current = MAX_LIVES
    setLives(MAX_LIVES)
    setNextRefillAt(null)
    refillRef.current = null
    await save(uid, MAX_LIVES, null)
    return true
  }, [uid])

  const addLife = useCallback(async () => {
    const newLives  = Math.min(livesRef.current + 1, MAX_LIVES)
    const newRefill = newLives < MAX_LIVES
      ? (refillRef.current ?? new Date(Date.now() + REFILL_MS).toISOString())
      : null
    livesRef.current = newLives
    setLives(newLives)
    setNextRefillAt(newRefill)
    refillRef.current = newRefill
    await save(uid, newLives, newRefill)
  }, [uid])

  return {
    lives,
    maxLives: MAX_LIVES,
    loseLife,
    refillLives,
    addLife,
    nextRefillAt,
    refillCost: REFILL_COST_XP,
    isSubscribed: false, // Omitted subscription
  }
}
