import { IMinecraftSearchService } from "@minecraft/api";

export function searchRecipes(
    payload: IMinecraftSearchService["searchRecipes"]["payload"],
): Promise<IMinecraftSearchService["searchRecipes"]["response"]> {
    console.log(payload);
    return new Promise((resolve) => {
        resolve(payload);
    });
}
