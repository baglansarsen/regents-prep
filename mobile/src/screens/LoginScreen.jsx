import React, { useState, useEffect } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert, Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as AppleAuthentication from 'expo-apple-authentication'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../hooks/useAuth'
import { T, duoBtn, duoBtnOutline, cardShadow } from '../styles/duo'

// Lazy-load auth-session so requireNativeModule('ExpoWebBrowser') doesn't throw
// at module eval time in builds where the native module isn't registered yet.
let Google = null
let WebBrowser = null
let AuthSession = null
try {
  WebBrowser  = require('expo-web-browser')
  Google      = require('expo-auth-session/providers/google')
  AuthSession = require('expo-auth-session')
  WebBrowser.maybeCompleteAuthSession()
} catch (_) {}

const GOOGLE_WEB_CLIENT_ID = '752904748328-5areedgem0c4na3cuihfliraskr8vlrt.apps.googleusercontent.com'
const GOOGLE_IOS_CLIENT_ID = '752904748328-82me96mfpu3vhv9qm2f5u300qllktr4t.apps.googleusercontent.com'
const GOOGLE_AND_CLIENT_ID = '752904748328-5areedgem0c4na3cuihfliraskr8vlrt.apps.googleusercontent.com' // Using Web ID for Android in Expo

// Separate hook so Google.useAuthRequest is only called when the native module loaded.
// Rules of Hooks: hooks must be called unconditionally, so we call this hook always
// but return a no-op when Google is null (module failed to load).
function useGoogleAuth(signInWithGoogleToken, setLoading) {
  const noop = { ready: false, prompt: () => {} }
  // Always call the hook — but Google.useAuthRequest is swapped for a stub when unavailable
  const useRequest = Google?.useAuthRequest ?? (() => [null, null, () => {}])

  // Wrap in try-catch if possible, but hooks can't be conditional.
  // expo-auth-session throws IF the platform is android and androidClientId is missing.
  const [request, response, promptAsync] = useRequest({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_AND_CLIENT_ID,
  })

  useEffect(() => {
    if (!Google || response?.type !== 'success') return
    const idToken = response.params?.id_token
    if (!idToken) { Alert.alert('Sign in failed', 'No ID token from Google.'); return }
    setLoading(true)
    signInWithGoogleToken(idToken)
      .catch((e) => Alert.alert('Sign in failed', e.message))
      .finally(() => setLoading(false))
  }, [response])

  if (!Google) return noop
  // ready only once the request object is prepared (not null)
  return { ready: !!request, prompt: promptAsync }
}

export default function LoginScreen({ navigation }) {
  const { C } = useTheme()
  const { signInWithEmail, signUpWithEmail, signInAsGuest, signInWithApple, signInWithGoogleToken } = useAuth()

  const [mode, setMode]         = useState('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [name, setName]         = useState('')
  const [loading, setLoading]   = useState(false)

  const googleAuth = useGoogleAuth(signInWithGoogleToken, setLoading)

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
      // ERR_CANCELED means the user closed the sheet — don't show an error
      if (e.code !== 'ERR_CANCELED') {
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
            <Text style={[T.h1, { color: C.text, marginTop: 10, textAlign: 'center' }]}>
              Regentify
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
              <View style={s.inputWrap}>
                <Text style={s.inputIcon}>👤</Text>
                <TextInput
                  style={s.input}
                  placeholder="Your name"
                  placeholderTextColor={C.textDim}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            )}
            <View style={s.inputWrap}>
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
              />
            </View>
            <View style={s.inputWrap}>
              <Text style={s.inputIcon}>🔒</Text>
              <TextInput
                style={s.input}
                placeholder="Password"
                placeholderTextColor={C.textDim}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={duoBtn(C.brand, C.brandDark, { marginTop: 8 })}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={[T.btn, { color: '#fff' }]}>{mode === 'login' ? 'LOG IN' : 'CREATE ACCOUNT'}</Text>
              }
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={s.divider}>
            <View style={s.divLine} />
            <Text style={[T.label, { color: C.textMuted }]}>OR</Text>
            <View style={s.divLine} />
          </View>

          {/* Google Sign-In */}
          <TouchableOpacity
            style={s.googleBtn}
            onPress={() => googleAuth.prompt()}
            disabled={loading || !googleAuth.ready}
          >
            <Text style={s.googleG}>G</Text>
            <Text style={[T.btn, { color: '#3c4043', fontSize: 14 }]}>CONTINUE WITH GOOGLE</Text>
          </TouchableOpacity>

          {/* Guest */}
          <TouchableOpacity
            style={[duoBtnOutline(C.border), { marginTop: 10 }]}
            onPress={handleGuest}
            disabled={loading}
          >
            <Text style={[T.btn, { color: C.textMuted }]}>CONTINUE AS GUEST</Text>
          </TouchableOpacity>
          <Text style={[T.label, { color: C.textDim, textAlign: 'center', marginTop: 10, textTransform: 'none', letterSpacing: 0 }]}>
            Progress saved locally. Link an account any time.
          </Text>

          {/* Apple Sign-In — requires paid Apple Developer account; hidden for dev builds */}
          {false && Platform.OS === 'ios' && (
            <>
              <View style={s.divider}>
                <View style={s.divLine} />
                <Text style={[T.label, { color: C.textMuted }]}>OR</Text>
                <View style={s.divLine} />
              </View>
              <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={14}
                style={s.appleBtn}
                onPress={handleApple}
              />
            </>
          )}

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
    appleBtn:   { width: '100%', height: 52 },
  })
}
