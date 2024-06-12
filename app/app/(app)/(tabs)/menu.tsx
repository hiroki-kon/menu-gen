import {
  Button,
  Form,
  ScrollView,
  Text,
  H3,
  View,
  YStack,
  YGroup,
  ListItem,
} from "tamagui";
import { RecommendInputForm } from "@/components/RecommendInputForm/RecommendInputForm";
import axios from "axios";
import { WeeklyRecipe } from "@/types/recipe";
import { useState } from "react";
import { useRouter } from "expo-router";
import useSWRNative, {
  useSWRNativeRevalidate,
} from "@nandorojo/swr-react-native";

const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data as WeeklyRecipe);

export default function MenuScreen() {
  const { data, isLoading, mutate } = useSWRNative(
    `${process.env.EXPO_PUBLIC_API_URL}/menus/weekly`,
    fetcher
  );

  useSWRNativeRevalidate({
    // required: pass your mutate function returned by SWR
    mutate,

    // optional, defaults copied from SWR
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  const addDay = (date: Date, day: number) => {
    const dt = date;
    dt.setDate(dt.getDate() + day);
    return dt;
  };

  return (
    <View
      height="100%"
      width="100%"
      alignItems="center"
      // justifyContent="center"
    >
      {data && (
        <YStack width="100%">
          <H3 textAlign="center">
            {new Date(data.startAt).toLocaleDateString("ja-JP", {
              month: "short",
              day: "numeric",
            })}
            からの献立
          </H3>
          <ScrollView height="100%">
            <YGroup>
              {data.recipes.map((recipe, i) => (
                <YGroup.Item key={i}>
                  <ListItem
                    title={recipe.recipeName}
                    subTitle={recipe.description}
                    icon={
                      <Text>
                        {addDay(new Date(data.startAt), i).toLocaleDateString(
                          "ja-JP",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </Text>
                    }
                  />
                </YGroup.Item>
              ))}
            </YGroup>
          </ScrollView>
        </YStack>
      )}
    </View>
  );
}
