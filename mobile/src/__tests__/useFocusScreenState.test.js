/**
 * useFocusScreenState state-transition tests
 *
 * useFocusScreenState is the orchestration hook FocusScreen.jsx calls exactly
 * once (FOCUS-02). It wraps the untouched useFocusSession domain hook (Pattern
 * 1, "wrap don't absorb") and owns the screen's former local state, effects,
 * and handlers. This suite proves the wrap is correct and the state machine
 * behaves exactly as documented in 02-CHARACTERIZATION.md.
 *
 * Context hooks (useAuthContext, usePetContext) throw without a provider by
 * design (RESEARCH.md Pitfall 3) — mocked here per-file, matching this repo's
 * no-shared-fixture test convention. useRP is mocked so no Firestore/RP
 * singleton path is reachable from this test. useFocusSession itself is
 * NOT mocked — the whole point is that real phase transitions run through it.
 *
 * Guards 02-01-PLAN.md Task 2 (FOCUS-04).
 */

import { renderHook, act } from '@testing-library/react-native'
import { useFocusScreenState, BACKGROUNDS } from '../hooks/useFocusScreenState'

jest.mock('../context/AuthContext', () => ({
  useAuthContext: () => ({ user: { uid: 'test-uid' } }),
}))

jest.mock('../context/PetContext', () => ({
  usePetContext: () => ({
    triggerReaction: jest.fn(),
    studyBoost: jest.fn(),
    say: jest.fn(),
    pet: { petType: 'dog', name: 'Buddy', chosen: true, accessories: [] },
  }),
}))

jest.mock('../hooks/useRP', () => ({
  useRP: () => ({ earnRP: jest.fn() }),
}))

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

function makeNavigation() {
  return {
    addListener: jest.fn(() => jest.fn()),
    dispatch: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  }
}

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.useRealTimers()
})

// ── Fresh mount ────────────────────────────────────────────────────────────

test('fresh mount returns idle phase with empty/default state', async () => {
  const navigation = makeNavigation()
  const { result } = await renderHook(() => useFocusScreenState(navigation))

  expect(result.current.phase).toBe('idle')
  expect(result.current.todos).toEqual([])
  expect(result.current.buddyMessage).toBeNull()
  expect(result.current.goalCelebModal).toBe(false)
  expect(result.current.isActive).toBe(false)
  expect(result.current.isDone).toBe(false)
  expect(result.current.showCustomInput).toBe(false)
  expect(result.current.todoInput).toBe('')
  expect(result.current.background).toBe(BACKGROUNDS[0])
})

test('fresh mount exposes non-empty option data arrays', async () => {
  const navigation = makeNavigation()
  const { result } = await renderHook(() => useFocusScreenState(navigation))

  expect(Array.isArray(result.current.subjectChips)).toBe(true)
  expect(result.current.subjectChips.length).toBeGreaterThan(0)
  expect(Array.isArray(result.current.soundOptions)).toBe(true)
  expect(result.current.soundOptions.length).toBeGreaterThan(0)
  expect(Array.isArray(result.current.backgrounds)).toBe(true)
  expect(result.current.backgrounds.length).toBeGreaterThan(0)
  expect(Array.isArray(result.current.FOCUS_PRESETS)).toBe(true)
  expect(result.current.FOCUS_PRESETS.length).toBeGreaterThan(0)
})

// ── Session controls ─────────────────────────────────────────────────────────

test('start() moves phase to focus and isActive to true', async () => {
  const navigation = makeNavigation()
  const { result } = await renderHook(() => useFocusScreenState(navigation))

  await act(async () => {
    result.current.start()
  })

  expect(result.current.phase).toBe('focus')
  expect(result.current.isActive).toBe(true)
})

test('pause() moves phase to paused and keeps isActive true; resume() returns to focus', async () => {
  const navigation = makeNavigation()
  const { result } = await renderHook(() => useFocusScreenState(navigation))

  await act(async () => {
    result.current.start()
  })
  await act(async () => {
    result.current.pause()
  })

  expect(result.current.phase).toBe('paused')
  expect(result.current.isActive).toBe(true)

  await act(async () => {
    result.current.resume()
  })

  expect(result.current.phase).toBe('focus')
})

test('stop() moves phase to done and isDone to true; reset() returns to idle and empties todos', async () => {
  const navigation = makeNavigation()
  const { result } = await renderHook(() => useFocusScreenState(navigation))

  await act(async () => {
    result.current.start()
  })
  await act(async () => {
    result.current.handleAddTodo()
  })
  await act(async () => {
    result.current.stop()
  })

  expect(result.current.phase).toBe('done')
  expect(result.current.isDone).toBe(true)

  await act(async () => {
    result.current.reset()
  })

  expect(result.current.phase).toBe('idle')
  expect(result.current.todos).toEqual([])
})

// ── Buddy message on idle -> focus transition ─────────────────────────────────

test('idle->focus transition sets a buddyMessage containing the pet name, cleared after 3000ms', async () => {
  const navigation = makeNavigation()
  const { result } = await renderHook(() => useFocusScreenState(navigation))

  await act(async () => {
    result.current.start()
  })

  expect(result.current.buddyMessage).toEqual(expect.stringContaining('Buddy'))

  await act(async () => {
    jest.advanceTimersByTime(3000)
  })

  expect(result.current.buddyMessage).toBeNull()
})

// ── Subject chip / custom subject ────────────────────────────────────────────

test('handleSubjectChip sets subject to "emoji label" and clears custom-input state', async () => {
  const navigation = makeNavigation()
  const { result } = await renderHook(() => useFocusScreenState(navigation))
  const chip = result.current.subjectChips[0]

  await act(async () => {
    result.current.handleSubjectChip(chip)
  })

  expect(result.current.subject).toBe(chip.emoji + ' ' + chip.label)
  expect(result.current.showCustomInput).toBe(false)
  expect(result.current.customSubject).toBe('')
})

test('showCustomSubjectInput sets showCustomInput true and empties subject', async () => {
  const navigation = makeNavigation()
  const { result } = await renderHook(() => useFocusScreenState(navigation))
  const chip = result.current.subjectChips[0]

  await act(async () => {
    result.current.handleSubjectChip(chip)
  })
  await act(async () => {
    result.current.showCustomSubjectInput()
  })

  expect(result.current.showCustomInput).toBe(true)
  expect(result.current.subject).toBe('')
})

test('handleCustomSubject: whitespace-only leaves subject unchanged; trims a valid value', async () => {
  const navigation = makeNavigation()
  const { result } = await renderHook(() => useFocusScreenState(navigation))

  await act(async () => {
    result.current.showCustomSubjectInput()
  })
  await act(async () => {
    result.current.setCustomSubject('   ')
  })
  await act(async () => {
    result.current.handleCustomSubject()
  })

  expect(result.current.subject).toBe('')

  await act(async () => {
    result.current.setCustomSubject('  Piano practice  ')
  })
  await act(async () => {
    result.current.handleCustomSubject()
  })

  expect(result.current.subject).toBe('Piano practice')
})

// ── Todos ─────────────────────────────────────────────────────────────────────

test('handleAddTodo: blank input adds no row; valid input appends and clears input', async () => {
  const navigation = makeNavigation()
  const { result } = await renderHook(() => useFocusScreenState(navigation))

  await act(async () => {
    result.current.handleAddTodo()
  })
  expect(result.current.todos).toEqual([])

  await act(async () => {
    result.current.setTodoInput('read ch 4')
  })
  await act(async () => {
    result.current.handleAddTodo()
  })

  expect(result.current.todos.length).toBe(1)
  expect(result.current.todos[0].done).toBe(false)
  expect(result.current.todoInput).toBe('')
})

test('toggleTodo flips only the matching row and preserves array order', async () => {
  const navigation = makeNavigation()
  const { result } = await renderHook(() => useFocusScreenState(navigation))

  for (const text of ['first', 'second', 'third']) {
    await act(async () => {
      result.current.setTodoInput(text)
    })
    await act(async () => {
      result.current.handleAddTodo()
    })
  }

  const middleId = result.current.todos[1].id

  await act(async () => {
    result.current.toggleTodo(middleId)
  })

  expect(result.current.todos.map((t) => t.text)).toEqual(['first', 'second', 'third'])
  expect(result.current.todos.map((t) => t.done)).toEqual([false, true, false])
})

// ── Goal celebration boundary ────────────────────────────────────────────────

test('sessionGoal 0 never opens goalCelebModal, even after a full focus interval', async () => {
  const navigation = makeNavigation()
  const { result } = await renderHook(() => useFocusScreenState(navigation))

  await act(async () => {
    result.current.setSessionGoal(0)
  })
  await act(async () => {
    result.current.start()
  })
  await act(async () => {
    jest.advanceTimersByTime(result.current.preset.study * 60 * 1000 + 5000)
  })

  expect(result.current.goalCelebModal).toBe(false)
})

test('reaching sessionGoal exactly opens goalCelebModal after the celebration delay', async () => {
  const navigation = makeNavigation()
  const { result } = await renderHook(() => useFocusScreenState(navigation))

  await act(async () => {
    result.current.setSessionGoal(1)
  })
  await act(async () => {
    result.current.start()
  })
  await act(async () => {
    // Drive one full focus interval to completion.
    jest.advanceTimersByTime(result.current.preset.study * 60 * 1000 + 1000)
  })
  await act(async () => {
    jest.advanceTimersByTime(700)
  })

  expect(result.current.pomodoroCount).toBe(1)
  expect(result.current.goalCelebModal).toBe(true)
})
