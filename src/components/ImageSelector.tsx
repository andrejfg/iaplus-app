import useImagePicker from '@/hooks/useImagePicker'
import tw from '@/lib/tailwind'
import { MediaTypeOptions } from 'expo-image-picker'
import React, { useEffect } from 'react'
import { Image } from 'expo-image'
import { TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

interface CustomAvatarProps {
  onAvatarSelect: (avatar: string) => void
  defaultImage?: string
  avatarLoading: {
    loading: boolean
    startLoading: () => void
    stopLoading: () => void
  }
}

export default function ImageSelector({
  onAvatarSelect,
  defaultImage,
  avatarLoading,
}: CustomAvatarProps) {
  const { loading, startLoading, stopLoading } = avatarLoading
  const { pickImages, images } = useImagePicker({
    allowsEditing: true,
    allowsMultipleSelection: false,
    mediaTypes: MediaTypeOptions.Images,
    aspect: [1, 1],
  })

  const onPress = async () => {
    startLoading()
    await pickImages()
    stopLoading()
  }
  useEffect(() => {
    if (images.length > 0) {
      onAvatarSelect(images[0].uri)
    }
  }, [images])

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={loading}
      style={tw`h-24 w-24`}
      onPress={onPress}
    >
      <View style={tw`flex-1`}>
        <View
          style={tw`flex-1 items-center justify-center rounded-full bg-slate-300 shadow-lg`}
        >
          {images.at(0) ? (
            <Image
              style={tw`h-24 w-24 rounded-full`}
              source={{ uri: images[0].uri }}
              alt="avatar"
            />
          ) : defaultImage ? (
            <Image
              style={tw`h-24 w-24 rounded-full`}
              source={{ uri: defaultImage }}
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
        style={tw`absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full bg-slate-200 shadow-lg`}
      >
        <FontAwesome name="plus" />
      </View>
    </TouchableOpacity>
  )
}
