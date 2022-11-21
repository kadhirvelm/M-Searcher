import { MinecraftServiceFrontend } from "@minecraft/api";
import * as React from "react";
import { checkIfError } from "../utils/checkIfError";

export const MinecraftHome: React.FC<{}> = () => {
  const [searchedRecipes, setSearchedRecipes] = React.useState<
  { cssName: string; recipes: string[] } | undefined>(undefined);

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
      Hello world!
      <i className={`icon-minecraft ${searchedRecipes?.cssName}`} />
      {JSON.stringify(searchedRecipes?.recipes)}
    </div>
  );
};
