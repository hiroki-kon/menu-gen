import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Text, ZStack } from "tamagui";
import appConfig from "../../tamagui.config";
import { useSession } from "../../ctx";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Button } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { session, isLoading } = useSession();

  const [loaded] = useFonts({
    SpaceMono: require("../..//assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // if (!session) {
  //   // On web, static rendering will stop here as the user is not authenticated
  //   // in the headless Node process that the pages are rendered in.
  //   return <Redirect href="/sign-in" />;
  // }

  return (
    <Stack
      screenOptions={{
        headerTintColor: "#F7CE00",
        headerTitleStyle: { color: "#1C1500" },
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "ホーム",
          headerShown: false,
        }}
      />
      <Stack.Screen name="recommend" options={{ title: "提案された献立" }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
