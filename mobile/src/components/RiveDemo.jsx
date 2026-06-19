import React from 'react'
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

// Test harness for the Rive runtime inside Focus Mode. Renders owl.riv with its
// "State Machine 1" running: the owl idles and blinks on its own, and its tap
// regions (hitbox_look_1/2/3/C) make it look toward wherever you press —
// rive-react-native forwards touch to the state machine automatically, so the
// rig drives everything itself (no coordinate math needed).
// Swap DEMO_SRC for reggie.riv once we have the exported file.
export default function RiveDemo({ size = 200, stateMachineName = 'State Machine 1' }) {
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
      source={DEMO_SRC}
      autoplay
      {...(stateMachineName ? { stateMachineName } : {})}
      fit={Fit?.Contain}
      style={{ width: size, height: size }}
    />
  )
}
