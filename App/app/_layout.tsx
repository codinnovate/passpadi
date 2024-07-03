import ActivationContext, { ActivationProvider } from '@/context/ActivationContext';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useContext, useEffect } from 'react';
import 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { setIsActivated } = useContext(ActivationContext);

  const checkActivationStatus = async () => {
    const status = await AsyncStorage.getItem('isActivated');
    setIsActivated(status === 'true');
  };

  const [loaded, error] = useFonts({
    SpaceGM: require('@/assets/fonts/SpaceGrotesk-Medium.ttf'),
  });

  useEffect(() => {
    checkActivationStatus();

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
    <ActivationProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="activate/index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/signin" options={{ headerShown: false }} />
        <Stack.Screen name="home/index" options={{ headerShown: false }} />
        <Stack.Screen name="home/math" options={{ headerShown: false }} />
        <Stack.Screen name="home/english" options={{ headerShown: false }} />
        <Stack.Screen name="home/gpaper" options={{ headerShown: false }} />
        <Stack.Screen name="cbt/index" options={{ headerShown: false }} />
      </Stack>
    </ActivationProvider>
  );
}
