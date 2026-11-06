// Regression: ISSUE-001 — progress bars expose no value to assistive tech on web
// Found by /qa on 2026-11-06
// Report: .gstack/qa-reports/qa-report-localhost-2026-11-06.md
//
// RN-web ignores `accessibilityValue`, so role="progressbar" rendered with no
// aria-valuenow/min/max and screen readers could not announce lesson progress.
// The cross-platform aria-value* props are what RN-web maps to the DOM.
import React from 'react'
import { AccessibilityInfo } from 'react-native'
import { render, screen } from '@testing-library/react-native'

const ProgressBar = require('../motion/ProgressBar').default

beforeEach(() => {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false)
  jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() })
})

test('progress bar carries aria-value* props (mapped to the DOM on web)', async () => {
  await render(<ProgressBar progress={0.35} color="#1FC36B" trackColor="#333" />)
  const bar = screen.getByRole('progressbar')
  expect(bar.props['aria-valuemin']).toBe(0)
  expect(bar.props['aria-valuemax']).toBe(100)
  expect(bar.props['aria-valuenow']).toBe(35)
})
