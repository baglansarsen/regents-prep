import { View, Text, StyleSheet } from 'react-native'
import Svg, { Line, Circle, Polyline, Text as SvgText } from 'react-native-svg'
import { C } from '../../theme'

const W = 280, H = 200
const CX = 55, CY = 100
const SCALE = 26

const gx = (x) => CX + x * SCALE
const gy = (y) => CY - y * SCALE

export default function LinearGraphA1() {
  const ticks = [-1, 0, 1, 2, 3, 4]
  const yTicks = [-3, -2, -1, 1, 2, 3, 4]

  return (
    <View style={s.wrap}>
      <Svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        {/* Grid */}
        {ticks.map(t => (
          <Line key={`gx${t}`} x1={gx(t)} y1={15} x2={gx(t)} y2={H - 15}
            stroke="#e5e7eb" strokeWidth="0.8" />
        ))}
        {yTicks.map(t => (
          <Line key={`gy${t}`} x1={20} y1={gy(t)} x2={W - 10} y2={gy(t)}
            stroke="#e5e7eb" strokeWidth="0.8" />
        ))}
        {/* Axes */}
        <Line x1={20} y1={CY} x2={W - 10} y2={CY} stroke="#374151" strokeWidth="1.5" />
        <Line x1={CX} y1={H - 12} x2={CX} y2={12} stroke="#374151" strokeWidth="1.5" />
        {/* Tick labels */}
        {ticks.filter(t => t !== 0).map(t => (
          <SvgText key={`tx${t}`} x={gx(t)} y={CY + 14} textAnchor="middle"
            fontSize="9" fill="#6b7280">{t}</SvgText>
        ))}
        {yTicks.map(t => (
          <SvgText key={`ty${t}`} x={CX - 7} y={gy(t) + 3} textAnchor="end"
            fontSize="9" fill="#6b7280">{t}</SvgText>
        ))}
        <SvgText x={CX - 7} y={CY + 3} textAnchor="end" fontSize="9" fill="#6b7280">0</SvgText>
        {/* Line y = 2x - 1 */}
        <Line x1={gx(-0.2)} y1={gy(2 * -0.2 - 1)} x2={gx(3.5)} y2={gy(2 * 3.5 - 1)}
          stroke="#7c3aed" strokeWidth="2.5" />
        {/* Y-intercept */}
        <Circle cx={gx(0)} cy={gy(-1)} r="4" fill="#7c3aed" />
        <SvgText x={gx(0) + 8} y={gy(-1) + 4} fontSize="8" fill="#7c3aed">(0, −1)</SvgText>
        {/* Second point */}
        <Circle cx={gx(2)} cy={gy(3)} r="3" fill="#7c3aed" opacity="0.6" />
        {/* Axis labels */}
        <SvgText x={W - 8} y={CY - 3} fontSize="10" fill="#374151" fontStyle="italic">x</SvgText>
        <SvgText x={CX + 4} y={15} fontSize="10" fill="#374151" fontStyle="italic">y</SvgText>
      </Svg>
    </View>
  )
}
const s = StyleSheet.create({
  wrap: { backgroundColor: C.surface2, borderRadius: 10, overflow: 'hidden', marginBottom: 12, padding: 4 },
})
