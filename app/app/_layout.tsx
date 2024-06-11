import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import appConfig from "../tamagui.config";

import { useColorScheme } from "@/hooks/useColorScheme";
import { TamaguiProvider } from "tamagui";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <TamaguiProvider config={appConfig} defaultTheme="light">
        <Stack
          screenOptions={{
            headerTintColor: "#F7CE00",
            headerTitleStyle: { color: "#1C1500" },
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{ title: "ホーム", headerShown: false }}
          />
          <Stack.Screen
            name="recommend"
            options={{ title: "提案された献立" }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </TamaguiProvider>
    </ThemeProvider>
  );
}
