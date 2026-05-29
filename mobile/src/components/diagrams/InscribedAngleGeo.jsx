import { View } from 'react-native'
import Svg, { Circle, Line, Path, Text as SvgText } from 'react-native-svg'
import { C } from '../../theme'

const CX = 120, CY = 110, R = 78

function toRad(deg) { return deg * Math.PI / 180 }
function pt(deg) {
  return [+(CX + R * Math.cos(toRad(deg))).toFixed(1), +(CY + R * Math.sin(toRad(deg))).toFixed(1)]
}

export default function InscribedAngleGeo() {
  const [ax, ay] = pt(-150)
  const [bx, by] = pt(-30)
  const [cx_, cy_] = pt(90)

  return (
    <View style={{ backgroundColor: C.surface2, borderRadius: 10, marginBottom: 12, padding: 4, overflow: 'hidden' }}>
      <Svg width="100%" viewBox="0 0 240 205">
        <SvgText x={120} y={13} textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">
          Inscribed Angle Theorem
        </SvgText>

        <Circle cx={CX} cy={CY} r={R} fill="none" stroke="#374151" strokeWidth="1.5" />

        {/* Arc AB (minor arc, 120°) */}
        <Path d={`M ${ax} ${ay} A ${R} ${R} 0 0 1 ${bx} ${by}`}
          fill="none" stroke="#7c3aed" strokeWidth="3" />

        {/* Central angle dashed lines */}
        <Line x1={CX} y1={CY} x2={ax} y2={ay} stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5,3" />
        <Line x1={CX} y1={CY} x2={bx} y2={by} stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5,3" />
        <SvgText x={CX - 2} y={CY - 22} textAnchor="middle" fontSize="11" fill="#7c3aed" fontWeight="bold">120°</SvgText>

        {/* Inscribed angle lines */}
        <Line x1={cx_} y1={cy_} x2={ax} y2={ay} stroke="#dc2626" strokeWidth="2" />
        <Line x1={cx_} y1={cy_} x2={bx} y2={by} stroke="#dc2626" strokeWidth="2" />

        {/* Angle label */}
        <SvgText x={cx_} y={cy_ - 20} textAnchor="middle" fontSize="14" fill="#dc2626" fontWeight="bold">x°</SvgText>

        {/* Points */}
        <Circle cx={ax} cy={ay} r="4" fill="#374151" />
        <Circle cx={bx} cy={by} r="4" fill="#374151" />
        <Circle cx={cx_} cy={cy_} r="4" fill="#374151" />
        <Circle cx={CX} cy={CY} r="3" fill="#374151" />

        <SvgText x={ax - 10} y={ay + 4} fontSize="11" fill="#374151">A</SvgText>
        <SvgText x={bx + 6} y={by + 4} fontSize="11" fill="#374151">B</SvgText>
        <SvgText x={cx_ - 4} y={cy_ + 16} fontSize="11" fill="#374151">C</SvgText>
        <SvgText x={CX + 4} y={CY + 4} fontSize="10" fill="#374151">O</SvgText>
      </Svg>
    </View>
  )
}
