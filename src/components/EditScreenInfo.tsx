import React from 'react';

import Colors from '@/constants/Colors';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import tw from '@/lib/tailwind';


export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View>
      <View style={tw`items-center mx-10`}>
        <Text
          style={tw`text-lg leading-6 text-center`}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Open up the code for this screen:
        </Text>

        <View
          style={tw`rounded-md px-1 my-2`}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)">
          <MonoText>{path}</MonoText>
        </View>

        <Text
          style={tw`text-lg leading-6 text-center`}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Change any of the text, save the file, and your app will automatically update.
        </Text>
      </View>

      <View style={tw`mt-4 mx-5 items-center`}>
        <ExternalLink
          style={tw`my-4`}
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet">
          <Text style={tw`text-center`} lightColor={Colors.light.tint}>
            Tap here if your app doesn't automatically update after making changes
          </Text>
        </ExternalLink>
      </View>
    </View>
  );
}