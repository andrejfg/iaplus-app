import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import tw from '@/lib/tailwind';

export default function TabTwoScreen() {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-xl font-bold`}>Tab Two</Text>
      <View style={tw`my-7 h-0.5 w-4/5`} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}