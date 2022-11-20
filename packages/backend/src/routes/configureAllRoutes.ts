import Express from "express";
import { MinecraftServiceBackend } from "@minecraft/api";
import { searchRecipes } from "../services/minecraftService";
import { configureFrontendRoutes } from "./configureFrontendRoutes";

const mockCheck = () => null;

export function configureAllRoutes(app: Express.Express) {
    app.get("/status", (request, response) => {
        response.status(200).send({ message: "Success!" });
    })

    MinecraftServiceBackend(app, mockCheck, {
        searchRecipes,
    });

    configureFrontendRoutes(app);
}
