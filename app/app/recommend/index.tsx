import { useNavigation } from "expo-router";
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

export default function RecommendScreen() {
  const { data } = useLocalSearchParams();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>(JSON.parse(data as string));

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
                        setSelectedRecipe((preState) => [...preState, recipe]);
                      } else {
                        setSelectedRecipe((preState) =>
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
      {selectedRecipe.length >= 1 && (
        <Button bg="$yellow9Light" minWidth="80%">
          <Text>{selectedRecipe.length}項目で献立を作成</Text>
        </Button>
      )}
    </View>
  );
}
