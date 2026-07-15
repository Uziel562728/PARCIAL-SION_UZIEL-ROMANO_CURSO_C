import { Router } from "express";
import { generarCsvPokemon } from "../controllers/pokemon.controller.js";

const router = Router();

router.get("/csv", generarCsvPokemon);

export { router as pokemonRouter };