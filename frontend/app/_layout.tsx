import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const status = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(status === 'true');
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    // Show a loading screen while checking login status
    return null;
  }

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
