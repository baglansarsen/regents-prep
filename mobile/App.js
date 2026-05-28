import React, { useEffect } from 'react'
import { View, StyleSheet, TurboModuleRegistry } from 'react-native'
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

  return (
    <View style={s.root}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AppNavigator />
    </View>
  )
}

export default function App() {
  useEffect(() => {
    // Only initialize AdMob when the native module is present (custom dev build / production).
    // In Expo Go, RNGoogleMobileAdsModule is absent; TurboModuleRegistry.get() returns null.
    if (!TurboModuleRegistry.get('RNGoogleMobileAdsModule')) return
    import('react-native-google-mobile-ads')
      .then(({ default: MobileAds }) => MobileAds().initialize())
      .catch((e) => console.warn('[AdMob] init error:', e))
  }, [])

  return (
    <ThemeProvider>
      <SubjectProvider>
        <DoubleXPProvider>
          <AuthProvider>
            <SubscriptionProvider>
              <LivesProvider>
                <PetProvider>
                  <SpeechProvider>
                    <Inner />
                  </SpeechProvider>
                </PetProvider>
              </LivesProvider>
            </SubscriptionProvider>
          </AuthProvider>
        </DoubleXPProvider>
      </SubjectProvider>
    </ThemeProvider>
  )
}

const s = StyleSheet.create({
  root: { flex: 1 },
})
