import { IMinecraftSearchService } from "@minecraft/api";
import * as React from "react";
import { Item } from "./Item";
import { Recipe } from "./Recipe";
import styles from "./Results.module.scss";

export const Results: React.FC<{ searchedRecipes: IMinecraftSearchService["searchRecipes"]["response"] | undefined }> = ({ searchedRecipes }) => {
    if (searchedRecipes === undefined) {
        return null;
    }

    const item = searchedRecipes.items[searchedRecipes.rootItemId];

    return (
        <div className={styles.resultsContainer}>
            <Item item={item} />
            <div className={styles.recipesContainer}>
                <div className={styles.label}>Created by ({searchedRecipes.creationRecipes.length})</div>
                {searchedRecipes.creationRecipes.map((recipe) => <Recipe recipe={recipe} allItems={searchedRecipes.items} />)}
            </div>
            <div className={styles.recipesContainer}>
                <div className={styles.label}>Used in ({searchedRecipes.usedInRecipes.length})</div>
                {searchedRecipes.usedInRecipes.map((recipe) => <Recipe recipe={recipe} allItems={searchedRecipes.items} />)}
            </div>
        </div>
    );
}