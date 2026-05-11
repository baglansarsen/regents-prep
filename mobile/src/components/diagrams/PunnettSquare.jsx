import { View, Text, StyleSheet } from 'react-native'
import { C } from '../../theme'

// alleles: { parent1: ['T','t'], parent2: ['T','t'] }
export default function PunnettSquare({ alleles, title }) {
  const [a1, a2] = alleles.parent1
  const [b1, b2] = alleles.parent2
  const cells = [
    a1 + b1, a1 + b2,
    a2 + b1, a2 + b2,
  ]

  return (
    <View style={s.wrapper}>
      {title && <Text style={s.title}>{title}</Text>}
      <View style={s.grid}>
        {/* Header row */}
        <View style={s.headerCell} />
        <View style={s.headerCell}><Text style={s.headerText}>{b1}</Text></View>
        <View style={s.headerCell}><Text style={s.headerText}>{b2}</Text></View>

        {/* Row 1 */}
        <View style={s.headerCell}><Text style={s.headerText}>{a1}</Text></View>
        <View style={s.cell}><Text style={s.cellText}>{cells[0]}</Text></View>
        <View style={s.cell}><Text style={s.cellText}>{cells[1]}</Text></View>

        {/* Row 2 */}
        <View style={s.headerCell}><Text style={s.headerText}>{a2}</Text></View>
        <View style={s.cell}><Text style={s.cellText}>{cells[2]}</Text></View>
        <View style={s.cell}><Text style={s.cellText}>{cells[3]}</Text></View>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  wrapper: { alignItems: 'center', marginBottom: 16 },
  title:   { fontSize: 12, color: C.textMuted, marginBottom: 8, fontWeight: '600' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 160,
    borderWidth: 1,
    borderColor: C.surface2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  headerCell: {
    width: '33.33%',
    height: 44,
    backgroundColor: C.surface2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: C.bg,
  },
  headerText: { fontSize: 16, fontWeight: '800', color: C.brandLight },
  cell: {
    width: '33.33%',
    height: 44,
    backgroundColor: C.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: C.surface2,
  },
  cellText: { fontSize: 15, fontWeight: '700', color: C.text },
})
