// f(x) = 100 · (0.5)^x  —  exponential decay
const W = 320, H = 210
const L = 55, B = 175, R = 295, T = 20
const GW = R - L, GH = B - T
const X_MAX = 5, Y_MAX = 110

export default function ExponentialDecayA2() {
  const px = (x) => L + (x / X_MAX) * GW
  const py = (y) => B - (y / Y_MAX) * GH

  const f = (x) => 100 * Math.pow(0.5, x)

  const pts = []
  for (let i = 0; i <= 100; i++) {
    const x = (i / 100) * X_MAX
    pts.push(`${px(x).toFixed(1)},${py(f(x)).toFixed(1)}`)
  }

  const xTicks = [0, 1, 2, 3, 4, 5]
  const yTicks = [0, 25, 50, 75, 100]

  return (
    <div className="diagram-popgraph">
      <p className="diagram-title">f(x) = 100 · (0.5)ˣ</p>
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
          <text key={`ty${t}`} x={L - 5} y={py(t) + 3} textAnchor="end" fontSize="9" fill="#6b7280">{t}</text>
        ))}

        {/* Axis labels */}
        <text x={(L + R) / 2} y={H - 2} textAnchor="middle" fontSize="9" fill="#6b7280">x</text>
        <text x="10" y={(T + B) / 2} textAnchor="middle" fontSize="9" fill="#6b7280"
          transform={`rotate(-90, 10, ${(T + B) / 2})`}>f(x)</text>

        {/* Curve */}
        <polyline points={pts.join(' ')} fill="none" stroke="#7c3aed" strokeWidth="2.5" />

        {/* Half-life annotation */}
        <line x1={px(1)} y1={py(50)} x2={px(1)} y2={B} stroke="#059669" strokeWidth="1" strokeDasharray="4,3" />
        <line x1={L} y1={py(50)} x2={px(1)} y2={py(50)} stroke="#059669" strokeWidth="1" strokeDasharray="4,3" />
        <circle cx={px(1)} cy={py(50)} r="3.5" fill="#059669" />
        <text x={px(1) + 5} y={py(50) - 4} fontSize="8.5" fill="#059669">(1, 50)</text>

        {/* Starting point */}
        <circle cx={px(0)} cy={py(100)} r="3.5" fill="#dc2626" />
        <text x={px(0) + 6} y={py(100) + 4} fontSize="8.5" fill="#dc2626">(0, 100)</text>

        {/* Arrow showing decrease */}
        <text x={px(3)} y={py(f(3)) - 10} fontSize="9" fill="#374151">decreasing →</text>
      </svg>
    </div>
  )
}
