// "How did your Regents go?" sheet (study plan Phase 4).
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'

jest.mock('../context/ThemeContext', () => {
  const C = new Proxy({}, { get: () => '#123456' })
  return { useTheme: () => ({ C }) }
})
const { default: ExamOutcomeSheet, parseScore } = require('../components/ExamOutcomeSheet')

test('parseScore accepts whole numbers 0–100 only', () => {
  expect(parseScore('78')).toBe(78)
  expect(parseScore(' 100 ')).toBe(100)
  expect(parseScore('0')).toBe(0)
  expect(parseScore('')).toBeNull()
  expect(parseScore('101')).toBeNull()
  expect(parseScore('7.5')).toBeNull()
  expect(parseScore('abc')).toBeNull()
})

test('didn\'t take it / date moved answer straight away', async () => {
  const onDone = jest.fn()
  await render(<ExamOutcomeSheet visible month="June" onDone={onDone} onClose={jest.fn()} />)
  expect(screen.getByText('How did your June Regents go?')).toBeTruthy()
  await fireEvent.press(screen.getByRole('button', { name: "I didn't take it" }))
  expect(onDone).toHaveBeenCalledWith({ status: 'missed', score: null })
  await fireEvent.press(screen.getByRole('button', { name: 'My exam date moved' }))
  expect(onDone).toHaveBeenLastCalledWith({ status: 'moved', score: null })
})

test('took it → optional score, validated', async () => {
  const onDone = jest.fn()
  await render(<ExamOutcomeSheet visible month="June" onDone={onDone} onClose={jest.fn()} />)
  await fireEvent.press(screen.getByRole('button', { name: 'I took it' }))
  const input = screen.getByLabelText('Scaled score, 0 to 100')
  await fireEvent.changeText(input, '120')
  expect(screen.getByText(/whole number from 0 to 100/)).toBeTruthy()
  await fireEvent.press(screen.getByRole('button', { name: 'Save' }))
  expect(onDone).not.toHaveBeenCalled()
  await fireEvent.changeText(input, '82')
  await fireEvent.press(screen.getByRole('button', { name: 'Save score' }))
  expect(onDone).toHaveBeenCalledWith({ status: 'took', score: 82 })
})

test('took it without a score saves null', async () => {
  const onDone = jest.fn()
  await render(<ExamOutcomeSheet visible month="June" onDone={onDone} onClose={jest.fn()} />)
  await fireEvent.press(screen.getByRole('button', { name: 'I took it' }))
  await fireEvent.press(screen.getByRole('button', { name: 'Save' }))
  expect(onDone).toHaveBeenCalledWith({ status: 'took', score: null })
})
