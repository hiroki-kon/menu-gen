import { Stack } from "expo-router";
import { Button } from "react-native";
import { View } from "tamagui";

export default function RecommendLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
