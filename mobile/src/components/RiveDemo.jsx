import React, { useEffect, useRef } from 'react'
import { View, Text } from 'react-native'

// rive-react-native is a native module — absent in Expo Go and on web. Guard the
// require so importing this file never crashes; fall back to a placeholder when
// the runtime isn't present (same pattern as our other native-module wrappers).
let Rive = null
let Fit = null
try {
  const mod = require('rive-react-native')
  Rive = mod.default ?? mod.RiveContainer ?? null
  Fit = mod.Fit ?? null
} catch (e) {
  Rive = null
}

const DEMO_SRC = require('../../assets/rive/owl.riv')

// owl.riv runs "State Machine 1": the owl idles + blinks on its own and looks
// toward taps via its built-in hitboxes. The state machine also exposes a number
// input "look_dir" that picks the gaze direction (matching its look_C/1/2/3
// animations). We cycle that on a gentle, slightly-randomized timer so the owl
// glances around on its own — out, then back to center — without any input.
// Taps still work (the hitbox listeners set look_dir too); auto just nudges it
// back to wandering after a moment.
const LOOK_INPUT = 'look_dir'
// 0 = center/rest, 1/2/3 = look directions. Glance out, return to center.
// Tune this sequence (or the values) to the rig if a direction looks off.
const LOOK_SEQUENCE = [0, 1, 0, 2, 0, 3]

export default function RiveDemo({ size = 200, stateMachineName = 'State Machine 1' }) {
  const riveRef = useRef(null)

  useEffect(() => {
    if (!Rive) return
    let timer
    let i = 0
    const step = () => {
      const dir = LOOK_SEQUENCE[i % LOOK_SEQUENCE.length]
      i += 1
      try {
        riveRef.current?.setInputState?.(stateMachineName, LOOK_INPUT, dir)
      } catch (e) {
        // input not present / SM not ready — ignore, the owl just idles
      }
      // Gentle cadence: ~2.4–4s between glances so it never feels frantic.
      timer = setTimeout(step, 2400 + Math.random() * 1600)
    }
    // Let the owl settle into its idle before the first glance.
    timer = setTimeout(step, 1400)
    return () => timer && clearTimeout(timer)
  }, [stateMachineName])

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
        <Text style={{ fontSize: 56 }}>🦉</Text>
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
      fit={Fit?.Contain}
      style={{ width: size, height: size }}
    />
  )
}
