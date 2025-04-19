import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  
  return (
    <Stack>
      {false ? (
        <Stack.Screen name="index" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen
          name="Login/index"
          options={{ headerTitle: 'Login', headerShown: false }}
        />
      )}
    </Stack>
  );
}
