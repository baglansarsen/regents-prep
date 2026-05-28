import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, getDoc, setDoc, increment } from 'firebase/firestore'
import { db } from '../firebase'

const AS_KEY   = '@petCoins_v1'
const MAX_COINS = 9999

export function useCoins(uid) {
  const [coins,  setCoins]  = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!uid) return
    ;(async () => {
      try {
        const snap = await getDoc(doc(db, 'users', uid, 'meta', 'coins'))
        if (snap.exists()) setCoins(Math.min(snap.data().balance ?? 0, MAX_COINS))
        else {
          const raw = await AsyncStorage.getItem(AS_KEY)
          setCoins(Math.min(Number(raw) || 0, MAX_COINS))
        }
      } catch {
        try {
          const raw = await AsyncStorage.getItem(AS_KEY)
          setCoins(Math.min(Number(raw) || 0, MAX_COINS))
        } catch {}
      }
      setLoaded(true)
    })()
  }, [uid])

  const earnCoins = useCallback(async (amount) => {
    if (!uid || amount <= 0) return
    const earned = Math.floor(amount)
    const next   = Math.min(coins + earned, MAX_COINS)
    setCoins(next)
    try { await setDoc(doc(db, 'users', uid, 'meta', 'coins'), { balance: increment(earned) }, { merge: true }) } catch {}
    // Enforce cap in Firestore
    if (next === MAX_COINS) {
      try { await setDoc(doc(db, 'users', uid, 'meta', 'coins'), { balance: MAX_COINS }, { merge: true }) } catch {}
    }
    try { await AsyncStorage.setItem(AS_KEY, String(next)) } catch {}
  }, [uid, coins])

  const spendCoins = useCallback(async (amount) => {
    if (coins < amount) return false
    const next = coins - amount
    setCoins(next)
    try { await setDoc(doc(db, 'users', uid, 'meta', 'coins'), { balance: increment(-amount) }, { merge: true }) } catch {}
    try { await AsyncStorage.setItem(AS_KEY, String(next)) } catch {}
    return true
  }, [uid, coins])

  return { coins, loaded, earnCoins, spendCoins }
}
