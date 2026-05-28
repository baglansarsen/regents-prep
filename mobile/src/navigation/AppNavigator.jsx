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
import PetPickerScreen, { petChosenKey } from '../screens/PetPickerScreen'
import TabNavigator           from './TabNavigator'
import ExamScreen             from '../screens/ExamScreen'
import ExamResultsScreen      from '../screens/ExamResultsScreen'
import PetShopScreen          from '../screens/PetShopScreen'
import PetEvolutionScreen     from '../screens/PetEvolutionScreen'

const Stack = createNativeStackNavigator()

function placementKey(uid) {
  return `@placementDone_v1_${uid}`
}

export default function AppNavigator() {
  const { user, loading } = useAuthContext()
  const { C, isDark, themeChosen } = useTheme()

  // null = still checking, true/false = resolved
  const [placementDone, setPlacementDone] = useState(null)
  const [petChosen,     setPetChosen]     = useState(null)

  useEffect(() => {
    if (!user) {
      setPlacementDone(null)
      setPetChosen(null)
      return
    }
    if (user.isAnonymous) {
      setPlacementDone(true)
      setPetChosen(true)   // anonymous users skip pet picker
      return
    }
    Promise.all([
      AsyncStorage.getItem(placementKey(user.uid)),
      AsyncStorage.getItem(petChosenKey(user.uid)),
    ])
      .then(([pVal, petVal]) => {
        setPlacementDone(!!pVal)
        setPetChosen(!!petVal)
      })
      .catch(() => {
        setPlacementDone(false)
        setPetChosen(false)
      })
  }, [user])

  const isLoading =
    loading ||
    themeChosen === null ||
    (!!user && !user.isAnonymous && (placementDone === null || petChosen === null))

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

        {/* ── 1. Theme picker — first launch only ──────────────────────────── */}
        {!themeChosen ? (
          <Stack.Screen name="ThemePicker">
            {() => <ThemePickerScreen onComplete={() => {/* themeChosen flips via pickTheme */}} />}
          </Stack.Screen>

        ) : !user ? (
          /* ── 2. Auth flow ─────────────────────────────────────────────────── */
          <>
            <Stack.Screen name="Login"            component={LoginScreen} />
            <Stack.Screen name="SchoolOnboarding" component={SchoolOnboardingScreen} />
          </>

        ) : !placementDone ? (
          /* ── 3. Placement test — once per user ──────────────────────────── */
          <Stack.Screen name="PlacementTest">
            {() => <PlacementTestScreen onComplete={() => setPlacementDone(true)} />}
          </Stack.Screen>

        ) : !petChosen ? (
          /* ── 4. Pet picker — once per user ──────────────────────────────── */
          <Stack.Screen name="PetPicker" options={{ animation: 'slide_from_bottom' }}>
            {() => <PetPickerScreen onComplete={() => setPetChosen(true)} />}
          </Stack.Screen>

        ) : (
          /* ── 5. Main app ──────────────────────────────────────────────────── */
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="Exam" component={ExamScreen}
              options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
            <Stack.Screen name="ExamResults" component={ExamResultsScreen}
              options={{ presentation: 'fullScreenModal', animation: 'none' }} />
            <Stack.Screen name="PetShop" component={PetShopScreen}
              options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
            <Stack.Screen name="PetEvolution" component={PetEvolutionScreen}
              options={{ presentation: 'fullScreenModal', animation: 'fade' }} />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  )
}

const s = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
