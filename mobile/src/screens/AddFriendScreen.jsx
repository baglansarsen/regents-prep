import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useFriends } from '../hooks/useFriends'

export default function AddFriendScreen({ navigation }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const { addByCode, addError } = useFriends(user?.uid, user)
  const [code, setCode]       = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const s = makeStyles(C)

  async function handleAdd() {
    if (!code.trim()) return
    setLoading(true)
    await addByCode(code.trim())
    setLoading(false)
    if (!addError) setSent(true)
  }

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={s.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.title}>Add Friend</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={s.body}>
        <Text style={s.emoji}>👥</Text>
        <Text style={s.label}>Enter a friend code</Text>

        <TextInput
          style={s.input}
          value={code}
          onChangeText={(t) => setCode(t.toUpperCase())}
          placeholder="e.g. ABC123"
          placeholderTextColor={C.textDim}
          autoCapitalize="characters"
          maxLength={6}
        />

        {addError && <Text style={s.error}>{addError}</Text>}
        {sent && <Text style={s.success}>✓ Friend request sent!</Text>}

        <TouchableOpacity style={s.btn} onPress={handleAdd} disabled={loading || sent}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>Send Request</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:    { flex: 1, backgroundColor: C.bg },
    header:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
    back:    { fontSize: 15, color: C.brand, fontWeight: '600', width: 60 },
    title:   { fontSize: 18, fontWeight: '800', color: C.text },
    body:    { flex: 1, padding: 32, alignItems: 'center', gap: 16 },
    emoji:   { fontSize: 56 },
    label:   { fontSize: 16, color: C.textMuted },
    input:   { width: '100%', backgroundColor: C.surface, borderRadius: 14, padding: 16, textAlign: 'center', fontSize: 28, fontWeight: '900', letterSpacing: 6, color: C.text, borderWidth: 1.5, borderColor: C.border },
    error:   { color: C.wrong, fontSize: 14 },
    success: { color: C.correct, fontSize: 14, fontWeight: '700' },
    btn:     { width: '100%', backgroundColor: C.brand, borderRadius: 14, padding: 16, alignItems: 'center' },
    btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  })
}
