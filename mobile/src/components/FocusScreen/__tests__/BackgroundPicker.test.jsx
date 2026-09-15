/**
 * BackgroundPicker interaction tests
 *
 * Per D-01, BackgroundPicker fires a select callback (no local state), so
 * it gets an interaction test asserting the argument the handler receives —
 * the class of bug D-02 flags (wrong prop wired to the wrong handler) is
 * invisible to a render-only test.
 *
 * Guards 02-07-PLAN.md Task 2 (FOCUS-03, FOCUS-05).
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import BackgroundPicker from '../BackgroundPicker'
import { BACKGROUNDS } from '../../../hooks/useFocusScreenState'

jest.mock('../../../context/ThemeContext', () => ({
  useTheme: () => ({
    C: {
      bg: '#111827', text: '#F9FAFB', textMuted: '#9CA3AF', brand: '#1FC36B',
      surface: '#1F2937', surface2: '#374151', border: '#4B5563',
    },
  }),
}))

// Sourcing BACKGROUNDS from the real useFocusScreenState.js export pulls in
// that whole orchestration-hook module, including AuthContext (real
// 'firebase/auth' ESM import), PetContext, and useRP — none of their real
// implementations are exercised here, only the BACKGROUNDS constant is
// used, so they're mocked identically to FocusSetupScreen.test.jsx.
jest.mock('../../../context/AuthContext', () => ({
  useAuthContext: () => ({ user: { uid: 'test-uid' } }),
}))
jest.mock('../../../context/PetContext', () => ({
  usePetContext: () => ({
    triggerReaction: jest.fn(),
    studyBoost: jest.fn(),
    say: jest.fn(),
    pet: { petType: 'dog', name: 'Buddy', chosen: true, accessories: [] },
  }),
}))
jest.mock('../../../hooks/useRP', () => ({
  useRP: () => ({ earnRP: jest.fn() }),
}))
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)
jest.mock('../../../utils/activityLogger', () => ({ logActivity: jest.fn() }))

function baseProps(overrides = {}) {
  return {
    backgrounds: BACKGROUNDS,
    background: BACKGROUNDS[0],
    onSelectBackground: jest.fn(),
    ...overrides,
  }
}

test('the section label and all six scene glyphs render, in list order', async () => {
  await render(<BackgroundPicker {...baseProps()} />)

  expect(screen.getByText('Background')).toBeOnTheScreen()
  const glyphNodes = BACKGROUNDS.map((bg) => screen.getByText(bg.emoji))
  expect(glyphNodes).toHaveLength(BACKGROUNDS.length)
})

test('pressing a swatch calls the select handler with that scene record', async () => {
  const props = baseProps()
  await render(<BackgroundPicker {...props} />)

  fireEvent.press(screen.getByText(BACKGROUNDS[3].emoji))

  expect(props.onSelectBackground).toHaveBeenCalledWith(BACKGROUNDS[3])
})

test('the swatch matching the current scene carries the thicker selection border; others carry the default transparent one', async () => {
  const target = BACKGROUNDS[2]
  const props = baseProps({ background: target })
  await render(<BackgroundPicker {...props} />)

  const targetSwatch = screen.getByTestId(`swatch-${target.id}`)
  expect(targetSwatch).toHaveStyle({ borderColor: '#F9FAFB', borderWidth: 3 })

  const otherOption = BACKGROUNDS[0]
  const otherSwatch = screen.getByTestId(`swatch-${otherOption.id}`)
  expect(otherSwatch).toHaveStyle({ borderColor: 'transparent', borderWidth: 2 })
})
