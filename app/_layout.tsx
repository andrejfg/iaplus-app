import tw from '@/lib/tailwind'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDeviceContext } from 'twrnc'
import { RootSiblingParent } from 'react-native-root-siblings'
import { HomeContextProvider } from '@/contexts/HomeContext'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/login',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useDeviceContext(tw)
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])
  if (!loaded) {
    return null
  }
  function RootLayoutNav() {
    return (
      <HomeContextProvider>
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="chat/[id]" />
          <Stack.Screen name="newAssistente" />
        </Stack>
      </HomeContextProvider>
    )
  }

  return (
    <RootSiblingParent>
      <SafeAreaView style={tw`flex-1`}>
        <RootLayoutNav />
        <StatusBar style={'light'} translucent />
      </SafeAreaView>
    </RootSiblingParent>
  )
}
