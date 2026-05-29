// f(x) = 2 sin(2x)  —  amplitude=2, period=π
const W = 340, H = 200
const L = 50, B = 165, R = 320, T = 18
const GW = R - L, GH = B - T

const X_MAX = Math.PI * 2, Y_MAX = 2.5

export default function SineWaveA2() {
  const px = (x) => L + (x / X_MAX) * GW
  const py = (y) => ((T + B) / 2) - (y / Y_MAX) * (GH / 2)

  const pts = []
  for (let i = 0; i <= 200; i++) {
    const x = (i / 200) * X_MAX
    const y = 2 * Math.sin(2 * x)
    pts.push(`${px(x).toFixed(1)},${py(y).toFixed(1)}`)
  }

  const midY = (T + B) / 2
  const piLabels = [
    { v: 0, label: '0' },
    { v: Math.PI / 2, label: 'π/2' },
    { v: Math.PI, label: 'π' },
    { v: 3 * Math.PI / 2, label: '3π/2' },
    { v: 2 * Math.PI, label: '2π' },
  ]

  return (
    <div className="diagram-popgraph">
      <p className="diagram-title">f(x) = 2 sin(2x)</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        {/* Midline */}
        <line x1={L} y1={midY} x2={R} y2={midY} stroke="#374151" strokeWidth="1.5" />
        {/* Y-axis */}
        <line x1={L} y1={T} x2={L} y2={B} stroke="#374151" strokeWidth="1.5" />

        {/* Grid horizontal: y = ±1, ±2 */}
        {[-2, -1, 1, 2].map(y => (
          <line key={y} x1={L} y1={py(y)} x2={R} y2={py(y)}
            stroke="#e5e7eb" strokeWidth="0.8" />
        ))}

        {/* Pi tick marks */}
        {piLabels.map(({ v, label }) => (
          <g key={label}>
            <line x1={px(v)} y1={midY - 3} x2={px(v)} y2={midY + 3} stroke="#374151" strokeWidth="1" />
            <text x={px(v)} y={midY + 14} textAnchor="middle" fontSize="9" fill="#6b7280">{label}</text>
          </g>
        ))}

        {/* Y-axis labels */}
        {[-2, -1, 1, 2].map(y => (
          <text key={y} x={L - 6} y={py(y) + 3} textAnchor="end" fontSize="9" fill="#6b7280">{y}</text>
        ))}
        <text x={L - 6} y={midY + 3} textAnchor="end" fontSize="9" fill="#6b7280">0</text>

        {/* Axis labels */}
        <text x={R + 5} y={midY + 3} fontSize="10" fill="#374151" fontStyle="italic">x</text>
        <text x={L + 4} y={T + 2} fontSize="10" fill="#374151" fontStyle="italic">y</text>

        {/* Sine curve */}
        <polyline points={pts.join(' ')} fill="none" stroke="#7c3aed" strokeWidth="2.5" />

        {/* Period annotation */}
        <line x1={px(0)} y1={T + 6} x2={px(Math.PI)} y2={T + 6}
          stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#arr2)" />
        <line x1={px(Math.PI)} y1={T + 6} x2={px(0)} y2={T + 6}
          stroke="#dc2626" strokeWidth="1.5" />
        <text x={px(Math.PI / 2)} y={T + 3} textAnchor="middle" fontSize="9" fill="#dc2626">period = π</text>

        {/* Amplitude annotation */}
        <line x1={L - 20} y1={py(0)} x2={L - 20} y2={py(2)}
          stroke="#059669" strokeWidth="1.5" />
        <text x={L - 22} y={(py(0) + py(2)) / 2 + 3} textAnchor="end" fontSize="9" fill="#059669">A=2</text>
      </svg>
    </div>
  )
}
