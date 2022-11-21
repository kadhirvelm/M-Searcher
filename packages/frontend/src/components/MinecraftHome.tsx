import { IItem, IRecipe, MinecraftServiceFrontend } from "@minecraft/api";
import * as React from "react";
import { checkIfError } from "../utils/checkIfError";

export const MinecraftHome: React.FC<{}> = () => {
  const [searchedRecipes, setSearchedRecipes] = React.useState<
  { recipes: IRecipe[]; items: IItem[] } | undefined>(undefined);

  const loadSearchedRecipes = async () => {
    const loadedRecipes = checkIfError(await MinecraftServiceFrontend.searchRecipes({ searchText: "candle" }));

    if (loadedRecipes === undefined) {
      return;
    }

    setSearchedRecipes(loadedRecipes);
  };

  React.useEffect(() => {
    loadSearchedRecipes();
  }, []);

  return (
    <div>
      {JSON.stringify(searchedRecipes?.recipes)}
      {JSON.stringify(searchedRecipes?.items)}
    </div>
  );
};
