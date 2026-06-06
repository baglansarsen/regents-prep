import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TurboModuleRegistry, Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import {
  useFonts,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from '@expo-google-fonts/nunito'
import { ThemeProvider, useTheme } from './src/context/ThemeContext'
import { AuthProvider } from './src/context/AuthContext'
import { SubjectProvider } from './src/context/SubjectContext'
import { DoubleRPProvider } from './src/context/DoubleRPContext'
import { LivesProvider } from './src/context/LivesContext'
import { SubscriptionProvider } from './src/context/SubscriptionContext'
import { PetProvider }    from './src/context/PetContext'
import { SpeechProvider } from './src/context/SpeechContext'
import { StreakProvider } from './src/context/StreakContext'
import AppNavigator from './src/navigation/AppNavigator'

if (Platform.OS !== 'web') SplashScreen.preventAutoHideAsync()

function Inner() {
  const { isDark } = useTheme()
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
  })
  const [fontTimeout, setFontTimeout] = useState(false)

  useEffect(() => {
    if (fontsLoaded && Platform.OS !== 'web') SplashScreen.hideAsync()
  }, [fontsLoaded])

  // On web, don't block forever if fonts fail — render after 3 s regardless
  useEffect(() => {
    if (Platform.OS !== 'web') return
    const t = setTimeout(() => setFontTimeout(true), 3000)
    return () => clearTimeout(t)
  }, [])

  if (!fontsLoaded && !fontTimeout) return null

  const rootStyle = Platform.OS === 'web'
    ? [s.root, s.webContainer, { backgroundColor: isDark ? '#0f172a' : '#ffffff', borderColor: isDark ? '#1e293b' : '#cbd5e1', height: '100%' }]
    : s.root;

  const wrapperStyle = Platform.OS === 'web'
    ? { flex: 1, backgroundColor: isDark ? '#020617' : '#f1f5f9', justifyContent: 'center', minHeight: '100vh', height: '100vh' }
    : { flex: 1 };

  return (
    <View style={wrapperStyle}>
      <View style={rootStyle}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <AppNavigator />
      </View>
    </View>
  )
}

export default function App() {
  useEffect(() => {
    // TEMPORARILY DISABLED: AdMob initialization causing native crash on startup.
    // The TurboModule manager is throwing an uncaught exception during initialization.
    // To diagnose, will try without AdMob first, then rebuild with proper native module.
    return

    // Only initialize AdMob when the native module is present (custom dev build / production).
    // In Expo Go the module is absent; on web TurboModuleRegistry itself may be
    // undefined — optional chaining makes both cases a clean no-op.
    if (!TurboModuleRegistry?.get?.('RNGoogleMobileAdsModule')) return
    // Show the ATT prompt before accessing the IDFA, then initialize AdMob.
    import('./src/utils/adTracking')
      .then(({ requestAdTracking }) => requestAdTracking())
      .catch(() => {})
      .then(() => import('react-native-google-mobile-ads'))
      .then(({ default: MobileAds }) => MobileAds().initialize())
      .catch((e) => console.warn('[AdMob] init error:', e))
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider>
      <AuthProvider>
        <SubjectProvider>
          <DoubleRPProvider>
            <SubscriptionProvider>
              <LivesProvider>
                <PetProvider>
                  <SpeechProvider>
                    <StreakProvider>
                      <Inner />
                    </StreakProvider>
                  </SpeechProvider>
                </PetProvider>
              </LivesProvider>
            </SubscriptionProvider>
          </DoubleRPProvider>
        </SubjectProvider>
      </AuthProvider>
    </ThemeProvider>
    </GestureHandlerRootView>
  )
}

const s = StyleSheet.create({
  root: { flex: 1 },
  webContainer: {
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
})
