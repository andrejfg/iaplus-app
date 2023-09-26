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
    <View style={tw`w-full flex-1 items-center justify-center px-4`}>
      <View style={tw`flex-1 items-center justify-center`}>
        <Text
          style={[
            tw`text-base font-semibold text-light-c30 dark:text-dark-c10`,
          ]}
        >
          {barName}
        </Text>
      </View>
      <View
        style={
          focused &&
          tw` w-full rounded-md border border-light-c30 dark:border-dark-c10`
        }
      />
    </View>
  )
}

export default HomeTabBarIcon
