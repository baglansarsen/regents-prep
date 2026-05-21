import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuthContext } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

import LoginScreen          from '../screens/LoginScreen'
import SchoolOnboardingScreen from '../screens/SchoolOnboardingScreen'
import TabNavigator         from './TabNavigator'

const Stack = createNativeStackNavigator()

export default function AppNavigator() {
  const { user, loading } = useAuthContext()
  const { C, isDark } = useTheme()

  if (loading) {
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
          primary: C.brand,
          background: C.bg,
          card: C.surface,
          text: C.text,
          border: C.border,
          notification: C.brand,
        },
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // Auth flow
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SchoolOnboarding" component={SchoolOnboardingScreen} />
          </>
        ) : (
          // Main app
          <Stack.Screen name="Main" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const s = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
