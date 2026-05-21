import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FriendsScreen        from '../screens/FriendsScreen'
import AddFriendScreen      from '../screens/AddFriendScreen'
import ChallengeScreen      from '../screens/ChallengeScreen'
import ChallengeResultScreen from '../screens/ChallengeResultScreen'

const Stack = createNativeStackNavigator()

export default function FriendsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Friends"         component={FriendsScreen} />
      <Stack.Screen name="AddFriend"       component={AddFriendScreen} />
      <Stack.Screen name="Challenge"       component={ChallengeScreen} />
      <Stack.Screen name="ChallengeResult" component={ChallengeResultScreen} />
    </Stack.Navigator>
  )
}
