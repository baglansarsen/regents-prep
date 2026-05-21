import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native'
import { useTheme } from '../context/ThemeContext'

// Study stack
import StudyStack from './StudyStack'
import ExamsStack from './ExamsStack'
import ProgressStack from './ProgressStack'
import FriendsStack from './FriendsStack'

const Tab = createBottomTabNavigator()

function TabIcon({ emoji, focused, color }) {
  return <Text style={{ fontSize: focused ? 22 : 20, opacity: focused ? 1 : 0.6 }}>{emoji}</Text>
}

export default function TabNavigator() {
  const { C } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: C.tabBar,
          borderTopColor: C.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarActiveTintColor: C.tabActive,
        tabBarInactiveTintColor: C.tabInactive,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tab.Screen
        name="StudyTab"
        component={StudyStack}
        options={{
          tabBarLabel: 'Study',
          tabBarIcon: ({ focused, color }) => <TabIcon emoji="📚" focused={focused} color={color} />,
        }}
      />
      <Tab.Screen
        name="ExamsTab"
        component={ExamsStack}
        options={{
          tabBarLabel: 'Exams',
          tabBarIcon: ({ focused, color }) => <TabIcon emoji="📄" focused={focused} color={color} />,
        }}
      />
      <Tab.Screen
        name="ProgressTab"
        component={ProgressStack}
        options={{
          tabBarLabel: 'Progress',
          tabBarIcon: ({ focused, color }) => <TabIcon emoji="📊" focused={focused} color={color} />,
        }}
      />
      <Tab.Screen
        name="FriendsTab"
        component={FriendsStack}
        options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({ focused, color }) => <TabIcon emoji="👥" focused={focused} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}
