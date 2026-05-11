export default function PunnettSquare({ alleles, title }) {
  const [a1, a2] = alleles.parent1
  const [b1, b2] = alleles.parent2
  const cells = [a1 + b1, a1 + b2, a2 + b1, a2 + b2]

  return (
    <div className="diagram-punnett">
      {title && <p className="diagram-title">{title}</p>}
      <div className="punnett-grid">
        <div className="punnett-cell punnett-header" />
        <div className="punnett-cell punnett-header">{b1}</div>
        <div className="punnett-cell punnett-header">{b2}</div>
        <div className="punnett-cell punnett-header">{a1}</div>
        <div className="punnett-cell">{cells[0]}</div>
        <div className="punnett-cell">{cells[1]}</div>
        <div className="punnett-cell punnett-header">{a2}</div>
        <div className="punnett-cell">{cells[2]}</div>
        <div className="punnett-cell">{cells[3]}</div>
      </div>
    </div>
  )
}
