// Two lines: y = 2x − 1  and  y = −x + 5  intersect at (2, 3)
const W = 300, H = 220
const CX = 55, CY = 110
const SX = 38, SY = 28

export default function SystemGraphA1() {
  const gx = (x) => CX + x * SX
  const gy = (y) => CY - y * SY

  const xTicks = [-1, 0, 1, 2, 3, 4, 5, 6]
  const yTicks = [-2, -1, 1, 2, 3, 4, 5, 6]

  // Line 1: y = 2x - 1, from x=-0.5 to x=4
  const l1 = (x) => 2 * x - 1
  // Line 2: y = -x + 5, from x=-0.5 to x=5.5
  const l2 = (x) => -x + 5

  return (
    <div className="diagram-popgraph">
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        {/* Grid */}
        {xTicks.map(t => (
          <line key={`gx${t}`} x1={gx(t)} y1={12} x2={gx(t)} y2={H - 12}
            stroke="#e5e7eb" strokeWidth="0.8" />
        ))}
        {yTicks.map(t => (
          <line key={`gy${t}`} x1={18} y1={gy(t)} x2={W - 10} y2={gy(t)}
            stroke="#e5e7eb" strokeWidth="0.8" />
        ))}

        {/* Axes */}
        <line x1={18} y1={CY} x2={W - 8} y2={CY} stroke="#374151" strokeWidth="1.5" />
        <line x1={CX} y1={H - 10} x2={CX} y2={10} stroke="#374151" strokeWidth="1.5" />

        {/* Tick labels */}
        {xTicks.filter(t => t !== 0).map(t => (
          <text key={`tx${t}`} x={gx(t)} y={CY + 13} textAnchor="middle" fontSize="8" fill="#6b7280">{t}</text>
        ))}
        {yTicks.map(t => (
          <text key={`ty${t}`} x={CX - 6} y={gy(t) + 3} textAnchor="end" fontSize="8" fill="#6b7280">{t}</text>
        ))}
        <text x={CX - 6} y={CY + 3} textAnchor="end" fontSize="8" fill="#6b7280">0</text>

        {/* Line 1: y = 2x - 1 (purple) */}
        <line x1={gx(-0.2)} y1={gy(l1(-0.2))} x2={gx(3.5)} y2={gy(l1(3.5))}
          stroke="#7c3aed" strokeWidth="2.5" />
        <text x={gx(3.6)} y={gy(l1(3.6))} fontSize="9" fill="#7c3aed">y = 2x − 1</text>

        {/* Line 2: y = -x + 5 (blue) */}
        <line x1={gx(-0.2)} y1={gy(l2(-0.2))} x2={gx(5.5)} y2={gy(l2(5.5))}
          stroke="#2563eb" strokeWidth="2.5" />
        <text x={gx(5.6)} y={gy(l2(5.6)) + 4} fontSize="9" fill="#2563eb">y = −x + 5</text>

        {/* Intersection point at (2, 3) */}
        <circle cx={gx(2)} cy={gy(3)} r="5" fill="white" stroke="#dc2626" strokeWidth="2" />
        <circle cx={gx(2)} cy={gy(3)} r="3" fill="#dc2626" />
        <text x={gx(2) + 8} y={gy(3) - 6} fontSize="9" fill="#dc2626" fontWeight="bold">(2, 3)</text>
      </svg>
    </div>
  )
}
