import React, { useState, useEffect } from 'react'
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native'
import { imageUri } from '../utils/cdn'

/**
 * ExamImage — robust loader for exam/question diagrams.
 *
 * Fixes the recurring "disappearing graphs" bug: the previous fallback
 * components set a permanent `failed` flag on the FIRST error and returned
 * null forever. Because React reuses the same <Image> instance by position
 * as the user navigates questions, one transient failure (slow network,
 * offline-first cache miss) permanently hid the image at that slot for every
 * later question.
 *
 * This component:
 *  - resets its state whenever the source path changes (critical fix), and
 *  - retries a transient error a couple of times with a cache-busting param
 *    before giving up, so an offline-then-online image recovers on its own.
 *
 * Pass either `path` (a relative "/images/..." string, resolved via the CDN)
 * or a full `uri`.
 */
export default function ExamImage({ path, uri, style }) {
  const resolved = uri ?? imageUri(path)

  const [status,  setStatus]  = useState('loading')   // 'loading' | 'loaded' | 'error'
  const [attempt, setAttempt] = useState(0)

  // Reset on every source change — the whole point of the fix.
  useEffect(() => {
    setStatus('loading')
    setAttempt(0)
  }, [resolved])

  if (!resolved) return null
  if (status === 'error') return null   // genuine 404 after retries — collapse gracefully

  // Cache-bust on retries so RN re-requests instead of replaying its negative cache.
  const src = attempt > 0 ? `${resolved}${resolved.includes('?') ? '&' : '?'}r=${attempt}` : resolved

  return (
    <View style={[style, styles.wrap]}>
      <Image
        key={attempt}
        source={{ uri: src }}
        style={styles.img}
        resizeMode="contain"
        onLoad={() => setStatus('loaded')}
        onError={() => {
          if (attempt < 2) {
            setTimeout(() => setAttempt((a) => a + 1), 700 * (attempt + 1))
          } else {
            setStatus('error')
          }
        }}
      />
      {status === 'loading' && (
        <View style={styles.spinner} pointerEvents="none">
          <ActivityIndicator size="small" />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap:    { overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  img:     { width: '100%', height: '100%' },
  spinner: { position: 'absolute' },
})
