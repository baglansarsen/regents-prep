import { useRef, useState, useCallback } from 'react'
import { Share, Platform } from 'react-native'

// ── Native module guards (Expo Go / web safe) ───────────────────────────────
// Both modules ship in Expo Go, but guard anyway per repo convention so a
// missing native module never crashes the app.
let captureRef = null
try {
  captureRef = require('react-native-view-shot').captureRef
} catch (e) {
  console.warn('[useShareCard] react-native-view-shot unavailable:', e?.message)
}

let Sharing = null
try {
  Sharing = require('expo-sharing')
} catch (e) {
  console.warn('[useShareCard] expo-sharing unavailable:', e?.message)
}

/**
 * Capture a <ShareCard> (or any view) as an image and open the native
 * share sheet. Falls back to a plain-text share when image capture or
 * file sharing is unavailable (e.g. web).
 *
 * Usage:
 *   const { cardRef, sharing, shareCard } = useShareCard()
 *   <View ref={cardRef} collapsable={false}><ShareCard ... /></View>
 *   <Button onPress={() => shareCard({ message: 'I scored 92%!' })} />
 */
export function useShareCard() {
  const cardRef = useRef(null)
  const [sharing, setSharing] = useState(false)

  const shareCard = useCallback(async ({ message = '' } = {}) => {
    if (sharing) return
    setSharing(true)
    try {
      // Preferred path: capture view → share PNG via native sheet
      if (captureRef && Sharing && Platform.OS !== 'web') {
        const available = await Sharing.isAvailableAsync().catch(() => false)
        if (available && cardRef.current) {
          const uri = await captureRef(cardRef.current, {
            format: 'png',
            quality: 1,
            result: 'tmpfile',
          })
          await Sharing.shareAsync(uri, {
            mimeType: 'image/png',
            dialogTitle: 'Share your score',
            UTI: 'public.png',
          })
          return true
        }
      }
      // Fallback: text-only share (web / stripped builds)
      if (message) await Share.share({ message })
      return true
    } catch (e) {
      // User-cancelled shares also land here on some platforms — stay quiet.
      console.warn('[useShareCard] share failed:', e?.message)
      return false
    } finally {
      setSharing(false)
    }
  }, [sharing])

  return { cardRef, sharing, shareCard }
}
