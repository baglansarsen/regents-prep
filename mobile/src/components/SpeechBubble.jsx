import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Animated, StyleSheet } from 'react-native'

const TYPEWRITER_MS = 35   // ms per character
const HOLD_MS       = 1200 // pause after typing finishes
const FADE_MS       = 300  // fade-out duration

export default function SpeechBubble({ message, onDone }) {
  const [displayed, setDisplayed] = useState('')
  const [visible,   setVisible]   = useState(false)
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!message) return
    setDisplayed('')
    setVisible(true)
    opacity.setValue(0)

    Animated.timing(opacity, { toValue: 1, duration: 150, useNativeDriver: true }).start()

    let i = 0
    const ticker = setInterval(() => {
      i++
      setDisplayed(message.slice(0, i))
      if (i >= message.length) {
        clearInterval(ticker)
        setTimeout(() => {
          Animated.timing(opacity, { toValue: 0, duration: FADE_MS, useNativeDriver: true }).start(() => {
            setVisible(false)
            onDone?.()
          })
        }, HOLD_MS)
      }
    }, TYPEWRITER_MS)

    return () => clearInterval(ticker)
  }, [message])

  if (!visible || !message) return null

  const isTyping = displayed.length < message.length

  return (
    <Animated.View style={[s.bubble, { opacity }]}>
      <View style={s.row}>
        <Text style={s.text}>{displayed}</Text>
        {isTyping && <Text style={s.cursor}>|</Text>}
      </View>
      <View style={s.tail} />
    </Animated.View>
  )
}

const s = StyleSheet.create({
  bubble: {
    position:          'absolute',
    bottom:            '115%',
    alignSelf:         'center',
    backgroundColor:   '#FFFFFF',
    borderRadius:      16,
    paddingHorizontal: 14,
    paddingVertical:   10,
    maxWidth:          220,
    shadowColor:       '#000',
    shadowOpacity:     0.10,
    shadowRadius:      8,
    shadowOffset:      { width: 0, height: 2 },
    elevation:         5,
    zIndex:            20,
  },
  row: {
    flexDirection: 'row',
    flexWrap:      'wrap',
    alignItems:    'flex-end',
  },
  text: {
    fontSize:   14,
    color:      '#0F172A',
    lineHeight: 20,
    fontFamily: 'Nunito_700Bold',
  },
  cursor: {
    fontSize:   14,
    color:      '#3B82F6',
    fontFamily: 'Nunito_800ExtraBold',
    marginLeft: 1,
  },
  tail: {
    position:          'absolute',
    bottom:            -8,
    alignSelf:         'center',
    width:             0,
    height:            0,
    borderLeftWidth:   8,
    borderRightWidth:  8,
    borderTopWidth:    8,
    borderLeftColor:   'transparent',
    borderRightColor:  'transparent',
    borderTopColor:    '#FFFFFF',
  },
})
