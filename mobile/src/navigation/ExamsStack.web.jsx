import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ExamPickerScreen  from '../screens/ExamPickerScreen'

const Stack = createStackNavigator()

export default function ExamsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExamPicker" component={ExamPickerScreen} />
    </Stack.Navigator>
  )
}
