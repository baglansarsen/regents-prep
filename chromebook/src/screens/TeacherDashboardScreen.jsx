import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { SUBJECT_META } from '@content/subjects'
import { REGENTS_EXAMS } from '@content/regents-exams/index'
import { NYS_STANDARDS, getNYSStandard } from '../data/nysStandards'

// ── Helpers ──────────────────────────────────────────────────────────────────
function AccuracyBar({ pct, color, height = 8 }) {
  const safePct = isNaN(pct) || pct == null ? 0 : Math.min(Math.max(pct, 0), 100)
  return (
    <div style={{ height, backgroundColor: 'var(--surface-3)', borderRadius: height / 2, overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${safePct}%`, backgroundColor: color,
        borderRadius: height / 2, transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }} />
    </div>
  )
}

function StatusPill({ label, color, bg }) {
  return (
    <span style={{
      fontSize: '10px', fontWeight: 900, padding: '3px 10px', borderRadius: '999px',
      backgroundColor: bg, color, border: `1.5px solid ${color}`,
      textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap'
    }}>
      {label}
    </span>
  )
}

function tabBtnStyle(active) {
  return {
    padding: '10px 18px', fontSize: '13px', borderRadius: '12px',
    border: active ? '2px solid var(--purple-dark)' : '2px solid var(--border)',
    background: active ? 'var(--purple-bg)' : 'var(--surface)',
    color: active ? 'var(--purple-dark)' : 'var(--text-muted)',
    fontWeight: 900, cursor: 'pointer', transition: 'all 0.15s',
    fontFamily: 'var(--font-nunito)', textTransform: 'uppercase', letterSpacing: '0.5px',
  }
}

/** Format an exam object { title, month, year } → human-readable display name */
function examLabel(ex) {
  if (!ex) return ''
  if (ex.label) return ex.label
  if (ex.title) return ex.title
  const month = ex.month || ''
  const year = ex.year || ''
  return [month, year].filter(Boolean).join(' ')
}

/** #9 — "Last Active" label from a list of history items with .timestamp fields */
function lastActiveLabel(history) {
  if (!history || history.length === 0) return 'Never'
  const timestamps = history
    .map(h => h.timestamp ? new Date(h.timestamp).getTime() : 0)
    .filter(t => t > 0)
  if (timestamps.length === 0) return 'Unknown'
  const latest   = new Date(Math.max(...timestamps))
  const now      = new Date()
  const diffMs   = now - latest
  const diffMins = Math.floor(diffMs / 60000)
  const diffHrs  = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffMins < 2)   return 'Just now'
  if (diffMins < 60)  return `${diffMins}m ago`
  if (diffHrs  < 24)  return `${diffHrs}h ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7)   return `${diffDays} days ago`
  if (diffDays < 30)  return `${Math.floor(diffDays / 7)}w ago`
  return `${Math.floor(diffDays / 30)}mo ago`
}

// ── Urgency & countdown helpers ──────────────────────────────────────────────
function assignUrgency(dueDate) {
  if (!dueDate) return 'normal'
  const now = new Date()
  const due = new Date(dueDate)
  const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24))
  if (diffDays < 0) return 'overdue'
  if (diffDays <= 2) return 'due-soon'
  return 'normal'
}

/** Returns human-readable countdown: "3 days left", "Overdue by 2 days", "Due today" */
function dueDateCountdown(dueDate) {
  if (!dueDate) return ''
  const now = new Date()
  const due = new Date(dueDate)
  if (isNaN(due.getTime())) return ''
  const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24))
  if (diffDays === 0)  return 'Due today'
  if (diffDays === 1)  return '1 day left'
  if (diffDays > 1)   return `${diffDays} days left`
  // negative — overdue
  const overdueDays = Math.abs(diffDays)
  return overdueDays === 1 ? 'Overdue by 1 day' : `Overdue by ${overdueDays} days`
}

const URGENCY_STYLE = {
  overdue:    { border: '2px solid var(--wrong)',     bg: 'var(--wrong-bg)',  badge: '🔴 Overdue',  badgeColor: 'var(--wrong-dark)'  },
  'due-soon': { border: '2px solid var(--warn)',      bg: 'var(--warn-bg)',   badge: '⏰ Due Soon',  badgeColor: 'var(--warn-dark)'   },
  normal:     { border: '1.5px solid var(--border)', bg: 'var(--surface-2)', badge: null,           badgeColor: ''                   },
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function TeacherDashboardScreen({
  subject,
  school,
  user,
  classroomHook,
  subjectData = {}
}) {
  const {
    classrooms, roster, assignments, loading,
    createClassroom, publishAnnouncement, createAssignment,
    deleteAssignment, fetchClassroomRoster
  } = classroomHook

  const [activeTab, setActiveTab]           = useState('roster')
  const [activeClassCode, setActiveClassCode] = useState('')
  const [newClassName, setNewClassName]     = useState('')
  const [announcementText, setAnnouncementText] = useState('')
  const [announcementMsg, setAnnouncementMsg]   = useState('')

  // ── #2 Class Code Share Sheet state ──────────────────────────────────────
  const [showShareSheet, setShowShareSheet] = useState(false)
  const [codeCopied, setCodeCopied]         = useState(false)

  // ── Assignment form ────────────────────────────────────────────────────────
  const [assignTitle, setAssignTitle]   = useState('')
  const [assignType, setAssignType]     = useState('lesson')
  const [assignTarget, setAssignTarget] = useState('')
  const [assignDueDate, setAssignDueDate] = useState('')
  const [assignSuccess, setAssignSuccess] = useState('')
  const [deletingId, setDeletingId]     = useState(null)

  // ── Standards Matrix state ─────────────────────────────────────────────────
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [matrixFilter, setMatrixFilter]   = useState('all')
  const [matrixSort, setMatrixSort]       = useState('topic') // 'topic' | 'worst' | 'best'

  // ── #6 Student Detail Modal state ─────────────────────────────────────────
  const [selectedStudent, setSelectedStudent] = useState(null) // full student object

  // ── Derived ───────────────────────────────────────────────────────────────
  const activeClass = classrooms.find(c => c.classCode === activeClassCode) || classrooms[0]
  const meta        = SUBJECT_META[subject] || { name: 'Living Environment', icon: '🔬', color: '#16a34a', shortName: 'LE' }
  const topics      = subjectData.TOPIC_ORDER || []

  // ── #3 Real exam list from shared REGENTS_EXAMS ───────────────────────────
  const realExams = useMemo(() => {
    const pool = REGENTS_EXAMS[subject] || []
    return pool.map(ex => ({
      id: ex.id || `${subject}-${ex.month}-${ex.year}`,
      name: examLabel(ex) || ex.id || 'Regents Exam',
      raw: ex,
    }))
  }, [subject])

  // ── Sync active class ──────────────────────────────────────────────────────
  useEffect(() => {
    if (classrooms.length > 0 && !activeClassCode) setActiveClassCode(classrooms[0].classCode)
  }, [classrooms, activeClassCode])

  useEffect(() => {
    if (activeClassCode) fetchClassroomRoster(activeClassCode)
  }, [activeClassCode, fetchClassroomRoster])

  useEffect(() => {
    if (activeClass) setAnnouncementText(activeClass.announcement || '')
  }, [activeClass])

  useEffect(() => {
    if (assignType === 'lesson') {
      setAssignTarget(topics[0] || '')
    } else {
      setAssignTarget(realExams[0]?.id || '')
    }
  }, [assignType, topics, realExams])

  // ── NYS Standards Matrix computation ──────────────────────────────────────
  const standardsMatrix = useMemo(() => {
    const topicMap = {}

    if (roster && roster.length > 0) {
      roster.forEach(student => {
        const history = student.history || []
        history.forEach(item => {
          const rawTopic = item.topic || 'General'
          const matchedTopic = topics.find(t =>
            t === rawTopic || rawTopic.includes(t) || t.includes(rawTopic.split(' ')[0])
          ) || rawTopic

          if (!topicMap[matchedTopic]) topicMap[matchedTopic] = { totalCorrect: 0, totalAttempts: 0, students: [] }

          const correct = item.correct ?? 0
          const total   = item.total ?? 0
          topicMap[matchedTopic].totalCorrect  += correct
          topicMap[matchedTopic].totalAttempts += total

          const existing = topicMap[matchedTopic].students.find(s => s.uid === student.uid)
          if (existing) {
            existing.correct += correct
            existing.total   += total
            existing.pct = existing.total > 0 ? Math.round((existing.correct / existing.total) * 100) : 0
          } else {
            topicMap[matchedTopic].students.push({
              uid: student.uid, name: student.displayName,
              correct, total, pct: total > 0 ? Math.round((correct / total) * 100) : 0,
              streak: student.streak || 0, xp: student.xp || 0,
            })
          }
        })
      })
    }

    const topicSource = Object.keys(topicMap).length > 0 ? Object.keys(topicMap) : topics
    const seeds = [72, 58, 84, 61, 91, 47, 78, 55, 66, 88]

    return topicSource.map((topicName, idx) => {
      const stats = topicMap[topicName] || { totalCorrect: 0, totalAttempts: 0, students: [] }
      const nys   = getNYSStandard(subject, topicName)
      const isDemo = stats.totalAttempts === 0
      const accuracy = isDemo ? seeds[idx % seeds.length]
        : Math.round((stats.totalCorrect / stats.totalAttempts) * 100)

      let statusKey, statusLabel, statusColor, statusBg
      if      (accuracy < 65) { statusKey = 'critical';     statusLabel = 'Critically Weak'; statusColor = 'var(--wrong-dark)';   statusBg = 'var(--wrong-bg)'  }
      else if (accuracy < 80) { statusKey = 'struggling';   statusLabel = 'Needs Review';    statusColor = 'var(--warn-dark)';    statusBg = 'var(--warn-bg)'   }
      else if (accuracy < 92) { statusKey = 'satisfactory'; statusLabel = 'Satisfactory';    statusColor = 'var(--blue-dark)';    statusBg = 'var(--blue-bg)'   }
      else                    { statusKey = 'mastered';     statusLabel = 'Mastered';         statusColor = 'var(--correct-dark)'; statusBg = 'var(--correct-bg)'}

      const barColor = statusKey === 'critical' ? 'var(--wrong)' : statusKey === 'struggling' ? 'var(--warn)' : statusKey === 'mastered' ? 'var(--correct)' : 'var(--blue)'

      return {
        topic: topicName, nys, accuracy, isDemo, barColor,
        totalCorrect: stats.totalCorrect, totalAttempts: stats.totalAttempts,
        studentCount: stats.students.length,
        students: stats.students.sort((a, b) => a.pct - b.pct),
        statusKey, statusLabel, statusColor, statusBg,
      }
    })
  }, [roster, subject, topics])

  const classStats = useMemo(() => {
    if (!standardsMatrix.length) return null
    const withData     = standardsMatrix.filter(t => t.totalAttempts > 0)
    const overallAvg   = withData.length > 0 ? Math.round(withData.reduce((s, t) => s + t.accuracy, 0) / withData.length) : null
    const criticalCount    = standardsMatrix.filter(t => t.statusKey === 'critical').length
    const masteredCount    = standardsMatrix.filter(t => t.statusKey === 'mastered').length
    const strugglingCount  = standardsMatrix.filter(t => t.statusKey === 'struggling').length
    return { overallAvg, criticalCount, masteredCount, strugglingCount }
  }, [standardsMatrix])

  // ── #7 Sorted + filtered matrix ───────────────────────────────────────────
  const filteredMatrix = useMemo(() => {
    const base = matrixFilter === 'all' ? standardsMatrix : standardsMatrix.filter(t => t.statusKey === matrixFilter)
    if (matrixSort === 'worst') return [...base].sort((a, b) => a.accuracy - b.accuracy)
    if (matrixSort === 'best')  return [...base].sort((a, b) => b.accuracy - a.accuracy)
    return base // 'topic' = curriculum order
  }, [standardsMatrix, matrixFilter, matrixSort])

  // ── #6 Build full cross-topic profile for a selected student ─────────────
  const studentTopicProfile = useMemo(() => {
    if (!selectedStudent) return []
    return standardsMatrix.map(item => {
      const found = item.students.find(s => s.uid === selectedStudent.uid)
      return {
        topic:   item.topic,
        nys:     item.nys,
        pct:     found ? found.pct    : null,
        correct: found ? found.correct : 0,
        total:   found ? found.total   : 0,
        barColor: item.barColor,
        statusKey: item.statusKey,
      }
    })
  }, [selectedStudent, standardsMatrix])

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleCreateClass = async (e) => {
    e.preventDefault()
    if (!newClassName.trim()) return
    const result = await createClassroom(newClassName.trim(), subject)
    if (result) {
      setNewClassName('')
      setActiveClassCode(result.classCode)
    }
  }

  const handlePublishAnn = async (e) => {
    e.preventDefault()
    if (!activeClassCode) return
    const ok = await publishAnnouncement(activeClassCode, announcementText.trim())
    if (ok) { setAnnouncementMsg('Broadcast sent!'); setTimeout(() => setAnnouncementMsg(''), 4000) }
  }

  const handleCreateAssignment = async (e) => {
    e.preventDefault()
    if (!activeClassCode || !assignTitle.trim() || !assignTarget) return
    const dueDate = assignDueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
    const result  = await createAssignment(activeClassCode, assignTitle.trim(), assignType, assignTarget, dueDate)
    if (result) {
      setAssignTitle('')
      setAssignDueDate('')
      setAssignSuccess('Assignment issued to class! 📋')
      setTimeout(() => setAssignSuccess(''), 4000)
    }
  }

  const handleDeleteAssignment = useCallback(async (assignId) => {
    if (!confirm('Remove this assignment from the class?')) return
    setDeletingId(assignId)
    await deleteAssignment(assignId, activeClassCode)
    setDeletingId(null)
  }, [deleteAssignment, activeClassCode])

  const handleCopyCode = useCallback(() => {
    if (!activeClass) return
    navigator.clipboard.writeText(activeClass.classCode).then(() => {
      setCodeCopied(true)
      setTimeout(() => setCodeCopied(false), 3000)
    })
  }, [activeClass])

  const handleAssignRemediation = useCallback(async (topicName) => {
    if (!activeClassCode) return
    const dueDate = new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0]
    const result = await createAssignment(activeClassCode, `Re-teach: ${topicName}`, 'lesson', topicName, dueDate)
    if (result) alert(`Remediation drill assigned for "${topicName}"`)
  }, [activeClassCode, createAssignment])

  // ── #8 Export Standards Matrix to CSV ────────────────────────────────────
  const handleExportCSV = useCallback(() => {
    if (!standardsMatrix.length) return
    const className  = activeClass?.className  || 'Class'
    const subjectName = meta?.name             || subject
    const today      = new Date().toISOString().split('T')[0]

    // Build header row: Topic, NYS Code, Class Accuracy, then one column per student
    const studentNames = roster.map(s => `"${s.displayName}"`)
    const header = ['Topic', 'NYS Code', 'Standard', 'Class Accuracy %', ...studentNames].join(',')

    // Build one row per topic
    const rows = standardsMatrix.map(item => {
      const classAcc = item.isDemo ? 'demo' : `${item.accuracy}%`
      const studentCols = roster.map(s => {
        const found = item.students.find(st => st.uid === s.uid)
        return found ? `${found.pct}%` : 'N/A'
      })
      return [
        `"${item.topic}"`,
        `"${item.nys.code}"`,
        `"${item.nys.standard}"`,
        classAcc,
        ...studentCols
      ].join(',')
    })

    const csv     = [header, ...rows].join('\n')
    const blob    = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url     = URL.createObjectURL(blob)
    const link    = document.createElement('a')
    link.href     = url
    link.download = `${className}_${subjectName}_Standards_Matrix_${today}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }, [standardsMatrix, roster, activeClass, meta, subject])

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="screen-container" style={{ paddingTop: 28, paddingBottom: 40 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1100px', width: '100%', margin: '0 auto' }}>

        {/* ── #10 No-classroom empty state (shown instead of everything else) ── */}
        {!loading && classrooms.length === 0 && (
          <div className="card-glass" style={{
            padding: '60px 40px', textAlign: 'center',
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            border: '2px dashed #334155', borderRadius: '24px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'
          }}>
            <span style={{ fontSize: '64px', lineHeight: 1 }}>🏫</span>
            <div>
              <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '26px', color: '#f8fafc', margin: '0 0 8px 0' }}>
                No Classrooms Yet
              </h2>
              <p style={{ fontSize: '14px', color: '#94a3b8', maxWidth: '420px', lineHeight: '1.6', margin: 0 }}>
                Create your first classroom to get a unique join code, issue assignments,
                view the Standards Matrix, and track every student's Regents readiness.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '380px' }}>
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  const name = e.target.classNameInput.value.trim()
                  if (!name) return
                  const result = await createClassroom(name, subject)
                  if (result) {
                    setActiveClassCode(result.classCode)
                    setActiveTab('roster')
                  }
                }}
                style={{ display: 'flex', gap: '10px' }}
              >
                <input
                  name="classNameInput"
                  type="text"
                  placeholder="e.g. Biology Period 3"
                  style={{
                    flexGrow: 1, padding: '12px 16px', borderRadius: '14px',
                    border: '2px solid #334155', background: '#1e293b',
                    fontWeight: 700, fontSize: '14px', color: '#f8fafc'
                  }}
                />
                <button type="submit" className="btn-duo btn-duo-purple" style={{ padding: '12px 20px', fontSize: '14px' }}>
                  Create
                </button>
              </form>
              <p style={{ fontSize: '11px', color: '#475569', margin: 0, fontWeight: 700 }}>
                {meta.icon} Subject: <strong style={{ color: '#94a3b8' }}>{meta.name}</strong>
              </p>
            </div>
          </div>
        )}

        {/* ── #3 Header — only render when classrooms exist ──────────────── */}
        {classrooms.length > 0 && (
        <div className="card-glass" style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          padding: '24px 28px', borderLeft: `6px solid ${meta.color}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '16px', color: '#f8fafc'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '40px' }}>🏫</span>
            <div>
              <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '24px', margin: 0 }}>
                Teacher Dashboard
              </h1>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '2px 0 0' }}>
                {user?.displayName || 'Teacher'} · {meta.icon} {meta.name}
              </p>
            </div>
          </div>

          {/* Classroom selector + Share Sheet trigger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {classrooms.length > 0 ? (
              <>
                <select
                  value={activeClassCode}
                  onChange={(e) => setActiveClassCode(e.target.value)}
                  style={{
                    padding: '9px 14px', borderRadius: '12px', border: '2px solid #334155',
                    background: '#1e293b', fontWeight: 800, color: '#f8fafc', fontSize: '14px', minWidth: '200px'
                  }}
                >
                  {classrooms.map(c => (
                    <option key={c.classCode} value={c.classCode}>
                      {c.className} · {c.classCode}
                    </option>
                  ))}
                </select>

                {/* ── #2 Share Sheet Button ────────────────────────────── */}
                <button
                  onClick={() => setShowShareSheet(true)}
                  style={{
                    padding: '9px 16px', borderRadius: '12px', border: '2px solid #475569',
                    background: '#1e293b', color: '#94a3b8', fontWeight: 900, fontSize: '13px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                  title="Share class code"
                >
                  🔗 Share Code
                </button>
              </>
            ) : (
              <span style={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic' }}>No classes yet</span>
            )}
          </div>
        </div>

        )}

        {/* ── #2 CLASS CODE SHARE SHEET MODAL ─────────────────────────────── */}
        {showShareSheet && activeClass && (
          <div
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9000,
              animation: 'fade-in 0.2s ease'
            }}
            onClick={() => setShowShareSheet(false)}
          >
            <div className="card-glass" style={{
              width: '100%', maxWidth: '500px', padding: '36px', borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)', position: 'relative',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
              textAlign: 'center'
            }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowShareSheet(false)}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text-muted)', lineHeight: 1 }}
              >✕</button>

              <div style={{ fontSize: '48px' }}>📋</div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '22px', margin: '0 0 4px 0' }}>
                  Share Class Code
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                  {activeClass.className} · {meta.icon} {meta.name}
                </p>
              </div>

              {/* Large code display */}
              <div style={{
                background: 'var(--surface-2)', border: '3px dashed var(--purple-dark)',
                borderRadius: '20px', padding: '28px 40px', width: '100%'
              }}>
                <div style={{
                  fontFamily: 'var(--font-outfit)', fontWeight: 900,
                  fontSize: '42px', letterSpacing: '6px', color: 'var(--purple-dark)',
                  userSelect: 'all'
                }}>
                  {activeClass.classCode}
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '8px 0 0', fontWeight: 700 }}>
                  Students enter this code on their Home screen to join your class
                </p>
              </div>

              {/* Instructions */}
              <div style={{ width: '100%', textAlign: 'left' }}>
                <div style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  How students join
                </div>
                {[
                  '1. Open Regentify and go to Home',
                  '2. Find "Link to School Classroom"',
                  '3. Type the code above and tap Join Class',
                  '4. Their study logs will sync to your dashboard instantly',
                ].map(step => (
                  <div key={step} style={{ fontSize: '13px', color: 'var(--text-muted)', padding: '6px 0', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>
                    {step}
                  </div>
                ))}
              </div>

              {/* Copy button */}
              <button
                onClick={handleCopyCode}
                className="btn-duo btn-duo-purple"
                style={{ width: '100%', padding: '14px', fontSize: '15px' }}
              >
                {codeCopied ? '✅ Copied to Clipboard!' : '📋 Copy Class Code'}
              </button>
            </div>
          </div>
        )}

        {/* ── Tab Bar ────────────────────────────────────────────────── */}
        {classrooms.length > 0 && (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button style={tabBtnStyle(activeTab === 'roster')}      onClick={() => setActiveTab('roster')}>🏫 Roster &amp; Bulletin</button>
          <button style={tabBtnStyle(activeTab === 'assignments')} onClick={() => setActiveTab('assignments')}>📋 Assignments</button>
          <button style={tabBtnStyle(activeTab === 'matrix')}      onClick={() => setActiveTab('matrix')}>📊 Standards Matrix</button>
        </div>
        )}

        {loading && <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-dim)', fontStyle: 'italic' }}>Syncing…</div>}

        {/* ══════════════════════════════════════════════════════════════════
            TAB 1 — Roster & Bulletin
            ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'roster' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Create classroom */}
              <div className="card-glass">
                <h2 className="card-title">🆕 Create a Classroom</h2>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  Generate a unique join code for your students.
                </p>
                <form onSubmit={handleCreateClass} style={{ display: 'flex', gap: '10px' }}>
                  <input type="text" value={newClassName} onChange={e => setNewClassName(e.target.value)}
                    placeholder="e.g. Biology Period 3"
                    style={{ flexGrow: 1, padding: '10px 14px', borderRadius: '12px', border: '2px solid var(--border)', background: 'var(--bg)', fontWeight: 700, fontSize: '14px' }}
                  />
                  <button type="submit" className="btn-duo btn-duo-purple" style={{ padding: '10px 16px' }}>Generate</button>
                </form>

                {/* Quick-access share button after class exists */}
                {activeClass && (
                  <button
                    onClick={() => setShowShareSheet(true)}
                    style={{
                      marginTop: '12px', width: '100%', padding: '10px', borderRadius: '12px',
                      border: '2px dashed var(--purple-dark)', background: 'var(--purple-bg)',
                      color: 'var(--purple-dark)', fontWeight: 900, fontSize: '13px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                    }}
                  >
                    🔗 Share Code for <strong>{activeClass.classCode}</strong>
                  </button>
                )}
              </div>

              {/* Announcement */}
              <div className="card-glass">
                <h2 className="card-title">📢 Bulletin Announcement</h2>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  Students see this on their Home feed instantly.
                </p>
                <form onSubmit={handlePublishAnn} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <textarea value={announcementText} onChange={e => setAnnouncementText(e.target.value)}
                    placeholder="e.g. Finish the Ecology drill before Friday!"
                    style={{ width: '100%', height: '88px', padding: '12px 16px', borderRadius: '12px', border: '2px solid var(--border)', background: 'var(--bg)', fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, resize: 'none' }}
                  />
                  {announcementMsg && (
                    <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--brand-dark)', background: 'var(--brand-bg)', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid var(--brand)' }}>
                      ✅ {announcementMsg}
                    </div>
                  )}
                  <button type="submit" className="btn-duo btn-duo-purple" style={{ padding: '10px' }} disabled={!activeClassCode}>
                    Broadcast to Class 🚀
                  </button>
                </form>
              </div>
            </div>

            {/* Student Roster */}
            <div className="card-glass">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h2 className="card-title" style={{ marginBottom: 0 }}>👥 Student Roster</h2>
                {activeClass && (
                  <button onClick={() => setShowShareSheet(true)} className="pet-stage" style={{
                    background: 'var(--purple-bg)', color: 'var(--purple-dark)', fontWeight: 900,
                    border: 'none', cursor: 'pointer', padding: '4px 10px', borderRadius: '8px', fontSize: '11px'
                  }}>
                    🔗 {activeClass.classCode}
                  </button>
                )}
              </div>

              {!activeClass ? (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                  Create a classroom to get started.
                </div>
              ) : roster.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)', border: '2px dashed var(--border)', borderRadius: '16px' }}>
                  <span style={{ fontSize: '48px' }}>👤</span>
                  <h4 style={{ fontWeight: 800, marginTop: '10px', marginBottom: '6px' }}>No students linked yet</h4>
                  <p style={{ fontSize: '12px', margin: 0 }}>
                    Share code <strong style={{ color: 'var(--purple-dark)' }}>{activeClass.classCode}</strong> with your class
                  </p>
                  <button onClick={() => setShowShareSheet(true)} className="btn-duo btn-duo-purple"
                    style={{ marginTop: '14px', padding: '10px 20px', fontSize: '13px' }}>
                    🔗 Show Share Sheet
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '440px' }}>
                  {roster.map(student => {
                    // Bug fix #7: compute lastActive once per student, not twice inside IIFE
                    const lastActive = lastActiveLabel(student.history)
                    const lastActiveColor = (lastActive === 'Just now' || lastActive.endsWith('m ago') || lastActive.endsWith('h ago'))
                      ? 'var(--correct-dark)'
                      : (lastActive === 'Yesterday' || lastActive.endsWith('days ago'))
                        ? 'var(--warn-dark)'
                        : 'var(--text-dim)'
                    return (
                    <div
                      key={student.uid}
                      className="card-glass"
                      style={{ padding: '14px', background: 'var(--surface-2)', border: '1.5px solid var(--border)', cursor: 'pointer', transition: 'border-color 0.15s' }}
                      onClick={() => setSelectedStudent(student)}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--purple-dark)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 900, fontSize: '15px' }}>👤 {student.displayName}</span>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <span className="pet-stage" style={{ fontSize: '11px' }}>⭐ {student.xp} XP</span>
                          <span style={{ fontSize: '10px', color: 'var(--purple-dark)', fontWeight: 900 }}>View →</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, marginTop: '8px' }}>
                        <span>🔥 {student.streak} day streak</span>
                        <span>{student.totalQuizzes > 0 ? `📈 ${student.avgScore}% avg · ${student.totalQuizzes} drills` : 'No drills yet'}</span>
                      </div>
                      {/* #9 Last Active */}
                      <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'flex-end' }}>
                        <span style={{ fontSize: '10px', fontWeight: 800, color: lastActiveColor }}>
                          🕐 {lastActive}
                        </span>
                      </div>
                    </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB 2 — Assignments Panel
            ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'assignments' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

            {/* Issue Assignment Form */}
            <div className="card-glass">
              <h2 className="card-title">📝 Issue Assignment</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Link to a unit lesson drill or any past Regents exam.
              </p>

              {!activeClassCode ? (
                <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-dim)', fontStyle: 'italic', border: '2px dashed var(--border)', borderRadius: '12px' }}>
                  Create a classroom first to issue assignments.
                </div>
              ) : (
                <form onSubmit={handleCreateAssignment} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 900, color: 'var(--text-muted)' }}>Title</label>
                    <input type="text" value={assignTitle} onChange={e => setAssignTitle(e.target.value)}
                      placeholder="e.g. Ecology Practice Drill"
                      style={{ padding: '10px 14px', borderRadius: '12px', border: '2px solid var(--border)', background: 'var(--bg)', fontWeight: 700, fontSize: '14px' }}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 900, color: 'var(--text-muted)' }}>Type</label>
                      <select value={assignType} onChange={e => setAssignType(e.target.value)}
                        style={{ padding: '10px 14px', borderRadius: '12px', border: '2px solid var(--border)', background: 'var(--bg)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>
                        <option value="lesson">Unit Lesson Drill</option>
                        <option value="exam">Past Regents Exam</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 900, color: 'var(--text-muted)' }}>
                        Target {assignType === 'exam' && <span style={{ color: 'var(--brand-dark)' }}>({realExams.length} available)</span>}
                      </label>
                      <select value={assignTarget} onChange={e => setAssignTarget(e.target.value)}
                        style={{ padding: '10px 14px', borderRadius: '12px', border: '2px solid var(--border)', background: 'var(--bg)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>
                        {assignType === 'lesson'
                          ? topics.map(t => <option key={t} value={t}>{t}</option>)
                          : realExams.length > 0
                            ? realExams.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)
                            : <option value="">No exams available for {meta.name}</option>
                        }
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 900, color: 'var(--text-muted)' }}>Due Date</label>
                    <input type="date" value={assignDueDate} onChange={e => setAssignDueDate(e.target.value)}
                      style={{ padding: '10px 14px', borderRadius: '12px', border: '2px solid var(--border)', background: 'var(--bg)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}
                      required
                    />
                  </div>

                  {assignSuccess && (
                    <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--correct-dark)', background: 'var(--correct-bg)', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid var(--correct)' }}>
                      {assignSuccess}
                    </div>
                  )}

                  <button type="submit" className="btn-duo btn-duo-purple" style={{ padding: '12px' }}>
                    Send to Students 📋
                  </button>
                </form>
              )}
            </div>

            {/* Issued Assignments List */}
            <div className="card-glass">
              <h2 className="card-title">📋 Issued Goals</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                Showing urgency — red = overdue, yellow = due within 2 days.
              </p>

              {assignments.length === 0 ? (
                <div style={{ padding: '50px', textAlign: 'center', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                  No assignments issued yet.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: '480px' }}>
                  {/* Bug fix #5: filter to current class, sort overdue first */}
                  {[...assignments]
                    .filter(a => a.classCode === activeClassCode)
                    .sort((a, b) => {
                    const order = { overdue: 0, 'due-soon': 1, normal: 2 }
                    return (order[assignUrgency(a.dueDate)] ?? 2) - (order[assignUrgency(b.dueDate)] ?? 2)
                  }).map(assign => {
                    const urgency   = assignUrgency(assign.dueDate)
                    const uStyle    = URGENCY_STYLE[urgency]
                    const doneCount = assign.completedStudents?.length || 0
                    const total     = roster.length
                    const pct       = total > 0 ? Math.round((doneCount / total) * 100) : 0
                    const barColor  = pct >= 80 ? 'var(--correct)' : pct >= 50 ? 'var(--warn)' : 'var(--wrong)'
                    const isDeleting = deletingId === assign.id

                    return (
                      <div key={assign.id} style={{ background: uStyle.bg, border: uStyle.border, borderRadius: '14px', padding: '14px 16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                              <h4 style={{ fontWeight: 900, fontSize: '14px', margin: 0 }}>{assign.title}</h4>
                              {uStyle.badge && (
                                <span style={{ fontSize: '10px', fontWeight: 900, color: uStyle.badgeColor,
                                  background: 'white', padding: '2px 8px', borderRadius: '8px', border: `1px solid ${uStyle.badgeColor}` }}>
                                  {uStyle.badge}
                                </span>
                              )}
                            </div>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 900, textTransform: 'uppercase', display: 'block', marginTop: '4px' }}>
                              {assign.type === 'exam' ? '📄 Past Exam' : '📚 Lesson Drill'} · Due {assign.dueDate}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                            <span className="pet-stage" style={{ background: 'var(--purple-bg)', color: 'var(--purple-dark)', fontSize: '11px' }}>
                              {doneCount}/{total}
                            </span>
                            <button
                              onClick={() => handleDeleteAssignment(assign.id)}
                              disabled={isDeleting}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', opacity: 0.5, padding: '2px' }}
                              title="Delete assignment"
                            >
                              {isDeleting ? '…' : '🗑️'}
                            </button>
                          </div>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                          <AccuracyBar pct={pct} color={barColor} height={6} />
                          <span style={{ fontSize: '10px', color: 'var(--text-dim)', fontWeight: 800, marginTop: '4px', display: 'block' }}>
                            {pct}% completion
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB 3 — NYS Standards Matrix
            ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'matrix' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

            {/* Header */}
            <div className="card-glass" style={{ padding: '22px 26px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '20px', margin: '0 0 6px 0' }}>
                    📊 NYS Next Generation Standards Matrix
                  </h2>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, maxWidth: '520px' }}>
                    Class-wide mastery aggregated from real quiz history. Remediation alerts fire when accuracy drops below <strong>65%</strong>.
                    Standards mapped to official <strong>NYS Next Generation Learning Standards</strong>.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 900, padding: '6px 12px', borderRadius: '10px', background: 'var(--surface-2)', border: '2px solid var(--border)', color: 'var(--text-muted)' }}>
                    {meta.icon} {meta.name}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 900, padding: '6px 12px', borderRadius: '10px', background: 'var(--surface-2)', border: '2px solid var(--border)', color: 'var(--text-muted)' }}>
                    👥 {roster.length} students
                  </span>
                  {/* #8 CSV Export */}
                  <button
                    onClick={handleExportCSV}
                    style={{
                      padding: '7px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 900,
                      border: '2px solid var(--border)', background: 'var(--surface-2)',
                      color: 'var(--text-muted)', cursor: 'pointer', display: 'flex',
                      alignItems: 'center', gap: '5px', fontFamily: 'var(--font-nunito)'
                    }}
                    title="Download class matrix as CSV"
                  >
                    📥 Export CSV
                  </button>
                </div>
              </div>
            </div>

            {/* Summary stat cards */}
            {classStats && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {[
                  { label: 'Class Average', value: classStats.overallAvg != null ? `${classStats.overallAvg}%` : '—', icon: '📈', color: classStats.overallAvg < 65 ? 'var(--wrong-dark)' : classStats.overallAvg < 80 ? 'var(--warn-dark)' : 'var(--correct-dark)', bg: classStats.overallAvg < 65 ? 'var(--wrong-bg)' : classStats.overallAvg < 80 ? 'var(--warn-bg)' : 'var(--correct-bg)', sub: 'Across all topics' },
                  { label: 'Critical',      value: classStats.criticalCount,   icon: '⚠️', color: 'var(--wrong-dark)',   bg: 'var(--wrong-bg)',   sub: 'Below 65%' },
                  { label: 'Needs Review',  value: classStats.strugglingCount, icon: '📖', color: 'var(--warn-dark)',    bg: 'var(--warn-bg)',    sub: '65–79%'    },
                  { label: 'Mastered',      value: classStats.masteredCount,   icon: '🎉', color: 'var(--correct-dark)', bg: 'var(--correct-bg)', sub: '92%+'      },
                ].map(card => (
                  <div key={card.label} className="card-glass" style={{ padding: '16px 18px', background: card.bg, border: `2px solid ${card.color}20` }}>
                    <div style={{ fontSize: '26px', marginBottom: '4px' }}>{card.icon}</div>
                    <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '26px', color: card.color }}>{card.value}</div>
                    <div style={{ fontSize: '11px', fontWeight: 900, color: card.color }}>{card.label}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-dim)', marginTop: '2px' }}>{card.sub}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Critical alert banner */}
            {classStats?.criticalCount > 0 && (
              <div style={{ background: 'var(--wrong-bg)', border: '2px solid var(--wrong)', borderRadius: '14px', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '28px', flexShrink: 0 }}>🚨</span>
                <div>
                  <div style={{ fontWeight: 900, fontSize: '14px', color: 'var(--wrong-dark)', marginBottom: '3px' }}>
                    Remediation Required — {classStats.criticalCount} topic{classStats.criticalCount !== 1 ? 's' : ''} below 65%
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--wrong-dark)', opacity: 0.8 }}>
                    Use "Assign Remediation Drill" on each critical topic below to push drills to all students.
                  </div>
                </div>
              </div>
            )}

            {/* Filter + Sort bar — #7 */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Filter:</span>
              {[
                { key: 'all', label: 'All Topics' }, { key: 'critical', label: '⚠️ Critical' },
                { key: 'struggling', label: '📖 Needs Review' }, { key: 'satisfactory', label: '📘 Satisfactory' },
                { key: 'mastered', label: '🎉 Mastered' },
              ].map(f => (
                <button key={f.key} onClick={() => setMatrixFilter(f.key)} style={{
                  padding: '6px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 900,
                  border: matrixFilter === f.key ? '2px solid var(--purple-dark)' : '2px solid var(--border)',
                  background: matrixFilter === f.key ? 'var(--purple-bg)' : 'var(--surface)',
                  color: matrixFilter === f.key ? 'var(--purple-dark)' : 'var(--text-muted)',
                  cursor: 'pointer', fontFamily: 'var(--font-nunito)',
                }}>{f.label}</button>
              ))}

              {/* Divider */}
              <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 4px' }} />

              <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sort:</span>
              {[
                { key: 'topic',  label: '📋 Curriculum' },
                { key: 'worst',  label: '↑ Weakest First' },
                { key: 'best',   label: '↓ Strongest First' },
              ].map(s => (
                <button key={s.key} onClick={() => setMatrixSort(s.key)} style={{
                  padding: '6px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 900,
                  border: matrixSort === s.key ? '2px solid var(--blue-dark)' : '2px solid var(--border)',
                  background: matrixSort === s.key ? 'var(--blue-bg)' : 'var(--surface)',
                  color: matrixSort === s.key ? 'var(--blue-dark)' : 'var(--text-muted)',
                  cursor: 'pointer', fontFamily: 'var(--font-nunito)',
                }}>{s.label}</button>
              ))}

              <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>
                {filteredMatrix.length}/{standardsMatrix.length} topics
              </span>
            </div>

            {/* Topic rows */}
            {filteredMatrix.map((item, idx) => {
              const isExpanded = selectedTopic === item.topic
              return (
                <div key={item.topic} className="card-glass" style={{
                  padding: 0, overflow: 'hidden',
                  border: item.statusKey === 'critical' ? '2px solid var(--wrong)' : item.statusKey === 'struggling' ? '2px solid var(--warn)' : '2px solid var(--border)'
                }}>
                  {/* Row header */}
                  <div onClick={() => setSelectedTopic(isExpanded ? null : item.topic)}
                    style={{ padding: '16px 20px', cursor: 'pointer', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0, background: item.statusBg, border: `2px solid ${item.statusColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '13px', color: item.statusColor }}>
                      {idx + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '15px', margin: '0 0 3px 0' }}>{item.topic}</h3>
                          <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>
                            {item.nys.code} · {item.nys.standard}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <StatusPill label={item.statusLabel} color={item.statusColor} bg={item.statusBg} />
                          <span style={{ fontSize: '10px', color: 'var(--text-dim)' }}>{isExpanded ? '▲' : '▼'}</span>
                        </div>
                      </div>
                      <div style={{ marginTop: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '5px' }}>
                          <span>Class Mastery Index</span>
                          <span style={{ color: item.statusColor }}>
                            {item.accuracy}%{item.isDemo && <span style={{ color: 'var(--text-dim)', fontWeight: 700 }}> (demo)</span>}
                          </span>
                        </div>
                        <AccuracyBar pct={item.accuracy} color={item.barColor} height={9} />
                      </div>
                      <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>
                        <span>📝 {item.totalAttempts > 0 ? `${item.totalCorrect}/${item.totalAttempts}` : 'No data'}</span>
                        <span>👥 {item.studentCount} practiced</span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div style={{ borderTop: '1.5px solid var(--border)', background: 'var(--surface-2)', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {/* Standard description */}
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0, background: 'var(--surface)', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid var(--border)', borderLeft: `4px solid ${item.statusColor}` }}>
                        {item.nys.description}
                      </p>

                      {/* Remediation box */}
                      {(item.statusKey === 'critical' || item.statusKey === 'struggling') && (
                        <div style={{ background: item.statusKey === 'critical' ? 'var(--wrong-bg)' : 'var(--warn-bg)', border: `1.5px solid ${item.statusColor}40`, borderRadius: '12px', padding: '14px 16px' }}>
                          <div style={{ fontSize: '11px', fontWeight: 900, color: item.statusColor, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                            {item.statusKey === 'critical' ? '🚨 Remediation Guidance' : '📖 Review Suggestions'}
                          </div>
                          <p style={{ fontSize: '13px', color: 'var(--text)', margin: '0 0 12px', lineHeight: '1.6' }}>{item.nys.remediation}</p>
                          <button onClick={() => handleAssignRemediation(item.topic)} className="btn-duo"
                            style={{ padding: '8px 18px', fontSize: '13px', background: item.statusKey === 'critical' ? 'var(--wrong)' : 'var(--warn)', borderBottomColor: item.statusKey === 'critical' ? 'var(--wrong-dark)' : 'var(--warn-dark)', color: '#fff' }}
                            disabled={!activeClassCode}>
                            📋 Assign Remediation Drill
                          </button>
                        </div>
                      )}

                      {/* Per-student breakdown */}
                      {item.students.length > 0 ? (
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Per-Student Breakdown</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', maxHeight: '240px', overflowY: 'auto' }}>
                            {item.students.map(s => {
                              const sColor = s.pct < 65 ? 'var(--wrong)' : s.pct < 80 ? 'var(--warn)' : 'var(--correct)'
                              return (
                                <div key={s.uid} style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: '10px', padding: '10px 14px' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ fontWeight: 900, fontSize: '13px' }}>{s.pct < 65 ? '⚠️' : s.pct < 80 ? '📖' : '✅'} {s.name}</span>
                                    <span style={{ fontSize: '11px', fontWeight: 900, color: sColor }}>{s.pct}% ({s.correct}/{s.total})</span>
                                  </div>
                                  <AccuracyBar pct={s.pct} color={sColor} height={6} />
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ) : (
                        <div style={{ fontSize: '13px', color: 'var(--text-dim)', fontStyle: 'italic', textAlign: 'center', padding: '16px' }}>
                          No students have practiced this topic yet.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}

            {/* Legend */}
            <div className="card-glass" style={{ padding: '14px 20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Mastery Scale</div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {[
                  { label: 'Critically Weak', range: '< 65%',   color: 'var(--wrong-dark)',   bg: 'var(--wrong-bg)',   note: 'Re-teach required'  },
                  { label: 'Needs Review',    range: '65–79%',  color: 'var(--warn-dark)',    bg: 'var(--warn-bg)',    note: 'Targeted practice' },
                  { label: 'Satisfactory',    range: '80–91%',  color: 'var(--blue-dark)',    bg: 'var(--blue-bg)',    note: 'On track'          },
                  { label: 'Mastered',        range: '92%+',    color: 'var(--correct-dark)', bg: 'var(--correct-bg)', note: 'NYS Proficient'    },
                ].map(l => (
                  <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '7px', borderRadius: '4px', background: l.bg, border: `1.5px solid ${l.color}` }} />
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 900, color: l.color }}>{l.label} <span style={{ color: 'var(--text-dim)', fontWeight: 700 }}>({l.range})</span></div>
                      <div style={{ fontSize: '10px', color: 'var(--text-dim)' }}>{l.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* ══════════════════════════════════════════════════════════════════
          #6 STUDENT DETAIL MODAL — full cross-topic performance view
          ══════════════════════════════════════════════════════════════════ */}
      {selectedStudent && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9500,
            animation: 'fade-in 0.2s ease', padding: '20px',
          }}
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="card-glass"
            style={{
              width: '100%', maxWidth: '680px', maxHeight: '85vh',
              padding: '28px 32px', borderRadius: '24px',
              boxShadow: '0 24px 64px rgba(0,0,0,0.5)', position: 'relative',
              display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedStudent(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text-muted)', lineHeight: 1, zIndex: 1 }}
            >✕</button>

            {/* Student header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingRight: '32px' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, var(--purple-bg), var(--blue-bg))',
                border: '3px solid var(--purple-dark)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '28px',
              }}>👤</div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '22px', margin: '0 0 4px 0' }}>
                  {selectedStudent.displayName}
                </h2>
                <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 800 }}>
                  <span>⭐ {selectedStudent.xp} XP</span>
                  <span>🔥 {selectedStudent.streak} day streak</span>
                  <span>📝 {selectedStudent.totalQuizzes} drills</span>
                  {selectedStudent.avgScore != null && <span>📈 {selectedStudent.avgScore}% avg</span>}
                </div>
              </div>
            </div>

            {/* Summary ribbon */}
            {(() => {
              const practiced  = studentTopicProfile.filter(t => t.pct !== null)
              const avgPct     = practiced.length > 0 ? Math.round(practiced.reduce((s, t) => s + t.pct, 0) / practiced.length) : null
              const weakTopics = practiced.filter(t => t.pct < 65)
              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {[
                    { label: 'Student Average', value: avgPct != null ? `${avgPct}%` : '—', icon: '📈', color: avgPct != null && avgPct < 65 ? 'var(--wrong-dark)' : avgPct != null && avgPct < 80 ? 'var(--warn-dark)' : 'var(--correct-dark)', bg: avgPct != null && avgPct < 65 ? 'var(--wrong-bg)' : avgPct != null && avgPct < 80 ? 'var(--warn-bg)' : 'var(--correct-bg)' },
                    { label: 'Topics Practiced', value: practiced.length, icon: '🗂️', color: 'var(--blue-dark)', bg: 'var(--blue-bg)' },
                    { label: 'Weak Topics', value: weakTopics.length, icon: '⚠️', color: weakTopics.length > 0 ? 'var(--wrong-dark)' : 'var(--correct-dark)', bg: weakTopics.length > 0 ? 'var(--wrong-bg)' : 'var(--correct-bg)' },
                  ].map(c => (
                    <div key={c.label} style={{ background: c.bg, borderRadius: '12px', padding: '12px 16px', border: `2px solid ${c.color}20` }}>
                      <div style={{ fontSize: '20px', marginBottom: '4px' }}>{c.icon}</div>
                      <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '22px', color: c.color }}>{c.value}</div>
                      <div style={{ fontSize: '11px', fontWeight: 900, color: c.color }}>{c.label}</div>
                    </div>
                  ))}
                </div>
              )
            })()}

            {/* Per-topic bars */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-dim)', marginBottom: '12px' }}>
                Performance Across All Topics
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {studentTopicProfile.map(tp => {
                  const noData  = tp.pct === null
                  const color   = noData ? 'var(--surface-3)' : tp.pct < 65 ? 'var(--wrong)' : tp.pct < 80 ? 'var(--warn)' : 'var(--correct)'
                  const textCol = noData ? 'var(--text-dim)' : tp.pct < 65 ? 'var(--wrong-dark)' : tp.pct < 80 ? 'var(--warn-dark)' : 'var(--correct-dark)'
                  const icon    = noData ? '—' : tp.pct < 65 ? '⚠️' : tp.pct < 80 ? '📖' : '✅'
                  return (
                    <div key={tp.topic} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '12px', minWidth: '180px', fontWeight: 800, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {icon} {tp.topic}
                      </span>
                      <div style={{ flex: 1 }}>
                        {noData ? (
                          <div style={{ height: '8px', background: 'var(--surface-3)', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontSize: '9px', color: 'var(--text-dim)', paddingLeft: '6px', fontWeight: 700 }}>Not practiced</span>
                          </div>
                        ) : (
                          <AccuracyBar pct={tp.pct} color={color} height={8} />
                        )}
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 900, color: textCol, minWidth: '40px', textAlign: 'right' }}>
                        {noData ? '' : `${tp.pct}%`}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Assign remediation CTA if student is weak */}
            {studentTopicProfile.filter(t => t.pct !== null && t.pct < 65).length > 0 && (
              <div style={{ background: 'var(--wrong-bg)', border: '1.5px solid var(--wrong)', borderRadius: '12px', padding: '14px 16px' }}>
                <div style={{ fontWeight: 900, fontSize: '13px', color: 'var(--wrong-dark)', marginBottom: '6px' }}>
                  🚨 {studentTopicProfile.filter(t => t.pct !== null && t.pct < 65).length} weak topic{studentTopicProfile.filter(t => t.pct !== null && t.pct < 65).length !== 1 ? 's' : ''} below 65%
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {studentTopicProfile.filter(t => t.pct !== null && t.pct < 65).map(tp => (
                    <button
                      key={tp.topic}
                      onClick={() => handleAssignRemediation(tp.topic)}
                      className="btn-duo"
                      style={{ padding: '6px 14px', fontSize: '12px', background: 'var(--wrong)', borderBottomColor: 'var(--wrong-dark)', color: '#fff' }}
                      disabled={!activeClassCode}
                    >
                      📋 {tp.topic}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  )
}
