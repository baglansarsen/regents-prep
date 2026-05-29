import { View } from 'react-native'
import Svg, { Polygon, Rect, Text as SvgText } from 'react-native-svg'
import { C } from '../../theme'

export default function SimilarTrianglesGeo() {
  const A = [28, 148], B = [148, 148], C_ = [148, 60]
  const D = [180, 158], E = [248, 158], F = [248, 118]

  return (
    <View style={{ backgroundColor: C.surface2, borderRadius: 10, marginBottom: 12, padding: 4, overflow: 'hidden' }}>
      <Svg width="100%" viewBox="0 0 280 175">
        <SvgText x={140} y={14} textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">
          △ABC ~ △DEF
        </SvgText>

        {/* Large triangle */}
        <Polygon points={`${A[0]},${A[1]} ${B[0]},${B[1]} ${C_[0]},${C_[1]}`}
          fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        <Rect x={B[0] - 10} y={B[1] - 10} width="10" height="10" fill="none" stroke="#374151" strokeWidth="1.5" />

        <SvgText x={A[0] - 12} y={A[1] + 5} fontSize="11" fill="#374151">A</SvgText>
        <SvgText x={B[0] + 5} y={B[1] + 13} fontSize="11" fill="#374151">B</SvgText>
        <SvgText x={C_[0] + 6} y={C_[1] - 2} fontSize="11" fill="#374151">C</SvgText>

        <SvgText x={(A[0]+B[0])/2} y={A[1]+14} textAnchor="middle" fontSize="12" fill="#7c3aed" fontWeight="600">6</SvgText>
        <SvgText x={B[0]+12} y={(B[1]+C_[1])/2} textAnchor="start" fontSize="12" fill="#7c3aed" fontWeight="600">8</SvgText>
        <SvgText x={(A[0]+C_[0])/2-14} y={(A[1]+C_[1])/2} textAnchor="end" fontSize="12" fill="#7c3aed" fontWeight="600">10</SvgText>

        {/* Small triangle */}
        <Polygon points={`${D[0]},${D[1]} ${E[0]},${E[1]} ${F[0]},${F[1]}`}
          fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <Rect x={E[0] - 8} y={E[1] - 8} width="8" height="8" fill="none" stroke="#374151" strokeWidth="1.5" />

        <SvgText x={D[0] - 10} y={D[1] + 13} fontSize="11" fill="#d97706">D</SvgText>
        <SvgText x={E[0] + 4} y={E[1] + 13} fontSize="11" fill="#d97706">E</SvgText>
        <SvgText x={F[0] + 5} y={F[1] - 2} fontSize="11" fill="#d97706">F</SvgText>

        <SvgText x={(D[0]+E[0])/2} y={D[1]+14} textAnchor="middle" fontSize="12" fill="#d97706" fontWeight="600">3</SvgText>
        <SvgText x={E[0]+8} y={(E[1]+F[1])/2} textAnchor="start" fontSize="13" fill="#dc2626" fontWeight="700">?</SvgText>
        <SvgText x={(D[0]+F[0])/2-10} y={(D[1]+F[1])/2} textAnchor="end" fontSize="12" fill="#d97706" fontWeight="600">5</SvgText>
      </Svg>
    </View>
  )
}
