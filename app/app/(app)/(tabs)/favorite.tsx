import { View, Text, YGroup, ScrollView, ListItem, Stack } from "tamagui";
import axios from "axios";
import { Recipe } from "@/types/recipe";
import useSWRNative, {
  useSWRNativeRevalidate,
} from "@nandorojo/swr-react-native";

import { LikeButton } from "@/components/LikeButton";
import { useIsFocused } from "@react-navigation/native";

const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data as Recipe[]);

export default function FavoriteScreen() {
  const isFocused = useIsFocused();

  const { data, isLoading, mutate } = useSWRNative(
    `${process.env.EXPO_PUBLIC_API_URL}/menus/favorites`,
    fetcher
  );

  useSWRNativeRevalidate({
    // required: pass your mutate function returned by SWR
    mutate,

    // optional, defaults copied from SWR
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return (
    <View
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      {data?.length === 0 && (
        <Stack height="100%" alignItems="center" justifyContent="center">
          <Text>お気に入りに追加されていません</Text>
        </Stack>
      )}
      {isLoading === false && data !== undefined && (
        <ScrollView height="85%" width="100%">
          <YGroup>
            {data?.map((recipe, i) => (
              <ListItem
                key={i}
                title={recipe.recipeName}
                subTitle={recipe.description}
                iconAfter={
                  <LikeButton
                    defaultValue
                    onPress={async (state) => {
                      if (state === true) {
                        await axios.post(
                          `${process.env.EXPO_PUBLIC_API_URL}/menus/favorites`,
                          recipe
                        );
                      } else {
                        if (recipe.recipeId === undefined) return;
                        await axios.delete(
                          `${process.env.EXPO_PUBLIC_API_URL}/menus/favorites/${recipe.recipeId}`
                        );

                        mutate(
                          data.filter((e) => e.recipeId !== recipe.recipeId)
                        );
                      }
                    }}
                  />
                }
              />
            ))}
          </YGroup>
        </ScrollView>
      )}
    </View>
  );
}
