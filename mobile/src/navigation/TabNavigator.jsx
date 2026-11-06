import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../context/ThemeContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import StudyStack    from './StudyStack'
import ExamsStack    from './ExamsStack'
import FriendsStack  from './FriendsStack'
import ProfileStack  from './ProfileStack'
import GlobalTopBar  from '../components/GlobalTopBar'
import StreakCelebrationHost from '../components/StreakCelebrationHost'
import TourHost from '../components/TourHost'
import { RewardFlightProvider } from '../motion/RewardFlight'

const Tab = createBottomTabNavigator()

// Vector icons, tinted by the tab bar (emoji ignored tint colours and render
// differently on every platform). Filled when focused, outline otherwise.
function TabIcon({ name, focused, color }) {
  return <Ionicons name={focused ? name : `${name}-outline`} size={22} color={color} />
}

export default function TabNavigator() {
  const { C } = useTheme()
  const insets = useSafeAreaInsets()

  return (
    // Reward flights (⭐ to the top bar) travel across the whole tab area.
    <RewardFlightProvider>
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <GlobalTopBar />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: C.tabBar,
            borderTopColor:  C.border,
            borderTopWidth:  1,
            // paddingBottom replaces bottom-tabs' inset padding, so its default
            // 49pt height left ~32pt for icon + 12px label on devices without a
            // home indicator (SE, 3-button Android, web). Unchanged when the
            // inset is >= 8 (notched iPhones keep 49 + inset).
            height:          49 + Math.max(insets.bottom, 8),
            paddingBottom:   10,
            paddingTop:      6,
          },
          tabBarActiveTintColor:   C.tabActive,
          tabBarInactiveTintColor: C.tabInactive,
          tabBarLabelStyle: { fontFamily: 'Nunito_700Bold', fontSize: 12 },
        }}
      >
        <Tab.Screen
          name="StudyTab"
          component={StudyStack}
          options={{
            tabBarLabel: 'Study',
            tabBarIcon: ({ focused, color }) => <TabIcon name="home" focused={focused} color={color} />,
          }}
        />
        <Tab.Screen
          name="ExamsTab"
          component={ExamsStack}
          options={{
            tabBarLabel: 'Exams',
            tabBarIcon: ({ focused, color }) => <TabIcon name="document-text" focused={focused} color={color} />,
          }}
        />
        <Tab.Screen
          name="FriendsTab"
          component={FriendsStack}
          options={{
            tabBarLabel: 'Social',
            tabBarIcon: ({ focused, color }) => <TabIcon name="people" focused={focused} color={color} />,
          }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileStack}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ focused, color }) => <TabIcon name="person" focused={focused} color={color} />,
          }}
        />
      </Tab.Navigator>
      <StreakCelebrationHost />
      <TourHost />
    </View>
    </RewardFlightProvider>
  )
}
