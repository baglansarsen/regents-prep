import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

import LoginScreen              from '../screens/LoginScreen'
import IntroductionScreen       from '../screens/IntroductionScreen'
import SchoolOnboardingScreen   from '../screens/SchoolOnboardingScreen'
import SubjectOnboardingScreen  from '../screens/SubjectOnboardingScreen'
import PetPickerScreen, { petChosenKey } from '../screens/PetPickerScreen'
import TabNavigator             from './TabNavigator'
import FriendsStack             from './FriendsStack'
import FocusStack               from './FocusStack'
import ExamScreen               from '../screens/ExamScreen'
import ExamResultsScreen        from '../screens/ExamResultsScreen'
import PetShopScreen            from '../screens/PetShopScreen'
import PetEvolutionScreen       from '../screens/PetEvolutionScreen'

const Stack = createNativeStackNavigator()

function subjectChosenKey(uid) {
  return `@subject_chosen_v1_${uid}`
}

function schoolChosenKey(uid) {
  return `@school_chosen_v1_${uid}`
}

function introDoneKey(uid) {
  return `@intro_done_v1_${uid}`
}

export default function AppNavigator() {
  const { user, loading } = useAuthContext()
  const { C, isDark, themeChosen } = useTheme()

  // null = still checking, true/false = resolved
  const [introDone,      setIntroDone]      = useState(null)
  const [petChosen,      setPetChosen]      = useState(null)
  const [subjectChosen,  setSubjectChosen]  = useState(null)
  const [schoolChosen,   setSchoolChosen]   = useState(null)

  useEffect(() => {
    if (!user) {
      setIntroDone(null)
      setPetChosen(null)
      setSubjectChosen(null)
      setSchoolChosen(null)
      return
    }
    if (user.isAnonymous) {
      setIntroDone(true)
      setPetChosen(true)
      setSubjectChosen(true)
      setSchoolChosen(true)   // anonymous users skip all pickers
      return
    }
    async function checkFlags() {
      try {
        const [introVal, petVal, subVal, schVal] = await Promise.all([
          AsyncStorage.getItem(introDoneKey(user.uid)),
          AsyncStorage.getItem(petChosenKey(user.uid)),
          AsyncStorage.getItem(subjectChosenKey(user.uid)),
          AsyncStorage.getItem(schoolChosenKey(user.uid)),
        ])

        // Fallback to Firestore for flags missing from AsyncStorage (new device / reinstall)
        const [introSnap, petSnap, subSnap, schSnap] = await Promise.all([
          !introVal ? getDoc(doc(db, 'users', user.uid, 'meta', 'intro')) : Promise.resolve(null),
          !petVal ? getDoc(doc(db, 'users', user.uid, 'meta', 'pet')) : Promise.resolve(null),
          !subVal ? getDoc(doc(db, 'users', user.uid, 'meta', 'subject')) : Promise.resolve(null),
          !schVal ? getDoc(doc(db, 'users', user.uid, 'meta', 'school')) : Promise.resolve(null),
        ])

        const introDoneVal = !!introVal || introSnap?.exists()
        const petDone = !!petVal || petSnap?.exists()
        const subDone = !!subVal || subSnap?.exists()
        const schDone = !!schVal || schSnap?.exists()

        // Re-stamp AsyncStorage so next launch is instant
        if (introDoneVal && !introVal) AsyncStorage.setItem(introDoneKey(user.uid), '1').catch(() => {})
        if (petDone && !petVal) AsyncStorage.setItem(petChosenKey(user.uid), '1').catch(() => {})
        if (subDone && !subVal) AsyncStorage.setItem(subjectChosenKey(user.uid), '1').catch(() => {})
        if (schDone && !schVal) AsyncStorage.setItem(schoolChosenKey(user.uid), '1').catch(() => {})

        setIntroDone(introDoneVal)
        setPetChosen(petDone)
        setSubjectChosen(subDone)
        setSchoolChosen(schDone)
      } catch {
        setIntroDone(false)
        setPetChosen(false)
        setSubjectChosen(false)
        setSchoolChosen(false)
      }
    }
    checkFlags()
  }, [user])

  const isLoading =
    (loading && !user) ||
    themeChosen === null ||
    (!!user && !user.isAnonymous && (
      introDone === null || petChosen === null || subjectChosen === null || schoolChosen === null
    ))

  const [forceLoad, setForceLoad] = useState(false)

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setForceLoad(true), 6000)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (isLoading && !forceLoad) {
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

        {/* ── 1. Auth flow (theme picker onboarding removed — dark by default) ── */}
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />

        ) : !introDone ? (
          /* ── 2.5. App Introduction Carousel ─────────────────────────────────── */
          <Stack.Screen name="Introduction" options={{ animation: 'fade' }}>
            {(props) => (
              <IntroductionScreen
                {...props}
                onComplete={async () => {
                  try {
                    await AsyncStorage.setItem(introDoneKey(user.uid), '1')
                    await setDoc(doc(db, 'users', user.uid, 'meta', 'intro'), {
                      value: true,
                      updatedAt: new Date().toISOString()
                    }, { merge: true })
                  } catch {}
                  setIntroDone(true)
                }}
              />
            )}
          </Stack.Screen>

        ) : !petChosen ? (
          /* ── 3. Pet picker — once per user ──────────────────────────────── */
          <Stack.Screen name="PetPicker" options={{ animation: 'slide_from_bottom' }}>
            {(props) => <PetPickerScreen {...props} onComplete={() => setPetChosen(true)} />}
          </Stack.Screen>

        ) : !subjectChosen ? (
          /* ── 4. Subject / Regents picker — once per user ─────────────────── */
          <Stack.Screen name="SubjectOnboarding" options={{ animation: 'fade' }}>
            {(props) => (
              <SubjectOnboardingScreen
                {...props}
                onComplete={async () => {
                  await AsyncStorage.setItem(subjectChosenKey(user.uid), '1')
                  setSubjectChosen(true)
                }}
              />
            )}
          </Stack.Screen>

        ) : !schoolChosen ? (
          /* ── 5. School picker — once per user ───────────────────────────── */
          <Stack.Screen name="SchoolOnboarding" options={{ animation: 'fade' }}>
            {(props) => (
              <SchoolOnboardingScreen
                {...props}
                onComplete={async () => {
                  await AsyncStorage.setItem(schoolChosenKey(user.uid), '1')
                  setSchoolChosen(true)
                }}
              />
            )}
          </Stack.Screen>

        ) : (
          /* ── 6. Main app ──────────────────────────────────────────────────── */
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
            <Stack.Screen name="FriendsMain" component={FriendsStack}
              options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
            <Stack.Screen name="FocusMain" component={FocusStack}
              options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  )
}

const s = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
