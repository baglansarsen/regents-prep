import { View } from 'react-native'
import Svg, { Line, Circle, Text as SvgText } from 'react-native-svg'
import { C } from '../../theme'

const W = 270, H = 210
const CX = 50, CY = 105
const SX = 35, SY = 26

const gx = (x) => CX + x * SX
const gy = (y) => CY - y * SY
const l1 = (x) => 2 * x - 1
const l2 = (x) => -x + 5

export default function SystemGraphA1() {
  const ticks = [-1, 0, 1, 2, 3, 4, 5]
  const yTicks = [-2, -1, 1, 2, 3, 4, 5, 6]

  return (
    <View style={{ backgroundColor: C.surface2, borderRadius: 10, marginBottom: 12, padding: 4, overflow: 'hidden' }}>
      <Svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        {ticks.map(t => (
          <Line key={`gx${t}`} x1={gx(t)} y1={12} x2={gx(t)} y2={H - 12} stroke="#e5e7eb" strokeWidth="0.8" />
        ))}
        {yTicks.map(t => (
          <Line key={`gy${t}`} x1={16} y1={gy(t)} x2={W - 8} y2={gy(t)} stroke="#e5e7eb" strokeWidth="0.8" />
        ))}
        <Line x1={16} y1={CY} x2={W - 8} y2={CY} stroke="#374151" strokeWidth="1.5" />
        <Line x1={CX} y1={H - 10} x2={CX} y2={10} stroke="#374151" strokeWidth="1.5" />

        {ticks.filter(t => t !== 0).map(t => (
          <SvgText key={`tx${t}`} x={gx(t)} y={CY + 13} textAnchor="middle" fontSize="8" fill="#6b7280">{t}</SvgText>
        ))}
        {yTicks.map(t => (
          <SvgText key={`ty${t}`} x={CX - 5} y={gy(t) + 3} textAnchor="end" fontSize="8" fill="#6b7280">{t}</SvgText>
        ))}
        <SvgText x={CX - 5} y={CY + 3} textAnchor="end" fontSize="8" fill="#6b7280">0</SvgText>

        {/* Line 1: y = 2x - 1 */}
        <Line x1={gx(-0.2)} y1={gy(l1(-0.2))} x2={gx(3.5)} y2={gy(l1(3.5))}
          stroke="#7c3aed" strokeWidth="2.5" />
        <SvgText x={gx(3.6)} y={gy(l1(3.6))} fontSize="8" fill="#7c3aed">y=2x−1</SvgText>

        {/* Line 2: y = -x + 5 */}
        <Line x1={gx(-0.2)} y1={gy(l2(-0.2))} x2={gx(5.2)} y2={gy(l2(5.2))}
          stroke="#2563eb" strokeWidth="2.5" />
        <SvgText x={gx(5.3)} y={gy(l2(5.3)) + 4} fontSize="8" fill="#2563eb">y=−x+5</SvgText>

        {/* Intersection */}
        <Circle cx={gx(2)} cy={gy(3)} r="5" fill="white" stroke="#dc2626" strokeWidth="2" />
        <Circle cx={gx(2)} cy={gy(3)} r="3" fill="#dc2626" />
        <SvgText x={gx(2) + 8} y={gy(3) - 6} fontSize="9" fill="#dc2626" fontWeight="bold">(2, 3)</SvgText>
      </Svg>
    </View>
  )
}
