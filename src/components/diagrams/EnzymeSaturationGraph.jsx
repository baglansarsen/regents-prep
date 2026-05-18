const W = 400, H = 200
const L = 52, B = 168, R = 375, T = 18
const GW = R - L, GH = B - T
const Km = 0.25  // substrate concentration at half-max rate (as fraction of axis)

function rate(s) { return s / (Km + s) }  // Michaelis-Menten, Vmax = 1

function buildCurve(steps = 120) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const s = (i / steps) * 1.2
    const x = L + (s / 1.2) * GW
    const y = B - rate(s) * GH
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
}

const VMAX_Y = T + 4
const SAT_X  = L + GW * 0.65

export default function EnzymeSaturationGraph() {
  return (
    <div className="diagram-popgraph">
      <p className="diagram-title">Enzyme Activity vs. Substrate Concentration</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        <line x1={L} y1={T} x2={L} y2={B} stroke="currentColor" strokeWidth="2" />
        <line x1={L} y1={B} x2={R} y2={B} stroke="currentColor" strokeWidth="2" />

        <text x={(L + R) / 2} y={H - 1} textAnchor="middle" fontSize="10" fill="#6b7280">[Substrate] →</text>
        <text x="10" y={(T + B) / 2} textAnchor="middle" fontSize="10" fill="#6b7280"
          transform={`rotate(-90, 10, ${(T + B) / 2})`}>Reaction Rate</text>

        {/* Vmax dashed line */}
        <line x1={L} y1={VMAX_Y} x2={R} y2={VMAX_Y} stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="6,4" />
        <text x={R + 4} y={VMAX_Y + 4} fontSize="10" fontWeight="bold" fill="#3b82f6">Vmax</text>

        <polyline points={buildCurve()} fill="none" stroke="#7c3aed" strokeWidth="2.5" />

        {/* Saturation annotation */}
        <text x={SAT_X} y={T + 22} fontSize="9" fill="#6b7280" textAnchor="middle">All active sites</text>
        <text x={SAT_X} y={T + 33} fontSize="9" fill="#6b7280" textAnchor="middle">occupied (plateau)</text>
      </svg>
    </div>
  )
}
