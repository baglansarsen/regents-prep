// Positive correlation scatter plot
const W = 300, H = 220
const L = 50, B = 185, R = 280, T = 20
const GW = R - L, GH = B - T

const POINTS = [
  [1, 2], [2, 3.5], [1.5, 2.8], [3, 5], [3.5, 5.5],
  [4, 6.5], [2.5, 4.2], [5, 7.8], [4.5, 7], [6, 8.5],
  [5.5, 8], [6.5, 9], [3.8, 6.1], [2.8, 4.8], [7, 10],
]
const X_MAX = 8, Y_MAX = 11

export default function ScatterPlotA1() {
  const px = (x) => L + (x / X_MAX) * GW
  const py = (y) => B - (y / Y_MAX) * GH

  // Best-fit line: roughly y = 1.3x + 0.8
  const lx1 = 0.5, lx2 = 7.5
  const ly1 = 1.3 * lx1 + 0.8, ly2 = 1.3 * lx2 + 0.8

  const xTicks = [0, 2, 4, 6, 8]
  const yTicks = [0, 2, 4, 6, 8, 10]

  return (
    <div className="diagram-popgraph">
      <p className="diagram-title">Study Hours vs. Quiz Score</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        {/* Grid */}
        {xTicks.map(t => (
          <line key={`gx${t}`} x1={px(t)} y1={T} x2={px(t)} y2={B}
            stroke="#e5e7eb" strokeWidth="0.8" />
        ))}
        {yTicks.map(t => (
          <line key={`gy${t}`} x1={L} y1={py(t)} x2={R} y2={py(t)}
            stroke="#e5e7eb" strokeWidth="0.8" />
        ))}

        {/* Axes */}
        <line x1={L} y1={T} x2={L} y2={B} stroke="#374151" strokeWidth="1.5" />
        <line x1={L} y1={B} x2={R} y2={B} stroke="#374151" strokeWidth="1.5" />

        {/* Tick labels */}
        {xTicks.map(t => (
          <text key={`tx${t}`} x={px(t)} y={B + 13} textAnchor="middle" fontSize="9" fill="#6b7280">{t}</text>
        ))}
        {yTicks.map(t => (
          <text key={`ty${t}`} x={L - 6} y={py(t) + 3} textAnchor="end" fontSize="9" fill="#6b7280">{t}</text>
        ))}

        {/* Axis labels */}
        <text x={(L + R) / 2} y={H - 2} textAnchor="middle" fontSize="9" fill="#6b7280">Hours Studied</text>
        <text x="10" y={(T + B) / 2} textAnchor="middle" fontSize="9" fill="#6b7280"
          transform={`rotate(-90, 10, ${(T + B) / 2})`}>Score</text>

        {/* Best-fit line */}
        <line x1={px(lx1)} y1={py(ly1)} x2={px(lx2)} y2={py(ly2)}
          stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.7" />

        {/* Data points */}
        {POINTS.map(([x, y], i) => (
          <circle key={i} cx={px(x)} cy={py(y)} r="4" fill="#7c3aed" opacity="0.8" />
        ))}
      </svg>
    </div>
  )
}
