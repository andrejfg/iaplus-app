import { Link, Tabs, router } from 'expo-router'

import HomeTabBarIcon from '@/components/HomeTabBarIcon'
import tw from '@/lib/tailwind'
import { TouchableOpacity, View, Text, Pressable } from 'react-native'
import { removeToken } from '@/hooks/useAuth'
import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { Screen } from 'react-native-screens'
import ConfiguracaoTabBarIcon from '@/components/ConfiguracaoTabBarIcon'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [tw`absolute top-0 h-14 bg-light-c60 dark:bg-dark-c60`],
        tabBarShowLabel: false,
        tabBarItemStyle: tw`z-10 w-full`,
      }}
    >
      <Tabs.Screen
        name="conversas"
        options={{
          title: 'Conversas',
          tabBarIcon: ({ focused }) => (
            <HomeTabBarIcon barName="Conversas" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="assistentes"
        options={{
          title: 'Assistentes',
          tabBarIcon: ({ focused }) => (
            <HomeTabBarIcon barName="Assistentes" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="configuracao"
        options={{
          title: 'Configuração',
          tabBarIcon: ({ focused }) => (
            <ConfiguracaoTabBarIcon focused={focused} />
          ),
          tabBarItemStyle: tw`z-0 -mx-10`,
        }}
      />
    </Tabs>
  )
}
