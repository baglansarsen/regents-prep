import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useReadableContentStyle } from '../hooks/useLayout'
import ExamPickerScreen  from '../screens/ExamPickerScreen'

const Stack = createNativeStackNavigator()

export default function ExamsStack() {
  const contentStyle = useReadableContentStyle()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle }}>
      <Stack.Screen name="ExamPicker" component={ExamPickerScreen} />
    </Stack.Navigator>
  )
}
