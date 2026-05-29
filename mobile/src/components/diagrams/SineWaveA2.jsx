import { View } from 'react-native'
import Svg, { Line, Polyline, Text as SvgText } from 'react-native-svg'
import { C } from '../../theme'

const W = 300, H = 180
const L = 45, B = 148, R = 285, T = 18
const GW = R - L, GH = B - T
const X_MAX = Math.PI * 2

export default function SineWaveA2() {
  const px = (x) => L + (x / X_MAX) * GW
  const midY = (T + B) / 2
  const py = (y) => midY - (y / 2.5) * (GH / 2)

  const pts = []
  for (let i = 0; i <= 200; i++) {
    const x = (i / 200) * X_MAX
    const y = 2 * Math.sin(2 * x)
    pts.push(`${px(x).toFixed(1)},${py(y).toFixed(1)}`)
  }

  const piLabels = [
    { v: 0, label: '0' },
    { v: Math.PI / 2, label: 'π/2' },
    { v: Math.PI, label: 'π' },
    { v: 3 * Math.PI / 2, label: '3π/2' },
    { v: 2 * Math.PI, label: '2π' },
  ]

  return (
    <View style={{ backgroundColor: C.surface2, borderRadius: 10, marginBottom: 12, padding: 4, overflow: 'hidden' }}>
      <Svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        <SvgText x={W / 2} y={T - 3} textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">
          f(x) = 2 sin(2x)
        </SvgText>

        {[-2, -1, 1, 2].map(y => (
          <Line key={y} x1={L} y1={py(y)} x2={R} y2={py(y)} stroke="#e5e7eb" strokeWidth="0.8" />
        ))}
        <Line x1={L} y1={midY} x2={R} y2={midY} stroke="#374151" strokeWidth="1.5" />
        <Line x1={L} y1={T} x2={L} y2={B} stroke="#374151" strokeWidth="1.5" />

        {piLabels.map(({ v, label }) => (
          <Line key={label} x1={px(v)} y1={midY - 3} x2={px(v)} y2={midY + 3}
            stroke="#374151" strokeWidth="1" />
        ))}
        {piLabels.map(({ v, label }) => (
          <SvgText key={label} x={px(v)} y={midY + 14} textAnchor="middle"
            fontSize="8.5" fill="#6b7280">{label}</SvgText>
        ))}

        {[-2, -1, 1, 2].map(y => (
          <SvgText key={y} x={L - 5} y={py(y) + 3} textAnchor="end" fontSize="8.5" fill="#6b7280">{y}</SvgText>
        ))}
        <SvgText x={L - 5} y={midY + 3} textAnchor="end" fontSize="8.5" fill="#6b7280">0</SvgText>

        <Polyline points={pts.join(' ')} fill="none" stroke="#7c3aed" strokeWidth="2.5" />

        {/* Period label */}
        <Line x1={px(0)} y1={T + 6} x2={px(Math.PI)} y2={T + 6} stroke="#dc2626" strokeWidth="1.5" />
        <SvgText x={px(Math.PI / 2)} y={T + 3} textAnchor="middle" fontSize="8.5" fill="#dc2626">period = π</SvgText>
      </Svg>
    </View>
  )
}
