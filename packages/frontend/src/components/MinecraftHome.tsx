import { MinecraftServiceFrontend } from "@minecraft/api";
import * as React from "react";
import { checkIfError } from "../utils/checkIfError";

export const MinecraftHome: React.FC<{}> = () => {
  const [searchedRecipes, setSearchedRecipes] = React.useState<{}>();

  const loadSearchedRecipes = async () => {
    const loadedRecipes = checkIfError(await MinecraftServiceFrontend.searchRecipes({ searchText: "sample-text" }));

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
      Hello world!
      {JSON.stringify(searchedRecipes)}
    </div>
  );
};
