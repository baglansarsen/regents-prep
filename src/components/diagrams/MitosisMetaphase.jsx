const CHROMATID_COLORS = ['#a855f7', '#ef4444', '#14b8a6', '#f97316']
const CHROM_YS = [28, 42, 58, 72]

function Chromatid({ cx, cy, color }) {
  return (
    <ellipse
      cx={cx} cy={cy} rx="13" ry="8"
      fill={`${color}b3`} stroke={color} strokeWidth="1.5"
    />
  )
}

export default function MitosisMetaphase() {
  return (
    <div className="diagram-mitosis">
      <p className="diagram-title">Cell in Mitosis</p>
      <svg viewBox="0 0 400 220" className="mitosis-svg">
        {/* Cell outline */}
        <ellipse cx="200" cy="110" rx="175" ry="95"
          fill="#eff6ff" stroke="#3b82f6" strokeWidth="2.5" />

        {/* Metaphase plate (dashed equatorial line) */}
        <line x1="200" y1="20" x2="200" y2="200"
          stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="5,4" />

        {/* Pole labels */}
        <text x="42" y="113" textAnchor="middle" fontSize="10" fill="#6b7280">Pole</text>
        <text x="358" y="113" textAnchor="middle" fontSize="10" fill="#6b7280">Pole</text>

        {/* Spindle fibers + chromosomes */}
        {CHROM_YS.map((cy, i) => {
          const color = CHROMATID_COLORS[i]
          return (
            <g key={i}>
              {/* Spindle fibers from each pole to centromere */}
              <line x1="55" y1="110" x2="200" y2={cy} stroke="#d1d5db" strokeWidth="1" />
              <line x1="345" y1="110" x2="200" y2={cy} stroke="#d1d5db" strokeWidth="1" />
              {/* Left chromatid */}
              <Chromatid cx={188} cy={cy} color={color} />
              {/* Right chromatid */}
              <Chromatid cx={212} cy={cy} color={color} />
              {/* Centromere */}
              <circle cx="200" cy={cy} r="5" fill={color} />
            </g>
          )
        })}

        {/* Caption */}
        <text x="200" y="213" textAnchor="middle" fontSize="9" fill="#6b7280">
          Metaphase — chromosomes aligned at equatorial plate
        </text>
      </svg>
    </div>
  )
}
