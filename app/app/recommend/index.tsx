import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "tamagui";
import { useLocalSearchParams } from "expo-router";
import { Recipe } from "@/types/recipe";

export default function RecommendScreen() {
  const { data } = useLocalSearchParams();

  return (
    <View>
      <Text>遷移後</Text>
      <Text>{data}</Text>
    </View>
  );
}
