import React from 'react'
import { View } from 'react-native'

// lottie-react-native is native-only. On web, render an empty box of the same
// size so layout is preserved (the pet simply doesn't animate via Lottie here).
export default function LottieAnimation({ size = 100 }) {
  return <View style={{ width: size, height: size }} />
}
