/**
 * ClassroomJoinScreen
 *
 * Two states:
 *   1. Not in a classroom → enter a 6-char join code → preview → confirm join
 *   2. Already in a classroom → show current class details + leave button
 *
 * Designed to drop into the existing navigation stack alongside
 * SchoolOnboardingScreen and FriendsScreen (same visual language).
 */
import React, { useState, useCallback } from 'react'
import {
  View, Text, TextInput, TouchableOpacity,
  ActivityIndicator, Alert, StyleSheet, ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useClassroom } from '../hooks/useClassroom'

const SUBJECT_LABELS = {
  'living-environment': 'Living Environment',
  'earth-science':      'Earth Science',
  'chemistry':          'Chemistry',
  'physics':            'Physics',
  'algebra-1':          'Algebra I',
  'algebra-2':          'Algebra II',
  'geometry':           'Geometry',
  'us-history':         'US History & Gov.',
  'global-history':     'Global History',
  'english':            'English (ELA)',
}

export default function ClassroomJoinScreen({ navigation }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const {
    classroom, loading, actionLoading,
    resolveCode, joinClassroom, leaveClassroom,
  } = useClassroom(user)

  const s = makeStyles(C)

  const [code,    setCode]    = useState('')
  const [preview, setPreview] = useState(null)   // resolved classroom before join
  const [looking, setLooking] = useState(false)  // resolveCode in progress

  // ── Resolve code as user types (debounce via onBlur instead) ───────────────
  const handleLookup = useCallback(async () => {
    const trimmed = code.trim().toUpperCase()
    if (trimmed.length < 4) return
    setLooking(true)
    setPreview(null)
    const result = await resolveCode(trimmed)
    setLooking(false)
    if (result) {
      setPreview(result)
    } else {
      Alert.alert('Code not found', 'Double-check the code with your teacher.')
    }
  }, [code, resolveCode])

  const handleJoin = useCallback(async () => {
    const status = await joinClassroom(code)
    if (status === 'success') {
      setCode('')
      setPreview(null)
      Alert.alert('Joined! 🎉', `You're now in ${preview?.name ?? 'the class'}.`)
    } else if (status === 'not_found') {
      Alert.alert('Code not found', 'Double-check the code with your teacher.')
    } else if (status === 'already_member') {
      Alert.alert('Already in a class', 'Leave your current class first.')
    } else {
      Alert.alert('Something went wrong', 'Please try again.')
    }
  }, [code, preview, joinClassroom])

  const handleLeave = useCallback(() => {
    Alert.alert(
      'Leave class?',
      `You'll be removed from ${classroom?.name ?? 'the class'}. You can rejoin anytime with the code.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Leave', style: 'destructive',
          onPress: async () => {
            const status = await leaveClassroom()
            if (status !== 'success') {
              Alert.alert('Something went wrong', 'Please try again.')
            }
          },
        },
      ],
    )
  }, [classroom, leaveClassroom])

  if (loading) {
    return (
      <SafeAreaView style={[s.safe, s.center]}>
        <ActivityIndicator color={C.brand} />
      </SafeAreaView>
    )
  }

  // ── Already in a classroom ─────────────────────────────────────────────────
  if (classroom) {
    return (
      <SafeAreaView style={s.safe}>
        <ScrollView contentContainerStyle={s.scroll}>
          <View style={s.header}>
            <Text style={s.emoji}>🏫</Text>
            <Text style={s.title}>Your Class</Text>
            <Text style={s.subtitle}>Your teacher can see your weekly progress.</Text>
          </View>

          <View style={s.card}>
            <Row label="Class" value={classroom.name} C={C} />
            <Divider C={C} />
            <Row label="Subject" value={SUBJECT_LABELS[classroom.subject] ?? classroom.subject} C={C} />
            <Divider C={C} />
            <Row label="Teacher" value={classroom.teacherName ?? 'Your teacher'} C={C} />
          </View>

          <View style={s.infoBox}>
            <Text style={[s.infoText, { color: C.textMuted }]}>
              Your streak and weekly XP are shared with your teacher automatically.
              No extra steps needed.
            </Text>
          </View>

          <TouchableOpacity
            style={[s.leaveBtn, actionLoading && s.disabled]}
            onPress={handleLeave}
            disabled={actionLoading}
          >
            {actionLoading
              ? <ActivityIndicator color={C.danger ?? '#ef4444'} size="small" />
              : <Text style={s.leaveBtnText}>Leave class</Text>
            }
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }

  // ── Not in a classroom — join flow ─────────────────────────────────────────
  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
        <View style={s.header}>
          <Text style={s.emoji}>🏫</Text>
          <Text style={s.title}>Join a Class</Text>
          <Text style={s.subtitle}>
            Enter the code your teacher gave you to connect your progress.
          </Text>
        </View>

        {/* Code input */}
        <View style={s.inputRow}>
          <TextInput
            style={s.codeInput}
            value={code}
            onChangeText={(t) => { setCode(t.toUpperCase()); setPreview(null) }}
            onSubmitEditing={handleLookup}
            placeholder="e.g. BIO42X"
            placeholderTextColor={C.textMuted}
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={8}
            returnKeyType="search"
          />
          <TouchableOpacity
            style={[s.lookupBtn, (looking || code.length < 4) && s.disabled]}
            onPress={handleLookup}
            disabled={looking || code.length < 4}
          >
            {looking
              ? <ActivityIndicator color="#fff" size="small" />
              : <Text style={s.lookupBtnText}>Find</Text>
            }
          </TouchableOpacity>
        </View>

        {/* Preview card — shown after a successful code lookup */}
        {preview && (
          <View style={s.previewCard}>
            <Text style={[s.previewLabel, { color: C.brand }]}>Class found ✓</Text>
            <Text style={[s.previewName, { color: C.text }]}>{preview.name}</Text>
            <Text style={[s.previewMeta, { color: C.textMuted }]}>
              {SUBJECT_LABELS[preview.subject] ?? preview.subject}
              {preview.teacherName ? ` · ${preview.teacherName}` : ''}
            </Text>

            <View style={[s.permissionBox, { backgroundColor: C.surface2, borderColor: C.border }]}>
              <Text style={[s.permissionTitle, { color: C.text }]}>What your teacher will see</Text>
              <Text style={[s.permissionItem, { color: C.textMuted }]}>✓ Days studied this week</Text>
              <Text style={[s.permissionItem, { color: C.textMuted }]}>✓ Weekly XP earned</Text>
              <Text style={[s.permissionItem, { color: C.textMuted }]}>✓ Current streak</Text>
              <Text style={[s.permissionItem, { color: C.textMuted }]}>✗ Individual answers or scores</Text>
            </View>

            <TouchableOpacity
              style={[s.joinBtn, actionLoading && s.disabled]}
              onPress={handleJoin}
              disabled={actionLoading}
            >
              {actionLoading
                ? <ActivityIndicator color="#fff" size="small" />
                : <Text style={s.joinBtnText}>Join class</Text>
              }
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setPreview(null)} style={s.cancelBtn}>
              <Text style={[s.cancelBtnText, { color: C.textMuted }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Empty state hint */}
        {!preview && (
          <Text style={[s.hint, { color: C.textMuted }]}>
            Ask your teacher for the class code. It looks like 6 letters and numbers.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

// ── Small reusable components ─────────────────────────────────────────────────

function Row({ label, value, C }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 16 }}>
      <Text style={{ fontSize: 14, color: C.textMuted }}>{label}</Text>
      <Text style={{ fontSize: 14, fontWeight: '700', color: C.text, flexShrink: 1, textAlign: 'right', marginLeft: 16 }}>{value}</Text>
    </View>
  )
}

function Divider({ C }) {
  return <View style={{ height: 1, backgroundColor: C.border, marginHorizontal: 16 }} />
}

// ── Styles ────────────────────────────────────────────────────────────────────

function makeStyles(C) {
  return StyleSheet.create({
    safe:    { flex: 1, backgroundColor: C.bg },
    center:  { alignItems: 'center', justifyContent: 'center' },
    scroll:  { padding: 20, paddingBottom: 40 },

    header:   { alignItems: 'center', marginBottom: 28 },
    emoji:    { fontSize: 48, marginBottom: 10 },
    title:    { fontSize: 22, fontWeight: '800', color: C.text, marginBottom: 6 },
    subtitle: { fontSize: 14, color: C.textMuted, textAlign: 'center', lineHeight: 20 },

    // Join flow
    inputRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
    codeInput: {
      flex: 1, backgroundColor: C.surface, borderRadius: 12,
      padding: 14, fontSize: 18, fontWeight: '700', letterSpacing: 2,
      color: C.text, borderWidth: 1, borderColor: C.border, textAlign: 'center',
    },
    lookupBtn: {
      backgroundColor: C.brand, borderRadius: 12,
      paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center',
    },
    lookupBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },

    previewCard: {
      backgroundColor: C.surface, borderRadius: 16,
      borderWidth: 1, borderColor: C.border, padding: 20, marginBottom: 20,
    },
    previewLabel: { fontSize: 12, fontWeight: '700', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
    previewName:  { fontSize: 18, fontWeight: '800', marginBottom: 4 },
    previewMeta:  { fontSize: 14, marginBottom: 16 },

    permissionBox: {
      borderRadius: 10, borderWidth: 1, padding: 14, marginBottom: 16,
    },
    permissionTitle: { fontSize: 13, fontWeight: '700', marginBottom: 8 },
    permissionItem:  { fontSize: 13, marginBottom: 4 },

    joinBtn: {
      backgroundColor: C.brand, borderRadius: 12,
      paddingVertical: 14, alignItems: 'center', marginBottom: 10,
    },
    joinBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },

    cancelBtn: { alignItems: 'center', paddingVertical: 8 },
    cancelBtnText: { fontSize: 14 },

    hint: { textAlign: 'center', fontSize: 13, lineHeight: 20 },

    // Current classroom view
    card: {
      backgroundColor: C.surface, borderRadius: 14,
      borderWidth: 1, borderColor: C.border, marginBottom: 16,
    },
    infoBox: {
      backgroundColor: C.surface2, borderRadius: 12,
      padding: 14, marginBottom: 24,
    },
    infoText: { fontSize: 13, lineHeight: 19, textAlign: 'center' },

    leaveBtn: {
      borderWidth: 1.5, borderColor: C.danger ?? '#ef4444',
      borderRadius: 12, paddingVertical: 14, alignItems: 'center',
    },
    leaveBtnText: { color: C.danger ?? '#ef4444', fontWeight: '700', fontSize: 15 },

    disabled: { opacity: 0.5 },
  })
}
