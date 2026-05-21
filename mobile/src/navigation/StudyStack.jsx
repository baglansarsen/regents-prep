import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen         from '../screens/HomeScreen'
import QuizScreen         from '../screens/QuizScreen'
import ResultsScreen      from '../screens/ResultsScreen'
import FlashcardScreen    from '../screens/FlashcardScreen'
import SpeedRoundScreen   from '../screens/SpeedRoundScreen'

const Stack = createNativeStackNavigator()

export default function StudyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home"       component={HomeScreen} />
      <Stack.Screen name="Quiz"       component={QuizScreen} />
      <Stack.Screen name="Results"    component={ResultsScreen} />
      <Stack.Screen name="Flashcards" component={FlashcardScreen} />
      <Stack.Screen name="SpeedRound" component={SpeedRoundScreen} />
    </Stack.Navigator>
  )
}
