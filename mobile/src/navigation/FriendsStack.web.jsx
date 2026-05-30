import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FriendsScreen         from '../screens/FriendsScreen'
import AddFriendScreen       from '../screens/AddFriendScreen'
import ChallengeScreen       from '../screens/ChallengeScreen'
import ChallengeResultScreen from '../screens/ChallengeResultScreen'
import UserProfileScreen     from '../screens/UserProfileScreen'
import LeagueScreen          from '../screens/LeagueScreen'

const Stack = createStackNavigator()

export default function FriendsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Friends"         component={FriendsScreen} />
      <Stack.Screen name="League"          component={LeagueScreen} />
      <Stack.Screen name="AddFriend"       component={AddFriendScreen} />
      <Stack.Screen name="UserProfile"     component={UserProfileScreen} />
      <Stack.Screen name="Challenge"       component={ChallengeScreen} />
      <Stack.Screen name="ChallengeResult" component={ChallengeResultScreen} />
    </Stack.Navigator>
  )
}
