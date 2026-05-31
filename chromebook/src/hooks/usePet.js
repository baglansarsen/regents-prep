import { useState, useEffect, useCallback, useRef } from 'react'
import { doc, getDoc, setDoc, getDocs, collection, increment } from 'firebase/firestore'
import { db } from '../firebase'
import {
  stageForXP, PET_MESSAGES, STAGE_NAMES, QUEST_TYPES,
  FOOD_ITEMS, HAPPINESS_ITEMS,
} from '@content/petConfig'

function today() {
  return new Date().toISOString().slice(0, 10)
}

const AS_KEY_PET = '@petData_v1'
const AS_KEY_EVO = '@petPendingEvo_v1'

const DECAY_HUNGER_OPEN    = 5   // per hour while app is open
const DECAY_HAPPINESS_OPEN = 3   // per hour while app is open
const CLOSED_FACTOR        = 0.4 // 40% of open rate when closed
const DECAY_INTERVAL_MS    = 2 * 60 * 1000  // tick every 2 minutes

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)) }

const DEFAULT_PET = {
  petType:      null,
  name:         null,
  stage:        1,
  hunger:       100,
  happiness:    100,
  lastCheckedAt: new Date().toISOString(),
  accessories:  [],
  chosen:       false,
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

  async function savePet(data) {
    petRef.current = data
    setPet(data)
    localStorage.setItem(AS_KEY_PET, JSON.stringify(data))
    if (uid_ref.current) {
      try {
        await setDoc(doc(db, 'users', uid_ref.current, 'meta', 'pet'), data, { merge: true })
      } catch {}
    }
  }

  useEffect(() => {
    async function load() {
      let loaded = null
      if (uid) {
        try {
          const snap = await getDoc(doc(db, 'users', uid, 'meta', 'pet'))
          if (snap.exists()) loaded = snap.data()
        } catch {}
      }

      if (!loaded) {
        const raw = localStorage.getItem(AS_KEY_PET)
        if (raw) loaded = JSON.parse(raw)
      }

      if (!loaded?.chosen) {
        setPet(DEFAULT_PET)
        return
      }

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

      if (uid) {
        try {
          const invSnap = await getDocs(collection(db, 'users', uid, 'petInventory'))
          const inv = {}
          invSnap.forEach((d) => { inv[d.id] = d.data().quantity ?? 0 })
          setInventory(inv)
        } catch {}
      } else {
        // Guest mode inventory from localStorage
        const rawInv = localStorage.getItem('@petInventory_v1')
        if (rawInv) setInventory(JSON.parse(rawInv))
      }

      const pendingRaw = localStorage.getItem(AS_KEY_EVO)
      if (pendingRaw === 'true') setPendingEvolution(true)
    }

    load()
  }, [uid])

  useEffect(() => {
    if (!pet.chosen) return
    clearInterval(decayRef.current)
    decayRef.current = setInterval(async () => {
      const current   = petRef.current
      if (!current.chosen) return
      const hrFraction = DECAY_INTERVAL_MS / 3_600_000
      const newHunger  = clamp(current.hunger - DECAY_HUNGER_OPEN * hrFraction, 0, 100)
      const newHappy   = clamp(current.happiness - DECAY_HAPPINESS_OPEN * hrFraction, 0, 100)
      const updated = { ...current, hunger: newHunger, happiness: newHappy, lastCheckedAt: new Date().toISOString() }
      await savePet(updated)
    }, DECAY_INTERVAL_MS)

    return () => clearInterval(decayRef.current)
  }, [pet.chosen])

  const triggerReaction = useCallback((type) => {
    clearTimeout(reactionTimeout.current)
    setActiveReaction(type)
    reactionTimeout.current = setTimeout(() => setActiveReaction(null), 2500)
  }, [])

  function triggerFloat(msg) {
    clearTimeout(floatMsgTimeout.current)
    setActiveFloatMessage(msg)
    floatMsgTimeout.current = setTimeout(() => setActiveFloatMessage(null), 2500)
  }

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
    localStorage.setItem('@petInventory_v1', JSON.stringify(newInv))
    
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
    localStorage.setItem('@petInventory_v1', JSON.stringify(newInv))
    
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

  const addInventory = useCallback(async (itemId, qty = 1) => {
    const newInv = { ...inventory, [itemId]: (inventory[itemId] ?? 0) + qty }
    setInventory(newInv)
    localStorage.setItem('@petInventory_v1', JSON.stringify(newInv))
    
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

  const renamePet = useCallback(async (name) => {
    await savePet({ ...petRef.current, name: name.trim().slice(0, 20) })
  }, [])

  const checkAndEvolve = useCallback(async (totalXP) => {
    const current = petRef.current
    if (!current.chosen) return
    const expectedStage = stageForXP(totalXP)
    if (expectedStage <= current.stage) return

    const updated = { ...current, stage: expectedStage }
    await savePet(updated)
    setPendingEvolution(true)
    localStorage.setItem(AS_KEY_EVO, 'true')
  }, [])

  const clearPendingEvolution = useCallback(async () => {
    setPendingEvolution(false)
    localStorage.removeItem(AS_KEY_EVO)
  }, [])

  const getPetMessage = useCallback(({ streak = 0, daysSince = 0 } = {}) => {
    const current = petRef.current
    if (!current.petType) return null
    const pool = PET_MESSAGES[current.petType] ?? []
    if (!pool.length) return null
    const dayIndex = Math.floor(Date.now() / 86_400_000)
    const msg = pool[dayIndex % pool.length]
    return msg
      .replace(/\{name\}/g,      current.name ?? 'friend')
      .replace(/\{streak\}/g,    String(streak))
      .replace(/\{daysSince\}/g, String(daysSince))
      .replace(/\{stage\}/g,     String(current.stage))
      .replace(/\{stageName\}/g, STAGE_NAMES[current.stage] ?? '')
  }, [])

  const petPet = useCallback(async () => {
    const key   = `@petted_v1_${today()}_${uid_ref.current ?? 'anon'}`
    const count = parseInt(localStorage.getItem(key) || '0')
    if (count >= 3) { triggerReaction('sympathetic'); return { ok: false, reason: 'limit' } }
    localStorage.setItem(key, String(count + 1))
    const updated = { ...petRef.current, happiness: clamp(petRef.current.happiness + 8, 0, 100) }
    await savePet(updated)
    triggerReaction('cheer')
    return { ok: true, remaining: 2 - count }
  }, [triggerReaction])

  const dailyDig = useCallback(async () => {
    const key  = `@lastDig_v1_${uid_ref.current ?? 'anon'}`
    const last = localStorage.getItem(key)
    if (last === today()) return { ok: false }
    localStorage.setItem(key, today())
    triggerReaction('happy_dance')
    if (Math.random() > 0.5) {
      const amt = 25 + Math.floor(Math.random() * 51)
      return { ok: true, type: 'xp', amount: amt }
    } else {
      const foods = ['apple', 'ramen']
      const item  = foods[Math.floor(Math.random() * foods.length)]
      await addInventory(item, 1)
      return { ok: true, type: 'item', itemId: item }
    }
  }, [addInventory, triggerReaction])

  const getTodayQuest = useCallback(async () => {
    const dayIndex = Math.floor(Date.now() / 86_400_000)
    const def      = QUEST_TYPES[dayIndex % QUEST_TYPES.length]
    let stored = null
    try {
      const raw = localStorage.getItem(`@dailyQuest_v1_${uid_ref.current ?? 'anon'}`)
      if (raw) stored = JSON.parse(raw)
    } catch {}
    const valid = stored?.date === today() && stored?.questId === def.id
    return { ...def, progress: valid ? (stored.progress ?? 0) : 0, completed: valid ? !!stored.completed : false }
  }, [])

  const updateQuestProgress = useCallback(async (action, count = 1) => {
    const dayIndex = Math.floor(Date.now() / 86_400_000)
    const def      = QUEST_TYPES[dayIndex % QUEST_TYPES.length]
    if (def.action !== action) return { completed: false }
    let stored = null
    const qKey = `@dailyQuest_v1_${uid_ref.current ?? 'anon'}`
    try {
      const raw = localStorage.getItem(qKey)
      if (raw) stored = JSON.parse(raw)
    } catch {}
    const valid = stored?.date === today() && stored?.questId === def.id
    if (valid && stored.completed) return { completed: true, alreadyDone: true }
    const progress  = (valid ? (stored.progress ?? 0) : 0) + count
    const completed = progress >= def.goal
    localStorage.setItem(qKey, JSON.stringify({
      date: today(), questId: def.id, progress, completed,
    }))
    if (completed && !(valid && stored.completed)) {
      triggerReaction('celebrate')
      return { completed: true, xp: 125 }
    }
    return { completed }
  }, [triggerReaction])

  const drinkPotion = useCallback(async (itemId) => {
    if (itemId !== 'xpPotion') return false
    const qty = inventory[itemId] ?? 0
    if (qty <= 0) return false

    // Consume potion
    const currentEnd = Number(localStorage.getItem('@double_xp_end') || '0')
    const newEnd = Math.max(Date.now(), currentEnd) + 600 * 1000 // 10 minutes
    localStorage.setItem('@double_xp_end', String(newEnd))
    
    // Dispatch event to notify listeners
    window.dispatchEvent(new Event('storage'))

    const newInv = { ...inventory, [itemId]: qty - 1 }
    setInventory(newInv)
    localStorage.setItem('@petInventory_v1', JSON.stringify(newInv))
    
    if (uid_ref.current) {
      try {
        await setDoc(
          doc(db, 'users', uid_ref.current, 'petInventory', itemId),
          { quantity: increment(-1) },
          { merge: true },
        )
      } catch {}
    }

    triggerReaction('celebrate')
    triggerFloat('🧪 2x XP Boost Active!')
    return true
  }, [inventory, triggerReaction])

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

  const switchBuddy = useCallback(async (newPetType) => {
    const currentName = petRef.current.name
    const newPet = {
      petType:      newPetType,
      name:         currentName,
      stage:        1,
      hunger:       100,
      happiness:    100,
      lastCheckedAt: new Date().toISOString(),
      accessories:  [],
      chosen:       true,
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
    drinkPotion,
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
    dailyDig,
    getTodayQuest,
    updateQuestProgress,
  }
}
