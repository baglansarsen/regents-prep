export default function Cladogram() {
  const organisms = [
    { name: 'Fish',   y: 12 },
    { name: 'Frog',   y: 30 },
    { name: 'Lizard', y: 50 },
    { name: 'Cat',    y: 68 },
    { name: 'Human',  y: 86 },
  ]

  // ancestor nodes: [x%, y1%, y2%, label]
  const ancestors = [
    { x: 18, y1: 12, y2: 86, label: 'A' },
    { x: 33, y1: 30, y2: 86, label: 'B' },
    { x: 48, y1: 50, y2: 86, label: 'C' },
    { x: 63, y1: 68, y2: 86, label: 'D' },
  ]

  const startX = {
    Fish: 18, Frog: 33, Lizard: 48, Cat: 63, Human: 63,
  }

  return (
    <div className="diagram-cladogram">
      <p className="diagram-title">Evolutionary Cladogram</p>
      <svg viewBox="0 0 400 220" className="cladogram-svg">
        {/* Horizontal lines to each organism */}
        {organisms.map((org) => (
          <line
            key={org.name}
            x1={`${startX[org.name]}%`} y1={`${org.y}%`}
            x2="86%" y2={`${org.y}%`}
            stroke="#6366f1" strokeWidth="2"
          />
        ))}

        {/* Vertical connector lines */}
        {ancestors.map((a, i) => (
          <line
            key={i}
            x1={`${a.x}%`} y1={`${a.y1}%`}
            x2={`${a.x}%`} y2={`${a.y2}%`}
            stroke="#6366f1" strokeWidth="2"
          />
        ))}

        {/* Horizontal stems between ancestors */}
        {ancestors.slice(1).map((a, i) => (
          <line
            key={i}
            x1={`${ancestors[i].x}%`} y1={`${a.y1}%`}
            x2={`${a.x}%`} y2={`${a.y1}%`}
            stroke="#6366f1" strokeWidth="2"
          />
        ))}

        {/* Ancestor node dots */}
        {ancestors.map((a) => (
          <g key={a.label}>
            <circle cx={`${a.x}%`} cy={`${a.y1}%`} r="8" fill="#6366f1" />
            <text
              x={`${a.x}%`} y={`${a.y1}%`}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="9" fill="white" fontWeight="bold"
            >{a.label}</text>
          </g>
        ))}

        {/* Organism labels */}
        {organisms.map((org) => (
          <text
            key={org.name}
            x="88%" y={`${org.y}%`}
            dominantBaseline="middle"
            fontSize="11" fill="currentColor"
          >{org.name}</text>
        ))}

        {/* Legend */}
        <text x="2%" y="96%" fontSize="9" fill="#6b7280">
          D = most recent common ancestor (Cat &amp; Human)
        </text>
      </svg>
    </div>
  )
}
