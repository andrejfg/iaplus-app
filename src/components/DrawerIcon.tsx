import tw from '@/lib/tailwind'
import { FontAwesome } from '@expo/vector-icons'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { useNavigation } from 'expo-router'
import { TouchableOpacity } from 'react-native'

export default function DrawerIcon() {
  const navigation = useNavigation<DrawerNavigationHelpers>()
  return (
    <TouchableOpacity
      onPress={navigation.openDrawer}
      activeOpacity={0.7}
      style={tw`absolute right-2 h-10 w-10 items-center justify-center `}
    >
      <FontAwesome style={tw`text-xl text-light-c10_alt`} name="bars" />
    </TouchableOpacity>
  )
}
