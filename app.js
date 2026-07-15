import express from "express";
import { authRouter } from "./src/routes/auth.routes.js";
import { habitacionRouter } from "./src/routes/habitacion.routes.js";
import { pokemonRouter } from "./src/routes/pokemon.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok"
    });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/habitaciones", habitacionRouter);
app.use("/api/v1/pokemon", pokemonRouter);

app.use((req, res) => {
    res.status(404).json({
        statusCode: 404,
        error: "Ruta no encontrada"
    });
});

export default app;