/**
 * BigPetDisplay render + interaction tests
 *
 * BigPetDisplay takes an onPress prop, so per D-01 it gets an interaction
 * test, not render-only — and per D-02 the failure class this catches is a
 * prop wired to the wrong handler, invisible to a render-only test.
 *
 * Guards 02-02-PLAN.md Task 1 (FOCUS-03).
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import BigPetDisplay from '../BigPetDisplay'

jest.mock('../../../context/ThemeContext', () => ({
  useTheme: () => ({
    C: {
      bg: '#111827',
      surface: '#1F2937',
      surface2: '#374151',
      text: '#F9FAFB',
      textMuted: '#9CA3AF',
      brand: '#1FC36B',
    },
  }),
}))

function basePet(overrides = {}) {
  return { petType: 'dog', accessories: [], ...overrides }
}

test('renders the catalogue glyph for a pet whose type matches a real entry', async () => {
  await render(<BigPetDisplay pet={basePet()} message={null} onPress={jest.fn()} />)

  expect(screen.getByText('🐶')).toBeOnTheScreen()
})

test('renders nothing when the pet type has no catalogue match', async () => {
  await render(<BigPetDisplay pet={basePet({ petType: 'dragon' })} message={null} onPress={jest.fn()} />)

  expect(screen.toJSON()).toBeNull()
})

test('pressing the pet calls the press callback exactly once', async () => {
  const onPress = jest.fn()
  await render(<BigPetDisplay pet={basePet()} message={null} onPress={onPress} />)

  fireEvent.press(screen.getByText('🐶'))

  expect(onPress).toHaveBeenCalledTimes(1)
})

test('renders the graduation-cap glyph when the pet has the graduationCap accessory', async () => {
  await render(<BigPetDisplay pet={basePet({ accessories: ['graduationCap'] })} message={null} onPress={jest.fn()} />)

  expect(screen.getByText('🎓')).toBeOnTheScreen()
})

test('renders only the graduation glyph when both graduationCap and crown are present (first-match-wins precedence)', async () => {
  await render(<BigPetDisplay pet={basePet({ accessories: ['graduationCap', 'crown'] })} message={null} onPress={jest.fn()} />)

  expect(screen.getByText('🎓')).toBeOnTheScreen()
  expect(screen.queryByText('👑')).toBeNull()
})

test('renders the speech-bubble copy when a message prop is given', async () => {
  await render(<BigPetDisplay pet={basePet()} message="You've got this!" onPress={jest.fn()} />)

  expect(screen.getByText("You've got this!")).toBeOnTheScreen()
})
