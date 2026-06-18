import React, { useState, useRef, useEffect } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert, Image, Animated,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as AppleAuthentication from 'expo-apple-authentication'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../hooks/useAuth'
import { T, duoBtn, duoBtnOutline, cardShadow } from '../styles/duo'


export default function LoginScreen({ navigation }) {
  const { C } = useTheme()
  const { signInWithEmail, signUpWithEmail, signInAsGuest, signInWithApple, signInWithGoogle } = useAuth()

  const [mode, setMode]         = useState('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [name, setName]         = useState('')
  const [loading, setLoading]   = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [appleAvailable, setAppleAvailable] = useState(false)

  // Sign in with Apple is iOS 13+ only; show the button only where it's supported.
  useEffect(() => {
    let mounted = true
    AppleAuthentication.isAvailableAsync()
      .then((ok) => { if (mounted) setAppleAvailable(ok) })
      .catch(() => {})
    return () => { mounted = false }
  }, [])

  const submitScale = useRef(new Animated.Value(1)).current
  const googleScale = useRef(new Animated.Value(1)).current
  const guestScale  = useRef(new Animated.Value(1)).current

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
        // No manual navigation here; AppNavigator will handle the transition based on user state
      }
    } catch (e) {
      Alert.alert('Error', e.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGuest() {
    setLoading(true)
    try { await signInAsGuest() }
    catch (e) { Alert.alert('Error', e.message) }
    finally { setLoading(false) }
  }

  async function handleApple() {
    setLoading(true)
    try {
      await signInWithApple()
    } catch (e) {
      // User closed the sheet — don't show an error. expo-apple-authentication 7.x
      // rejects with ERR_REQUEST_CANCELED; older/native variants use ERR_CANCELED.
      if (e.code !== 'ERR_REQUEST_CANCELED' && e.code !== 'ERR_CANCELED') {
        Alert.alert('Sign in failed', e.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const s = makeStyles(C)

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          {/* Hero */}
          <View style={s.hero}>
            <Image source={require('../../assets/icon.png')} style={s.logo} resizeMode="contain" />
            <Text style={[T.h1, { marginTop: 10, textAlign: 'center' }]}>
              <Text style={{ color: C.text }}>Regent</Text><Text style={{ color: '#FFC93C' }}>ify</Text>
            </Text>
            <Text style={[T.body, { color: C.textMuted, marginTop: 4, textAlign: 'center' }]}>
              Learn smarter. Score higher.
            </Text>
          </View>

          {/* Mode toggle */}
          <View style={[s.toggle, cardShadow(C.shadow)]}>
            {['login', 'signup'].map((m) => (
              <TouchableOpacity
                key={m}
                style={[s.toggleBtn, mode === m && { backgroundColor: C.brand }]}
                onPress={() => setMode(m)}
              >
                <Text style={[T.body, { color: mode === m ? '#fff' : C.textMuted }]}>
                  {m === 'login' ? 'Log In' : 'Sign Up'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Form */}
          <View style={s.form}>
            {mode === 'signup' && (
              <View style={[s.inputWrap, focusedField === 'name' && { borderColor: C.brand }]}>
                <Text style={s.inputIcon}>👤</Text>
                <TextInput
                  style={s.input}
                  placeholder="Your name"
                  placeholderTextColor={C.textDim}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            )}
            <View style={[s.inputWrap, focusedField === 'email' && { borderColor: C.brand }]}>
              <Text style={s.inputIcon}>📧</Text>
              <TextInput
                style={s.input}
                placeholder="Email address"
                placeholderTextColor={C.textDim}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />
            </View>
            <View style={[s.inputWrap, focusedField === 'password' && { borderColor: C.brand }]}>
              <Text style={s.inputIcon}>🔒</Text>
              <TextInput
                style={s.input}
                placeholder="Password"
                placeholderTextColor={C.textDim}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            <Animated.View style={{ transform: [{ scale: submitScale }], width: '100%' }}>
              <TouchableOpacity
                style={duoBtn(C.brand, C.brandDark, { marginTop: 8, width: '100%' })}
                onPress={handleSubmit}
                disabled={loading}
                onPressIn={() => {
                  Animated.timing(submitScale, {
                    toValue: 0.96,
                    duration: 80,
                    useNativeDriver: true,
                  }).start()
                }}
                onPressOut={() => {
                  Animated.spring(submitScale, {
                    toValue: 1,
                    tension: 180,
                    friction: 12,
                    useNativeDriver: true,
                  }).start()
                }}
              >
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={[T.btn, { color: '#fff' }]}>{mode === 'login' ? 'LOG IN' : 'CREATE ACCOUNT'}</Text>
                }
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Divider */}
          <View style={s.divider}>
            <View style={s.divLine} />
            <Text style={[T.label, { color: C.textMuted }]}>OR</Text>
            <View style={s.divLine} />
          </View>

          {/* Apple Sign-In — grouped with Google; required by App Store Guideline 4.8. */}
          {appleAvailable && Platform.OS === 'ios' && (
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
              buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
              cornerRadius={14}
              style={s.appleBtn}
              onPress={handleApple}
            />
          )}

          {/* Google Sign-In */}
          <Animated.View style={{ transform: [{ scale: googleScale }], width: '100%' }}>
            <TouchableOpacity
              style={[s.googleBtn, { width: '100%' }]}
              onPress={async () => {
                setLoading(true)
                try { await signInWithGoogle() }
                catch (e) { Alert.alert('Sign in failed', e.message) }
                finally { setLoading(false) }
              }}
              disabled={loading}
              onPressIn={() => {
                Animated.timing(googleScale, {
                  toValue: 0.96,
                  duration: 80,
                  useNativeDriver: true,
                }).start()
              }}
              onPressOut={() => {
                Animated.spring(googleScale, {
                  toValue: 1,
                  tension: 180,
                  friction: 12,
                  useNativeDriver: true,
                }).start()
              }}
            >
              <Text style={s.googleG}>G</Text>
              <Text style={[T.btn, { color: '#3c4043', fontSize: 14 }]}>CONTINUE WITH GOOGLE</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ transform: [{ scale: guestScale }], width: '100%' }}>
            <TouchableOpacity
              style={[duoBtnOutline(C.border), { marginTop: 10, width: '100%' }]}
              onPress={handleGuest}
              disabled={loading}
              onPressIn={() => {
                Animated.timing(guestScale, {
                  toValue: 0.96,
                  duration: 80,
                  useNativeDriver: true,
                }).start()
              }}
              onPressOut={() => {
                Animated.spring(guestScale, {
                  toValue: 1,
                  tension: 180,
                  friction: 12,
                  useNativeDriver: true,
                }).start()
              }}
            >
              <Text style={[T.btn, { color: C.textMuted }]}>CONTINUE AS GUEST</Text>
            </TouchableOpacity>
          </Animated.View>
          <Text style={[T.label, { color: C.textDim, textAlign: 'center', marginTop: 10, textTransform: 'none', letterSpacing: 0 }]}>
            Progress saved locally. Link an account any time.
          </Text>

          <View style={{ height: 32 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:       { flex: 1, backgroundColor: C.bg },
    scroll:     { flexGrow: 1, padding: 24, paddingTop: 16 },
    hero:       { alignItems: 'center', marginBottom: 32, marginTop: 8 },
    logo:       { width: 100, height: 100, borderRadius: 22 },
    toggle:     { flexDirection: 'row', backgroundColor: C.surface2, borderRadius: 14, padding: 4, marginBottom: 24 },
    toggleBtn:  { flex: 1, paddingVertical: 11, borderRadius: 11, alignItems: 'center' },
    form:       { gap: 12 },
    inputWrap:  { flexDirection: 'row', alignItems: 'center', backgroundColor: C.surface, borderRadius: 14, borderWidth: 2, borderColor: C.border, paddingHorizontal: 14 },
    inputIcon:  { fontSize: 18, marginRight: 8 },
    input:      { flex: 1, paddingVertical: 14, color: C.text, fontFamily: 'Nunito_600SemiBold', fontSize: 15 },
    divider:    { flexDirection: 'row', alignItems: 'center', marginVertical: 22, gap: 12 },
    divLine:    { flex: 1, height: 1.5, backgroundColor: C.border },
    googleBtn:  {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
      backgroundColor: '#fff', borderRadius: 14, paddingVertical: 14,
      borderWidth: 1.5, borderColor: '#dadce0',
    },
    googleG:    { fontSize: 18, fontWeight: '700', color: '#4285F4', width: 20, textAlign: 'center' },
    appleBtn:   { width: '100%', height: 52, marginBottom: 10 },
  })
}
