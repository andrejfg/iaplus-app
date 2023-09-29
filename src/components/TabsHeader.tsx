import tw from '@/lib/tailwind'
import { View } from 'react-native'
import DrawerIcon from './DrawerIcon'
import Header from './Header'
import React from 'react'
import { Image } from 'expo-image'
import Logo from '@/assets/images/LogoIAPLUS.png'

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
          <Image
            style={tw`flex-1`}
            contentFit="contain"
            source={Logo}
            alt="IAPlus"
          />
          {/* <Text
            style={tw`text-xl font-semibold text-light-c10_alt dark:text-dark-c10`}
          >
            IAPlus
          </Text> */}
        </View>
        <DrawerIcon />
      </Header>
      {children}
    </View>
  )
}
