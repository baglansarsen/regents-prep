/**
 * SoundPicker interaction tests
 *
 * Per D-01, SoundPicker fires a select callback (no local state), so it
 * gets an interaction test asserting the argument the handler receives —
 * the class of bug D-02 flags (wrong prop wired to the wrong handler) is
 * invisible to a render-only test.
 *
 * Guards 02-07-PLAN.md Task 2 (FOCUS-03, FOCUS-05).
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import SoundPicker from '../SoundPicker'
import { SOUND_OPTIONS } from '../../../hooks/useFocusSession'

// SoundPicker calls useTheme() directly — mock so the theme read returns a
// fixed token object (same fixture shape as FocusSetupScreen.test.jsx).
jest.mock('../../../context/ThemeContext', () => ({
  useTheme: () => ({
    C: {
      bg: '#111827', text: '#F9FAFB', textMuted: '#9CA3AF', brand: '#1FC36B',
      surface: '#1F2937', surface2: '#374151', border: '#4B5563',
    },
  }),
}))

// Sourcing SOUND_OPTIONS from the real useFocusSession.js export (rather
// than inventing fixtures) pulls in that module's own imports too —
// AsyncStorage needs the official Jest mock and activityLogger's real
// 'firebase/firestore' import is unparseable by jest (02-01-SUMMARY.md
// deviation 1), mirroring SubjectPicker.test.jsx's identical mocks.
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)
jest.mock('../../../utils/activityLogger', () => ({ logActivity: jest.fn() }))

function baseProps(overrides = {}) {
  return {
    soundOptions: SOUND_OPTIONS,
    sound: SOUND_OPTIONS[0],
    onSelectSound: jest.fn(),
    ...overrides,
  }
}

test('the section label and every option label render, in list order', async () => {
  await render(<SoundPicker {...baseProps()} />)

  expect(screen.getByText('Background sound')).toBeOnTheScreen()
  const labelNodes = SOUND_OPTIONS.map((opt) => screen.getByText(opt.label))
  expect(labelNodes).toHaveLength(SOUND_OPTIONS.length)
})

test('the option matching the current selection renders active; others do not', async () => {
  const target = SOUND_OPTIONS[1]
  const props = baseProps({ sound: target })
  await render(<SoundPicker {...props} />)

  const activeText = screen.getByText(target.label)
  expect(activeText.props.style).toEqual(
    expect.arrayContaining([expect.objectContaining({ color: '#fff' })])
  )

  const otherOption = SOUND_OPTIONS[2]
  const otherText = screen.getByText(otherOption.label)
  expect(otherText.props.style).not.toEqual(
    expect.arrayContaining([expect.objectContaining({ color: '#fff' })])
  )
})

test('pressing an option calls the select handler with that option record', async () => {
  const props = baseProps()
  await render(<SoundPicker {...props} />)

  fireEvent.press(screen.getByText(SOUND_OPTIONS[2].label))

  expect(props.onSelectSound).toHaveBeenCalledWith(SOUND_OPTIONS[2])
})

test('the off option renders active and selects like any other option, with no special casing', async () => {
  const offOption = SOUND_OPTIONS.find((opt) => opt.id === 'off')
  const props = baseProps({ sound: offOption })
  await render(<SoundPicker {...props} />)

  const activeText = screen.getByText(offOption.label)
  expect(activeText.props.style).toEqual(
    expect.arrayContaining([expect.objectContaining({ color: '#fff' })])
  )

  fireEvent.press(screen.getByText(SOUND_OPTIONS[1].label))
  expect(props.onSelectSound).toHaveBeenCalledWith(SOUND_OPTIONS[1])
})
