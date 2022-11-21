import { IItem, IMinecraftSearchService, IRecipe } from "@minecraft/api";
import { readFileSync } from 'fs';
import minecraft from "minecraft-data";
import { join, resolve } from "path";
import _ from "lodash";
import Express from "express";

const MINECRAFT_DATA = minecraft("1.19");

const iconToCssClassName = () => JSON.parse(readFileSync(join(process.cwd(), "./src/services/icon_to_css.json")).toString());
const itemToRecipe = () => JSON.parse(readFileSync(join(process.cwd(), "./src/services/item_to_recipe.json")).toString());

const sanitize_string = (str: string): string => str.toLowerCase().replace(/\s/g, "_");

const getIngredient = (itemId: number) => {
  const item = MINECRAFT_DATA.items[itemId];
  if (item === undefined) {
    return undefined;
  }

  const className = iconToCssClassName()[sanitize_string(item.name)];
  return { item, className };
};

function getRecipe(recipeId: number) {
  const recipes = MINECRAFT_DATA.recipes[recipeId];

  const items: any[] = [];
  recipes.forEach((recipe: any) => {
    if (recipe.inShape !== undefined) {
      const getIngredients = _.compact(_.flatten(recipe.inShape).map((ingredientId: any) => getIngredient(ingredientId)));
      items.push(...getIngredients);
    } else {
      const mappedIngredients = _.compact(recipe.ingredients.map(getIngredient));
      items.push(...mappedIngredients);
    }

    items.push(getIngredient(recipe.result.id));
  });

  return { recipes, items };
}

export function searchRecipes(
  payload: IMinecraftSearchService["searchRecipes"]["payload"],
  response: Express.Response,
): Promise<IMinecraftSearchService["searchRecipes"]["response"] | undefined> {
  return new Promise((resolve) => {
    const sanitized_string = sanitize_string(payload.searchText);

    const item = MINECRAFT_DATA.itemsByName[sanitized_string];
    if (item === undefined) {
      response.status(400).send({ error: "Could not find item" });
      return undefined;
    }
  
    const fullItem = getIngredient(item.id);
    if (fullItem === undefined) {
      response.status(400).send({ error: "Could not find item" });
      return undefined;
    }

    const recipesAndItems: any[] = itemToRecipe()[item.id]?.map(getRecipe) ?? [];

    const allRecipes: IRecipe[] = [];
    const allItems: IItem[] = [fullItem];

    recipesAndItems.forEach(({ recipes, items }) => {
      allRecipes.push(...recipes);
      allItems.push(...items);
    });

    const keyedItems = _.keyBy(allItems, (item) => item.item.id);
    const creationRecipes = allRecipes.filter((recipe: any) => recipe.result.id === item.id);
    const usedInRecipes = allRecipes.filter((recipe: any) => recipe.result.id !== item.id);

    resolve({ rootItemId: item.id, creationRecipes, usedInRecipes, items: keyedItems });
  });
}
