import { Platform, useWindowDimensions } from 'react-native'

// Window size that stays correct when it changes at runtime: folding/unfolding
// an iPhone Duo (5.4" outer ↔ 7.6" inner), Split View, iPad multitasking, or
// rotation. Never read Dimensions.get() at module scope — that value is frozen
// at first import and goes stale the moment the window resizes.

// Width above which phone-designed layouts should stop stretching and centre
// instead (inner Duo display in landscape, iPad, wide web windows).
export const MAX_CONTENT_WIDTH = 640

export function layoutFor(width, height) {
  const contentWidth = Platform.OS === 'web'
    ? Math.min(Math.max(width || 360, 320), 480)
    : Math.min(width, MAX_CONTENT_WIDTH)
  return {
    width,
    height,
    contentWidth,
    // Decide layout from available space, never from orientation or idiom
    // (Apple's iPhone Duo guidance).
    isWide: width >= 600,
  }
}

export function useLayout() {
  const { width, height } = useWindowDimensions()
  return layoutFor(width, height)
}

// Native-stack `contentStyle` that keeps phone-designed screens at a readable
// width on wide windows (Duo unfolded in landscape, iPad). Returns undefined
// at phone widths so nothing changes there. The gutters show the navigation
// theme background (C.bg).
export function useReadableContentStyle() {
  const { width } = useWindowDimensions()
  if (Platform.OS === 'web' || width <= MAX_CONTENT_WIDTH) return undefined
  return { width: MAX_CONTENT_WIDTH, alignSelf: 'center' }
}
