import { Stack } from 'expo-router'
import React from 'react'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="callback/index" options={{ headerShown: false }} />
    </Stack>
  )
}
