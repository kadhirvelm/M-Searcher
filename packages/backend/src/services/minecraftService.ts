import { IMinecraftSearchService } from "@minecraft/api";
import { readFileSync, writeFileSync } from 'fs';
import minecraft from "minecraft-data";
import { join } from "path";
import _ from "lodash";

const MINECRAFT_DATA = minecraft("1.19");

const iconToCssClassName = () => JSON.parse(readFileSync(join(process.cwd(), "./src/services/icon_to_css.json")).toString());
const itemToRecipe = () => JSON.parse(readFileSync(join(process.cwd(), "./src/services/item_to_recipe.json")).toString());

const sanitize_string = (str: string): string => str.toLowerCase().replace(/\s/g, "_");

const getIngredient = (itemId: number) => {
  const item = MINECRAFT_DATA.items[itemId];
  const className = iconToCssClassName()[sanitize_string(item.name)];

  return { item, className };
};

function getRecipe(recipeId: number) {
  const recipes = MINECRAFT_DATA.recipes[recipeId];

  const items: any[] = [];
  recipes.forEach((recipe: any) => {
    if (recipe.inShape !== undefined) {
      const getIngredients = _.flatten(recipe.inShape).map((ingredientId: any) => getIngredient(ingredientId));
      items.push(...getIngredients);
    } else {
      const mappedIngredients = recipe.ingredients.map(getIngredient);
      items.push(...mappedIngredients);
    }

    items.push(getIngredient(recipe.result.id));
  });

  return { recipes, items };
}

export function searchRecipes(
  payload: IMinecraftSearchService["searchRecipes"]["payload"],
): Promise<IMinecraftSearchService["searchRecipes"]["response"]> {
  const sanitized_string = sanitize_string(payload.searchText);

  const item = MINECRAFT_DATA.itemsByName[sanitized_string];
  const fullItem = getIngredient(item.id);

  const recipesAndItems: any[] = itemToRecipe()[item.id].map(getRecipe);

  const allRecipes: any[] = [];
  const allItems: any[] = [fullItem];

  recipesAndItems.forEach(({ recipes, items }) => {
    allRecipes.push(...recipes);
    allItems.push(...items);
  });

  return new Promise((resolve) => {
    resolve({ recipes: allRecipes, items: allItems });
  });
}
