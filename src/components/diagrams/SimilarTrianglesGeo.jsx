// △ABC ~ △DEF  —  AB=6, BC=8, AC=10 (3-4-5 scaled ×2)  |  DE=3, EF=4, DF=5
const W = 300, H = 190

export default function SimilarTrianglesGeo() {
  // Large triangle ABC
  const A = [30, 150], B = [150, 150], C = [150, 60]   // right angle at B
  // Small triangle DEF  (half scale)
  const D = [190, 160], E = [260, 160], F = [260, 120]  // right angle at E

  const label = (x, y, txt, dx = 0, dy = 0, color = '#374151') => (
    <text x={x + dx} y={y + dy} textAnchor="middle" fontSize="11" fill={color} fontWeight="600">{txt}</text>
  )

  return (
    <div className="diagram-popgraph">
      <p className="diagram-title">△ABC ~ △DEF</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        {/* Large triangle */}
        <polygon points={`${A} ${B} ${C}`}
          fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />

        {/* Right angle box at B */}
        <rect x={B[0] - 10} y={B[1] - 10} width="10" height="10"
          fill="none" stroke="#374151" strokeWidth="1.5" />

        {/* Vertex labels */}
        {label(A[0], A[1], 'A', -12, 5)}
        {label(B[0], B[1], 'B', 12, 14)}
        {label(C[0], C[1], 'C', 14, -2)}

        {/* Side labels */}
        <text x={(A[0] + B[0]) / 2} y={A[1] + 14} textAnchor="middle" fontSize="11" fill="#7c3aed">6</text>
        <text x={B[0] + 14} y={(B[1] + C[1]) / 2} textAnchor="start" fontSize="11" fill="#7c3aed">8</text>
        <text x={(A[0] + C[0]) / 2 - 14} y={(A[1] + C[1]) / 2} textAnchor="end" fontSize="11" fill="#7c3aed">10</text>

        {/* Small triangle */}
        <polygon points={`${D} ${E} ${F}`}
          fill="#fef3c7" stroke="#d97706" strokeWidth="2" />

        {/* Right angle box at E */}
        <rect x={E[0] - 8} y={E[1] - 8} width="8" height="8"
          fill="none" stroke="#374151" strokeWidth="1.5" />

        {/* Vertex labels */}
        {label(D[0], D[1], 'D', -10, 12, '#d97706')}
        {label(E[0], E[1], 'E', 10, 12, '#d97706')}
        {label(F[0], F[1], 'F', 12, -2, '#d97706')}

        {/* Side labels */}
        <text x={(D[0] + E[0]) / 2} y={D[1] + 14} textAnchor="middle" fontSize="11" fill="#d97706">3</text>
        <text x={E[0] + 10} y={(E[1] + F[1]) / 2} textAnchor="start" fontSize="11" fill="#d97706">?</text>
        <text x={(D[0] + F[0]) / 2 - 10} y={(D[1] + F[1]) / 2} textAnchor="end" fontSize="11" fill="#d97706">5</text>

        {/* Scale factor annotation */}
        <text x={150} y={18} textAnchor="middle" fontSize="9" fill="#6b7280">Scale factor: 2:1</text>
      </svg>
    </div>
  )
}
