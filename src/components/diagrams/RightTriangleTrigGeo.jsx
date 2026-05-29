// Right triangle with legs 5 (vertical) and 12 (horizontal), hypotenuse 13
// θ is the angle at bottom-left  →  sin(θ) = 5/13
const W = 280, H = 190

export default function RightTriangleTrigGeo() {
  // Vertices: right angle at bottom-right
  const A = [55, 155]   // bottom-left (angle θ)
  const B = [210, 155]  // bottom-right (right angle)
  const C = [210, 60]   // top-right

  return (
    <div className="diagram-popgraph">
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        {/* Triangle */}
        <polygon points={`${A} ${B} ${C}`}
          fill="#f0fdf4" stroke="#059669" strokeWidth="2.5" />

        {/* Right angle box at B */}
        <rect x={B[0] - 12} y={B[1] - 12} width="12" height="12"
          fill="none" stroke="#374151" strokeWidth="1.5" />

        {/* Angle arc at A (θ) */}
        <path d="M 75 155 A 22 22 0 0 1 67 136" fill="none" stroke="#dc2626" strokeWidth="1.5" />
        <text x={78} y={148} fontSize="13" fill="#dc2626" fontWeight="bold">θ</text>

        {/* Side labels */}
        {/* Hypotenuse (A to C): label at midpoint */}
        <text x={(A[0] + C[0]) / 2 - 14} y={(A[1] + C[1]) / 2 + 4}
          textAnchor="end" fontSize="13" fill="#059669" fontWeight="600">13</text>

        {/* Horizontal leg AB = 12 */}
        <text x={(A[0] + B[0]) / 2} y={B[1] + 16}
          textAnchor="middle" fontSize="13" fill="#059669" fontWeight="600">12</text>

        {/* Vertical leg BC = 5 */}
        <text x={B[0] + 14} y={(B[1] + C[1]) / 2 + 4}
          textAnchor="start" fontSize="13" fill="#059669" fontWeight="600">5</text>

        {/* Vertex labels */}
        <text x={A[0] - 12} y={A[1] + 5} fontSize="11" fill="#374151">A</text>
        <text x={B[0] + 5}  y={B[1] + 14} fontSize="11" fill="#374151">B</text>
        <text x={C[0] + 5}  y={C[1] - 4}  fontSize="11" fill="#374151">C</text>

        {/* SOH-CAH-TOA reminder */}
        <text x={140} y={25} textAnchor="middle" fontSize="9" fill="#6b7280">
          sin θ = opp/hyp
        </text>
      </svg>
    </div>
  )
}
