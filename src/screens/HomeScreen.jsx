import { TOPICS, TOPIC_ICONS, questions } from '../data/questions'

export default function HomeScreen({ onStart }) {
  const allTopics = Object.values(TOPICS)

  return (
    <div className="home-screen">
      <header className="home-header">
        <h1 className="app-title">Living Environment</h1>
        <p className="app-subtitle">Regents Prep</p>
        <p className="app-tagline">Master every topic. Beat the clock. Ace the exam.</p>
      </header>

      <section className="topic-grid-section">
        <button className="topic-card topic-card--all" onClick={() => onStart(null)}>
          <span className="topic-icon">⚡</span>
          <span className="topic-name">All Topics</span>
          <span className="topic-count">{questions.length} questions</span>
        </button>

        {allTopics.map((topic) => {
          const count = questions.filter((q) => q.topic === topic).length
          return (
            <button
              key={topic}
              className="topic-card"
              onClick={() => onStart(topic)}
            >
              <span className="topic-icon">{TOPIC_ICONS[topic]}</span>
              <span className="topic-name">{topic}</span>
              <span className="topic-count">{count} questions</span>
            </button>
          )
        })}
      </section>
    </div>
  )
}
