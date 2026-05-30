import React from 'react'
import { View } from 'react-native'

// rive-react-native is native-only. On web, render an empty box of the same
// size so layout is preserved (the pet simply doesn't animate via Rive here).
export default function RiveAnimation({ size = 100 }) {
  return <View style={{ width: size, height: size }} />
}
