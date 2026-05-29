// Parallel lines cut by a transversal — alternate interior angles both = 65°
const W = 280, H = 200

export default function ParallelLinesGeo() {
  // Two parallel horizontal-ish lines and a diagonal transversal
  const l1y = 65   // top parallel line y
  const l2y = 145  // bottom parallel line y

  // Transversal: from (60, 30) to (220, 180)
  const tx1 = 60, ty1 = 30, tx2 = 220, ty2 = 180
  const tSlope = (ty2 - ty1) / (tx2 - tx1)

  // Intersection of transversal with line 1 (y = l1y):
  const i1x = tx1 + (l1y - ty1) / tSlope  // ~87
  // Intersection of transversal with line 2 (y = l2y):
  const i2x = tx1 + (l2y - ty1) / tSlope  // ~167

  const ARC_R = 20

  return (
    <div className="diagram-popgraph">
      <p className="diagram-title">Parallel Lines Cut by a Transversal</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        {/* Parallel line 1 */}
        <line x1={30} y1={l1y} x2={250} y2={l1y} stroke="#374151" strokeWidth="2" />
        <text x={250} y={l1y - 5} fontSize="10" fill="#374151">ℓ₁</text>

        {/* Parallel line 2 */}
        <line x1={30} y1={l2y} x2={250} y2={l2y} stroke="#374151" strokeWidth="2" />
        <text x={250} y={l2y - 5} fontSize="10" fill="#374151">ℓ₂</text>

        {/* Arrows on right side of parallel lines indicating they are parallel */}
        <text x={232} y={l1y + 5} fontSize="12" fill="#374151">›</text>
        <text x={232} y={l2y + 5} fontSize="12" fill="#374151">›</text>

        {/* Transversal */}
        <line x1={tx1} y1={ty1} x2={tx2} y2={ty2} stroke="#374151" strokeWidth="2" />

        {/* Angle arc at i1 — below-right of intersection → 65° */}
        <path
          d={`M ${i1x + ARC_R} ${l1y} A ${ARC_R} ${ARC_R} 0 0 1 ${i1x + ARC_R * Math.cos(Math.atan(tSlope) + 0.05)} ${l1y + ARC_R * Math.sin(Math.atan(tSlope) + 0.05)}`}
          fill="none" stroke="#7c3aed" strokeWidth="1.5"
        />
        <text x={i1x + ARC_R + 8} y={l1y + 14} fontSize="11" fill="#7c3aed" fontWeight="bold">65°</text>

        {/* Angle arc at i2 — above-left of intersection → x° (alternate interior) */}
        <path
          d={`M ${i2x - ARC_R} ${l2y} A ${ARC_R} ${ARC_R} 0 0 0 ${i2x - ARC_R * Math.cos(Math.atan(-tSlope) + 0.05)} ${l2y - ARC_R * Math.sin(Math.atan(-tSlope) + 0.05)}`}
          fill="none" stroke="#dc2626" strokeWidth="1.5"
        />
        <text x={i2x - ARC_R - 28} y={l2y - 8} fontSize="13" fill="#dc2626" fontWeight="bold">x°</text>

        {/* Intersection dots */}
        <circle cx={i1x} cy={l1y} r="3" fill="#374151" />
        <circle cx={i2x} cy={l2y} r="3" fill="#374151" />
      </svg>
    </div>
  )
}
