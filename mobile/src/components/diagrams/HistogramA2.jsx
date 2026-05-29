import { View } from 'react-native'
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg'
import { C } from '../../theme'

const W = 280, H = 195
const L = 45, B = 162, R = 265, T = 18
const GW = R - L, GH = B - T

const BARS = [
  { label: '50–60', freq: 3 },
  { label: '60–70', freq: 7 },
  { label: '70–80', freq: 12 },
  { label: '80–90', freq: 8 },
  { label: '90–100', freq: 4 },
]
const MAX_FREQ = 14

export default function HistogramA2() {
  const N = BARS.length
  const barW = (GW / N) - 2
  const py = (f) => B - (f / MAX_FREQ) * GH

  return (
    <View style={{ backgroundColor: C.surface2, borderRadius: 10, marginBottom: 12, padding: 4, overflow: 'hidden' }}>
      <Svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        <SvgText x={W / 2} y={T - 3} textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">
          Test Score Distribution (n = 34)
        </SvgText>

        {[0, 2, 4, 6, 8, 10, 12, 14].map(f => (
          <Line key={f} x1={L} y1={py(f)} x2={R} y2={py(f)} stroke="#e5e7eb" strokeWidth="0.8" />
        ))}
        <Line x1={L} y1={T} x2={L} y2={B} stroke="#374151" strokeWidth="1.5" />
        <Line x1={L} y1={B} x2={R} y2={B} stroke="#374151" strokeWidth="1.5" />

        {[0, 4, 8, 12].map(f => (
          <SvgText key={f} x={L - 5} y={py(f) + 3} textAnchor="end" fontSize="8.5" fill="#6b7280">{f}</SvgText>
        ))}

        {BARS.map(({ label, freq }, i) => {
          const bx = L + i * (GW / N) + 1
          return (
            <Rect key={label} x={bx} y={py(freq)} width={barW} height={B - py(freq)}
              fill="#7c3aed" opacity="0.75" stroke="#5b21b6" strokeWidth="1" />
          )
        })}

        {BARS.map(({ label, freq }, i) => {
          const bx = L + i * (GW / N) + 1
          return (
            <SvgText key={`v${label}`} x={bx + barW / 2} y={py(freq) - 3}
              textAnchor="middle" fontSize="9" fill="#374151">{freq}</SvgText>
          )
        })}

        {BARS.map(({ label }, i) => {
          const bx = L + i * (GW / N) + 1
          return (
            <SvgText key={`l${label}`} x={bx + barW / 2} y={B + 13}
              textAnchor="middle" fontSize="7.5" fill="#6b7280">{label}</SvgText>
          )
        })}

        <SvgText x="12" y={(T + B) / 2} textAnchor="middle" fontSize="8.5" fill="#6b7280"
          rotation="-90" originX="12" originY={(T + B) / 2}>Frequency</SvgText>
      </Svg>
    </View>
  )
}
