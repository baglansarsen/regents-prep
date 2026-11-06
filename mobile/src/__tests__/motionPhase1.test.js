/**
 * Phase 1 motion — the answer moment (docs/designs/animation-plan.md).
 */
import React from 'react'
import { Text, AccessibilityInfo } from 'react-native'
import { render, screen, act } from '@testing-library/react-native'

jest.mock('../components/ReggieMascot', () => {
  const { Text } = require('react-native')
  const Mock = ({ pose }) => <Text>reggie:{pose}</Text>
  return { __esModule: true, default: Mock, BLINKABLE_EYES: ['open', 'look_up', 'sad', 'sparkle', undefined] }
})

const AnswerChoice = require('../motion/AnswerChoice').default
const { verdictFor } = require('../motion/AnswerChoice')
const ProgressBar = require('../motion/ProgressBar').default
const ReactingReggie = require('../motion/ReactingReggie').default

beforeEach(() => {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false)
  jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() })
})

describe('verdictFor', () => {
  const ctx = (selected, phase = 'feedback') => ({ phase, selected, correctIdx: 2 })

  test('no verdicts while answering', () => {
    expect(verdictFor(2, ctx(2, 'answering'))).toBeNull()
  })
  test('picked the right answer → correct; others quiet', () => {
    expect(verdictFor(2, ctx(2))).toBe('correct')
    expect(verdictFor(0, ctx(2))).toBeNull()
  })
  test('picked a wrong answer → it shakes and the right one is revealed', () => {
    expect(verdictFor(1, ctx(1))).toBe('wrong')
    expect(verdictFor(2, ctx(1))).toBe('reveal')
    expect(verdictFor(3, ctx(1))).toBeNull()
  })
  test('no selection (timeout) → nothing revealed by motion', () => {
    expect(verdictFor(2, ctx(null))).toBeNull()
  })
})

describe('AnswerChoice', () => {
  test('renders its card through every verdict', async () => {
    const { rerender } = await render(<AnswerChoice><Text>Option A</Text></AnswerChoice>)
    await rerender(<AnswerChoice selected><Text>Option A</Text></AnswerChoice>)
    await rerender(<AnswerChoice verdict="wrong"><Text>Option A</Text></AnswerChoice>)
    expect(screen.getByText('Option A')).toBeTruthy()
  })
})

describe('ProgressBar', () => {
  test('exposes progress to assistive tech', async () => {
    await render(<ProgressBar progress={0.4} color="#1FC36B" trackColor="#333" />)
    expect(screen.getByRole('progressbar').props.accessibilityValue).toEqual({ min: 0, max: 100, now: 40 })
  })
})

describe('ReactingReggie', () => {
  test('renders the requested pose (motion skipped under Reduce Motion)', async () => {
    AccessibilityInfo.isReduceMotionEnabled.mockResolvedValue(true)
    await render(<ReactingReggie pose="oops" />)
    await act(async () => {})
    expect(screen.getByText('reggie:oops')).toBeTruthy()
  })
})
