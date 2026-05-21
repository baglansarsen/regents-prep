import React, { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../hooks/useAuth'

export default function LoginScreen({ navigation }) {
  const { C } = useTheme()
  const { signInWithEmail, signUpWithEmail, signInAsGuest } = useAuth()

  const [mode, setMode]         = useState('login') // 'login' | 'signup'
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [name, setName]         = useState('')
  const [loading, setLoading]   = useState(false)

  const s = makeStyles(C)

  async function handleSubmit() {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Please enter your email and password.')
      return
    }
    setLoading(true)
    try {
      if (mode === 'login') {
        await signInWithEmail(email.trim(), password)
      } else {
        if (!name.trim()) { Alert.alert('Missing name', 'Please enter your name.'); setLoading(false); return }
        await signUpWithEmail(email.trim(), password, name.trim())
        navigation.replace('SchoolOnboarding')
      }
    } catch (e) {
      Alert.alert('Error', e.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGuest() {
    setLoading(true)
    try {
      await signInAsGuest()
    } catch (e) {
      Alert.alert('Error', e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
          {/* Logo / header */}
          <View style={s.header}>
            <Text style={s.logo}>🎓</Text>
            <Text style={s.title}>Regents Prep</Text>
            <Text style={s.subtitle}>Ace your NY Regents exams</Text>
          </View>

          {/* Mode toggle */}
          <View style={s.toggle}>
            <TouchableOpacity
              style={[s.toggleBtn, mode === 'login' && s.toggleActive]}
              onPress={() => setMode('login')}
            >
              <Text style={[s.toggleText, mode === 'login' && s.toggleTextActive]}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.toggleBtn, mode === 'signup' && s.toggleActive]}
              onPress={() => setMode('signup')}
            >
              <Text style={[s.toggleText, mode === 'signup' && s.toggleTextActive]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={s.form}>
            {mode === 'signup' && (
              <TextInput
                style={s.input}
                placeholder="Your name"
                placeholderTextColor={C.textDim}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            )}
            <TextInput
              style={s.input}
              placeholder="Email address"
              placeholderTextColor={C.textDim}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              style={s.input}
              placeholder="Password"
              placeholderTextColor={C.textDim}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={s.primaryBtn} onPress={handleSubmit} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={s.primaryBtnText}>{mode === 'login' ? 'Log In' : 'Create Account'}</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={s.divider}>
            <View style={s.dividerLine} />
            <Text style={s.dividerText}>or</Text>
            <View style={s.dividerLine} />
          </View>

          {/* Guest */}
          <TouchableOpacity style={s.guestBtn} onPress={handleGuest} disabled={loading}>
            <Text style={s.guestBtnText}>Continue as Guest</Text>
          </TouchableOpacity>
          <Text style={s.guestNote}>Your progress will be saved locally. You can create an account later.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:            { flex: 1, backgroundColor: C.bg },
    scroll:          { flexGrow: 1, padding: 24, justifyContent: 'center' },
    header:          { alignItems: 'center', marginBottom: 36 },
    logo:            { fontSize: 56 },
    title:           { fontSize: 28, fontWeight: '800', color: C.text, marginTop: 8 },
    subtitle:        { fontSize: 15, color: C.textMuted, marginTop: 4 },
    toggle:          { flexDirection: 'row', backgroundColor: C.surface2, borderRadius: 12, padding: 4, marginBottom: 24 },
    toggleBtn:       { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
    toggleActive:    { backgroundColor: C.brand },
    toggleText:      { fontSize: 15, fontWeight: '600', color: C.textMuted },
    toggleTextActive:{ color: '#fff' },
    form:            { gap: 12 },
    input:           { backgroundColor: C.surface, borderRadius: 12, padding: 14, color: C.text, fontSize: 15, borderWidth: 1, borderColor: C.border },
    primaryBtn:      { backgroundColor: C.brand, borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 4 },
    primaryBtnText:  { color: '#fff', fontSize: 16, fontWeight: '700' },
    divider:         { flexDirection: 'row', alignItems: 'center', marginVertical: 24, gap: 12 },
    dividerLine:     { flex: 1, height: 1, backgroundColor: C.border },
    dividerText:     { color: C.textMuted, fontSize: 13 },
    guestBtn:        { borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 14, alignItems: 'center' },
    guestBtnText:    { color: C.text, fontSize: 15, fontWeight: '600' },
    guestNote:       { textAlign: 'center', color: C.textMuted, fontSize: 12, marginTop: 10 },
  })
}
