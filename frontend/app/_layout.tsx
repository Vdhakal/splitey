import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="Login/index" options={{ headerShown: false }} />
      <Stack.Screen name="Home/index" options={{ headerShown: false }} />
    </Stack>
  );
}
