import {
  Button,
  Form,
  H2,
  H3,
  SizableText,
  Spinner,
  Stack,
  TextArea,
  View,
  YStack,
} from "tamagui";
import { RecommendInputForm } from "@/components/RecommendInputForm/RecommendInputForm";
import axios from "axios";
import { Recipe } from "@/types/recipe";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  return (
    <View
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      {isLoading ? (
        <>
          <Spinner size="large" color="$yellow9Light" />
          <SizableText size="$3">献立を考え中</SizableText>
        </>
      ) : (
        <>
          <H3>献立の条件</H3>
          <RecommendInputForm
            onSubmit={async (value) => {
              setIsLoading(true);
              const response = await axios.get(
                `${process.env.EXPO_PUBLIC_API_URL}/menus/recommend?query=${value}`
              );
              setIsLoading(false);
              router.push({
                pathname: "/recommend",
                params: { data: JSON.stringify(response.data) },
              });
            }}
            placeholder="気分や食べたい食材などを入力"
            buttonText="献立を作成"
            width="80%"
          />
        </>
      )}
    </View>
  );
}
