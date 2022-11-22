import { ArrowRightOutlined } from "@ant-design/icons";
import { IItem, IRecipe } from "@minecraft/api";
import * as React from "react";
import { Item } from "./Item";
import styles from "./Recipe.module.scss";

interface IInShapeRecipe {
    inShape: Array<Array<number>>;
}

interface IIngredientsRecipe {
    ingredients: Array<number>;
}

export const Recipe: React.FC<{ recipe: IRecipe; allItems: { [itemId: string]: IItem } }> = ({ recipe, allItems }) => {
    const renderRecipeDetails = () => {
        if ((recipe as IInShapeRecipe).inShape !== undefined) {
            return <div>In shape recipe</div>
        }

        if ((recipe as IIngredientsRecipe).ingredients !== undefined) {
            return <div>Ingredients</div>
        }

        return <div>Unknown recipe</div>
    }

    const creates: IItem = allItems[(recipe.result as any).id]

    return (
        <div className={styles.recipeContainer}>
            <div>
                {renderRecipeDetails()}
            </div>
            <div><ArrowRightOutlined /></div>
            <div>
                <Item item={creates} />
            </div>
        </div>
    )
}