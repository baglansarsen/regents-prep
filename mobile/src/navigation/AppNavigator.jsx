import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuthContext } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

import ThemePickerScreen      from '../screens/ThemePickerScreen'
import LoginScreen            from '../screens/LoginScreen'
import SchoolOnboardingScreen from '../screens/SchoolOnboardingScreen'
import PlacementTestScreen    from '../screens/PlacementTestScreen'
import TabNavigator           from './TabNavigator'
import ExamScreen             from '../screens/ExamScreen'
import ExamResultsScreen      from '../screens/ExamResultsScreen'

const Stack = createNativeStackNavigator()

function placementKey(uid) {
  return `@placementDone_v1_${uid}`
}

export default function AppNavigator() {
  const { user, loading } = useAuthContext()
  const { C, isDark, themeChosen, pickTheme } = useTheme()

  // null = still checking, true/false = resolved
  const [placementDone, setPlacementDone] = useState(null)

  useEffect(() => {
    if (!user) {
      setPlacementDone(null)
      return
    }
    if (user.isAnonymous) {
      setPlacementDone(true)
      return
    }
    AsyncStorage.getItem(placementKey(user.uid))
      .then((val) => setPlacementDone(!!val))
      .catch(() => setPlacementDone(false))
  }, [user])

  // Still loading auth state OR (logged in & checking placement)
  const isLoading =
    loading ||
    themeChosen === null ||   // ThemeContext hasn't read AsyncStorage yet
    (!!user && !user.isAnonymous && placementDone === null)

  if (isLoading) {
    return (
      <View style={[s.loader, { backgroundColor: C.bg }]}>
        <ActivityIndicator size="large" color={C.brand} />
      </View>
    )
  }

  return (
    <NavigationContainer
      theme={{
        dark: isDark,
        colors: {
          primary:      C.brand,
          background:   C.bg,
          card:         C.surface,
          text:         C.text,
          border:       C.border,
          notification: C.brand,
        },
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>

        {/* ── 1. Theme picker — first launch only ─────────────────────────── */}
        {!themeChosen ? (
          <Stack.Screen name="ThemePicker">
            {() => <ThemePickerScreen onComplete={() => {/* themeChosen flips via pickTheme */}} />}
          </Stack.Screen>

        ) : !user ? (
          /* ── 2. Auth flow ────────────────────────────────────────────────── */
          <>
            <Stack.Screen name="Login"            component={LoginScreen} />
            <Stack.Screen name="SchoolOnboarding" component={SchoolOnboardingScreen} />
          </>

        ) : !placementDone ? (
          /* ── 3. Placement test — once per user ───────────────────────────── */
          <Stack.Screen name="PlacementTest">
            {() => <PlacementTestScreen onComplete={() => setPlacementDone(true)} />}
          </Stack.Screen>

        ) : (
          /* ── 4. Main app ─────────────────────────────────────────────────── */
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="Exam" component={ExamScreen}
              options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
            <Stack.Screen name="ExamResults" component={ExamResultsScreen}
              options={{ presentation: 'fullScreenModal', animation: 'none' }} />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  )
}

const s = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
