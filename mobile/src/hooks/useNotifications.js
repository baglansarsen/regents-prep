import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// expo-notifications' native module (ExpoPushTokenManager) isn't currently
// linked in this build — importing it statically throws at module-load and
// prevents `registerRootComponent` from running. Load lazily so the app boots.
let Notifications = null
function getNotifications() {
  if (Notifications) return Notifications
  try {
    Notifications = require('expo-notifications')
    return Notifications
  } catch (e) {
    return null
  }
}

const KEY            = '@regents_notifications_v2'
const DEFAULT_HOUR   = 19   // 7 PM
const DEFAULT_MINUTE = 0

// Must NOT be called at module top-level — native bridge isn't ready during
// bundle eval. Called once lazily on first hook mount instead.
let handlerSet = false
function ensureHandler() {
  if (handlerSet) return
  const N = getNotifications()
  if (!N) return
  try {
    N.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge:  false,
      }),
    })
    handlerSet = true
  } catch (e) {
    // Native module not available — ignore
  }
}

// ── Personalised notification body based on streak ───────────────────────────
function buildMessage(streak = 0) {
  if (streak >= 30) return `🔥 ${streak}-day legend! Don't break the chain.`
  if (streak >= 14) return `🔥 ${streak} days strong! Keep that streak alive.`
  if (streak >= 7)  return `Don't break your 🔥 ${streak}-day streak! Study a little today.`
  if (streak >= 3)  return `You're on a 🔥 ${streak}-day streak — keep going!`
  if (streak >= 1)  return `🔥 ${streak}-day streak! A little studying goes a long way.`
  return "Ready to start a streak? Study a little today! 📚"
}

// ── Display helper ("7:00 PM") ────────────────────────────────────────────────
export function formatTime(hour, minute = 0) {
  const h    = hour % 12 || 12
  const m    = String(minute).padStart(2, '0')
  const ampm = hour < 12 ? 'AM' : 'PM'
  return `${h}:${m} ${ampm}`
}

export function useNotifications(streak = 0) {
  const [enabled, setEnabled] = useState(false)
  const [hour,    setHour]    = useState(DEFAULT_HOUR)
  const [minute,  setMinute]  = useState(DEFAULT_MINUTE)
  const [loaded,  setLoaded]  = useState(false)

  // Set notification handler once native bridge is ready
  useEffect(() => { ensureHandler() }, [])

  // Load saved prefs
  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (raw) {
          const data = JSON.parse(raw)
          setEnabled(data.enabled ?? false)
          setHour(data.hour       ?? DEFAULT_HOUR)
          setMinute(data.minute   ?? DEFAULT_MINUTE)
        }
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  // Core schedule — always cancels existing before creating
  const schedule = useCallback(async (h, m, currentStreak) => {
    const N = getNotifications()
    if (!N) return
    await N.cancelAllScheduledNotificationsAsync()
    await N.scheduleNotificationAsync({
      content: {
        title: 'Time to study! 📖',
        body:  buildMessage(currentStreak),
        sound: true,
      },
      trigger: { hour: h, minute: m, repeats: true },
    })
  }, [])

  // Enable: request permission, schedule, persist
  const enable = useCallback(async () => {
    const N = getNotifications()
    if (!N) return false
    const { status } = await N.requestPermissionsAsync()
    if (status !== 'granted') return false
    await schedule(hour, minute, streak)
    setEnabled(true)
    AsyncStorage.setItem(KEY, JSON.stringify({ enabled: true, hour, minute })).catch(() => {})
    return true
  }, [hour, minute, streak, schedule])

  // Disable: cancel all, persist
  const disable = useCallback(async () => {
    const N = getNotifications()
    if (N) await N.cancelAllScheduledNotificationsAsync()
    setEnabled(false)
    AsyncStorage.setItem(KEY, JSON.stringify({ enabled: false, hour, minute })).catch(() => {})
  }, [hour, minute])

  const toggle = useCallback(() => {
    if (enabled) disable()
    else enable()
  }, [enabled, enable, disable])

  // Change reminder time — reschedules immediately if notifications are on
  const setTime = useCallback(async (h, m) => {
    setHour(h)
    setMinute(m)
    AsyncStorage.setItem(KEY, JSON.stringify({ enabled, hour: h, minute: m })).catch(() => {})
    if (enabled) await schedule(h, m, streak)
  }, [enabled, streak, schedule])

  // Reschedule once per day when the streak changes so the message body stays fresh
  useEffect(() => {
    if (!loaded || !enabled) return
    schedule(hour, minute, streak).catch(() => {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streak, loaded])

  return {
    enabled, hour, minute, loaded,
    toggle, enable, disable, setTime,
    formattedTime: formatTime(hour, minute),
  }
}
