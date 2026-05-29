import { View } from 'react-native'
import Svg, { Line, Circle, Polyline, Text as SvgText } from 'react-native-svg'
import { C } from '../../theme'

const W = 280, H = 210
const CX = 55, CY = 85
const SX = 36, SY = 26

const gx = (x) => CX + x * SX
const gy = (y) => CY - y * SY

export default function ParabolaA1() {
  const pts = []
  for (let i = 0; i <= 80; i++) {
    const x = -0.2 + (i / 80) * 6.4
    const y = x * x - 6 * x + 5
    if (Math.abs(y) > 5) continue
    pts.push(`${gx(x).toFixed(1)},${gy(y).toFixed(1)}`)
  }

  const xTicks = [0, 1, 2, 3, 4, 5, 6]
  const yTicks = [-4, -3, -2, -1, 1, 2, 3]

  return (
    <View style={{ backgroundColor: C.surface2, borderRadius: 10, marginBottom: 12, padding: 4, overflow: 'hidden' }}>
      <Svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        {xTicks.map(t => (
          <Line key={`gx${t}`} x1={gx(t)} y1={12} x2={gx(t)} y2={H - 14}
            stroke="#e5e7eb" strokeWidth="0.8" />
        ))}
        {yTicks.map(t => (
          <Line key={`gy${t}`} x1={18} y1={gy(t)} x2={W - 10} y2={gy(t)}
            stroke="#e5e7eb" strokeWidth="0.8" />
        ))}
        <Line x1={18} y1={CY} x2={W - 10} y2={CY} stroke="#374151" strokeWidth="1.5" />
        <Line x1={CX} y1={H - 12} x2={CX} y2={10} stroke="#374151" strokeWidth="1.5" />

        {xTicks.filter(t => t !== 0).map(t => (
          <SvgText key={`tx${t}`} x={gx(t)} y={CY + 13} textAnchor="middle" fontSize="9" fill="#6b7280">{t}</SvgText>
        ))}
        {yTicks.map(t => (
          <SvgText key={`ty${t}`} x={CX - 6} y={gy(t) + 3} textAnchor="end" fontSize="9" fill="#6b7280">{t}</SvgText>
        ))}
        <SvgText x={CX - 6} y={CY + 3} textAnchor="end" fontSize="9" fill="#6b7280">0</SvgText>

        {pts.length > 1 && (
          <Polyline points={pts.join(' ')} fill="none" stroke="#7c3aed" strokeWidth="2.5" />
        )}

        <Circle cx={gx(1)} cy={gy(0)} r="4" fill="#dc2626" />
        <SvgText x={gx(1) - 2} y={gy(0) - 8} textAnchor="middle" fontSize="8.5" fill="#dc2626">(1, 0)</SvgText>

        <Circle cx={gx(5)} cy={gy(0)} r="4" fill="#dc2626" />
        <SvgText x={gx(5)} y={gy(0) - 8} textAnchor="middle" fontSize="8.5" fill="#dc2626">(5, 0)</SvgText>

        <Circle cx={gx(3)} cy={gy(-4)} r="4" fill="#7c3aed" />
        <SvgText x={gx(3) + 7} y={gy(-4)} fontSize="8.5" fill="#7c3aed">vertex (3,−4)</SvgText>
        <SvgText x={W - 8} y={CY - 3} fontSize="10" fill="#374151" fontStyle="italic">x</SvgText>
        <SvgText x={CX + 4} y={13} fontSize="10" fill="#374151" fontStyle="italic">y</SvgText>
      </Svg>
    </View>
  )
}
