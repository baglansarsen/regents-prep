const W = 400, H = 200
const L = 52, B = 168, R = 375, T = 18
const GW = R - L, GH = B - T

// Normal distribution helper
function normal(x, mean, sd) {
  return Math.exp(-0.5 * Math.pow((x - mean) / sd, 2))
}

const MIN_MM = 4, MAX_MM = 16

function buildCurve(mean, steps = 120) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const mm = MIN_MM + (i / steps) * (MAX_MM - MIN_MM)
    const x = L + (i / steps) * GW
    const y = B - normal(mm, mean, 1.4) * GH * 0.85
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
}

function xForMm(mm) { return L + ((mm - MIN_MM) / (MAX_MM - MIN_MM)) * GW }

export default function BeakDepthGraph() {
  const ticks = [4, 6, 8, 10, 11, 12, 14, 16]
  return (
    <div className="diagram-popgraph">
      <p className="diagram-title">Beak Depth Distribution — Before &amp; After Drought</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        <line x1={L} y1={T} x2={L} y2={B} stroke="currentColor" strokeWidth="2" />
        <line x1={L} y1={B} x2={R} y2={B} stroke="currentColor" strokeWidth="2" />

        <text x={(L + R) / 2} y={H - 1} textAnchor="middle" fontSize="10" fill="#6b7280">Beak Depth (mm) →</text>
        <text x="10" y={(T + B) / 2} textAnchor="middle" fontSize="10" fill="#6b7280"
          transform={`rotate(-90, 10, ${(T + B) / 2})`}>Frequency</text>

        {ticks.map(mm => (
          <g key={mm}>
            <line x1={xForMm(mm)} y1={B} x2={xForMm(mm)} y2={B + 4} stroke="currentColor" strokeWidth="1" />
            <text x={xForMm(mm)} y={B + 13} textAnchor="middle" fontSize="9" fill="#6b7280">{mm}</text>
          </g>
        ))}

        {/* Before drought — peak at 8 mm */}
        <polyline points={buildCurve(8)} fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6,3" />
        {/* After drought — peak at 11 mm */}
        <polyline points={buildCurve(11)} fill="none" stroke="#dc2626" strokeWidth="2.5" />

        {/* Arrow showing shift */}
        <line x1={xForMm(8.3)} y1={T + 40} x2={xForMm(10.7)} y2={T + 40}
          stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#6b7280" />
          </marker>
        </defs>
        <text x={xForMm(9.5)} y={T + 34} textAnchor="middle" fontSize="8" fill="#6b7280">shift</text>

        {/* Legend */}
        <line x1={R - 90} y1={T + 14} x2={R - 76} y2={T + 14} stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,2" />
        <text x={R - 72} y={T + 18} fontSize="9" fill="#3b82f6">Before (8 mm)</text>
        <line x1={R - 90} y1={T + 28} x2={R - 76} y2={T + 28} stroke="#dc2626" strokeWidth="2.5" />
        <text x={R - 72} y={T + 32} fontSize="9" fill="#dc2626">After (11 mm)</text>
      </svg>
    </div>
  )
}
