/**
 * FocusSetupScreen render + interaction tests
 *
 * FocusSetupScreen takes callback props, so per D-01 it gets an interaction
 * test, not render-only — and per D-02 the failure class this catches is a
 * control wired to the wrong handler after a 200-line block was relocated,
 * invisible to a render-only test (this plan's threat register T-02-08).
 *
 * Guards 02-04-PLAN.md Task 2 (FOCUS-02, FOCUS-03, FOCUS-05).
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import FocusSetupScreen from '../FocusSetupScreen'
import { SUBJECT_CHIPS, SOUND_OPTIONS, FOCUS_PRESETS } from '../../../hooks/useFocusSession'
import { BACKGROUNDS } from '../../../hooks/useFocusScreenState'

// FocusSetupScreen calls useTheme() directly — the real ThemeContext returns
// null outside a provider and the container would crash destructuring it
// (02-RESEARCH.md Pitfall 3). No other mock is needed: this container renders
// no native-module-backed child.
jest.mock('../../../context/ThemeContext', () => ({
  useTheme: () => ({
    C: {
      bg: '#111827', text: '#F9FAFB', textMuted: '#9CA3AF', brand: '#1FC36B',
      surface: '#1F2937', surface2: '#374151', border: '#4B5563',
    },
  }),
}))

// Sourcing option fixtures from the real useFocusSession.js exports (rather
// than inventing literals) pulls in its module-level imports too:
// AsyncStorage needs the official Jest mock, and activityLogger's real
// 'firebase/firestore' import is unparseable by jest (02-01-SUMMARY.md
// deviation 1) — mocked here for the same reason, scoped to this file.
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)
jest.mock('../../../utils/activityLogger', () => ({ logActivity: jest.fn() }))

// Sourcing the scene fixtures from useFocusScreenState.js's BACKGROUNDS
// export pulls in that whole orchestration-hook module, including
// AuthContext (real 'firebase/auth' ESM import — same unparseable-import
// class as activityLogger above), PetContext, and useRP. None of their real
// implementations are exercised here — only the BACKGROUNDS constant is
// used — so they're mocked identically to 02-01's useFocusScreenState.test.js.
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

function baseProps(overrides = {}) {
  return {
    subjectChips: SUBJECT_CHIPS,
    subject: '',
    showCustomInput: false,
    customSubject: '',
    presets: FOCUS_PRESETS,
    preset: FOCUS_PRESETS[1],
    sessionGoal: 0,
    todos: [],
    todoInput: '',
    soundOptions: SOUND_OPTIONS,
    sound: SOUND_OPTIONS[0],
    backgrounds: BACKGROUNDS,
    background: BACKGROUNDS[0],
    history: [],
    handleSubjectChip: jest.fn(),
    showCustomSubjectInput: jest.fn(),
    setCustomSubject: jest.fn(),
    handleCustomSubject: jest.fn(),
    setPreset: jest.fn(),
    setSessionGoal: jest.fn(),
    setTodoInput: jest.fn(),
    handleAddTodo: jest.fn(),
    toggleTodo: jest.fn(),
    setSound: jest.fn(),
    setBackground: jest.fn(),
    start: jest.fn(),
    openHistory: jest.fn(),
    goBack: jest.fn(),
    ...overrides,
  }
}

test('renders all five section labels and the start action label', async () => {
  await render(<FocusSetupScreen {...baseProps()} />)

  expect(screen.getByText('What are you studying?')).toBeOnTheScreen()
  expect(screen.getByText('Session length')).toBeOnTheScreen()
  expect(screen.getByText('Session goal')).toBeOnTheScreen()
  expect(screen.getByText('Background sound')).toBeOnTheScreen()
  expect(screen.getByText('Background')).toBeOnTheScreen()
  expect(screen.getByText('▶  Start Focusing')).toBeOnTheScreen()
})

test('pressing a subject chip calls the subject handler with that chip record', async () => {
  const props = baseProps()
  await render(<FocusSetupScreen {...props} />)

  fireEvent.press(screen.getByText(SUBJECT_CHIPS[0].label))

  expect(props.handleSubjectChip).toHaveBeenCalledWith(SUBJECT_CHIPS[0])
})

test('pressing the other-subject chip calls showCustomSubjectInput', async () => {
  const props = baseProps()
  await render(<FocusSetupScreen {...props} />)

  fireEvent.press(screen.getByText('Other'))
  expect(props.showCustomSubjectInput).toHaveBeenCalledTimes(1)
})

test('with the custom-input flag on, the custom text field renders with its placeholder', async () => {
  await render(<FocusSetupScreen {...baseProps({ showCustomInput: true })} />)

  expect(screen.getByPlaceholderText('e.g. Piano practice, Drawing...')).toBeOnTheScreen()
})

test('pressing a length option calls the preset setter with that preset record', async () => {
  const props = baseProps()
  await render(<FocusSetupScreen {...props} />)

  fireEvent.press(screen.getByText(FOCUS_PRESETS[0].label))

  expect(props.setPreset).toHaveBeenCalledWith(FOCUS_PRESETS[0])
})

// Split into two single-interaction tests rather than pressing two different
// goal chips in one test: firing a second fireEvent.press against a distinct
// element in the same test — after a first press already ran — was observed
// during authoring to leave the RNTL/React-19 renderer for this component in
// a state where every subsequent test's render() call in this file returned
// an empty tree (act() reentrancy specific to this component's large output;
// not reproducible on the smaller FocusActiveScreen/FocusDoneScreen
// containers). One fireEvent per test sidesteps it without weakening either
// assertion — each test still checks a real handler-argument pairing.
test('pressing a non-zero goal option calls the goal setter with that number', async () => {
  const props = baseProps()
  await render(<FocusSetupScreen {...props} />)

  expect(screen.getByText('None')).toBeOnTheScreen()
  expect(screen.queryByText('0 🍅')).toBeNull()

  fireEvent.press(screen.getByText('3 🍅'))

  expect(props.setSessionGoal).toHaveBeenCalledWith(3)
})

test('pressing the None goal option calls the goal setter with zero', async () => {
  const props = baseProps()
  await render(<FocusSetupScreen {...props} />)

  fireEvent.press(screen.getByText('None'))

  expect(props.setSessionGoal).toHaveBeenCalledWith(0)
})

test('typing into the task field calls the task-input setter with the typed text', async () => {
  const props = baseProps()
  await render(<FocusSetupScreen {...props} />)

  const field = screen.getByPlaceholderText('Add a task...')
  fireEvent.changeText(field, 'read chapter 4')

  expect(props.setTodoInput).toHaveBeenCalledWith('read chapter 4')
})

test('submitting the task field calls the add handler', async () => {
  // Rendered with a pre-filled todoInput prop rather than driving changeText
  // then submitEditing on the same field in one test: this component is a
  // controlled input whose value prop never actually changes here (setTodoInput
  // is a jest.fn(), not real state), and firing submitEditing immediately after
  // changeText on that same still-uncommitted field triggers React Native's
  // internal controlled-value reconciliation asynchronously, one render late —
  // corrupting the next test's render (observed directly while authoring this
  // suite). Splitting into two single-purpose tests avoids the sequence
  // entirely without weakening either assertion.
  const props = baseProps({ todoInput: 'buy milk' })
  await render(<FocusSetupScreen {...props} />)

  const field = screen.getByPlaceholderText('Add a task...')
  fireEvent(field, 'submitEditing')

  expect(props.handleAddTodo).toHaveBeenCalledTimes(1)
})

test('the add affordance is absent when the task field is blank', async () => {
  await render(<FocusSetupScreen {...baseProps({ todoInput: '' })} />)

  expect(screen.queryByText('Add')).toBeNull()
})

test('the add affordance is present when the task field holds non-blank text', async () => {
  await render(<FocusSetupScreen {...baseProps({ todoInput: 'buy milk' })} />)

  expect(screen.getByText('Add')).toBeOnTheScreen()
})

test('with three tasks, all three texts render; pressing a task toggle control calls toggleTodo with that id', async () => {
  const props = baseProps({
    todos: [
      { id: 1, text: 'read ch 4', done: false },
      { id: 2, text: 'practice set', done: false },
      { id: 3, text: 'review notes', done: true },
    ],
  })
  await render(<FocusSetupScreen {...props} />)

  expect(screen.getByText('read ch 4')).toBeOnTheScreen()
  expect(screen.getByText('practice set')).toBeOnTheScreen()
  expect(screen.getByText('review notes')).toBeOnTheScreen()

  // The "✕" glyph appears once for the header close control and once per
  // todo row's toggle control, in render order — index 0 is the header
  // close button, index 1 is the first todo's toggle control.
  const removeControls = screen.getAllByText('✕')
  expect(removeControls).toHaveLength(4)
  fireEvent.press(removeControls[1])

  expect(props.toggleTodo).toHaveBeenCalledWith(1)
})

test('with zero tasks, no task row renders and no placeholder copy appears in its place', async () => {
  await render(<FocusSetupScreen {...baseProps({ todos: [] })} />)

  // Only the header close control's "✕" remains — no per-todo rows.
  expect(screen.getAllByText('✕')).toHaveLength(1)
  expect(screen.queryByText(/no tasks/i)).toBeNull()
})

test('pressing a sound option calls the sound setter with that option record', async () => {
  const props = baseProps()
  await render(<FocusSetupScreen {...props} />)

  fireEvent.press(screen.getByText(SOUND_OPTIONS[1].label))

  expect(props.setSound).toHaveBeenCalledWith(SOUND_OPTIONS[1])
})

test('pressing a scene swatch calls the scene setter with that scene record', async () => {
  const props = baseProps()
  await render(<FocusSetupScreen {...props} />)

  fireEvent.press(screen.getByText(BACKGROUNDS[1].emoji))

  expect(props.setBackground).toHaveBeenCalledWith(BACKGROUNDS[1])
})

test('pressing the start action calls start exactly once', async () => {
  const props = baseProps()
  await render(<FocusSetupScreen {...props} />)

  fireEvent.press(screen.getByText('▶  Start Focusing'))

  expect(props.start).toHaveBeenCalledTimes(1)
})

test('with an empty history, the bottom summary link does not render', async () => {
  await render(<FocusSetupScreen {...baseProps({ history: [] })} />)

  expect(screen.queryByText(/past session/)).toBeNull()
})

test('with one past session, the label has no plural suffix', async () => {
  await render(<FocusSetupScreen {...baseProps({ history: [{}] })} />)

  expect(screen.getByText('1 past session →')).toBeOnTheScreen()
})

test('with two past sessions, the label carries the plural suffix', async () => {
  await render(<FocusSetupScreen {...baseProps({ history: [{}, {}] })} />)

  expect(screen.getByText('2 past sessions →')).toBeOnTheScreen()
})

// One of the real SUBJECT_CHIPS entries is itself labelled "History" (the
// history/social-studies subject), so a bare getByText('History') against
// the default subject-chip set is ambiguous — it also matches the header
// link. Filtering that one chip out here is scoped to this test only; every
// other test keeps the full, real SUBJECT_CHIPS list per the plan's fixture
// sourcing requirement.
test('pressing the header link calls openHistory', async () => {
  const props = baseProps({
    history: [{}],
    subjectChips: SUBJECT_CHIPS.filter((chip) => chip.label !== 'History'),
  })
  await render(<FocusSetupScreen {...props} />)

  fireEvent.press(screen.getByText('History'))

  expect(props.openHistory).toHaveBeenCalledTimes(1)
})

test('pressing the bottom summary link calls openHistory', async () => {
  const props = baseProps({ history: [{}] })
  await render(<FocusSetupScreen {...props} />)

  fireEvent.press(screen.getByText('1 past session →'))

  expect(props.openHistory).toHaveBeenCalledTimes(1)
})
