import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import ReggieMascot from '../components/ReggieMascot'
import { NATIVE_DRIVER, SPRING } from './tokens'
import { useReducedMotion } from './useReducedMotion'

/**
 * Reggie with a one-shot reaction when he appears:
 *   encourage / celebrate → hop with a squash-and-stretch landing
 *   oops                  → droop (sink + tilt), then settle
 * Remount (or change `pose`) to react again. Static under Reduce Motion.
 */
export default function ReactingReggie({ pose = 'idle', size = 48, style }) {
  const reduced = useReducedMotion()
  const y = useRef(new Animated.Value(0)).current
  const sy = useRef(new Animated.Value(1)).current
  const tilt = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (reduced) return
    const sp = (v, to, cfg = SPRING.bouncy) => Animated.spring(v, { toValue: to, ...cfg, useNativeDriver: NATIVE_DRIVER })
    const tm = (v, to, d) => Animated.timing(v, { toValue: to, duration: d, useNativeDriver: NATIVE_DRIVER })
    let a
    if (pose === 'encourage' || pose === 'celebrate') {
      y.setValue(0); sy.setValue(1)
      a = Animated.sequence([
        tm(sy, 0.88, 70),                                        // crouch
        Animated.parallel([tm(y, -12, 160), tm(sy, 1.06, 160)]), // spring up, stretch
        Animated.parallel([sp(y, 0), sp(sy, 1)]),                // land, settle
      ])
    } else if (pose === 'oops') {
      a = Animated.sequence([
        Animated.parallel([tm(y, 4, 160), tm(tilt, -1, 160)]),
        Animated.parallel([sp(y, 0, SPRING.gentle), sp(tilt, 0, SPRING.gentle)]),
      ])
    }
    a?.start()
    return () => a?.stop()
  }, [pose, reduced])

  const rotate = tilt.interpolate({ inputRange: [-1, 0], outputRange: ['-8deg', '0deg'] })

  return (
    <Animated.View style={[style, { transform: [{ translateY: y }, { rotate }, { scaleY: sy }] }]}>
      <ReggieMascot pose={pose} size={size} />
    </Animated.View>
  )
}
