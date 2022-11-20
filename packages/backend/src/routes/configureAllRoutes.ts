import Express from "express";
import { MinecraftServiceBackend } from "@minecraft/api";
import { searchRecipes } from "../services/minecraftService";
import { configureFrontendRoutes } from "./configureFrontendRoutes";

const mockCheck = () => null;

export function configureAllRoutes(app: Express.Express) {
    configureFrontendRoutes(app);

    MinecraftServiceBackend(app, mockCheck, {
        searchRecipes,
    });
}
