import tw from '@/lib/tailwind'
import { FontAwesome } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { View } from 'react-native'
import { useDeviceContext } from 'twrnc'

const ConfiguracaoTabBarIcon = () => {
  useDeviceContext(tw)
  return (
    <Link href="/configuracao" style={tw`h-full`}>
      <View style={tw` w-8 flex-1 items-center justify-center`}>
        <FontAwesome
          name="gear"
          style={[tw`text-2xl text-light-c10_alt dark:text-dark-c10`]}
        />
      </View>
    </Link>
  )
}

export default ConfiguracaoTabBarIcon
