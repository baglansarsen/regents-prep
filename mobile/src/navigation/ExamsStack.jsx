import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ExamPickerScreen  from '../screens/ExamPickerScreen'
import ExamScreen        from '../screens/ExamScreen'
import ExamResultsScreen from '../screens/ExamResultsScreen'

const Stack = createNativeStackNavigator()

export default function ExamsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExamPicker"  component={ExamPickerScreen} />
      <Stack.Screen name="Exam"        component={ExamScreen} />
      <Stack.Screen name="ExamResults" component={ExamResultsScreen} />
    </Stack.Navigator>
  )
}
