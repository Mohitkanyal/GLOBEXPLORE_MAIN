import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
export default function RootLayout() {


  useFonts({
    'outfit':require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold':require('./../assets/fonts/Outfit-Bold.ttf'),
    'outfit-med':require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-semib':require('./../assets/fonts/Outfit-SemiBold.ttf'),
    'outfit-ExtraBold':require('./../assets/fonts/Outfit-ExtraBold.ttf'),
    

  })

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }

  return (
    <Stack 
    screenOptions={{
        headerShown:false,
        // headerTransparent: true
      }}>
        {/* <Stack.Screen name ="(tabs)"/> */}
      <Stack.Screen name="index" options={{ headerTransparent: true}}/>
    </Stack>
  );
}
