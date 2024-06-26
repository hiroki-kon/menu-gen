import { config } from "@tamagui/config/v3";
import { Text, View } from "react-native";
import { createTamagui } from "tamagui"; // or '@tamagui/core'

const appConfig = createTamagui({
  ...config,
  themes: {
    dark: {
      background: "#000",
      color: "#fff",
    },
    light: {
      color: "#000",
      background: "#fff",
    },
  },
});

export type AppConfig = typeof appConfig;

declare module "tamagui" {
  // or '@tamagui/core'
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
