import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { BASE_MAX_ENERGY, maxEnergyForSubject } from '../utils/energy'

const REFILL_COST_RP = 300
const REFILL_MS      = 30 * 60 * 1000   // 30 minutes
const KEY_LIVES      = '@lives'
const KEY_REFILL_AT  = '@livesNextRefillAt'

/**
 * Grant every life that has accrued since `nextRefillAt`, not just one.
 * Lives regenerate one per REFILL_MS on a fixed schedule anchored at the
 * first due time, so a player who's been away for hours catches up fully.
 *
 * Returns the caught-up { lives, nextRefillAt }. nextRefillAt is advanced to
 * the next not-yet-due boundary (or null once the player is back at maxLives).
 */
function catchUpRefills(lives, nextRefillAt, maxLives) {
  if (lives >= maxLives) return { lives: maxLives, nextRefillAt: null }
  if (!nextRefillAt) return { lives, nextRefillAt: null }

  const now = Date.now()
  const due = new Date(nextRefillAt).getTime()
  if (isNaN(due) || now < due) return { lives, nextRefillAt }   // next life not due yet

  // The life due at `due` is earned, plus one for every full interval since.
  const accrued = 1 + Math.floor((now - due) / REFILL_MS)
  const gained  = Math.min(accrued, maxLives - lives)
  const newLives = lives + gained
  const newRefill = newLives < maxLives
    ? new Date(due + gained * REFILL_MS).toISOString()   // next un-earned boundary
    : null
  return { lives: newLives, nextRefillAt: newRefill }
}

function normalizeLoadedLives(lives, nextRefillAt, maxLives) {
  // Existing accounts may have a stored "full" 5-energy balance. When they
  // open a math subject, treat that old full state as the new 10-energy full.
  if (maxLives > BASE_MAX_ENERGY && lives >= BASE_MAX_ENERGY && !nextRefillAt) {
    return { lives: maxLives, nextRefillAt: null }
  }
  return { lives, nextRefillAt }
}

async function save(uid, lives, nextRefillAt) {
  try {
    await AsyncStorage.multiSet([
      [KEY_LIVES,     String(lives)],
      [KEY_REFILL_AT, nextRefillAt ?? ''],
    ])
  } catch (_) {}

  if (uid) {
    try {
      await setDoc(doc(db, 'users', uid), { lives, nextRefillAt }, { merge: true })
    } catch (_) {}
  }
}

export function useLives(uid, isSubscribed = false, subject) {
  const maxLives = maxEnergyForSubject(subject)
  const [lives,       setLives]       = useState(maxLives)
  const [nextRefillAt, setNextRefillAt] = useState(null)
  const livesRef = useRef(maxLives)
  const refillRef = useRef(null)
  const uid_ref   = useRef(uid)
  uid_ref.current = uid
  const maxLivesRef = useRef(maxLives)
  maxLivesRef.current = maxLives
  // loseLife has an empty dep array (stable identity), so it would otherwise
  // capture the first `isSubscribed` value forever. A ref keeps it current so
  // premium users stop losing hearts the moment their entitlement resolves.
  const subRef    = useRef(isSubscribed)
  subRef.current  = isSubscribed

  // ─── Load on mount ────────────────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      // ── Optimistic paint from AsyncStorage first (~5ms) ─────────────────────
      try {
        const [lvPair, raPair] = await AsyncStorage.multiGet([KEY_LIVES, KEY_REFILL_AT])
        if (lvPair[1]) {
          const storedLives = parseInt(lvPair[1])
          const caughtUp = catchUpRefills(storedLives, raPair[1] ?? null, maxLivesRef.current)
          const { lives: lv, nextRefillAt: ra } =
            normalizeLoadedLives(caughtUp.lives, caughtUp.nextRefillAt, maxLivesRef.current)
          livesRef.current = lv
          setLives(lv)
          setNextRefillAt(ra)
          refillRef.current = ra
        }
      } catch (_) {}

      // ── Confirm / update from Firestore ─────────────────────────────────────
      if (uid) {
        try {
          const snap = await getDoc(doc(db, 'users', uid))
          if (snap.exists()) {
            const d = snap.data()
            if (d.lives !== undefined) {
              const caughtUp = catchUpRefills(d.lives, d.nextRefillAt ?? null, maxLivesRef.current)
              const { lives: lv, nextRefillAt: ra } =
                normalizeLoadedLives(caughtUp.lives, caughtUp.nextRefillAt, maxLivesRef.current)
              livesRef.current = lv
              setLives(lv)
              setNextRefillAt(ra)
              refillRef.current = ra
              if (lv !== d.lives || ra !== (d.nextRefillAt ?? null)) await save(uid, lv, ra)
            }
          }
        } catch (_) {}
      }
    }
    load()
  }, [uid])

  // Math subjects have a larger cap. If the player was full at the old 5-energy
  // cap, upgrade them to the math cap immediately when they switch in.
  useEffect(() => {
    if (maxLives > BASE_MAX_ENERGY && livesRef.current >= BASE_MAX_ENERGY && !refillRef.current) {
      livesRef.current = maxLives
      setLives(maxLives)
      save(uid_ref.current, maxLives, null).catch(() => {})
    } else {
      setLives(livesRef.current)
    }
  }, [maxLives])

  // ─── Auto-refill ticker ───────────────────────────────────────────────────
  useEffect(() => {
    const tick = async () => {
      const currentMax = maxLivesRef.current
      if (livesRef.current >= currentMax || !refillRef.current) return
      const { lives: newLives, nextRefillAt: newRefill } =
        catchUpRefills(livesRef.current, refillRef.current, currentMax)
      if (newLives !== livesRef.current) {
        livesRef.current = newLives
        setLives(newLives)
        setNextRefillAt(newRefill)
        refillRef.current = newRefill
        await save(uid_ref.current, newLives, newRefill)
      }
    }

    const id = setInterval(tick, 30_000)   // lives refill every 30 min; check every 30 s
    tick()  // check immediately too
    return () => clearInterval(id)
  }, [])

  // Keep refillRef in sync with state
  useEffect(() => { refillRef.current = nextRefillAt }, [nextRefillAt])

  // ─── loseLife ─────────────────────────────────────────────────────────────
  const loseLife = useCallback(async () => {
    if (subRef.current) return  // premium users have unlimited hearts
    const currentLives = Math.min(livesRef.current, maxLivesRef.current)
    if (currentLives <= 0) return
    const newLives = currentLives - 1
    const newRefill = refillRef.current ?? new Date(Date.now() + REFILL_MS).toISOString()
    livesRef.current = newLives
    setLives(newLives)
    setNextRefillAt(newRefill)
    refillRef.current = newRefill
    await save(uid_ref.current, newLives, newRefill)
  }, [])

  // ─── refillLives (costs 300 RP) ──────────────────────────────────────────
  const refillLives = useCallback(async (spendRP) => {
    const spent = await spendRP(REFILL_COST_RP)
    if (!spent) return false
    const currentMax = maxLivesRef.current
    livesRef.current = currentMax
    setLives(currentMax)
    setNextRefillAt(null)
    refillRef.current = null
    await save(uid_ref.current, currentMax, null)
    return true
  }, [])

  // ─── grantFullRefill (rewarded ad — free full refill, no RP cost) ────────
  const grantFullRefill = useCallback(async () => {
    const currentMax = maxLivesRef.current
    livesRef.current = currentMax
    setLives(currentMax)
    setNextRefillAt(null)
    refillRef.current = null
    await save(uid_ref.current, currentMax, null)
  }, [])

  // ─── addLife (+1, never exceeds max — used by the natural 30-min refill) ──
  const addLife = useCallback(async () => {
    const currentMax = maxLivesRef.current
    const newLives  = Math.min(Math.min(livesRef.current, currentMax) + 1, currentMax)
    // Keep existing refill timer running if it's already set; only start one
    // if the previous count was 0 (no timer existed yet).
    const newRefill = newLives < currentMax
      ? (refillRef.current ?? new Date(Date.now() + REFILL_MS).toISOString())
      : null
    livesRef.current = newLives
    setLives(newLives)
    setNextRefillAt(newRefill)
    refillRef.current = newRefill
    await save(uid_ref.current, newLives, newRefill)
  }, [])

  // Memoize the returned object so LivesProvider doesn't hand every consumer a
  // new context value on each render (the refill ticker re-renders this hook
  // every 30s). Callbacks are already stable; only lives/nextRefillAt/
  // maxLives/isSubscribed change.
  return useMemo(
    () => ({
      lives: Math.min(lives, maxLives),
      maxLives,
      loseLife,
      refillLives,
      addLife,
      grantFullRefill,
      nextRefillAt,
      refillCost: REFILL_COST_RP,
      isSubscribed,
    }),
    [lives, maxLives, nextRefillAt, isSubscribed, loseLife, refillLives, addLife, grantFullRefill],
  )
}
