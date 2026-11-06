// Regression: Exams tab Quick Practice tiles were not exposed as buttons
// Found by /qa follow-up on 2026-11-06 (Flash Cards tile accessibility check)
// Report: .gstack/qa-reports/qa-report-localhost-2026-11-06.md
//
// The tiles were bare TouchableOpacity: no role (web: the whole Exams tab read
// as one text blob) and the name came from the visible text, emoji and line
// break included ("🃏 Flash⏎Cards").
import React from 'react'
import { Text } from 'react-native'
import { render, screen, fireEvent } from '@testing-library/react-native'

const PracticeTile = require('../components/PracticeTile').default

test('a practice tile is a button with a clean, one-line name', async () => {
  const onPress = jest.fn()
  await render(<PracticeTile icon="🃏" label={'Flash\nCards'} color="#7C5CFC" darkColor="#5B3FD1" onPress={onPress} />)
  const btn = screen.getByRole('button', { name: 'Flash Cards' })
  await fireEvent.press(btn)
  expect(onPress).toHaveBeenCalledTimes(1)
})

test('the decorative emoji is hidden from screen readers', async () => {
  await render(<PracticeTile icon="🃏" label={'Flash\nCards'} color="#7C5CFC" darkColor="#5B3FD1" onPress={() => {}} />)
  expect(screen.queryByText('🃏')).toBeNull()                                   // not in the a11y tree
  expect(screen.getByText('🃏', { includeHiddenElements: true })).toBeTruthy()  // still drawn
})
