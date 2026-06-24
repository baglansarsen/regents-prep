import { useState, useEffect, useCallback, useRef } from 'react'

// Lazy-guarded like useQuizSound: expo-speech is a native Expo module, so it's
// absent in Expo Go / web builds. Guard the require so its absence is a no-op
// (button hidden via `available`), never a crash.
let Speech = null
try { Speech = require('expo-speech') } catch {}

// expo-av is used only to put the audio session in "play in silent mode" so the
// speech is audible even when the iOS ring/silent switch is OFF (muted) — TTS is
// an accessibility aid and must not be silenced by the hardware switch.
let Audio = null
try { Audio = require('expo-av').Audio } catch {}

/**
 * Text-to-speech for reading questions aloud (accessibility, free).
 * Returns:
 *   available — whether TTS is usable in this binary (hide the UI when false)
 *   speaking  — whether speech is currently playing
 *   toggle(text) — start reading `text`, or stop if already speaking
 *   stop()    — stop any speech (also call on question change / unmount)
 */
export function useReadAloud() {
  const [speaking, setSpeaking] = useState(false)
  const available = !!Speech?.speak

  // Keep a ref so the unmount cleanup always sees the latest state without
  // re-subscribing the effect.
  const speakingRef = useRef(false)
  speakingRef.current = speaking

  const stop = useCallback(() => {
    try { Speech?.stop?.() } catch {}
    setSpeaking(false)
  }, [])

  const toggle = useCallback(async (text) => {
    if (!available || !text) return
    if (speakingRef.current) { stop(); return }
    setSpeaking(true)
    try {
      // Make TTS audible regardless of the iOS ring/silent switch.
      try { await Audio?.setAudioModeAsync?.({ playsInSilentModeIOS: true }) } catch {}
      Speech.speak(String(text), {
        rate: 0.95,
        onDone:    () => setSpeaking(false),
        onStopped: () => setSpeaking(false),
        onError:   () => setSpeaking(false),
      })
    } catch {
      setSpeaking(false)
    }
  }, [available, stop])

  // Stop speech if the component using this hook unmounts.
  useEffect(() => () => { try { Speech?.stop?.() } catch {} }, [])

  return { available, speaking, toggle, stop }
}
