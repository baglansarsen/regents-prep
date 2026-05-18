const W = 400, H = 200
const L = 52, B = 168, R = 375, T = 18
const GW = R - L, GH = B - T

// DO starts high, drops sharply at discharge, recovers slowly
function doLevel(x) {
  if (x < 0.25) return 0.85 - x * 0.2                       // slight natural decline upstream
  if (x < 0.28) return 0.85 - 0.25 * 0.2 - (x - 0.25) * 10 // sharp drop at discharge
  return 0.1 + (1 - Math.exp(-(x - 0.28) * 4)) * 0.72       // slow recovery
}

function buildCurve(steps = 120) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const x = i / steps
    const px = L + x * GW
    const py = B - Math.max(0, Math.min(1, doLevel(x))) * GH
    return `${px.toFixed(1)},${py.toFixed(1)}`
  }).join(' ')
}

const DISCHARGE_X = L + 0.26 * GW

export default function DOSagCurve() {
  return (
    <div className="diagram-popgraph">
      <p className="diagram-title">Dissolved Oxygen — Sag Curve</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        <line x1={L} y1={T} x2={L} y2={B} stroke="currentColor" strokeWidth="2" />
        <line x1={L} y1={B} x2={R} y2={B} stroke="currentColor" strokeWidth="2" />

        <text x={(L + R) / 2} y={H - 1} textAnchor="middle" fontSize="10" fill="#6b7280">Distance Downstream →</text>
        <text x="10" y={(T + B) / 2} textAnchor="middle" fontSize="10" fill="#6b7280"
          transform={`rotate(-90, 10, ${(T + B) / 2})`}>Dissolved O₂</text>

        {/* Discharge point */}
        <line x1={DISCHARGE_X} y1={T} x2={DISCHARGE_X} y2={B} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5,3" />
        <text x={DISCHARGE_X} y={T + 10} textAnchor="middle" fontSize="8" fill="#dc2626">Sewage</text>
        <text x={DISCHARGE_X} y={T + 20} textAnchor="middle" fontSize="8" fill="#dc2626">input</text>

        <polyline points={buildCurve()} fill="none" stroke="#3b82f6" strokeWidth="2.5" />

        {/* Labels */}
        <text x={L + GW * 0.08} y={T + 28} fontSize="9" fill="#6b7280">Normal</text>
        <text x={L + GW * 0.40} y={B - 8} fontSize="9" fill="#dc2626">Oxygen</text>
        <text x={L + GW * 0.40} y={B - 18} fontSize="9" fill="#dc2626">sag zone</text>
        <text x={L + GW * 0.80} y={T + 50} fontSize="9" fill="#16a34a">Recovery</text>
      </svg>
    </div>
  )
}
