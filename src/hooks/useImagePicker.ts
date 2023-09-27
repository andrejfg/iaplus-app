import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

export default function useImagePicker({
  ...options
}: ImagePicker.ImagePickerOptions) {
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([])

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      ...options,
    })

    if (!result.canceled) {
      setImages(result.assets)
    }
  }

  return { images, pickImages, setImages }
}
