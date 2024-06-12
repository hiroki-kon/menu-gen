import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  ListItem,
  ScrollView,
  Text,
  View,
  XGroup,
  YGroup,
} from "tamagui";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import { useLocalSearchParams } from "expo-router";
import { Recipe } from "@/types/recipe";
import { LikeButton } from "@/components/LikeButton";
import axios from "axios";
import { LogBox } from 'react-native'

LogBox.ignoreLogs([
  "[Reanimated] Couldn't determine the version of the native part of Reanimated.",
  /Cannot update a component/,
])

export default function RecommendScreen() {
  const { data } = useLocalSearchParams();
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>(JSON.parse(data as string));
  const router = useRouter();

  return (
    <View width="100%" alignItems="center" justifyContent="center">
      <ScrollView height="85%" width="100%">
        <YGroup>
          {recipes.map((recipe, i) => (
            <YGroup.Item key={i}>
              <ListItem
                icon={
                  <Checkbox
                    id={`${i}`}
                    size="$4"
                    onCheckedChange={(checked) => {
                      if (checked === true) {
                        setSelectedRecipes((preState) => [...preState, recipe]);
                      } else {
                        setSelectedRecipes((preState) =>
                          preState.filter(
                            (e) => e.recipeName !== recipe.recipeName
                          )
                        );
                      }
                    }}
                  >
                    <Checkbox.Indicator>
                      <CheckIcon />
                    </Checkbox.Indicator>
                  </Checkbox>
                }
                title={recipe.recipeName}
                subTitle={recipe.description}
                iconAfter={
                  <LikeButton
                    onPress={async (state) => {
                      if (state === true) {
                        const response = await axios.post(
                          `${process.env.EXPO_PUBLIC_API_URL}/menus/favorites`,
                          recipe
                        );

                        const recipeId: number = response.data.recipeId;

                        setRecipes((preState) =>
                          preState.map((e, index) =>
                            index === i ? { ...e, recipeId: recipeId } : e
                          )
                        );
                      } else {
                        if (recipe.recipeId === undefined) return;

                        await axios.delete(
                          `${process.env.EXPO_PUBLIC_API_URL}/menus/favorites/${recipe.recipeId}`
                        );
                      }
                    }}
                  />
                }
              />
            </YGroup.Item>
          ))}
        </YGroup>
      </ScrollView>
      {selectedRecipes.length >= 1 && (
        <Button
          bg="$yellow9Light"
          minWidth="80%"
          onPress={async () => {
            const date = new Date();
            const request = {
              startAt: `${date.getFullYear()}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${(date.getDay() + 1)
                .toString()
                .padStart(2, "0")}`,
              recipes: selectedRecipes.map((recipe) => ({
                recipeName: recipe.recipeName,
                description: recipe.description,
                ingredients: recipe.ingredients,
              })),
            };
            await axios.post(
              `${process.env.EXPO_PUBLIC_API_URL}/menus/weekly`,
              request
            );
            router.push({
              pathname: "/menu",
            });
          }}
        >
          <Text>{selectedRecipes.length}項目で献立を作成</Text>
        </Button>
      )}
    </View>
  );
}
