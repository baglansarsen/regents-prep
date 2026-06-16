import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProgressScreen     from '../screens/ProgressScreen'
import AchievementsScreen from '../screens/AchievementsScreen'

const Stack = createNativeStackNavigator()

export default function ProgressStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Progress"     component={ProgressScreen} />
      <Stack.Screen name="Achievements" component={AchievementsScreen} />
    </Stack.Navigator>
  )
}
