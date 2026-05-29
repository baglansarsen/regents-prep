import { View } from 'react-native'
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg'
import { C } from '../../theme'

const W = 290, H = 110
const L = 38, R = 268, MID = 58
const DATA_MIN = 0, DATA_MAX = 20
const VALUES = { min: 2, q1: 5, median: 8, q3: 12, max: 18 }

export default function BoxPlotA1() {
  const px = (v) => L + ((v - DATA_MIN) / (DATA_MAX - DATA_MIN)) * (R - L)
  const axisY = MID, boxT = axisY - 16, boxB = axisY + 16

  return (
    <View style={{ backgroundColor: C.surface2, borderRadius: 10, marginBottom: 12, padding: 4, overflow: 'hidden' }}>
      <SvgText x={W / 2} y={14} textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600"
        style={{ position: 'absolute' }} />
      <Svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        <SvgText x={W / 2} y={13} textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">
          Box-and-Whisker Plot
        </SvgText>

        <Line x1={L - 5} y1={axisY} x2={R + 5} y2={axisY} stroke="#374151" strokeWidth="1.5" />
        {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20].map(t => (
          <Line key={t} x1={px(t)} y1={axisY - 3} x2={px(t)} y2={axisY + 3} stroke="#374151" strokeWidth="1" />
        ))}
        {[0, 5, 10, 15, 20].map(t => (
          <SvgText key={t} x={px(t)} y={axisY + 14} textAnchor="middle" fontSize="8" fill="#6b7280">{t}</SvgText>
        ))}

        <Line x1={px(VALUES.min)} y1={axisY} x2={px(VALUES.q1)} y2={axisY} stroke="#374151" strokeWidth="2" />
        <Line x1={px(VALUES.min)} y1={boxT + 8} x2={px(VALUES.min)} y2={boxB - 8} stroke="#374151" strokeWidth="2" />

        <Rect x={px(VALUES.q1)} y={boxT} width={px(VALUES.q3) - px(VALUES.q1)} height={boxB - boxT}
          fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        <Line x1={px(VALUES.median)} y1={boxT} x2={px(VALUES.median)} y2={boxB}
          stroke="#7c3aed" strokeWidth="2.5" />

        <Line x1={px(VALUES.q3)} y1={axisY} x2={px(VALUES.max)} y2={axisY} stroke="#374151" strokeWidth="2" />
        <Line x1={px(VALUES.max)} y1={boxT + 8} x2={px(VALUES.max)} y2={boxB - 8} stroke="#374151" strokeWidth="2" />

        <SvgText x={px(VALUES.min)} y={boxT - 3} textAnchor="middle" fontSize="7.5" fill="#374151">Min=2</SvgText>
        <SvgText x={px(VALUES.q1)} y={boxT - 3} textAnchor="middle" fontSize="7.5" fill="#7c3aed">Q1=5</SvgText>
        <SvgText x={px(VALUES.median)} y={boxT - 3} textAnchor="middle" fontSize="7.5" fill="#7c3aed">Med=8</SvgText>
        <SvgText x={px(VALUES.q3)} y={boxT - 3} textAnchor="middle" fontSize="7.5" fill="#7c3aed">Q3=12</SvgText>
        <SvgText x={px(VALUES.max)} y={boxT - 3} textAnchor="middle" fontSize="7.5" fill="#374151">Max=18</SvgText>
      </Svg>
    </View>
  )
}
