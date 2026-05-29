import { View } from 'react-native'
import Svg, { Line, Circle, Polyline, Text as SvgText } from 'react-native-svg'
import { C } from '../../theme'

const W = 280, H = 210
const CX = 85, CY = 95
const SX = 38, SY = 15

const gx = (x) => CX + x * SX
const gy = (y) => CY - y * SY
const f = (x) => (x + 2) * (x - 1) * (x - 3)

export default function PolyCubicA2() {
  const pts = []
  for (let i = 0; i <= 100; i++) {
    const x = -2.5 + (i / 100) * 6
    const y = f(x)
    if (Math.abs(y) > 17) continue
    pts.push(`${gx(x).toFixed(1)},${gy(y).toFixed(1)}`)
  }

  const xTicks = [-2, -1, 0, 1, 2, 3, 4]
  const yTicks = [-10, -5, 5, 10]

  return (
    <View style={{ backgroundColor: C.surface2, borderRadius: 10, marginBottom: 12, padding: 4, overflow: 'hidden' }}>
      <Svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        {xTicks.map(t => (
          <Line key={`gx${t}`} x1={gx(t)} y1={10} x2={gx(t)} y2={H - 12} stroke="#e5e7eb" strokeWidth="0.8" />
        ))}
        {yTicks.map(t => (
          <Line key={`gy${t}`} x1={16} y1={gy(t)} x2={W - 8} y2={gy(t)} stroke="#e5e7eb" strokeWidth="0.8" />
        ))}
        <Line x1={16} y1={CY} x2={W - 8} y2={CY} stroke="#374151" strokeWidth="1.5" />
        <Line x1={CX} y1={H - 10} x2={CX} y2={8} stroke="#374151" strokeWidth="1.5" />

        {xTicks.filter(t => t !== 0).map(t => (
          <SvgText key={`tx${t}`} x={gx(t)} y={CY + 13} textAnchor="middle" fontSize="9" fill="#6b7280">{t}</SvgText>
        ))}
        {yTicks.map(t => (
          <SvgText key={`ty${t}`} x={CX - 5} y={gy(t) + 3} textAnchor="end" fontSize="9" fill="#6b7280">{t}</SvgText>
        ))}
        <SvgText x={CX - 5} y={CY + 3} textAnchor="end" fontSize="9" fill="#6b7280">0</SvgText>

        {pts.length > 1 && (
          <Polyline points={pts.join(' ')} fill="none" stroke="#7c3aed" strokeWidth="2.5" />
        )}

        {[-2, 1, 3].map(z => (
          <Circle key={z} cx={gx(z)} cy={gy(0)} r="4" fill="#dc2626" />
        ))}
        {[-2, 1, 3].map(z => (
          <SvgText key={`l${z}`} x={gx(z)} y={gy(0) - 8} textAnchor="middle"
            fontSize="8.5" fill="#dc2626">x={z}</SvgText>
        ))}
        <SvgText x={W - 8} y={CY - 3} fontSize="10" fill="#374151" fontStyle="italic">x</SvgText>
        <SvgText x={CX + 4} y={11} fontSize="10" fill="#374151" fontStyle="italic">y</SvgText>
      </Svg>
    </View>
  )
}
