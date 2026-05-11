import { useState, useEffect, useCallback } from 'react'
import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY = '@regents_notifications_v1'
const DEFAULT_HOUR = 19  // 7 PM

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export function useNotifications() {
  const [enabled, setEnabled]   = useState(false)
  const [hour,    setHour]      = useState(DEFAULT_HOUR)
  const [loaded,  setLoaded]    = useState(false)

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((raw) => {
      if (raw) {
        const data = JSON.parse(raw)
        setEnabled(data.enabled ?? false)
        setHour(data.hour ?? DEFAULT_HOUR)
      }
      setLoaded(true)
    }).catch(() => setLoaded(true))
  }, [])

  const schedule = useCallback(async (h) => {
    await Notifications.cancelAllScheduledNotificationsAsync()
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Time to study! 📚',
        body: 'Your Living Environment Regents exam is coming — keep your streak alive!',
      },
      trigger: {
        hour: h,
        minute: 0,
        repeats: true,
      },
    })
  }, [])

  const enable = useCallback(async () => {
    const { status } = await Notifications.requestPermissionsAsync()
    if (status !== 'granted') return false
    await schedule(hour)
    setEnabled(true)
    AsyncStorage.setItem(KEY, JSON.stringify({ enabled: true, hour })).catch(() => {})
    return true
  }, [hour, schedule])

  const disable = useCallback(async () => {
    await Notifications.cancelAllScheduledNotificationsAsync()
    setEnabled(false)
    AsyncStorage.setItem(KEY, JSON.stringify({ enabled: false, hour })).catch(() => {})
  }, [hour])

  const toggle = useCallback(() => {
    if (enabled) disable()
    else enable()
  }, [enabled, enable, disable])

  return { enabled, hour, loaded, toggle, enable, disable }
}
