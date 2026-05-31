import { useState, useEffect, useCallback, useRef } from 'react'
import { doc, getDoc, setDoc, getDocs, collection, increment } from 'firebase/firestore'
import { db } from '../firebase'
import {
  stageForXP, PET_MESSAGES, STAGE_NAMES, QUEST_TYPES,
  FOOD_ITEMS, HAPPINESS_ITEMS, HUNGER_ALERTS, HAPPINESS_ALERTS,
} from '@content/petConfig'

function today() { return new Date().toISOString().slice(0, 10) }

const LS_KEY_PET = 'regents_petData_v1'
const LS_KEY_EVO = 'regents_petPendingEvo_v1'

const DECAY_HUNGER_OPEN    = 5
const DECAY_HAPPINESS_OPEN = 3
const CLOSED_FACTOR        = 0.4
const DECAY_INTERVAL_MS    = 2 * 60 * 1000

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

function lsGet(key) { try { return localStorage.getItem(key) } catch { return null } }
function lsSet(key, val) { try { localStorage.setItem(key, val) } catch {} }
function lsRemove(key) { try { localStorage.removeItem(key) } catch {} }

export function usePet(uid) {
  const [pet,                setPet]                = useState(DEFAULT_PET)
  const [inventory,          setInventory]          = useState({})
  const [pendingEvolution,   setPendingEvolution]   = useState(false)
  const [activeReaction,     setActiveReaction]     = useState(null)
  const [activeFloatMessage, setActiveFloatMessage] = useState(null)
  const reactionTimeout = useRef(null)
  const floatMsgTimeout = useRef(null)
  const decayRef        = useRef(null)
  const petRef          = useRef(DEFAULT_PET)
  const uid_ref         = useRef(uid)
  uid_ref.current = uid

  async function savePet(data) {
    petRef.current = data
    setPet(data)
    lsSet(LS_KEY_PET, JSON.stringify(data))
    if (uid_ref.current) {
      try {
        await setDoc(doc(db, 'users', uid_ref.current, 'meta', 'pet'), data, { merge: true })
      } catch {}
    }
  }

  useEffect(() => {
    if (!uid) return
    ;(async () => {
      let loaded = null
      try {
        const snap = await getDoc(doc(db, 'users', uid, 'meta', 'pet'))
        if (snap.exists()) loaded = snap.data()
      } catch {}

      if (!loaded) {
        const raw = lsGet(LS_KEY_PET)
        if (raw) { try { loaded = JSON.parse(raw) } catch {} }
      }

      if (!loaded?.chosen) return

      const now       = Date.now()
      const last      = new Date(loaded.lastCheckedAt ?? now).getTime()
      const elapsedHr = (now - last) / 3_600_000
      const updated = {
        ...loaded,
        hunger:       clamp(loaded.hunger - elapsedHr * DECAY_HUNGER_OPEN * CLOSED_FACTOR, 0, 100),
        happiness:    clamp(loaded.happiness - elapsedHr * DECAY_HAPPINESS_OPEN * CLOSED_FACTOR, 0, 100),
        lastCheckedAt: new Date().toISOString(),
      }
      petRef.current = updated
      setPet(updated)

      try {
        const invSnap = await getDocs(collection(db, 'users', uid, 'petInventory'))
        const inv = {}
        invSnap.forEach((d) => { inv[d.id] = d.data().quantity ?? 0 })
        setInventory(inv)
      } catch {}

      if (lsGet(LS_KEY_EVO) === 'true') setPendingEvolution(true)
    })()
  }, [uid])

  useEffect(() => {
    if (!pet.chosen) return
    clearInterval(decayRef.current)
    decayRef.current = setInterval(async () => {
      const cur = petRef.current
      if (!cur.chosen) return
      const hrFraction = DECAY_INTERVAL_MS / 3_600_000
      const updated = {
        ...cur,
        hunger:       clamp(cur.hunger - DECAY_HUNGER_OPEN * hrFraction, 0, 100),
        happiness:    clamp(cur.happiness - DECAY_HAPPINESS_OPEN * hrFraction, 0, 100),
        lastCheckedAt: new Date().toISOString(),
      }
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
    const restore = item.hungerRestore ?? Math.floor(Math.random() * 71 + 30)
    await savePet({ ...petRef.current, hunger: clamp(petRef.current.hunger + restore, 0, 100) })
    const newInv = { ...inventory, [itemId]: qty - 1 }
    setInventory(newInv)
    if (uid_ref.current) {
      try {
        await setDoc(doc(db, 'users', uid_ref.current, 'petInventory', itemId), { quantity: increment(-1) }, { merge: true })
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
    await savePet({ ...petRef.current, happiness: clamp(petRef.current.happiness + item.happinessRestore, 0, 100) })
    const newInv = { ...inventory, [itemId]: qty - 1 }
    setInventory(newInv)
    if (uid_ref.current) {
      try {
        await setDoc(doc(db, 'users', uid_ref.current, 'petInventory', itemId), { quantity: increment(-1) }, { merge: true })
      } catch {}
    }
    triggerReaction(item.reaction ?? 'happy_dance')
    triggerFloat(`+${item.happinessRestore} 😊`)
    return true
  }, [inventory, triggerReaction])

  const addInventory = useCallback(async (itemId, qty = 1) => {
    setInventory((prev) => ({ ...prev, [itemId]: (prev[itemId] ?? 0) + qty }))
    if (uid_ref.current) {
      try {
        await setDoc(doc(db, 'users', uid_ref.current, 'petInventory', itemId), { quantity: increment(qty) }, { merge: true })
      } catch {}
    }
  }, [])

  const toggleCosmetic = useCallback(async (itemId) => {
    const acc = petRef.current.accessories ?? []
    const isEquipped = acc.includes(itemId)
    const next = isEquipped ? acc.filter((a) => a !== itemId) : [...acc, itemId]
    await savePet({ ...petRef.current, accessories: next })
    triggerReaction(isEquipped ? 'sympathetic' : 'celebrate')
    if (!isEquipped) triggerFloat('✨ Equipped!')
  }, [triggerReaction])

  const renamePet = useCallback(async (name) => {
    await savePet({ ...petRef.current, name: name.trim().slice(0, 20) })
  }, [])

  const checkAndEvolve = useCallback(async (totalXP) => {
    const cur = petRef.current
    if (!cur.chosen) return
    const expectedStage = stageForXP(totalXP)
    if (expectedStage <= cur.stage) return
    await savePet({ ...cur, stage: expectedStage })
    setPendingEvolution(true)
    lsSet(LS_KEY_EVO, 'true')
  }, [])

  const clearPendingEvolution = useCallback(() => {
    setPendingEvolution(false)
    lsRemove(LS_KEY_EVO)
  }, [])

  const getPetMessage = useCallback(({ streak = 0, daysSince = 0 } = {}) => {
    const cur = petRef.current
    if (!cur.petType) return null
    const pool = PET_MESSAGES[cur.petType] ?? []
    if (!pool.length) return null
    const msg = pool[Math.floor(Date.now() / 86_400_000) % pool.length]
    return msg
      .replace(/\{name\}/g,      cur.name ?? 'friend')
      .replace(/\{streak\}/g,    String(streak))
      .replace(/\{daysSince\}/g, String(daysSince))
      .replace(/\{stage\}/g,     String(cur.stage))
      .replace(/\{stageName\}/g, STAGE_NAMES[cur.stage] ?? '')
  }, [])

  const petPet = useCallback(async () => {
    const key   = `regents_petted_v1_${today()}_${uid_ref.current ?? 'anon'}`
    const count = parseInt(lsGet(key) || '0')
    if (count >= 3) { triggerReaction('sympathetic'); return { ok: false, reason: 'limit' } }
    lsSet(key, String(count + 1))
    await savePet({ ...petRef.current, happiness: clamp(petRef.current.happiness + 8, 0, 100) })
    triggerReaction('cheer')
    return { ok: true, remaining: 2 - count }
  }, [triggerReaction])

  const dailyDig = useCallback(async () => {
    const key  = `regents_lastDig_v1_${uid_ref.current ?? 'anon'}`
    const last = lsGet(key)
    if (last === today()) return { ok: false }
    lsSet(key, today())
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

  function questKey() { return `regents_dailyQuest_v1_${uid_ref.current ?? 'anon'}` }

  const getTodayQuest = useCallback(() => {
    const dayIndex = Math.floor(Date.now() / 86_400_000)
    const def = QUEST_TYPES[dayIndex % QUEST_TYPES.length]
    const raw = lsGet(questKey())
    let stored = null
    try { if (raw) stored = JSON.parse(raw) } catch {}
    const valid = stored?.date === today() && stored?.questId === def.id
    return { ...def, progress: valid ? (stored.progress ?? 0) : 0, completed: valid ? !!stored.completed : false }
  }, [])

  const updateQuestProgress = useCallback(async (action, count = 1) => {
    const dayIndex = Math.floor(Date.now() / 86_400_000)
    const def = QUEST_TYPES[dayIndex % QUEST_TYPES.length]
    if (def.action !== action) return { completed: false }
    const raw = lsGet(questKey())
    let stored = null
    try { if (raw) stored = JSON.parse(raw) } catch {}
    const valid = stored?.date === today() && stored?.questId === def.id
    if (valid && stored.completed) return { completed: true, alreadyDone: true }
    const progress = (valid ? (stored.progress ?? 0) : 0) + count
    const completed = progress >= def.goal
    lsSet(questKey(), JSON.stringify({ date: today(), questId: def.id, progress, completed }))
    if (completed && !(valid && stored.completed)) {
      triggerReaction('celebrate')
      return { completed: true, xp: 125 }
    }
    return { completed }
  }, [triggerReaction])

  const initializePet = useCallback(async (petType, name) => {
    const newPet = {
      petType, name, stage: 1, hunger: 100, happiness: 100,
      lastCheckedAt: new Date().toISOString(), accessories: [], chosen: true,
    }
    await savePet(newPet)
  }, [])

  const switchBuddy = useCallback(async (newPetType) => {
    await savePet({
      petType: newPetType, name: petRef.current.name, stage: 1,
      hunger: 100, happiness: 100, lastCheckedAt: new Date().toISOString(),
      accessories: [], chosen: true,
    })
  }, [])

  return {
    pet, inventory, pendingEvolution, activeReaction, activeFloatMessage,
    feedPet, playWithPet, addInventory, toggleCosmetic, renamePet,
    checkAndEvolve, clearPendingEvolution, triggerReaction, getPetMessage,
    initializePet, switchBuddy, petPet, dailyDig, getTodayQuest, updateQuestProgress,
  }
}
