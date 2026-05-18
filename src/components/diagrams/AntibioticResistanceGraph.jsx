const W = 400, H = 200
const L = 52, B = 168, R = 375, T = 18
const GW = R - L, GH = B - T

const DATA = [
  { year: 1950, pct: 0 },
  { year: 1960, pct: 8 },
  { year: 1970, pct: 18 },
  { year: 1980, pct: 32 },
  { year: 1990, pct: 48 },
  { year: 2000, pct: 62 },
  { year: 2010, pct: 74 },
  { year: 2020, pct: 85 },
]

const BAR_W = GW / DATA.length * 0.6
const SPAN = DATA[DATA.length - 1].year - DATA[0].year

function xFor(year) { return L + ((year - DATA[0].year) / SPAN) * GW }
function yFor(pct)  { return B - (pct / 100) * GH }

// Y-axis ticks
const Y_TICKS = [0, 25, 50, 75, 100]

export default function AntibioticResistanceGraph() {
  return (
    <div className="diagram-popgraph">
      <p className="diagram-title">Antibiotic Resistance in Staphylococcus (1950–2020)</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        <line x1={L} y1={T} x2={L} y2={B} stroke="currentColor" strokeWidth="2" />
        <line x1={L} y1={B} x2={R} y2={B} stroke="currentColor" strokeWidth="2" />

        {Y_TICKS.map(pct => {
          const y = yFor(pct)
          return <g key={pct}>
            <line x1={L - 4} y1={y} x2={L} y2={y} stroke="currentColor" strokeWidth="1" />
            <text x={L - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#6b7280">{pct}%</text>
            <line x1={L} y1={y} x2={R} y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
          </g>
        })}

        {DATA.map(({ year, pct }) => {
          const x = xFor(year)
          const y = yFor(pct)
          const barH = B - y
          const color = pct < 30 ? '#16a34a' : pct < 60 ? '#f97316' : '#dc2626'
          return <g key={year}>
            <rect x={x - BAR_W / 2} y={y} width={BAR_W} height={barH}
              fill={color} fillOpacity="0.75" rx="2" />
            <text x={x} y={B + 13} textAnchor="middle" fontSize="8" fill="#6b7280">{year}</text>
            {pct > 0 && (
              <text x={x} y={y - 3} textAnchor="middle" fontSize="8" fill={color} fontWeight="600">
                {pct}%
              </text>
            )}
          </g>
        })}

        <text x={(L + R) / 2} y={H - 1} textAnchor="middle" fontSize="10" fill="#6b7280">Year →</text>
        <text x="10" y={(T + B) / 2} textAnchor="middle" fontSize="10" fill="#6b7280"
          transform={`rotate(-90, 10, ${(T + B) / 2})`}>% Resistant Strains</text>
      </svg>
    </div>
  )
}
