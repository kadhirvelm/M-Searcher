import minecraft from "minecraft-data";

export type IRecipe = minecraft.Recipe;

export interface IItem {
    item: minecraft.Item;
    className: string;
}
