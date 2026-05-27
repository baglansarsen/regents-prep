import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native'
import { useTheme } from '../context/ThemeContext'

import StudyStack    from './StudyStack'
import ExamsStack    from './ExamsStack'
import ProgressStack from './ProgressStack'
import FriendsStack  from './FriendsStack'
import ProfileStack  from './ProfileStack'
import GlobalTopBar  from '../components/GlobalTopBar'

const Tab = createBottomTabNavigator()

function TabIcon({ emoji, focused }) {
  return (
    <Text style={{ fontSize: focused ? 22 : 20, opacity: focused ? 1 : 0.55 }}>
      {emoji}
    </Text>
  )
}

export default function TabNavigator() {
  const { C } = useTheme()

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <GlobalTopBar />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: C.tabBar,
            borderTopColor:  C.border,
            borderTopWidth:  1,
            height:          68,
            paddingBottom:   10,
            paddingTop:      6,
          },
          tabBarActiveTintColor:   C.tabActive,
          tabBarInactiveTintColor: C.tabInactive,
          tabBarLabelStyle: { fontFamily: 'Nunito_700Bold', fontSize: 10 },
        }}
      >
        <Tab.Screen
          name="StudyTab"
          component={StudyStack}
          options={{
            tabBarLabel: 'Study',
            tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="ExamsTab"
          component={ExamsStack}
          options={{
            tabBarLabel: 'Exams',
            tabBarIcon: ({ focused }) => <TabIcon emoji="📝" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="ProgressTab"
          component={ProgressStack}
          options={{
            tabBarLabel: 'Progress',
            tabBarIcon: ({ focused }) => <TabIcon emoji="📊" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="FeedTab"
          component={FriendsStack}
          options={{
            tabBarLabel: 'Feed',
            tabBarIcon: ({ focused }) => <TabIcon emoji="🌐" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileStack}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} />,
          }}
        />
      </Tab.Navigator>
    </View>
  )
}
