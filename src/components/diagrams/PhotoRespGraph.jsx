const W = 400, H = 200
const L = 52, B = 168, R = 375, T = 18
const GW = R - L, GH = B - T

// t = 0..1 representing 0..24 hours
function photosynthesis(t) {
  // Peaks at midday (~t=0.5), zero at night
  const h = t * 24
  if (h < 6 || h > 20) return 0.04
  return 0.04 + 0.9 * Math.sin(Math.PI * (h - 6) / 14)
}

function respiration() { return 0.35 } // roughly constant

function buildLine(fn, steps = 120) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps
    const x = L + t * GW
    const y = B - fn(t) * GH
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
}

// Compensation points: where photosynthesis ≈ respiration (~dawn ~t=0.265, ~dusk ~t=0.735)
function compX(t) { return L + t * GW }
function compY()  { return B - respiration() * GH }

const DAWN_X = compX(0.265)
const DUSK_X = compX(0.735)
const COMP_Y = compY()

// X-axis hour ticks
const HOURS = [0, 6, 12, 18, 24]

export default function PhotoRespGraph() {
  return (
    <div className="diagram-popgraph">
      <p className="diagram-title">Photosynthesis vs. Respiration Over 24 Hours</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        <line x1={L} y1={T} x2={L} y2={B} stroke="currentColor" strokeWidth="2" />
        <line x1={L} y1={B} x2={R} y2={B} stroke="currentColor" strokeWidth="2" />

        {HOURS.map(h => {
          const x = L + (h / 24) * GW
          return <g key={h}>
            <line x1={x} y1={B} x2={x} y2={B + 4} stroke="currentColor" strokeWidth="1" />
            <text x={x} y={B + 13} textAnchor="middle" fontSize="9" fill="#6b7280">{h}h</text>
          </g>
        })}

        <text x={(L + R) / 2} y={H - 1} textAnchor="middle" fontSize="10" fill="#6b7280">Time of Day →</text>
        <text x="10" y={(T + B) / 2} textAnchor="middle" fontSize="10" fill="#6b7280"
          transform={`rotate(-90, 10, ${(T + B) / 2})`}>Gas Exchange Rate</text>

        {/* Respiration — flat dashed line */}
        <polyline points={buildLine(respiration)} fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="6,3" />

        {/* Photosynthesis — bell curve */}
        <polyline points={buildLine(photosynthesis)} fill="none" stroke="#16a34a" strokeWidth="2.5" />

        {/* Compensation points */}
        <circle cx={DAWN_X} cy={COMP_Y} r="5" fill="#f97316" />
        <circle cx={DUSK_X} cy={COMP_Y} r="5" fill="#f97316" />
        <text x={DAWN_X} y={COMP_Y - 8} textAnchor="middle" fontSize="8" fill="#f97316">Comp.</text>
        <text x={DUSK_X} y={COMP_Y - 8} textAnchor="middle" fontSize="8" fill="#f97316">Comp.</text>

        {/* Legend */}
        <polyline points={`${R-90},${T+14} ${R-76},${T+14}`} fill="none" stroke="#16a34a" strokeWidth="2.5" />
        <text x={R - 72} y={T + 18} fontSize="9" fill="#16a34a">Photosynthesis</text>
        <line x1={R-90} y1={T+28} x2={R-76} y2={T+28} stroke="#dc2626" strokeWidth="2" strokeDasharray="5,2" />
        <text x={R - 72} y={T + 32} fontSize="9" fill="#dc2626">Respiration</text>
      </svg>
    </div>
  )
}
