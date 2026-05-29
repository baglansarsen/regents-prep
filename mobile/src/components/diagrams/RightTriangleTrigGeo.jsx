import { View } from 'react-native'
import Svg, { Polygon, Rect, Path, Text as SvgText } from 'react-native-svg'
import { C } from '../../theme'

export default function RightTriangleTrigGeo() {
  const A = [50, 150], B = [200, 150], Cv = [200, 60]

  return (
    <View style={{ backgroundColor: C.surface2, borderRadius: 10, marginBottom: 12, padding: 4, overflow: 'hidden' }}>
      <Svg width="100%" viewBox="0 0 260 175">
        <Polygon points={`${A[0]},${A[1]} ${B[0]},${B[1]} ${Cv[0]},${Cv[1]}`}
          fill="#f0fdf4" stroke="#059669" strokeWidth="2.5" />
        <Rect x={B[0] - 12} y={B[1] - 12} width="12" height="12" fill="none" stroke="#374151" strokeWidth="1.5" />

        {/* Angle arc at A */}
        <Path d="M 70 150 A 22 22 0 0 1 62 133" fill="none" stroke="#dc2626" strokeWidth="1.5" />
        <SvgText x={74} y={144} fontSize="14" fill="#dc2626" fontWeight="bold">θ</SvgText>

        {/* Hypotenuse label */}
        <SvgText x={(A[0]+Cv[0])/2-16} y={(A[1]+Cv[1])/2+4}
          textAnchor="end" fontSize="14" fill="#059669" fontWeight="600">13</SvgText>

        {/* Horizontal AB = 12 */}
        <SvgText x={(A[0]+B[0])/2} y={B[1]+16}
          textAnchor="middle" fontSize="14" fill="#059669" fontWeight="600">12</SvgText>

        {/* Vertical BC = 5 */}
        <SvgText x={B[0]+13} y={(B[1]+Cv[1])/2+4}
          textAnchor="start" fontSize="14" fill="#059669" fontWeight="600">5</SvgText>

        <SvgText x={A[0]-12} y={A[1]+5} fontSize="11" fill="#374151">A</SvgText>
        <SvgText x={B[0]+4} y={B[1]+14} fontSize="11" fill="#374151">B</SvgText>
        <SvgText x={Cv[0]+4} y={Cv[1]-4} fontSize="11" fill="#374151">C</SvgText>

        <SvgText x={130} y={22} textAnchor="middle" fontSize="9" fill="#6b7280">
          sin θ = opposite / hypotenuse
        </SvgText>
      </Svg>
    </View>
  )
}
