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

const ADS_AVAILABLE = !!TurboModuleRegistry?.get?.('RNGoogleMobileAdsModule')

let _ads = null
function getAds() {
  if (!ADS_AVAILABLE) return {}
  if (_ads) return _ads
  try { _ads = require('react-native-google-mobile-ads') } catch { _ads = {} }
  return _ads
}

export default function App() {
  useEffect(() => {
    if (!ADS_AVAILABLE) return
    try {
      const { default: mobileAds } = getAds()
      if (typeof mobileAds === 'function') {
        mobileAds()
          .initialize()
          .then(adapterStatuses => {
            console.log('[AdMob] SDK Initialized', adapterStatuses)
          })
          .catch(err => {
            console.warn('[AdMob] SDK Initialization Error', err)
          })
      }
    } catch (err) {
      console.warn('[AdMob] Failed to load/initialize AdMob', err)
    }
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
