import { View } from 'react-native'
import Svg, { Line, Circle, Text as SvgText } from 'react-native-svg'
import { C } from '../../theme'

const W = 270, H = 210
const L = 45, B = 178, R = 255, T = 18
const GW = R - L, GH = B - T
const X_MAX = 8, Y_MAX = 11

const POINTS = [
  [1, 2], [2, 3.5], [1.5, 2.8], [3, 5], [3.5, 5.5],
  [4, 6.5], [2.5, 4.2], [5, 7.8], [4.5, 7], [6, 8.5],
  [5.5, 8], [6.5, 9], [3.8, 6.1], [2.8, 4.8], [7, 10],
]

export default function ScatterPlotA1() {
  const px = (x) => L + (x / X_MAX) * GW
  const py = (y) => B - (y / Y_MAX) * GH

  return (
    <View style={{ backgroundColor: C.surface2, borderRadius: 10, marginBottom: 12, padding: 4, overflow: 'hidden' }}>
      <Svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        <Line x1={L} y1={T} x2={L} y2={B} stroke="#374151" strokeWidth="1.5" />
        <Line x1={L} y1={B} x2={R} y2={B} stroke="#374151" strokeWidth="1.5" />

        {[0, 2, 4, 6, 8].map(t => (
          <SvgText key={t} x={px(t)} y={B + 13} textAnchor="middle" fontSize="9" fill="#6b7280">{t}</SvgText>
        ))}
        {[0, 2, 4, 6, 8, 10].map(t => (
          <SvgText key={t} x={L - 5} y={py(t) + 3} textAnchor="end" fontSize="9" fill="#6b7280">{t}</SvgText>
        ))}

        <SvgText x={(L + R) / 2} y={H - 2} textAnchor="middle" fontSize="9" fill="#6b7280">Hours Studied</SvgText>
        <SvgText x="11" y={(T + B) / 2} textAnchor="middle" fontSize="9" fill="#6b7280"
          rotation="-90" originX="11" originY={(T + B) / 2}>Score</SvgText>

        {/* Best-fit line */}
        <Line x1={px(0.5)} y1={py(1.3 * 0.5 + 0.8)} x2={px(7.5)} y2={py(1.3 * 7.5 + 0.8)}
          stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.7" />

        {POINTS.map(([x, y], i) => (
          <Circle key={i} cx={px(x)} cy={py(y)} r="4" fill="#7c3aed" opacity="0.8" />
        ))}

        <SvgText x={(L + R) / 2} y={T - 3} textAnchor="middle" fontSize="9" fill="#374151">
          Study Hours vs. Quiz Score
        </SvgText>
      </Svg>
    </View>
  )
}
