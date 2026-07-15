import "dotenv/config";
import app from "./app.js";
import { config } from "./src/config/config.js";

app.listen(config.port, () => {
    console.log(`Servidor corriendo en http://localhost:${config.port}`);
});