// Circle with central arc 120° and inscribed angle x° = 60°
const W = 260, H = 220
const CX = 130, CY = 110, R = 75

function toRad(deg) { return deg * Math.PI / 180 }
function ptOnCircle(cx, cy, r, deg) {
  return [cx + r * Math.cos(toRad(deg)), cy + r * Math.sin(toRad(deg))]
}

export default function InscribedAngleGeo() {
  // Center of circle
  // Arc from A (−150°) to B (−30°) — a 120° arc across the top
  // inscribed angle vertex C at bottom (90°)
  const [ax, ay] = ptOnCircle(CX, CY, R, -150)  // left point
  const [bx, by] = ptOnCircle(CX, CY, R, -30)   // right point
  const [cx, cy] = ptOnCircle(CX, CY, R, 90)    // bottom vertex

  // Center to midpoint of arc for central angle label
  const arcMidDeg = -90  // top of circle
  const [mx, my] = ptOnCircle(CX, CY, R * 0.45, arcMidDeg)

  // Arc path (major arc from A to B going through top)
  const [sx, sy] = ptOnCircle(CX, CY, R, -150)
  const [ex, ey] = ptOnCircle(CX, CY, R, -30)

  return (
    <div className="diagram-popgraph">
      <p className="diagram-title">Inscribed Angle Theorem</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        {/* Circle */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#374151" strokeWidth="1.5" />

        {/* Arc AB (minor arc, 120°) highlighted */}
        <path
          d={`M ${sx.toFixed(1)} ${sy.toFixed(1)} A ${R} ${R} 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}`}
          fill="none" stroke="#7c3aed" strokeWidth="3" />

        {/* Central angle lines */}
        <line x1={CX} y1={CY} x2={ax.toFixed(1)} y2={ay.toFixed(1)}
          stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5,3" />
        <line x1={CX} y1={CY} x2={bx.toFixed(1)} y2={by.toFixed(1)}
          stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5,3" />

        {/* Central angle label */}
        <text x={mx.toFixed(1)} y={(my - 5).toFixed(1)} textAnchor="middle"
          fontSize="11" fill="#7c3aed" fontWeight="bold">120°</text>

        {/* Inscribed angle lines CA and CB */}
        <line x1={cx.toFixed(1)} y1={cy.toFixed(1)} x2={ax.toFixed(1)} y2={ay.toFixed(1)}
          stroke="#dc2626" strokeWidth="2" />
        <line x1={cx.toFixed(1)} y1={cy.toFixed(1)} x2={bx.toFixed(1)} y2={by.toFixed(1)}
          stroke="#dc2626" strokeWidth="2" />

        {/* Inscribed angle arc */}
        <path d={`M ${(cx + 14).toFixed(1)} ${(cy - 5).toFixed(1)} A 16 16 0 0 1 ${(cx - 14).toFixed(1)} ${(cy - 5).toFixed(1)}`}
          fill="none" stroke="#dc2626" strokeWidth="1.5" />
        <text x={cx.toFixed(1)} y={(cy - 18).toFixed(1)} textAnchor="middle"
          fontSize="13" fill="#dc2626" fontWeight="bold">x°</text>

        {/* Points */}
        <circle cx={ax.toFixed(1)} cy={ay.toFixed(1)} r="4" fill="#374151" />
        <circle cx={bx.toFixed(1)} cy={by.toFixed(1)} r="4" fill="#374151" />
        <circle cx={cx.toFixed(1)} cy={cy.toFixed(1)} r="4" fill="#374151" />
        <circle cx={CX} cy={CY} r="3" fill="#374151" />

        <text x={(ax - 10).toFixed(1)} y={(ay + 4).toFixed(1)} fontSize="11" fill="#374151">A</text>
        <text x={(bx + 6).toFixed(1)} y={(by + 4).toFixed(1)} fontSize="11" fill="#374151">B</text>
        <text x={(cx - 4).toFixed(1)} y={(cy + 14).toFixed(1)} fontSize="11" fill="#374151">C</text>
        <text x={(CX + 4).toFixed(1)} y={(CY + 4).toFixed(1)} fontSize="10" fill="#374151">O</text>
      </svg>
    </div>
  )
}
