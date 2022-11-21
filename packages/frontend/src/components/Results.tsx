import { IMinecraftSearchService } from "@minecraft/api";
import * as React from "react";

export const Results: React.FC<{ searchedRecipes: IMinecraftSearchService["searchRecipes"]["response"] | undefined }> = ({ searchedRecipes }) => {
    if (searchedRecipes === undefined) {
        return <div>Loading...</div>;
    }

    const item = searchedRecipes.items[searchedRecipes.rootItemId];

    return (
        <div>
            <div>
                <i className={`icon-minecraft ${item.className}`} />
                <div>In-game name: {item.item.displayName}</div>
                <div>Id: {item.item.id}</div>
                <div>Stacksize: {item.item.stackSize}</div>
            </div>
            <div>Created by {searchedRecipes.creationRecipes.length} recipe{searchedRecipes.creationRecipes.length === 1 ? "" : "s"}</div>
            <div>Used in {searchedRecipes.usedInRecipes.length} recipe{searchedRecipes.usedInRecipes.length === 1 ? "" : "s"}</div>
        </div>
    );
}