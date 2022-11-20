import { ORIGIN, PORT } from "@minecraft/api";
import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import { createServer } from "http";
import { configureAllRoutes } from "./routes/configureAllRoutes";
import { configureSecurity } from "./security/configureSecurity";

const app = express();
const server = createServer(app);

app.use(compression());

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(bodyParser.urlencoded({ extended: true }));

configureSecurity(app);
configureAllRoutes(app);

server.listen(3001, () => {
    // eslint-disable-next-line no-console
    console.log({ level: "info", message: `Server started, listening on http://localhost:3001` });
});
