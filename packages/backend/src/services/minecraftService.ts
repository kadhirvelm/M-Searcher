import { IMinecraftSearchService } from "@minecraft/api";
import minecraft from "minecraft-data";

const MINECRAFT_DATA = minecraft("1.19");

export function searchRecipes(
  payload: IMinecraftSearchService["searchRecipes"]["payload"],
): Promise<IMinecraftSearchService["searchRecipes"]["response"]> {
  console.log(MINECRAFT_DATA.itemsByName.feather, payload.searchText);

  return new Promise((resolve) => {
    resolve(payload.searchText);
  });
}
