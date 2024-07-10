import ActivationContext, { ActivationProvider } from '@/context/ActivationContext';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import Splash from '@/components/Splash';
import React, { createContext, useContext, useEffect, useState } from 'react';
import 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function RootLayout() {
  
  
  const [showSplash ,setShowSplash ] = useState(true);
  const [loaded, error] = useFonts({
    SpaceGM: require('@/assets/fonts/SpaceGrotesk-Medium.ttf'),
    Raleway: require('@/assets/fonts/Raleway-Medium.ttf'),
    Ubuntu: require('@/assets/fonts/Ubuntu-Medium.ttf'),
  });
  
  useEffect(() => {
    // let userInSession = lookInSession("userInfo");
    // console.log("Before userIn Session")
    // console.log(userInSession)
    // console.log("afteruserIn Session")

    // userInSession ?  setUserAuth(userInSession) : setUserAuth({access_token:null})
  // checkActivationStatus();

    if (error) throw error;
  }, [error]);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false)
    },3000)
    if (loaded) {
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  if(showSplash) return <Splash />
  return (
      <Stack>  
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/signin" options={{ headerShown: false }} /> 
        <Stack.Screen name="activate/index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
        <Stack.Screen name="home/index" options={{ headerShown: false }} />
        <Stack.Screen name="home/[subjectId]" options={{ headerShown: false }} />
        <Stack.Screen name="cbt/index" options={{ headerShown: false }} />
        <Stack.Screen name="threads/index" options={{ headerShown: false }} />
        <Stack.Screen name="threads/create" />
      </Stack>
  )
}
