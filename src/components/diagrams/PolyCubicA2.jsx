// f(x) = (x+2)(x−1)(x−3)  —  3 real zeros at x = −2, 1, 3
const W = 320, H = 220
const CX = 90, CY = 100
const SX = 40, SY = 16

export default function PolyCubicA2() {
  const gx = (x) => CX + x * SX
  const gy = (y) => CY - y * SY

  const f = (x) => (x + 2) * (x - 1) * (x - 3)

  const pts = []
  for (let i = 0; i <= 120; i++) {
    const x = -2.5 + (i / 120) * 6.2
    const y = f(x)
    if (Math.abs(y) > 18) { pts.push('BREAK'); continue }
    pts.push(`${gx(x).toFixed(1)},${gy(y).toFixed(1)}`)
  }

  // Split on BREAK
  const segments = []
  let cur = []
  for (const p of pts) {
    if (p === 'BREAK') { if (cur.length > 1) segments.push(cur); cur = [] }
    else cur.push(p)
  }
  if (cur.length > 1) segments.push(cur)

  const xTicks = [-3, -2, -1, 0, 1, 2, 3, 4]
  const yTicks = [-10, -5, 5, 10, 15]

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
          <text key={`tx${t}`} x={gx(t)} y={CY + 13} textAnchor="middle" fontSize="9" fill="#6b7280">{t}</text>
        ))}
        {yTicks.map(t => (
          <text key={`ty${t}`} x={CX - 6} y={gy(t) + 3} textAnchor="end" fontSize="9" fill="#6b7280">{t}</text>
        ))}
        <text x={CX - 6} y={CY + 3} textAnchor="end" fontSize="9" fill="#6b7280">0</text>

        {/* Axis labels */}
        <text x={W - 7} y={CY - 3} fontSize="10" fill="#374151" fontStyle="italic">x</text>
        <text x={CX + 4} y={13} fontSize="10" fill="#374151" fontStyle="italic">y</text>

        {/* Curve segments */}
        {segments.map((seg, i) => (
          <polyline key={i} points={seg.join(' ')} fill="none" stroke="#7c3aed" strokeWidth="2.5" />
        ))}

        {/* Zero dots */}
        {[-2, 1, 3].map(z => (
          <g key={z}>
            <circle cx={gx(z)} cy={gy(0)} r="4" fill="#dc2626" />
            <text x={gx(z)} y={gy(0) - 7} textAnchor="middle" fontSize="8.5" fill="#dc2626">x={z}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}
