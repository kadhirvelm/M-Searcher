import { IMinecraftSearchService } from "@minecraft/api";
import minecraft from "minecraft-data";
import icon_mapping from "./icon_map.json";

const MINECRAFT_DATA = minecraft("1.19");

export function searchRecipes(
  payload: IMinecraftSearchService["searchRecipes"]["payload"],
): Promise<IMinecraftSearchService["searchRecipes"]["response"]> {
  console.log(MINECRAFT_DATA.itemsByName.feather, payload.searchText);

  console.log(icon_mapping[0]);

  return new Promise((resolve) => {
    resolve(payload.searchText);
  });
}
