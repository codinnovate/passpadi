import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React ,{ useEffect } from 'react';
import 'react-native-reanimated';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceGM: require('@/assets/fonts/SpaceGrotesk-Medium.ttf'),
    
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home/index" options={{ headerShown: false }} />
        <Stack.Screen name="home/math" options={{ headerShown: false }} />
        <Stack.Screen name="home/english" options={{ headerShown: false }} />
        <Stack.Screen name="home/gpaper" options={{ headerShown: false }} />
        <Stack.Screen name="cbt/index" options={{ headerShown: false }} />
      </Stack>
  );

}
