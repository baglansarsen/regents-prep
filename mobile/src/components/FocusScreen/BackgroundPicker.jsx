/**
 * BackgroundPicker — the "Background" scene swatch row from
 * FocusSetupScreen's setup form.
 *
 * Extracted under components/FocusScreen/ (FOCUS-03). Each swatch is filled
 * with that scene's own bottom tone and carries its glyph; the selected
 * swatch takes a thicker text-colored border while every other swatch keeps
 * the default transparent one — a border-width change is the selection
 * indicator, not a background-color change.
 *
 * `testID={swatch-<id>}` is added purely for test addressability (no
 * user-visible effect) since the selection indicator lives on this
 * component's own style, not on any text content a query could target.
 */
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '../../context/ThemeContext'

export default function BackgroundPicker({ backgrounds, background, onSelectBackground }) {
  const { C } = useTheme()
  const s = makeStyles(C)

  return (
    <>
      <Text style={[s.sectionLabel, { color: C.textMuted }]}>Background</Text>
      <View style={s.bgRow}>
        {backgrounds.map((bg) => (
          <TouchableOpacity
            key={bg.id}
            testID={`swatch-${bg.id}`}
            onPress={() => onSelectBackground(bg)}
            activeOpacity={0.8}
            style={[
              s.bgSwatch,
              { backgroundColor: bg.bottom },
              background.id === bg.id && { borderColor: C.text, borderWidth: 3 },
            ]}
          >
            <Text style={{ fontSize: 18 }}>{bg.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    sectionLabel: { fontSize: 12, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10, marginTop: 20 },
    bgRow:   { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
    bgSwatch: {
      width:          48,
      height:         48,
      borderRadius:   14,
      alignItems:     'center',
      justifyContent: 'center',
      borderWidth:    2,
      borderColor:    'transparent',
    },
  })
}
