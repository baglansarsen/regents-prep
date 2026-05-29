// y = x² − 6x + 5  →  vertex (3, −4), zeros at x = 1 and x = 5
const W = 320, H = 230
const CX = 60, CY = 90   // origin pixel coords
const SX = 40, SY = 28   // pixels per unit

export default function ParabolaA1() {
  const gx = (x) => CX + x * SX
  const gy = (y) => CY - y * SY

  const pts = []
  for (let i = 0; i <= 100; i++) {
    const x = -0.2 + (i / 100) * 6.6  // x from -0.2 to 6.4
    const y = x * x - 6 * x + 5
    pts.push(`${gx(x).toFixed(1)},${gy(y).toFixed(1)}`)
  }

  const xTicks = [0, 1, 2, 3, 4, 5, 6]
  const yTicks = [-4, -3, -2, -1, 1, 2, 3]

  return (
    <div className="diagram-popgraph">
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        {/* Grid */}
        {xTicks.map(t => (
          <line key={`gx${t}`} x1={gx(t)} y1={15} x2={gx(t)} y2={H - 12}
            stroke="#e5e7eb" strokeWidth="0.8" />
        ))}
        {yTicks.map(t => (
          <line key={`gy${t}`} x1={20} y1={gy(t)} x2={W - 10} y2={gy(t)}
            stroke="#e5e7eb" strokeWidth="0.8" />
        ))}

        {/* Axes */}
        <line x1={20} y1={CY} x2={W - 8} y2={CY} stroke="#374151" strokeWidth="1.5" />
        <line x1={CX} y1={H - 10} x2={CX} y2={12} stroke="#374151" strokeWidth="1.5" />

        {/* X-axis tick labels */}
        {xTicks.filter(t => t !== 0).map(t => (
          <text key={`tx${t}`} x={gx(t)} y={CY + 13} textAnchor="middle" fontSize="9" fill="#6b7280">{t}</text>
        ))}
        <text x={CX - 7} y={CY + 3} textAnchor="end" fontSize="9" fill="#6b7280">0</text>

        {/* Y-axis tick labels */}
        {yTicks.map(t => (
          <text key={`ty${t}`} x={CX - 6} y={gy(t) + 3} textAnchor="end" fontSize="9" fill="#6b7280">{t}</text>
        ))}

        {/* Axis labels */}
        <text x={W - 7} y={CY - 3} textAnchor="end" fontSize="10" fill="#374151" fontStyle="italic">x</text>
        <text x={CX + 4} y={14} fontSize="10" fill="#374151" fontStyle="italic">y</text>

        {/* Parabola */}
        <polyline points={pts.join(' ')} fill="none" stroke="#7c3aed" strokeWidth="2.5" />

        {/* Zeros at x=1 and x=5 */}
        <circle cx={gx(1)} cy={gy(0)} r="4" fill="#dc2626" />
        <text x={gx(1) - 2} y={gy(0) - 7} textAnchor="middle" fontSize="9" fill="#dc2626">(1, 0)</text>

        <circle cx={gx(5)} cy={gy(0)} r="4" fill="#dc2626" />
        <text x={gx(5)} y={gy(0) - 7} textAnchor="middle" fontSize="9" fill="#dc2626">(5, 0)</text>

        {/* Vertex at (3, -4) */}
        <circle cx={gx(3)} cy={gy(-4)} r="4" fill="#7c3aed" />
        <text x={gx(3) + 8} y={gy(-4)} fontSize="9" fill="#7c3aed">vertex (3, −4)</text>

        {/* Axis of symmetry dashed */}
        <line x1={gx(3)} y1={gy(3.5)} x2={gx(3)} y2={gy(-4.5)}
          stroke="#7c3aed" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
      </svg>
    </div>
  )
}
