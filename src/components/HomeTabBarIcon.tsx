import tw from '@/lib/tailwind'
import { useDeviceContext, useAppColorScheme } from 'twrnc'
import { View, Text } from 'react-native'
import { useEffect } from 'react'

type HomeTabBarIconProps = {
  barName: string
  focused: boolean
}

const HomeTabBarIcon = ({ barName, focused }: HomeTabBarIconProps) => {
  useDeviceContext(tw)

  return (
    <View
      style={[
        tw`flex-1 items-center justify-center rounded-md px-4`,
        focused && tw`bg-light-c30 dark:bg-dark-c30`,
      ]}
    >
      <Text
        style={[
          tw`text-base font-semibold`,
          focused
            ? tw`text-light-c10_alt dark:text-dark-c10`
            : tw`text-light-c30 dark:text-dark-c10`,
        ]}
      >
        {barName}
      </Text>
    </View>
  )
}

export default HomeTabBarIcon
