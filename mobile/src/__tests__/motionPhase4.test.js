/**
 * Phase 4 motion — rewards travel (docs/designs/animation-plan.md).
 */
import React, { useRef, useEffect } from 'react'
import { Text, View, AccessibilityInfo } from 'react-native'
import { render, screen, act, fireEvent } from '@testing-library/react-native'

jest.mock('../utils/haptics', () => ({
  hapticTick: jest.fn(), hapticSuccess: jest.fn(), hapticWarning: jest.fn(), hapticHeavy: jest.fn(),
}))
const haptics = require('../utils/haptics')
const { RewardFlightProvider, useRewardFlight, useFlightTarget } = require('../motion/RewardFlight')
const LevelUpCelebration = require('../motion/LevelUpCelebration').default

const fakeMeasure = (x, y, w, h) => ({ measureInWindow: (cb) => cb(x, y, w, h) })

beforeEach(() => {
  jest.clearAllMocks()
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false)
  jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() })
})

function Harness({ count = 5, targetLaidOut = true }) {
  const chip = useRef(fakeMeasure(300, 10, targetLaidOut ? 40 : 0, targetLaidOut ? 20 : 0))
  const src = useRef(fakeMeasure(100, 400, 200, 40))
  useFlightTarget('rp', chip)
  const { fly } = useRewardFlight()
  useEffect(() => { fly({ fromRef: src, to: 'rp', icon: '⭐', count }) }, [])
  return null
}

describe('RewardFlight', () => {
  test('fly() launches one particle per reward toward the registered chip', async () => {
    await render(<RewardFlightProvider><Harness count={5} /></RewardFlightProvider>)
    await act(async () => {})
    expect(screen.getAllByText('⭐', { includeHiddenElements: true })).toHaveLength(5)
  })

  test('no flight when the chip is not laid out (hidden tab)', async () => {
    await render(<RewardFlightProvider><Harness targetLaidOut={false} /></RewardFlightProvider>)
    await act(async () => {})
    expect(screen.queryAllByText('⭐', { includeHiddenElements: true })).toHaveLength(0)
  })

  test('no flight under Reduce Motion', async () => {
    AccessibilityInfo.isReduceMotionEnabled.mockResolvedValue(true)
    function Late() {
      // fire after the reduce-motion setting has resolved
      const [go, setGo] = React.useState(false)
      useEffect(() => { setTimeout(() => setGo(true), 0) }, [])
      return go ? <Harness /> : null
    }
    await render(<RewardFlightProvider><Late /></RewardFlightProvider>)
    await act(async () => { await new Promise((r) => setTimeout(r, 5)) })
    expect(screen.queryAllByText('⭐', { includeHiddenElements: true })).toHaveLength(0)
  })

  test('outside a provider, fly() is a safe no-op', async () => {
    function Lone() { const { fly } = useRewardFlight(); fly({ fromRef: { current: null }, to: 'rp' }); return <Text>ok</Text> }
    await render(<Lone />)
    expect(screen.getByText('ok')).toBeTruthy()
  })
})

describe('LevelUpCelebration', () => {
  const C = { warn: '#F5B301', brand: '#1FC36B', brandDark: '#148F4E' }

  test('shows the new level and the bonus actually awarded, with a heavy haptic', async () => {
    await render(<LevelUpCelebration visible levelName="Scholar" bonusRP={25} C={C} onClose={() => {}} />)
    expect(screen.getByText('Scholar')).toBeTruthy()
    expect(screen.getByText('+25 bonus RP 🎁')).toBeTruthy()
    expect(haptics.hapticHeavy).toHaveBeenCalled()
  })

  test('the button closes it', async () => {
    const onClose = jest.fn()
    await render(<LevelUpCelebration visible levelName="Scholar" bonusRP={25} C={C} onClose={onClose} />)
    await fireEvent.press(screen.getByRole('button'))
    expect(onClose).toHaveBeenCalled()
  })
})
