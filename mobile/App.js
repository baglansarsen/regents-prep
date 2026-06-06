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
    // Initialize AdMob safely with double-wrapped error handling.
    // Native module initialization can throw exceptions that bypass normal JS error handling,
    // so we catch at import-time AND promise-catch level.
    const initAdMob = async () => {
      try {
        // Don't even try to import if the native module is definitely absent.
        // Platform.OS check fails on web; TurboModuleRegistry.get() checks on native.
        if (Platform.OS === 'web') return
        if (!TurboModuleRegistry?.get?.('RNGoogleMobileAdsModule')) {
          console.log('[AdMob] Native module not available')
          return
        }

        // Request ATT permission (returns false cleanly if unavailable)
        await import('./src/utils/adTracking')
          .then(({ requestAdTracking }) => requestAdTracking())
          .catch(() => false)

        // Import and initialize AdMob with exception guard
        const admobModule = await import('react-native-google-mobile-ads')
        if (!admobModule?.default) {
          console.warn('[AdMob] Module import succeeded but no default export')
          return
        }
        const MobileAds = admobModule.default
        await MobileAds().initialize()
        console.log('[AdMob] Initialized successfully')
      } catch (e) {
        console.warn('[AdMob] Initialization failed (ads disabled):', e?.message || String(e))
      }
    }

    initAdMob()
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
