import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import tw from '@/lib/tailwind';


export default function ModalScreen() {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-2xl font-bold`}>Modal</Text>
      <View style={tw`my-7 h-0.5 w-4/5`} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}