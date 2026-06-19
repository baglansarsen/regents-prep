import React, { useEffect, useRef } from 'react'
import { View, Text } from 'react-native'

// rive-react-native is a native module — absent in Expo Go and on web. Guard the
// require so importing this file never crashes; fall back to a placeholder when
// the runtime isn't present (same pattern as our other native-module wrappers).
let Rive = null
let Fit = null
let AutoBind = null
try {
  const mod = require('rive-react-native')
  Rive = mod.default ?? mod.RiveContainer ?? null
  Fit = mod.Fit ?? null
  AutoBind = mod.AutoBind ?? null
} catch (e) {
  Rive = null
}

const DEMO_SRC = require('../../assets/rive/democat.riv')

// democat.riv exposes a "View Model 1" with number props "X value" / "Y value"
// that drive the cat's look-target. We auto-bind that view model and slowly
// sweep the target in a lazy ellipse so the cat gazes around on its own —
// a gentle idle "look around" with no input needed.
const LOOK = {
  ampX: 160, // horizontal gaze reach (artboard units)
  ampY: 110, // vertical gaze reach
  speed: 0.00035, // radians/ms — small = slow, sleepy drift
}

export default function RiveDemo({ size = 200, stateMachineName = 'State Machine 1' }) {
  const riveRef = useRef(null)

  useEffect(() => {
    if (!Rive) return
    let raf
    const start = Date.now()
    const tick = () => {
      const t = (Date.now() - start) * LOOK.speed
      // Lissajous-ish: X and Y on slightly different periods so the path never
      // repeats exactly — reads as natural wandering rather than a fixed circle.
      const x = Math.sin(t) * LOOK.ampX
      const y = Math.sin(t * 0.7 + 0.9) * LOOK.ampY
      try {
        riveRef.current?.setNumber?.('X value', x)
        riveRef.current?.setNumber?.('Y value', y)
      } catch (e) {
        // view model not ready yet on the first frames — ignore
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => raf && cancelAnimationFrame(raf)
  }, [])

  if (!Rive) {
    return (
      <View
        style={{
          width: size,
          height: size,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 56 }}>🐱</Text>
        <Text style={{ fontSize: 11, opacity: 0.5, marginTop: 4 }}>Rive needs a dev build</Text>
      </View>
    )
  }

  return (
    <Rive
      ref={riveRef}
      source={DEMO_SRC}
      autoplay
      {...(stateMachineName ? { stateMachineName } : {})}
      {...(AutoBind ? { dataBinding: AutoBind(true) } : {})}
      fit={Fit?.Contain}
      style={{ width: size, height: size }}
    />
  )
}
