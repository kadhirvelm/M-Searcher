import { IMinecraftSearchService } from "@minecraft/api";
import { readFileSync } from 'fs';
import minecraft from "minecraft-data";
import { join } from "path";

const MINECRAFT_DATA = minecraft("1.19");

const iconToCssClassName = () => JSON.parse(readFileSync(join(process.cwd(), "./src/services/icon_to_css.json")).toString());
const itemToRecipe = () => JSON.parse(readFileSync(join(process.cwd(), "./src/services/item_to_recipe.json")).toString());

// const process_recipes = () => {
//   const ingredientToRecipes = {};
//   Object.entries(MINECRAFT_DATA.recipes).forEach(([recipeId, recipes]) => {
//     recipes.forEach((recipe: any) => {
//       let ingredients = [];
//       if (recipe.ingredients !== undefined) {
//         ingredients = recipe.ingredients;
//       } else if (recipe.inShape !== undefined) {
//         ingredients = _.compact(_.flatten(recipe.inShape));
//       }

//       ingredients.push(recipe.result.id);
//       ingredients.forEach((ingredient: any) => {
//         ingredientToRecipes[ingredient] = (ingredientToRecipes[ingredient] ?? []);
//         ingredientToRecipes[ingredient].push(recipeId);
//       });
//     });
//   });

//   Object.keys(ingredientToRecipes).forEach((key) => {
//     ingredientToRecipes[key] = _.uniq(ingredientToRecipes[key]);
//   });

//   writeFileSync("/Users/kmanickam/Desktop/M-Searcher/packages/backend/src/services/ingredientToRecipes.json", JSON.stringify(ingredientToRecipes));
// };

export function searchRecipes(
  payload: IMinecraftSearchService["searchRecipes"]["payload"],
): Promise<IMinecraftSearchService["searchRecipes"]["response"]> {
  return new Promise((resolve) => {
    resolve(payload.searchText);
  });
}
