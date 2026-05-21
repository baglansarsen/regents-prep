import { useState, useEffect, useCallback } from 'react'
import { doc, getDoc, setDoc, increment } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { db } from '../firebase'

const AS_KEY = '@regents_xp_v1'

export const LEVELS = [
  { level: 1, name: 'Beginner',    min: 0    },
  { level: 2, name: 'Learner',     min: 200  },
  { level: 3, name: 'Student',     min: 500  },
  { level: 4, name: 'Scholar',     min: 1000 },
  { level: 5, name: 'Expert',      min: 2000 },
  { level: 6, name: 'Master',      min: 4000 },
  { level: 7, name: 'Grandmaster', min: 8000 },
]

export function getLevel(xp) {
  const current = [...LEVELS].reverse().find((l) => xp >= l.min) ?? LEVELS[0]
  const nextIdx = LEVELS.indexOf(current) + 1
  const next = LEVELS[nextIdx] ?? null
  const progress = next ? (xp - current.min) / (next.min - current.min) : 1
  return { ...current, next, progress }
}

export function useXP(uid) {
  const [xp, setXP]         = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!uid) return
    getDoc(doc(db, 'users', uid, 'meta', 'xp'))
      .then((snap) => {
        if (snap.exists()) setXP(snap.data().total ?? 0)
        setLoaded(true)
      })
      .catch(async () => {
        try {
          const raw = await AsyncStorage.getItem(AS_KEY)
          setXP(Number(raw) || 0)
        } catch {}
        setLoaded(true)
      })
  }, [uid])

  const earnXP = useCallback(async (amount) => {
    if (!uid || amount <= 0) return
    const next = xp + amount
    setXP(next)
    try { await setDoc(doc(db, 'users', uid, 'meta', 'xp'), { total: increment(amount) }, { merge: true }) } catch {}
    try { await AsyncStorage.setItem(AS_KEY, String(next)) } catch {}
  }, [uid, xp])

  const spendXP = useCallback(async (amount) => {
    if (xp < amount) return false
    const next = xp - amount
    setXP(next)
    try { await setDoc(doc(db, 'users', uid, 'meta', 'xp'), { total: increment(-amount) }, { merge: true }) } catch {}
    try { await AsyncStorage.setItem(AS_KEY, String(next)) } catch {}
    return true
  }, [uid, xp])

  return { xp, earnXP, spendXP, loaded, level: getLevel(xp) }
}
