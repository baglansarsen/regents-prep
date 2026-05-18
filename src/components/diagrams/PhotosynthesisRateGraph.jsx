const W = 400, H = 200
const L = 52, B = 168, R = 375, T = 18
const GW = R - L, GH = B - T

// Rate rises steeply at low light then plateaus — same Michaelis-Menten shape
function rate(x) { return x / (0.2 + x) }

function buildCurve(steps = 120) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const x = (i / steps) * 1.2
    const px = L + (x / 1.2) * GW
    const py = B - rate(x) * GH
    return `${px.toFixed(1)},${py.toFixed(1)}`
  }).join(' ')
}

const PLATEAU_Y = T + 4
const PLATEAU_X = L + GW * 0.55

export default function PhotosynthesisRateGraph() {
  return (
    <div className="diagram-popgraph">
      <p className="diagram-title">Rate of Photosynthesis vs. Light Intensity</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        <line x1={L} y1={T} x2={L} y2={B} stroke="currentColor" strokeWidth="2" />
        <line x1={L} y1={B} x2={R} y2={B} stroke="currentColor" strokeWidth="2" />

        <text x={(L + R) / 2} y={H - 1} textAnchor="middle" fontSize="10" fill="#6b7280">Light Intensity →</text>
        <text x="10" y={(T + B) / 2} textAnchor="middle" fontSize="10" fill="#6b7280"
          transform={`rotate(-90, 10, ${(T + B) / 2})`}>O₂ Produced</text>

        {/* Max rate dashed line */}
        <line x1={L} y1={PLATEAU_Y} x2={R} y2={PLATEAU_Y} stroke="#16a34a" strokeWidth="1.5" strokeDasharray="6,4" />
        <text x={R + 4} y={PLATEAU_Y + 4} fontSize="9" fill="#16a34a">Max</text>

        <polyline points={buildCurve()} fill="none" stroke="#16a34a" strokeWidth="2.5" />

        <text x={PLATEAU_X} y={T + 22} fontSize="9" fill="#6b7280" textAnchor="middle">Limiting factor</text>
        <text x={PLATEAU_X} y={T + 33} fontSize="9" fill="#6b7280" textAnchor="middle">(not light)</text>
      </svg>
    </div>
  )
}
