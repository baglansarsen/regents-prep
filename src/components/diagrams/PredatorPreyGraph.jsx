const W = 400, H = 200
const L = 52, B = 170, R = 375, T = 18
const GW = R - L, GH = B - T

function prey(t)     { return 0.5 + 0.35 * Math.sin(2 * Math.PI * t * 2) }
function predator(t) { return 0.5 + 0.25 * Math.sin(2 * Math.PI * t * 2 - 0.75) }

function buildLine(fn, steps = 120) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps
    return `${(L + t * GW).toFixed(1)},${(B - fn(t) * GH).toFixed(1)}`
  }).join(' ')
}

export default function PredatorPreyGraph() {
  return (
    <div className="diagram-popgraph">
      <p className="diagram-title">Predator–Prey Population Cycle</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        <line x1={L} y1={T} x2={L} y2={B} stroke="currentColor" strokeWidth="2" />
        <line x1={L} y1={B} x2={R} y2={B} stroke="currentColor" strokeWidth="2" />

        <text x={(L + R) / 2} y={H - 2} textAnchor="middle" fontSize="10" fill="#6b7280">Time (years) →</text>
        <text x="10" y={(T + B) / 2} textAnchor="middle" fontSize="10" fill="#6b7280"
          transform={`rotate(-90, 10, ${(T + B) / 2})`}>Population Size</text>

        <polyline points={buildLine(prey)} fill="none" stroke="#16a34a" strokeWidth="2.5" />
        <polyline points={buildLine(predator)} fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="6,3" />

        <circle cx={R - 10} cy={T + 14} r="5" fill="none" stroke="#16a34a" strokeWidth="2" />
        <text x={R - 2} y={T + 18} fontSize="9" fill="#16a34a">Prey</text>
        <line x1={R - 15} y1={T + 30} x2={R - 5} y2={T + 30} stroke="#dc2626" strokeWidth="2" strokeDasharray="4,2" />
        <text x={R - 2} y={T + 34} fontSize="9" fill="#dc2626">Predator</text>
      </svg>
    </div>
  )
}
