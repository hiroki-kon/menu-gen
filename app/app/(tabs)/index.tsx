import { Button, Form, SizableText, Spinner, TextArea, View } from "tamagui";
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
          placeholder=""
          buttonText="献立を作成"
          width="80%"
        />
      )}
    </View>
  );
}
