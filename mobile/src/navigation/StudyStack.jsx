import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen          from '../screens/HomeScreen'
import QuizScreen          from '../screens/QuizScreen'
import ResultsScreen       from '../screens/ResultsScreen'
import FlashcardScreen     from '../screens/FlashcardScreen'
import SpeedRoundScreen    from '../screens/SpeedRoundScreen'
import SkipChallengeScreen from '../screens/SkipChallengeScreen'
import StudyScreen         from '../screens/StudyScreen'
import GoalSetupScreen     from '../screens/GoalSetupScreen'
import GoalDetailScreen    from '../screens/GoalDetailScreen'

const Stack = createNativeStackNavigator()

export default function StudyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home"          component={HomeScreen} />
      <Stack.Screen name="Quiz"          component={QuizScreen} />
      <Stack.Screen name="Results"       component={ResultsScreen} />
      <Stack.Screen name="Flashcards"    component={FlashcardScreen} />
      <Stack.Screen name="SpeedRound"    component={SpeedRoundScreen} />
      <Stack.Screen name="SkipChallenge" component={SkipChallengeScreen} />
      <Stack.Screen name="Study"         component={StudyScreen} />
      <Stack.Screen name="GoalSetup"     component={GoalSetupScreen} />
      <Stack.Screen name="GoalDetail"    component={GoalDetailScreen} />
    </Stack.Navigator>
  )
}
