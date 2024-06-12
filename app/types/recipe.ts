export type Recipe = {
  recipeId?: number;
  recipeName: string;
  description: string;
  ingredients: string[];
};

export type WeeklyRecipe = {

    startAt: string;
    recipes: Recipe[]

}