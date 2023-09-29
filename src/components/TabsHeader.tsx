import tw from '@/lib/tailwind'
import { View, Text } from 'react-native'
import DrawerIcon from './DrawerIcon'
import Header from './Header'
import React from 'react'

interface TabsHeaderProps {
  children?: React.JSX.Element | React.JSX.Element[]
}

export default function TabsHeader({ children }: TabsHeaderProps) {
  return (
    <View style={tw`flex-1`}>
      <Header
        withBackButton={false}
        style={tw`bg-light-c30 p-4 dark:bg-dark-c30`}
      >
        <View style={tw`flex-1 justify-center`}>
          <Text
            style={tw`text-xl font-semibold text-light-c10_alt dark:text-dark-c10`}
          >
            IAPlus
          </Text>
        </View>
        <DrawerIcon />
      </Header>
      {children}
    </View>
  )
}
