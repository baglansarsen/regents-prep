import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

import ThemePickerScreen        from '../screens/ThemePickerScreen'
import LoginScreen              from '../screens/LoginScreen'
import IntroductionScreen       from '../screens/IntroductionScreen'
import SchoolOnboardingScreen   from '../screens/SchoolOnboardingScreen'
import SubjectOnboardingScreen  from '../screens/SubjectOnboardingScreen'
import PetPickerScreen, { petChosenKey } from '../screens/PetPickerScreen'
import TabNavigator             from './TabNavigator'
import ExamScreen               from '../screens/ExamScreen'
import ExamResultsScreen        from '../screens/ExamResultsScreen'
import PetShopScreen            from '../screens/PetShopScreen'
import PetEvolutionScreen       from '../screens/PetEvolutionScreen'

const Stack = createStackNavigator()

function subjectChosenKey(uid) { return `@subject_chosen_v1_${uid}` }
function schoolChosenKey(uid)  { return `@school_chosen_v1_${uid}` }
function introDoneKey(uid)     { return `@intro_done_v1_${uid}` }

export default function AppNavigator() {
  const { user, loading } = useAuthContext()
  const { C, isDark, themeChosen } = useTheme()

  const [introDone,     setIntroDone]     = useState(null)
  const [petChosen,     setPetChosen]     = useState(null)
  const [subjectChosen, setSubjectChosen] = useState(null)
  const [schoolChosen,  setSchoolChosen]  = useState(null)

  useEffect(() => {
    if (!user) {
      setIntroDone(null); setPetChosen(null); setSubjectChosen(null); setSchoolChosen(null)
      return
    }
    if (user.isAnonymous) {
      setIntroDone(true); setPetChosen(true); setSubjectChosen(true); setSchoolChosen(true)
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
        const [introSnap, petSnap, subSnap, schSnap] = await Promise.all([
          !introVal ? getDoc(doc(db, 'users', user.uid, 'meta', 'intro'))   : Promise.resolve(null),
          !petVal   ? getDoc(doc(db, 'users', user.uid, 'meta', 'pet'))     : Promise.resolve(null),
          !subVal   ? getDoc(doc(db, 'users', user.uid, 'meta', 'subject')) : Promise.resolve(null),
          !schVal   ? getDoc(doc(db, 'users', user.uid, 'meta', 'school'))  : Promise.resolve(null),
        ])
        const introDoneVal = !!introVal || introSnap?.exists()
        const petDone   = !!petVal  || petSnap?.exists()
        const subDone   = !!subVal  || subSnap?.exists()
        const schDone   = !!schVal  || schSnap?.exists()
        if (introDoneVal && !introVal) AsyncStorage.setItem(introDoneKey(user.uid), '1').catch(() => {})
        if (petDone  && !petVal)  AsyncStorage.setItem(petChosenKey(user.uid), '1').catch(() => {})
        if (subDone  && !subVal)  AsyncStorage.setItem(subjectChosenKey(user.uid), '1').catch(() => {})
        if (schDone  && !schVal)  AsyncStorage.setItem(schoolChosenKey(user.uid), '1').catch(() => {})
        setIntroDone(introDoneVal); setPetChosen(petDone); setSubjectChosen(subDone); setSchoolChosen(schDone)
      } catch {
        setIntroDone(false); setPetChosen(false); setSubjectChosen(false); setSchoolChosen(false)
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
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {!themeChosen ? (
          <Stack.Screen name="ThemePicker" component={ThemePickerScreen} />

        ) : !user ? (
          <Stack.Screen name="Login" component={LoginScreen} />

        ) : !introDone ? (
          <Stack.Screen name="Introduction">
            {(props) => (
              <IntroductionScreen
                {...props}
                onComplete={async () => {
                  try {
                    await AsyncStorage.setItem(introDoneKey(user.uid), '1')
                    await setDoc(doc(db, 'users', user.uid, 'meta', 'intro'), {
                      value: true, updatedAt: new Date().toISOString(),
                    }, { merge: true })
                  } catch {}
                  setIntroDone(true)
                }}
              />
            )}
          </Stack.Screen>

        ) : !petChosen ? (
          <Stack.Screen name="PetPicker">
            {(props) => <PetPickerScreen {...props} onComplete={() => setPetChosen(true)} />}
          </Stack.Screen>

        ) : !subjectChosen ? (
          <Stack.Screen name="SubjectOnboarding">
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
          <Stack.Screen name="SchoolOnboarding">
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
          <>
            <Stack.Screen name="Main"        component={TabNavigator} />
            <Stack.Screen name="Exam"        component={ExamScreen} />
            <Stack.Screen name="ExamResults" component={ExamResultsScreen} />
            <Stack.Screen name="PetShop"     component={PetShopScreen} />
            <Stack.Screen name="PetEvolution" component={PetEvolutionScreen} />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  )
}

const s = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
