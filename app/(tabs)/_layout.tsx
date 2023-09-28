import tw from '@/lib/tailwind'
import ConfiguracaoTabBarIcon from '@/components/ConfiguracaoTabBarIcon'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AssistentesScreen from './assistentes'
import ConversasScreen from './conversas'
import { View, Text } from 'react-native'
import Header from '@/components/Header'
import { useDeviceContext } from 'twrnc'
import FerramentasScreen from './ferramentas'

const Tab = createMaterialTopTabNavigator()

export default function TabLayout() {
  useDeviceContext(tw)
  return (
    <View style={tw`flex-1`}>
      <Header
        withBackButton={false}
        style={tw` bg-light-c30 p-4 dark:bg-dark-c30`}
      >
        <View style={tw`h-full flex-1 justify-center`}>
          <Text
            style={tw`text-xl font-semibold text-light-c10_alt dark:text-dark-c10`}
          >
            IAPlus
          </Text>
        </View>
        <ConfiguracaoTabBarIcon />
      </Header>
      <HomeTabs />
    </View>
  )
}

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Conversas"
      screenOptions={{
        tabBarLabelStyle: tw`text-xs`,
        tabBarIndicatorStyle: tw`bg-light-c30 dark:bg-dark-c10`,
      }}
    >
      <Tab.Screen name="Conversas" component={ConversasScreen} />
      <Tab.Screen name="Assistentes" component={AssistentesScreen} />
      <Tab.Screen name="Ferramentas" component={FerramentasScreen} />
    </Tab.Navigator>
  )
}

// function HomeTabs() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: [tw`absolute top-0 h-14 bg-light-c60 dark:bg-dark-c60`],
//         tabBarShowLabel: false,
//         tabBarItemStyle: tw`z-10 w-full`,
//       }}
//     >
//       <Tabs.Screen
//         name="conversas"
//         options={{
//           title: 'Conversas',
//           tabBarIcon: ({ focused }) => (
//             <HomeTabBarIcon barName="Conversas" focused={focused} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="assistentes"
//         options={{
//           title: 'Assistentes',
//           tabBarIcon: ({ focused }) => (
//             <HomeTabBarIcon barName="Assistentes" focused={focused} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="configuracao"
//         options={{
//           title: 'Configuração',
//           tabBarIcon: ({ focused }) => (
//             <ConfiguracaoTabBarIcon focused={focused} />
//           ),
//           tabBarItemStyle: tw`z-0 -mx-10`,
//         }}
//       />
//     </Tabs>
//   )
// }
