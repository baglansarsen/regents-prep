import { View } from 'react-native'
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg'
import { C } from '../../theme'

const CX = 120, CY = 105, R = 78

function toRad(deg) { return deg * Math.PI / 180 }
function pt(deg) {
  return [+(CX + R * Math.cos(toRad(deg))).toFixed(1), +(CY + R * Math.sin(toRad(deg))).toFixed(1)]
}

export default function CircleChordGeo() {
  const [ax, ay] = pt(200)
  const [bx, by] = pt(20)
  const [cx_, cy_] = pt(280)
  const [dx, dy] = pt(120)
  const px_ = 112, py_ = 103

  return (
    <View style={{ backgroundColor: C.surface2, borderRadius: 10, marginBottom: 12, padding: 4, overflow: 'hidden' }}>
      <Svg width="100%" viewBox="0 0 240 200">
        <SvgText x={120} y={13} textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">
          Intersecting Chords
        </SvgText>

        <Circle cx={CX} cy={CY} r={R} fill="none" stroke="#374151" strokeWidth="1.5" />

        <Line x1={ax} y1={ay} x2={bx} y2={by} stroke="#7c3aed" strokeWidth="2" />
        <Line x1={cx_} y1={cy_} x2={dx} y2={dy} stroke="#2563eb" strokeWidth="2" />

        <Circle cx={px_} cy={py_} r="4" fill="#dc2626" />
        <SvgText x={px_ - 12} y={py_ + 14} fontSize="11" fill="#dc2626" fontWeight="600">P</SvgText>

        <SvgText x={ax - 10} y={ay + 4} fontSize="11" fill="#7c3aed">A</SvgText>
        <SvgText x={bx + 5} y={by + 4} fontSize="11" fill="#7c3aed">B</SvgText>
        <SvgText x={cx_ - 4} y={cy_ + 14} fontSize="11" fill="#2563eb">C</SvgText>
        <SvgText x={dx - 4} y={dy - 6} fontSize="11" fill="#2563eb">D</SvgText>

        {/* Segment labels */}
        <SvgText x={(ax + px_) / 2 - 12} y={(ay + py_) / 2 - 4}
          fontSize="12" fill="#7c3aed" fontWeight="600">4</SvgText>
        <SvgText x={(px_ + bx) / 2 + 4} y={(py_ + by) / 2 - 4}
          fontSize="12" fill="#7c3aed" fontWeight="600">6</SvgText>
        <SvgText x={(cx_ + px_) / 2 + 5} y={(cy_ + py_) / 2 + 4}
          fontSize="12" fill="#2563eb" fontWeight="600">3</SvgText>
        <SvgText x={(px_ + dx) / 2 - 14} y={(py_ + dy) / 2}
          fontSize="14" fill="#dc2626" fontWeight="700">x</SvgText>
      </Svg>
    </View>
  )
}
