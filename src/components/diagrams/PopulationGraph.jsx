const W = 400, H = 220
const LEFT = 52, BOTTOM = 185, RIGHT = 370, TOP = 20
const GW = RIGHT - LEFT, GH = BOTTOM - TOP
const K_Y = TOP + GH * 0.08   // carrying capacity line

function logistic(t) {
  const r = 8, t0 = 0.4
  return 1 / (1 + Math.exp(-r * (t - t0)))
}

function buildCurvePoints(steps = 80) {
  const pts = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const x = LEFT + t * GW
    const y = BOTTOM - logistic(t) * (BOTTOM - K_Y)
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return pts.join(' ')
}

const CURVE_PTS = buildCurvePoints()
const INFL_X = LEFT + 0.4 * GW
const INFL_Y = BOTTOM - 0.5 * (BOTTOM - K_Y)

export default function PopulationGraph() {
  return (
    <div className="diagram-popgraph">
      <p className="diagram-title">Population Growth Graph</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        {/* Axes */}
        <line x1={LEFT} y1={TOP} x2={LEFT} y2={BOTTOM} stroke="currentColor" strokeWidth="2" />
        <line x1={LEFT} y1={BOTTOM} x2={RIGHT} y2={BOTTOM} stroke="currentColor" strokeWidth="2" />

        {/* Axis labels */}
        <text x={(LEFT + RIGHT) / 2} y={H - 2} textAnchor="middle" fontSize="10" fill="#6b7280">
          Time →
        </text>
        <text
          x="10" y={(TOP + BOTTOM) / 2}
          textAnchor="middle" fontSize="10" fill="#6b7280"
          transform={`rotate(-90, 10, ${(TOP + BOTTOM) / 2})`}
        >
          Population Size
        </text>

        {/* Carrying capacity dashed line */}
        <line x1={LEFT} y1={K_Y} x2={RIGHT} y2={K_Y}
          stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="7,5" />
        <text x={RIGHT + 6} y={K_Y + 4} fontSize="12" fontWeight="bold" fill="#3b82f6">K</text>

        {/* S-curve */}
        <polyline points={CURVE_PTS} fill="none" stroke="#16a34a" strokeWidth="2.5" />

        {/* Inflection point */}
        <circle cx={INFL_X} cy={INFL_Y} r="5" fill="#f97316" />
        <text x={INFL_X + 10} y={INFL_Y - 6} fontSize="9" fill="#f97316">Fastest</text>
        <text x={INFL_X + 10} y={INFL_Y + 6} fontSize="9" fill="#f97316">growth</text>

        {/* Phase labels */}
        <text x={LEFT + GW * 0.22} y={BOTTOM - GH * 0.18} fontSize="9" fill="#16a34a">
          Exponential
        </text>
        <text x={LEFT + GW * 0.22} y={BOTTOM - GH * 0.10} fontSize="9" fill="#16a34a">
          phase
        </text>
        <text x={LEFT + GW * 0.70} y={K_Y + GH * 0.12} fontSize="9" fill="#3b82f6">
          Leveling off
        </text>
      </svg>
    </div>
  )
}
