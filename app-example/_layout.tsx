import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'new':require('./../assets/fonts/Poppins-Black.ttf')
    // 'outfit':require('./../assets/fonts/Outfit-Regular.ttf'),
    // 'outfit-bold':require('./../assets/fonts/Outfit-Bold.ttf'),
    // 'outfit-med':require('./../assets/fonts/Outfit-Medium.ttf'),
    // 'outfit-semib':require('./../assets/fonts/Outfit-SemiBold.ttf'),
    // 'outfit-ExtraBold':require('./../assets/fonts/Outfit-ExtraBold.ttf'),

  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // useFonts({
    

  // })
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{
        headerShown:false
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found"  />
      </Stack>
    </ThemeProvider>
  );
}
