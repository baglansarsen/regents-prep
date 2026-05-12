const TABS = [
  { id: 'study',    label: 'Study',    icon: '📚' },
  { id: 'cards',    label: 'Cards',    icon: '🃏' },
  { id: 'progress', label: 'Progress', icon: '📊' },
  { id: 'rankings', label: 'Rankings', icon: '🏆' },
  { id: 'profile',  label: 'Profile',  icon: '👤' },
]

export default function TabBar({ active, onChange }) {
  return (
    <nav className="tab-bar">
      {TABS.map((t) => (
        <button
          key={t.id}
          className={`tab-bar-item ${active === t.id ? 'tab-bar-item--active' : ''}`}
          onClick={() => onChange(t.id)}
        >
          <span className="tab-bar-icon">{t.icon}</span>
          <span className="tab-bar-label">{t.label}</span>
        </button>
      ))}
    </nav>
  )
}
