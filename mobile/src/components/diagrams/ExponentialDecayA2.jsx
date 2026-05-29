import { View } from 'react-native'
import Svg, { Line, Circle, Polyline, Text as SvgText } from 'react-native-svg'
import { C } from '../../theme'

const W = 280, H = 195
const L = 50, B = 165, R = 265, T = 18
const GW = R - L, GH = B - T
const X_MAX = 5, Y_MAX = 110

export default function ExponentialDecayA2() {
  const px = (x) => L + (x / X_MAX) * GW
  const py = (y) => B - (y / Y_MAX) * GH
  const f = (x) => 100 * Math.pow(0.5, x)

  const pts = []
  for (let i = 0; i <= 100; i++) {
    const x = (i / 100) * X_MAX
    pts.push(`${px(x).toFixed(1)},${py(f(x)).toFixed(1)}`)
  }

  return (
    <View style={{ backgroundColor: C.surface2, borderRadius: 10, marginBottom: 12, padding: 4, overflow: 'hidden' }}>
      <Svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        <SvgText x={W / 2} y={T - 3} textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">
          f(x) = 100 · (0.5)ˣ
        </SvgText>

        {[0, 1, 2, 3, 4, 5].map(t => (
          <Line key={t} x1={px(t)} y1={T} x2={px(t)} y2={B} stroke="#e5e7eb" strokeWidth="0.8" />
        ))}
        {[0, 25, 50, 75, 100].map(t => (
          <Line key={t} x1={L} y1={py(t)} x2={R} y2={py(t)} stroke="#e5e7eb" strokeWidth="0.8" />
        ))}

        <Line x1={L} y1={T} x2={L} y2={B} stroke="#374151" strokeWidth="1.5" />
        <Line x1={L} y1={B} x2={R} y2={B} stroke="#374151" strokeWidth="1.5" />

        {[0, 1, 2, 3, 4, 5].map(t => (
          <SvgText key={t} x={px(t)} y={B + 13} textAnchor="middle" fontSize="9" fill="#6b7280">{t}</SvgText>
        ))}
        {[0, 25, 50, 75, 100].map(t => (
          <SvgText key={t} x={L - 4} y={py(t) + 3} textAnchor="end" fontSize="8.5" fill="#6b7280">{t}</SvgText>
        ))}

        <Polyline points={pts.join(' ')} fill="none" stroke="#7c3aed" strokeWidth="2.5" />

        <Circle cx={px(0)} cy={py(100)} r="3.5" fill="#dc2626" />
        <SvgText x={px(0) + 6} y={py(100) + 4} fontSize="8.5" fill="#dc2626">(0, 100)</SvgText>

        <Circle cx={px(1)} cy={py(50)} r="3.5" fill="#059669" />
        <SvgText x={px(1) + 5} y={py(50) - 4} fontSize="8.5" fill="#059669">(1, 50)</SvgText>

        <SvgText x={(L + R) / 2} y={H - 2} textAnchor="middle" fontSize="8.5" fill="#6b7280">x</SvgText>
      </Svg>
    </View>
  )
}
