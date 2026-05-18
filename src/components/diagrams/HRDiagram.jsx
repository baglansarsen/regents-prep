const W = 400, H = 260
const L = 52, B = 235, R = 385, T = 15
const GW = R - L, GH = B - T

// Spectral classes (temperature decreases left to right on a true HR diagram,
// but here we display hotter stars on the left for visual clarity)
const SPEC = ['O', 'B', 'A', 'F', 'G', 'K', 'M']
const COLORS = ['#9bb0ff', '#aabfff', '#cad7ff', '#fbf8ff', '#fff4ea', '#ffddb4', '#ffad51']

// Main sequence star positions: [xFraction (0=hot/left, 1=cool/right), yFraction (0=dim/bottom, 1=bright/top)]
const MAIN_SEQ = [
  { x: 0.04, y: 0.97, label: '' },
  { x: 0.10, y: 0.92, label: '' },
  { x: 0.22, y: 0.82, label: '' },
  { x: 0.35, y: 0.70, label: 'Sirius A' },
  { x: 0.50, y: 0.55, label: '☀ Sun (G)', r: 7 },
  { x: 0.64, y: 0.42, label: '' },
  { x: 0.78, y: 0.30, label: '' },
  { x: 0.88, y: 0.20, label: 'Proxima\nCentauri' },
  { x: 0.95, y: 0.12, label: '' },
]

// Giants/supergiants (upper right)
const GIANTS = [
  { x: 0.80, y: 0.78, r: 8,  color: '#ffad51', label: 'Betelgeuse\n(red supergiant)' },
  { x: 0.70, y: 0.70, r: 6,  color: '#ffddb4', label: '' },
  { x: 0.60, y: 0.72, r: 5,  color: '#fff4ea', label: 'Arcturus\n(red giant)' },
]

// White dwarfs (lower left)
const WHITE_DWARFS = [
  { x: 0.18, y: 0.14, r: 4, color: '#cad7ff', label: 'Sirius B\n(white dwarf)' },
  { x: 0.10, y: 0.10, r: 3, color: '#aabfff', label: '' },
]

function px(xFrac) { return L + xFrac * GW }
function py(yFrac) { return B - yFrac * GH }

export default function HRDiagram() {
  return (
    <div className="diagram-popgraph">
      <p className="diagram-title">Hertzsprung-Russell (H-R) Diagram</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        {/* Axes */}
        <line x1={L} y1={T} x2={L} y2={B} stroke="currentColor" strokeWidth="1.5" />
        <line x1={L} y1={B} x2={R} y2={B} stroke="currentColor" strokeWidth="1.5" />

        {/* Background gradient suggestion for spectral classes */}
        {SPEC.map((s, i) => {
          const x0 = px(i / SPEC.length)
          const x1 = px((i + 1) / SPEC.length)
          return (
            <rect key={s} x={x0} y={T} width={x1 - x0} height={GH}
              fill={COLORS[i]} fillOpacity="0.08" />
          )
        })}

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={L} y1={py(f)} x2={R} y2={py(f)}
            stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.5" />
        ))}

        {/* Spectral class labels on x-axis */}
        {SPEC.map((s, i) => (
          <text key={s} x={px((i + 0.5) / SPEC.length)} y={B + 12}
            textAnchor="middle" fontSize="9" fill={COLORS[i]} fontWeight="600">{s}</text>
        ))}

        {/* Axis labels */}
        <text x={(L + R) / 2} y={H - 1} textAnchor="middle" fontSize="9" fill="#6b7280">
          Spectral Class (Temperature) → cooler
        </text>
        <text x="10" y={(T + B) / 2} textAnchor="middle" fontSize="9" fill="#6b7280"
          transform={`rotate(-90, 10, ${(T + B) / 2})`}>Luminosity (Brightness) →</text>

        {/* Zone labels */}
        <text x={px(0.5)} y={py(0.55)} textAnchor="middle" fontSize="8" fill="#6366f1" fontWeight="600" transform={`rotate(-32, ${px(0.5)}, ${py(0.55)})`}>
          MAIN SEQUENCE
        </text>
        <text x={px(0.68)} y={py(0.82)} textAnchor="middle" fontSize="8" fill="#f97316">GIANTS</text>
        <text x={px(0.15)} y={py(0.08)} textAnchor="middle" fontSize="8" fill="#9bb0ff">WHITE DWARFS</text>

        {/* Main sequence stars */}
        {MAIN_SEQ.map((s, i) => (
          <g key={i}>
            <circle cx={px(s.x)} cy={py(s.y)} r={s.r ?? 4}
              fill={COLORS[Math.round(s.x * (COLORS.length - 1))]} stroke="white" strokeWidth="0.5" />
            {s.label && (
              <text x={px(s.x) + (s.x < 0.5 ? 8 : -8)} y={py(s.y) + 4}
                textAnchor={s.x < 0.5 ? 'start' : 'end'} fontSize="7" fill="#374151">
                {s.label}
              </text>
            )}
          </g>
        ))}

        {/* Giants */}
        {GIANTS.map((s, i) => (
          <g key={i}>
            <circle cx={px(s.x)} cy={py(s.y)} r={s.r} fill={s.color} stroke="white" strokeWidth="0.5" />
            {s.label && (
              <text x={px(s.x) - 8} y={py(s.y) - s.r - 3} textAnchor="end" fontSize="7" fill="#374151">
                {s.label.split('\n').map((line, j) => (
                  <tspan key={j} x={px(s.x) - 8} dy={j === 0 ? 0 : 10}>{line}</tspan>
                ))}
              </text>
            )}
          </g>
        ))}

        {/* White dwarfs */}
        {WHITE_DWARFS.map((s, i) => (
          <g key={i}>
            <circle cx={px(s.x)} cy={py(s.y)} r={s.r} fill={s.color} stroke="white" strokeWidth="0.5" />
            {s.label && (
              <text x={px(s.x) + 8} y={py(s.y) + 4} textAnchor="start" fontSize="7" fill="#374151">
                {s.label.split('\n').map((line, j) => (
                  <tspan key={j} x={px(s.x) + 8} dy={j === 0 ? 0 : 10}>{line}</tspan>
                ))}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}
