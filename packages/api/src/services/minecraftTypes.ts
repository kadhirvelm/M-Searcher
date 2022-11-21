import minecraft from "minecraft-data";

export interface IShapeRecipe {
    result: {
        id: string;
        count: number;
    }
}

export type IRecipe = minecraft.Recipe;

export interface IItem {
    item: minecraft.Item;
    className: string;
}
