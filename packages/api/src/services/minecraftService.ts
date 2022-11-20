import { implementEndpoints, IService } from "../common/generics";

export interface IMinecraftSearchService extends IService {
    searchRecipes: {
        payload: {
            searchText: string
        };
        response: {};
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
