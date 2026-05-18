const W = 400, H = 200
const L = 52, B = 168, R = 375, T = 18
const GW = R - L, GH = B - T
const TEMPS = [0, 10, 20, 37, 50, 60, 70]

function activity(temp) {
  if (temp <= 37) return Math.exp(-Math.pow(temp - 37, 2) / (2 * 14 * 14))
  return Math.exp(-Math.pow(temp - 37, 2) / (2 * 6 * 6))
}

function buildCurve(steps = 140) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const temp = (i / steps) * 70
    const x = L + (temp / 70) * GW
    const y = B - activity(temp) * GH
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
}

const PEAK_X = L + (37 / 70) * GW
const PEAK_Y = T

export default function EnzymeTempGraph() {
  return (
    <div className="diagram-popgraph">
      <p className="diagram-title">Enzyme Activity vs. Temperature</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        <line x1={L} y1={T} x2={L} y2={B} stroke="currentColor" strokeWidth="2" />
        <line x1={L} y1={B} x2={R} y2={B} stroke="currentColor" strokeWidth="2" />

        {TEMPS.map((t) => {
          const x = L + (t / 70) * GW
          return <g key={t}>
            <line x1={x} y1={B} x2={x} y2={B + 4} stroke="currentColor" strokeWidth="1" />
            <text x={x} y={B + 13} textAnchor="middle" fontSize="9" fill="#6b7280">{t}°</text>
          </g>
        })}

        <text x={(L + R) / 2} y={H - 1} textAnchor="middle" fontSize="10" fill="#6b7280">Temperature (°C) →</text>
        <text x="10" y={(T + B) / 2} textAnchor="middle" fontSize="10" fill="#6b7280"
          transform={`rotate(-90, 10, ${(T + B) / 2})`}>Activity Rate</text>

        <polyline points={buildCurve()} fill="none" stroke="#7c3aed" strokeWidth="2.5" />

        <line x1={PEAK_X} y1={PEAK_Y + 4} x2={PEAK_X} y2={B} stroke="#7c3aed" strokeWidth="1" strokeDasharray="4,3" />
        <text x={PEAK_X} y={PEAK_Y - 2} textAnchor="middle" fontSize="9" fill="#7c3aed">Optimum (37°C)</text>
        <text x={PEAK_X + 55} y={B - 30} fontSize="9" fill="#dc2626">Denatured →</text>
      </svg>
    </div>
  )
}
