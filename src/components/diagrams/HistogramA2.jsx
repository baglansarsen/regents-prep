// Frequency histogram — scores grouped in intervals of 10
const W = 320, H = 210
const L = 50, B = 175, R = 295, T = 20
const GW = R - L, GH = B - T

// Intervals: [50,60), [60,70), [70,80), [80,90), [90,100]
const BARS = [
  { label: '50–60', freq: 3 },
  { label: '60–70', freq: 7 },
  { label: '70–80', freq: 12 },
  { label: '80–90', freq: 8 },
  { label: '90–100', freq: 4 },
]
const N = BARS.length
const MAX_FREQ = 14

export default function HistogramA2() {
  const barW = GW / N - 2
  const py = (f) => B - (f / MAX_FREQ) * GH
  const freqTicks = [0, 2, 4, 6, 8, 10, 12, 14]

  return (
    <div className="diagram-popgraph">
      <p className="diagram-title">Test Score Distribution (n = 34)</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        {/* Y-axis grid */}
        {freqTicks.map(f => (
          <line key={f} x1={L} y1={py(f)} x2={R} y2={py(f)} stroke="#e5e7eb" strokeWidth="0.8" />
        ))}

        {/* Axes */}
        <line x1={L} y1={T} x2={L} y2={B} stroke="#374151" strokeWidth="1.5" />
        <line x1={L} y1={B} x2={R} y2={B} stroke="#374151" strokeWidth="1.5" />

        {/* Y-axis labels */}
        {freqTicks.map(f => (
          <text key={f} x={L - 5} y={py(f) + 3} textAnchor="end" fontSize="9" fill="#6b7280">{f}</text>
        ))}
        <text x="12" y={(T + B) / 2} textAnchor="middle" fontSize="9" fill="#6b7280"
          transform={`rotate(-90, 12, ${(T + B) / 2})`}>Frequency</text>

        {/* Bars */}
        {BARS.map(({ label, freq }, i) => {
          const bx = L + i * (GW / N) + 1
          return (
            <g key={label}>
              <rect x={bx} y={py(freq)} width={barW} height={B - py(freq)}
                fill="#7c3aed" opacity="0.75" />
              <rect x={bx} y={py(freq)} width={barW} height={B - py(freq)}
                fill="none" stroke="#5b21b6" strokeWidth="1" />
              <text x={bx + barW / 2} y={B + 13} textAnchor="middle" fontSize="8" fill="#6b7280">
                {label}
              </text>
              <text x={bx + barW / 2} y={py(freq) - 3} textAnchor="middle" fontSize="9" fill="#374151">
                {freq}
              </text>
            </g>
          )
        })}

        {/* X-axis label */}
        <text x={(L + R) / 2} y={H - 2} textAnchor="middle" fontSize="9" fill="#6b7280">Score</text>
      </svg>
    </div>
  )
}
