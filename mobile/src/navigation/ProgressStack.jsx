import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProgressScreen     from '../screens/ProgressScreen'
import AchievementsScreen from '../screens/AchievementsScreen'
import AnalyticsScreen    from '../screens/AnalyticsScreen'

const Stack = createNativeStackNavigator()

export default function ProgressStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Progress"     component={ProgressScreen} />
      <Stack.Screen name="Achievements" component={AchievementsScreen} />
      <Stack.Screen name="Analytics"    component={AnalyticsScreen} />
    </Stack.Navigator>
  )
}
