import { generarCsvPokemonService } from "../services/pokemon.service.js";

export const generarCsvPokemon = async (req, res) => {
    try {
        const csv = await generarCsvPokemonService();

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=pokemon_15.csv");

        res.status(200).send(csv);
    } catch (error) {
        res.status(503).json({
            statusCode: 503,
            error: "Error al consumir PokeAPI"
        });
    }
};