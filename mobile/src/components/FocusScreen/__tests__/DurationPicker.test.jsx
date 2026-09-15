/**
 * DurationPicker interaction tests
 *
 * Per D-01, DurationPicker fires a select callback (no local state), so it
 * gets an interaction test asserting the argument the handler receives.
 *
 * Guards 02-06-PLAN.md Task 2 (FOCUS-03, FOCUS-05).
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import DurationPicker from '../DurationPicker'
import { FOCUS_PRESETS } from '../../../hooks/useFocusSession'

jest.mock('../../../context/ThemeContext', () => ({
  useTheme: () => ({
    C: {
      bg: '#111827', text: '#F9FAFB', textMuted: '#9CA3AF', brand: '#1FC36B',
      surface: '#1F2937', surface2: '#374151', border: '#4B5563',
    },
  }),
}))

// Sourcing FOCUS_PRESETS from the real useFocusSession.js export pulls in
// that module's own imports too — see SubjectPicker.test.jsx for the same
// mocks and rationale.
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)
jest.mock('../../../utils/activityLogger', () => ({ logActivity: jest.fn() }))

function baseProps(overrides = {}) {
  return {
    presets: FOCUS_PRESETS,
    preset: FOCUS_PRESETS[1],
    onSelectPreset: jest.fn(),
    ...overrides,
  }
}

test('renders the section label and every preset label with its break sub-label, in list order', async () => {
  await render(<DurationPicker {...baseProps()} />)

  expect(screen.getByText('Session length')).toBeOnTheScreen()
  for (const p of FOCUS_PRESETS) {
    expect(screen.getByText(p.label)).toBeOnTheScreen()
  }
  // Two presets share a break value ("5m break"), so assert the sub-label
  // renders once per preset by counting total occurrences across distinct
  // break values rather than a single getByText per preset.
  const breakCounts = FOCUS_PRESETS.reduce((acc, p) => {
    acc[p.break] = (acc[p.break] ?? 0) + 1
    return acc
  }, {})
  for (const [breakMin, count] of Object.entries(breakCounts)) {
    expect(screen.getAllByText(`${breakMin}m break`)).toHaveLength(count)
  }
})

test('the preset whose id matches the current selection renders active; others do not', async () => {
  const props = baseProps({ preset: FOCUS_PRESETS[0] })
  await render(<DurationPicker {...props} />)

  const activeLabel = screen.getByText(FOCUS_PRESETS[0].label)
  expect(activeLabel.props.style).toEqual(
    expect.arrayContaining([expect.objectContaining({ color: '#fff' })])
  )

  const inactiveLabel = screen.getByText(FOCUS_PRESETS[1].label)
  expect(inactiveLabel.props.style).not.toEqual(
    expect.arrayContaining([expect.objectContaining({ color: '#fff' })])
  )
})

test('pressing a preset calls the select handler with that preset whole record', async () => {
  const props = baseProps()
  await render(<DurationPicker {...props} />)

  fireEvent.press(screen.getByText(FOCUS_PRESETS[0].label))

  expect(props.onSelectPreset).toHaveBeenCalledWith(FOCUS_PRESETS[0])
})
