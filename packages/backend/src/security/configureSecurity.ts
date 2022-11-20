import cors from "cors";
import { Express } from "express";

const CORS_OPTIONS: cors.CorsOptions = {
    origin: [],
    methods: ["GET", "POST", "PUT", "DELETE"],
};

export function configureSecurity(app: Express) {
    app.use(cors());
}
