import { implementEndpoints, IService } from "../common/generics";
import { IItem, IRecipe } from "./minecraftTypes";

export interface IMinecraftSearchService extends IService {
    searchRecipes: {
        payload: {
            searchText: string
        };
        response: {
            rootItemId: number;
            creationRecipes: IRecipe[];
            usedInRecipes: IRecipe[]
            items: { [itemId: string]: IItem };
        };
    };
}

const { backend, frontend } = implementEndpoints<IMinecraftSearchService>({
    searchRecipes: {
        method: "post",
        isPublic: true,
        slug: "/minecraft-search/search-recipes",
    },
});

export const MinecraftServiceBackend = backend;
export const MinecraftServiceFrontend = frontend;
