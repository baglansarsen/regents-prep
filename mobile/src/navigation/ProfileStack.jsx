import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen        from '../screens/ProfileScreen'
import ShopScreen           from '../screens/ShopScreen'
import SupportScreen        from '../screens/SupportScreen'
import SchoolOnboardingScreen from '../screens/SchoolOnboardingScreen'

const Stack = createNativeStackNavigator()

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Profile"      component={ProfileScreen} />
      <Stack.Screen name="Shop"         component={ShopScreen} />
      <Stack.Screen name="Support"      component={SupportScreen} />
      <Stack.Screen name="SchoolChange">
        {(props) => (
          <SchoolOnboardingScreen
            {...props}
            onComplete={() => props.navigation.goBack()}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
