import tw from '@/lib/tailwind'
import { FontAwesome } from '@expo/vector-icons'
import { View } from 'react-native'
import { useDeviceContext } from 'twrnc'

type ConfiguracaoTabBarIconProps = {
  focused: boolean
}

const ConfiguracaoTabBarIcon = ({ focused }: ConfiguracaoTabBarIconProps) => {
  useDeviceContext(tw)

  return (
    <View style={tw`w-18 flex-1 items-center justify-center`}>
      <View style={tw`flex-1 items-center justify-center`}>
        <FontAwesome
          name="gear"
          size={20}
          style={[tw` text-light-c30 dark:text-dark-c10`]}
        />
      </View>
      <View
        style={
          focused &&
          tw` w-10 rounded-lg border-b border-t border-light-c30 dark:border-dark-c10`
        }
      />
    </View>
  )
}

export default ConfiguracaoTabBarIcon
