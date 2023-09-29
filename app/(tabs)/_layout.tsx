import tw from '@/lib/tailwind'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AssistentesScreen from './assistentes'
import ConversasScreen from './conversas'
import { useDeviceContext } from 'twrnc'
import FerramentasScreen from './ferramentas'
import TabsHeader from '@/components/TabsHeader'
import DrawerContent from '@/components/DrawerContent'

const Tab = createMaterialTopTabNavigator()
const Drawer = createDrawerNavigator()

export default function App() {
  useDeviceContext(tw)
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
      }}
      drawerContent={DrawerContent}
    >
      <Drawer.Screen name="Home" component={TabLayout} />
    </Drawer.Navigator>
  )
}

function TabLayout() {
  return <HomeTabs />
}

function HomeTabs() {
  return (
    <TabsHeader>
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
    </TabsHeader>
  )
}
