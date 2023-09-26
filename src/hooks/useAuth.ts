import { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'

export async function getToken() {
  let token
  if (Platform.OS === 'web') {
    token = await AsyncStorage.getItem('token')
  } else {
    token = await SecureStore.getItemAsync('token')
  }
  return token
}
export async function setToken(value: string) {
  let token
  if (Platform.OS === 'web') {
    token = await AsyncStorage.setItem('token', value)
  } else {
    token = await SecureStore.setItemAsync('token', value)
  }
  return token
}

export async function removeToken() {
  let token
  if (Platform.OS === 'web') {
    token = await AsyncStorage.removeItem('token')
  } else {
    token = await SecureStore.deleteItemAsync('token')
  }
  return token
}

export function useIsAuth() {
  const [isUserAuthenticated, setIsUserAuthenticate] = useState<null | boolean>(
    null,
  )
  useEffect(() => {
    getToken().then((token) => {
      setIsUserAuthenticate(!!token)
    })
  }, [])

  return {
    isUserAuthenticated,
  }
}
