// Box-and-whisker plot: Min=2, Q1=5, Median=8, Q3=12, Max=18  →  IQR = 7
const W = 320, H = 120
const L = 40, R = 290, MID = 60  // MID = vertical midline of box
const DATA_MIN = 0, DATA_MAX = 20

const VALUES = { min: 2, q1: 5, median: 8, q3: 12, max: 18 }

export default function BoxPlotA1() {
  const px = (v) => L + ((v - DATA_MIN) / (DATA_MAX - DATA_MIN)) * (R - L)
  const axisY = MID
  const boxT = axisY - 18, boxB = axisY + 18

  const ticks = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

  return (
    <div className="diagram-popgraph">
      <p className="diagram-title">Box-and-Whisker Plot</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        {/* Axis line */}
        <line x1={L - 5} y1={axisY} x2={R + 5} y2={axisY} stroke="#374151" strokeWidth="1.5" />

        {/* Tick marks and labels */}
        {ticks.map(t => (
          <g key={t}>
            <line x1={px(t)} y1={axisY - 3} x2={px(t)} y2={axisY + 3} stroke="#374151" strokeWidth="1" />
            <text x={px(t)} y={axisY + 14} textAnchor="middle" fontSize="8" fill="#6b7280">{t}</text>
          </g>
        ))}

        {/* Left whisker: min to Q1 */}
        <line x1={px(VALUES.min)} y1={axisY} x2={px(VALUES.q1)} y2={axisY}
          stroke="#374151" strokeWidth="2" />
        <line x1={px(VALUES.min)} y1={boxT + 8} x2={px(VALUES.min)} y2={boxB - 8}
          stroke="#374151" strokeWidth="2" />

        {/* Box: Q1 to Q3 */}
        <rect x={px(VALUES.q1)} y={boxT} width={px(VALUES.q3) - px(VALUES.q1)} height={boxB - boxT}
          fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />

        {/* Median line */}
        <line x1={px(VALUES.median)} y1={boxT} x2={px(VALUES.median)} y2={boxB}
          stroke="#7c3aed" strokeWidth="2.5" />

        {/* Right whisker: Q3 to max */}
        <line x1={px(VALUES.q3)} y1={axisY} x2={px(VALUES.max)} y2={axisY}
          stroke="#374151" strokeWidth="2" />
        <line x1={px(VALUES.max)} y1={boxT + 8} x2={px(VALUES.max)} y2={boxB - 8}
          stroke="#374151" strokeWidth="2" />

        {/* Labels */}
        <text x={px(VALUES.min)} y={boxT - 4} textAnchor="middle" fontSize="8" fill="#374151">Min=2</text>
        <text x={px(VALUES.q1)} y={boxT - 4} textAnchor="middle" fontSize="8" fill="#7c3aed">Q1=5</text>
        <text x={px(VALUES.median)} y={boxT - 4} textAnchor="middle" fontSize="8" fill="#7c3aed">Med=8</text>
        <text x={px(VALUES.q3)} y={boxT - 4} textAnchor="middle" fontSize="8" fill="#7c3aed">Q3=12</text>
        <text x={px(VALUES.max)} y={boxT - 4} textAnchor="middle" fontSize="8" fill="#374151">Max=18</text>
      </svg>
    </div>
  )
}
