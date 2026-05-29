// Two chords AB and CD intersecting at P inside circle
// AP=4, PB=6, CP=3, PD=x → x = 4·6/3 = 8
const W = 260, H = 220
const CX = 130, CY = 110, R = 85

function toRad(deg) { return deg * Math.PI / 180 }
function pt(deg) {
  return [CX + R * Math.cos(toRad(deg)), CY + R * Math.sin(toRad(deg))]
}

export default function CircleChordGeo() {
  // Chord 1: A at 200° and B at 20°  (passes through P slightly off-center)
  const [ax, ay] = pt(200)
  const [bx, by] = pt(20)

  // Chord 2: C at 280° and D at 120°
  const [cx_, cy_] = pt(280)
  const [dx, dy] = pt(120)

  // Intersection point P (slightly off-center, computed for visual)
  // For display, use approximate midpoint shifted
  const px_ = 118, py_ = 108

  return (
    <div className="diagram-popgraph">
      <p className="diagram-title">Intersecting Chords</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        {/* Circle */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#374151" strokeWidth="1.5" />

        {/* Chord AB */}
        <line x1={ax.toFixed(1)} y1={ay.toFixed(1)} x2={bx.toFixed(1)} y2={by.toFixed(1)}
          stroke="#7c3aed" strokeWidth="2" />

        {/* Chord CD */}
        <line x1={cx_.toFixed(1)} y1={cy_.toFixed(1)} x2={dx.toFixed(1)} y2={dy.toFixed(1)}
          stroke="#2563eb" strokeWidth="2" />

        {/* Intersection point P */}
        <circle cx={px_} cy={py_} r="4" fill="#dc2626" />
        <text x={px_ - 10} y={py_ + 13} fontSize="11" fill="#dc2626" fontWeight="600">P</text>

        {/* Endpoint labels */}
        <text x={(ax - 10).toFixed(1)} y={(ay + 4).toFixed(1)} fontSize="11" fill="#7c3aed">A</text>
        <text x={(bx + 5).toFixed(1)} y={(by + 4).toFixed(1)} fontSize="11" fill="#7c3aed">B</text>
        <text x={(cx_ - 4).toFixed(1)} y={(cy_ + 14).toFixed(1)} fontSize="11" fill="#2563eb">C</text>
        <text x={(dx - 4).toFixed(1)} y={(dy - 6).toFixed(1)} fontSize="11" fill="#2563eb">D</text>

        {/* Segment length labels */}
        {/* AP = 4 (midpoint of A to P) */}
        <text x={(ax + px_) / 2 - 12} y={(ay + py_) / 2 - 4} fontSize="11" fill="#7c3aed" fontWeight="600">4</text>
        {/* PB = 6 */}
        <text x={(px_ + bx) / 2 + 4} y={(py_ + by) / 2 - 4} fontSize="11" fill="#7c3aed" fontWeight="600">6</text>
        {/* CP = 3 */}
        <text x={(cx_ + px_) / 2 + 4} y={(cy_ + py_) / 2 + 4} fontSize="11" fill="#2563eb" fontWeight="600">3</text>
        {/* PD = x */}
        <text x={(px_ + dx) / 2 - 14} y={(py_ + dy) / 2} fontSize="13" fill="#dc2626" fontWeight="bold">x</text>
      </svg>
    </div>
  )
}
