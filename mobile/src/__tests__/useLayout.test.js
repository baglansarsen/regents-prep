import { layoutFor, MAX_CONTENT_WIDTH } from '../hooks/useLayout'

// Approximate iPhone Duo window sizes in points (@3x).
const DUO_OUTER     = [466, 678]   // 5.4" folded
const DUO_INNER     = [626, 890]   // 7.6" unfolded, portrait
const DUO_INNER_L   = [890, 626]   // 7.6" unfolded, landscape
const IPHONE_PRO    = [402, 874]

describe('layoutFor', () => {
  it('uses the full width on phones and the folded Duo', () => {
    expect(layoutFor(...IPHONE_PRO).contentWidth).toBe(402)
    expect(layoutFor(...DUO_OUTER).contentWidth).toBe(466)
    expect(layoutFor(...DUO_OUTER).isWide).toBe(false)
  })

  it('uses the full inner width when the Duo is unfolded in portrait', () => {
    const l = layoutFor(...DUO_INNER)
    expect(l.contentWidth).toBe(626)
    expect(l.isWide).toBe(true)
  })

  it('caps content width when the unfolded Duo is in landscape', () => {
    const l = layoutFor(...DUO_INNER_L)
    expect(l.contentWidth).toBe(MAX_CONTENT_WIDTH)
    expect(l.isWide).toBe(true)
  })

  it('recomputes for a new size (fold → unfold)', () => {
    expect(layoutFor(...DUO_OUTER).contentWidth)
      .not.toBe(layoutFor(...DUO_INNER).contentWidth)
  })
})
