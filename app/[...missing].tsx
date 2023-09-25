import { Link } from 'expo-router'

import { Text, View } from '@/components/Themed'
import tw from '@/lib/tailwind'

export default function NotFoundScreen() {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-2xl font-bold`}>Oops!</Text>
      <View
        style={tw`my-5 h-0.5 w-4/5`}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={tw`text-lg`}>Esta tela não existe.</Text>
      <Link href="/" style={tw`mt-5 py-5`}>
        <Text style={tw`text-base text-blue-500`}>Ir para a tela inicial!</Text>
      </Link>
    </View>
  )
}
