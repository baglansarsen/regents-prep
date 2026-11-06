import { useCallback, useEffect, useRef } from 'react'
import { usePreferences } from '../context/PreferencesContext'

let Audio = null
try {
  Audio = require('expo-av').Audio
} catch {}

const CDN_BASE = 'https://regents-prep.web.app'

// enabled=false skips loading the audio entirely (callers that only want the
// stable no-op API, e.g. useFeedback on a plain button).
// Also silent (and nothing loaded) when "Sound effects" is off in Settings.
export function useQuizSound({ enabled = true } = {}) {
  const { soundEffects, loaded } = usePreferences()
  // Wait for the saved preference — the default (on) would otherwise start
  // downloading sounds for someone who turned them off.
  const on = enabled && loaded && soundEffects
  const correctRef = useRef(null)
  const wrongRef   = useRef(null)

  useEffect(() => {
    if (!Audio || !on) return
    let mounted = true

    async function load() {
      try {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
        const [c, w] = await Promise.all([
          Audio.Sound.createAsync({ uri: `${CDN_BASE}/sounds/correct.wav` }, { volume: 0.6 }),
          Audio.Sound.createAsync({ uri: `${CDN_BASE}/sounds/wrong.wav`   }, { volume: 0.6 }),
        ])
        if (!mounted) { c.sound.unloadAsync(); w.sound.unloadAsync(); return }
        correctRef.current = c.sound
        wrongRef.current   = w.sound
      } catch {}
    }

    load()

    return () => {
      mounted = false
      correctRef.current?.unloadAsync()
      wrongRef.current?.unloadAsync()
      correctRef.current = null
      wrongRef.current = null
    }
  }, [on])

  // Stable identities: safe to list in deps / memoise on.
  const playCorrect = useCallback(async () => {
    try { await correctRef.current?.replayAsync() } catch {}
  }, [])

  const playWrong = useCallback(async () => {
    try { await wrongRef.current?.replayAsync() } catch {}
  }, [])

  return { playCorrect, playWrong }
}
