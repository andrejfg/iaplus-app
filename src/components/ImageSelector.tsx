import useImagePicker from '@/hooks/useImagePicker'
import tw from '@/lib/tailwind'
import { MediaTypeOptions } from 'expo-image-picker'
import React from 'react'
import { Image } from 'expo-image'
import { TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

interface CustomAvatarProps {
  onAvatarSelect: (avatar: string) => void
}

export default function ImageSelector({ onAvatarSelect }: CustomAvatarProps) {
  const { pickImages, images } = useImagePicker({
    allowsEditing: true,
    allowsMultipleSelection: false,
    mediaTypes: MediaTypeOptions.Images,
    aspect: [1, 1],
  })

  const onPress = async () => {
    await pickImages()
    if (images.at(0)) {
      onAvatarSelect(images[0].uri)
    }
    console.log()
  }

  return (
    <TouchableOpacity style={tw`h-24 w-24`} onPress={onPress}>
      <View style={tw`flex-1`}>
        <View
          style={tw`flex-1 items-center justify-center rounded-full bg-slate-300`}
        >
          {images.at(0) ? (
            <Image
              style={tw`flex-1`}
              source={{ uri: images[0].uri }}
              alt="avatar"
            />
          ) : (
            <FontAwesome
              style={tw`text-3xl text-light-c10 dark:text-dark-c10`}
              name="image"
            />
          )}
        </View>
      </View>
      <View
        style={tw`absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full bg-slate-200`}
      >
        <FontAwesome name="plus" />
      </View>
    </TouchableOpacity>
  )
}
