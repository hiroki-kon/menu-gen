import { Slot } from "expo-router";
import { SessionProvider } from "../ctx";
import { Button, TamaguiProvider } from "tamagui";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import appConfig from "../tamagui.config";

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <ThemeProvider value={DefaultTheme}>
        <TamaguiProvider config={appConfig} defaultTheme="light">
          <Slot />
        </TamaguiProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
