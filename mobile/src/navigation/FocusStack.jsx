import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FocusScreen        from '../screens/FocusScreen'
import FocusHistoryScreen from '../screens/FocusHistoryScreen'

const Stack = createNativeStackNavigator()

export default function FocusStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FocusHome"    component={FocusScreen} />
      <Stack.Screen name="FocusHistory" component={FocusHistoryScreen} />
    </Stack.Navigator>
  )
}
