const LEVELS = [
  { label: 'Tertiary Consumers', color: '#dc2626' },
  { label: 'Secondary Consumers', color: '#f97316' },
  { label: 'Primary Consumers', color: '#eab308' },
  { label: 'Producers', color: '#16a34a' },
]

export default function EnergyPyramid({ base = 10000 }) {
  const values = [base / 1000, base / 100, base / 10, base]
  const W = 380, H = 200
  const cx = W / 2
  const topW = 40, bottomW = 300
  const levelH = (H - 20) / 4

  return (
    <div className="diagram-popgraph">
      <p className="diagram-title">Energy Pyramid (10% Rule)</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="popgraph-svg">
        {LEVELS.map((lvl, i) => {
          const row = i          // 0 = top (tertiary), 3 = bottom (producers)
          const y = 10 + row * levelH
          const halfW = topW / 2 + (bottomW - topW) / 2 * ((row + 1) / 4)
          const halfWprev = topW / 2 + (bottomW - topW) / 2 * (row / 4)
          const pts = [
            `${cx - halfWprev},${y}`,
            `${cx + halfWprev},${y}`,
            `${cx + halfW},${y + levelH}`,
            `${cx - halfW},${y + levelH}`,
          ].join(' ')

          return (
            <g key={lvl.label}>
              <polygon points={pts} fill={lvl.color} fillOpacity="0.15" stroke={lvl.color} strokeWidth="1.5" />
              <text x={cx} y={y + levelH / 2 - 4} textAnchor="middle" fontSize="9" fill={lvl.color} fontWeight="600">
                {lvl.label}
              </text>
              <text x={cx} y={y + levelH / 2 + 8} textAnchor="middle" fontSize="10" fill={lvl.color} fontWeight="700">
                {values[i].toLocaleString()} kcal
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
