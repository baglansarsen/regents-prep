import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ExamPickerScreen  from '../screens/ExamPickerScreen'

const Stack = createNativeStackNavigator()

export default function ExamsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExamPicker" component={ExamPickerScreen} />
    </Stack.Navigator>
  )
}
