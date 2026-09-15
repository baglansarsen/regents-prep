/**
 * SubjectPicker interaction tests
 *
 * Per D-01, SubjectPicker fires callback props (no local state), so it gets
 * an interaction test that asserts the argument each handler receives, not
 * just that it fired — the class of bug D-02 flags (wrong prop wired to the
 * wrong handler) is invisible to a render-only test.
 *
 * Guards 02-06-PLAN.md Task 1 (FOCUS-03, FOCUS-05).
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import SubjectPicker from '../SubjectPicker'
import { SUBJECT_CHIPS } from '../../../hooks/useFocusSession'

// SubjectPicker calls useTheme() directly — mock so the theme read returns a
// fixed token object (same fixture shape as FocusSetupScreen.test.jsx).
jest.mock('../../../context/ThemeContext', () => ({
  useTheme: () => ({
    C: {
      bg: '#111827', text: '#F9FAFB', textMuted: '#9CA3AF', brand: '#1FC36B',
      surface: '#1F2937', surface2: '#374151', border: '#4B5563',
    },
  }),
}))

// Sourcing SUBJECT_CHIPS from the real useFocusSession.js export (rather than
// inventing fixtures) pulls in that module's own imports too — AsyncStorage
// needs the official Jest mock and activityLogger's real 'firebase/firestore'
// import is unparseable by jest (02-01-SUMMARY.md deviation 1), mirroring
// FocusSetupScreen.test.jsx's identical mocks for the same reason.
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)
jest.mock('../../../utils/activityLogger', () => ({ logActivity: jest.fn() }))

function baseProps(overrides = {}) {
  return {
    chips: SUBJECT_CHIPS,
    subject: '',
    showCustomInput: false,
    customSubject: '',
    onSelectChip: jest.fn(),
    onShowCustomInput: jest.fn(),
    onCustomSubjectChange: jest.fn(),
    onCommitCustomSubject: jest.fn(),
    ...overrides,
  }
}

test('renders the section label and every chip label in list order', async () => {
  await render(<SubjectPicker {...baseProps()} />)

  expect(screen.getByText('What are you studying?')).toBeOnTheScreen()
  const labelNodes = SUBJECT_CHIPS.map((chip) => screen.getByText(chip.label))
  expect(labelNodes).toHaveLength(SUBJECT_CHIPS.length)
})

test('pressing a subject chip calls the select handler with that chip record', async () => {
  const props = baseProps()
  await render(<SubjectPicker {...props} />)

  fireEvent.press(screen.getByText(SUBJECT_CHIPS[0].label))

  expect(props.onSelectChip).toHaveBeenCalledWith(SUBJECT_CHIPS[0])
})

test('the chip matching the assembled emoji-space-label value renders active; others do not', async () => {
  const target = SUBJECT_CHIPS[2]
  const props = baseProps({ subject: `${target.emoji} ${target.label}` })
  await render(<SubjectPicker {...props} />)

  const activeChipText = screen.getByText(target.label)
  expect(activeChipText.props.style).toEqual(
    expect.arrayContaining([expect.objectContaining({ color: '#fff' })])
  )

  const otherChip = SUBJECT_CHIPS[0]
  const otherChipText = screen.getByText(otherChip.label)
  expect(otherChipText.props.style).not.toEqual(
    expect.arrayContaining([expect.objectContaining({ color: '#fff' })])
  )
})

test('a subject value that merely contains the label, without the emoji prefix, leaves every chip inactive', async () => {
  const target = SUBJECT_CHIPS[1]
  const props = baseProps({ subject: target.label })
  await render(<SubjectPicker {...props} />)

  for (const chip of SUBJECT_CHIPS) {
    const chipText = screen.getByText(chip.label)
    expect(chipText.props.style).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ color: '#fff' })])
    )
  }
})

test('pressing the other-option chip calls the show-custom-input handler and not the select handler', async () => {
  const props = baseProps()
  await render(<SubjectPicker {...props} />)

  fireEvent.press(screen.getByText('Other'))

  expect(props.onShowCustomInput).toHaveBeenCalledTimes(1)
  expect(props.onSelectChip).not.toHaveBeenCalled()
})

test('with the custom-input flag off, the custom field is not on screen', async () => {
  await render(<SubjectPicker {...baseProps({ showCustomInput: false })} />)

  expect(screen.queryByPlaceholderText('e.g. Piano practice, Drawing...')).toBeNull()
})

test('with the custom-input flag on, the custom field renders with its placeholder and current value', async () => {
  await render(<SubjectPicker {...baseProps({ showCustomInput: true, customSubject: 'Piano' })} />)

  const field = screen.getByPlaceholderText('e.g. Piano practice, Drawing...')
  expect(field).toBeOnTheScreen()
  expect(field.props.value).toBe('Piano')
})

test('typing in the custom field calls the custom-value setter with the typed text', async () => {
  const props = baseProps({ showCustomInput: true })
  await render(<SubjectPicker {...props} />)

  const field = screen.getByPlaceholderText('e.g. Piano practice, Drawing...')
  fireEvent.changeText(field, 'Piano practice')

  expect(props.onCustomSubjectChange).toHaveBeenCalledWith('Piano practice')
})

test('submitting the custom field calls the commit handler', async () => {
  const props = baseProps({ showCustomInput: true, customSubject: 'Piano' })
  await render(<SubjectPicker {...props} />)

  const field = screen.getByPlaceholderText('e.g. Piano practice, Drawing...')
  fireEvent(field, 'submitEditing')

  expect(props.onCommitCustomSubject).toHaveBeenCalledTimes(1)
})

test('blurring the custom field also calls the commit handler', async () => {
  const props = baseProps({ showCustomInput: true, customSubject: 'Piano' })
  await render(<SubjectPicker {...props} />)

  const field = screen.getByPlaceholderText('e.g. Piano practice, Drawing...')
  fireEvent(field, 'blur')

  expect(props.onCommitCustomSubject).toHaveBeenCalledTimes(1)
})
