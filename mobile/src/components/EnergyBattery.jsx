import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { energyPercent } from '../utils/energy'

function batteryColor(percent, C, light) {
  if (percent <= 20) return '#EF4444'
  if (percent <= 50) return '#F59E0B'
  return light ? '#FFFFFF' : (C?.brand ?? '#16A34A')
}

export default function EnergyBattery({
  lives = 0,
  maxLives = 5,
  unlimited = false,
  C,
  light = false,
  size = 'regular',
  showLabel = true,
  label = 'Energy',
  style,
}) {
  const percent = unlimited ? 100 : energyPercent(lives, maxLives)
  const fillColor = unlimited ? '#A855F7' : batteryColor(percent, C, light)
  const isCompact = size === 'compact'
  const textColor = light ? '#FFFFFF' : (C?.text ?? '#111827')
  const mutedColor = light ? 'rgba(255,255,255,0.78)' : (C?.textMuted ?? '#6B7280')
  const shellBorder = light ? 'rgba(255,255,255,0.88)' : (C?.border ?? '#D1D5DB')
  const shellBg = light ? 'rgba(255,255,255,0.18)' : (C?.surface2 ?? '#F3F4F6')

  return (
    <View style={[s.wrap, isCompact && s.wrapCompact, style]}>
      <View
        style={[
          s.battery,
          isCompact && s.batteryCompact,
          { borderColor: shellBorder, backgroundColor: shellBg },
        ]}
      >
        <View
          style={[
          s.fill,
            { width: `${percent}%`, minWidth: percent > 0 ? 2 : 0, backgroundColor: fillColor },
          ]}
        />
        <View style={[s.nub, { backgroundColor: shellBorder }]} />
      </View>
      <Text style={[s.percent, isCompact && s.percentCompact, { color: textColor }]}>
        {unlimited ? '∞' : `${percent}%`}
      </Text>
      {showLabel && (
        <Text style={[s.label, isCompact && s.labelCompact, { color: mutedColor }]}>
          {label}
        </Text>
      )}
    </View>
  )
}

const s = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  wrapCompact: {
    gap: 5,
  },
  battery: {
    width: 36,
    height: 18,
    borderRadius: 5,
    borderWidth: 2,
    padding: 2,
    justifyContent: 'center',
    position: 'relative',
  },
  batteryCompact: {
    width: 30,
    height: 15,
    borderRadius: 4,
    borderWidth: 1.5,
    padding: 2,
  },
  fill: {
    height: '100%',
    borderRadius: 2,
  },
  nub: {
    position: 'absolute',
    right: -5,
    width: 3,
    height: 8,
    borderRadius: 2,
  },
  percent: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 14,
  },
  percentCompact: {
    fontSize: 12,
  },
  label: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 12,
  },
  labelCompact: {
    fontSize: 11,
  },
})
