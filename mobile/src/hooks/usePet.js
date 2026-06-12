import { useState, useEffect, useCallback, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, getDoc, setDoc, getDocs, collection, increment } from 'firebase/firestore'
import { db } from '../firebase'
import {
  stageForRP, PET_MESSAGES, STAGE_NAMES, QUEST_TYPES,
  FOOD_ITEMS, HAPPINESS_ITEMS, HUNGER_ALERTS, HAPPINESS_ALERTS,
} from '../data/petConfig'

import { localDateStr, localDayIndex } from '../utils/localDate'

function today() {
  return localDateStr()
}

const AS_KEY_PET = '@petData_v1'
const AS_KEY_EVO = '@petPendingEvo_v1'

const DECAY_HUNGER_OPEN    = 5   // per hour while app is open
const DECAY_HAPPINESS_OPEN = 3   // per hour while app is open
const CLOSED_FACTOR        = 0.4 // 40% of open rate when closed
const DECAY_INTERVAL_MS    = 2 * 60 * 1000  // tick every 2 minutes

function getNotificationsModule() {
  try { return require('expo-notifications') } catch { return null }
}

async function schedulePetNotification(title, body) {
  const N = getNotificationsModule()
  if (!N) return
  try {
    await N.scheduleNotificationAsync({
      content: { title, body, sound: true },
      trigger: { seconds: 60 },
    })
  } catch {}
}

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)) }

const DEFAULT_PET = {
  petType:       null,
  name:          null,
  stage:         1,
  hunger:        100,
  happiness:     100,
  lastCheckedAt: new Date().toISOString(),
  accessories:   [],
  chosen:        false,
  bigFiveScores: null,  // { O, C, E, A, N } from personality quiz
}

export function usePet(uid) {
  const [pet,                setPet]                = useState(DEFAULT_PET)
  const [inventory,          setInventory]          = useState({})
  const [pendingEvolution,   setPendingEvolution]   = useState(false)
  const [activeReaction,     setActiveReaction]     = useState(null)
  const [activeFloatMessage, setActiveFloatMessage] = useState(null)
  const reactionTimeout  = useRef(null)
  const floatMsgTimeout  = useRef(null)
  const decayRef         = useRef(null)
  const petRef           = useRef(DEFAULT_PET)
  const uid_ref          = useRef(uid)
  uid_ref.current = uid

  // ─── Save pet to Firestore + AsyncStorage ────────────────────────────────
  async function savePet(data) {
    petRef.current = data
    setPet(data)
    try { await AsyncStorage.setItem(AS_KEY_PET, JSON.stringify(data)) } catch {}
    if (uid_ref.current) {
      try {
        await setDoc(doc(db, 'users', uid_ref.current, 'meta', 'pet'), data, { merge: true })
      } catch {}
    }
  }

  // ─── Load on mount ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!uid) return
    ;(async () => {
      let loaded = null
      try {
        const snap = await getDoc(doc(db, 'users', uid, 'meta', 'pet'))
        if (snap.exists()) loaded = snap.data()
      } catch {}

      if (!loaded) {
        try {
          const raw = await AsyncStorage.getItem(AS_KEY_PET)
          if (raw) loaded = JSON.parse(raw)
        } catch {}
      }

      if (!loaded?.chosen) return  // pet not chosen yet — stay at default

      // Apply time-elapsed decay for closed period
      const now         = Date.now()
      const last        = new Date(loaded.lastCheckedAt ?? now).getTime()
      const elapsedHr   = (now - last) / 3_600_000
      const hungerDelta = elapsedHr * DECAY_HUNGER_OPEN * CLOSED_FACTOR
      const happyDelta  = elapsedHr * DECAY_HAPPINESS_OPEN * CLOSED_FACTOR
      const updated = {
        ...loaded,
        hunger:       clamp(loaded.hunger - hungerDelta, 0, 100),
        happiness:    clamp(loaded.happiness - happyDelta, 0, 100),
        lastCheckedAt: new Date().toISOString(),
      }
      petRef.current = updated
      setPet(updated)

      // Load inventory
      try {
        const invSnap = await getDocs(collection(db, 'users', uid, 'petInventory'))
        const inv = {}
        invSnap.forEach((d) => { inv[d.id] = d.data().quantity ?? 0 })
        setInventory(inv)
      } catch {}

      // Check pending evolution from AsyncStorage
      const pendingRaw = await AsyncStorage.getItem(AS_KEY_EVO).catch(() => null)
      if (pendingRaw === 'true') setPendingEvolution(true)
    })()
  }, [uid])

  // ─── Open-decay interval ─────────────────────────────────────────────────
  useEffect(() => {
    if (!pet.chosen) return
    clearInterval(decayRef.current)
    decayRef.current = setInterval(async () => {
      const current   = petRef.current
      if (!current.chosen) return
      const hrFraction = DECAY_INTERVAL_MS / 3_600_000
      const newHunger  = clamp(current.hunger - DECAY_HUNGER_OPEN * hrFraction, 0, 100)
      const newHappy   = clamp(current.happiness - DECAY_HAPPINESS_OPEN * hrFraction, 0, 100)
      const wasHungry  = current.hunger > 0 && newHunger === 0
      const wasSad     = current.happiness > 0 && newHappy === 0
      const updated = { ...current, hunger: newHunger, happiness: newHappy, lastCheckedAt: new Date().toISOString() }
      await savePet(updated)

      // Fire push notifications on first hit of 0
      if (wasHungry) {
        const msg = HUNGER_ALERTS[current.petType] ?? 'Your pet is starving!'
        await schedulePetNotification('Feed your pet! 🍎', msg)
      }
      if (wasSad) {
        const msg = HAPPINESS_ALERTS[current.petType] ?? 'Your pet is sad!'
        await schedulePetNotification('Your pet misses you 💔', msg)
      }
    }, DECAY_INTERVAL_MS)

    return () => clearInterval(decayRef.current)
  }, [pet.chosen])

  // ─── triggerReaction ─────────────────────────────────────────────────────
  const triggerReaction = useCallback((type) => {
    clearTimeout(reactionTimeout.current)
    setActiveReaction(type)
    reactionTimeout.current = setTimeout(() => setActiveReaction(null), 2500)
  }, [])

  // ─── triggerFloat ─────────────────────────────────────────────────────────
  function triggerFloat(msg) {
    clearTimeout(floatMsgTimeout.current)
    setActiveFloatMessage(msg)
    floatMsgTimeout.current = setTimeout(() => setActiveFloatMessage(null), 2500)
  }

  // ─── feedPet ─────────────────────────────────────────────────────────────
  const feedPet = useCallback(async (itemId) => {
    const item = FOOD_ITEMS.find((f) => f.id === itemId)
    if (!item) return false
    const qty = inventory[itemId] ?? 0
    if (qty <= 0) return false

    const restore = item.hungerRestore ?? Math.floor(Math.random() * 71 + 30) // 30–100
    const updated = { ...petRef.current, hunger: clamp(petRef.current.hunger + restore, 0, 100) }
    await savePet(updated)

    const newInv = { ...inventory, [itemId]: qty - 1 }
    setInventory(newInv)
    if (uid_ref.current) {
      try {
        await setDoc(
          doc(db, 'users', uid_ref.current, 'petInventory', itemId),
          { quantity: increment(-1) },
          { merge: true },
        )
      } catch {}
    }

    triggerReaction('cheer')
    triggerFloat(`+${restore} 🍖`)
    return true
  }, [inventory, triggerReaction])

  // ─── playWithPet ─────────────────────────────────────────────────────────
  const playWithPet = useCallback(async (itemId) => {
    const item = HAPPINESS_ITEMS.find((h) => h.id === itemId)
    if (!item) return false
    const qty = inventory[itemId] ?? 0
    if (qty <= 0) return false

    const updated = {
      ...petRef.current,
      happiness: clamp(petRef.current.happiness + item.happinessRestore, 0, 100),
    }
    await savePet(updated)

    const newInv = { ...inventory, [itemId]: qty - 1 }
    setInventory(newInv)
    if (uid_ref.current) {
      try {
        await setDoc(
          doc(db, 'users', uid_ref.current, 'petInventory', itemId),
          { quantity: increment(-1) },
          { merge: true },
        )
      } catch {}
    }

    triggerReaction(item.reaction ?? 'happy_dance')
    triggerFloat(`+${item.happinessRestore} 😊`)
    return true
  }, [inventory, triggerReaction])

  // ─── addInventory (called after coin purchase) ────────────────────────────
  const addInventory = useCallback(async (itemId, qty = 1) => {
    const newInv = { ...inventory, [itemId]: (inventory[itemId] ?? 0) + qty }
    setInventory(newInv)
    if (uid_ref.current) {
      try {
        await setDoc(
          doc(db, 'users', uid_ref.current, 'petInventory', itemId),
          { quantity: increment(qty) },
          { merge: true },
        )
      } catch {}
    }
  }, [inventory])

  // ─── equipCosmetic / unequipCosmetic ──────────────────────────────────────
  const toggleCosmetic = useCallback(async (itemId) => {
    const current  = petRef.current
    const acc      = current.accessories ?? []
    const isEquipped = acc.includes(itemId)
    const next     = isEquipped ? acc.filter((a) => a !== itemId) : [...acc, itemId]
    await savePet({ ...current, accessories: next })
    if (isEquipped) {
      triggerReaction('sympathetic')
    } else {
      triggerReaction('celebrate')
      triggerFloat('✨ Equipped!')
    }
  }, [triggerReaction])

  // ─── renamePet ────────────────────────────────────────────────────────────
  const renamePet = useCallback(async (name) => {
    await savePet({ ...petRef.current, name: name.trim().slice(0, 20) })
  }, [])

  // ─── checkAndEvolve ───────────────────────────────────────────────────────
  const checkAndEvolve = useCallback(async (totalRP) => {
    const current = petRef.current
    if (!current.chosen) return
    const expectedStage = stageForRP(totalRP)
    if (expectedStage <= current.stage) return

    const updated = { ...current, stage: expectedStage }
    await savePet(updated)
    setPendingEvolution(true)
    await AsyncStorage.setItem(AS_KEY_EVO, 'true').catch(() => {})

    // Push notification
    const petName = current.name ?? 'Your pet'
    await schedulePetNotification(
      `${petName} just evolved! 🌟`,
      `${petName} reached ${STAGE_NAMES[expectedStage]} stage! Tap to see the transformation.`,
    )
  }, [])

  // ─── clearPendingEvolution ────────────────────────────────────────────────
  const clearPendingEvolution = useCallback(async () => {
    setPendingEvolution(false)
    await AsyncStorage.removeItem(AS_KEY_EVO).catch(() => {})
  }, [])

  // ─── getPetMessage ────────────────────────────────────────────────────────
  const getPetMessage = useCallback(({ streak = 0, daysSince = 0 } = {}) => {
    const current = petRef.current
    if (!current.petType) return null
    const pool = PET_MESSAGES[current.petType] ?? []
    if (!pool.length) return null
    const dayIndex = localDayIndex()  // changes at local midnight

    // When daysSince === 0 (user studied today), skip "haven't studied" templates
    // so the message stays contextually relevant.
    let msg = pool[dayIndex % pool.length]
    if (daysSince === 0 && msg.includes('{daysSince}')) {
      const fallbackIdx = (dayIndex + 1) % pool.length
      msg = pool[fallbackIdx].includes('{daysSince}')
        ? pool[(dayIndex + 2) % pool.length]
        : pool[fallbackIdx]
    }

    return msg
      .replace(/\{name\}/g,      current.name ?? 'friend')
      .replace(/\{streak\}/g,    String(streak))
      .replace(/\{daysSince\}/g, String(daysSince))
      .replace(/\{stage\}/g,     String(current.stage))
      .replace(/\{stageName\}/g, STAGE_NAMES[current.stage] ?? '')
  }, [])

  // ─── petPet (tap-to-pet, 3×/day free happiness boost) ───────────────────────
  const petPet = useCallback(async () => {
    const key   = `@petted_v1_${today()}_${uid_ref.current ?? 'anon'}`
    const count = parseInt(await AsyncStorage.getItem(key).catch(() => null) || '0')
    if (count >= 3) { triggerReaction('sympathetic'); return { ok: false, reason: 'limit' } }
    await AsyncStorage.setItem(key, String(count + 1)).catch(() => {})
    const updated = { ...petRef.current, happiness: clamp(petRef.current.happiness + 8, 0, 100) }
    await savePet(updated)
    triggerReaction('cheer')
    return { ok: true, remaining: 2 - count }
  }, [triggerReaction])

  // ─── dailyDig (once-per-day random reward) ───────────────────────────────────
  const dailyDig = useCallback(async () => {
    const key  = `@lastDig_v1_${uid_ref.current ?? 'anon'}`
    const last = await AsyncStorage.getItem(key).catch(() => null)
    if (last === today()) return { ok: false }
    await AsyncStorage.setItem(key, today()).catch(() => {})
    triggerReaction('happy_dance')
    if (Math.random() > 0.5) {
      const amt = 10 + Math.floor(Math.random() * 16)  // 10–25 RP (luck tap — minor)
      return { ok: true, type: 'xp', amount: amt }
    } else {
      const foods = ['apple', 'ramen']
      const item  = foods[Math.floor(Math.random() * foods.length)]
      await addInventory(item, 1)
      return { ok: true, type: 'item', itemId: item }
    }
  }, [addInventory, triggerReaction])

  // ─── Quest helpers ────────────────────────────────────────────────────────────
  function questKey() { return `@dailyQuest_v1_${uid_ref.current ?? 'anon'}` }

  const getTodayQuest = useCallback(async () => {
    const dayIndex = localDayIndex()
    const def      = QUEST_TYPES[dayIndex % QUEST_TYPES.length]
    let stored = null
    try { const raw = await AsyncStorage.getItem(questKey()); if (raw) stored = JSON.parse(raw) } catch {}
    const valid    = stored?.date === today() && stored?.questId === def.id
    return { ...def, progress: valid ? (stored.progress ?? 0) : 0, completed: valid ? !!stored.completed : false }
  }, [])

  const updateQuestProgress = useCallback(async (action, count = 1) => {
    const dayIndex = localDayIndex()
    const def      = QUEST_TYPES[dayIndex % QUEST_TYPES.length]
    if (def.action !== action) return { completed: false }
    let stored = null
    try { const raw = await AsyncStorage.getItem(questKey()); if (raw) stored = JSON.parse(raw) } catch {}
    const valid = stored?.date === today() && stored?.questId === def.id
    if (valid && stored.completed) return { completed: true, alreadyDone: true }
    const progress  = (valid ? (stored.progress ?? 0) : 0) + count
    const completed = progress >= def.goal
    await AsyncStorage.setItem(questKey(), JSON.stringify({
      date: today(), questId: def.id, progress, completed,
    })).catch(() => {})
    if (completed && !(valid && stored.completed)) {
      triggerReaction('celebrate')
      return { completed: true, rp: 30 }   // mini-assignment ≈ a few questions
    }
    return { completed }
  }, [triggerReaction])

  // ─── initializePet (called from PetPickerScreen) ──────────────────────────
  const initializePet = useCallback(async (petType, name) => {
    const newPet = {
      petType,
      name,
      stage:        1,
      hunger:       100,
      happiness:    100,
      lastCheckedAt: new Date().toISOString(),
      accessories:  [],
      chosen:       true,
    }
    await savePet(newPet)
  }, [])

  // ─── studyBoost (called during study/quiz sessions) ─────────────────────────
  // Boosts pet happiness by 8 as a reward for studying. No daily limit —
  // studying is always good for your buddy!
  const studyBoost = useCallback(async () => {
    if (!petRef.current.chosen) return
    const updated = { ...petRef.current, happiness: clamp(petRef.current.happiness + 8, 0, 100) }
    await savePet(updated)
  }, [])

  // ─── saveBigFiveScores (called after personality quiz) ───────────────────
  const saveBigFiveScores = useCallback(async (scores) => {
    const updated = { ...petRef.current, bigFiveScores: scores }
    await savePet(updated)
  }, [])

  // ─── switchBuddy (called from PetShopScreen) ──────────────────────────────
  // A new buddy keeps the player's earned progression. Deriving the stage from
  // current RP (rather than hardcoding 1) avoids a spurious "evolved!" event the
  // next time checkAndEvolve runs and jumps the stage back up.
  const switchBuddy = useCallback(async (newPetType, totalRP = 0) => {
    const currentName = petRef.current.name
    const newPet = {
      petType:       newPetType,
      name:          currentName,
      stage:         stageForRP(totalRP),
      hunger:        100,
      happiness:     100,
      lastCheckedAt: new Date().toISOString(),
      accessories:   [],
      chosen:        true,
      bigFiveScores: petRef.current.bigFiveScores ?? null,  // preserve Big Five if already set
    }
    await savePet(newPet)
  }, [])

  return {
    pet,
    inventory,
    pendingEvolution,
    activeReaction,
    activeFloatMessage,
    feedPet,
    playWithPet,
    addInventory,
    toggleCosmetic,
    renamePet,
    checkAndEvolve,
    clearPendingEvolution,
    triggerReaction,
    getPetMessage,
    initializePet,
    switchBuddy,
    petPet,
    studyBoost,
    dailyDig,
    getTodayQuest,
    updateQuestProgress,
    saveBigFiveScores,
  }
}
