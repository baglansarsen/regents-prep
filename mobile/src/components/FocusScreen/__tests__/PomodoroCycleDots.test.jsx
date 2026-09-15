/**
 * PomodoroCycleDots render/snapshot tests
 *
 * PomodoroCycleDots has zero callback props, so per D-01 it gets a
 * render/snapshot test only — no press simulation, no callback assertions.
 * This is the pure-display tier example 02-RESEARCH.md names for this tier.
 *
 * Guards 02-05-PLAN.md Task 1 (FOCUS-03, FOCUS-05).
 */
import React from 'react'
import { render, screen } from '@testing-library/react-native'
import { StyleSheet } from 'react-native'
import PomodoroCycleDots from '../PomodoroCycleDots'

function flatBg(testId) {
  return StyleSheet.flatten(screen.getByTestId(testId).props.style).backgroundColor
}

test('renders exactly four dots at cycle position zero', async () => {
  await render(<PomodoroCycleDots cyclePosition={0} accentColor="#F59E0B" />)

  expect(screen.getByTestId('cycle-dot-0')).toBeTruthy()
  expect(screen.getByTestId('cycle-dot-1')).toBeTruthy()
  expect(screen.getByTestId('cycle-dot-2')).toBeTruthy()
  expect(screen.getByTestId('cycle-dot-3')).toBeTruthy()
})

test('at cycle position two, renders four dots and the tree matches a committed snapshot: two solid, one partial, one neutral', async () => {
  await render(<PomodoroCycleDots cyclePosition={2} accentColor="#F59E0B" />)

  expect(screen.getByTestId('cycle-dot-0')).toBeTruthy()
  expect(screen.getByTestId('cycle-dot-1')).toBeTruthy()
  expect(screen.getByTestId('cycle-dot-2')).toBeTruthy()
  expect(screen.getByTestId('cycle-dot-3')).toBeTruthy()
  expect(flatBg('cycle-dot-0')).toBe('#F59E0B')
  expect(flatBg('cycle-dot-1')).toBe('#F59E0B')
  expect(flatBg('cycle-dot-2')).toBe('#F59E0B60')
  expect(flatBg('cycle-dot-3')).toBe('rgba(0,0,0,0.2)')
  expect(screen.toJSON()).toMatchSnapshot()
})

test('at cycle position zero, no dot is solid and the first is the partial one', async () => {
  await render(<PomodoroCycleDots cyclePosition={0} accentColor="#F59E0B" />)

  expect(flatBg('cycle-dot-0')).toBe('#F59E0B60')
  expect(flatBg('cycle-dot-1')).toBe('rgba(0,0,0,0.2)')
  expect(flatBg('cycle-dot-2')).toBe('rgba(0,0,0,0.2)')
  expect(flatBg('cycle-dot-3')).toBe('rgba(0,0,0,0.2)')
})

test('at cycle position three, three dots are solid', async () => {
  await render(<PomodoroCycleDots cyclePosition={3} accentColor="#F59E0B" />)

  expect(flatBg('cycle-dot-0')).toBe('#F59E0B')
  expect(flatBg('cycle-dot-1')).toBe('#F59E0B')
  expect(flatBg('cycle-dot-2')).toBe('#F59E0B')
  expect(flatBg('cycle-dot-3')).toBe('#F59E0B60')
})
