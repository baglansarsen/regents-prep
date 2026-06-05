import { useEffect, useRef } from 'react'

let Audio = null
try {
  Audio = require('expo-av').Audio
} catch {}

const CDN_BASE = 'https://regents-prep.web.app'

export function useQuizSound() {
  const correctRef = useRef(null)
  const wrongRef   = useRef(null)

  useEffect(() => {
    if (!Audio) return
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
    }
  }, [])

  async function playCorrect() {
    try { await correctRef.current?.replayAsync() } catch {}
  }

  async function playWrong() {
    try { await wrongRef.current?.replayAsync() } catch {}
  }

  return { playCorrect, playWrong }
}
