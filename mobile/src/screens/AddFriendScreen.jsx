import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useFriends } from '../hooks/useFriends'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { T } from '../styles/duo'

export default function AddFriendScreen({ navigation }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const { addByCode, addError } = useFriends(user?.uid, user)
  const [code, setCode]       = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [myCode, setMyCode]   = useState('')
  const s = makeStyles(C)

  useEffect(() => {
    // Load user's friend code
    if (user?.uid) {
      getDoc(doc(db, 'users', user.uid, 'meta', 'social')).then((snap) => {
        if (snap.exists()) setMyCode(snap.data().friendCode ?? '')
      }).catch(() => {})
    }
  }, [user?.uid])

  async function handleAdd() {
    if (!code.trim() || code.length < 6) return
    setLoading(true)
    await addByCode(code.trim())
    setLoading(false)
    if (!addError) setSent(true)
  }

  function copyCode() {
    if (myCode) {
      try {
        require('react-native').Clipboard.setString(myCode)
      } catch {}
    }
  }

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={s.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.title}>Add Friend</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={s.scroll}>
        {/* Your code section */}
        {myCode && (
          <View style={s.section}>
            <Text style={[T.h3, { color: C.text, marginBottom: 8 }]}>🤝 Your Friend Code</Text>
            <Text style={[T.small, { color: C.textMuted, marginBottom: 12 }]}>
              Share this with friends so they can add you
            </Text>
            <View style={[s.codeCard, { backgroundColor: C.surface2, borderColor: C.brand }]}>
              <Text style={s.codeValue}>{myCode}</Text>
              <TouchableOpacity
                style={s.copyBtn}
                onPress={copyCode}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={{ fontSize: 18 }}>📋</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Add friend section */}
        <View style={s.section}>
          <Text style={[T.h3, { color: C.text, marginBottom: 8 }]}>👥 Add a Friend</Text>
          <Text style={[T.small, { color: C.textMuted, marginBottom: 12 }]}>
            Enter a friend's code to send them a request
          </Text>

          <TextInput
            style={[s.input, { borderColor: addError ? C.wrong : C.border }]}
            value={code}
            onChangeText={(t) => setCode(t.toUpperCase())}
            placeholder="ABC123"
            placeholderTextColor={C.textDim}
            autoCapitalize="characters"
            maxLength={6}
            editable={!sent}
          />

          {addError && (
            <View style={s.errorBox}>
              <Text style={s.error}>❌ {addError}</Text>
            </View>
          )}
          {sent && (
            <View style={s.successBox}>
              <Text style={s.success}>✓ Friend request sent!</Text>
              <Text style={[T.small, { color: C.correct, marginTop: 4 }]}>They'll see it in their requests</Text>
            </View>
          )}

          <TouchableOpacity
            style={[s.btn, (loading || sent || code.length < 6) && s.btnDisabled]}
            onPress={handleAdd}
            disabled={loading || sent || code.length < 6}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : sent ? (
              <Text style={s.btnText}>Request Sent!</Text>
            ) : (
              <Text style={s.btnText}>Send Request</Text>
            )}
          </TouchableOpacity>
        </View>
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
    scroll:  { flex: 1, padding: 20, gap: 24 },
    section: { gap: 12 },
    codeCard: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 14,
      borderWidth: 2,
      paddingHorizontal: 16,
      paddingVertical: 14,
      gap: 12,
    },
    codeValue: {
      flex: 1,
      fontSize: 20,
      fontFamily: 'Fredoka_700Bold',
      color: C.brand,
      letterSpacing: 3,
    },
    copyBtn: {
      padding: 8,
    },
    input: {
      backgroundColor: C.surface,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 14,
      textAlign: 'center',
      fontSize: 24,
      fontWeight: '900',
      letterSpacing: 4,
      color: C.text,
      borderWidth: 2,
    },
    errorBox: {
      backgroundColor: C.wrong + '15',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: C.wrong + '40',
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    error: {
      color: C.wrong,
      fontSize: 14,
      fontWeight: '700',
    },
    successBox: {
      backgroundColor: C.correct + '15',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: C.correct + '40',
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    success: {
      color: C.correct,
      fontSize: 14,
      fontWeight: '700',
    },
    btn: {
      backgroundColor: C.brand,
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: 8,
    },
    btnDisabled: {
      opacity: 0.5,
    },
    btnText: {
      color: '#fff',
      fontWeight: '800',
      fontSize: 15,
    },
  })
}
