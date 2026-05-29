import { View } from 'react-native'
import Svg, { Line, Circle, Path, Text as SvgText } from 'react-native-svg'
import { C } from '../../theme'

export default function ParallelLinesGeo() {
  const l1y = 65, l2y = 138
  const i1x = 92, i2x = 168

  return (
    <View style={{ backgroundColor: C.surface2, borderRadius: 10, marginBottom: 12, padding: 4, overflow: 'hidden' }}>
      <Svg width="100%" viewBox="0 0 260 185">
        <SvgText x={130} y={14} textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">
          Parallel Lines Cut by a Transversal
        </SvgText>

        {/* Parallel lines */}
        <Line x1={25} y1={l1y} x2={235} y2={l1y} stroke="#374151" strokeWidth="2" />
        <SvgText x={238} y={l1y + 4} fontSize="11" fill="#374151">ℓ₁</SvgText>
        <Line x1={25} y1={l2y} x2={235} y2={l2y} stroke="#374151" strokeWidth="2" />
        <SvgText x={238} y={l2y + 4} fontSize="11" fill="#374151">ℓ₂</SvgText>

        {/* Parallel arrows */}
        <SvgText x={215} y={l1y + 5} fontSize="13" fill="#374151">›</SvgText>
        <SvgText x={215} y={l2y + 5} fontSize="13" fill="#374151">›</SvgText>

        {/* Transversal */}
        <Line x1={58} y1={28} x2={202} y2={175} stroke="#374151" strokeWidth="2" />

        {/* 65° angle at i1 */}
        <Path d={`M ${i1x + 18} ${l1y} A 18 18 0 0 1 ${i1x + 12} ${l1y + 14}`}
          fill="none" stroke="#7c3aed" strokeWidth="1.5" />
        <SvgText x={i1x + 25} y={l1y + 16} fontSize="12" fill="#7c3aed" fontWeight="bold">65°</SvgText>

        {/* x° angle at i2 */}
        <Path d={`M ${i2x - 18} ${l2y} A 18 18 0 0 0 ${i2x - 12} ${l2y - 14}`}
          fill="none" stroke="#dc2626" strokeWidth="1.5" />
        <SvgText x={i2x - 50} y={l2y - 8} fontSize="14" fill="#dc2626" fontWeight="bold">x°</SvgText>

        <Circle cx={i1x} cy={l1y} r="3" fill="#374151" />
        <Circle cx={i2x} cy={l2y} r="3" fill="#374151" />
      </Svg>
    </View>
  )
}
