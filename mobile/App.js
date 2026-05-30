import React, { useEffect } from 'react'
import { View, StyleSheet, TurboModuleRegistry, Platform } from 'react-native'
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
import { DoubleXPProvider } from './src/context/DoubleXPContext'
import { LivesProvider } from './src/context/LivesContext'
import { SubscriptionProvider } from './src/context/SubscriptionContext'
import { PetProvider }    from './src/context/PetContext'
import { SpeechProvider } from './src/context/SpeechContext'
import AppNavigator from './src/navigation/AppNavigator'

SplashScreen.preventAutoHideAsync()

function Inner() {
  const { isDark } = useTheme()
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
  })

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded])

  if (!fontsLoaded) return null

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
    // Only initialize AdMob when the native module is present (custom dev build / production).
    // In Expo Go the module is absent; on web TurboModuleRegistry itself may be
    // undefined — optional chaining makes both cases a clean no-op.
    if (!TurboModuleRegistry?.get?.('RNGoogleMobileAdsModule')) return
    import('react-native-google-mobile-ads')
      .then(({ default: MobileAds }) => MobileAds().initialize())
      .catch((e) => console.warn('[AdMob] init error:', e))
  }, [])

  return (
    <ThemeProvider>
      <AuthProvider>
        <SubjectProvider>
          <DoubleXPProvider>
            <SubscriptionProvider>
              <LivesProvider>
                <PetProvider>
                  <SpeechProvider>
                    <Inner />
                  </SpeechProvider>
                </PetProvider>
              </LivesProvider>
            </SubscriptionProvider>
          </DoubleXPProvider>
        </SubjectProvider>
      </AuthProvider>
    </ThemeProvider>
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
