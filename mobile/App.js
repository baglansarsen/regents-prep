import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { ThemeProvider, useTheme } from './src/context/ThemeContext'
import { AuthProvider } from './src/context/AuthContext'
import AppNavigator from './src/navigation/AppNavigator'

function Inner() {
  const { isDark } = useTheme()
  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AppNavigator />
    </>
  )
}

export default function App() {
  return (
    <GestureHandlerRootView style={s.root}>
      <ThemeProvider>
        <AuthProvider>
          <Inner />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

const s = StyleSheet.create({
  root: { flex: 1 },
})
