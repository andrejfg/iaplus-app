import { Link, Tabs, router } from 'expo-router'

import HomeTabBarIcon from '@/components/HomeTabBarIcon'
import tw from '@/lib/tailwind'
import { TouchableOpacity, View, Text, Pressable } from 'react-native'
import { removeToken } from '@/hooks/useAuth'
import { FontAwesome } from '@expo/vector-icons'
import React from 'react'

export default function TabLayout() {
  function handleLogout() {
    removeToken()
    router.replace('/')
  }
  return (
    <Tabs
      screenOptions={{
        headerStyle: tw`h-18`,
        headerTitle: ({ children }) => (
          <View
            style={tw`-mt-3 flex-row items-center justify-center gap-4 pb-4`}
          >
            <FontAwesome
              style={tw` text-light-c10`}
              name={children === 'Conversas' ? 'comments' : 'users'}
              size={30}
            />
            <Text style={tw`text-xl font-semibold`}>{children}</Text>
          </View>
        ),
        tabBarStyle: [
          tw`relative top-0 h-16 bg-light-c60 py-2 dark:bg-dark-c60`,
        ],
        tabBarShowLabel: false,
        headerRight: () => (
          <Link style={tw`-mt-3 mr-8 pb-4`} href={'/configuracao'} asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  style={tw` text-light-c10`}
                  name="gear"
                  size={30}
                />
              )}
            </Pressable>
          </Link>
        ),
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
    </Tabs>
  )
}
