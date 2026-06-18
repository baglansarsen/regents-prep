/**
 * StreakCalendar — themed month grid showing each day's streak status.
 *
 * Reused in the rewards sheet (streak tab), the Progress streak card, and the
 * Profile streak modal. Reads `studiedDates` / `frozenDates` (YYYY-MM-DD) from
 * StreakContext; status per day comes from utils/streakCalendar.
 *
 * Props: { studiedDates, frozenDates, streak, longestStreak, C }
 */
import React, { useMemo, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { T } from '../styles/duo'
import { monthMatrix, addMonths, monthLabel, dayStatus, todayISO } from '../utils/streakCalendar'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export default function StreakCalendar({
  studiedDates = [], frozenDates = [], streak = 0, longestStreak = 0, C,
}) {
  const today = todayISO()
  const now   = useMemo(() => new Date(), [])
  const [view, setView] = useState({ year: now.getFullYear(), month: now.getMonth() })

  const studiedSet = useMemo(() => new Set(studiedDates), [studiedDates])
  const frozenSet  = useMemo(() => new Set(frozenDates),  [frozenDates])
  const firstActive = useMemo(() => {
    const all = [...studiedDates, ...frozenDates]
    return all.length ? all.reduce((a, b) => (a < b ? a : b)) : null
  }, [studiedDates, frozenDates])

  const weeks = useMemo(() => monthMatrix(view.year, view.month), [view])
  const atCurrentMonth = view.year === now.getFullYear() && view.month === now.getMonth()

  const s = makeStyles(C)

  function renderCell(cell, ci) {
    const status = dayStatus(cell, { studiedSet, frozenSet, today, firstActive })
    const dayNum = cell ? Number(cell.slice(8, 10)) : ''

    let cellStyle = s.cell
    let textStyle = s.dayText
    if (status === 'studied') { cellStyle = [s.cell, { backgroundColor: C.brand, borderColor: C.brandDark }]; textStyle = [s.dayText, { color: '#fff' }] }
    else if (status === 'frozen') { cellStyle = [s.cell, { backgroundColor: C.blue, borderColor: C.blueDark }]; textStyle = [s.dayText, { color: '#fff' }] }
    else if (status === 'today')  { cellStyle = [s.cell, { borderColor: C.brand, borderWidth: 2 }]; textStyle = [s.dayText, { color: C.brand, fontFamily: 'Fredoka_600SemiBold' }] }
    else if (status === 'missed') { textStyle = [s.dayText, { color: C.wrong, opacity: 0.7 }] }
    else if (status === 'future') { textStyle = [s.dayText, { color: C.textDim, opacity: 0.45 }] }

    return (
      <View key={ci} style={s.cellWrap}>
        {cell ? <View style={cellStyle}><Text style={textStyle}>{dayNum}</Text></View> : <View style={s.cell} />}
      </View>
    )
  }

  return (
    <View>
      {/* Month navigation */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => setView(addMonths(view.year, view.month, -1))} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={[s.nav, { color: C.textMuted }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[T.h3, { color: C.text }]}>{monthLabel(view.year, view.month)}</Text>
        <TouchableOpacity
          disabled={atCurrentMonth}
          onPress={() => setView(addMonths(view.year, view.month, +1))}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[s.nav, { color: C.textMuted, opacity: atCurrentMonth ? 0.25 : 1 }]}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Weekday labels */}
      <View style={s.row}>
        {WEEKDAYS.map((w, i) => (
          <View key={i} style={s.cellWrap}>
            <Text style={[s.weekdayLabel, { color: C.textMuted }]}>{w}</Text>
          </View>
        ))}
      </View>

      {/* Weeks */}
      {weeks.map((week, wi) => (
        <View key={wi} style={s.row}>
          {week.map((cell, ci) => renderCell(cell, ci))}
        </View>
      ))}

      {/* Legend */}
      <View style={s.legend}>
        <LegendItem swatch={{ backgroundColor: C.brand }} label="Studied" C={C} />
        <LegendItem swatch={{ backgroundColor: C.blue }}  label="Freeze"  C={C} />
        <LegendItem swatch={{ borderColor: C.brand, borderWidth: 2 }} label="Today" C={C} />
        <LegendItem missed label="Missed" C={C} />
      </View>
    </View>
  )
}

function LegendItem({ swatch, missed, label, C }) {
  return (
    <View style={legendStyles.item}>
      <View style={[legendStyles.swatch, missed ? { borderColor: C.wrong, borderWidth: 1.5 } : swatch]} />
      <Text style={[T.small, { color: C.textMuted }]}>{label}</Text>
    </View>
  )
}

const legendStyles = StyleSheet.create({
  item:   { flexDirection: 'row', alignItems: 'center', gap: 5 },
  swatch: { width: 12, height: 12, borderRadius: 4 },
})

function makeStyles(C) {
  return StyleSheet.create({
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, paddingHorizontal: 4 },
    nav:    { fontSize: 28, fontFamily: 'Fredoka_600SemiBold', width: 32, textAlign: 'center' },

    row:      { flexDirection: 'row' },
    cellWrap: { flex: 1, alignItems: 'center', paddingVertical: 3 },
    cell: {
      width: 34, height: 34, borderRadius: 17,
      alignItems: 'center', justifyContent: 'center',
      borderWidth: 1, borderColor: 'transparent',
    },
    dayText:      { fontFamily: 'Nunito_700Bold', fontSize: 13, color: C.text },
    weekdayLabel: { fontFamily: 'Fredoka_600SemiBold', fontSize: 11, paddingVertical: 4 },

    legend: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginTop: 14 },
  })
}
