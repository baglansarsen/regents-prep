import React from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { Circle } from 'react-native-svg'

/**
 * Circular SVG progress ring (like Duolingo's daily goal ring).
 *
 * @param {number} size         – outer diameter in dp (default 80)
 * @param {number} strokeWidth  – ring thickness (default 8)
 * @param {number} progress     – 0.0 → 1.0
 * @param {string} color        – arc color
 * @param {string} trackColor   – background ring color
 * @param {React.ReactNode} children – optional content to render in the center
 */
export default function GoalRing({
  size = 80,
  strokeWidth = 8,
  progress = 0,
  color = '#1FC36B',
  trackColor = '#E5E7EB',
  children,
}) {
  const p   = Math.min(1, Math.max(0, progress))
  const cx  = size / 2
  const cy  = size / 2
  const r   = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * r
  const dashOffset    = circumference * (1 - p)

  return (
    <View style={{ width: size, height: size }}>
      {/* SVG arcs — rotated so the arc starts at the top (12 o'clock) */}
      <Svg
        width={size}
        height={size}
        style={StyleSheet.absoluteFill}
        // Rotate so progress starts from top
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Track (background ring) */}
        <Circle
          cx={cx} cy={cy} r={r}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress arc */}
        {p > 0 && (
          <Circle
            cx={cx} cy={cy} r={r}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            // Start from top (12 o'clock) = -90 deg rotation
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        )}
      </Svg>

      {/* Center content */}
      {children && (
        <View style={[StyleSheet.absoluteFill, s.center]}>
          {children}
        </View>
      )}
    </View>
  )
}

const s = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
})
