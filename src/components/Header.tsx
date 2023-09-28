import tw from '@/lib/tailwind'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import React from 'react'

interface HeaderProps {
  withBackButton?: boolean
  style?: StyleProp<ViewStyle>
  iconStyle?: StyleProp<TextStyle>
  children?: React.JSX.Element | React.JSX.Element[]
}
export default function Header({
  children,
  withBackButton = true,
  style,
  iconStyle,
}: HeaderProps) {
  return (
    <View
      style={[
        tw`h-16 w-full flex-row items-center gap-4 bg-light-c60 shadow-lg dark:bg-dark-c60`,
        style,
      ]}
    >
      {withBackButton && (
        <TouchableOpacity
          style={tw`h-full w-10 items-center justify-center`}
          activeOpacity={0.7}
          onPress={router.back}
        >
          <FontAwesome style={[tw`text-2xl`, iconStyle]} name="angle-left" />
        </TouchableOpacity>
      )}
      {children}
    </View>
  )
}
