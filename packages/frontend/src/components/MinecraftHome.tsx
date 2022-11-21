import { IMinecraftSearchService, MinecraftServiceFrontend } from "@minecraft/api";
import { Input,Button } from "antd";
import * as React from "react";
import { checkIfError } from "../utils/checkIfError";
import { Results } from "./Results";

export const MinecraftHome: React.FC<{}> = () => {
  const [searchedRecipes, setSearchedRecipes] = React.useState<IMinecraftSearchService["searchRecipes"]["response"] | undefined>(undefined);
  const [searchText, setSearchText] = React.useState<string>("");

  const [isLoading, setIsLoading] = React.useState(false);

  const loadSearchedRecipes = async () => {
    setIsLoading(true);
    const loadedRecipes = checkIfError(await MinecraftServiceFrontend.searchRecipes({ searchText: searchText }));
    setIsLoading(false);
  
    if (loadedRecipes === undefined) {
      return;
    }

    setSearchedRecipes(loadedRecipes);
  };

  const onTextInput = (event: React.ChangeEvent<HTMLInputElement>) => setSearchText(event.currentTarget.value);

  const handleEnterEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      loadSearchedRecipes();
    }
  }

  const maybeRenderResults = () => {
    if (isLoading) {
      return <div>Loading...</div>
    }

    if (searchedRecipes === undefined) {
      return <div>No results</div>
    }

    return <Results searchedRecipes={searchedRecipes} />
  }

  return (
    <div>
      <div onKeyDown={handleEnterEvent}>
        <Input onChange={onTextInput} />
        <Button onClick={loadSearchedRecipes}>Search</Button>
      </div>
      {maybeRenderResults()}
    </div>
  );
};
