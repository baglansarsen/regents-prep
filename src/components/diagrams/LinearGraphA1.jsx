// y = 2x − 1 line on a coordinate grid
const W = 320, H = 220
const CX = 60, CY = 110  // origin pixel coords
const SCALE = 28          // pixels per unit

export default function LinearGraphA1() {
  const gx = (x) => CX + x * SCALE
  const gy = (y) => CY - y * SCALE

  // Line endpoints: x from -1.5 to 4
  const x1 = -1.5, x2 = 4
  const y1 = 2 * x1 - 1, y2 = 2 * x2 - 1

  const ticks = [-2, -1, 0, 1, 2, 3, 4]
  const yTicks = [-4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7]

  return (
    <div className="diagram-popgraph">
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        {/* Grid */}
        {ticks.map(t => (
          <line key={`gx${t}`} x1={gx(t)} y1={20} x2={gx(t)} y2={H - 10}
            stroke="#e5e7eb" strokeWidth="0.8" />
        ))}
        {yTicks.map(t => (
          <line key={`gy${t}`} x1={20} y1={gy(t)} x2={W - 20} y2={gy(t)}
            stroke="#e5e7eb" strokeWidth="0.8" />
        ))}

        {/* Axes */}
        <line x1={20} y1={CY} x2={W - 15} y2={CY} stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <line x1={CX} y1={H - 10} x2={CX} y2={15} stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrowUp)" />

        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#374151" />
          </marker>
          <marker id="arrowUp" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#374151" />
          </marker>
        </defs>

        {/* Tick labels x-axis */}
        {ticks.filter(t => t !== 0).map(t => (
          <text key={`tx${t}`} x={gx(t)} y={CY + 14} textAnchor="middle" fontSize="9" fill="#6b7280">{t}</text>
        ))}
        {/* Tick labels y-axis */}
        {[-3, -2, -1, 1, 2, 3, 4, 5].map(t => (
          <text key={`ty${t}`} x={CX - 8} y={gy(t) + 3} textAnchor="end" fontSize="9" fill="#6b7280">{t}</text>
        ))}
        <text x={CX - 8} y={CY + 3} textAnchor="end" fontSize="9" fill="#6b7280">0</text>

        {/* Axis labels */}
        <text x={W - 10} y={CY + 3} textAnchor="end" fontSize="10" fill="#374151" fontStyle="italic">x</text>
        <text x={CX + 5} y={18} textAnchor="start" fontSize="10" fill="#374151" fontStyle="italic">y</text>

        {/* The line y = 2x - 1 */}
        <line x1={gx(x1)} y1={gy(y1)} x2={gx(x2)} y2={gy(y2)}
          stroke="#7c3aed" strokeWidth="2.5" />

        {/* Y-intercept dot at (0, -1) */}
        <circle cx={gx(0)} cy={gy(-1)} r="4" fill="#7c3aed" />
        <text x={gx(0) + 8} y={gy(-1) + 4} fontSize="9" fill="#7c3aed">(0, −1)</text>

        {/* Another point (2, 3) */}
        <circle cx={gx(2)} cy={gy(3)} r="3" fill="#7c3aed" opacity="0.7" />
      </svg>
    </div>
  )
}
