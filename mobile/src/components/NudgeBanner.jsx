import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import { T } from '../styles/duo'

export default function NudgeBanner({ message, emoji, type, onDismiss, cta }) {
  const { C } = useTheme()

  const colorMap = {
    success: { border: C.brand, bg: C.brandBg },
    info: { border: C.blue, bg: C.blueBg },
    warning: { border: C.warn, bg: C.warnBg },
  }

  const { border, bg } = colorMap[type] || colorMap.info
  const styles = makeStyles(border, bg)

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={[T.body, styles.message]}>{message}</Text>
        {onDismiss && (
          <TouchableOpacity onPress={onDismiss} style={styles.dismissBtn}>
            <Text style={styles.dismissX}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      {cta && (
        <TouchableOpacity onPress={cta.onPress} style={[styles.ctaBtn, { borderColor: border }]}>
          <Text style={[T.label, { color: border, textTransform: 'none', letterSpacing: 0 }]}>
            {cta.label}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const makeStyles = (borderColor, bgColor) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 16,
      marginBottom: 10,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: borderColor,
      backgroundColor: bgColor,
      overflow: 'hidden',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      gap: 10,
    },
    emoji: {
      fontSize: 24,
    },
    message: {
      flex: 1,
    },
    dismissBtn: {
      padding: 4,
    },
    dismissX: {
      fontSize: 18,
      color: borderColor,
      fontWeight: '600',
    },
    ctaBtn: {
      marginHorizontal: 12,
      marginBottom: 8,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      borderWidth: 1,
      alignSelf: 'flex-start',
    },
  })
